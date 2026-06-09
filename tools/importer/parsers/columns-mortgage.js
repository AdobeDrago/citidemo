/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-mortgage
 * Base block: columns
 * Source: https://www.citi.com/mortgage/home-mortgage
 * Instances:
 *   - section#preferredProgram.banner.image-left (image left, content right with list)
 *   - section#app-twocolumnteaser.twocolumnteaser (two-column promotional offer)
 *   - section#app-banner.banner.image-right (content left, image right)
 * Generated: 2026-06-08
 */
export default function parse(element, { document }) {
  const cells = [];

  // Detect layout type based on element classes/structure
  const isTwoColumnTeaser = element.classList.contains('twocolumnteaser');
  const isImageLeft = element.classList.contains('image-left');
  const isImageRight = element.classList.contains('image-right');

  if (isTwoColumnTeaser) {
    // Two-column teaser: side-by-side promotional columns separated by "OR" divider
    const columns = element.querySelectorAll('.column-dimensions');

    if (columns.length >= 2) {
      const leftContent = [];
      const rightContent = [];

      // Process first column (left)
      const col1Header = columns[0].querySelector('.column-header h3');
      const col1Subhead = columns[0].querySelector('.column-subhead');
      const col1Cta = columns[0].querySelector('a.cds-button');
      const col1Legal = columns[0].querySelector('.column-legal-text');

      if (col1Header) leftContent.push(col1Header);
      if (col1Subhead) leftContent.push(col1Subhead);
      if (col1Cta) leftContent.push(col1Cta);
      if (col1Legal) leftContent.push(col1Legal);

      // Process second column (right)
      const col2Header = columns[1].querySelector('.column-header h3');
      const col2Subhead = columns[1].querySelector('.column-subhead');
      const col2Cta = columns[1].querySelector('a.cds-button, a.column-link');
      const col2Legal = columns[1].querySelector('.column-legal-text');

      if (col2Header) rightContent.push(col2Header);
      if (col2Subhead) rightContent.push(col2Subhead);
      if (col2Cta) rightContent.push(col2Cta);
      if (col2Legal) rightContent.push(col2Legal);

      cells.push([leftContent, rightContent]);
    }
  } else if (isImageLeft) {
    // Image-left layout: image in left column, text content in right column
    const image = element.querySelector('.banner__image img');
    const leftCol = [];
    if (image) leftCol.push(image);

    const rightCol = [];
    const eyebrow = element.querySelector('.eyebrow-copy');
    const heading = element.querySelector('.headline-copy h2, .headline-copy h3');
    const description = element.querySelector('.description');
    const listSection = element.querySelector('.multifield-description ul');
    const cta = element.querySelector('.banner__content-buttonsection a');

    if (eyebrow) rightCol.push(eyebrow);
    if (heading) rightCol.push(heading);
    if (description) rightCol.push(description);
    if (listSection) rightCol.push(listSection);
    if (cta) rightCol.push(cta);

    cells.push([leftCol, rightCol]);
  } else if (isImageRight) {
    // Image-right layout: text content in left column, image in right column
    const leftCol = [];
    const heading = element.querySelector('.headline-copy h2, .headline-copy h3');
    const description = element.querySelector('.description');
    const cta = element.querySelector('.banner__content-buttonsection a');

    if (heading) leftCol.push(heading);
    if (description) leftCol.push(description);
    if (cta) leftCol.push(cta);

    const rightCol = [];
    const image = element.querySelector('.banner__image img');
    if (image) rightCol.push(image);

    cells.push([leftCol, rightCol]);
  } else {
    // Fallback: generic two-column detection
    const image = element.querySelector('img');
    const contentSection = element.querySelector('.banner__content, .twocolumnteaser__content');

    const leftCol = [];
    const rightCol = [];

    if (image) leftCol.push(image);
    if (contentSection) rightCol.push(contentSection);

    if (leftCol.length || rightCol.length) {
      cells.push([leftCol, rightCol]);
    }
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-mortgage', cells });
  element.replaceWith(block);
}
