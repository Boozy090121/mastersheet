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
    icon: Activity,
    nodes: ['production-team', 'master', 'production-child', 'dds-report', 'production-dashboard', 'dds-meeting', 'daily-reminders', 'red-alerts']
  },
  quality: {
    color: COLORS.quality,
    label: 'Quality',
    description: 'Quality assurance and deviation management',
    icon: Shield,
    nodes: ['quality-team', 'master', 'quality-child', 'action-report', 'quality-dashboard', 'action-huddle', 'overdue-alerts']
  },
  business: {
    color: COLORS.business,
    label: 'Business',
    description: 'Revenue tracking and client relationship management',
    icon: TrendingUp,
    nodes: ['bu-analysts', 'master', 'client-sheets', 'revenue-report', 'business-dashboard', 'revenue-review', 'exec-report', 'archive-sheet']
  }
};

// Add a mapping for connection type colors
const CONNECTION_TYPE_COLORS = {
  edit: '#10B981',      // green
  copy: '#2563EB',      // blue
  move: '#6B7280',      // gray
  filter: '#00BFA5',    // teal
  trigger: '#EF4444',   // red
  widget: '#F59E0B',    // orange
  display: '#2563EB',   // blue
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
        isSelected ? 'z-50' : isHovered ? 'z-40' : 'z-20'
      }`}
      style={{ 
        left: `${node.position.x}%`,
        top: `${node.position.y}%`,
        transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.02)' : ''} ${isSelected ? 'scale(1.05)' : ''}`,
        opacity: flowView && !isInFocusedFlow ? 0.2 : 1
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div 
        className={`
          relative rounded-xl backdrop-blur-sm border transition-all duration-300
          ${isCore ? 'bg-gradient-to-br from-white/95 to-blue-50/95 border-blue-200/50' : 'bg-white/90 border-gray-200/50'}
          ${isSmall ? 'p-2.5' : 'p-4'}
          ${isSelected ? 'shadow-2xl ring-2 ring-blue-400 ring-offset-2' : ''}
          ${isHovered && !isSelected ? 'shadow-xl' : 'shadow-lg'}
        `}
        style={{
          minWidth: isCore ? '140px' : isSmall ? '90px' : '110px',
          borderColor: isSelected ? COLORS.primaryLight : isHovered ? node.color : undefined,
          boxShadow: isHovered && !isSelected ? `0 10px 30px -10px ${node.color}40` : undefined
        }}
      >
        {/* Animated gradient background for hover */}
        {isHovered && !isSelected && (
          <div 
            className="absolute inset-0 rounded-xl opacity-10"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${node.color}20 0%, transparent 70%)`
            }}
          />
        )}
        
        {/* Flow indicator - pulse animation */}
        {flowView && nodeFlow && isInFocusedFlow && focusedFlow && (
          <div 
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full shadow-lg"
            style={{ backgroundColor: FLOW_TYPES[nodeFlow].color }}
          >
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{ backgroundColor: FLOW_TYPES[nodeFlow].color }}
            />
          </div>
        )}
        
        <div className="flex flex-col items-center relative">
          <div 
            className={`${isSmall ? 'p-2' : 'p-2.5'} rounded-xl mb-2 backdrop-blur-sm transition-all duration-300 ${
              isHovered ? 'scale-110' : ''
            }`}
            style={{ 
              backgroundColor: `${node.color}15`,
              boxShadow: isHovered ? `0 4px 12px -2px ${node.color}30` : 'none'
            }}
          >
            <div style={{ color: node.color }}>
              {React.cloneElement(node.icon, { 
                className: isSmall ? 'w-4 h-4' : isCore ? 'w-8 h-8' : 'w-5 h-5' 
              })}
            </div>
          </div>
          
          <h3 className={`font-semibold text-gray-900 text-center leading-tight ${
            isSmall ? 'text-xs' : isCore ? 'text-sm' : 'text-xs'
          }`}>
            {node.name}
          </h3>
          
          {node.subtitle && !isSmall && (
            <p className="text-[10px] text-gray-500 text-center mt-1 font-medium">
              {node.subtitle}
            </p>
          )}
        </div>
        
        {isCore && (
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[10px] px-3 py-1 rounded-full font-semibold shadow-lg whitespace-nowrap flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span>Central Hub</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Connection Component
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
  
  const strokeWidth = strength.volume === 'high' ? 3 : strength.volume === 'medium' ? 2.5 : 2;
  const opacity = flowView && !isInFlow ? 0.15 : isHighlighted ? 1 : 0.75;
  const color = CONNECTION_TYPE_COLORS[connection.type] || '#9ca3af'; // Default to a light gray

  // Calculate edge points to prevent overlap with nodes
  const calculateEdgePoint = (from, to, nodeType, isFromNode) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance === 0) return isFromNode ? from : to; // Avoid division by zero
    const dirX = dx / distance;
    const dirY = dy / distance;
    let padding;
    // Adjust padding based on node visual size (approximate % widths/heights)
    if (nodeType === 'master') {
      padding = 4.5; // Master node is wider
    } else if (nodeType === 'small') {
      padding = 3;   // Small nodes are more compact
    } else {
      padding = 4;   // Regular nodes
    }
    if (isFromNode) {
      return {
        x: from.x + dirX * padding,
        y: from.y + dirY * padding
      };
    } else {
      return {
        x: to.x - dirX * padding,
        y: to.y - dirY * padding
      };
    }
  };
  const fromNodeType = fromNode.id === 'master' ? 'master' : fromNode.size || 'regular';
  const toNodeType = toNode.id === 'master' ? 'master' : toNode.size || 'regular';
  const fromPoint = { x: fromNode.position.x, y: fromNode.position.y };
  const toPoint = { x: toNode.position.x, y: toNode.position.y };
  const startPoint = calculateEdgePoint(fromPoint, toPoint, fromNodeType, true);
  const endPoint = calculateEdgePoint(fromPoint, toPoint, toNodeType, false);

  return (
    <g style={{ opacity }}>
      {/* Main connection line */}
      <line
        x1={`${startPoint.x}%`}
        y1={`${startPoint.y}%`}
        x2={`${endPoint.x}%`}
        y2={`${endPoint.y}%`}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={connection.type === 'trigger' ? '6,3' : 'none'}
        markerEnd="url(#arrowhead-sleek)"
        className="transition-all duration-300"
        strokeLinecap="round"
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
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/60 shadow z-50">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">PCI Pharma Services</h1>
              <p className="text-sm text-gray-600 font-medium">Master Execution Tracker Architecture</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setFlowView(!flowView);
                if (!flowView) setFocusedFlow(null);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-2 ${
                flowView 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl' 
                  : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80'
              }`}
            >
              <Workflow className="w-4 h-4" />
              <span>Flow View</span>
            </button>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100/80 transition-all"
              title="Help (H key)"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowUI(!showUI)}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100/80 transition-all"
              title="Toggle UI (U key)"
            >
              {showUI ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {flowView && (
          <div className="px-8 py-2 flex items-center space-x-3 border-t border-gray-100 bg-gradient-to-r from-gray-50/70 to-gray-100/70">
            <span className="text-sm font-semibold text-gray-700">Flow:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFocusedFlow(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  focusedFlow === null 
                    ? 'bg-gray-800 text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'
                }`}
              >
                All Systems
              </button>
              {Object.entries(FLOW_TYPES).map(([key, config]) => {
                const Icon = config.icon;
                const isActive = focusedFlow === key;
                return (
                  <button
                    key={key}
                    onClick={() => setFocusedFlow(key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                      isActive 
                        ? 'text-white shadow-md' 
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'
                    }`}
                    style={{
                      backgroundColor: isActive ? config.color : undefined
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{config.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Node Details */}
        {selectedNode && showUI && (
          <div className="w-80 bg-white/95 backdrop-blur-md border-r border-gray-200/50 shadow-lg overflow-y-auto z-40">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="p-2.5 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: `${getNode(selectedNode)?.color}15` }}
                  >
                    <div style={{ color: getNode(selectedNode)?.color }}>
                      {getNode(selectedNode)?.icon ? React.cloneElement(getNode(selectedNode).icon, { className: 'w-6 h-6' }) : <Info className="w-6 h-6" />}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg">{getNode(selectedNode)?.name}</h3>
                    {getNode(selectedNode)?.subtitle && (
                      <p className="text-sm text-gray-500 font-medium">{getNode(selectedNode).subtitle}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {getNode(selectedNode)?.description || 'System component for data processing and workflow management.'}
              </p>
              {(connections.filter(c => c.from === selectedNode).length > 0 || connections.filter(c => c.to === selectedNode).length > 0) && (
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-3">Data Flow</h4>
                  <div className="space-y-2">
                    {connections.filter(c => c.from === selectedNode).map((c, i) => (
                      <div key={`from-${i}`} className="text-sm text-gray-600 pl-4 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                        <span>→ {getNode(c.to)?.name}</span>
                      </div>
                    ))}
                    {connections.filter(c => c.to === selectedNode).map((c, i) => (
                      <div key={`to-${i}`} className="text-sm text-gray-600 pl-4 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                        <span>← {getNode(c.from)?.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Diagram Area */}
        <div className="flex-1 relative">
          {/* Section indicators */}
          {showUI && (
            <div className="absolute top-6 left-0 right-0 flex justify-around px-12 pointer-events-none z-20">
              {['Input', 'Process', 'Master', 'Reports', 'Output'].map((label) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-2" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          )}

          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
            <defs>
              <marker
                id="arrowhead-sleek"
                markerWidth="10"
                markerHeight="7"
                refX="8"
                refY="3.5"
                orient="auto"
                fill="currentColor"
              >
                <polygon points="0 0, 10 3.5, 0 7" />
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
          
          {/* Legend - Bottom Right Corner of Main Diagram Area */}
          {showUI && (
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 p-4 z-30 min-w-[170px]">
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2.5">Connection Types</h4>
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2.5">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{backgroundColor: CONNECTION_TYPE_COLORS.edit}}></span>
                  <span className="text-xs text-gray-600 font-medium">Direct Edit</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{backgroundColor: CONNECTION_TYPE_COLORS.copy}}></span>
                  <span className="text-xs text-gray-600 font-medium">Copy/Move</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{backgroundColor: CONNECTION_TYPE_COLORS.filter}}></span>
                  <span className="text-xs text-gray-600 font-medium">Live Filter</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{backgroundColor: CONNECTION_TYPE_COLORS.trigger}}></span>
                  <span className="text-xs text-gray-600 font-medium">Trigger</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg mx-4 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">System Overview</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6 text-gray-600">
              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">Architecture</h4>
                <p className="leading-relaxed">The Master Execution Tracker is the central database connecting all systems. Data flows from input teams through the master database to reports and dashboards.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">Flow View</h4>
                <p className="leading-relaxed">Enable Flow View to see how data moves through specific workflows. Select Production, Quality, or Business flow to highlight relevant components.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">Keyboard Shortcuts</h4>
                <div className="space-y-2 bg-gray-50 rounded-xl p-4">
                  {[
                    { key: 'F', desc: 'Toggle Flow View' },
                    { key: 'H', desc: 'Toggle Help' },
                    { key: 'U', desc: 'Toggle UI' },
                    { key: 'Esc', desc: 'Clear Selection' }
                  ].map(({ key, desc }) => (
                    <div key={key} className="flex items-center space-x-3">
                      <kbd className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs font-mono font-semibold shadow-sm">{key}</kbd>
                      <span className="text-sm">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SystemArchitectureMap; 

