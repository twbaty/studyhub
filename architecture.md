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

# Domain Model and Naming Conventions

## Purpose

StudyHub uses a consistent vocabulary across documentation, content files,
user interfaces, and source code.

These terms define the project’s domain model.

Using consistent names prevents the same concept from being described
differently in the application, documentation, and study content.

---

## Core Terms

### StudyHub

The complete platform.

StudyHub includes:

- the application engine
- study tracks
- study content
- review functionality
- local learner progress
- supporting tools and documentation

Use **StudyHub** as the project and product name.

Do not use variations such as:

- Study Hub
- Study-Hub
- Studyhub

---

### Engine

The subject-independent software that presents and manages study content.

The engine is responsible for:

- loading tracks
- displaying questions
- rendering explanations
- managing sessions
- storing progress
- presenting review and practice modes

The engine must not contain subject-specific knowledge.

Preferred term:

> StudyHub Engine

Avoid:

- quiz engine
- CHFI engine
- course engine
- learning management system

---

### Study Track

A distinct subject or body of knowledge within StudyHub.

Examples:

- CHFI
- Accident Reconstruction
- CEDS
- Digital Evidence Acquisition
- Python

A Study Track may contain:

- study guides
- topics
- question banks
- references
- images
- metadata

Preferred term:

> Study Track

Use **track** in code and file names.

Examples:

```text
tracks/chfi/
tracks/accident-reconstruction/
track_id
track_title
