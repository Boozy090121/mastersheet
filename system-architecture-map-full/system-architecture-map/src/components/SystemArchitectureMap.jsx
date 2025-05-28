import React, { useState } from 'react';
import { Database, Users, Calendar, AlertTriangle, TrendingUp, DollarSign, Target, Clock, Eye, Filter, Zap, CheckCircle, BarChart3, Info, Layers } from 'lucide-react';

const SystemArchitectureMap = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [viewMode, setViewMode] = useState('overview');

  // Professional color palette
  const colors = {
    primary: '#1B4B8A',
    primaryLight: '#2563EB',
    primaryDark: '#0F2847',
    accent: '#00BFA5',
    accentLight: '#4ECCA3',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    neutral: '#6B7280',
    neutralLight: '#E5E7EB',
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#1F2937',
    textLight: '#6B7280'
  };

  // All nodes with positions
  const allNodes = [
    // Master Tracker - Center
    {
      id: 'master',
      name: 'Master Execution Tracker',
      subtitle: 'Single Source of Truth',
      description: 'Central database with one row per work order line',
      metrics: ['25 Columns', '7K Active Rows', '20K Capacity'],
      position: { x: 50, y: 50 },
      size: 'xlarge',
      icon: <Database className="w-12 h-12" />,
      color: colors.primary
    },
    // (rest of nodes omitted for brevity in this snippet)
  ];

  // Connection definitions
  const connections = [
    // (connection objects omitted for brevity)
  ];

  const getNode = (id) => allNodes.find(node => node.id === id);

  const getVisibleConnections = () => {
    if (!selectedNode) {
      return viewMode === 'overview' 
        ? connections.filter(conn => conn.from === 'master' || conn.to === 'master')
        : connections;
    }
    return connections.filter(conn => 
      conn.from === selectedNode || conn.to === selectedNode
    );
  };

  const renderConnection = (connection) => {
    const fromNode = getNode(connection.from);
    const toNode = getNode(connection.to);
    if (!fromNode || !toNode) return null;
    const x1 = fromNode.position.x;
    const y1 = fromNode.position.y;
    const x2 = toNode.position.x;
    const y2 = toNode.position.y;
    const opacity = selectedNode ? 0.8 : 0.3;
    const strokeWidth = selectedNode && (connection.from === selectedNode || connection.to === selectedNode) ? 3 : 2;
    return (
      <g key={fromNode.id + toNode.id}>
        <line
          x1={`${x1}%`}
          y1={`${y1}%`}
          x2={`${x2}%`}
          y2={`${y2}%`}
          stroke={connection.color}
          strokeWidth={strokeWidth}
          opacity={opacity}
          strokeDasharray={connection.type === 'trigger' ? '5 3' : 'none'}
          markerEnd="url(#arrowhead)"
        />
        {selectedNode && (connection.from === selectedNode || connection.to === selectedNode) && (
          <text
            x={`${(x1 + x2) / 2}%`}
            y={`${(y1 + y2) / 2 - 1}%`}
            textAnchor="middle"
            className="text-xs font-medium"
            fill={connection.color}
          >
            {connection.label}
          </text>
        )}
      </g>
    );
  };

  const renderNode = (node) => {
    const isSelected = selectedNode === node.id;
    const isHovered = hoveredNode === node.id;
    const isCore = node.id === 'master';
    const isSmall = node.size === 'small';
    const width = isCore ? '18%' : isSmall ? '12%' : '15%';
    const height = isCore ? (viewMode === 'detailed' ? '140px' : '120px') : isSmall ? '80px' : (viewMode === 'detailed' ? '120px' : '100px');

    return (
      <div
        key={node.id}
        className={`absolute cursor-pointer transition-all duration-300 ${isSelected ? 'z-40' : isHovered ? 'z-30' : 'z-20'}`}
        style={{ left: `${node.position.x}%`, top: `${node.position.y}%`, transform: 'translate(-50%, -50%)', width, minHeight: height }}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
        onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
      >
        <div className={`w-full h-full rounded-xl shadow-lg border-2 transition-all duration-300 ${isSelected ? 'border-blue-500 shadow-2xl ring-4 ring-blue-200 scale-105' : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'} bg-white p-3 flex flex-col items-center justify-center`}>
          <div className="p-2 rounded-lg mb-2" style={{ backgroundColor: `${node.color}15` }}>
            <div style={{ color: node.color }}>{node.icon}</div>
          </div>
          <h3 className={`font-bold text-gray-900 text-center ${isSmall ? 'text-xs' : 'text-sm'}`}>{node.name}</h3>
          <p className="text-gray-600 text-center text-xs">{node.subtitle}</p>
          {viewMode === 'detailed' && node.metrics && !isSmall && (
            <div className="flex flex-col gap-1 mt-2 text-xs">
              {node.metrics.slice(0, 2).map((metric, idx) => (
                <div key={idx} className="text-center text-gray-600">{metric}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-600 rounded-lg"><Layers className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PCI Pharma Services</h1>
              <p className="text-sm text-gray-600">Master Execution Tracker • System Architecture</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button onClick={() => setViewMode('overview')} className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${viewMode==='overview'?'bg-white text-blue-600 shadow':'text-gray-600 hover:text-gray-900'}`}>Overview</button>
            <button onClick={() => setViewMode('detailed')} className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${viewMode==='detailed'?'bg-white text-blue-600 shadow':'text-gray-600 hover:text-gray-900'}`}>Detailed</button>
          </div>
        </div>
      </div>
      {/* Main Visualization */}
      <div className="flex-1 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" fill="currentColor">
              <polygon points="0 0, 10 3.5, 0 7" opacity="0.6" />
            </marker>
          </defs>
          {getVisibleConnections().map(renderConnection)}
        </svg>
        {allNodes.map(renderNode)}
        {/* Section labels, legend, instructions omitted for brevity */}
      </div>
    </div>
  );
};

export default SystemArchitectureMap;
