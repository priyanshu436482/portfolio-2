#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const projectRoot = process.argv[2] || '.';
const interDir = join(projectRoot, '.understand-anything/intermediate');

// Read assembled graph
const graphPath = join(interDir, 'assembled-graph.json');
const graph = JSON.parse(readFileSync(graphPath, 'utf-8'));
const nodes = graph.nodes || [];
const edges = graph.edges || [];

// Read scan result for file metadata
const scanPath = join(interDir, 'scan-result.json');
const scan = JSON.parse(readFileSync(scanPath, 'utf-8'));
const scanFiles = scan.files || [];

// Build a map of file path -> scan entry
const scanByPath = {};
for (const f of scanFiles) {
  scanByPath[f.path] = f;
}

// Phase 3: Simple review output
const review = {
  issues: [],
  warnings: [],
  stats: {
    totalNodes: nodes.length,
    totalEdges: edges.length,
    nodeTypes: {},
    edgeTypes: {},
  },
};

const typeCounts = {};
for (const n of nodes) {
  const t = n.type || 'unknown';
  typeCounts[t] = (typeCounts[t] || 0) + 1;
}
review.stats.nodeTypes = typeCounts;

const edgeTypeCounts = {};
for (const e of edges) {
  const t = e.type || 'unknown';
  edgeTypeCounts[t] = (edgeTypeCounts[t] || 0) + 1;
}
review.stats.edgeTypes = edgeTypeCounts;

// Validate nodes
const nodeIds = new Set(nodes.map(n => n.id));
for (const n of nodes) {
  if (!n.id) review.issues.push('Node missing id');
  if (!n.type) review.issues.push(`Node ${n.id} missing type`);
  if (!n.name) review.issues.push(`Node ${n.id} missing name`);
  if (!n.filePath && n.type !== 'module' && n.type !== 'concept') review.warnings.push(`Node ${n.id} missing filePath`);
}

// Validate edges
for (const e of edges) {
  if (!nodeIds.has(e.source)) review.issues.push(`Edge source '${e.source}' not found in nodes`);
  if (!nodeIds.has(e.target)) review.issues.push(`Edge target '${e.target}' not found in nodes`);
}

// Check orphan nodes
const edgeSourceNodes = new Set(edges.map(e => e.source));
const edgeTargetNodes = new Set(edges.map(e => e.target));
const allEdgeNodes = new Set([...edgeSourceNodes, ...edgeTargetNodes]);
for (const n of nodes) {
  if (!allEdgeNodes.has(n.id) && n.type !== 'module' && n.type !== 'concept') {
    review.warnings.push(`Node '${n.id}' has no edges (orphan)`);
  }
}

writeFileSync(join(interDir, 'assemble-review.json'), JSON.stringify(review, null, 2), 'utf-8');
console.log(`Phase 3 review: ${review.issues.length} issues, ${review.warnings.length} warnings`);

// Phase 4: Architecture layers
const layers = [];

// Helper: collect file node IDs by path prefix
function idsByPrefix(prefix) {
  return nodes
    .filter(n => n.filePath && n.filePath.startsWith(prefix) && (n.type === 'file' || n.type === 'document' || n.type === 'config'))
    .map(n => n.id);
}

function idsByExact(path) {
  return nodes
    .filter(n => n.filePath === path && (n.type === 'file' || n.type === 'document' || n.type === 'config'))
    .map(n => n.id);
}

// Config layer
const configIds = idsByExact('package.json').concat(idsByExact('vite.config.js')).concat(idsByExact('eslint.config.js'));
if (configIds.length > 0) {
  layers.push({
    id: 'layer:configuration',
    name: 'Configuration',
    description: 'Project configuration files including package.json, Vite bundler config, and ESLint rules.',
    nodeIds: configIds,
  });
}

// Entry point layer
const entryIds = idsByExact('src/main.jsx').concat(idsByExact('src/App.jsx'));
if (entryIds.length > 0) {
  layers.push({
    id: 'layer:entry-point',
    name: 'Entry Point',
    description: 'Application entry points — React root component and main mount point.',
    nodeIds: entryIds,
  });
}

// Pages layer
const pageIds = idsByPrefix('src/pages/');
if (pageIds.length > 0) {
  layers.push({
    id: 'layer:pages',
    name: 'Pages',
    description: 'Top-level page components that compose multiple sections and handle routing.',
    nodeIds: pageIds,
  });
}

// Components layer
const componentIds = idsByPrefix('src/components/');
if (componentIds.length > 0) {
  layers.push({
    id: 'layer:components',
    name: 'UI Components',
    description: 'Reusable React components for building the user interface, including sections, modals, and utility components.',
    nodeIds: componentIds,
  });
}

