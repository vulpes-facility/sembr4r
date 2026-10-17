# Semantic Line Breaks for Readers

## Summary

When writing text with a compatible markup language,\
add a line break after each substantial unit of thought,\
and make sure that line break appears in the rendered output.

## Introduction

_Semantic Line Breaks for Readers_ describe a set of conventions for using vertical whitespace to structure prose along semantic boundaries,\
both in the source and in the rendered output.

Many lightweight markup languages,\
including [Markdown][markdown], [reStructuredText][restructuredtext], and [AsciiDoc][asciidoc],\
join consecutive lines with a space.\
Conventional markup languages like HTML and XML exhibit a similar behavior in particular contexts.\
The original [Semantic Line Breaks][sembr-org] specification relies on this behavior to use line breaks as semantic delimiters,\
making prose easier to author, edit, and read in source ---\
without affecting the rendered output.

This specification keeps those line breaks in the rendered output,\
so that readers can see the same structure as writers.

To understand the benefit of semantic line breaks,\
consider the following paragraph from the [_Universal Declaration of Human Rights_][udhr]:

> All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.

Without any line breaks at all,\
this paragraph appears in source as a long, continuous line of text\
(which may be automatically wrapped at a fixed column length,\
depending on your editor settings):

<pre>
All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.
</pre>

Adding a line break after each sentence makes it easier to understand the shape and structure of the source text:

<pre>
All human beings are born free and equal in dignity and rights.
They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.
</pre>

We can further clarify the source text by adding a line break after the clause "with reason and conscience".\
This helps to distinguish between the "and" used as a coordinating conjunction between "reason and conscience" and the "and" used as a subordinating conjunction with the clause "and should act towards one another in a spirit of brotherhood":

<pre>
All human beings are born free and equal in dignity and rights.
They are endowed with reason and conscience
and should act towards one another in a spirit of brotherhood.
</pre>

Under the original specification,\
these changes made to the source do not affect the final rendered output,\
so readers still see a single block of text:

> All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.

Under this specification,\
the same line breaks appear in the final rendered output:

> All human beings are born free and equal in dignity and rights.\
> They are endowed with reason and conscience\
> and should act towards one another in a spirit of brotherhood.

By inserting line breaks at semantic boundaries,\
writers, editors, and other collaborators can make source text easier to work with,\
and readers can follow the same structure in the rendered output.

## Semantic Line Breaks for Readers Specification (SemBr4R)

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119][rfc2119].

1. Text written as plain text or a compatible markup language MAY use semantic line breaks.
2. A semantic line break MUST appear as a line break in the final rendered output of the document.
3. A semantic line break SHOULD NOT alter the intended meaning of the text.
4. A semantic line break MUST occur after a sentence,\
   as punctuated by a period (.), exclamation mark (!), or question mark (?).
5. A semantic line break SHOULD occur after an independent clause as punctuated by a comma (,), semicolon (;), colon (:), or em dash (—).
6. A semantic line break MAY occur after a dependent clause in order to clarify grammatical structure.
7. A semantic line break is RECOMMENDED before an enumerated or itemized list.
8. A semantic line break MAY be used after one or more items in a list in order to logically group related items.
9. A semantic line break MUST NOT occur within a hyphenated word.
10. A line break SHOULD NOT occur before or after a hyperlink unless it is also a semantic line break.
11. A line break SHOULD NOT occur before inline markup unless it is also a semantic line break.
12. A maximum line length of 80 characters is RECOMMENDED.
13. A line MAY exceed the maximum line length if necessary,\
    such as to accommodate hyperlinks, code elements, or other markup.

## Why Use Semantic Line Breaks?

For a **writer**,\
semantic line breaks allow the physical structure of text to reflect the logical structure of the thoughts that produce them.

For an **editor**,\
semantic line breaks make it easier to identify grammatical mistakes and find opportunities to simplify and clarify without altering original intent.

For a **collaborator**,\
semantic line breaks keep version control history focused:\
a change to one sentence or clause shows up as a change to one line,\
rather than as a reflow of the entire paragraph.

For a **reader**,\
semantic line breaks make the structure of the text visible —\
every sentence starts on a new line,\
and clauses are set apart where the writer would pause.

## FAQ

### Which light markup languages support semantic line breaks?

Any markup language that can display a line break within a paragraph is compatible with this specification.

The original specification verifies that the following light markup languages join consecutive lines with a space:

- [AsciiDoc][asciidoc]
- [CommonMark][commonmark]
- [Haddock][haddock]
- [LaTeX][latex]
- [Markdown][markdown]
- [MediaWiki][mediawiki]
- [MultiMarkdown][multimarkdown]
- [OrgMode][orgmode]
- [reStructuredText][restructuredtext]
- [roff][roff]
- [Typst][typst]

