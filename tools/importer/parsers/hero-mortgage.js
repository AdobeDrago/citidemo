/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-mortgage
 * Base block: hero
 * Source: https://www.citi.com/mortgage/home-mortgage
 * Instances:
 *   - section#app-hero.hero (main hero with eyebrow, heading, description, CTAs, side image)
 *   - section.banner.callout-shadow (banner with background image, heading, CTAs)
 * Generated: 2026-06-08
 */
export default function parse(element, { document }) {
  const cells = [];

  // Determine which instance type we're dealing with
  const isCalloutBanner = element.classList.contains('callout-shadow');

  if (isCalloutBanner) {
    // Instance 2: section.banner.callout-shadow
    // Background image from inline style background-image
    const bgStyle = element.getAttribute('style') || '';
    const bgMatch = bgStyle.match(/url\(["']?([^"')]+)["']?\)/);
    if (bgMatch) {
      const img = document.createElement('img');
      img.src = bgMatch[1];
      img.alt = '';
      cells.push([img]);
    }

    // Content cell: heading + CTA buttons
    const contentCell = [];
    const heading = element.querySelector('.banner__content-headsection h3, .banner__content-headsection h2, .description h3');
    if (heading) contentCell.push(heading);

    const ctaButtons = element.querySelectorAll('.banner__content-buttonsection a, .banner__content a.cds-button');
    ctaButtons.forEach((btn) => contentCell.push(btn));

    if (contentCell.length > 0) cells.push(contentCell);
  } else {
    // Instance 1: section#app-hero.hero
    // Background/side image
    const heroImage = element.querySelector('.hero__image img, .hero__background img, app-image img');
    if (heroImage) {
      cells.push([heroImage]);
    }

    // Content cell: eyebrow + heading + description + CTAs
    const contentCell = [];

    // Eyebrow text (H1 in .eyebrow-copy)
    const eyebrow = element.querySelector('.eyebrow-copy h1, .hero__text .cds-text-header h1');
    if (eyebrow) contentCell.push(eyebrow);

    // Main heading (H2 in .headline-copy)
    const mainHeading = element.querySelector('.headline-copy .headline h2, .headline-copy .cds-text-header h2, .hero__text-wrapper .headline h2');
    if (mainHeading) contentCell.push(mainHeading);

    // Description paragraph
    const description = element.querySelector('.description p, .hero__text-wrapper .description p');
    if (description) contentCell.push(description);

    // CTA buttons
    const ctaButtons = element.querySelectorAll('.hero__text-cta a, .hero__text-cta .cds-button');
    ctaButtons.forEach((btn) => contentCell.push(btn));

    if (contentCell.length > 0) cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-mortgage', cells });
  element.replaceWith(block);
}
