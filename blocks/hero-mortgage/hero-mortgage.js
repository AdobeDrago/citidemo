export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const imageRow = rows[0];
  const contentRow = rows[1];

  // Check for image in first row
  const picture = imageRow?.querySelector('picture');
  if (picture) {
    block.classList.add('has-image');
    imageRow.classList.add('hero-mortgage-image');
  } else {
    block.classList.add('no-image');
    // Remove empty image row
    if (imageRow && !imageRow.textContent.trim()) {
      imageRow.remove();
    }
  }

  // Structure content row
  if (contentRow) {
    contentRow.classList.add('hero-mortgage-content');

    const cells = [...contentRow.querySelectorAll(':scope > div')];

    // Find and classify content cells
    const ctaCells = [];
    cells.forEach((cell) => {
      if (cell.querySelector('h1')) {
        cell.classList.add('hero-mortgage-eyebrow');
      } else if (cell.querySelector('h2')) {
        cell.classList.add('hero-mortgage-heading');
      } else if (cell.classList.contains('button-container')) {
        ctaCells.push(cell);
      } else if (cell.querySelector('p') && !cell.querySelector('a.button')) {
        cell.classList.add('hero-mortgage-description');
      }
    });

    // Wrap CTA buttons in a single flex container
    if (ctaCells.length > 0) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('hero-mortgage-cta-group');
      ctaCells[0].parentElement.insertBefore(ctaWrapper, ctaCells[0]);
      ctaCells.forEach((cta) => {
        ctaWrapper.appendChild(cta);
      });
    }

    // Remove empty cells (like where h1 was extracted)
    contentRow.querySelectorAll(':scope > div').forEach((cell) => {
      if (!cell.textContent.trim() && !cell.querySelector('picture, img')) {
        cell.remove();
      }
    });
  }
}
