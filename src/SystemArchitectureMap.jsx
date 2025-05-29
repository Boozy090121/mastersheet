import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Database, Users, Calendar, AlertTriangle, TrendingUp, DollarSign, 
  Target, Clock, Zap, CheckCircle, BarChart3, Activity, Info, Layers, 
  FileText, PieChart, Shield, GitBranch, Network, Workflow, Search, 
  X, HelpCircle, Menu, Eye, EyeOff
} from 'lucide-react';

// Constants
const COLORS = {
  primary: '#1B4B8A',
  primaryLight: '#2563EB',
  accent: '#00BFA5',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  neutral: '#6B7280',
  production: '#10B981',
  quality: '#F59E0B',
  business: '#00BFA5'
};

const FLOW_TYPES = {
  production: {
    color: COLORS.production,
    label: 'Production',
    description: 'Real-time production tracking and safety monitoring',
    icon: <Activity className="w-4 h-4" />,
    nodes: ['production-team', 'master', 'production-child', 'dds-report', 'production-dashboard', 'dds-meeting', 'daily-reminders', 'red-alerts']
  },
  quality: {
    color: COLORS.quality,
    label: 'Quality',
    description: 'Quality assurance and deviation management',
    icon: <Shield className="w-4 h-4" />,
    nodes: ['quality-team', 'master', 'quality-child', 'action-report', 'quality-dashboard', 'action-huddle', 'overdue-alerts']
  },
  business: {
    color: COLORS.business,
    label: 'Business',
    description: 'Revenue tracking and client relationship management',
    icon: <TrendingUp className="w-4 h-4" />,
    nodes: ['bu-analysts', 'master', 'client-sheets', 'revenue-report', 'business-dashboard', 'revenue-review', 'exec-report', 'archive-sheet']
  }
};

