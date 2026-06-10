export default function decorate(block) {
  const rows = [...block.children];

  // Row classification:
  //   - the row containing an image (picture/img or a DM carrier anchor) is
  //     the full-bleed background
  //   - a row whose only content is a heading is the title overlay
  //   - remaining rows that contain a link are CTAs (in document order:
  //     first = primary filled button, second = secondary text link)
  let imageRow;
  let headingRow;
  const ctaRows = [];

  rows.forEach((row) => {
    const cell = row.querySelector(':scope > div') || row;
    const hasImage = cell.querySelector('picture, img')
      || cell.querySelector('a[href*="/is/image/"], a[href*="/adobe/assets/urn:"]');
    const hasHeading = cell.querySelector('h1, h2, h3, h4, h5, h6');
    const link = cell.querySelector('a');

    if (hasImage && !hasHeading) {
      imageRow = row;
    } else if (hasHeading) {
      headingRow = row;
    } else if (link) {
      ctaRows.push(row);
    }
  });

  block.textContent = '';

  if (imageRow) {
    imageRow.className = 'learnabout-image';
    block.append(imageRow);
  }

  const content = document.createElement('div');
  content.className = 'learnabout-content';

  if (headingRow) {
    headingRow.className = 'learnabout-heading';
    content.append(headingRow);
  }

  if (ctaRows.length) {
    const ctaGroup = document.createElement('div');
    ctaGroup.className = 'learnabout-cta-group';
    ctaRows.forEach((row, i) => {
      const a = row.querySelector('a');
      if (!a) return;
      // strip any default EDS button decoration so we control the look
      a.classList.remove('button', 'primary', 'secondary');
      a.classList.add(i === 0 ? 'learnabout-cta-primary' : 'learnabout-cta-secondary');
      ctaGroup.append(a);
    });
    content.append(ctaGroup);

    // Empty-last-CTA rule: if the authored block has fewer than two CTAs
    // (the second link was left empty), right-justify the single primary
    // button within the block.
    if (ctaRows.length < 2) {
      block.classList.add('learnabout-single-cta');
    }
  }

  block.append(content);
}
