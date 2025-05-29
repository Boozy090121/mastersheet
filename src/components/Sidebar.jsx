import React from 'react';
import { motion } from 'framer-motion';
import { useMap } from '../context/MapContext';

const TYPES = [
  { key: 'service', label: 'Services', color: 'text-blue-500' },
  { key: 'database', label: 'Databases', color: 'text-emerald-500' },
  { key: 'queue', label: 'Queues', color: 'text-amber-500' },
  { key: 'external', label: 'External', color: 'text-violet-500' }
];

export default function Sidebar({ open, onClose }) {
  const { filters, setFilters } = useMap();

  return (
    <motion.aside
      initial={{ x: -240 }}
      animate={{ x: open ? 0 : -240 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed top-14 bottom-0 w-60 bg-white dark:bg-gray-800 shadow z-30 p-4 overflow-y-auto"
    >
      <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Filters</h2>
      <ul className="space-y-2">
        {TYPES.map(t => (
          <li key={t.key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              aria-label={t.label}
              checked={filters[t.key]}
              onChange={() =>
                setFilters({ ...filters, [t.key]: !filters[t.key] })
              }
              className="accent-blue-600"
            />
            <span className={`${t.color} text-sm`}>{t.label}</span>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}
