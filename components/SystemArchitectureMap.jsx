import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Database, Users, Calendar, AlertTriangle, TrendingUp, DollarSign, 
  Target, Clock, Zap, CheckCircle, BarChart3, Activity, Info, Layers, 
  FileText, PieChart, Shield, GitBranch, Network, Workflow, Search, 
  X, HelpCircle, Menu, Eye, EyeOff, ArrowRight, Filter, BookOpen,
  Building, UserCheck, FileSpreadsheet, Settings, ChevronRight
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
    nodes: ['mastercontrol', 'master', 'quality-child', 'action-report', 'quality-dashboard', 'action-huddle', 'overdue-alerts']
  },
  business: {
    color: COLORS.business,
    label: 'Business',
    description: 'Revenue tracking and client relationship management',
    icon: TrendingUp,
    nodes: ['bu-analysts', 'jde', 'master', 'client-sheets', 'revenue-report', 'business-dashboard', 'revenue-review', 'exec-report', 'archive-sheet']
  }
};

// Add a mapping for connection type colors and descriptions
const CONNECTION_TYPES = {
  edit: { 
    color: '#10B981', 
    label: 'Direct Edit',
    description: 'Teams input data directly into master'
  },
  copy: { 
    color: '#2563EB', 
    label: 'Auto-sync Copy',
    description: 'Data automatically copied to child sheets'
  },
  move: { 
    color: '#6B7280', 
    label: 'Archive Move',
    description: 'Old data moved to archive storage'
  },
  filter: { 
    color: '#00BFA5', 
    label: 'Live Filter',
    description: 'Real-time filtered views for reports'
  },
  trigger: { 
    color: '#EF4444', 
    label: 'Automation Trigger',
    description: 'Conditions that trigger automated alerts'
  },
  widget: { 
    color: '#F59E0B', 
    label: 'Dashboard Widget',
    description: 'Reports embedded as dashboard widgets'
  },
  display: { 
    color: '#2563EB', 
    label: 'Meeting Display',
    description: 'Reports displayed in meetings'
  },
};

// Enhanced Node Component
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

