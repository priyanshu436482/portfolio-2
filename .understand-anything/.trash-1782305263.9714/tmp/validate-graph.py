#!/usr/bin/env python3
import json, os, sys

inter = '.understand-anything/intermediate'

graph = json.load(open(os.path.join(inter, 'assembled-graph.json')))
layers = json.load(open(os.path.join(inter, 'layers.json')))
tour = json.load(open(os.path.join(inter, 'tour.json')))

graph['layers'] = layers
graph['tour'] = tour

json.dump(graph, open(os.path.join(inter, 'assembled-graph.json'), 'w'), indent=2)

node_ids = set(n['id'] for n in graph['nodes'])

issues = []
warnings = []

# Check layers
layer_node_ids = set()
for l in layers:
    for nid in l.get('nodeIds', []):
        layer_node_ids.add(nid)
        if nid not in node_ids:
            issues.append("Layer '%s' refs missing node '%s'" % (l['id'], nid))

# Check file nodes in layers
file_types = {'file', 'config', 'document', 'service', 'pipeline', 'table', 'schema', 'resource', 'endpoint'}
file_nodes = [n['id'] for n in graph['nodes'] if n['type'] in file_types]
for fid in file_nodes:
    if fid not in layer_node_ids:
        issues.append("File node '%s' not in any layer" % fid)

# Check tour
for i, step in enumerate(tour):
    for nid in step.get('nodeIds', []):
        if nid not in node_ids:
            issues.append("Tour step[%d] refs missing node '%s'" % (i, nid))

# Orphan check
edge_nodes = set()
for e in graph.get('edges', []):
    edge_nodes.add(e.get('source'))
    edge_nodes.add(e.get('target'))
for n in graph['nodes']:
    if n['id'] not in edge_nodes:
        warnings.append("Node '%s' has no edges (orphan)" % n['id'])

review = {
    'issues': issues,
    'warnings': warnings,
    'stats': {
        'totalNodes': len(graph['nodes']),
        'totalEdges': len(graph['edges']),
        'totalLayers': len(graph['layers']),
        'tourSteps': len(graph['tour']),
    }
}

json.dump(review, open(os.path.join(inter, 'review.json'), 'w'), indent=2)
print("Issues: %d, Warnings: %d" % (len(issues), len(warnings)))
for i in issues:
    print("  ISSUE: " + i)
