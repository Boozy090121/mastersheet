import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMap } from '../context/MapContext';

const TABS = ['Properties', 'Connections', 'Timeline', 'Stats'];

export default function SlideOver({ open, onClose }) {
  const { selected } = useMap();
  const [tab, setTab] = useState(TABS[0]);

  return (
    <motion.aside
      initial={{ x: 380 }}
      animate={{ x: open ? 0 : 380 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed top-14 right-0 bottom-0 w-96 max-w-full bg-white dark:bg-gray-800 shadow-lg z-30 flex flex-col"
    >
      <div className="flex-shrink-0 flex items-center justify-between px-4 h-12 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{selected?.label}</h3>
        <button aria-label="Close details" onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700">×</button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 p-2">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-sm px-2 py-1 rounded-md focus:outline-none ${tab === t ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
            >
              {t}
            </button>
          ))}
        </nav>
        <div className="p-4 text-sm text-gray-700 dark:text-gray-300">
          {/* TODO: virtualise large lists */}
          {tab} content
        </div>
      </div>
    </motion.aside>
  );
}
