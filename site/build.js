// Builds the GitHub Pages site from README.md into _site/.
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import MarkdownIt from 'markdown-it';
import footnote from 'markdown-it-footnote';

const root = new URL('..', import.meta.url);
const outDir = new URL('_site/', root);
const description =
  'A derivative of the Semantic Line Breaks specification ' +
  'in which every semantic line break appears in the rendered output.';

const md = new MarkdownIt({ html: true }).use(footnote);

// Give headings GitHub-style ids so that section links match the repository view.
function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/\s/g, '-');
}

md.core.ruler.push('heading_ids', (state) => {
  const seen = new Map();
  state.tokens.forEach((token, i) => {
    if (token.type !== 'heading_open') return;
    const text = state.tokens[i + 1].children
      .filter((child) => child.type === 'text' || child.type === 'code_inline')
      .map((child) => child.content)
      .join('');
    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    token.attrSet('id', count ? `${base}-${count}` : base);
  });
});

// Wrap each line of a paragraph in a block-level span,
// so that the stylesheet can indent lines wrapped by the screen width
// and readers can tell them apart from semantic line breaks.
md.core.ruler.push('semantic_lines', (state) => {
  const html = (content) => Object.assign(new state.Token('html_inline', '', 0), { content });
  state.tokens.forEach((token, i) => {
    if (token.type !== 'inline' || state.tokens[i - 1]?.type !== 'paragraph_open') return;
    const children = [html('<span class="line">')];
    for (const child of token.children) {
      children.push(child.type === 'hardbreak' ? html('</span>\n<span class="line">') : child);
    }
    children.push(html('</span>'));
    token.children = children;
  });
});

const source = await readFile(new URL('README.md', root), 'utf8');
const env = {};
const tokens = md.parse(source, env);

// Rule 2 applies to this document too:
// every line break inside a block must render as a line break.
const softBreakLines = [];
for (const token of tokens) {
  if (token.type !== 'inline' || !token.map) continue;
  token.children.forEach((child, i) => {
    if (child.type !== 'softbreak') return;
    const previous = token.children[i - 1];
    if (previous?.type === 'html_inline' && /^<br\s*\/?>$/i.test(previous.content)) return;
    softBreakLines.push(token.map[0] + 1);
  });
}
if (softBreakLines.length) {
  const lines = [...new Set(softBreakLines)].join(', ');
  console.error(`README.md has line breaks that do not render, in the blocks that start at these lines: ${lines}`);
  process.exit(1);
}

const h1 = tokens.findIndex((token) => token.type === 'heading_open' && token.tag === 'h1');
const title = md.utils.escapeHtml(tokens[h1 + 1].content);
const body = md.renderer.render(tokens, md.options, env);

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>${title}</title>
<meta name="description" content="${md.utils.escapeHtml(description)}">
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
${body}</main>
</body>
</html>
`;

await mkdir(outDir, { recursive: true });
await writeFile(new URL('index.html', outDir), page);
await copyFile(new URL('site/style.css', root), new URL('style.css', outDir));
console.log(`Built ${new URL('index.html', outDir).pathname}`);
