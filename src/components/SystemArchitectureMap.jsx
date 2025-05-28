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
    // Input Layer - Left
    { id: 'production-team', name: 'Production Team', subtitle: 'Direct Editors', description: 'Operations team with direct edit access', metrics: ['Real-time Updates', 'Production Metrics'], position: { x: 15, y: 25 }, icon: <Users className="w-8 h-8" />, color: colors.success },
    { id: 'quality-team', name: 'Quality Team', subtitle: 'Direct Editors', description: 'QA team managing investigations', metrics: ['Deviation Tracking', 'Investigation Management'], position: { x: 15, y: 50 }, icon: <Users className="w-8 h-8" />, color: colors.warning },
    { id: 'bu-analysts', name: 'Business Analysts', subtitle: 'Direct Editors', description: 'Revenue and client management', metrics: ['Revenue Tracking', 'Client Analysis'], position: { x: 15, y: 75 }, icon: <Users className="w-8 h-8" />, color: colors.accent },
    // Child Sheets - Left Middle
    { id: 'production-child', name: 'Production Sheet', subtitle: 'Copy-Row Automation', description: 'Filtered view for production team', metrics: ['Auto-Updated', 'Team Specific View'], position: { x: 35, y: 20 }, icon: <Target className="w-8 h-8" />, color: colors.success },
    { id: 'quality-child', name: 'Quality Sheet', subtitle: 'Copy-Row Automation', description: 'Filtered view for quality team', metrics: ['QA Specific Data', 'Investigation Tracking'], position: { x: 35, y: 40 }, icon: <AlertTriangle className="w-8 h-8" />, color: colors.warning },
    { id: 'client-sheets', name: 'Client Sheets', subtitle: 'Copy-Row Automation', description: 'Client-specific filtered views', metrics: ['Multiple Clients', 'Revenue Tracking'], position: { x: 35, y: 60 }, icon: <DollarSign className="w-8 h-8" />, color: colors.accent },
    { id: 'archive-sheet', name: 'Archive Sheet', subtitle: 'Move-Row Weekly', description: 'Completed work orders archive', metrics: ['Weekly Archive', 'Performance Optimization'], position: { x: 35, y: 80 }, icon: <Database className="w-8 h-8" />, color: colors.neutral },
    // Reports - Right Middle
    { id: 'dds-report', name: 'DDS Report', subtitle: 'Critical Items Only', description: 'Red status items for shift meetings', metrics: ['15-min Meetings', 'Safety Focus'], position: { x: 65, y: 20 }, icon: <Filter className="w-8 h-8" />, color: colors.danger },
    { id: 'action-report', name: 'Action Report', subtitle: 'Due Actions Focus', description: 'Daily accountability tracking', metrics: ['Due Today Items', 'Action Tracking'], position: { x: 65, y: 40 }, icon: <Clock className="w-8 h-8" />, color: colors.warning },
    { id: 'revenue-report', name: 'Revenue Report', subtitle: 'At-Risk Analysis', description: 'Bi-weekly revenue reviews', metrics: ['Revenue Tracking', 'Risk Analysis'], position: { x: 65, y: 60 }, icon: <TrendingUp className="w-8 h-8" />, color: colors.primary },
    { id: 'exec-report', name: 'Executive Report', subtitle: 'Leadership KPIs', description: 'Strategic decision support', metrics: ['Key Metrics', 'Strategic View'], position: { x: 65, y: 80 }, icon: <Eye className="w-8 h-8" />, color: colors.primaryDark },
    // Dashboards - Far Right
    { id: 'production-dashboard', name: 'Production Dashboard', subtitle: 'Smartsheet Sights', description: 'Real-time production metrics', metrics: ['Live Updates', 'Visual KPIs'], position: { x: 85, y: 25 }, icon: <BarChart3 className="w-8 h-8" />, color: colors.success },
    { id: 'quality-dashboard', name: 'Quality Dashboard', subtitle: 'Smartsheet Sights', description: 'Quality metrics visualization', metrics: ['Trend Analysis', 'QA Metrics'], position: { x: 85, y: 45 }, icon: <CheckCircle className="w-8 h-8" />, color: colors.warning },
    { id: 'business-dashboard', name: 'Business Dashboard', subtitle: 'Smartsheet Sights', description: 'Revenue and client metrics', metrics: ['Client Views', 'Revenue Trends'], position: { x: 85, y: 65 }, icon: <DollarSign className="w-8 h-8" />, color: colors.accent },
    // Meetings - Top
    { id: 'dds-meeting', name: 'DDS/SQDCP', subtitle: '15-min Daily', description: 'Safety and critical issues', position: { x: 30, y: 5 }, size: 'small', icon: <Calendar className="w-6 h-6" />, color: colors.danger },
    { id: 'action-huddle', name: 'Action Huddle', subtitle: '30-min Daily', description: 'Due actions review', position: { x: 50, y: 5 }, size: 'small', icon: <Calendar className="w-6 h-6" />, color: colors.warning },
    { id: 'revenue-review', name: 'Revenue Review', subtitle: 'Bi-weekly', description: 'Revenue analysis meeting', position: { x: 70, y: 5 }, size: 'small', icon: <Calendar className="w-6 h-6" />, color: colors.primary },
    // Automations - Bottom
    { id: 'daily-reminders', name: 'Daily Reminders', subtitle: '8:00 AM', description: 'Automated update requests', position: { x: 30, y: 95 }, size: 'small', icon: <Zap className="w-6 h-6" />, color: colors.warning },
    { id: 'red-alerts', name: 'Critical Alerts', subtitle: 'Real-time', description: 'Red status escalations', position: { x: 50, y: 95 }, size: 'small', icon: <Zap className="w-6 h-6" />, color: colors.danger },
    { id: 'overdue-alerts', name: 'Overdue Alerts', subtitle: '6:00 AM', description: 'Past due notifications', position: { x: 70, y: 95 }, size: 'small', icon: <Zap className="w-6 h-6" />, color: colors.warning },
  ];

  // Connection definitions
  const connections = [
    { from: 'production-team', to: 'master', type: 'edit', label: 'Direct Edit', color: colors.success },
    { from: 'quality-team', to: 'master', type: 'edit', label: 'Direct Edit', color: colors.success },
    { from: 'bu-analysts', to: 'master', type: 'edit', label: 'Direct Edit', color: colors.success },
    { from: 'master', to: 'production-child', type: 'copy-row', label: 'Copy-Row', color: colors.primaryLight },
    { from: 'master', to: 'quality-child', type: 'copy-row', label: 'Copy-Row', color: colors.primaryLight },
    { from: 'master', to: 'client-sheets', type: 'copy-row', label: 'Copy-Row', color: colors.primaryLight },
    { from: 'master', to: 'archive-sheet', type: 'move-row', label: 'Move-Row', color: colors.neutral },
    { from: 'master', to: 'dds-report', type: 'filter', label: 'Live Filter', color: colors.accent },
    { from: 'master', to: 'action-report', type: 'filter', label: 'Live Filter', color: colors.accent },
    { from: 'master', to: 'revenue-report', type: 'filter', label: 'Live Filter', color: colors.accent },
    { from: 'master', to: 'exec-report', type: 'filter', label: 'Live Filter', color: colors.accent },
    { from: 'dds-report', to: 'production-dashboard', type: 'widget', label: 'Report Widget', color: colors.warning },
    { from: 'action-report', to: 'quality-dashboard', type: 'widget', label: 'Report Widget', color: colors.warning },
    { from: 'revenue-report', to: 'business-dashboard', type: 'widget', label: 'Report Widget', color: colors.warning },
    { from: 'dds-report', to: 'dds-meeting', type: 'display', label: 'Display', color: colors.accentLight },
    { from: 'action-report', to: 'action-huddle', type: 'display', label: 'Display', color: colors.accentLight },
    { from: 'revenue-report', to: 'revenue-review', type: 'display', label: 'Display', color: colors.accentLight },
    { from: 'master', to: 'daily-reminders', type: 'trigger', label: 'Trigger', color: colors.danger },
    { from: 'master', to: 'red-alerts', type: 'trigger', label: 'Trigger', color: colors.danger },
    { from: 'master', to: 'overdue-alerts', type: 'trigger', label: 'Trigger', color: colors.danger }
  ];

  const getNode = (id) => allNodes.find(n => n.id === id);

  const getVisibleConnections = () => !selectedNode
    ? (viewMode==='overview'
        ? connections.filter(c => c.from==='master'||c.to==='master')
        : connections)
    : connections.filter(c => c.from===selectedNode || c.to===selectedNode);

  const renderConnection = (c) => {
    const fromNode = getNode(c.from); const toNode = getNode(c.to);
    if(!fromNode||!toNode) return null;
    const { x: x1, y: y1 } = fromNode.position;
    const { x: x2, y: y2 } = toNode.position;
    const opacity = selectedNode ? 0.8 : 0.3;
    const strokeWidth = selectedNode && (c.from===selectedNode||c.to===selectedNode) ? 3 : 2;
    return (
      <g key={c.from + '-' + c.to}>
        <line x1={x1+'%'} y1={y1+'%'} x2={x2+'%'} y2={y2+'%'}
          stroke={c.color} strokeWidth={strokeWidth} opacity={opacity}
          strokeDasharray={c.type==='trigger'?'5 3':'none'} markerEnd="url(#arrowhead)"/>
        {selectedNode && (c.from===selectedNode||c.to===selectedNode) && (
          <text x={(x1+x2)/2+'%'} y={(y1+y2)/2-1+'%'}
            textAnchor="middle" className="text-xs font-medium" fill={c.color}>
            {c.label}
          </text>
        )}
      </g>
    );
  };

  const renderNode = (node) => {
    const isSelected = selectedNode===node.id; const isHovered = hoveredNode===node.id;
    const isCore = node.id==='master'; const isSmall=node.size==='small';
    const width = isCore?'18%':isSmall?'12%':'15%';
    const height=isCore?(viewMode==='detailed'?'140px':'120px'):isSmall?'80px':(viewMode==='detailed'?'120px':'100px');
    return (
      <div key={node.id} className={'absolute cursor-pointer transition-all duration-300 '+(isSelected?'z-40':isHovered?'z-30':'z-20')}
        style={{left:node.position.x+'%',top:node.position.y+'%',transform:'translate(-50%, -50%)',width,minHeight:height}}
        onMouseEnter={()=>setHoveredNode(node.id)} onMouseLeave={()=>setHoveredNode(null)}
        onClick={()=>setSelectedNode(isSelected?null:node.id)}>
        <div className={'w-full h-full rounded-xl shadow-lg border-2 transition-all duration-300 '+
            (isSelected?'border-blue-500 shadow-2xl ring-4 ring-blue-200 scale-105':
              'border-gray-200 hover:border-gray-300 hover:shadow-xl')+' bg-white p-3 flex flex-col items-center justify-center'}>
          <div className="p-2 rounded-lg mb-2" style={{backgroundColor:node.color+'15'}}><div style={{color:node.color}}>
            {node.icon}</div></div>
          <h3 className={'font-bold text-gray-900 text-center '+(isSmall?'text-xs':'text-sm')}>{node.name}</h3>
          <p className="text-gray-600 text-center text-xs">{node.subtitle}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <svg className="absolute inset-0 w-full h-full" style={{zIndex:1}}>
        <defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" fill="currentColor">
          <polygon points="0 0, 10 3.5, 0 7" opacity="0.6" /></marker></defs>
        {getVisibleConnections().map(renderConnection)}
      </svg>
      {allNodes.map(renderNode)}
    </div>
  );
};

export default SystemArchitectureMap;
