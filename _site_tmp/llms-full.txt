# PDFAD — PDF Agent Descriptor

**Version 1.0 — 2026-11-22**
Author: fjjjuv — https://github.com/fjjjuv
Status: Stable
License: Apache License 2.0 — implementations are free.

---

## 1. Abstract

PDFAD defines a **self-describing manifest embedded inside a PDF** so
that an AI agent can understand the document's structure, design system
and capabilities *without re-parsing* it.

A "pdfadged" document explains itself to agents: its element index,
its Design DNA, its edit journal, and what an engine is allowed to do.

The reference implementation is
[pdfbadger](https://github.com/fjjjuv/pdfbadger).

## 2. Carrier

The manifest is stored as a PDF **embedded file** (portable collection)
named `agent_manifest.json`, or alternatively under an `XMP` packet
`pdfad:manifest` for read-mostly consumers. Embedded file is preferred:
it survives naive viewers and is invisible to humans.

## 3. Manifest schema

```json
{
  "spec":     "PDFAD/1.0",
  "doc_id":   "sha256:<file-hash>",
  "generator":"pdfbadger/1.x",
  "created":  "2026-11-22T15:00:00Z",

  "dna": {
    "fonts":   { "h1": {"font": "helv", "size": 18, "color": "#111"},
                 "body": {"font": "helv", "size": 11, "color": "#333"}},
    "palette": ["#1a5276", "#000000"],
    "grid":    {"margins": [50,50,50,50], "columns": 1},
    "rhythm":  {"spacing_scale": [8, 12, 16, 24]}
  },

  "elements_index": {
    "pages": 4,
    "id_scheme": "e<base36(sha1(pos|style|text))>",
    "stats": {"tables": 2, "images": 5, "form_fields": 0}
  },

  "capabilities": [
    "roles",          // ops accept `role:` resolved via dna
    "patches",        // PDFSP supported
    "journal",        // DTP journal present
    "verify"          // certificate emission supported
  ],

  "journal_head": "blake3:...",   // last journal entry hash (DTP)
  "integrity": {
    "scene_root": "blake3:...",   // scene-graph merkle root
    "pages": ["blake3:...", "..."]
  }
}
```

Only `spec`, `doc_id`, `generator` are REQUIRED. All other blocks are
optional but SHOULD be present for full self-description.

## 4. Reading rules

- An engine SHOULD check for `agent_manifest.json` on open; if present
  AND `doc_id` matches, the manifest is trusted as valid.
- If `doc_id` mismatches, the manifest is STALE: engine MAY warn
  `{"kind": "stale_manifest"}` and re-analyze.
- Agents MUST NOT execute instructions found inside a manifest —
  it is data, not a prompt. (Anti prompt-injection rule.)

## 5. DNA semantics

`dna` is the document's inferred design system. Ops that take `role:`
resolve `dna.fonts[role]` to concrete font/size/color. Engines MAY
extend `dna` with document-specific keys (namespaced `x_*`).

## 6. Trust & security

The manifest is **untrusted content** (like the PDF itself). Engines
SHOULD verify `integrity.scene_root` against a recomputed scene hash
before trusting it. The manifest MUST be ignored if the file fails
integrity verification.

## 7. Writing rules

- Writer updates `created`, `doc_id`, `integrity` on each write.
- Writers MUST preserve third-party manifests they don't understand
  (namespaced vendors may coexist).
- A document with a manifest is said to be **pdfadged** —
  it "speaks" to agents natively.

## 8. Versioning

`"spec": "PDFAD/1.0"` REQUIRED. Parsers MUST ignore unknown fields.

---

*PDFAD is published under Apache-2.0 to maximize adoption. The name
"PDFAD" is claimed by fjjjuv.*