In these languages,\
a line break in the source does not appear in the rendered output by itself.\
To follow rule 2,\
use the language's line break syntax,\
as described in "How do I force a line break?" below,\
or use a renderer that displays every line break in the source.

### How do I know when to add semantic line breaks?

Try reading the text out loud,\
as if you were speaking to an audience.\
Anywhere that you pause for emphasis or to take a breath is usually a good candidate for a semantic line break.

### How do I use semantic line breaks with dashes?

Because a semantic line break appears in the rendered output,\
a line break after an em dash works\
whether or not the dash is set off by spaces:

<pre>
The food — which was delicious —
reminded me of home.
</pre>

<pre>
The food—which was delicious—
reminded me of home.
</pre>

The same applies to an en dash (–),\
which some style guides prefer.

### How do I migrate existing prose to use semantic line breaks?

There is no need to rewrite or reformat an entire document all at once.\
The recommended migration path for an existing document is to use semantic line breaks for any new or revised text.\
This is often a great opportunity to make an editorial pass over content\
since the distinctive appearance of text with semantic line breaks allows you to quickly identify content that has not been updated.

### How do I use semantic line breaks with Git?

The default Git diff options emphasize line changes in a way that may obscure certain revisions to text with semantic line breaks.\
You can pass the `--word-diff` option to the `git diff` command for better results.

```shell
git diff --word-diff
```

### How do I use semantic line breaks with AI?

The [SemBr skill][sembr-skills] helps your coding agent apply semantic line breaks to prose.\
It works with agents that support the [Agent Skills standard][agent-skills],\
including Claude Code, Cursor, and Codex.\
The skill follows the original specification,\
so it keeps line breaks out of the rendered output;\
the prompt below also asks the agent to add line break syntax.

With Node.js and npm installed,\
run this command in your project directory:

```shell
npx skills add sembr/skills
```

The installer lets you select your agent and install the skill for the project.\
Then ask your agent:

```text
Use sembr-reformat to apply semantic line breaks to README.md.
Preserve the wording.
Then add a trailing backslash (\) to every line
that is followed by another line of the same paragraph, list item, or block quote,
so that each line break appears in the rendered output.
```

The [SemBr skills guide][sembr-skills] covers agent-specific installation, use across projects, updates, removal, and manual setup.

### Are there tools that apply semantic line breaks automatically?

Yes.\
The following community tools insert or check semantic line breaks:

- [sembr][admk-sembr] by admk,\
  a transformer-based line breaker for plain text and LaTeX
- [readable][readable] by bobheadxi,\
  a Markdown formatter with semantic line breaks
- [panache][panache] by jolars,\
  a Markdown, Quarto, and R Markdown formatter with a `semantic` wrap mode
- [badness][badness] by jolars,\
  a LaTeX formatter with a `semantic` wrap mode
- [semantic-linefeeds][semantic-linefeeds] by arloliu,\
  a post-edit hook that checks what AI coding agents write
- [sentence_lines.lua][casile-filter] from CaSILE,\
  a Pandoc filter for English and Turkish prose
- [semantic-linebreaker][semantic-linebreaker] by waldyrious,\
  a browser-based utility

These tools were built for the original specification.\
If a tool keeps line breaks out of the rendered output,\
combine it with your markup language's line break syntax or with a renderer that displays every line break in the source.

### How do I force a line break?

