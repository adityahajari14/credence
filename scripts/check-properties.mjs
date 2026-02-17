#!/usr/bin/env node
/**
 * One-off script: fetch properties from API and search for specific project names.
 * Run with: node scripts/check-properties.mjs
 * Requires dev server: npm run dev (in another terminal)
 */

const BASE = 'http://localhost:3000';
const RECENT_LAUNCH_NAMES = [
  'Emaar Expo City Terra woods',
  'binghatti City Mercedes meydan',
  'Damac Lagoon - Valencia Tower',
  'ellington Dubai Island - Meriva',
];
const TOP_PICK_NAMES = [
  'Venice Dubai South - azizi',
  'The Edit D3 - Meeras',
  'Sakura Gardens - HRE',
];

// Search terms (flexible - we'll match if title includes these, case-insensitive)
const RECENT_TERMS = ['Terra woods', 'Mercedes meydan', 'Valencia Tower', 'Meriva'];
const TOP_TERMS = ['Venice Dubai South', 'The Edit', 'Sakura Gardens'];

async function fetchPage(page = 1, limit = 100) {
  const url = `${BASE}/api/projects?page=${page}&limit=${limit}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

function findMatch(properties, term) {
  const lower = term.toLowerCase();
  return properties.find((p) => (p.title || '').toLowerCase().includes(lower));
}

async function main() {
  let all = [];
  let page = 1;
  const limit = 100;
  const maxPages = 15;

  console.log('Fetching properties from API...\n');
  while (page <= maxPages) {
    const result = await fetchPage(page, limit);
    const data = result.data || [];
    if (data.length === 0) break;
    all = all.concat(data);
    console.log(`  Page ${page}: ${data.length} items (total so far: ${all.length})`);
    if (data.length < limit) break;
    page++;
  }

  console.log(`\nTotal properties fetched: ${all.length}\n`);
  console.log('--- Most Recent Launch (search) ---');
  RECENT_TERMS.forEach((term) => {
    const match = findMatch(all, term);
    if (match) {
      console.log(`  ✓ "${term}" -> id=${match.id} title="${match.title}" developer="${match.developer || match.developer_name || 'N/A'}"`);
    } else {
      console.log(`  ✗ "${term}" -> NOT FOUND`);
    }
  });
  console.log('\n--- Our Top Picks (search) ---');
  TOP_TERMS.forEach((term) => {
    const match = findMatch(all, term);
    if (match) {
      console.log(`  ✓ "${term}" -> id=${match.id} title="${match.title}" developer="${match.developer || match.developer_name || 'N/A'}"`);
    } else {
      console.log(`  ✗ "${term}" -> NOT FOUND`);
    }
  });

  // Also list all unique titles that contain any of the words to help debug
  const allTerms = [...RECENT_TERMS, ...TOP_TERMS];
  const partial = all.filter((p) => {
    const t = (p.title || '').toLowerCase();
    return allTerms.some((term) => t.includes(term.toLowerCase()));
  });
  if (partial.length > 0) {
    console.log('\n--- All matching projects in data ---');
    partial.forEach((p) => console.log(`  id=${p.id} | ${p.title} | ${p.developer || 'N/A'}`));
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
