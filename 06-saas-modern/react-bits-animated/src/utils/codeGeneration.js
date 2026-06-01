/**
 * Utility functions for generating dynamic code examples based on prop values.
 */

/**
 * Formats a prop value for JSX display.
 * - Strings: "value"
 * - Numbers: {123}
 * - Booleans: {true}
 * - Arrays/Objects: {JSON.stringify(value)}
 * - Functions: shown as reference
 */
export function formatPropValue(value, propName) {
  if (value === undefined || value === null) {
    return null;
  }

  const type = typeof value;

  if (type === 'string') {
    return `"${value}"`;
  }

  if (type === 'number') {
    return `{${value}}`;
  }

  if (type === 'boolean') {
    return value ? '' : `{${value}}`; // true props can be just the prop name
  }

  if (type === 'function') {
    // Check if it's a named function
    if (value.name && value.name !== 'anonymous') {
      return `{${value.name}}`;
    }
    return `{handle${propName.charAt(0).toUpperCase() + propName.slice(1)}}`;
  }

  if (Array.isArray(value)) {
    return `{${JSON.stringify(value)}}`;
  }

  if (type === 'object') {
    return `{${JSON.stringify(value)}}`;
  }

  return `{${value}}`;
}

/**
 * Generates JSX props string from a props object.
 *
 * @param {Object} props - Current prop values
 * @param {Object} defaultProps - Default prop values (to skip unchanged ones)
 * @param {Object} options - Options for formatting
 * @param {string[]} options.exclude - Props to exclude from output
 * @param {string[]} options.include - Props to always include (even if default)
 * @param {number} options.indent - Indentation spaces (default: 2)
 * @returns {string} Formatted props string for JSX
 */
export function generatePropsString(props, defaultProps = {}, options = {}) {
  const { exclude = [], include = [], indent = 2 } = options;
  const indentStr = ' '.repeat(indent);

  const propsEntries = Object.entries(props).filter(([key, value]) => {
    // Always exclude certain internal props
    if (exclude.includes(key)) return false;

    // Always include specified props
    if (include.includes(key)) return true;

    // Skip if value matches default
    if (JSON.stringify(value) === JSON.stringify(defaultProps[key])) {
      return false;
    }

    // Skip undefined/null
    if (value === undefined || value === null) return false;

    return true;
  });

  if (propsEntries.length === 0) {
    return '';
  }

  return propsEntries
    .map(([key, value]) => {
      const formattedValue = formatPropValue(value, key);

      // For boolean true, just show the prop name
      if (typeof value === 'boolean' && value === true) {
        return `${indentStr}${key}`;
      }

      return `${indentStr}${key}=${formattedValue}`;
    })
    .join('\n');
}

/**
 * Injects dynamic props into a usage code template.
 * Replaces placeholder props in the template with actual values.
 *
 * @param {string} usageTemplate - The usage code template
 * @param {string} componentName - Name of the component (e.g., 'BlurText')
 * @param {Object} props - Current prop values
 * @param {Object} defaultProps - Default prop values
 * @param {Object} options - Options for formatting
 * @returns {string} Updated usage code with current props
 */
export function injectPropsIntoUsage(usageTemplate, componentName, props, defaultProps = {}, options = {}) {
  const { exclude = ['className', 'key', 'ref'], include = [] } = options;

  // Generate the props string
  const propsString = generatePropsString(props, defaultProps, { exclude, include, indent: 2 });

  // Find the component usage in the template and replace its props
  // This regex matches <ComponentName followed by props and closing />
  const componentRegex = new RegExp(`(<${componentName})([^>]*)(\\s*/>)`, 's');

  const match = usageTemplate.match(componentRegex);

  if (!match) {
    // If no match found, return original
    return usageTemplate;
  }

  // Build new component usage
  if (propsString) {
    return usageTemplate.replace(componentRegex, `$1\n${propsString}\n$3`);
  }

  return usageTemplate;
}

/**
 * Creates a simple usage example for a component with given props.
 *
 * @param {string} componentName - Name of the component
 * @param {string} importPath - Import path for the component
 * @param {Object} props - Props to include in the example
 * @param {Object} defaultProps - Default props (used to filter unchanged values)
 * @param {Object} options - Additional options
 * @returns {string} Complete usage example code
 */
export function createUsageExample(componentName, importPath, props, defaultProps = {}, options = {}) {
  const { exclude = ['key', 'ref'], children = null, callbacks = {} } = options;

  const propsString = generatePropsString(props, defaultProps, { exclude, indent: 2 });

  // Generate callback declarations
  const callbackDeclarations = Object.entries(callbacks)
    .map(([name, body]) => {
      return `const ${name} = () => {\n  ${body}\n};`;
    })
    .join('\n\n');

  const callbackSection = callbackDeclarations ? `\n${callbackDeclarations}\n` : '';

  const componentJsx = children
    ? `<${componentName}${propsString ? `\n${propsString}` : ''}>\n  ${children}\n</${componentName}>`
    : `<${componentName}${propsString ? `\n${propsString}\n` : ' '}/>`;

  return `import ${componentName} from "${importPath}";
${callbackSection}
${componentJsx}`;
}
