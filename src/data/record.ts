// Structured record data for the Toolkit, Scoreboard, Ledger and Disclosure sections.
// Anything not yet confirmed is left empty and hidden, never invented.

export const credentials = [
  { issuer: 'Cisco', title: 'Ethical Hacker' },
  { issuer: 'SkillFront', title: 'ISO/IEC 27001:2022 Information Security Associate' },
];

export const toolkit = [
  {
    heading: 'SIEM & SOC',
    note: 'Detection, triage and the data plumbing behind it.',
    items: ['LogRhythm (API integration)', 'Splunk — SPL', 'IBM QRadar', 'Wazuh', 'Elastic Stack', 'Snort'],
  },
  {
    heading: 'VAPT',
    note: 'Recon to exploitation, on lab and CTF targets.',
    items: ['Nmap', 'Metasploit', 'OWASP Top 10', 'Linux privilege escalation', 'Active & passive recon', 'pfSense'],
  },
  {
    heading: 'Digital Forensics',
    note: 'Memory, disk and packet evidence.',
    items: ['Volatility 3', 'Autopsy', 'Wireshark', 'NetworkMiner'],
  },
  {
    heading: 'Threat Modeling',
    note: 'Deciding what can go wrong before it does.',
    items: ['STRIDE', 'DREAD', 'Adaptive-attacker evaluation for ML defences'],
  },
  {
    heading: 'GRC & Compliance',
    note: 'Mapping controls and assessing third parties.',
    items: [
      'ISO/IEC 27001:2022',
      'SOC 2 gap analysis',
      'PTA CTDISR (all 14 chapters)',
      'Vendor risk management — Bitsight',
      'ISO/IEC 30107-3 (PAD testing)',
      'FIDO2 / WebAuthn',
      'ISO/IEC 24745',
    ],
  },
  {
    heading: 'Engineering',
    note: 'Building the tooling, not just running it.',
    items: ['Python', 'SQL & SQLite', 'FastAPI', 'JavaScript, React, Express', 'MongoDB', 'MQTT', 'Rust & Flutter (debugging)'],
  },
];

// TODO: fill in `placement`, `categories` and `writeup` (a /writing/<slug> path) per event.
export const ctfs: Array<{ event: string; year: string; placement: string; categories: string[]; writeup: string }> = [
  { event: 'Ignite Hackathon CTF', year: '2024', placement: '', categories: [], writeup: '' },
  { event: 'CTS CTF', year: '2024', placement: '', categories: [], writeup: '' },
  { event: 'C00k3d CTF', year: '', placement: '', categories: [], writeup: '' },
  { event: 'MCS CTF', year: '', placement: '', categories: [], writeup: '' },
];

// TODO: list the categories you are strongest in (e.g. Forensics, Web, Crypto).
export const strongCategories: string[] = [];

export const trainingRooms = [
  'Network Services',
  'OWASP Top 10',
  'Passive Reconnaissance',
  'Active Reconnaissance',
  'Splunk: Exploring SPL',
  'Linux PrivEsc',
  'Intro to Offensive Security',
  'Intro to Defensive Security',
];

export const ledger = [
  {
    dates: 'Jul 2026 — Aug 2026',
    role: 'Cyber Security Intern',
    org: 'JWPL (JazzWorld)',
    summary:
      'Shipped the security compliance KPI dashboard as the internship’s primary deliverable, and ran vendor-risk and regulatory assessments alongside it.',
    impact: [
      'Built a compliance KPI dashboard that consolidates LogRhythm SIEM, Qualys, EDR and PAM into one posture view, replacing manual spreadsheet collation.',
      'Modelled KPIs against thresholds so overdue remediation, tooling-coverage gaps and compliance drift surface automatically.',
      'Ran a SOC 2 gap analysis on a Jazz PMCL call-centre VRM questionnaire, and a gap analysis on a Bitsight VRM questionnaire.',
      'Wrote a supplier security questionnaire from the ISMS Annexure with CTDISR-aligned rows across all 14 regulatory chapters.',
      'Assessed a Biometric Verification System vendor against ISO/IEC 30107-3 (PAD), FIDO2/WebAuthn and ISO/IEC 24745.',
    ],
  },
  {
    dates: 'Jun 2026',
    role: 'Software Development Intern',
    org: 'TashiTech',
    summary:
      'Worked on BitMadWall, an offline-first mesh messenger over BLE and LoRa that also carries Wi-Fi-less blockchain transactions.',
    impact: [
      'Found a critical dual-protocol drift: the Rust chat module (chat/src/lib.rs) was bypassed at runtime by a diverging Dart implementation.',
      'Diagnosed a decryption fall-through bug and a hash-chain integrity issue in the app’s cryptographic layer.',
      'Fixed Docker/Rust build and Flutter compilation failures blocking the team.',
    ],
  },
  {
    dates: '2023 — 2027',
    role: 'BS Cyber Security',
    org: 'FAST-NUCES, Islamabad',
    summary: 'Network Security, Ethical Hacking, Cryptography and Information Security Management.',
    impact: [],
  },
];

export const byTheNumbers = [
  { figure: '4', label: 'security stacks unified into one posture view at JWPL' },
  { figure: '14', label: 'CTDISR regulatory chapters mapped into a supplier questionnaire' },
  { figure: '3', label: 'vendor assessments run — SOC 2, Bitsight VRM, biometric PAD' },
  { figure: '4', label: 'CTF competitions entered' },
];

// Add entries as { id: 'CVE-YYYY-NNNNN', title: '', vendor: '', url: '' }. The section hides while empty.
export const cves: Array<{ id: string; title: string; vendor: string; url: string }> = [];
