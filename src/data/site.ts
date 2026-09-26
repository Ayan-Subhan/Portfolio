// Single source of truth for identity and contact details.
// Empty strings are hidden on the site rather than rendered as broken links.
export const site = {
  name: 'Muhammad Ayan',
  shortName: 'M. Ayan',
  tagline: 'The field record of a cyber security analyst',
  location: 'Islamabad, Pakistan',
  description:
    'Cyber Security student at FAST-NUCES building security tooling — compliance dashboards, adversarial-ML defences for IoT intrusion detection and edge IAM — and the GRC work it feeds.',
  email: 'ayansubhan25@gmail.com',
  // TODO: add profile URLs, e.g. https://www.linkedin.com/in/<handle>
  linkedin: '',
  // TODO: add profile URL, e.g. https://github.com/<handle>
  github: '',
  cv: '/cv/Muhammad_Ayan_CV.pdf',
  // Year studies began; shown as "EST." in the masthead.
  established: '2023',
};

export const nav = [
  { href: '/#work', label: 'Work' },
  { href: '/#toolkit', label: 'Toolkit' },
  { href: '/#scoreboard', label: 'CTF' },
  { href: '/#ledger', label: 'Ledger' },
  { href: '/#writing', label: 'Writing' },
  { href: '/#contact', label: 'Contact' },
];
