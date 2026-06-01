interface GLTFObject {
  name: string;
  type: string;
  children: GLTFObject[];
}

export function dumpGltfObject(obj : GLTFObject, lines: string[] = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpGltfObject(child, lines, isLast, newPrefix);
  });
  return lines;
}