// Enhanced Connection Component with animation
const ConnectionComponent = ({ 
  connection, 
  fromNode, 
  toNode, 
  strength,
  flowView,
  focusedFlow,
  isHighlighted,
  showAnimation
}) => {
  const isInFlow = useMemo(() => {
    if (!focusedFlow || !flowView) return true;
    return FLOW_TYPES[focusedFlow].nodes.includes(connection.from) && 
           FLOW_TYPES[focusedFlow].nodes.includes(connection.to);
  }, [focusedFlow, flowView, connection]);
  
  const strokeWidth = strength.volume === 'high' ? 3 : strength.volume === 'medium' ? 2.5 : 2;
  const opacity = flowView && !isInFlow ? 0.15 : isHighlighted ? 1 : 0.75;
  const color = CONNECTION_TYPES[connection.type]?.color || '#9ca3af';

  // Calculate edge points to prevent overlap with nodes
  const calculateEdgePoint = (from, to, nodeType, isFromNode) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance === 0) return isFromNode ? from : to;
    const dirX = dx / distance;
    const dirY = dy / distance;
    let padding;
    if (nodeType === 'master') {
      padding = 4.5;
    } else if (nodeType === 'small') {
      padding = 3;
    } else {
      padding = 4;
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

  // Create unique ID for this connection
  const pathId = `path-${connection.from}-${connection.to}`;

  return (
    <g style={{ opacity }}>
      {/* Define the path */}
      <defs>
        <path
          id={pathId}
          d={`M ${startPoint.x}% ${startPoint.y}% L ${endPoint.x}% ${endPoint.y}%`}
        />
      </defs>
      
      {/* Main connection line */}
      <line
        x1={`${startPoint.x}%`}
        y1={`${startPoint.y}%`}
        x2={`${endPoint.x}%`}
        y2={`${endPoint.y}%`}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeOpacity={0.6}
        strokeDasharray={connection.type === 'trigger' ? '6,3' : 'none'}
        markerEnd="url(#arrowhead-sleek)"
        className="transition-all duration-300"
        strokeLinecap="round"
      />
      
      {/* Animated particle for data flow */}
      {showAnimation && isInFlow && (
        <circle r="4" fill={color}>
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
      )}
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
  const [showConnections, setShowConnections] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [showLegend, setShowLegend] = useState(true);

  // System architecture data with enhanced descriptions
  const nodes = [
    // Master Database
    {
      id: 'master',
      name: 'Master Execution Tracker',
      subtitle: 'Single Source of Truth',
      description: 'Central Smartsheet containing 25 columns and 7,000+ active rows. Integrates data from Mastercontrol (QMS), JDE, and sitewide Smartsheet inputs. All data flows through this hub with automated workflows.',
      details: {
        'Technology': 'Smartsheet with automated workflows',
        'Data Volume': '7,000+ active rows, 25 columns',
        'Integrations': 'Mastercontrol (QMS), JDE, Sitewide Smartsheets',
        'Update Frequency': 'Real-time via forms & API',
        'Key Features': 'Automated workflows, alerts, approval routing'
      },
      position: { x: 50, y: 50 },
      icon: <Database />,
      color: COLORS.primary,
    },
    
    // Input Layer - Teams & Systems
    {
      id: 'production-team',
      name: 'Production Team',
      subtitle: 'Smartsheet Forms',
      description: 'Production floor teams input real-time data including safety metrics, production volumes, and quality checks through Smartsheet forms and mobile app.',
      details: {
        'Input Method': 'Smartsheet forms & mobile app',
        'Data Types': 'Safety incidents, production metrics, equipment status',
        'Frequency': 'Continuous throughout shift'
      },
      position: { x: 15, y: 15 },
      icon: <Users />,
      color: COLORS.success,
    },
    {
      id: 'mastercontrol',
      name: 'Mastercontrol QMS',
      subtitle: 'API Integration',
      description: 'Quality Management System providing automated data feed for deviations, CAPA, and change controls. Real-time integration with Smartsheet.',
      details: {
        'Integration': 'API connection to Smartsheet',
        'Data Types': 'Deviations, CAPA, change controls, audits',
        'Sync Frequency': 'Every 15 minutes'
      },
      position: { x: 15, y: 30 },
      icon: <Shield />,
      color: COLORS.warning,
    },
    {
      id: 'jde',
      name: 'JDE System',
      subtitle: 'Data Feed',
      description: 'Enterprise resource planning system providing financial and operational data. Automated data feed to master tracker.',
      details: {
        'Integration': 'Scheduled data export',
        'Data Types': 'Financial data, work orders, inventory',
        'Sync Frequency': 'Daily batch'
      },
      position: { x: 15, y: 47 },
      icon: <Building />,
      color: COLORS.primary,
    },
    {
      id: 'sitewide-sheets',
      name: 'Sitewide Smartsheets',
      subtitle: 'Cross-references',
      description: 'Various department-specific Smartsheets that feed into the master tracker through cross-sheet references and cell linking.',
      details: {
        'Method': 'Cross-sheet references',
        'Sources': 'HR, Facilities, Engineering, Validation',
        'Update': 'Real-time cell linking'
      },
      position: { x: 15, y: 64 },
      icon: <FileSpreadsheet />,
      color: COLORS.neutral,
    },
    {
      id: 'bu-analysts',
      name: 'Business Analysts',
      subtitle: 'Direct Input',
      description: 'Business unit analysts manage client relationships and project tracking directly in Smartsheet.',
      details: {
        'Input Method': 'Direct Smartsheet entry',
        'Data Types': 'Revenue tracking, milestones, client updates',
        'Frequency': 'Daily updates'
      },
      position: { x: 15, y: 81 },
      icon: <TrendingUp />,
      color: COLORS.accent,
    },
    
    // Processing Layer - Child Sheets
    {
      id: 'production-child',
      name: 'Production Sheet',
      subtitle: 'Auto-sync',
      description: 'Filtered Smartsheet report specific to production operations. Uses cross-sheet references and automated workflows.',
      details: {
        'Type': 'Smartsheet Report',
        'Update': 'Real-time via cell linking',
        'Filter Criteria': 'Production-related columns only',
        'Access': 'Production managers & supervisors'
      },
      position: { x: 32, y: 25 },
      icon: <GitBranch />,
      color: COLORS.success,
    },
    {
      id: 'quality-child',
      name: 'Quality Sheet',
      subtitle: 'Auto-sync',
      description: 'Quality-specific Smartsheet with automated workflows for deviation tracking and CAPA management.',
      details: {
        'Type': 'Linked Smartsheet',
        'Workflows': 'Auto-assign, escalation, approvals',
        'Filter Criteria': 'Quality metrics & deviations',
        'Access': 'QA team & management'
      },
      position: { x: 32, y: 42 },
      icon: <CheckCircle />,
      color: COLORS.warning,
    },
    {
      id: 'client-sheets',
      name: 'Client Sheets',
      subtitle: 'Auto-sync',
      description: 'Client-specific Smartsheet reports with filtered data relevant to each client. Published as view-only dashboards.',
      details: {
        'Type': 'Published Smartsheet Reports',
        'Update': 'Hourly refresh',
        'Filter Criteria': 'Client-specific projects',
        'Access': 'Client portal integration'
      },
      position: { x: 32, y: 58 },
      icon: <Network />,
      color: COLORS.accent,
    },
    {
      id: 'archive-sheet',
      name: 'Archive Sheet',
      subtitle: 'Weekly Move',
      description: 'Completed items moved to archive Smartsheet weekly. Maintains searchable history with attachments.',
      details: {
        'Archive Schedule': 'Weekly automation',
        'Method': 'Move row automation',
        'Retention': 'Unlimited in Smartsheet',
        'Search': 'Full text search available'
      },
      position: { x: 32, y: 75 },
      icon: <FileText />,
      color: COLORS.neutral,
    },
    
    // Reports Layer
    {
      id: 'dds-report',
      name: 'DDS Report',
      subtitle: 'Critical Items',
      description: 'Smartsheet report highlighting critical safety and production issues. Uses conditional formatting and filters for at-risk items.',
      details: {
        'Type': 'Dynamic Smartsheet Report',
        'Filters': 'Red flags, overdue items, safety incidents',
        'Update': 'Real-time',
        'Distribution': 'Published link & automated email'
      },
      position: { x: 68, y: 25 },
      icon: <AlertTriangle />,
      color: COLORS.danger,
    },
    {
      id: 'action-report',
      name: 'Action Report',
      subtitle: 'Due Today',
      description: 'Consolidated Smartsheet report showing all actions due today across departments. Color-coded by priority.',
      details: {
        'Type': 'Filtered Smartsheet Report',
        'Grouping': 'By owner and priority',
        'Escalation': 'Automated reminders',
        'Format': 'Card view for huddles'
      },
      position: { x: 68, y: 42 },
      icon: <Target />,
      color: COLORS.warning,
    },
    {
      id: 'revenue-report',
      name: 'Revenue Report',
      subtitle: 'At Risk',
      description: 'Financial tracking report combining Smartsheet data with JDE financial metrics. Shows at-risk revenue and project health.',
      details: {
        'Data Sources': 'Master tracker + JDE',
        'Key Metrics': 'Revenue at risk, margin analysis',
        'Visualization': 'Smartsheet charts & metrics',
        'Update': 'Daily refresh'
      },
      position: { x: 68, y: 58 },
      icon: <DollarSign />,
      color: COLORS.primary,
    },
    {
      id: 'exec-report',
      name: 'Executive Report',
      subtitle: 'KPIs',
      description: 'High-level Smartsheet dashboard with KPI widgets. Includes trend charts and predictive metrics.',
      details: {
        'Type': 'Smartsheet Dashboard',
        'Widgets': 'Metrics, charts, shortcut links',
        'Update': 'Hourly refresh',
        'Access': 'Executive team only'
      },
      position: { x: 68, y: 75 },
      icon: <BarChart3 />,
      color: COLORS.primary,
    },
    
    // Dashboard Layer
    {
      id: 'production-dashboard',
      name: 'Production Dashboard',
      description: 'Real-time Smartsheet dashboard displayed on factory floor screens. Shows live production metrics and safety status.',
      details: {
        'Type': 'Smartsheet Dashboard',
        'Display': '55" screens on production floor',
        'Widgets': 'Metric widgets, charts, heat maps',
        'Refresh': 'Real-time data'
      },
      position: { x: 85, y: 30 },
      icon: <Activity />,
      color: COLORS.success,
    },
    {
      id: 'quality-dashboard',
      name: 'Quality Dashboard',
      description: 'Quality metrics Smartsheet dashboard with trend charts and SPC widgets. Mobile-responsive for floor access.',
      details: {
        'Type': 'Smartsheet Dashboard',
        'Charts': 'Trend analysis, pareto charts',
        'Alerts': 'Conditional formatting for deviations',
        'Access': 'Web & mobile app'
      },
      position: { x: 85, y: 50 },
      icon: <PieChart />,
      color: COLORS.warning,
    },
    {
      id: 'business-dashboard',
      name: 'Business Dashboard',
      description: 'Client-facing Smartsheet dashboard showing project status and milestones. Published with view-only access.',
      details: {
        'Type': 'Published Smartsheet Dashboard',
        'Features': 'Project timelines, milestone tracking',
        'Security': 'View-only published links',
        'Branding': 'Client-specific themes'
      },
      position: { x: 85, y: 70 },
      icon: <TrendingUp />,
      color: COLORS.accent,
    },
    
    // Meetings (top)
    {
      id: 'dds-meeting',
      name: 'DDS/SQDCP',
      description: 'Daily Direction Setting meeting - 30 minutes each morning. Reviews safety, quality, delivery, cost, and people metrics using live Smartsheet data.',
      position: { x: 30, y: 10 },
      size: 'small',
      icon: <Calendar />,
      color: COLORS.danger,
    },
    {
      id: 'action-huddle',
      name: 'Action Huddle',
      description: 'Daily 15-minute stand-up format to review action items and blockers. Uses Smartsheet reports filtered for due/overdue items.',
      position: { x: 50, y: 10 },
      size: 'small',
      icon: <Clock />,
      color: COLORS.warning,
    },
    {
      id: 'revenue-review',
      name: 'Revenue Review',
      description: 'Weekly revenue and client satisfaction review. Pulls data from master tracker and financial integrations.',
      position: { x: 70, y: 10 },
      size: 'small',
      icon: <DollarSign />,
      color: COLORS.primary,
    },
    
    // Automations (bottom)
    {
      id: 'daily-reminders',
      name: 'Daily Reminders',
      description: 'Smartsheet automated workflows sending personalized reminders for upcoming deadlines. Configured by role and priority.',
      position: { x: 30, y: 90 },
      size: 'small',
      icon: <Zap />,
      color: COLORS.warning,
    },
    {
      id: 'red-alerts',
      name: 'Critical Alerts',
      description: 'Smartsheet automation triggering immediate notifications for critical safety or quality issues. Sends email and mobile push notifications.',
      position: { x: 50, y: 90 },
      size: 'small',
      icon: <AlertTriangle />,
      color: COLORS.danger,
    },
    {
      id: 'overdue-alerts',
      name: 'Overdue Alerts',
      description: 'Escalating Smartsheet workflow for overdue actions. Automated reminder sequence with manager escalation after 48 hours.',
      position: { x: 70, y: 90 },
      size: 'small',
      icon: <Clock />,
      color: COLORS.warning,
    }
  ];

  const connections = [
    // Inputs to Master
    { from: 'production-team', to: 'master', type: 'edit' },
    { from: 'mastercontrol', to: 'master', type: 'copy' },
    { from: 'jde', to: 'master', type: 'copy' },
    { from: 'sitewide-sheets', to: 'master', type: 'copy' },
    { from: 'bu-analysts', to: 'master', type: 'edit' },
    
    // Master to Child Sheets
    { from: 'master', to: 'production-child', type: 'copy' },
    { from: 'master', to: 'quality-child', type: 'copy' },
    { from: 'master', to: 'client-sheets', type: 'copy' },
    { from: 'master', to: 'archive-sheet', type: 'move' },
    
    // Master to Reports
    { from: 'master', to: 'dds-report', type: 'filter' },
    { from: 'master', to: 'action-report', type: 'filter' },
    { from: 'master', to: 'revenue-report', type: 'filter' },
    { from: 'master', to: 'exec-report', type: 'filter' },
    
    // Reports to Dashboards
    { from: 'dds-report', to: 'production-dashboard', type: 'widget' },
    { from: 'action-report', to: 'quality-dashboard', type: 'widget' },
    { from: 'revenue-report', to: 'business-dashboard', type: 'widget' },
    
    // Reports to Meetings
    { from: 'dds-report', to: 'dds-meeting', type: 'display' },
    { from: 'action-report', to: 'action-huddle', type: 'display' },
    { from: 'revenue-report', to: 'revenue-review', type: 'display' },
    
    // Master to Automations
    { from: 'master', to: 'daily-reminders', type: 'trigger' },
    { from: 'master', to: 'red-alerts', type: 'trigger' },
    { from: 'master', to: 'overdue-alerts', type: 'trigger' }
  ];

  const connectionStrength = {
    'production-team-master': { volume: 'high', description: '1000+ updates/day' },
    'mastercontrol-master': { volume: 'medium', description: '15-min sync' },
    'jde-master': { volume: 'low', description: 'Daily batch' },
    'sitewide-sheets-master': { volume: 'medium', description: 'Real-time linking' },
    'bu-analysts-master': { volume: 'low', description: '10+ updates/day' },
    'master-production-child': { volume: 'high', description: 'Real-time sync' },
    'master-quality-child': { volume: 'medium', description: 'Real-time sync' },
    'master-client-sheets': { volume: 'medium', description: 'Hourly refresh' },
    'master-archive-sheet': { volume: 'high', description: 'Weekly automation' },
    'master-dds-report': { volume: 'low', description: 'Live filter' },
    'master-action-report': { volume: 'medium', description: 'Real-time' },
    'master-revenue-report': { volume: 'medium', description: 'Daily refresh' },
    'master-exec-report': { volume: 'low', description: 'Hourly update' }
  };

  const getNode = useCallback((id) => nodes.find(node => node.id === id), [nodes]);
  
  const getConnectionStrength = useCallback((from, to) => {
    const key = `${from}-${to}`;
    return connectionStrength[key] || { volume: 'low', description: 'On-demand' };
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
      } else if (e.key === 'a') {
        setShowConnections(!showConnections);
      } else if (e.key === 'l') {
        setShowLegend(!showLegend);
      } else if (e.key === 'm') {
        setShowAnimation(!showAnimation);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [flowView, showUI, showConnections, showLegend, showAnimation]);

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
              <p className="text-sm text-gray-600 font-medium">Master Execution Tracker - Data Flow Architecture</p>
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
              onClick={() => setShowAnimation(!showAnimation)}
              className={`p-2 rounded-xl transition-all ${
                showAnimation 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
              }`}
              title="Toggle Animation (M key)"
            >
              <Activity className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100/80 transition-all"
              title="Help (H key)"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowConnections(!showConnections)}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100/80 transition-all"
              title="Toggle Arrows (A key)"
            >
              {showConnections ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
            <span className="text-sm font-semibold text-gray-700">Data Flow:</span>
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
          <div className="w-96 bg-white/95 backdrop-blur-md border-r border-gray-200/50 shadow-lg overflow-y-auto z-40">
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
                {getNode(selectedNode)?.description}
              </p>
              
              {/* Details Section */}
              {getNode(selectedNode)?.details && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-3">Details</h4>
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    {Object.entries(getNode(selectedNode).details).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600 font-medium">{key}:</span>
                        <span className="text-gray-800 text-right max-w-[60%]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Data Flow Section */}
              {(connections.filter(c => c.from === selectedNode).length > 0 || connections.filter(c => c.to === selectedNode).length > 0) && (
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-3">Data Flow</h4>
                  <div className="space-y-3">
                    {connections.filter(c => c.to === selectedNode).length > 0 && (
                      <div>
                        <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Inputs From</h5>
                        <div className="space-y-2">
                          {connections.filter(c => c.to === selectedNode).map((c, i) => {
                            const strength = getConnectionStrength(c.from, c.to);
                            return (
                              <div key={`to-${i}`} className="text-sm text-gray-600 pl-4 flex items-center justify-between bg-gray-50 rounded p-2">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                                  <span>{getNode(c.from)?.name}</span>
                                </div>
                                <span className="text-xs text-gray-500">{strength.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {connections.filter(c => c.from === selectedNode).length > 0 && (
                      <div>
                        <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Outputs To</h5>
                        <div className="space-y-2">
                          {connections.filter(c => c.from === selectedNode).map((c, i) => {
                            const strength = getConnectionStrength(c.from, c.to);
                            return (
                              <div key={`from-${i}`} className="text-sm text-gray-600 pl-4 flex items-center justify-between bg-gray-50 rounded p-2">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                  <span>{getNode(c.to)?.name}</span>
                                </div>
                                <span className="text-xs text-gray-500">{strength.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
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
              {['Input', 'Process', 'Master Hub', 'Reports', 'Output'].map((label, index) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-2" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Data Flow Indicator */}
          {showUI && showAnimation && (
            <div className="absolute top-16 left-12 right-12 flex items-center justify-between pointer-events-none z-20">
              <ChevronRight className="w-6 h-6 text-gray-300 animate-pulse" />
              <ChevronRight className="w-6 h-6 text-gray-300 animate-pulse" style={{ animationDelay: '0.3s' }} />
              <ChevronRight className="w-6 h-6 text-gray-300 animate-pulse" style={{ animationDelay: '0.6s' }} />
              <ChevronRight className="w-6 h-6 text-gray-300 animate-pulse" style={{ animationDelay: '0.9s' }} />
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
            {showConnections && visibleConnections.map(connection => {
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
                  showAnimation={showAnimation}
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
          
          {/* Enhanced Legend */}
          {showUI && showLegend && (
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 p-4 z-30 min-w-[200px]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Connection Types</h4>
                <button
                  onClick={() => setShowLegend(false)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Hide legend (L key)"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                {Object.entries(CONNECTION_TYPES).map(([key, config]) => (
                  <div key={key} className="flex items-start space-x-2.5">
                    <div className="mt-1.5">
                      <div 
                        className="w-3 h-0.5 rounded-full"
                        style={{
                          backgroundColor: config.color,
                          borderStyle: key === 'trigger' ? 'dashed' : 'solid',
                          borderWidth: key === 'trigger' ? '1px' : '0',
                          borderColor: config.color
                        }}
                      />
                    </div>
                    <div>
                      <div className="text-xs text-gray-700 font-medium">{config.label}</div>
                      <div className="text-[10px] text-gray-500">{config.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-[10px] text-gray-500">
                  Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-[10px]">L</kbd> to toggle
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          {showUI && (
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 p-3 z-30">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-gray-500 font-medium">Components</div>
                  <div className="text-lg font-bold text-gray-900">{nodes.length}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium">Connections</div>
                  <div className="text-lg font-bold text-gray-900">{connections.length}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-4 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Master Execution Tracker Architecture</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6 text-gray-600">
              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg flex items-center">
                  <Database className="w-5 h-5 mr-2 text-blue-600" />
                  System Overview
                </h4>
                <p className="leading-relaxed">
                  The Master Execution Tracker is a centralized Smartsheet that serves as the single source of truth for all operational data. 
                  It integrates data from Mastercontrol (QMS), JDE, and various sitewide Smartsheets, processing over 1,000 updates daily 
                  while maintaining real-time synchronization across all connected systems through automated workflows and cell linking.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg flex items-center">
                  <Workflow className="w-5 h-5 mr-2 text-green-600" />
                  Data Flow Architecture
                </h4>
                <p className="leading-relaxed mb-3">
                  Data flows through five distinct layers:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li><strong>Input Layer:</strong> Teams enter data via forms, plus automated feeds from Mastercontrol & JDE</li>
                  <li><strong>Process Layer:</strong> Child Smartsheets with cross-sheet references and reports</li>
                  <li><strong>Master Hub:</strong> Central Smartsheet with workflows and validations</li>
                  <li><strong>Reports Layer:</strong> Dynamic Smartsheet reports with filters and grouping</li>
                  <li><strong>Output Layer:</strong> Smartsheet dashboards and automated alerts</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-purple-600" />
                  Flow View
                </h4>
                <p className="leading-relaxed">
                  Enable Flow View to visualize how data moves through specific workflows:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li><strong>Production Flow:</strong> Safety metrics and production tracking</li>
                  <li><strong>Quality Flow:</strong> Deviation management and corrective actions</li>
                  <li><strong>Business Flow:</strong> Revenue tracking and client management</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-orange-600" />
                  Keyboard Shortcuts
                </h4>
                <div className="grid grid-cols-2 gap-2 bg-gray-50 rounded-xl p-4">
                  {[
                    { key: 'F', desc: 'Toggle Flow View' },
                    { key: 'H', desc: 'Toggle Help' },
                    { key: 'U', desc: 'Toggle UI Elements' },
                    { key: 'A', desc: 'Toggle Connections' },
                    { key: 'L', desc: 'Toggle Legend' },
                    { key: 'M', desc: 'Toggle Animation' },
                    { key: 'Esc', desc: 'Clear Selection' }
                  ].map(({ key, desc }) => (
                    <div key={key} className="flex items-center space-x-3">
                      <kbd className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs font-mono font-semibold shadow-sm min-w-[30px] text-center">{key}</kbd>
                      <span className="text-sm">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Best Practices
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                  <li>Click on any component to see detailed information</li>
                  <li>Use Flow View to understand specific workflow dependencies</li>
                  <li>Monitor connection strengths to identify bottlenecks</li>
                  <li>Review automation workflows in Smartsheet to ensure timely alerts</li>
                </ul>
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