/* eslint-env node */
import fs from 'fs';
import path from 'path';
import process from 'process';
import { componentMetadata } from '../src/constants/Information.js';

const OUTPUT_FILENAME = 'llms.txt';
const OUTPUT_DIR = path.join(process.cwd(), 'public');
const OUTPUT_PATH = path.join(OUTPUT_DIR, OUTPUT_FILENAME);

const CATEGORY_SLUGS = {
  Animations: 'animations',
  Components: 'components',
  Backgrounds: 'backgrounds',
  TextAnimations: 'text-animations'
};

const CATEGORY_ORDER = ['TextAnimations', 'Animations', 'Components', 'Backgrounds'];

function pascalToTitle(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]{2,})([A-Z][a-z])/g, '$1 $2')
    .trim();
}

function pascalToKebab(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]{2,})([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function collectComponents(componentMetadata) {
  const categories = {};

  for (const metadata of Object.values(componentMetadata)) {
    const category = metadata.category;
    if (!category || !CATEGORY_SLUGS[category]) continue;

    const compName = metadata.name;
    if (!categories[category]) categories[category] = {};

    categories[category][compName] = {
      name: compName,
      description: metadata.description || ''
    };
  }
  return categories;
}

function buildComponentSection(category, comps) {
  const slugBase = CATEGORY_SLUGS[category];
  const entries = Object.values(comps)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(c => {
      const kebab = pascalToKebab(c.name);
      const titleHuman = pascalToTitle(c.name);
      const description = c.description ? c.description.replace(/\s+/g, ' ').trim() : '';
      const descriptionSentence = description.endsWith('.') ? description : description + (description ? '.' : '');
      return `- [${titleHuman}](https://www.reactbits.dev/${slugBase}/${kebab}): ${descriptionSentence} CLI: \`${c.name}\`.`;
    });
  return `## ${pascalToTitle(category)}\n\n${entries.join('\n')}\n`;
}

const INTRO_LINES = [
  'React Bits is an open source collection of memorable UI elements - Components, Animations, Backgrounds, and Text Animations - provided in four implementation variants: JavaScript + CSS, JavaScript + Tailwind, TypeScript + CSS, and TypeScript + Tailwind.',
  'Components are copy-friendly and installable via CLI (jsrepo or shadcn).'
];

const AGENT_NOTES = [
  'Components are organized by semantics first: UI Components, Animations, Backgrounds, Text Animations.',
  'Each component has 4 variants. All variants are kept in sync when updated.',
  'Dependencies vary by component (e.g., gsap, motion, three, ogl). Always check and install dependencies before usage.'
];

const DOC_LINKS = [
  {
    label: 'Homepage',
    url: 'https://www.reactbits.dev',
    note: 'Landing page, quick presentation of the library, testimonials.'
  },
  {
    label: 'Introduction',
    url: 'https://www.reactbits.dev/get-started/introduction',
    note: 'Project mission and principles.'
  },
  {
    label: 'Installation',
    url: 'https://www.reactbits.dev/get-started/installation',
    note: 'Manual copy and CLI commands (jsrepo, shadcn).'
  },
  {
    label: 'MCP Setup',
    url: 'https://www.reactbits.dev/get-started/mcp',
    note: 'Set up a MCP server to help you with development.'
  }
];

const CLI_INSTRUCTIONS = {
  shadcn: {
    command: 'npx shadcn@latest add https://reactbits.dev/r/<Component>-<LANG>-<STYLE>',
    params: [
      '<LANG>: JS | TS; <STYLE>: CSS | TW',
      'Example: npx shadcn@latest add https://reactbits.dev/r/SplitText-JS-CSS'
    ]
  },
  jsrepo: {
    command: 'npx jsrepo@latest add https://reactbits.dev/r/<Component>-<LANG>-<STYLE>',
    params: [
      '<LANG>: JS | TS; <STYLE>: CSS | TW',
      'Example: npx jsrepo@latest add https://reactbits.dev/r/SplitText-JS-CSS'
    ]
  },
  notes: [
    'Component page URLs use kebab-case paths like /text-animations/split-text.',
    'CLI component identifiers use PascalCase, e.g. SplitText.'
  ]
};

const VARIANT_LINKS = [
  { label: 'JavaScript + CSS (default)', path: 'src/content', note: 'Plain CSS styling; copyable into any React app.' },
  {
    label: 'JavaScript + Tailwind',
    path: 'src/tailwind',
    note: 'Tailwind-first implementations of the same components.'
  },
  { label: 'TypeScript + CSS', path: 'src/ts-default', note: 'Typed variants with plain CSS.' },
  { label: 'TypeScript + Tailwind', path: 'src/ts-tailwind', note: 'Typed Tailwind variants.' }
];

const KEY_DEPENDENCIES = [
  { label: 'GSAP', url: 'https://gsap.com/docs/v3/', note: 'Animation engine used by many motion components.' },
  {
    label: 'Motion (Framer)',
    url: 'https://www.framer.com/motion/',
    note: 'Declarative motion primitives for enter/exit/stagger.'
  },
  { label: 'three.js', url: 'https://threejs.org/docs/', note: '3D engine for backgrounds and interactive visuals.' },
  { label: 'ogl', url: 'https://github.com/oframe/ogl', note: 'Lightweight WebGL; shader-driven backgrounds.' }
];

const MCP_LINKS = [
  {
    label: 'MCP Setup',
    url: 'https://www.reactbits.dev/get-started/mcp',
    note: 'How AI agents can browse/search React Bits.'
  },
  { label: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/', note: 'Protocol reference.' }
];

const DEV_LINKS = [
  {
    label: 'CONTRIBUTING.md',
    url: 'CONTRIBUTING.md',
    note: 'Workflow and quality gates; keep all 4 variants updated for component changes.'
  },
  { label: 'LICENSE', url: 'LICENSE.md', note: 'License information.' }
];

function section(title, lines) {
  return `## ${title}\n\n${lines.join('\n')}\n`;
}

function buildHeader() {
  const intro = [
    '# React Bits',
    '',
    `> ${INTRO_LINES[0]} ${INTRO_LINES[1]}`,
    '',
    'Important notes for agents:',
    '',
    ...AGENT_NOTES.map(l => `- ${l}`)
  ];
  return intro.join('\n');
}

function buildDocs() {
  const lines = DOC_LINKS.map(l => `- [${l.label}](${l.url}): ${l.note}`);
  return section('Docs', lines);
}

function buildCli() {
  const lines = [
    `- shadcn: \`${CLI_INSTRUCTIONS.shadcn.command}\``,
    ...CLI_INSTRUCTIONS.shadcn.params.map(p => `  - ${p}`),
    `- jsrepo: \`${CLI_INSTRUCTIONS.jsrepo.command}\``,
    ...CLI_INSTRUCTIONS.jsrepo.params.map(p => `  - ${p}`),
    '',
    'Notes:',
    '',
    ...CLI_INSTRUCTIONS.notes.map(n => `- ${n}`)
  ];
  return section('CLI', lines);
}

function buildVariants() {
  const lines = VARIANT_LINKS.map(v => `- [${v.label}](${v.path}): ${v.note}`);
  return section('Variants', lines);
}

function buildKeyDependencies() {
  const lines = KEY_DEPENDENCIES.map(d => `- [${d.label}](${d.url}): ${d.note}`);
  return section('Key Dependencies', lines);
}

function buildMcp() {
  const lines = MCP_LINKS.map(d => `- [${d.label}](${d.url}): ${d.note}`);
  return section('MCP', lines);
}

function buildDev() {
  const lines = DEV_LINKS.map(d => `- [${d.label}](${d.url}): ${d.note}`);
  return section('Development', lines);
}

function generateMarkdown(categories) {
  const categorySections = CATEGORY_ORDER.filter(cat => categories[cat]).map(cat =>
    buildComponentSection(cat, categories[cat])
  );

  return [
    buildHeader(),
    buildDocs(),
    buildCli(),
    ...categorySections,
    buildVariants(),
    buildKeyDependencies(),
    buildMcp(),
    buildDev()
  ].join('\n');
}

function main() {
  const categories = collectComponents(componentMetadata);
  const md = generateMarkdown(categories);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, md, 'utf8');
  const rootFile = path.join(process.cwd(), OUTPUT_FILENAME);
  if (rootFile !== OUTPUT_PATH && fs.existsSync(rootFile)) {
    try {
      fs.unlinkSync(rootFile);
    } catch {
      /* ignore */
    }
  }
  console.log(`Generated ${path.relative(process.cwd(), OUTPUT_PATH)} with dynamic component index.`);
}

main();