// Clean Node Component
const NodeComponent = ({ 
  node, 
  isSelected, 
  isHovered, 
  flowView, 
  focusedFlow,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  const isCore = node.id === 'master';
  const isSmall = node.size === 'small';
  
  // Check if node is in current flow
  const nodeFlow = useMemo(() => {
    for (const [flowKey, flowConfig] of Object.entries(FLOW_TYPES)) {
      if (flowConfig.nodes.includes(node.id)) {
        return flowKey;
      }
    }
    return null;
  }, [node.id]);
  
  const isInFocusedFlow = !focusedFlow || (nodeFlow && FLOW_TYPES[focusedFlow]?.nodes.includes(node.id));
  
  return (
    <div
      className={`absolute cursor-pointer transition-all duration-300 ${
        isSelected ? 'z-50' : isHovered ? 'z-40' : 'z-30'
      }`}
      style={{ 
        left: `${node.position.x}%`,
        top: `${node.position.y}%`,
        transform: 'translate(-50%, -50%)',
        opacity: flowView && !isInFocusedFlow ? 0.2 : 1
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div 
        className={`
          relative rounded-lg shadow-md border transition-all duration-300
          ${isSelected ? 'shadow-xl scale-105 ring-2 ring-blue-400' : ''}
          ${isHovered ? 'shadow-lg scale-102' : ''}
          ${isCore ? 'bg-gradient-to-br from-blue-50 to-white border-blue-200' : 'bg-white border-gray-200'}
          ${isSmall ? 'p-2' : 'p-3'}
        `}
        style={{
          minWidth: isCore ? '130px' : isSmall ? '80px' : '100px',
          borderColor: isSelected ? COLORS.primaryLight : isHovered ? node.color : undefined
        }}
      >
        {/* Flow indicator - pulse animation */}
        {flowView && nodeFlow && isInFocusedFlow && focusedFlow && (
          <div 
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
            style={{ backgroundColor: FLOW_TYPES[nodeFlow].color }}
          >
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{ backgroundColor: FLOW_TYPES[nodeFlow].color }}
            />
          </div>
        )}
        
        <div className="flex flex-col items-center">
          <div 
            className={`${isSmall ? 'p-1.5' : 'p-2'} rounded-lg mb-1.5`}
            style={{ backgroundColor: `${node.color}15` }}
          >
            <div style={{ color: node.color }}>
              {React.cloneElement(node.icon, { 
                className: isSmall ? 'w-4 h-4' : isCore ? 'w-7 h-7' : 'w-5 h-5' 
              })}
            </div>
          </div>
          
          <h3 className={`font-semibold text-gray-900 text-center ${
            isSmall ? 'text-[11px]' : isCore ? 'text-sm' : 'text-xs'
          }`}>
            {node.name}
          </h3>
          
          {node.subtitle && !isSmall && (
            <p className="text-[10px] text-gray-500 text-center mt-0.5">
              {node.subtitle}
            </p>
          )}
        </div>
        
        {isCore && (
          <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2">
            <div className="bg-blue-600 text-white text-[10px] px-2.5 py-0.5 rounded-full font-medium shadow whitespace-nowrap">
              Central Hub
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Clean Connection Component
const ConnectionComponent = ({ 
  connection, 
  fromNode, 
  toNode, 
  strength,
  flowView,
  focusedFlow,
  isHighlighted
}) => {
  const isInFlow = useMemo(() => {
    if (!focusedFlow || !flowView) return true;
    return FLOW_TYPES[focusedFlow].nodes.includes(connection.from) && 
           FLOW_TYPES[focusedFlow].nodes.includes(connection.to);
  }, [focusedFlow, flowView, connection]);
  
  const strokeWidth = strength.volume === 'high' ? 3 : strength.volume === 'medium' ? 2 : 1.5;
  const opacity = flowView && !isInFlow ? 0.1 : isHighlighted ? 0.8 : 0.5;
  
  return (
    <g style={{ opacity }}>
      {/* Flow highlight effect */}
      {flowView && isInFlow && focusedFlow && (
        <line
          x1={`${fromNode.position.x}%`}
          y1={`${fromNode.position.y}%`}
          x2={`${toNode.position.x}%`}
          y2={`${toNode.position.y}%`}
          stroke={connection.color}
          strokeWidth={strokeWidth + 3}
          opacity={0.2}
          className="animate-pulse"
        />
      )}
      
      {/* Main connection line */}
      <line
        x1={`${fromNode.position.x}%`}
        y1={`${fromNode.position.y}%`}
        x2={`${toNode.position.x}%`}
        y2={`${toNode.position.y}%`}
        stroke={connection.color}
        strokeWidth={strokeWidth}
        strokeDasharray={connection.type === 'trigger' ? '5,5' : 'none'}
        markerEnd="url(#arrowhead)"
        className="transition-all duration-300"
      />
    </g>
  );
};

// Main Component
const SystemArchitectureMap = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [flowView, setFlowView] = useState(false);
  const [focusedFlow, setFocusedFlow] = useState(null);
  const [showUI, setShowUI] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  // System architecture data
  const nodes = [
    // Master Database
    {
      id: 'master',
      name: 'Master Execution Tracker',
      subtitle: 'Single Source of Truth',
      description: 'Central database with 25 columns, 7K active rows, real-time sync',
      position: { x: 50, y: 50 },
      icon: <Database />,
      color: COLORS.primary,
    },
    
    // Input Layer
    {
      id: 'production-team',
      name: 'Production Team',
      subtitle: 'Direct Input',
      position: { x: 15, y: 30 },
      icon: <Users />,
      color: COLORS.success,
    },
    {
      id: 'quality-team',
      name: 'Quality Team',
      subtitle: 'Direct Input',
      position: { x: 15, y: 50 },
      icon: <Shield />,
      color: COLORS.warning,
    },
    {
      id: 'bu-analysts',
      name: 'Business Analysts',
      subtitle: 'Direct Input',
      position: { x: 15, y: 70 },
      icon: <TrendingUp />,
      color: COLORS.accent,
    },
    
    // Processing Layer
    {
      id: 'production-child',
      name: 'Production Sheet',
      subtitle: 'Auto-sync',
      position: { x: 32, y: 25 },
      icon: <GitBranch />,
      color: COLORS.success,
    },
    {
      id: 'quality-child',
      name: 'Quality Sheet',
      subtitle: 'Auto-sync',
      position: { x: 32, y: 42 },
      icon: <CheckCircle />,
      color: COLORS.warning,
    },
    {
      id: 'client-sheets',
      name: 'Client Sheets',
      subtitle: 'Auto-sync',
      position: { x: 32, y: 58 },
      icon: <Network />,
      color: COLORS.accent,
    },
    {
      id: 'archive-sheet',
      name: 'Archive Sheet',
      subtitle: 'Weekly',
      position: { x: 32, y: 75 },
      icon: <FileText />,
      color: COLORS.neutral,
    },
    
    // Reports Layer
    {
      id: 'dds-report',
      name: 'DDS Report',
      subtitle: 'Critical Items',
      position: { x: 68, y: 25 },
      icon: <AlertTriangle />,
      color: COLORS.danger,
    },
    {
      id: 'action-report',
      name: 'Action Report',
      subtitle: 'Due Today',
      position: { x: 68, y: 42 },
      icon: <Target />,
      color: COLORS.warning,
    },
    {
      id: 'revenue-report',
      name: 'Revenue Report',
      subtitle: 'At Risk',
      position: { x: 68, y: 58 },
      icon: <DollarSign />,
      color: COLORS.primary,
    },
    {
      id: 'exec-report',
      name: 'Executive Report',
      subtitle: 'KPIs',
      position: { x: 68, y: 75 },
      icon: <BarChart3 />,
      color: COLORS.primary,
    },
    
    // Dashboard Layer
    {
      id: 'production-dashboard',
      name: 'Production Dashboard',
      position: { x: 85, y: 30 },
      icon: <Activity />,
      color: COLORS.success,
    },
    {
      id: 'quality-dashboard',
      name: 'Quality Dashboard',
      position: { x: 85, y: 50 },
      icon: <PieChart />,
      color: COLORS.warning,
    },
    {
      id: 'business-dashboard',
      name: 'Business Dashboard',
      position: { x: 85, y: 70 },
      icon: <TrendingUp />,
      color: COLORS.accent,
    },
    
    // Meetings (top)
    {
      id: 'dds-meeting',
      name: 'DDS/SQDCP',
      position: { x: 30, y: 10 },
      size: 'small',
      icon: <Calendar />,
      color: COLORS.danger,
    },
    {
      id: 'action-huddle',
      name: 'Action Huddle',
      position: { x: 50, y: 10 },
      size: 'small',
      icon: <Clock />,
      color: COLORS.warning,
    },
    {
      id: 'revenue-review',
      name: 'Revenue Review',
      position: { x: 70, y: 10 },
      size: 'small',
      icon: <DollarSign />,
      color: COLORS.primary,
    },
    
    // Automations (bottom)
    {
      id: 'daily-reminders',
      name: 'Daily Reminders',
      position: { x: 30, y: 90 },
      size: 'small',
      icon: <Zap />,
      color: COLORS.warning,
    },
    {
      id: 'red-alerts',
      name: 'Critical Alerts',
      position: { x: 50, y: 90 },
      size: 'small',
      icon: <AlertTriangle />,
      color: COLORS.danger,
    },
    {
      id: 'overdue-alerts',
      name: 'Overdue Alerts',
      position: { x: 70, y: 90 },
      size: 'small',
      icon: <Clock />,
      color: COLORS.warning,
    }
  ];

  const connections = [
    // Inputs to Master
    { from: 'production-team', to: 'master', type: 'edit', color: COLORS.success },
    { from: 'quality-team', to: 'master', type: 'edit', color: COLORS.success },
    { from: 'bu-analysts', to: 'master', type: 'edit', color: COLORS.success },
    
    // Master to Child Sheets
    { from: 'master', to: 'production-child', type: 'copy', color: COLORS.primaryLight },
    { from: 'master', to: 'quality-child', type: 'copy', color: COLORS.primaryLight },
    { from: 'master', to: 'client-sheets', type: 'copy', color: COLORS.primaryLight },
    { from: 'master', to: 'archive-sheet', type: 'move', color: COLORS.neutral },
    
    // Master to Reports
    { from: 'master', to: 'dds-report', type: 'filter', color: COLORS.accent },
    { from: 'master', to: 'action-report', type: 'filter', color: COLORS.accent },
    { from: 'master', to: 'revenue-report', type: 'filter', color: COLORS.accent },
    { from: 'master', to: 'exec-report', type: 'filter', color: COLORS.accent },
    
    // Reports to Dashboards
    { from: 'dds-report', to: 'production-dashboard', type: 'widget', color: COLORS.warning },
    { from: 'action-report', to: 'quality-dashboard', type: 'widget', color: COLORS.warning },
    { from: 'revenue-report', to: 'business-dashboard', type: 'widget', color: COLORS.warning },
    
    // Reports to Meetings
    { from: 'dds-report', to: 'dds-meeting', type: 'display', color: COLORS.primaryLight },
    { from: 'action-report', to: 'action-huddle', type: 'display', color: COLORS.primaryLight },
    { from: 'revenue-report', to: 'revenue-review', type: 'display', color: COLORS.primaryLight },
    
    // Master to Automations
    { from: 'master', to: 'daily-reminders', type: 'trigger', color: COLORS.danger },
    { from: 'master', to: 'red-alerts', type: 'trigger', color: COLORS.danger },
    { from: 'master', to: 'overdue-alerts', type: 'trigger', color: COLORS.danger }
  ];

  const connectionStrength = {
    'production-team-master': { volume: 'high' },
    'quality-team-master': { volume: 'medium' },
    'bu-analysts-master': { volume: 'low' },
    'master-production-child': { volume: 'high' },
    'master-quality-child': { volume: 'medium' },
    'master-client-sheets': { volume: 'medium' },
    'master-archive-sheet': { volume: 'high' },
    'master-dds-report': { volume: 'low' },
    'master-action-report': { volume: 'medium' },
    'master-revenue-report': { volume: 'medium' },
    'master-exec-report': { volume: 'low' }
  };

  const getNode = useCallback((id) => nodes.find(node => node.id === id), [nodes]);
  
  const getConnectionStrength = useCallback((from, to) => {
    const key = `${from}-${to}`;
    return connectionStrength[key] || { volume: 'low' };
  }, []);

  const visibleConnections = useMemo(() => {
    if (!focusedFlow || !flowView) return connections;
    const flowNodes = FLOW_TYPES[focusedFlow].nodes;
    return connections.filter(conn => 
      flowNodes.includes(conn.from) && flowNodes.includes(conn.to)
    );
  }, [focusedFlow, flowView]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setSelectedNode(null);
        setShowHelp(false);
      } else if (e.key === 'f' && !e.ctrlKey && !e.metaKey) {
        setFlowView(!flowView);
      } else if (e.key === 'h') {
        setShowHelp(!showHelp);
      } else if (e.key === 'u') {
        setShowUI(!showUI);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [flowView, showUI]);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col overflow-hidden">
      {/* Clean Header */}
      {showUI && (
        <div className="bg-white border-b shadow-sm z-50">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">PCI Pharma Services</h1>
                  <p className="text-xs text-gray-600">Master Execution Tracker Architecture</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Flow View Toggle */}
                <button
                  onClick={() => {
                    setFlowView(!flowView);
                    if (!flowView) setFocusedFlow(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                    flowView 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Workflow className="w-4 h-4" />
                  <span>Flow View</span>
                </button>
                
                {/* Help Button */}
                <button
                  onClick={() => setShowHelp(!showHelp)}
                  className="p-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                  title="Help (H key)"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
                
                {/* UI Toggle */}
                <button
                  onClick={() => setShowUI(!showUI)}
                  className="p-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                  title="Toggle UI (U key)"
                >
                  {showUI ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
          
          {/* Flow Selector */}
          {flowView && (
            <div className="px-4 py-2 bg-gray-50 border-t">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-gray-600">Flow:</span>
                <button
                  onClick={() => setFocusedFlow(null)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    focusedFlow === null 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All
                </button>
                {Object.entries(FLOW_TYPES).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setFocusedFlow(key)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                      focusedFlow === key 
                        ? 'text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: focusedFlow === key ? config.color : undefined
                    }}
                  >
                    {config.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Subtle section indicators */}
        {showUI && (
          <div className="absolute top-2 left-0 right-0 flex justify-around px-8 pointer-events-none z-20">
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Input</span>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Process</span>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Master</span>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Reports</span>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Output</span>
          </div>
        )}

        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
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
              <polygon points="0 0, 8 3, 0 6" opacity="0.6" />
            </marker>
          </defs>
          
          {visibleConnections.map(connection => {
            const fromNode = getNode(connection.from);
            const toNode = getNode(connection.to);
            if (!fromNode || !toNode) return null;
            
            const strength = getConnectionStrength(connection.from, connection.to);
            const isHighlighted = selectedNode === connection.from || selectedNode === connection.to;
            
            return (
              <ConnectionComponent
                key={`${connection.from}-${connection.to}`}
                connection={connection}
                fromNode={fromNode}
                toNode={toNode}
                strength={strength}
                flowView={flowView}
                focusedFlow={focusedFlow}
                isHighlighted={isHighlighted}
              />
            );
          })}
        </svg>

        {/* Render Nodes */}
        {nodes.map(node => (
          <NodeComponent
            key={node.id}
            node={node}
            isSelected={selectedNode === node.id}
            isHovered={hoveredNode === node.id}
            flowView={flowView}
            focusedFlow={focusedFlow}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
          />
        ))}

        {/* Selected Node Details */}
        {selectedNode && showUI && (
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-xs z-40">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{getNode(selectedNode)?.name}</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">{getNode(selectedNode)?.description || 'System component'}</p>
            <div className="text-xs space-y-1">
              <div className="font-medium text-gray-700 mb-1">Connections:</div>
              {connections.filter(c => c.from === selectedNode).map((c, i) => (
                <div key={i} className="text-gray-600 pl-2">→ {getNode(c.to)?.name}</div>
              ))}
              {connections.filter(c => c.to === selectedNode).map((c, i) => (
                <div key={i} className="text-gray-600 pl-2">← {getNode(c.from)?.name}</div>
              ))}
            </div>
          </div>
        )}

        {/* Minimal Legend */}
        {showUI && (
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-40">
            <div className="text-xs space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-0.5 bg-green-500"></div>
                <span className="text-gray-600">Direct Edit</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-0.5 bg-blue-500"></div>
                <span className="text-gray-600">Copy/Move</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-0.5 bg-teal-500"></div>
                <span className="text-gray-600">Live Filter</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-0.5 border-t-2 border-dashed border-red-500"></div>
                <span className="text-gray-600">Trigger</span>
              </div>
            </div>
          </div>
        )}

        {/* Help Modal */}
        {showHelp && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">System Overview</h3>
                <button
                  onClick={() => setShowHelp(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Architecture</h4>
                  <p>The Master Execution Tracker is the central database connecting all systems. Data flows from input teams through the master database to reports and dashboards.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Flow View</h4>
                  <p>Enable Flow View to see how data moves through specific workflows. Select Production, Quality, or Business flow to highlight relevant components.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Shortcuts</h4>
                  <ul className="space-y-1">
                    <li>• <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">F</kbd> - Toggle Flow View</li>
                    <li>• <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">H</kbd> - Toggle Help</li>
                    <li>• <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">U</kbd> - Toggle UI</li>
                    <li>• <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> - Clear Selection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
        .scale-102 {
          transform: scale(1.02) translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
};

export default SystemArchitectureMap; 
