import React from 'react';
import { Search } from 'lucide-react';
import { useMap } from '../context/MapContext';

export default function Header() {
  const { search, setSearch } = useMap();

  return (
    <header className="fixed top-0 inset-x-0 h-14 bg-white dark:bg-gray-800 shadow flex items-center px-4 z-40">
      <div className="flex-1 flex items-center space-x-2">
        <span className="font-bold text-lg">Brand</span>
        <h1 className="font-semibold text-gray-700 dark:text-gray-200">System Architecture Map</h1>
      </div>
      <div className="relative w-72">
        <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
        <input
          aria-label="Search nodes"
          className="w-full pl-8 pr-2 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
        />
      </div>
    </header>
  );
}
