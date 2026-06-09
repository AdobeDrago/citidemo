/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Citi section breaks and section metadata.
 * Inserts <hr> section breaks and Section Metadata blocks based on template sections.
 * Runs in afterTransform only — uses payload.template.sections from page-templates.json.
 * All selectors verified from captured DOM in migration-work/cleaned.html.
 *
 * Template sections (10 total):
 *   1. Hero: selector "app-hero"
 *   2. Action Tiles: selector ["app-hero .rtb-headline", "app-hero .rtb-tiles", "app-cross-link section.crosslink"]
 *   3. JD Power Award Banner: selector "section#preferredProgram.banner.image-left"
 *   4. Promotional Offer: selector "app-twocolumnteaser" (style: "blue-gradient")
 *   5. Benefit Cards: selector "app-benefit-cards"
 *   6. All You Need Banner: selector "section.banner.callout-shadow"
 *   7. Meet HomeStory: selector "section#app-banner.banner.image-right"
 *   8. Zillow Rating: selector "app-utility-banner" (style: "grey")
 *   9. Contact Us: selector "app-contactus"
 *  10. Legal Accordion: selector "app-accordion"
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    const document = element.ownerDocument;

    // Process sections in reverse order to avoid index shifting
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const selectorList = Array.isArray(section.selector) ? section.selector : [section.selector];

      // Find the first matching element for this section
      let sectionEl = null;
      for (const sel of selectorList) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }

      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        // Insert section metadata after the section element
        if (sectionEl.nextSibling) {
          sectionEl.parentNode.insertBefore(sectionMetadata, sectionEl.nextSibling);
        } else {
          sectionEl.parentNode.appendChild(sectionMetadata);
        }
      }

      // Insert <hr> before the section element (except for the first section)
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.parentNode.insertBefore(hr, sectionEl);
      }
    }
  }
}