// Hooks layer
const hookIds = idsByPrefix('src/hooks/');
if (hookIds.length > 0) {
  layers.push({
    id: 'layer:hooks',
    name: 'Custom Hooks',
    description: 'Custom React hooks for reusable stateful logic including animations, scroll effects, and counters.',
    nodeIds: hookIds,
  });
}

// Data layer
const dataIds = idsByPrefix('src/data/');
if (dataIds.length > 0) {
  layers.push({
    id: 'layer:data',
    name: 'Data & Content',
    description: 'Static data files containing project information, blog content, skills, and testimonials.',
    nodeIds: dataIds,
  });
}

// Styles layer
const styleIds = idsByExact('src/index.css');
if (styleIds.length > 0) {
  layers.push({
    id: 'layer:styles',
    name: 'Styles',
    description: 'Global CSS styles and Tailwind CSS theme configuration.',
    nodeIds: styleIds,
  });
}

// Documentation layer
const docIds = idsByExact('README.md');
if (docIds.length > 0) {
  layers.push({
    id: 'layer:documentation',
    name: 'Documentation',
    description: 'Project documentation files.',
    nodeIds: docIds,
  });
}

// Assets layer
const assetIds = idsByExact('index.html');
if (assetIds.length > 0) {
  layers.push({
    id: 'layer:assets',
    name: 'Assets & Markup',
    description: 'HTML entry point and static assets.',
    nodeIds: assetIds,
  });
}

writeFileSync(join(interDir, 'layers.json'), JSON.stringify(layers, null, 2), 'utf-8');
console.log(`Phase 4: ${layers.length} layers identified`);

// Phase 5: Guided tour
const tour = [
  {
    order: 1,
    title: 'Project Overview',
    description: 'Start with the README to understand the project purpose — a React + Vite portfolio application with Tailwind CSS styling.',
    nodeIds: ['document:README.md'],
  },
  {
    order: 2,
    title: 'Application Entry',
    description: 'The app boots from src/main.jsx, mounting the root React component defined in src/App.jsx with React Router for navigation.',
    nodeIds: ['file:src/main.jsx', 'file:src/App.jsx'],
  },
  {
    order: 3,
    title: 'Pages & Routing',
    description: 'Page-level components define the main routes. ProjectsPage manages the project showcase with filtering and voice interaction.',
    nodeIds: ['file:src/pages/ProjectsPage.jsx'],
  },
  {
    order: 4,
    title: 'UI Components',
    description: 'Reusable components including the Hero section, Navbar, About section, Experience timeline, Skills display, Testimonials, Blog, Contact, and Footer. Modals provide expanded views for projects, booking, testimonials, blog, and voice interaction.',
    nodeIds: [
      'file:src/components/Hero.jsx', 'file:src/components/Navbar.jsx',
      'file:src/components/About.jsx', 'file:src/components/Experience.jsx',
      'file:src/components/SkillsGrid.jsx', 'file:src/components/SkillsMarquee.jsx',
      'file:src/components/Testimonials.jsx', 'file:src/components/BlogSection.jsx',
      'file:src/components/Projects.jsx', 'file:src/components/Contact.jsx',
      'file:src/components/Footer.jsx', 'file:src/components/ProjectCard.jsx',
    ],
  },
  {
    order: 5,
    title: 'Modal Components',
    description: 'Detail modals for projects, blog posts, booking, testimonials, and the interactive terminal and voice assistant.',
    nodeIds: [
      'file:src/components/ProjectModal.jsx', 'file:src/components/BlogModal.jsx',
      'file:src/components/BookingModal.jsx', 'file:src/components/TestimonialModal.jsx',
      'file:src/components/ContactModal.jsx', 'file:src/components/VoiceModal.jsx',
      'file:src/components/Terminal.jsx',
    ],
  },
  {
    order: 6,
    title: 'Custom Hooks',
    description: 'Reusable hooks for scroll-triggered animations (useScrollReveal), smooth scrolling (useLenis), magnetic hover effects (useMagnetic), and animated counters (useCounter).',
    nodeIds: [
      'file:src/hooks/useScrollReveal.js', 'file:src/hooks/useLenis.js',
      'file:src/hooks/useMagnetic.js', 'file:src/hooks/useCounter.js',
    ],
  },
  {
    order: 7,
    title: 'Data & Content',
    description: 'Static data files that drive the portfolio content — projects, skills, experience, testimonials, and blog posts.',
    nodeIds: ['file:src/data/projectsData.js', 'file:src/data/blogData.js'],
  },
  {
    order: 8,
    title: 'Styling & Configuration',
    description: 'Tailwind CSS styles and Vite bundler configuration define the build pipeline and visual theme.',
    nodeIds: ['file:src/index.css', 'file:vite.config.js', 'file:package.json', 'file:eslint.config.js'],
  },
];

writeFileSync(join(interDir, 'tour.json'), JSON.stringify(tour, null, 2), 'utf-8');
console.log(`Phase 5: ${tour.length} tour steps`);
