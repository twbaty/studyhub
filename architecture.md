# StudyHub Architecture

## Overview

StudyHub consists of two independent layers.

```
+-----------------------------+
|        Study Content        |
|-----------------------------|
| Markdown                    |
| JSON Question Banks         |
| Images                      |
| References                  |
+-------------▲---------------+
              │
              │
+-------------┴---------------+
|      StudyHub Engine        |
|-----------------------------|
| Navigation                  |
| Review Mode                 |
| Learn Mode                  |
| Exam Mode                   |
| Search                      |
| Progress Tracking           |
+-----------------------------+
```

The engine presents content.

The content contains the knowledge.

Neither depends on the other.

---

## Study Tracks

Each subject is called a Study Track.

Example:

```
StudyHub

CHFI

CEDS

Accident Reconstruction

Digital Forensics

Python

Networking
```

Each track contains:

- Notes
- References
- Question Banks
- Images
- Metadata

---

## Engine Responsibilities

The engine is responsible for:

- Loading study tracks
- Rendering notes
- Presenting questions
- Tracking progress
- Searching content
- Bookmarking
- Reviewing missed questions

The engine never contains subject-specific knowledge.

---

## Storage

Static content

- Markdown
- JSON

User data

- Browser Local Storage
- Optional export/import

Future possibilities

- SQLite
- Synchronization
- Multiple devices

---

## Design Goals

The architecture should remain:

- Modular
- Portable
- Static-site compatible
- Easy to extend
- Easy to maintain

No server should be required for normal operation.
