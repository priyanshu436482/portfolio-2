#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';

const [, , inputPath, outputPath, batchIndex] = process.argv;
const raw = readFileSync(inputPath, 'utf-8');
const data = JSON.parse(raw);

const nodes = [];
const edges = [];

function fileType(category, lang) {
  if (category === 'docs') return 'document';
  if (category === 'config') return 'config';
  if (category === 'markup') return 'markup';
  if (category === 'infra') return 'infra';
  if (category === 'data') return 'data';
  if (category === 'script') return 'script';
  return 'file';
}

function fileNodeType(category) {
  if (category === 'docs') return 'document';
  if (category === 'config') return 'config';
  if (category === 'markup') return 'file';
  return 'file';
}

for (const result of data.results) {
  const id = `file:${result.path}`;
  const displayName = result.path.split('/').pop();
  const lang = result.language;
  const ftype = fileNodeType(result.fileCategory);

  let complexity = 'moderate';
  if (result.totalLines < 30) complexity = 'simple';
  else if (result.totalLines > 200) complexity = 'complex';

  const fileNode = {
    id,
    type: ftype,
    name: displayName,
    filePath: result.path,
    summary: `${displayName} — ${lang} ${ftype}`,
    tags: [lang, result.fileCategory],
    complexity,
    languageNotes: {},
    metrics: result.metrics || {},
  };
  nodes.push(fileNode);

  if (result.functions) {
    for (const fn of result.functions) {
      const fnId = `function:${result.path}:${fn.name}`;
      nodes.push({
        id: fnId,
        type: 'function',
        name: fn.name,
        filePath: result.path,
        summary: `Function ${fn.name} in ${displayName}`,
        tags: [lang],
        complexity: fn.endLine - fn.startLine < 20 ? 'simple' : 'moderate',
        languageNotes: {},
        metrics: { startLine: fn.startLine, endLine: fn.endLine },
      });
      edges.push({ source: id, target: fnId, type: 'contains', weight: 1.0, direction: 'forward' });
    }
  }

  if (result.classes) {
    for (const cls of result.classes) {
      const clsId = `class:${result.path}:${cls.name}`;
      nodes.push({
        id: clsId,
        type: 'class',
        name: cls.name,
        filePath: result.path,
        summary: `Class ${cls.name} in ${displayName}`,
        tags: [lang],
        complexity: 'moderate',
        languageNotes: {},
      });
      edges.push({ source: id, target: clsId, type: 'contains', weight: 1.0, direction: 'forward' });
      if (cls.methods) {
        for (const m of cls.methods) {
          const mId = `function:${result.path}:${m}`;
          nodes.push({
            id: mId, type: 'function', name: m, filePath: result.path,
            summary: `Method ${m} of ${cls.name}`, tags: [lang], complexity: 'moderate', languageNotes: {}, metrics: {},
          });
          edges.push({ source: clsId, target: mId, type: 'contains', weight: 1.0, direction: 'forward' });
        }
      }
    }
  }

  if (result.callGraph) {
    for (const call of result.callGraph) {
      const callerId = `function:${result.path}:${call.caller}`;
      const calleeId = `function:${result.path}:${call.callee}`;
      edges.push({ source: callerId, target: calleeId, type: 'calls', weight: 0.8, direction: 'forward' });
    }
  }

  if (result.exports) {
    for (const exp of result.exports) {
      const expId = `function:${result.path}:${exp.name}`;
      const expNode = nodes.find(n => n.id === expId);
      if (expNode) {
        expNode.exported = true;
      } else {
        nodes.push({
          id: expId, type: 'function', name: exp.name, filePath: result.path,
          summary: `Exported function ${exp.name}`, tags: [lang, 'exported'],
          complexity: 'moderate', languageNotes: {}, metrics: { isDefault: exp.isDefault },
        });
        edges.push({ source: id, target: expId, type: 'contains', weight: 1.0, direction: 'forward' });
      }
      edges.push({ source: id, target: expId, type: 'exports', weight: 0.8, direction: 'forward' });
    }
  }
}

const output = { nodes, edges };
writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
console.log(`Transform batch ${batchIndex}: ${nodes.length} nodes, ${edges.length} edges`);
