/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroMortgageParser from './parsers/hero-mortgage.js';
import cardsMortgageParser from './parsers/cards-mortgage.js';
import columnsMortgageParser from './parsers/columns-mortgage.js';
import quoteMortgageParser from './parsers/quote-mortgage.js';
import accordionLegalParser from './parsers/accordion-legal.js';

// TRANSFORMER IMPORTS
import citiCleanupTransformer from './transformers/citi-cleanup.js';
import citiDmImagesTransformer from './transformers/citi-dm-images.js';
import citiSectionsTransformer from './transformers/citi-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-mortgage': heroMortgageParser,
  'cards-mortgage': cardsMortgageParser,
  'columns-mortgage': columnsMortgageParser,
  'quote-mortgage': quoteMortgageParser,
  'accordion-legal': accordionLegalParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  citiCleanupTransformer,
  citiDmImagesTransformer,
  citiSectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'mortgage-page',
  description: 'Mortgage product landing page with rates, calculators, and product information',
  urls: ['https://www.citi.com/mortgage/home-mortgage'],
  blocks: [
    {
      name: 'hero-mortgage',
      instances: ['section#app-hero.hero', 'section.banner.callout-shadow'],
    },
    {
      name: 'cards-mortgage',
      instances: ['app-hero .rtb-tiles', 'section.crosslink', 'app-benefit-cards .benefitcards__container', 'app-contactus section.contactus'],
    },
    {
      name: 'columns-mortgage',
      instances: ['section#preferredProgram.banner.image-left', 'section#app-twocolumnteaser.twocolumnteaser', 'section#app-banner.banner.image-right'],
    },
    {
      name: 'quote-mortgage',
      instances: ['section#app-utility-banner.utilitybanner'],
    },
    {
      name: 'accordion-legal',
      instances: ['section#app-accordion.accordion.legal'],
    },
  ],
  sections: [
    { id: 'section-1-hero', name: 'Hero', selector: 'app-hero', style: null, blocks: ['hero-mortgage'], defaultContent: [] },
    { id: 'section-2-action-tiles', name: 'Action Tiles', selector: ['app-hero .rtb-headline', 'app-hero .rtb-tiles', 'app-cross-link section.crosslink'], style: null, blocks: ['cards-mortgage'], defaultContent: ['app-hero .rtb-headline h2'] },
    { id: 'section-3-jd-power', name: 'JD Power Award Banner', selector: 'section#preferredProgram.banner.image-left', style: null, blocks: ['columns-mortgage'], defaultContent: [] },
    { id: 'section-4-promo', name: 'Promotional Offer', selector: 'app-twocolumnteaser', style: 'blue-gradient', blocks: ['columns-mortgage'], defaultContent: [] },
    { id: 'section-5-benefit-cards', name: 'Benefit Cards', selector: 'app-benefit-cards', style: null, blocks: ['cards-mortgage'], defaultContent: [] },
    { id: 'section-6-all-you-need', name: 'All You Need Banner', selector: 'section.banner.callout-shadow', style: null, blocks: ['hero-mortgage'], defaultContent: [] },
    { id: 'section-7-homestory', name: 'Meet HomeStory', selector: 'section#app-banner.banner.image-right', style: null, blocks: ['columns-mortgage'], defaultContent: [] },
    { id: 'section-8-zillow', name: 'Zillow Rating and Testimonial', selector: 'app-utility-banner', style: 'grey', blocks: ['quote-mortgage'], defaultContent: [] },
    { id: 'section-9-contact', name: 'Contact Us', selector: 'app-contactus', style: null, blocks: ['cards-mortgage'], defaultContent: [] },
    { id: 'section-10-legal', name: 'Legal Accordion', selector: 'app-accordion', style: null, blocks: ['accordion-legal'], defaultContent: [] },
  ],
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      }
    });

    // 4. Execute afterTransform transformers (section breaks + metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
