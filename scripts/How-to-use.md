

##  How to use it

Validate all content

Recommended

bash

```bash
npm run validate:content
```

Validate with 8 parallel workers

bash

```bash
npm run validate:content -- --concurrency 8
```

Generate JSON report

bash

```bash
npm run validate:content:json
```

Only display failures

bash

```bash
npm run validate:content:quiet
```

Production build

bash

```bash
npm run build
```

##  Example output

text

```text
Content Quality Validation
=========================

Content directory: .../content
Concurrency: 4

File validation results:

  PASS  courses/linux-fundamentals/...
  PASS  courses/linux-fundamentals/...
  FAIL  courses/linux-fundamentals/.../lesson.mdx
        [MDX_COMPILE_ERROR] line 145, column 3
        Unexpected lazy line in expression

=========================
Validation Summary
=========================
Total files: 85
Passed:      84
Failed:      1
Duration:    1240 ms

FAILED: Some content files need attention.
```

Illustrative output; counts are examples, not results from your project.

##  Important  considerations

There are three things worth keeping in mind:

| Validation | Covered |
| --- | --- |
| Recursive `.md` / `.mdx` discovery | Yes |
| MDX compilation | Yes |
| GFM support | Yes |
| Syntax highlighting plugin | Yes |
| YAML frontmatter parsing | Yes |
| File and line diagnostics | Yes |
| Parallel execution | Yes |
| JSON reporting | Yes |
| Validate custom component names against your actual registry | Not yet |
| Validate course-specific frontmatter schemas | Not yet |
| Automatically repair broken MDX | No |

