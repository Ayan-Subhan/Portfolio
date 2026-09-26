// Progressive enhancement only: every section is fully visible without this script.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll reveal. Only elements that start below the fold are hidden, so nothing
// already on screen flashes, and no-JS readers and crawlers see everything.
if (!reduceMotion && 'IntersectionObserver' in window) {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
    (el) => el.getBoundingClientRect().top > window.innerHeight,
  );
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('reveal-in');
        entry.target.classList.remove('reveal-pending');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  for (const el of targets) {
    el.classList.add('reveal-pending');
    io.observe(el);
  }
}

// Mark the nav link for the section currently in view.
const links = new Map<string, HTMLAnchorElement>();
for (const a of document.querySelectorAll<HTMLAnchorElement>('a[data-nav]')) {
  const id = a.hash.slice(1);
  if (id && document.getElementById(id)) links.set(id, a);
}
if (links.size && 'IntersectionObserver' in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const a of links.values()) a.removeAttribute('aria-current');
        links.get(entry.target.id)?.setAttribute('aria-current', 'true');
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  for (const id of links.keys()) spy.observe(document.getElementById(id)!);
  // Sections without a nav link (the front page) clear the highlight.
  for (const el of document.querySelectorAll('[data-spy]')) spy.observe(el);
}
