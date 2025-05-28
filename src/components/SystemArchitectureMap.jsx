import React, { useState, useEffect, useRef } from 'react';
import { Database, Users, Calendar, AlertTriangle, TrendingUp, DollarSign, Target, Clock, Settings, ArrowRight, Eye, Filter, Zap, Share2, CheckCircle, BarChart3, Activity, ChevronRight, Info, Layers, FileText, PieChart, Shield, GitBranch, Network, Workflow, Search, Download, X, MoreVertical, ChevronLeft } from 'lucide-react';

const SystemArchitectureMap = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredConnection, setHoveredConnection] = useState(null);
  const [viewMode, setViewMode] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showStats, setShowStats] = useState(true);
  const [timeView, setTimeView] = useState('realtime');
  const [tracedPath, setTracedPath] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const containerRef = useRef(null);

  // System architecture info
  const systemInfo = {
    totalColumns: 25,
    activeCapacity: '7K rows',
    maxCapacity: '20K rows',
    updateFrequency: 'Real-time',
    dataRetention: '3 years',
    automationCount: 12,
    reportCount: 8
  };

  // Simplified color palette
  const colors = {
    primary: '#1B4B8A',
    primaryLight: '#2563EB',
    accent: '#00BFA5',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    neutral: '#6B7280',
    neutralLight: '#E5E7EB',
  };

  // Connection strengths (data volume indicators)
  const connectionStrength = {
    'production-team-master': { volume: 'high', frequency: '1min', records: 850 },
    'quality-team-master': { volume: 'medium', frequency: '5min', records: 230 },
    'bu-analysts-master': { volume: 'low', frequency: '15min', records: 45 },
    'master-production-child': { volume: 'high', frequency: 'realtime', records: 850 },
    'master-quality-child': { volume: 'medium', frequency: 'realtime', records: 230 },
    'master-client-sheets': { volume: 'medium', frequency: 'realtime', records: 180 },
    'master-archive-sheet': { volume: 'high', frequency: 'weekly', records: 2000 },
    'master-dds-report': { volume: 'low', frequency: 'realtime', records: 15 },
    'master-action-report': { volume: 'medium', frequency: 'realtime', records: 75 },
    'master-revenue-report': { volume: 'medium', frequency: '30min', records: 120 },
    'master-exec-report': { volume: 'low', frequency: 'hourly', records: 25 }
  };

  // Nodes with enhanced descriptions - adjusted positions for better spacing
  const allNodes = [
    // Master Tracker - Center
    {
      id: 'master',
      name: 'Master Execution Tracker',
      subtitle: 'Single Source of Truth',
      description: 'Centralized database maintaining data integrity across all operations. One row per work order line.',
      metrics: ['25 Columns', '7K Active Rows', '20K Capacity', '99.9% Uptime'],
      position: { x: 50, y: 52 },
      size: 'xlarge',
      icon: <Database className="w-12 h-12" />,
      color: colors.primary,
      accessUrl: 'https://app.smartsheet.com/sheets/master-tracker',
      permissions: ['Admin', 'Editor', 'Viewer']
    },
    
    // Input Layer - Left (spread out more)
    {
      id: 'production-team',
      name: 'Production Team',
      subtitle: 'Direct Editors',
      description: 'Operations team with direct edit access for real-time updates',
      metrics: ['Real-time Updates', 'Production Metrics'],
      position: { x: 10, y: 25 },
      icon: <Users className="w-8 h-8" />,
      color: colors.success,
      accessUrl: 'https://app.smartsheet.com/sheets/production-team'
    },
    {
      id: 'quality-team',
      name: 'Quality Team',
      subtitle: 'Direct Editors',
      description: 'QA team managing investigations and deviations',
      metrics: ['Deviation Tracking', 'Investigation Management'],
      position: { x: 10, y: 50 },
      icon: <Shield className="w-8 h-8" />,
      color: colors.warning,
      accessUrl: 'https://app.smartsheet.com/sheets/quality-team'
    },
    {
      id: 'bu-analysts',
      name: 'Business Analysts',
      subtitle: 'Direct Editors',
      description: 'Revenue and client relationship management',
      metrics: ['Revenue Tracking', 'Client Analysis'],
      position: { x: 10, y: 75 },
      icon: <TrendingUp className="w-8 h-8" />,
      color: colors.accent,
      accessUrl: 'https://app.smartsheet.com/sheets/business-analysts'
    },
    
    // Child Sheets - Left Middle (spread out more)
    {
      id: 'production-child',
      name: 'Production Sheet',
      subtitle: 'Copy-Row Automation',
      description: 'Filtered view for production team',
      metrics: ['Auto-Updated', 'Team Specific View'],
      position: { x: 30, y: 20 },
      icon: <GitBranch className="w-8 h-8" />,
      color: colors.success,
      accessUrl: 'https://app.smartsheet.com/sheets/production-child'
    },
    {
      id: 'quality-child',
      name: 'Quality Sheet',
      subtitle: 'Copy-Row Automation',
      description: 'Filtered view for quality team',
      metrics: ['QA Specific Data', 'Investigation Tracking'],
      position: { x: 30, y: 40 },
      icon: <CheckCircle className="w-8 h-8" />,
      color: colors.warning,
      accessUrl: 'https://app.smartsheet.com/sheets/quality-child'
    },
    {
      id: 'client-sheets',
      name: 'Client Sheets',
      subtitle: 'Copy-Row Automation',
      description: 'Client-specific filtered views',
      metrics: ['Multiple Clients', 'Revenue Tracking'],
      position: { x: 30, y: 60 },
      icon: <Network className="w-8 h-8" />,
      color: colors.accent,
      accessUrl: 'https://app.smartsheet.com/sheets/client-sheets'
    },
    {
      id: 'archive-sheet',
      name: 'Archive Sheet',
      subtitle: 'Move-Row Weekly',
      description: 'Completed work orders archive',
      metrics: ['Weekly Archive', 'Performance Optimization'],
      position: { x: 30, y: 80 },
      icon: <FileText className="w-8 h-8" />,
      color: colors.neutral,
      accessUrl: 'https://app.smartsheet.com/sheets/archive'
    },
    
    // Reports - Right Middle (spread out more)
    {
      id: 'dds-report',
      name: 'DDS Report',
      subtitle: 'Critical Items Only',
      description: 'Red status items for shift meetings',
      metrics: ['15-min Meetings', 'Safety Focus'],
      position: { x: 70, y: 20 },
      icon: <AlertTriangle className="w-8 h-8" />,
      color: colors.danger,
      accessUrl: 'https://app.smartsheet.com/reports/dds-report'
    },
    {
      id: 'action-report',
      name: 'Action Report',
      subtitle: 'Due Actions Focus',
      description: 'Daily accountability tracking',
      metrics: ['Due Today Items', 'Action Tracking'],
      position: { x: 70, y: 40 },
      icon: <Target className="w-8 h-8" />,
      color: colors.warning,
      accessUrl: 'https://app.smartsheet.com/reports/action-report'
    },
    {
      id: 'revenue-report',
      name: 'Revenue Report',
      subtitle: 'At-Risk Analysis',
      description: 'Bi-weekly revenue reviews',
      metrics: ['Revenue Tracking', 'Risk Analysis'],
      position: { x: 70, y: 60 },
      icon: <DollarSign className="w-8 h-8" />,
      color: colors.primary,
      accessUrl: 'https://app.smartsheet.com/reports/revenue-report'
    },
    {
      id: 'exec-report',
      name: 'Executive Report',
      subtitle: 'Leadership KPIs',
      description: 'Strategic decision support',
      metrics: ['Key Metrics', 'Strategic View'],
      position: { x: 70, y: 80 },
      icon: <BarChart3 className="w-8 h-8" />,
      color: colors.primaryLight,
      accessUrl: 'https://app.smartsheet.com/reports/exec-report'
    },
    
    // Dashboards - Far Right (spread out more)
    {
      id: 'production-dashboard',
      name: 'Production Dashboard',
      subtitle: 'Smartsheet Sights',
      description: 'Real-time production metrics',
      metrics: ['Live Updates', 'Visual KPIs'],
      position: { x: 90, y: 25 },
      icon: <Activity className="w-8 h-8" />,
      color: colors.success,
      accessUrl: 'https://app.smartsheet.com/dashboards/production'
    },
    {
      id: 'quality-dashboard',
      name: 'Quality Dashboard',
      subtitle: 'Smartsheet Sights',
      description: 'Quality metrics visualization',
      metrics: ['Trend Analysis', 'QA Metrics'],
      position: { x: 90, y: 45 },
      icon: <PieChart className="w-8 h-8" />,
      color: colors.warning,
      accessUrl: 'https://app.smartsheet.com/dashboards/quality'
    },
    {
      id: 'business-dashboard',
      name: 'Business Dashboard',
      subtitle: 'Smartsheet Sights',
      description: 'Revenue and client metrics',
      metrics: ['Client Views', 'Revenue Trends'],
      position: { x: 90, y: 65 },
      icon: <TrendingUp className="w-8 h-8" />,
      color: colors.accent,
      accessUrl: 'https://app.smartsheet.com/dashboards/business'
    },
    
    // Meetings - Top (spread out)
    {
      id: 'dds-meeting',
      name: 'DDS/SQDCP',
      subtitle: '15-min Daily',
      description: 'Safety and critical issues',
      position: { x: 25, y: 10 },
      size: 'small',
      icon: <Calendar className="w-6 h-6" />,
      color: colors.danger,
      schedule: 'Daily 7:00 AM'
    },
    {
      id: 'action-huddle',
      name: 'Action Huddle',
      subtitle: '30-min Daily',
      description: 'Due actions review',
      position: { x: 50, y: 10 },
      size: 'small',
      icon: <Clock className="w-6 h-6" />,
      color: colors.warning,
      schedule: 'Daily 8:00 AM'
    },
    {
      id: 'revenue-review',
      name: 'Revenue Review',
      subtitle: 'Bi-weekly',
      description: 'Revenue analysis meeting',
      position: { x: 75, y: 10 },
      size: 'small',
      icon: <DollarSign className="w-6 h-6" />,
      color: colors.primary,
      schedule: 'Tue/Thu 2:00 PM'
    },
    
    // Automations - Bottom (spread out)
    {
      id: 'daily-reminders',
      name: 'Daily Reminders',
      subtitle: '8:00 AM',
      description: 'Automated update requests',
      position: { x: 30, y: 90 },
      size: 'small',
      icon: <Zap className="w-6 h-6" />,
      color: colors.warning,
      lastTriggered: '8:00 AM'
    },
    {
      id: 'red-alerts',
      name: 'Critical Alerts',
      subtitle: 'Real-time',
      description: 'Red status escalations',
      position: { x: 50, y: 90 },
      size: 'small',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: colors.danger,
      lastTriggered: '2 min ago'
    },
    {
      id: 'overdue-alerts',
      name: 'Overdue Alerts',
      subtitle: '6:00 AM',
      description: 'Past due notifications',
      position: { x: 70, y: 90 },
      size: 'small',
      icon: <Clock className="w-6 h-6" />,
      color: colors.warning,
      lastTriggered: '6:00 AM'
    }
  ];

  // Connections
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
    { from: 'dds-report', to: 'dds-meeting', type: 'display', label: 'Display', color: colors.primaryLight },
    { from: 'action-report', to: 'action-huddle', type: 'display', label: 'Display', color: colors.primaryLight },
    { from: 'revenue-report', to: 'revenue-review', type: 'display', label: 'Display', color: colors.primaryLight },
    
    // Master to Automations
    { from: 'master', to: 'daily-reminders', type: 'trigger', label: 'Trigger', color: colors.danger },
    { from: 'master', to: 'red-alerts', type: 'trigger', label: 'Trigger', color: colors.danger },
    { from: 'master', to: 'overdue-alerts', type: 'trigger', label: 'Trigger', color: colors.danger }
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case 'k':
            e.preventDefault();
            document.getElementById('search-input')?.focus();
            break;
          case 'e':
            e.preventDefault();
            handleExportDiagram();
            break;
        }
      } else if (e.key === 'Escape') {
        setSelectedNode(null);
        setTracedPath(null);
        setContextMenu(null);
        setSearchQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery) {
      const results = allNodes.filter(node => 
        node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const getNode = (id) => allNodes.find(node => node.id === id);

  const getVisibleConnections = () => {
    let visibleConnections = connections;

    // Filter by time view
    if (timeView === 'daily') {
      visibleConnections = connections.filter(conn => 
        !conn.type.includes('trigger') || conn.from.includes('daily') || conn.from.includes('overdue')
      );
    } else if (timeView === 'weekly') {
      visibleConnections = connections.filter(conn => 
        conn.to === 'archive-sheet' || conn.from === 'archive-sheet'
      );
    }

    // Filter by selection or traced path
    if (tracedPath) {
      return visibleConnections.filter(conn => 
        tracedPath.some(pathConn => 
          pathConn.from === conn.from && pathConn.to === conn.to
        )
      );
    }

    if (selectedNode) {
      return visibleConnections.filter(conn => 
        conn.from === selectedNode || conn.to === selectedNode
      );
    }

    return viewMode === 'overview' 
      ? visibleConnections.filter(conn => conn.from === 'master' || conn.to === 'master')
      : visibleConnections;
  };

  const traceDataPath = (startNode, endNode) => {
    // Simple pathfinding - in reality this would be more complex
    const path = [];
    
    // Example: trace from production-team to production-dashboard
    if (startNode === 'production-team' && endNode === 'production-dashboard') {
      path.push(
        { from: 'production-team', to: 'master' },
        { from: 'master', to: 'production-child' },
        { from: 'master', to: 'dds-report' },
        { from: 'dds-report', to: 'production-dashboard' }
      );
    }
    
    setTracedPath(path);
  };

  const handleContextMenu = (e, node) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      node: node
    });
  };

  const handleExportDiagram = () => {
    // In a real implementation, this would generate a PNG/SVG
    console.log('Exporting diagram...');
    alert('Diagram exported! (This would download a file in production)');
  };

  const handleGenerateDocs = () => {
    // In a real implementation, this would generate documentation
    console.log('Generating documentation...');
    alert('Documentation generated! (This would create a PDF/Word doc in production)');
  };

  const getConnectionStrength = (from, to) => {
    const key = `${from}-${to}`;
    return connectionStrength[key] || { volume: 'low', frequency: 'hourly', records: 10 };
  };

  const getStrokeWidth = (volume) => {
    switch(volume) {
      case 'high': return 4;
      case 'medium': return 3;
      case 'low': return 2;
      default: return 2;
    }
  };

  const renderConnection = (connection) => {
    const fromNode = getNode(connection.from);
    const toNode = getNode(connection.to);
    
    if (!fromNode || !toNode) return null;
    
    const x1 = fromNode.position.x;
    const y1 = fromNode.position.y;
    const x2 = toNode.position.x;
    const y2 = toNode.position.y;
    
    const strength = getConnectionStrength(connection.from, connection.to);
    const isHighlighted = selectedNode && (connection.from === selectedNode || connection.to === selectedNode);
    const isTraced = tracedPath && tracedPath.some(p => p.from === connection.from && p.to === connection.to);
    const opacity = isTraced ? 1 : (selectedNode && !isHighlighted ? 0.3 : 0.7);
    const strokeWidth = getStrokeWidth(strength.volume) + (isHighlighted ? 1 : 0);
    
    const connectionId = `${connection.from}-${connection.to}`;
    const isHovered = hoveredConnection === connectionId;
    
    // Calculate midpoint for label
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    
    // Calculate angle for label rotation to follow line
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    return (
      <g key={connectionId}>
        {/* Invisible wider line for easier hovering */}
        <line
          x1={`${x1}%`}
          y1={`${y1}%`}
          x2={`${x2}%`}
          y2={`${y2}%`}
          stroke="transparent"
          strokeWidth={20}
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setHoveredConnection(connectionId)}
          onMouseLeave={() => setHoveredConnection(null)}
        />
        
        {/* Visible connection line */}
        <line
          x1={`${x1}%`}
          y1={`${y1}%`}
          x2={`${x2}%`}
          y2={`${y2}%`}
          stroke={isTraced ? colors.primaryLight : connection.color}
          strokeWidth={isHovered ? strokeWidth + 1 : strokeWidth}
          opacity={isHovered ? 0.9 : opacity}
          strokeDasharray={connection.type === 'trigger' ? '5 3' : 'none'}
          markerEnd="url(#arrowhead)"
          style={{
            transition: 'all 0.3s ease',
            pointerEvents: 'none'
          }}
        />
        
        {/* Connection label with background for readability */}
        {(viewMode === 'overview' || isHighlighted || isHovered || isTraced) && (
          <g transform={`translate(${midX}%, ${midY}%)`}>
            {/* White background for text */}
            <rect
              x="-28"
              y="-9"
              width="56"
              height="18"
              fill="white"
              fillOpacity="0.95"
              stroke={connection.color}
              strokeWidth="0.5"
              rx="9"
              style={{ filter: 'url(#dropShadow)' }}
            />
            <text
              x="0"
              y="3"
              textAnchor="middle"
              className="text-[10px] font-medium select-none"
              fill={connection.color}
            >
              {connection.label}
            </text>
          </g>
        )}
        
        {/* Connection details tooltip */}
        {isHovered && viewMode === 'detailed' && (
          <foreignObject
            x={`${midX}%`}
            y={`${midY}%`}
            width="180"
            height="80"
            style={{ transform: 'translate(-90px, -60px)', overflow: 'visible' }}
            className="pointer-events-none"
          >
            <div className="bg-white rounded-lg shadow-lg border p-2.5 text-[11px]" style={{ pointerEvents: 'none' }}>
              <div className="font-semibold mb-1">{connection.label}</div>
              <div className="text-gray-600 space-y-0.5">
                <div>Volume: {strength.volume}</div>
                <div>Frequency: {strength.frequency}</div>
                <div>Records/sync: {strength.records}</div>
              </div>
            </div>
          </foreignObject>
        )}
      </g>
    );
  };

  const renderNode = (node) => {
    const isSelected = selectedNode === node.id;
    const isHovered = hoveredNode === node.id;
    const isCore = node.id === 'master';
    const isSmall = node.size === 'small';
    const isSearchMatch = searchResults.some(result => result.id === node.id);
    
    // Significantly reduced sizes
    const width = isCore ? '140px' : isSmall ? '100px' : '120px';
    const height = isCore ? '80px' : isSmall ? '60px' : '70px';
    
    // Update breadcrumbs when selecting nodes
    useEffect(() => {
      if (selectedNode) {
        const selected = getNode(selectedNode);
        if (selected) {
          setBreadcrumbs([selected]);
        }
      } else {
        setBreadcrumbs([]);
      }
    }, [selectedNode]);
    
    return (
      <div
        key={node.id}
        className={`absolute cursor-pointer transition-all duration-300 ${
          isSelected ? 'z-50' : isHovered ? 'z-40' : 'z-30'
        } ${isSearchMatch ? 'ring-2 ring-yellow-400' : ''}`}
        style={{ 
          left: `${node.position.x}%`,
          top: `${node.position.y}%`,
          transform: 'translate(-50%, -50%)',
          width: width,
          height: height,
          position: 'absolute'
        }}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
        onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
        onContextMenu={(e) => handleContextMenu(e, node)}
      >
        <div 
          className={`w-full h-full rounded-lg shadow-md border transition-all duration-300 ${
            isSelected 
              ? 'border-blue-500 shadow-xl ring-2 ring-blue-200 scale-110' 
              : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
          } ${isCore ? 'bg-gradient-to-br from-blue-50 to-white' : 'bg-white'} p-2 flex flex-col items-center justify-center relative`}
        >
          <div 
            className={`${isSmall ? 'p-1' : 'p-1.5'} rounded-md mb-1`}
            style={{ backgroundColor: `${node.color}15` }}
          >
            <div style={{ color: node.color }}>
              {isSmall ? 
                React.cloneElement(node.icon, { className: 'w-4 h-4' }) : 
                isCore ?
                React.cloneElement(node.icon, { className: 'w-8 h-8' }) :
                React.cloneElement(node.icon, { className: 'w-6 h-6' })
              }
            </div>
          </div>
          
          <h3 className={`font-semibold text-gray-900 text-center leading-tight ${
            isSmall ? 'text-[10px]' : isCore ? 'text-xs' : 'text-[11px]'
          }`}>
            {node.name}
          </h3>
          
          {/* Only show subtitle in detailed view or for core node */}
          {(viewMode === 'detailed' || isCore) && !isSmall && (
            <p className="text-[10px] text-gray-500 text-center leading-tight mt-0.5">
              {node.subtitle}
            </p>
          )}
          
          {/* Central Hub label for Master Tracker */}
          {isCore && (
            <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-medium shadow-sm whitespace-nowrap">
                Central Hub
              </div>
            </div>
          )}
        </div>
        
        {/* Tooltip */}
        {isHovered && !isSelected && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-3 bg-white text-gray-800 rounded-lg shadow-xl border w-64"
            style={{ zIndex: 100 }}
          >
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
            <div className="text-xs text-gray-500 mt-2">Click for details • Right-click for options</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col" ref={containerRef}>
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PCI Pharma Services</h1>
                <p className="text-sm text-gray-600">Master Execution Tracker • Unified Database Architecture</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search components... (Ctrl+K)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-4 py-1 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              
              {/* Time view toggle */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setTimeView('realtime')}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    timeView === 'realtime' 
                      ? 'bg-white text-blue-600 shadow' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Real-time
                </button>
                <button
                  onClick={() => setTimeView('daily')}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    timeView === 'daily' 
                      ? 'bg-white text-blue-600 shadow' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setTimeView('weekly')}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    timeView === 'weekly' 
                      ? 'bg-white text-blue-600 shadow' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Weekly
                </button>
              </div>
              
              {/* View mode toggle */}
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
              
              {/* Export buttons */}
              <button
                onClick={handleExportDiagram}
                className="flex items-center space-x-1.5 px-2.5 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Export Diagram (Ctrl+E)"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
              <button
                onClick={handleGenerateDocs}
                className="flex items-center space-x-1.5 px-2.5 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Docs</span>
              </button>
            </div>
          </div>
          
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <div className="flex items-center space-x-1.5 mt-2 text-xs text-gray-600">
              <span className="text-[11px]">Path:</span>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.id}>
                  {idx > 0 && <ChevronRight className="w-3 h-3" />}
                  <span className="font-medium text-gray-900 text-[11px]">{crumb.name}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* SVG for connections - Fixed layering and visibility */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
              fill="currentColor"
            >
              <polygon
                points="0 0, 8 3, 0 6"
                opacity="0.8"
              />
            </marker>
            <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.15"/>
            </filter>
          </defs>
          <g className="connections-layer">
            {getVisibleConnections().map(renderConnection)}
          </g>
        </svg>

        {/* Render all nodes */}
        {allNodes.map(renderNode)}

        {/* Section Labels - smaller and more subtle */}
        <div className="absolute top-[13%] left-[10%] text-[10px] font-medium text-gray-400 uppercase tracking-wide">
          Data Input
        </div>
        <div className="absolute top-[13%] left-[30%] text-[10px] font-medium text-gray-400 uppercase tracking-wide">
          Data Views
        </div>
        <div className="absolute top-[13%] right-[28%] text-[10px] font-medium text-gray-400 uppercase tracking-wide">
          Reports
        </div>
        <div className="absolute top-[13%] right-[8%] text-[10px] font-medium text-gray-400 uppercase tracking-wide">
          Dashboards
        </div>
        <div className="absolute bottom-[12%] left-[50%] transform -translate-x-1/2 text-[10px] font-medium text-gray-400 uppercase tracking-wide">
          Automations
        </div>
        <div className="absolute top-[5%] left-[50%] transform -translate-x-1/2 text-[10px] font-medium text-gray-400 uppercase tracking-wide">
          Meeting Cadence
        </div>

        {/* System Architecture Info Panel - more compact */}
        {showStats && (
          <div className="absolute top-20 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-40 w-56">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-xs text-gray-700">System Architecture</h3>
              <button
                onClick={() => setShowStats(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-gray-600">Database Columns:</span>
                <span className="font-medium">{systemInfo.totalColumns}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Capacity:</span>
                <span className="font-medium">{systemInfo.activeCapacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Max Capacity:</span>
                <span className="font-medium">{systemInfo.maxCapacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Update Frequency:</span>
                <span className="font-medium">{systemInfo.updateFrequency}</span>
              </div>
              <div className="pt-1.5 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Retention:</span>
                  <span className="font-medium">{systemInfo.dataRetention}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Automations:</span>
                  <span className="font-medium">{systemInfo.automationCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reports/Dashboards:</span>
                  <span className="font-medium">{systemInfo.reportCount}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Show stats button when hidden */}
        {!showStats && (
          <button
            onClick={() => setShowStats(true)}
            className="absolute top-20 right-4 bg-white p-2 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50"
            title="System Architecture Info"
          >
            <Info className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Legend - more compact */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-40">
          <h3 className="font-semibold text-xs text-gray-700 mb-2">Connection Types</h3>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-green-500"></div>
              <span className="text-gray-600">User Editing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-blue-500"></div>
              <span className="text-gray-600">Copy/Move Row</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-teal-500"></div>
              <span className="text-gray-600">Live Filter</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-amber-500"></div>
              <span className="text-gray-600">Dashboard Widget</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 border-t-2 border-dashed border-red-500"></div>
              <span className="text-gray-600">Automation</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t">
            <div className="text-[10px] text-gray-600 font-medium mb-1">Line Thickness = Volume</div>
          </div>
        </div>

        {/* Context Menu - more compact */}
        {contextMenu && (
          <div 
            className="absolute bg-white rounded-lg shadow-lg border border-gray-200 py-1.5 z-50"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onMouseLeave={() => setContextMenu(null)}
          >
            <button
              className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center space-x-2"
              onClick={() => {
                window.open(contextMenu.node.accessUrl, '_blank');
                setContextMenu(null);
              }}
            >
              <Eye className="w-3 h-3" />
              <span>View in Smartsheet</span>
            </button>
            <button
              className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center space-x-2"
              onClick={() => {
                console.log('View configuration for:', contextMenu.node.id);
                setContextMenu(null);
              }}
            >
              <Settings className="w-3 h-3" />
              <span>View Configuration</span>
            </button>
            <button
              className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center space-x-2"
              onClick={() => {
                navigator.clipboard.writeText(contextMenu.node.id);
                setContextMenu(null);
              }}
            >
              <FileText className="w-3 h-3" />
              <span>Copy Component ID</span>
            </button>
            {contextMenu.node.permissions && (
              <button
                className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center space-x-2"
                onClick={() => {
                  console.log('View permissions for:', contextMenu.node.id);
                  setContextMenu(null);
                }}
              >
                <Shield className="w-3 h-3" />
                <span>View Permissions</span>
              </button>
            )}
            <div className="border-t my-1"></div>
            <button
              className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center space-x-2"
              onClick={() => {
                traceDataPath('production-team', 'production-dashboard');
                setContextMenu(null);
              }}
            >
              <GitBranch className="w-3 h-3" />
              <span>Trace Data Path</span>
            </button>
          </div>
        )}

        {/* Detailed Node Popup */}
        {selectedNode && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={() => setSelectedNode(null)}
            />
            
            {/* Popup Modal - more compact */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl border border-gray-200 p-5 z-50 max-w-xl w-full mx-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${getNode(selectedNode)?.color}15` }}
                  >
                    <div style={{ color: getNode(selectedNode)?.color }}>
                      {React.cloneElement(getNode(selectedNode)?.icon || <div />, { className: 'w-6 h-6' })}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{getNode(selectedNode)?.name}</h2>
                    <p className="text-xs text-gray-600">{getNode(selectedNode)?.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold text-sm text-gray-700 mb-1">Description</h3>
                <p className="text-xs text-gray-600">{getNode(selectedNode)?.description}</p>
              </div>
              
              {getNode(selectedNode)?.metrics && (
                <div className="mb-4">
                  <h3 className="font-semibold text-sm text-gray-700 mb-2">Key Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {getNode(selectedNode).metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <div 
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getNode(selectedNode)?.color }}
                        />
                        <span className="text-xs text-gray-600">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-semibold text-sm text-gray-700 mb-2">System Connections</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-1.5">Incoming Data</h4>
                    <div className="space-y-1">
                      {getVisibleConnections()
                        .filter(c => c.to === selectedNode)
                        .map((conn, idx) => (
                          <div key={idx} className="flex items-center space-x-1.5 text-[11px] bg-gray-50 p-1.5 rounded">
                            <div 
                              className="w-2.5 h-0.5 flex-shrink-0"
                              style={{ backgroundColor: conn.color }}
                            />
                            <span className="text-gray-700">{conn.label} from {getNode(conn.from)?.name}</span>
                          </div>
                        ))}
                      {getVisibleConnections().filter(c => c.to === selectedNode).length === 0 && (
                        <p className="text-[11px] text-gray-500 italic">No incoming connections</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-1.5">Outgoing Data</h4>
                    <div className="space-y-1">
                      {getVisibleConnections()
                        .filter(c => c.from === selectedNode)
                        .map((conn, idx) => (
                          <div key={idx} className="flex items-center space-x-1.5 text-[11px] bg-gray-50 p-1.5 rounded">
                            <div 
                              className="w-2.5 h-0.5 flex-shrink-0"
                              style={{ backgroundColor: conn.color }}
                            />
                            <span className="text-gray-700">{conn.label} to {getNode(conn.to)?.name}</span>
                          </div>
                        ))}
                      {getVisibleConnections().filter(c => c.from === selectedNode).length === 0 && (
                        <p className="text-[11px] text-gray-500 italic">No outgoing connections</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Instructions - more compact */}
        {!selectedNode && (
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg p-3 z-40 max-w-xs">
            <div className="flex items-center space-x-2 mb-1">
              <Info className="w-4 h-4 flex-shrink-0" />
              <span className="font-semibold text-sm">Interactive System Map</span>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed">
              The Master Tracker is the central database connecting all systems. Click components to explore data flows.
            </p>
            <div className="mt-2 text-[10px] text-blue-200 space-y-0.5">
              <div>• Right-click for quick actions</div>
              <div>• Ctrl+K to search • Hover lines for details</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemArchitectureMap;