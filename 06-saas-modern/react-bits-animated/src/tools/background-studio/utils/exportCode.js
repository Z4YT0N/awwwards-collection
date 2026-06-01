import { generateCliCommands } from '../../../utils/cli';

const HYPERSPEED_PRESET_LABELS = {
  one: 'Cyberpunk',
  two: 'Akira',
  three: 'Golden',
  four: 'Split',
  five: 'Highway',
  six: 'Neon Waves'
};

export function generateExportCode(background, props, options = {}) {
  if (!background) return { commands: null, jsxCode: '' };

  const { label, id } = background;
  const { language = 'JS', style = 'Tailwind' } = options;
  const componentName = label.replace(/\s+/g, '');

  const commands = generateCliCommands(language, style, 'backgrounds', id);

  if (id === 'hyperspeed' && props.preset) {
    const presetKey = props.preset || 'one';
    const presetLabel = HYPERSPEED_PRESET_LABELS[presetKey] || 'Cyberpunk';

    const jsxCode = `import { hyperspeedPresets } from './HyperSpeedPresets';

// Using "${presetLabel}" preset
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <Hyperspeed
    effectOptions={hyperspeedPresets.${presetKey}}
  />
</div>`;

    return { commands, jsxCode };
  }

  const allProps = background.props || [];

  const propsEntries = allProps.map(propDef => {
    const value = props[propDef.name] !== undefined ? props[propDef.name] : propDef.default;
    return [propDef.name, value];
  });

  let propsString = '';
  if (propsEntries.length > 0) {
    propsString = propsEntries
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `  ${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return value ? `  ${key}` : `  ${key}={false}`;
        } else if (Array.isArray(value)) {
          return `  ${key}={${JSON.stringify(value)}}`;
        } else if (typeof value === 'object') {
          return `  ${key}={${JSON.stringify(value)}}`;
        } else {
          return `  ${key}={${value}}`;
        }
      })
      .join('\n');
  }

  const jsxCode =
    propsEntries.length > 0
      ? `<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>\n  <${componentName}\n  ${propsString.split('\n').join('\n  ')}\n  />\n</div>`
      : `<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>\n  <${componentName} />\n</div>`;

  return {
    commands,
    jsxCode
  };
}
