/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-mortgage-page.js
  var import_mortgage_page_exports = {};
  __export(import_mortgage_page_exports, {
    default: () => import_mortgage_page_default
  });

  // tools/importer/parsers/hero-mortgage.js
  function parse(element, { document }) {
    const cells = [];
    const isCalloutBanner = element.classList.contains("callout-shadow");
    if (isCalloutBanner) {
      const bgStyle = element.getAttribute("style") || "";
      const bgMatch = bgStyle.match(/url\(["']?([^"')]+)["']?\)/);
      if (bgMatch) {
        const img = document.createElement("img");
        img.src = bgMatch[1];
        img.alt = "";
        cells.push([img]);
      }
      const contentCell = [];
      const heading = element.querySelector(".banner__content-headsection h3, .banner__content-headsection h2, .description h3");
      if (heading) contentCell.push(heading);
      const ctaButtons = element.querySelectorAll(".banner__content-buttonsection a, .banner__content a.cds-button");
      ctaButtons.forEach((btn) => contentCell.push(btn));
      if (contentCell.length > 0) cells.push(contentCell);
    } else {
      const heroImage = element.querySelector(".hero__image img, .hero__background img, app-image img");
      if (heroImage) {
        cells.push([heroImage]);
      }
      const contentCell = [];
      const eyebrow = element.querySelector(".eyebrow-copy h1, .hero__text .cds-text-header h1");
      if (eyebrow) contentCell.push(eyebrow);
      const mainHeading = element.querySelector(".headline-copy .headline h2, .headline-copy .cds-text-header h2, .hero__text-wrapper .headline h2");
      if (mainHeading) contentCell.push(mainHeading);
      const description = element.querySelector(".description p, .hero__text-wrapper .description p");
      if (description) contentCell.push(description);
      const ctaButtons = element.querySelectorAll(".hero__text-cta a, .hero__text-cta .cds-button");
      ctaButtons.forEach((btn) => contentCell.push(btn));
      if (contentCell.length > 0) cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-mortgage", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-mortgage.js
  function parse2(element, { document }) {
    const cells = [];
    const tileContainers = element.querySelectorAll(".tile-container");
    if (tileContainers.length > 0) {
      tileContainers.forEach((tile) => {
        const img = tile.querySelector(".headline-icon img, .citi-image img");
        const heading = tile.querySelector(".headline-text h2, .headline-text h3, .headline-text div h3");
        const description = tile.querySelector(".headline-desc p, .headline-desc");
        const link = tile.querySelector(".tile-btn a, a.rtb-link, a.overlay-link");
        const descText = tile.querySelector(".subhead-copy");
        const descBlock = tile.querySelector(".headline-desc");
        const imageCell = [];
        if (img) imageCell.push(img);
        const bodyCell = [];
        if (heading) bodyCell.push(heading);
        if (descBlock && descBlock.children.length > 0) {
          const paras = descBlock.querySelectorAll("p");
          paras.forEach((p) => bodyCell.push(p));
        }
        if (link) bodyCell.push(link);
        cells.push([imageCell.length ? imageCell : "", bodyCell]);
      });
    }
    const crosslinkSections = element.querySelectorAll(".crosslink__sections .additional-options, section.additional-options");
    if (crosslinkSections.length > 0 && tileContainers.length === 0) {
      crosslinkSections.forEach((section) => {
        const img = section.querySelector(".icon-wrapper img, .citi-image img");
        const eyebrow = section.querySelector(".eyebrow p");
        const link = section.querySelector("a.article-link, a.overlay-link");
        const imageCell = [];
        if (img) imageCell.push(img);
        const bodyCell = [];
        if (eyebrow) bodyCell.push(eyebrow);
        if (link) bodyCell.push(link);
        cells.push([imageCell.length ? imageCell : "", bodyCell]);
      });
    }
    const benefitCards = element.querySelectorAll(".benefitcards__browservariation .benefitcards__contentbox-boxmodel");
    if (benefitCards.length > 0 && tileContainers.length === 0 && crosslinkSections.length === 0) {
      benefitCards.forEach((card) => {
        const img = card.querySelector(".boxmodel-image img, app-image img");
        const heading = card.querySelector(".boxmodel-header-left h2, h2");
        const description = card.querySelector(".boxmodel-description p, .boxmodel-description-left p");
        const link = card.querySelector("a.boxmodel-link, a.cds-button");
        const imageCell = [];
        if (img) imageCell.push(img);
        const bodyCell = [];
        if (heading) bodyCell.push(heading);
        if (description) bodyCell.push(description);
        if (link) bodyCell.push(link);
        cells.push([imageCell.length ? imageCell : "", bodyCell]);
      });
    }
    if (cells.length === 0) {
      const items = element.querySelectorAll('[class*="card"], [class*="tile"], [class*="item"], [class*="box"]');
      items.forEach((item) => {
        if (item.closest(".tile-container") !== item && item.querySelector(".tile-container")) return;
        const img = item.querySelector("img");
        const heading = item.querySelector("h2, h3, h4");
        const description = item.querySelector("p");
        const link = item.querySelector("a");
        const imageCell = [];
        if (img) imageCell.push(img);
        const bodyCell = [];
        if (heading) bodyCell.push(heading);
        if (description) bodyCell.push(description);
        if (link && link !== description) bodyCell.push(link);
        if (bodyCell.length > 0) {
          cells.push([imageCell.length ? imageCell : "", bodyCell]);
        }
      });
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-mortgage", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-mortgage.js
  function parse3(element, { document }) {
    const cells = [];
    const isTwoColumnTeaser = element.classList.contains("twocolumnteaser");
    const isImageLeft = element.classList.contains("image-left");
    const isImageRight = element.classList.contains("image-right");
    if (isTwoColumnTeaser) {
      const columns = element.querySelectorAll(".column-dimensions");
      if (columns.length >= 2) {
        const leftContent = [];
        const rightContent = [];
        const col1Header = columns[0].querySelector(".column-header h3");
        const col1Subhead = columns[0].querySelector(".column-subhead");
        const col1Cta = columns[0].querySelector("a.cds-button");
        const col1Legal = columns[0].querySelector(".column-legal-text");
        if (col1Header) leftContent.push(col1Header);
        if (col1Subhead) leftContent.push(col1Subhead);
        if (col1Cta) leftContent.push(col1Cta);
        if (col1Legal) leftContent.push(col1Legal);
        const col2Header = columns[1].querySelector(".column-header h3");
        const col2Subhead = columns[1].querySelector(".column-subhead");
        const col2Cta = columns[1].querySelector("a.cds-button, a.column-link");
        const col2Legal = columns[1].querySelector(".column-legal-text");
        if (col2Header) rightContent.push(col2Header);
        if (col2Subhead) rightContent.push(col2Subhead);
        if (col2Cta) rightContent.push(col2Cta);
        if (col2Legal) rightContent.push(col2Legal);
        cells.push([leftContent, rightContent]);
      }
    } else if (isImageLeft) {
      const image = element.querySelector(".banner__image img");
      const leftCol = [];
      if (image) leftCol.push(image);
      const rightCol = [];
      const eyebrow = element.querySelector(".eyebrow-copy");
      const heading = element.querySelector(".headline-copy h2, .headline-copy h3");
      const description = element.querySelector(".description");
      const listSection = element.querySelector(".multifield-description ul");
      const cta = element.querySelector(".banner__content-buttonsection a");
      if (eyebrow) rightCol.push(eyebrow);
      if (heading) rightCol.push(heading);
      if (description) rightCol.push(description);
      if (listSection) rightCol.push(listSection);
      if (cta) rightCol.push(cta);
      cells.push([leftCol, rightCol]);
    } else if (isImageRight) {
      const leftCol = [];
      const heading = element.querySelector(".headline-copy h2, .headline-copy h3");
      const description = element.querySelector(".description");
      const cta = element.querySelector(".banner__content-buttonsection a");
      if (heading) leftCol.push(heading);
      if (description) leftCol.push(description);
      if (cta) leftCol.push(cta);
      const rightCol = [];
      const image = element.querySelector(".banner__image img");
      if (image) rightCol.push(image);
      cells.push([leftCol, rightCol]);
    } else {
      const image = element.querySelector("img");
      const contentSection = element.querySelector(".banner__content, .twocolumnteaser__content");
      const leftCol = [];
      const rightCol = [];
      if (image) leftCol.push(image);
      if (contentSection) rightCol.push(contentSection);
      if (leftCol.length || rightCol.length) {
        cells.push([leftCol, rightCol]);
      }
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-mortgage", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/quote-mortgage.js
  function parse4(element, { document }) {
    const cells = [];
    const zillowContent = element.querySelector(".zillow-content");
    if (zillowContent) {
      const quotationContent = [];
      const ratingValue = element.querySelector(".zillow-rating");
      const totalRating = element.querySelector(".zillow-total-rating");
      if (ratingValue || totalRating) {
        const ratingP = document.createElement("p");
        if (ratingValue) ratingP.append(ratingValue.textContent.trim());
        if (totalRating) ratingP.append(" " + totalRating.textContent.trim());
        quotationContent.push(ratingP);
      }
      const totalReview = element.querySelector(".zillow-total-review p");
      if (totalReview) quotationContent.push(totalReview);
      const zillowLogo = element.querySelector(".zillow-copyright-image img");
      if (zillowLogo) quotationContent.push(zillowLogo);
      const zillowCopyright = element.querySelector(".zillow-copyright p");
      if (zillowCopyright) quotationContent.push(zillowCopyright);
      cells.push(quotationContent);
      const attributionContent = [];
      const ratingLink = element.querySelector("a.zillow-link");
      if (ratingLink) attributionContent.push(ratingLink);
      if (attributionContent.length > 0) {
        cells.push(attributionContent);
      }
    } else {
      const quotationContent = [];
      const quoteIcon = element.querySelector(".tile-wrapper .citi-image img");
      if (quoteIcon) quotationContent.push(quoteIcon);
      const heading = element.querySelector(".headline-text h2, .headline-text h3");
      if (heading) quotationContent.push(heading);
      const quoteTitle = element.querySelector(".zillow-comment-heading");
      if (quoteTitle) {
        const titleP = quoteTitle.closest("p");
        if (titleP) quotationContent.push(titleP);
      }
      const descSection = element.querySelector(".headline-desc");
      if (descSection) {
        const paragraphs = descSection.querySelectorAll(":scope > p");
        paragraphs.forEach((p) => {
          const hasCommentHeading = p.querySelector(".zillow-comment-heading");
          const hasCommentAuthor = p.querySelector(".zillow-comment-author");
          if (!hasCommentHeading && !hasCommentAuthor) {
            quotationContent.push(p);
          }
        });
      }
      cells.push(quotationContent);
      const attributionContent = [];
      const author = element.querySelector(".zillow-comment-author");
      if (author) {
        const authorP = author.closest("p");
        if (authorP) attributionContent.push(authorP);
      }
      const ctaLink = element.querySelector(".headline-container a.cds-button, .headline-container a.rtb-link");
      if (ctaLink) attributionContent.push(ctaLink);
      if (attributionContent.length > 0) {
        cells.push(attributionContent);
      }
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "quote-mortgage", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-legal.js
  function parse5(element, { document }) {
    const accordionSections = element.querySelectorAll("cds-accordion2-section, .cds-accordion2-section");
    const cells = [];
    accordionSections.forEach((section) => {
      const heading = section.querySelector(".accordion2-header h2, .accordion2-header h3, .accordion2-header-left h2, .accordion2-header-left h3");
      const bodyContainer = section.querySelector(".cds-accordion2-submenu .section-desc, .cds-accordion2-submenu");
      if (heading && bodyContainer) {
        const bodyContent = bodyContainer.cloneNode(true);
        const navWrappers = bodyContent.querySelectorAll(".go-back-link-wrapper, .back-to-top-wrapper");
        navWrappers.forEach((nav) => nav.remove());
        const sectionLinks = bodyContent.querySelectorAll("a.section-link");
        sectionLinks.forEach((link) => link.remove());
        const emptyParas = bodyContent.querySelectorAll("p");
        emptyParas.forEach((p) => {
          if (p.textContent.trim() === "" || p.innerHTML.trim() === "&nbsp;") {
            p.remove();
          }
        });
        cells.push([heading, bodyContent]);
      }
    });
    if (cells.length === 0) {
      const headings = element.querySelectorAll(".accordion2-header h2, .accordion2-header h3, h2, h3");
      const bodies = element.querySelectorAll(".cds-accordion2-submenu, .section-desc");
      const count = Math.min(headings.length, bodies.length);
      for (let i = 0; i < count; i++) {
        cells.push([headings[i], bodies[i]]);
      }
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-legal", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/citi-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#ensNotifyBanner",
        "#ensConsentWidget",
        "#ensModalWrapper"
      ]);
      WebImporter.DOMUtils.remove(element, [".QSIFeedbackButton"]);
      WebImporter.DOMUtils.remove(element, ["app-popup"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, ["citi-header"]);
      WebImporter.DOMUtils.remove(element, ["citi-footer"]);
      WebImporter.DOMUtils.remove(element, ["#a11y-message--new-window", ".alternateSkipNav"]);
      WebImporter.DOMUtils.remove(element, ["cbol-session", "citi-route-detector", "citi-session-handler"]);
      WebImporter.DOMUtils.remove(element, ["#cdk-live-announcer-0"]);
      WebImporter.DOMUtils.remove(element, ['[id^="ZN_"]']);
      WebImporter.DOMUtils.remove(element, ["iframe"]);
      WebImporter.DOMUtils.remove(element, ["router-outlet"]);
    }
  }

  // tools/importer/transformers/citi-dm-images.js
  function detectDynamicMediaUrl(urlStr) {
    let u;
    try {
      u = new URL(urlStr, "https://x/");
    } catch (e) {
      return false;
    }
    if (u.pathname.startsWith("/is/image/")) {
      return "scene7";
    }
    if (/^delivery-p\d+-e\d+\.adobeaemcloud\.com$/.test(u.hostname) && u.pathname.startsWith("/adobe/assets/urn:")) {
      return "dm-openapi";
    }
    return false;
  }
  var LINKED_DM_INLINE_WRAPPER_TAGS = /* @__PURE__ */ new Set(["PICTURE"]);
  var LINKED_DM_WRAPPER_SIBLING_TAGS = /* @__PURE__ */ new Set(["SOURCE"]);
  function findLinkedDmCarrier(img) {
    if (!img || !img.parentElement) return null;
    let node = img;
    let parent = img.parentElement;
    while (parent && LINKED_DM_INLINE_WRAPPER_TAGS.has(parent.tagName)) {
      let foundNode = false;
      for (const child of parent.children) {
        if (child === node) {
          foundNode = true;
        } else if (!LINKED_DM_WRAPPER_SIBLING_TAGS.has(child.tagName)) {
          return null;
        }
      }
      if (!foundNode) return null;
      node = parent;
      parent = parent.parentElement;
    }
    if (!parent || parent.tagName !== "A") return null;
    if (parent.children.length !== 1 || parent.children[0] !== node) return null;
    if (parent.textContent.trim() !== "") return null;
    return parent;
  }
  var EMPTY_ALT_SENTINEL = "Image without alt text";
  function altToLinkText(alt) {
    return alt || EMPTY_ALT_SENTINEL;
  }
  function transform2(hookName, element, payload) {
    if (hookName !== "afterTransform") return;
    const doc = element.ownerDocument;
    element.querySelectorAll("img").forEach((img) => {
      const src = img.getAttribute("src") || "";
      if (!detectDynamicMediaUrl(src)) return;
      const alt = img.getAttribute("alt") || "";
      const linkedAnchor = findLinkedDmCarrier(img);
      if (linkedAnchor) {
        linkedAnchor.setAttribute("title", src);
        linkedAnchor.textContent = altToLinkText(alt);
        return;
      }
      const parent = img.parentElement;
      if (parent && parent.tagName === "A") {
        console.warn("DM image inside mixed-content anchor, skipped:", src);
        return;
      }
      const a = doc.createElement("a");
      a.href = src;
      a.textContent = altToLinkText(alt);
      img.replaceWith(a);
    });
  }

  // tools/importer/transformers/citi-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform3(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const document = element.ownerDocument;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectorList = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectorList) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          if (sectionEl.nextSibling) {
            sectionEl.parentNode.insertBefore(sectionMetadata, sectionEl.nextSibling);
          } else {
            sectionEl.parentNode.appendChild(sectionMetadata);
          }
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.parentNode.insertBefore(hr, sectionEl);
        }
      }
    }
  }

  // tools/importer/import-mortgage-page.js
  var parsers = {
    "hero-mortgage": parse,
    "cards-mortgage": parse2,
    "columns-mortgage": parse3,
    "quote-mortgage": parse4,
    "accordion-legal": parse5
  };
  var transformers = [
    transform,
    transform2,
    transform3
  ];
  var PAGE_TEMPLATE = {
    name: "mortgage-page",
    description: "Mortgage product landing page with rates, calculators, and product information",
    urls: ["https://www.citi.com/mortgage/home-mortgage"],
    blocks: [
      {
        name: "hero-mortgage",
        instances: ["section#app-hero.hero", "section.banner.callout-shadow"]
      },
      {
        name: "cards-mortgage",
        instances: ["app-hero .rtb-tiles", "section.crosslink", "app-benefit-cards .benefitcards__container", "app-contactus section.contactus"]
      },
      {
        name: "columns-mortgage",
        instances: ["section#preferredProgram.banner.image-left", "section#app-twocolumnteaser.twocolumnteaser", "section#app-banner.banner.image-right"]
      },
      {
        name: "quote-mortgage",
        instances: ["section#app-utility-banner.utilitybanner"]
      },
      {
        name: "accordion-legal",
        instances: ["section#app-accordion.accordion.legal"]
      }
    ],
    sections: [
      { id: "section-1-hero", name: "Hero", selector: "app-hero", style: null, blocks: ["hero-mortgage"], defaultContent: [] },
      { id: "section-2-action-tiles", name: "Action Tiles", selector: ["app-hero .rtb-headline", "app-hero .rtb-tiles", "app-cross-link section.crosslink"], style: null, blocks: ["cards-mortgage"], defaultContent: ["app-hero .rtb-headline h2"] },
      { id: "section-3-jd-power", name: "JD Power Award Banner", selector: "section#preferredProgram.banner.image-left", style: null, blocks: ["columns-mortgage"], defaultContent: [] },
      { id: "section-4-promo", name: "Promotional Offer", selector: "app-twocolumnteaser", style: "blue-gradient", blocks: ["columns-mortgage"], defaultContent: [] },
      { id: "section-5-benefit-cards", name: "Benefit Cards", selector: "app-benefit-cards", style: null, blocks: ["cards-mortgage"], defaultContent: [] },
      { id: "section-6-all-you-need", name: "All You Need Banner", selector: "section.banner.callout-shadow", style: null, blocks: ["hero-mortgage"], defaultContent: [] },
      { id: "section-7-homestory", name: "Meet HomeStory", selector: "section#app-banner.banner.image-right", style: null, blocks: ["columns-mortgage"], defaultContent: [] },
      { id: "section-8-zillow", name: "Zillow Rating and Testimonial", selector: "app-utility-banner", style: "grey", blocks: ["quote-mortgage"], defaultContent: [] },
      { id: "section-9-contact", name: "Contact Us", selector: "app-contactus", style: null, blocks: ["cards-mortgage"], defaultContent: [] },
      { id: "section-10-legal", name: "Legal Accordion", selector: "app-accordion", style: null, blocks: ["accordion-legal"], defaultContent: [] }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    return pageBlocks;
  }
  var import_mortgage_page_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_mortgage_page_exports);
})();
