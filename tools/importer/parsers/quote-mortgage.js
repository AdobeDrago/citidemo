/* eslint-disable */
/* global WebImporter */

/**
 * Parser for quote-mortgage
 * Base block: quote
 * Source: https://www.citi.com/mortgage/home-mortgage
 * Selector: section#app-utility-banner.utilitybanner
 * Generated: 2026-06-08
 *
 * Handles two source variations:
 * 1. Zillow rating banner (zillow-content): rating, review count, Zillow logo, copyright
 * 2. Customer testimonial (headline-container): quote icon, heading, quote text, author, CTA
 *
 * Block structure (per quote block decoration):
 * - Row 1: Quotation content (quote text, heading, images)
 * - Row 2: Attribution content (author name, source reference)
 */
export default function parse(element, { document }) {
  const cells = [];

  // Variation 1: Zillow rating banner (zillow-content structure)
  const zillowContent = element.querySelector('.zillow-content');
  if (zillowContent) {
    // Row 1 (quotation): rating value + star description + review count + Zillow logo
    const quotationContent = [];

    const ratingValue = element.querySelector('.zillow-rating');
    const totalRating = element.querySelector('.zillow-total-rating');
    if (ratingValue || totalRating) {
      // Create a paragraph to hold the rating text
      const ratingP = document.createElement('p');
      if (ratingValue) ratingP.append(ratingValue.textContent.trim());
      if (totalRating) ratingP.append(' ' + totalRating.textContent.trim());
      quotationContent.push(ratingP);
    }

    const totalReview = element.querySelector('.zillow-total-review p');
    if (totalReview) quotationContent.push(totalReview);

    const zillowLogo = element.querySelector('.zillow-copyright-image img');
    if (zillowLogo) quotationContent.push(zillowLogo);

    const zillowCopyright = element.querySelector('.zillow-copyright p');
    if (zillowCopyright) quotationContent.push(zillowCopyright);

    cells.push(quotationContent);

    // Row 2 (attribution): "How this rating is calculated" link
    const attributionContent = [];
    const ratingLink = element.querySelector('a.zillow-link');
    if (ratingLink) attributionContent.push(ratingLink);
    if (attributionContent.length > 0) {
      cells.push(attributionContent);
    }
  } else {
    // Variation 2: Customer testimonial (headline-container / tile-container structure)
    const quotationContent = [];

    // Quote icon image
    const quoteIcon = element.querySelector('.tile-wrapper .citi-image img');
    if (quoteIcon) quotationContent.push(quoteIcon);

    // Section heading (e.g., "See what our customers are saying")
    const heading = element.querySelector('.headline-text h2, .headline-text h3');
    if (heading) quotationContent.push(heading);

    // Quote title (bold heading within the description, e.g., "Very professional")
    const quoteTitle = element.querySelector('.zillow-comment-heading');
    if (quoteTitle) {
      const titleP = quoteTitle.closest('p');
      if (titleP) quotationContent.push(titleP);
    }

    // Quote body text (the actual testimonial paragraph)
    const descSection = element.querySelector('.headline-desc');
    if (descSection) {
      const paragraphs = descSection.querySelectorAll(':scope > p');
      paragraphs.forEach((p) => {
        // Skip the title paragraph and author paragraph (already handled separately)
        const hasCommentHeading = p.querySelector('.zillow-comment-heading');
        const hasCommentAuthor = p.querySelector('.zillow-comment-author');
        if (!hasCommentHeading && !hasCommentAuthor) {
          quotationContent.push(p);
        }
      });
    }

    cells.push(quotationContent);

    // Row 2 (attribution): author + CTA link
    const attributionContent = [];

    const author = element.querySelector('.zillow-comment-author');
    if (author) {
      const authorP = author.closest('p');
      if (authorP) attributionContent.push(authorP);
    }

    // CTA link (e.g., "See more reviews on Zillow")
    const ctaLink = element.querySelector('.headline-container a.cds-button, .headline-container a.rtb-link');
    if (ctaLink) attributionContent.push(ctaLink);

    if (attributionContent.length > 0) {
      cells.push(attributionContent);
    }
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'quote-mortgage', cells });
  element.replaceWith(block);
}
