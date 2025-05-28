import React, { useState, useEffect } from 'react';
import { Database, Users, Calendar, AlertTriangle, TrendingUp, DollarSign, Target, Clock, Settings, ArrowRight, Eye, Filter, Zap, Share2, CheckCircle, BarChart3, Activity, ChevronRight, Info, Layers, FileText, PieChart } from 'lucide-react';

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
    
    // Input Layer - Left
    {
      id: 'production-team',
      name: 'Production Team',
      subtitle: 'Direct Editors',
      description: 'Operations team with direct edit access',
      metrics: ['Real-time Updates', 'Production Metrics'],
      position: { x: 15, y: 25 },
      icon: <Users className="w-8 h-8" />,
      color: colors.success
    },
    {
      id: 'quality-team',
      name: 'Quality Team',
      subtitle: 'Direct Editors',
      description: 'QA team managing investigations',
      metrics: ['Deviation Tracking', 'Investigation Management'],
      position: { x: 15, y: 50 },
      icon: <Users className="w-8 h-8" />,
      color: colors.warning
    },
    {
      id: 'bu-analysts',
      name: 'Business Analysts',
      subtitle: 'Direct Editors',
      description: 'Revenue and client management',
      metrics: ['Revenue Tracking', 'Client Analysis'],
      position: { x: 15, y: 75 },
      icon: <Users className="w-8 h-8" />,
      color: colors.accent
    },
    
    // Child Sheets - Left Middle
    {
      id: 'production-child',
      name: 'Production Sheet',
      subtitle: 'Copy-Row Automation',
      description: 'Filtered view for production team',
      metrics: ['Auto-Updated', 'Team Specific View'],
      position: { x: 35, y: 20 },
      icon: <Target className="w-8 h-8" />,
      color: colors.success
    },
    {
      id: 'quality-child',
      name: 'Quality Sheet',
      subtitle: 'Copy-Row Automation',
      description: 'Filtered view for quality team',
      metrics: ['QA Specific Data', 'Investigation Tracking'],
      position: { x: 35, y: 40 },
      icon: <AlertTriangle className="w-8 h-8" />,
      color: colors.warning
    },
    {
      id: 'client-sheets',
      name: 'Client Sheets',
      subtitle: 'Copy-Row Automation',
      description: 'Client-specific filtered views',
      metrics: ['Multiple Clients', 'Revenue Tracking'],
      position: { x: 35, y: 60 },
      icon: <DollarSign className="w-8 h-8" />,
      color: colors.accent
    },
    {
      id: 'archive-sheet',
      name: 'Archive Sheet',
      subtitle: 'Move-Row Weekly',
      description: 'Completed work orders archive',
      metrics: ['Weekly Archive', 'Performance Optimization'],
      position: { x: 35, y: 80 },
      icon: <Database className="w-8 h-8" />,
      color: colors.neutral
    },
    
    // Reports - Right Middle
    {
      id: 'dds-report',
      name: 'DDS Report',
      subtitle: 'Critical Items Only',
      description: 'Red status items for shift meetings',
      metrics: ['15-min Meetings', 'Safety Focus'],
      position: { x: 65, y: 20 },
      icon: <Filter className="w-8 h-8" />,
      color: colors.danger
    },
    {
      id: 'action-report',
      name: 'Action Report',
      subtitle: 'Due Actions Focus',
      description: 'Daily accountability tracking',
      metrics: ['Due Today Items', 'Action Tracking'],
      position: { x: 65, y: 40 },
      icon: <Clock className="w-8 h-8" />,
      color: colors.warning
    },
    {
      id: 'revenue-report',
      name: 'Revenue Report',
      subtitle: 'At-Risk Analysis',
      description: 'Bi-weekly revenue reviews',
      metrics: ['Revenue Tracking', 'Risk Analysis'],
      position: { x: 65, y: 60 },
      icon: <TrendingUp className="w-8 h-8" />,
      color: colors.primary
    },
    {
      id: 'exec-report',
      name: 'Executive Report',
      subtitle: 'Leadership KPIs',
      description: 'Strategic decision support',
      metrics: ['Key Metrics', 'Strategic View'],
      position: { x: 65, y: 80 },
      icon: <Eye className="w-8 h-8" />,
      color: colors.primaryDark
    },
    
    // Dashboards - Far Right
    {
      id: 'production-dashboard',
      name: 'Production Dashboard',
      subtitle: 'Smartsheet Sights',
      description: 'Real-time production metrics',
      metrics: ['Live Updates', 'Visual KPIs'],
      position: { x: 85, y: 25 },
      icon: <BarChart3 className="w-8 h-8" />,
      color: colors.success
    },
    {
      id: 'quality-dashboard',
      name: 'Quality Dashboard',
      subtitle: 'Smartsheet Sights',
      description: 'Quality metrics visualization',
      metrics: ['Trend Analysis', 'QA Metrics'],
      position: { x: 85, y: 45 },
      icon: <CheckCircle className="w-8 h-8" />,
      color: colors.warning
    },
    {
      id: 'business-dashboard',
      name: 'Business Dashboard',
      subtitle: 'Smartsheet Sights',
      description: 'Revenue and client metrics',
      metrics: ['Client Views', 'Revenue Trends'],
      position: { x: 85, y: 65 },
      icon: <DollarSign className="w-8 h-8" />,
      color: colors.accent
    },
    
    // Meetings - Top
    {
      id: 'dds-meeting',
      name: 'DDS/SQDCP',
      subtitle: '15-min Daily',
      description: 'Safety and critical issues',
      position: { x: 30, y: 5 },
      size: 'small',
      icon: <Calendar className="w-6 h-6" />,
      color: colors.danger
    },
    {
      id: 'action-huddle',
      name: 'Action Huddle',
      subtitle: '30-min Daily',
      description: 'Due actions review',
      position: { x: 50, y: 5 },
      size: 'small',
      icon: <Calendar className="w-6 h-6" />,
      color: colors.warning
    },
    {
      id: 'revenue-review',
      name: 'Revenue Review',
      subtitle: 'Bi-weekly',
      description: 'Revenue analysis meeting',
      position: { x: 70, y: 5 },
      size: 'small',
      icon: <Calendar className="w-6 h-6" />,
      color: colors.primary
    },
    
    // Automations - Bottom
    {
      id: 'daily-reminders',
      name: 'Daily Reminders',
      subtitle: '8:00 AM',
      description: 'Automated update requests',
      position: { x: 30, y: 95 },
      size: 'small',
      icon: <Zap className="w-6 h-6" />,
      color: colors.warning
    },
    {
      id: 'red-alerts',
      name: 'Critical Alerts',
      subtitle: 'Real-time',
      description: 'Red status escalations',
      position: { x: 50, y: 95 },
      size: 'small',
      icon: <Zap className="w-6 h-6" />,
      color: colors.danger
    },
    {
      id: 'overdue-alerts',
      name: 'Overdue Alerts',
      subtitle: '6:00 AM',
      description: 'Past due notifications',
      position: { x: 70, y: 95 },
      size: 'small',
      icon: <Zap className="w-6 h-6" />,
      color: colors.warning
    }
  ];

  // Connection definitions
  const connections = [
    // User inputs to Master
    { from: 'production-team', to: 'master', type: 'edit', label: 'Direct Edit', color: colors.success },
    { from: 'quality-team', to: 'master', type: 'edit', label: 'Direct Edit', color: colors.success },
    { from: 'bu-analysts', to: 'master', type: 'edit', label: 'Direct Edit', color: colors.success },
    
    // Master to Child Sheets
    { from: 'master', to: 'production-child', type: 'copy-row', label: 'Copy-Row', color: colors.primaryLight },
    { from: 'master', to: 'quality-child', type: 'copy-row', label: 'Copy-Row', color: colors.primaryLight },
    { from: 'master', to: 'client-sheets', type: 'copy-row', label: 'Copy-Row', color: colors.primaryLight },
    { from: 'master', to: 'archive-sheet', type: 'move-row', label: 'Move-Row', color: colors.neutral },
    
    // Master to Reports
    { from: 'master', to: 'dds-report', type: 'filter', label: 'Live Filter', color: colors.accent },
    { from: 'master', to: 'action-report', type: 'filter', label: 'Live Filter', color: colors.accent },
    { from: 'master', to: 'revenue-report', type: 'filter', label: 'Live Filter', color: colors.accent },
    { from: 'master', to: 'exec-report', type: 'filter', label: 'Live Filter', color: colors.accent },
    
    // Reports to Dashboards
    { from: 'dds-report', to: 'production-dashboard', type: 'widget', label: 'Report Widget', color: colors.warning },
    { from: 'action-report', to: 'quality-dashboard', type: 'widget', label: 'Report Widget', color: colors.warning },
    { from: 'revenue-report', to: 'business-dashboard', type: 'widget', label: 'Report Widget', color: colors.warning },
    
    // Reports to Meetings
    { from: 'dds-report', to: 'dds-meeting', type: 'display', label: 'Display', color: colors.accentLight },
    { from: 'action-report', to: 'action-huddle', type: 'display', label: 'Display', color: colors.accentLight },
    { from: 'revenue-report', to: 'revenue-review', type: 'display', label: 'Display', color: colors.accentLight },
    
    // Master to Automations
    { from: 'master', to: 'daily-reminders', type: 'trigger', label: 'Trigger', color: colors.danger },
    { from: 'master', to: 'red-alerts', type: 'trigger', label: 'Trigger', color: colors.danger },
    { from: 'master', to: 'overdue-alerts', type: 'trigger', label: 'Trigger', color: colors.danger }
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

  const createPath = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dr = Math.sqrt(dx * dx + dy * dy);
    return `M ${x1},${y1} A ${dr},${dr} 0 0,1 ${x2},${y2}`;
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
      <g key={`${connection.from}-${connection.to}-${connection.type}`}>
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
          style={{
            transition: 'all 0.3s ease'
          }}
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
        className={`absolute cursor-pointer transition-all duration-300 ${
          isSelected ? 'z-40' : isHovered ? 'z-30' : 'z-20'
        }`}
        style={{ 
          left: `${node.position.x}%`,
          top: `${node.position.y}%`,
          transform: 'translate(-50%, -50%)',
          width: width,
          minHeight: height
        }}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
        onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
      >
        <div 
          className={`w-full h-full rounded-xl shadow-lg border-2 transition-all duration-300 ${
            isSelected 
              ? 'border-blue-500 shadow-2xl ring-4 ring-blue-200 scale-105' 
              : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
          } bg-white p-3 flex flex-col items-center justify-center`}
        >
          <div 
            className="p-2 rounded-lg mb-2"
            style={{ backgroundColor: `${node.color}15` }}
          >
            <div style={{ color: node.color }}>
              {node.icon}
            </div>
          </div>
          
          <h3 className={`font-bold text-gray-900 text-center ${isSmall ? 'text-xs' : 'text-sm'}`}>
            {node.name}
          </h3>
          <p className={`text-gray-600 text-center ${isSmall ? 'text-xs' : 'text-xs'}`}>
            {node.subtitle}
          </p>
          
          {viewMode === 'detailed' && node.metrics && !isSmall && (
            <div className="flex flex-col gap-1 mt-2 text-xs">
              {node.metrics.slice(0, 2).map((metric, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-gray-600">{metric}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Tooltip on hover */}
        {isHovered && !isSmall && !isSelected && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-3 bg-white text-gray-800 rounded-lg shadow-xl border z-50 w-64">
            <div className="font-bold text-gray-900 mb-1">{node.name}</div>
            <div className="text-xs text-gray-600 mb-2">{node.description}</div>
            {node.metrics && (
              <div className="space-y-1">
                {node.metrics.map((metric, idx) => (
                  <div key={idx} className="text-xs text-gray-600 flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: node.color }} />
                    {metric}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PCI Pharma Services</h1>
                <p className="text-sm text-gray-600">Master Execution Tracker • System Architecture</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('overview')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                  viewMode === 'overview' 
                    ? 'bg-white text-blue-600 shadow' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                  viewMode === 'detailed' 
                    ? 'bg-white text-blue-600 shadow' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Detailed
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* SVG for connections */}
        <svg
  className="absolute inset-0 w-full h-full pointer-events-none z-10"
>

          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
              fill="currentColor"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                opacity="0.6"
              />
            </marker>
          </defs>
          {getVisibleConnections().map(renderConnection)}
        </svg>

        {/* Render all nodes */}
        {allNodes.map(renderNode)}

        {/* Section Labels */}
        <div className="absolute top-[15%] left-[5%] text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Data Input
        </div>
        <div className="absolute top-[15%] left-[35%] text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Child Sheets
        </div>
        <div className="absolute top-[15%] right-[30%] text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Live Reports
        </div>
        <div className="absolute top-[15%] right-[10%] text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Dashboards
        </div>
        <div className="absolute bottom-[15%] left-[50%] transform -translate-x-1/2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Native Automations
        </div>
        <div className="absolute top-[3%] left-[50%] transform -translate-x-1/2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Meeting Integration
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-40">
          <h3 className="font-semibold text-sm text-gray-700 mb-3">Connection Types</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-green-500"></div>
              <span className="text-gray-600">User Editing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-blue-500"></div>
              <span className="text-gray-600">Copy/Move Row</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-teal-500"></div>
              <span className="text-gray-600">Live Filter</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-amber-500"></div>
              <span className="text-gray-600">Dashboard Widget</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 border-t-2 border-dashed border-red-500"></div>
              <span className="text-gray-600">Automation Trigger</span>
            </div>
          </div>
        </div>

        {/* Detailed Node Popup */}
        {selectedNode && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={() => setSelectedNode(null)}
            />
            
            {/* Popup Modal */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-50 max-w-2xl w-full mx-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${getNode(selectedNode)?.color}15` }}
                  >
                    <div style={{ color: getNode(selectedNode)?.color }}>
                      {getNode(selectedNode)?.icon}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{getNode(selectedNode)?.name}</h2>
                    <p className="text-sm text-gray-600">{getNode(selectedNode)?.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">{getNode(selectedNode)?.description}</p>
              </div>
              
              {getNode(selectedNode)?.metrics && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Key Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {getNode(selectedNode).metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getNode(selectedNode)?.color }}
                        />
                        <span className="text-sm text-gray-600">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">System Connections</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Incoming Data</h4>
                    <div className="space-y-2">
                      {getVisibleConnections()
                        .filter(c => c.to === selectedNode)
                        .map((conn, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm bg-gray-50 p-2 rounded">
                            <div 
                              className="w-3 h-0.5"
                              style={{ backgroundColor: conn.color }}
                            />
                            <span className="text-gray-700">{conn.label} from {getNode(conn.from)?.name}</span>
                          </div>
                        ))}
                      {getVisibleConnections().filter(c => c.to === selectedNode).length === 0 && (
                        <p className="text-sm text-gray-500 italic">No incoming connections</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Outgoing Data</h4>
                    <div className="space-y-2">
                      {getVisibleConnections()
                        .filter(c => c.from === selectedNode)
                        .map((conn, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm bg-gray-50 p-2 rounded">
                            <div 
                              className="w-3 h-0.5"
                              style={{ backgroundColor: conn.color }}
                            />
                            <span className="text-gray-700">{conn.label} to {getNode(conn.to)?.name}</span>
                          </div>
                        ))}
                      {getVisibleConnections().filter(c => c.from === selectedNode).length === 0 && (
                        <p className="text-sm text-gray-500 italic">No outgoing connections</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Instructions */}
        {!selectedNode && (
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg p-4 z-40 max-w-sm">
            <div className="flex items-center space-x-3 mb-2">
              <Info className="w-5 h-5" />
              <span className="font-semibold">Interactive System Map</span>
            </div>
            <p className="text-sm text-blue-100">
              Click any component to explore its connections and data flows. Toggle between Overview and Detailed modes for different perspectives.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemArchitectureMap;