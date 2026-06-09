/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-mortgage
 * Base block: cards
 * Source: https://www.citi.com/mortgage/home-mortgage
 * Generated: 2026-06-08
 *
 * Handles 4 card layout variations:
 * 1. rtb-tiles: icon + heading + link (hero action tiles)
 * 2. crosslink: icon + eyebrow + link (additional options)
 * 3. benefitcards: image + heading + description + link
 * 4. contactus: heading + description/phone + link (contact tiles)
 *
 * Target structure: Cards block with one row per card.
 * Each row has two cells: [image] [body content (heading, description, links)]
 */
export default function parse(element, { document }) {
  const cells = [];

  // Variation 1: rtb-tiles (hero action tiles with icons)
  const tileContainers = element.querySelectorAll('.tile-container');
  if (tileContainers.length > 0) {
    tileContainers.forEach((tile) => {
      const img = tile.querySelector('.headline-icon img, .citi-image img');
      const heading = tile.querySelector('.headline-text h2, .headline-text h3, .headline-text div h3');
      const description = tile.querySelector('.headline-desc p, .headline-desc');
      const link = tile.querySelector('.tile-btn a, a.rtb-link, a.overlay-link');
      const descText = tile.querySelector('.subhead-copy');
      const descBlock = tile.querySelector('.headline-desc');

      const imageCell = [];
      if (img) imageCell.push(img);

      const bodyCell = [];
      if (heading) bodyCell.push(heading);
      // Handle description from contactus variant (has .headline-desc with paragraphs)
      if (descBlock && descBlock.children.length > 0) {
        const paras = descBlock.querySelectorAll('p');
        paras.forEach((p) => bodyCell.push(p));
      }
      if (link) bodyCell.push(link);

      cells.push([imageCell.length ? imageCell : '', bodyCell]);
    });
  }

  // Variation 2: crosslink (additional mortgage options)
  const crosslinkSections = element.querySelectorAll('.crosslink__sections .additional-options, section.additional-options');
  if (crosslinkSections.length > 0 && tileContainers.length === 0) {
    crosslinkSections.forEach((section) => {
      const img = section.querySelector('.icon-wrapper img, .citi-image img');
      const eyebrow = section.querySelector('.eyebrow p');
      const link = section.querySelector('a.article-link, a.overlay-link');

      const imageCell = [];
      if (img) imageCell.push(img);

      const bodyCell = [];
      if (eyebrow) bodyCell.push(eyebrow);
      if (link) bodyCell.push(link);

      cells.push([imageCell.length ? imageCell : '', bodyCell]);
    });
  }

  // Variation 3: benefitcards (image + heading + description + link)
  const benefitCards = element.querySelectorAll('.benefitcards__browservariation .benefitcards__contentbox-boxmodel');
  if (benefitCards.length > 0 && tileContainers.length === 0 && crosslinkSections.length === 0) {
    benefitCards.forEach((card) => {
      const img = card.querySelector('.boxmodel-image img, app-image img');
      const heading = card.querySelector('.boxmodel-header-left h2, h2');
      const description = card.querySelector('.boxmodel-description p, .boxmodel-description-left p');
      const link = card.querySelector('a.boxmodel-link, a.cds-button');

      const imageCell = [];
      if (img) imageCell.push(img);

      const bodyCell = [];
      if (heading) bodyCell.push(heading);
      if (description) bodyCell.push(description);
      if (link) bodyCell.push(link);

      cells.push([imageCell.length ? imageCell : '', bodyCell]);
    });
  }

  // Fallback: generic card detection for unexpected structures
  if (cells.length === 0) {
    const items = element.querySelectorAll('[class*="card"], [class*="tile"], [class*="item"], [class*="box"]');
    items.forEach((item) => {
      // Avoid nested duplicates by skipping items inside already-processed parents
      if (item.closest('.tile-container') !== item && item.querySelector('.tile-container')) return;

      const img = item.querySelector('img');
      const heading = item.querySelector('h2, h3, h4');
      const description = item.querySelector('p');
      const link = item.querySelector('a');

      const imageCell = [];
      if (img) imageCell.push(img);

      const bodyCell = [];
      if (heading) bodyCell.push(heading);
      if (description) bodyCell.push(description);
      if (link && link !== description) bodyCell.push(link);

      if (bodyCell.length > 0) {
        cells.push([imageCell.length ? imageCell : '', bodyCell]);
      }
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-mortgage', cells });
  element.replaceWith(block);
}
