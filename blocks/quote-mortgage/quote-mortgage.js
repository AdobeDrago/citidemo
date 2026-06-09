export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  // Detect if this is the rating block or the testimonial block
  // Rating block: first row first cell contains "out of 5" text
  const firstRowCells = rows[0] ? [...rows[0].children] : [];
  const firstCellText = firstRowCells[0] ? firstRowCells[0].textContent.trim() : '';
  const isRating = firstCellText.includes('out of 5');

  if (isRating) {
    block.classList.add('quote-mortgage-rating');
    // Rating block: Row 1 has rating, reviews, logo, copyright
    // Row 2 has a link
    const ratingContent = document.createElement('div');
    ratingContent.className = 'rating-content';

    if (firstRowCells[0]) {
      // Parse "4.85 out of 5" into rating number and subtext
      const ratingText = firstRowCells[0].textContent.trim();
      const match = ratingText.match(/^([\d.]+)\s+(.*)/);
      if (match) {
        const [, ratingValue, subtextValue] = match;
        const ratingNumber = document.createElement('div');
        ratingNumber.className = 'rating-number';
        ratingNumber.textContent = ratingValue;
        ratingContent.appendChild(ratingNumber);

        const ratingSubtext = document.createElement('div');
        ratingSubtext.className = 'rating-subtext';
        ratingSubtext.textContent = subtextValue;
        ratingContent.appendChild(ratingSubtext);
      } else {
        ratingContent.appendChild(firstRowCells[0]);
      }
    }

    const descriptionContent = document.createElement('div');
    descriptionContent.className = 'rating-description';

    // Review count paragraph (cell 2)
    if (firstRowCells[1]) {
      // Cell may already contain <p> from EDS decoration
      const existingP = firstRowCells[1].querySelector('p');
      if (existingP) {
        descriptionContent.appendChild(existingP);
      } else {
        const reviewPara = document.createElement('p');
        reviewPara.innerHTML = firstRowCells[1].innerHTML;
        descriptionContent.appendChild(reviewPara);
      }
    }

    // Zillow logo (cell 3)
    if (firstRowCells[2]) {
      const logoDiv = document.createElement('div');
      logoDiv.className = 'rating-logo';
      logoDiv.innerHTML = firstRowCells[2].innerHTML;
      descriptionContent.appendChild(logoDiv);
    }

    // Copyright text (cell 4)
    if (firstRowCells[3]) {
      const existingP = firstRowCells[3].querySelector('p');
      if (existingP) {
        existingP.className = 'rating-copyright';
        descriptionContent.appendChild(existingP);
      } else {
        const copyrightPara = document.createElement('p');
        copyrightPara.className = 'rating-copyright';
        copyrightPara.innerHTML = firstRowCells[3].innerHTML;
        descriptionContent.appendChild(copyrightPara);
      }
    }

    // Row 2 link
    const secondRowCells = rows[1] ? [...rows[1].children] : [];
    if (secondRowCells[0]) {
      const linkDiv = document.createElement('div');
      linkDiv.className = 'rating-link';
      // Extract the link directly if wrapped in <p>
      const link = secondRowCells[0].querySelector('a');
      if (link) {
        linkDiv.appendChild(link);
      } else {
        linkDiv.innerHTML = secondRowCells[0].innerHTML;
      }
      descriptionContent.appendChild(linkDiv);
    }

    block.innerHTML = '';
    block.appendChild(ratingContent);
    block.appendChild(descriptionContent);
  } else {
    block.classList.add('quote-mortgage-testimonial');
    // Testimonial block structure:
    // Row 1: cell1=quote icon image, cell2=h2, cell3=bold title, cell4=review text
    // Row 2: cell1=attribution, cell2=link to more reviews
    const testimonialContent = document.createElement('div');
    testimonialContent.className = 'testimonial-content';

    // Quote icon (cell 1 - picture element)
    if (firstRowCells[0]) {
      const iconDiv = document.createElement('div');
      iconDiv.className = 'testimonial-icon';
      iconDiv.innerHTML = firstRowCells[0].innerHTML;
      testimonialContent.appendChild(iconDiv);
    }

    // Text content wrapper
    const textContent = document.createElement('div');
    textContent.className = 'testimonial-text';

    // Heading (cell 2)
    if (firstRowCells[1]) {
      textContent.innerHTML += firstRowCells[1].innerHTML;
    }

    // Review body (cells 3 and 4 combined)
    const reviewBody = document.createElement('div');
    reviewBody.className = 'testimonial-review';
    if (firstRowCells[2]) {
      // Bold title - may be wrapped in <p> by EDS
      const existingP = firstRowCells[2].querySelector('p');
      const titleP = existingP || document.createElement('p');
      titleP.className = 'review-title';
      if (!existingP) titleP.innerHTML = firstRowCells[2].innerHTML;
      reviewBody.appendChild(titleP);
    }
    if (firstRowCells[3]) {
      // Review text - may be wrapped in <p> by EDS
      const existingP = firstRowCells[3].querySelector('p');
      const bodyP = existingP || document.createElement('p');
      bodyP.className = 'review-body';
      if (!existingP) bodyP.innerHTML = firstRowCells[3].innerHTML;
      reviewBody.appendChild(bodyP);
    }

    // Attribution from row 2
    const secondRowCells = rows[1] ? [...rows[1].children] : [];
    if (secondRowCells[0]) {
      const existingP = secondRowCells[0].querySelector('p');
      const attrP = existingP || document.createElement('p');
      attrP.className = 'review-attribution';
      if (!existingP) attrP.innerHTML = secondRowCells[0].innerHTML;
      reviewBody.appendChild(attrP);
    }

    textContent.appendChild(reviewBody);

    // Link to more reviews (cell 2 of row 2)
    if (secondRowCells[1]) {
      const linkDiv = document.createElement('div');
      linkDiv.className = 'testimonial-link';
      const link = secondRowCells[1].querySelector('a');
      if (link) {
        linkDiv.appendChild(link);
      } else {
        linkDiv.innerHTML = secondRowCells[1].innerHTML;
      }
      textContent.appendChild(linkDiv);
    }

    testimonialContent.appendChild(textContent);
    block.innerHTML = '';
    block.appendChild(testimonialContent);
  }
}
