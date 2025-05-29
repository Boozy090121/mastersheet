import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import GraphCanvas from './GraphCanvas';
import SlideOver from './SlideOver';
import Footer from './Footer';
import { MapProvider, useMap } from '../context/MapContext';

function InnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { selected, setSelected } = useMap();

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <div className="flex flex-1 pt-14 overflow-hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <GraphCanvas />
        <SlideOver open={!!selected} onClose={() => setSelected(null)} />
      </div>
      <Footer />
    </div>
  );
}

export default function Layout() {
  return (
    <MapProvider>
      <InnerLayout />
    </MapProvider>
  );
}
