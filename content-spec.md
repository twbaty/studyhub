# StudyHub Content Specification

## Overview

StudyHub separates educational content from application logic.

Every study track follows the same structure.

```
track/

index.md

notes/

references/

images/

questions.json

metadata.json
```

---

## metadata.json

Example

```json
{
  "title": "CHFI",
  "version": "1.0",
  "author": "Tom",
  "description": "Computer Hacking Forensic Investigator study guide"
}
```

---

## Question Format

Each question is stored independently.

```json
{
  "id": "CHFI-001",
  "category": "Evidence Collection",
  "difficulty": 2,

  "question": "What should be collected first during live response?",

  "choices": [
    "Hard drive",
    "RAM",
    "Keyboard",
    "Network cable"
  ],

  "answer": 1,

  "explanation":
    "Volatile memory disappears when power is removed."
}
```

---

## Notes

Notes are written in Markdown.

Example

```
notes/

Evidence Collection.md

Chain of Custody.md

Volatile Data.md
```

Markdown allows:

- images
- diagrams
- code blocks
- tables
- hyperlinks

---

## References

Supporting material may include:

PDF

Images

Videos

External links

Official documentation

These remain separate from the learning engine.

---

## Future Extensions

The specification should eventually support:

Hints

Tags

Difficulty

Multiple explanations

Images inside questions

Diagrams

Embedded videos

Code snippets

Math

Cross references

Bookmarks

Related questions

Adaptive review metadata

None of these extensions should break compatibility with existing content.
