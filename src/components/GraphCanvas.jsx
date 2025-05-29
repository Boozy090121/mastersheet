import React, { useRef, useEffect } from 'react';
import { useMap } from '../context/MapContext';

export default function GraphCanvas() {
  const { nodes, edges, setSelected } = useMap();
  const svgRef = useRef(null);

  useEffect(() => {
    // Placeholder for WebWorker based force simulation
    // TODO: integrate d3-force with a worker for smooth 60fps layout
  }, [nodes, edges]);

  return (
    <div className="flex-1 relative">
      <svg ref={svgRef} className="w-full h-full" aria-label="system-graph">
        {edges.map((e, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2="0"
            y2="0"
            stroke="#d1d5db"
            strokeWidth="1.5"
          />
        ))}
        {nodes.map(n => (
          <g key={n.id} className="cursor-pointer" onClick={() => setSelected(n)}>
            <circle r="10" fill="#3b82f6" />
            <text
              className="text-xs text-gray-700"
              x="12"
              y="4"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      {/* Mini map */}
      <div className="absolute bottom-4 right-4 w-32 h-24 bg-white rounded-2xl shadow-md" />
    </div>
  );
}
