export default function decorate(block) {
  const rows = [...block.children];
  const container = document.createElement('div');
  container.className = 'tiles-container';

  rows.forEach((row) => {
    const cells = [...row.children];

    // Title row: a single cell with no image (optional block title)
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

    if (iconCell) {
      const pic = iconCell.querySelector('picture');
      if (pic) {
        const iconWrap = document.createElement('div');
        iconWrap.className = 'tiles-tile-icon';
        iconWrap.append(pic);
        tile.append(iconWrap);
      }
    }

    if (bodyCell) {
      const bodyWrap = document.createElement('div');
      bodyWrap.className = 'tiles-tile-body';
      bodyWrap.innerHTML = bodyCell.innerHTML;
      tile.append(bodyWrap);
    }

    container.append(tile);
  });

  // Remove the original table rows, keep the title (if appended) + container
  [...block.children].forEach((child) => {
    if (!child.classList.contains('tiles-title') && child !== container) {
      child.remove();
    }
  });
  block.append(container);
}
