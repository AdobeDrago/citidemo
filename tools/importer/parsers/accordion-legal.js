/* eslint-disable */
/* global WebImporter */

/**
 * Parser: accordion-legal
 * Base block: accordion
 * Source: https://www.citi.com/mortgage/home-mortgage
 * Selector: section#app-accordion.accordion.legal
 * Generated: 2026-06-08
 *
 * Target structure: Each row = [heading, body] per accordion item.
 * Extracts accordion items from Citi's legal accordion section.
 * Each cds-accordion2-section becomes one row with [heading, body content].
 */
export default function parse(element, { document }) {
  // Find all accordion sections (each is one expandable item)
  const accordionSections = element.querySelectorAll('cds-accordion2-section, .cds-accordion2-section');

  const cells = [];

  accordionSections.forEach((section) => {
    // Extract heading from accordion header (h2, h3, or fallback to header text)
    const heading = section.querySelector('.accordion2-header h2, .accordion2-header h3, .accordion2-header-left h2, .accordion2-header-left h3');

    // Extract body content from submenu/description area
    const bodyContainer = section.querySelector('.cds-accordion2-submenu .section-desc, .cds-accordion2-submenu');

    if (heading && bodyContainer) {
      // Clone body content to avoid modifying the original DOM unexpectedly
      const bodyContent = bodyContainer.cloneNode(true);

      // Remove navigation/utility links (go back, back to top) that are not content
      const navWrappers = bodyContent.querySelectorAll('.go-back-link-wrapper, .back-to-top-wrapper');
      navWrappers.forEach((nav) => nav.remove());

      // Remove any remaining section-link anchors (navigation utility links, not content)
      const sectionLinks = bodyContent.querySelectorAll('a.section-link');
      sectionLinks.forEach((link) => link.remove());

      // Remove empty paragraphs (nbsp spacers)
      const emptyParas = bodyContent.querySelectorAll('p');
      emptyParas.forEach((p) => {
        if (p.textContent.trim() === '' || p.innerHTML.trim() === '&nbsp;') {
          p.remove();
        }
      });

      // Build row: [heading cell, body cell]
      cells.push([heading, bodyContent]);
    }
  });

  // If no structured sections found, try a fallback approach for simpler accordion markup
  if (cells.length === 0) {
    const headings = element.querySelectorAll('.accordion2-header h2, .accordion2-header h3, h2, h3');
    const bodies = element.querySelectorAll('.cds-accordion2-submenu, .section-desc');

    const count = Math.min(headings.length, bodies.length);
    for (let i = 0; i < count; i++) {
      cells.push([headings[i], bodies[i]]);
    }
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-legal', cells });
  element.replaceWith(block);
}
