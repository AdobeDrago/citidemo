### Best Practices Brief for High-Quality Migration to Edge Delivery Services

#### Objective

Migrate the customer site to **Edge Delivery Services (EDS)** in a way that maximizes:

- **reuse over re-creation**
- **author simplicity over implementation cleverness**
- **global theming over per-page styling**
- **variants over block proliferation**
- **semantic, performant HTML/CSS over JS-heavy rendering**
- **shared-code scalability for multi-site use cases**

The target outcome is **not** a pixel-perfect clone of legacy complexity. The target outcome is a **clean, maintainable, high-performance EDS implementation** that preserves business intent while simplifying authoring and future evolution.

---

#### Non-Negotiable Migration Principles

1. **Start with one representative page before scaling.**  
   Migrate and validate a single page or a small pattern set first. Only after the block mapping, global styling, and authoring model are validated should bulk migration proceed.

2. **Establish the global design system first.**  
   Build the site-wide design layer first: color palette, typography, spacing, section behavior, and reusable design tokens. Then style individual blocks against that token layer.

3. **Prefer existing blocks and variants before creating new blocks.**  
   Reuse the closest existing block. If the content model is the same and only the presentation changes, create a **variant** or **option**, not a net-new block.

4. **Keep authoring simple.**  
   Complexity should live in code and configuration, not in author workflows or deeply customized content structures.

5. **Do not model nested legacy component hierarchies literally.**  
   EDS blocks should stay flat and reusable. If a legacy design appears nested, represent it through sections, fragments, allowed compositions, or author-friendly patterns rather than true nested blocks.

6. **Favor performance-safe implementations.**  
   Blocks should be styled primarily with CSS and only use JavaScript when functionality truly requires it.

---

#### Rules for Block Creation

When deciding whether to create, reuse, or extend a block, apply this logic:

- **Reuse an existing block** when the authored content structure is effectively the same.
- **Create a block variant/option** when the authored content is the same but the layout or visual treatment differs.
- **Create a new block** only when the content model, semantic purpose, or interaction model is materially different.
- **Keep block names semantic**, based on purpose or content pattern, not one-off visual appearance.
- **Avoid creating page-specific blocks** unless the pattern is truly unique and likely to remain isolated.
- **Do not create a new block just to match a styling exception** if a theme token, section style, or variant will solve it.

A good migration should produce a **small, intentional block library**, not a one-block-per-section inventory of the old site.

---

#### Rules for Block Styling

- Style blocks against the **semantic HTML rendered by EDS**, not against the transient DOM seen inside Universal Editor.
- Prefer **CSS-only styling** whenever possible.
- If JavaScript is required, it should enable behavior, not compensate for poor content modeling.
- Keep styling **token-driven** using CSS variables for color, spacing, typography, and rhythm.
- Put block CSS with the block and keep it scoped and predictable.
- Use **block options / classes** to support approved visual variants.
- Avoid large global overrides that create coupling between unrelated blocks.
- Keep selectors **short, local, and maintainable**.
- Avoid styling approaches that make later theming or multi-site reuse difficult.

---

#### Variants, Not Clones

When a legacy site has multiple visual treatments of the same editorial pattern:

- create **one canonical block**
- expose approved **options/variants**
- style those variants via classes and shared tokens
- avoid duplicating code into separate blocks unless the content model truly changes

Examples:
- light vs dark hero
- image-left vs image-right teaser
- compact vs detailed cards
- campaign vs evergreen styling

These should usually be **variants**, not separate blocks.

---

#### Guidance for Headers, Footers, and Mega-Menus

Treat header, footer, and mega-menu migration as **high-attention patterns**, not routine imports.

- Use **explicit structural instructions** for these areas.
- Describe row structure, hierarchy, key items, interaction expectations, and composition clearly.
- Expect a manual critique/refinement pass after first generation.
- Validate these areas separately before bulk import because they tend to require more precision than normal editorial blocks.

---

#### Quality Guardrails for Migration Output

Every migrated page or reusable pattern should be checked for:

- correct block mapping
- correct use of variants instead of duplicate blocks
- semantic heading structure
- token-driven styling consistency
- responsive behavior
- accessibility regressions
- unnecessary JavaScript/CSS weight
- content completeness after import
- author usability in Universal Editor
- suitability for reuse in future pages

Do not accept a migration as “done” if it visually resembles the old page but creates a brittle authoring model or an overgrown block library.

---

#### Use of Web Components or Custom JS

Use Web Components or heavier JS **selectively**, not by default.

- Standard editorial patterns should remain EDS blocks.
- If a design-system element or complex UI behavior must be reused, initialize it **inside a block**.
- Load it **only where needed**.
- Do not let a web-component strategy replace the EDS authoring model.
- Blocks should remain the authoring contract; embedded components should remain implementation detail.

---

#### Repoless and Shared-Repo Multi-Site Guidance

Use **repoless** when multiple sites:

- mostly differ in **content**
- share the majority of **blocks, CSS, and behavior**
- can operate from a **single codebase**
- benefit from centralized fixes and faster rollout

Best practices for repoless:

- Create and validate the **base site first**.
- Add additional sites as separate Edge Delivery sites that point to the **same codebase**.
- Drive site differences through **configuration, metadata, path mappings, site identifiers, and theme tokens**, not code duplication.
- Use repoless when sites are substantially similar; use separate repos when release isolation, access isolation, or architectural divergence is more important than reuse.

---

#### Recommended Theme Strategy for Multiple Sites on One Shared Repo

For multi-site reuse, structure the implementation around **shared blocks + shared tokens + site theme overrides**:

- **Shared blocks** define the reusable editorial and functional patterns.
- **Global design tokens** define the base system for color, spacing, typography, radius, etc.
- **Site themes** override only what is meant to differ between sites: brand colors, fonts, selected spacing scales, section accents, and approved visual treatments.
- **Site-specific blocks** should be rare and justified.

Recommended decision rule:

- If two sites can use the **same block model** and the same authored fields, keep one shared block and vary it by theme/variant.
- If two sites need **different authoring models or different field structures**, split them into separate blocks.
- If only a small number of blocks differ, keep one repo.
- If the sites need strong release separation, team separation, or highly different block visibility/modeling, separate repos may be the better long-term choice.

---

#### Important Caveat for Shared-Repo Multi-Site Projects

In some current shared-repo/UE setups, **per-site block visibility and component model separation can be a constraint**. If all sites share one repo, all blocks may be visible unless additional handling is introduced. If strict brand/site-specific block exposure is required, evaluate one of these approaches:

- separate repos for sites requiring strict isolation
- custom UE/editor support
- a future multi-model capability, if available in the target environment

Do **not** assume that one shared repo automatically gives perfect per-site authoring isolation.

---

#### What the Agent Should Avoid

Avoid these anti-patterns:

- cloning blocks for styling-only differences
- reproducing legacy nested component structures literally
- creating one-off blocks for single pages
- solving styling with JS when CSS is enough
- letting block count grow without reuse discipline
- overfitting to visual quirks from the source site
- carrying forward avoidable inconsistencies from legacy implementations
- using repoless when sites have fundamentally different authoring models and release needs
- assuming bulk import quality without a critique pass

---

#### Preferred Working Sequence for the Agent

1. **Analyze one representative page**
2. **Identify reusable patterns**
3. **Map to existing blocks first**
4. **Define approved variants/options**
5. **Build global theme/tokens**
6. **Style blocks against shared tokens**
7. **Critique header/footer/navigation separately**
8. **Validate responsive/accessibility/performance**
9. **Only then bulk-import additional pages**
10. **Refactor duplicates out of the block library**



