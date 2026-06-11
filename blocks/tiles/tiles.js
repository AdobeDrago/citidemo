export default function decorate(block) {
  const rows = [...block.children];
  const container = document.createElement('div');
  container.className = 'tiles-container';

  rows.forEach((row) => {
    const cells = [...row.children];

    // Title row: single cell with no image
    if (cells.length === 1 && !cells[0].querySelector('picture, img')) {
      const title = document.createElement('div');
      title.className = 'tiles-title';
      title.innerHTML = cells[0].innerHTML;
      block.append(title);
      return;
    }

    const tile = document.createElement('div');
    tile.className = 'tiles-tile';

    const iconCell = cells[0];
    const bodyCell = cells[1];

    // Header row: icon + heading side by side
    const header = document.createElement('div');
    header.className = 'tiles-tile-header';

    if (iconCell) {
      const pic = iconCell.querySelector('picture');
      if (pic) {
        const iconWrap = document.createElement('div');
        iconWrap.className = 'tiles-tile-icon';
        iconWrap.append(pic);
        header.append(iconWrap);
      }
    }

    if (bodyCell) {
      const heading = bodyCell.querySelector('h2, h3');
      if (heading) {
        const titleWrap = document.createElement('div');
        titleWrap.className = 'tiles-tile-title';
        titleWrap.append(heading); // moves heading out of bodyCell
        header.append(titleWrap);
      }
    }

    tile.append(header);

    // Body: remaining content (links) after heading was removed
    if (bodyCell && bodyCell.children.length > 0) {
      const bodyWrap = document.createElement('div');
      bodyWrap.className = 'tiles-tile-body';
      bodyWrap.innerHTML = bodyCell.innerHTML;
      tile.append(bodyWrap);
    }

    container.append(tile);
  });

  [...block.children].forEach((child) => {
    if (!child.classList.contains('tiles-title') && child !== container) {
      child.remove();
    }
  });
  block.append(container);
}