Rule 2 requires every semantic line break to appear in the rendered output.\
In a markup language that joins consecutive lines with a space,\
use its line break syntax at the end of each line that continues a paragraph, list item, or block quote.\
Some renderers display every line break in the source as a line break;\
with such a renderer, no extra syntax is needed.\
This document uses the CommonMark trailing backslash (`\`).

Some lightweight markup languages provide a dedicated syntax for line breaks,\
some support line breaks using the inline HTML element `<br>`[^1],\
and some do both.

| Language | Syntax | Inline HTML |
| --- | --- | --- |
| AsciiDoc | A trailing space followed by a plus sign (`+`) | Not supported |
| CommonMark | A trailing backslash (`\`), or two or more trailing spaces (`␣␣`) | Supported |
| Markdown | Two or more trailing spaces (`␣␣`)[^2] | Supported |
| MediaWiki | None | Supported |
| Org mode | Two trailing backslashes (`\\`) | Not supported |
| reStructuredText | Leading vertical line (`\|`) in a [line block][rst-line-block] | Not supported |

[^1]: The _Line Break_ element is represented as an empty tag (`<br>`) in HTML, and either a tag pair (`<br></br>`) or a self-closing tag (`<br />`) in XHTML.

[^2]: Although Markdown and CommonMark allow two or more trailing spaces (shown above as `␣␣`) to indicate breaks between consecutive lines, this syntax is incompatible with tools that automatically strip trailing whitespace.

## About

Semantic Line Breaks for Readers is maintained by Chan-yeong Kang.\
It is an unofficial derivative of the [Semantic Line Breaks][sembr-org] specification by [Mattt][mattt],\
and it is not affiliated with or endorsed by the original author.

If you’d like to leave feedback on this specification,\
please [open an issue on GitHub][github-issues].

### The Original Specification

The Semantic Line Breaks specification is authored by [Mattt][mattt].\
The following is from the About section of the original specification:

> This specification is an attempt to encapsulate best practices that I've encountered\
> while working on technical writing teams at several different companies.\
> It follows the general structure of the [Semantic Versioning specification][semver] by Tom Preston-Werner.
>
> In the process of developing this document,\
> I came across [this excellent blog post][one-sentence-per-line] by Brandon Rhodes that includes extensive research about the origin of this technique.

## License

[Creative Commons Attribution 4.0 International (CC BY 4.0)][cc-by-4.0]

Semantic Line Breaks for Readers (SemBr4R) is an unofficial derivative of [Semantic Line Breaks][sembr-org] by [Mattt][mattt].\
It is based on [`README.md` at commit `b15f658`][upstream-readme] of the `sembr/specification` repository,\
and it is not affiliated with or endorsed by the original author.\
This derivative is also licensed under CC BY 4.0.

The source code of the website,\
in `site/`, `.github/workflows/`, and `package.json`,\
is licensed under the [MIT License][site-license] instead.

Changes from the original, made on 2026-10-18:

- Rule 2 originally read:\
  "A semantic line break MUST NOT alter the final rendered output of the document."\
  It now reads:\
  "A semantic line break MUST appear as a line break in the final rendered output of the document."
- The Summary, the Introduction, "Why Use Semantic Line Breaks?", and the FAQ were revised to match the new rule 2.
- The title, the specification heading, and the About section were changed to name this derivative, credit its maintainer, and point feedback to its own repository.
- Every semantic line break in this document ends with a trailing backslash (`\`)\
  so that it appears in the rendered output.
- Rules 6 and 8 no longer allow a line break only to satisfy line length constraints,\
  and rules 10 and 11 now discourage line breaks around hyperlinks and inline markup instead of allowing them,\
  because every line break now appears in the rendered output.
- Line breaks throughout this document,\
  including the quoted About section of the original specification,\
  were moved to sentence and clause boundaries.

[admk-sembr]: https://github.com/admk/sembr
[agent-skills]: https://agentskills.io/home
[asciidoc]: http://asciidoc.org
[badness]: https://badness.dev
[casile-filter]: https://github.com/sile-typesetter/casile/blob/master/pandoc-filters/sentence_lines.lua
[cc-by-4.0]: https://creativecommons.org/licenses/by/4.0/
[commonmark]: http://commonmark.org
[github-issues]: https://github.com/vulpes-facility/sembr4r/issues
[haddock]: https://www.haskell.org/haddock/doc/html/
[latex]: https://www.latex-project.org/
[markdown]: https://daringfireball.net/projects/markdown/
[mattt]: https://mat.tt
[mediawiki]: https://www.mediawiki.org/wiki/Help:Formatting
[multimarkdown]: http://fletcherpenney.net/multimarkdown/
[one-sentence-per-line]: http://rhodesmill.org/brandon/2012/one-sentence-per-line/
[orgmode]: http://orgmode.org
[panache]: https://github.com/jolars/panache
[readable]: https://github.com/bobheadxi/readable
[restructuredtext]: http://docutils.sourceforge.net/rst.html
[rfc2119]: https://www.ietf.org/rfc/rfc2119.txt
[roff]: https://www.gnu.org/software/groff/manual/groff.html#Filling
[rst-line-block]: https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#line-blocks
[semantic-linebreaker]: https://github.com/waldyrious/semantic-linebreaker
[semantic-linefeeds]: https://github.com/arloliu/semantic-linefeeds
[sembr-org]: https://sembr.org
[sembr-skills]: https://github.com/sembr/skills
[semver]: http://semver.org
[site-license]: https://github.com/vulpes-facility/sembr4r/blob/main/site/LICENSE
[typst]: https://typst.app/docs/reference/syntax/
[udhr]: http://www.un.org/en/universal-declaration-human-rights/
[upstream-readme]: https://github.com/sembr/specification/blob/b15f658507270cd878636c83cc2ad7cbaeca2967/README.md
