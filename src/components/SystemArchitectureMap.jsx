import React, { useState } from 'react';
import { Database, Users, Calendar, AlertTriangle, TrendingUp, DollarSign, Target, Clock, Eye, Filter, Zap, CheckCircle, BarChart3, Layers } from 'lucide-react';

const SystemArchitectureMap = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [viewMode, setViewMode] = useState('overview');

  // colors...
  const colors = { primary: '#1B4B8A', primaryLight: '#2563EB', primaryDark: '#0F2847', accent: '#00BFA5', accentLight: '#4ECCA3', success: '#10B981', warning: '#F59E0B', danger: '#EF4444', neutral: '#6B7280' };

  /* minimal demo nodes for illustration */
  const allNodes = [
    { id:'master',name:'Master',subtitle:'SSOT',description:'...',position:{x:50,y:50},icon:<Database/>,color:colors.primary },
    { id:'prod',name:'Prod',subtitle:'Team',description:'...',position:{x:25,y:25},icon:<Users/>,color:colors.success }
  ];
  const connections=[{from:'prod',to:'master',type:'edit',label:'Edit',color:colors.success}];

  const getNode=id=>allNodes.find(n=>n.id===id);
  const visibleConns = connections;

  return (
    <div className="h-screen">
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" fill="currentColor"><polygon points="0 0, 10 3.5, 0 7" opacity="0.6"/></marker></defs>
        {visibleConns.map(c=>{
          const f=getNode(c.from),t=getNode(c.to);
          return <line key={c.from+c.to} x1={f.position.x+'%'} y1={f.position.y+'%'} x2={t.position.x+'%'} y2={t.position.y+'%'} stroke={c.color} strokeWidth={2} markerEnd="url(#arrowhead)"/>
        })}
      </svg>
      {allNodes.map(n=>(
        <div key={n.id} className="absolute" style={{left:n.position.x+'%',top:n.position.y+'%',transform:'translate(-50%,-50%)'}} onClick={()=>setSelectedNode(n.id)}>
          <div className="bg-white border p-2 rounded shadow">{n.name}</div>
        </div>
      ))}
    </div>
  );
};
export default SystemArchitectureMap;
