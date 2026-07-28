# PROJECT_PRINCIPLES.md

# StudyHub Project Principles

> "Every feature should support learning. Everything else is negotiable."

---

# Purpose

This document serves as the architectural constitution for StudyHub.

Features, technologies, and implementation details will evolve over time. These principles are intended to remain relatively stable and guide those decisions.

Whenever there are multiple ways to solve a problem, the solution that best aligns with these principles should be preferred.

---

# 1. Learning Comes First

StudyHub exists to help people learn.

It does not exist to:

- maximize test scores
- collect statistics
- encourage streaks
- gamify education

If a feature improves learning, it belongs.

If it primarily increases complexity without improving understanding, it should be questioned.

---

# 2. Study Before Testing

The primary workflow is:

Understand

↓

Practice

↓

Review

↓

Master

↓

Test

Testing is an assessment tool.

Learning is the product.

StudyHub should encourage understanding before evaluation.

---

# 3. Explanations Matter More Than Answers

Knowing the correct answer is useful.

Understanding *why* it is correct is valuable.

Whenever possible, every question should include an explanation.

A question without an explanation teaches very little.

---

# 4. Content is More Valuable Than Software

The software exists to present knowledge.

The knowledge is the long-term asset.

If the application disappeared tomorrow, the educational content should remain usable.

The application should never lock educational material into proprietary formats.

---

# 5. Open Formats Win

Whenever practical, use formats that remain readable for decades.

Preferred formats include:

- Markdown
- JSON
- PNG
- SVG
- CSV
- PDF

Avoid proprietary storage whenever possible.

---

# 6. Separate Content from Engine

StudyHub consists of two independent parts.

The engine provides functionality.

The content provides knowledge.

Neither should depend on the other.

This allows:

- new study tracks
- new certifications
- new disciplines

without changing the application itself.

---

# 7. Local First

Users should own their learning.

Progress should remain on the user's device unless they explicitly choose otherwise.

Internet connectivity should not be required for normal study.

Cloud synchronization is optional—not mandatory.

---

# 8. Simplicity is a Feature

Every dependency introduces maintenance.

Every framework introduces complexity.

Every abstraction should justify its existence.

Before adding technology, ask:

"Does this solve a real problem?"

If the answer is no, don't add it.

---

# 9. Portability Matters

StudyHub should run anywhere reasonably possible.

Target environments include:

- Windows
- macOS
- Linux
- Tablets
- Mobile browsers

The application should avoid platform-specific assumptions.

---

# 10. Documentation is Part of the Product

Documentation is not something added after the software.

Documentation *is* the software.

Every significant decision should be documented.

Future contributors—including the original author months later—should understand why decisions were made.

---

# 11. Modular by Default

Large systems remain maintainable by separating responsibilities.

Examples include:

- study tracks
- question banks
- notes
- references
- import tools
- review engine

Each component should have a clear purpose.

---

# 12. Build for Yourself First

StudyHub was created to solve a personal problem.

Features should first satisfy real learning needs encountered during actual study.

Avoid adding features simply because similar applications have them.

Solve actual problems before hypothetical ones.

---

# 13. Respect the Learner

The application should never intentionally manipulate users into returning.

No streaks.

No psychological pressure.

No artificial engagement mechanics.

If users return, it should be because the platform genuinely helps them learn.

---

# 14. Accessibility is Quality

Educational software should be usable by as many people as possible.

Consider:

- keyboard navigation
- readable typography
- color contrast
- responsive layouts
- screen readers

Accessibility is part of good engineering.

---

# 15. Make the Right Thing Easy

The easiest workflow should also be the best workflow.

Examples:

Good explanations should be easier to create than poor ones.

Importing content should be easier than manually editing JSON.

Reviewing missed questions should require one click.

Good design removes unnecessary work.

---

# 16. The Platform Should Age Gracefully

StudyHub should still be understandable years from now.

Prefer technologies with long-term stability over short-lived trends.

A smaller, understandable codebase is preferable to a larger, fashionable one.

---

# Decision Checklist

Before introducing a feature, ask:

✓ Does it improve learning?

✓ Does it increase understanding?

✓ Does it preserve portability?

✓ Does it keep content independent?

✓ Does it remain simple?

✓ Will it still make sense in five years?

If several answers are "no," reconsider the feature.

---

# Final Principle

StudyHub is not trying to become the biggest study platform.

It is trying to become a well-designed one.

Every decision should support that goal.
