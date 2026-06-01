import code from '@content/Components/Folder/Folder.jsx?raw';
import css from '@content/Components/Folder/Folder.css?raw';
import tailwind from '@tailwind/Components/Folder/Folder.jsx?raw';
import tsCode from '@ts-default/Components/Folder/Folder.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Folder/Folder.tsx?raw';

export const folder = {
  usage: `import Folder from './Folder'

<div style={{ height: '600px', position: 'relative' }}>
  <Folder size={2} color="#5227FF" className="custom-folder" />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
