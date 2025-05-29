import React, { createContext, useContext, useState, useMemo } from 'react';

const MapContext = createContext(null);

export function MapProvider({ children }) {
  // Node and edge data would typically come from API
  const [nodes] = useState([
    { id: 'svc-1', label: 'Service A', type: 'service' },
    { id: 'db-1', label: 'Database', type: 'database' },
    { id: 'queue-1', label: 'Queue', type: 'queue' },
    { id: 'ext-1', label: 'External', type: 'external' }
  ]);

  const [edges] = useState([
    { source: 'svc-1', target: 'db-1' },
    { source: 'svc-1', target: 'queue-1' },
    { source: 'queue-1', target: 'ext-1' }
  ]);

  const [filters, setFilters] = useState({
    service: true,
    database: true,
    queue: true,
    external: true
  });

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  const filteredNodes = useMemo(
    () => nodes.filter(n => filters[n.type]),
    [nodes, filters]
  );

  const value = {
    nodes: filteredNodes,
    edges,
    selected,
    setSelected,
    filters,
    setFilters,
    search,
    setSearch
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export const useMap = () => useContext(MapContext);
