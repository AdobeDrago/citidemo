import { getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';

  let resp = await fetch('/content/footer.plain.html');
  if (!resp.ok) {
    resp = await fetch(`${footerPath}.plain.html`);
  }
  if (!resp.ok) return;

  const html = await resp.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const sections = doc.body.querySelectorAll(':scope > div');

  block.textContent = '';
  const footer = document.createElement('div');
  footer.className = 'footer-content';

  // Section 1: Link columns
  const linksSection = sections[0];
  if (linksSection) {
    const nav = document.createElement('nav');
    nav.className = 'footer-nav';
    const headings = linksSection.querySelectorAll('h2');
    headings.forEach((h2) => {
      const column = document.createElement('div');
      column.className = 'footer-column';
      const title = document.createElement('h2');
      title.textContent = h2.textContent;
      column.append(title);
      const ul = h2.nextElementSibling;
      if (ul && ul.tagName === 'UL') {
        column.append(ul.cloneNode(true));
      }
      nav.append(column);
    });
    footer.append(nav);
  }

  // Section 2: App + Social links
  const socialSection = sections[1];
  if (socialSection) {
    const social = document.createElement('div');
    social.className = 'footer-social';
    const links = socialSection.querySelectorAll('a');
    const appLinks = document.createElement('div');
    appLinks.className = 'footer-app-links';
    const socialLinks = document.createElement('div');
    socialLinks.className = 'footer-social-links';
    links.forEach((a) => {
      const text = a.textContent.trim().toLowerCase();
      const link = document.createElement('a');
      link.href = a.href;
      link.textContent = a.textContent.trim();
      link.target = '_blank';
      link.rel = 'noopener';
      if (text === 'google play' || text === 'app store') {
        appLinks.append(link);
      } else {
        socialLinks.append(link);
      }
    });
    social.append(appLinks, socialLinks);
    footer.append(social);
  }

  // Section 3: Copyright + Legal links
  const legalSection = sections[2];
  if (legalSection) {
    const legal = document.createElement('div');
    legal.className = 'footer-legal';
    const copyright = legalSection.querySelector('p');
    if (copyright) {
      const cp = document.createElement('p');
      cp.className = 'footer-copyright';
      cp.textContent = copyright.textContent;
      legal.append(cp);
    }
    const ul = legalSection.querySelector('ul');
    if (ul) {
      const legalNav = ul.cloneNode(true);
      legalNav.className = 'footer-legal-links';
      legal.append(legalNav);
    }
    footer.append(legal);
  }

  // Section 4: Disclaimer
  const disclaimerSection = sections[3];
  if (disclaimerSection) {
    const disclaimer = document.createElement('div');
    disclaimer.className = 'footer-disclaimer';
    disclaimerSection.querySelectorAll('p').forEach((p) => {
      const para = document.createElement('p');
      para.textContent = p.textContent;
      disclaimer.append(para);
    });
    footer.append(disclaimer);
  }

  block.append(footer);
}
