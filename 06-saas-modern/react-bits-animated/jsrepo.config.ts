import { defineConfig, type RegistryItem } from 'jsrepo';
import { output } from '@jsrepo/shadcn';
import { type Category, componentMetadata, type Variant } from './src/constants/Information';

export default defineConfig({
  registry: {
    name: '@react-bits',
    description:
      'An open source collection of animated, interactive & fully customizable React components for building stunning, memorable user interfaces.',
    homepage: 'https://reactbits.dev',
    authors: ['David Haz'],
    bugs: 'https://github.com/DavidHDev/react-bits/issues',
    repository: 'https://github.com/DavidHDev/react-bits',
    tags: [
      'react',
      'javascript',
      'components',
      'web',
      'reactjs',
      'css-animations',
      'component-library',
      'ui-components',
      '3d',
      'ui-library',
      'tailwind',
      'tailwindcss',
      'components',
      'components-library'
    ],
    excludeDeps: ['react'],
    outputs: [output({ dir: 'public/r', format: true })],
    items: [
      ...Object.values(componentMetadata).map(component =>
        defineComponent({
          title: component.name,
          description: component.description,
          category: component.category,
          categories: [component.category],
          meta: component.meta,
          variants: component.variants
        })
      )
    ].flat()
  }
});

/**
 * Define a component to be exposed from the registry. Creates the 4 different variants of the component and ensures the correct files are included.
 *
 * @param title The title of the component.
 * @param description The description of the component.
 * @param category The category of the component.
 * @param categories Organize the component into multiple categories.
 * @param meta Optional meta data for the component.
 * @param variants The variants of the component that are available through the registry (default: all variants)
 * @returns An array of RegistryItem objects.
 */
function defineComponent({
  title,
  description,
  category,
  categories,
  meta,
  variants = ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW']
}: {
  title: string;
  description: string;
  category: Category;
  categories?: string[];
  meta?: Record<string, string>;
  variants?: readonly Variant[];
}): RegistryItem[] {
  const baseItem: Omit<RegistryItem, 'files' | 'name'> = {
    title,
    description,
    type: 'registry:component',
    categories: [category, ...(categories ?? [])],
    meta,
    ...(title === 'Lanyard' ? { dependencyResolution: 'manual' as const } : {})
  };

  const filesForVariant = (basePath: string, sourceFile: string, styleFile?: string) =>
    title === 'Lanyard'
      ? [
          ...(styleFile ? [{ path: `${basePath}/${styleFile}` }] : []),
          { path: `${basePath}/${sourceFile}` }
        ]
      : [{ path: basePath }];

  // this might warrant a bit of explanation
  // basically we check if the variant is included in the variants array and if so we return the item as part of an array
  // otherwise we return an empty array
  // we then spread that array empty or otherwise into the return array
  return [
    // JS + CSS
    ...(variants.includes('JS-CSS')
      ? [
          {
            ...baseItem,
            name: `${baseItem.title}-JS-CSS`,
            files: filesForVariant(`src/content/${category}/${title}`, `${title}.jsx`, `${title}.css`)
          }
        ]
      : []),

    // JS + Tailwind
    ...(variants.includes('JS-TW')
      ? [
          {
            ...baseItem,
            name: `${baseItem.title}-JS-TW`,
            files: filesForVariant(`src/tailwind/${category}/${title}`, `${title}.jsx`)
          }
        ]
      : []),

    // TS + CSS
    ...(variants.includes('TS-CSS')
      ? [
          {
            ...baseItem,
            name: `${baseItem.title}-TS-CSS`,
            files: filesForVariant(`src/ts-default/${category}/${title}`, `${title}.tsx`, `${title}.css`)
          }
        ]
      : []),

    // TS + Tailwind
    ...(variants.includes('TS-TW')
      ? [
          {
            ...baseItem,
            name: `${baseItem.title}-TS-TW`,
            files: filesForVariant(`src/ts-tailwind/${category}/${title}`, `${title}.tsx`)
          }
        ]
      : [])
  ];
}
