function openWhatsApp() {
  const modal = document.getElementById('waModal');
  if (modal) modal.classList.add('show');
}

function closeWhatsApp() {
  const modal = document.getElementById('waModal');
  if (modal) modal.classList.remove('show');
}

function saveContact() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Coldway Comforts
ORG:Coldway Comforts
TEL;TYPE=CELL:+91 98192 13075
TEL;TYPE=CELL:+91 96534 65441
EMAIL:ccoldwaycomforts@gmail.com
ADR;TYPE=WORK:;;Unit No. 60, Plot No. 7, New Tank, Bandar Road, Darukhana, Mazgaon, Mumbai - 400 010
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = 'Coldway-Comforts.vcf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function initAreaSearch() {
  const input = document.getElementById('areaSearch');
  const list = document.querySelector('.all-areas');
  const meta = document.getElementById('areaSearchMeta');

  if (!input || !list || !meta) return;

  const links = [...list.querySelectorAll('a')];
  const total = links.length;

  const update = () => {
    const query = input.value.trim().toLowerCase();
    let shown = 0;

    links.forEach(link => {
      const text = link.textContent.toLowerCase();
      const href = (link.getAttribute('href') || '').toLowerCase().replace(/[-/\\.]/g, ' ');
      const match = !query || text.includes(query) || href.includes(query);

      link.classList.toggle('is-hidden', !match);

      if (match) shown += 1;
    });

    meta.textContent = query
      ? (shown ? `Showing ${shown} matching service areas` : 'No exact area match. Call us and share your location.')
      : `Showing ${total} service areas`;
  };

  input.addEventListener('input', update);
  update();
}

function initReveal() {
  const items = [...document.querySelectorAll('.section,.card,.service-point,.brand-card,.area-finder')];

  if (!items.length) return;

  items.forEach(item => item.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px 80px 0px'
  });

  items.forEach(item => observer.observe(item));

  /* Safety fallback: if animation does not trigger, content will still show */
  setTimeout(() => {
    items.forEach(item => item.classList.add('in-view'));
  }, 1200);
}

document.addEventListener('DOMContentLoaded', () => {
  initAreaSearch();
  initReveal();
});