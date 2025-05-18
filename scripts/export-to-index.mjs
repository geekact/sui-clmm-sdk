import { appendFileSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';

const dirs = readdirSync('src', { withFileTypes: true }).sort((a, b) =>
  a.name === 'math' ? 1 : b.name === 'math' ? -1 : 0,
);
const markdown = [];

for (const dir of dirs) {
  if (!dir.isDirectory()) continue;
  const files = readdirSync(resolve('src', dir.name), { withFileTypes: true });
  if (files.every((file) => file.name !== 'index.ts')) continue;
  const indexFile = resolve('src', dir.name, 'index.ts');
  console.log(`Writing to ${relative(process.cwd(), indexFile)}`);
  writeFileSync(indexFile, '');
  markdown.push(`\n## ${dir.name}\n`);

  for (const file of files) {
    if (file.isFile() && file.name.endsWith('.ts') && file.name !== 'index.ts') {
      const basename = file.name.replace('.ts', '');
      appendFileSync(indexFile, `export * from './${basename}';\n`);
      markdown.push(`- [${basename}](src/${dir.name}/${file.name})`);
    }
  }
}

console.log('Writing to README.md');
let readme = readFileSync('README.md', 'utf8');
readme = readme.replace(
  /(<\!-- methods start -->)([\s\S]+?)(<\!-- methods end -->)/,
  `$1\n${markdown.join('\n')}\n$3`,
);
writeFileSync('README.md', readme);
