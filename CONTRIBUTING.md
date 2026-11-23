# Contributing to PDFAD

PDFAD is a specification, not a codebase. Contributions are spec
changes: clarifications, new manifest fields, edge-case rules, examples.

## How to propose a change

1. Open an issue describing the problem (what is ambiguous or missing).
2. For non-trivial changes, propose the diff in the issue first.
3. Pull requests must update `SPEC.md`, bump the version header if the
   change is breaking, and keep `examples/` valid.

## Rules

- The manifest is **untrusted content**: security rules in SPEC §6 are
  normative — never weaken them.
- Extension fields MUST be namespaced `x_*` (e.g. `dna.x_brand`).
- Every MUST/SHOULD follows RFC 2119 semantics.
- Examples must be a valid manifest per §3.

Author: fjjjuv — https://github.com/fjjjuv
