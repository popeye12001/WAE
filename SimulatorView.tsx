
import React, { useState, useEffect } from 'react';
import { Node } from '../types';

const SimulatorView: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', name: 'User A (Origin)', x: 100, y: 150, status: 'idle' },
    { id: '2', name: 'Relay Node 1', x: 300, y: 100, status: 'idle' },
    { id: '3', name: 'Relay Node 2', x: 300, y: 250, status: 'idle' },
    { id: '4', name: 'User B (Dest)', x: 550, y: 150, status: 'idle' },
    { id: '5', name: 'Relay Node 3', x: 450, y: 300, status: 'idle' },
  ]);

  const [packets, setPackets] = useState<{from: string, to: string, progress: number, id: string}[]>([]);
  const [log, setLog] = useState<{msg: string, type: string}[]>([]);

  const addLog = (msg: string, type: string = 'info') => {
    setLog(prev => [{msg, type}, ...prev].slice(0, 12));
  };

  const simulateTransmission = (fromId: string, toId: string) => {
    const packetId = Math.random().toString(36).substr(2, 9);
    addLog(`[TX] Encrypting packet with Ratchet Key #${Math.floor(Math.random() * 100)}`, 'secure');
    
    setNodes(prev => prev.map(n => n.id === fromId ? { ...n, status: 'transmitting' } : n));
    
    // Path: 1 -> 2 -> 4 (Simulated hop logic)
    setPackets(prev => [...prev, { from: fromId, to: '2', progress: 0, id: packetId }]);
    
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === fromId ? { ...n, status: 'idle' } : n));
    }, 800);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setPackets(prev => {
        const next = prev.map(p => ({ ...p, progress: p.progress + 4 }));
        
        // Handle hop completions
        next.filter(p => p.progress >= 100).forEach(p => {
          if (p.to === '2') {
            addLog(`[RELAY] Node 2 re-broadcasting packet ${p.id.slice(0,4)}`, 'warn');
            // Next hop to destination
            setPackets(curr => [...curr.filter(c => c.id !== p.id), { ...p, from: '2', to: '4', progress: 0 }]);
          } else if (p.to === '4') {
            addLog(`[RX] Packet delivered and decrypted by User B`, 'success');
          }
        });

        return next.filter(p => p.progress < 100);
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Mesh Network Simulator</h2>
          <p className="text-gray-400">Visualizing E2EE packet hopping via Bluetooth BLE Advertise/Scan.</p>
        </div>
        <button 
          onClick={() => simulateTransmission('1', '4')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold transition-all shadow-lg active:scale-95 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          Send E2EE Message
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-gray-950 border border-gray-800 rounded-2xl h-[450px] relative overflow-hidden shadow-inner">
          {/* SVG Connections/Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="120" y1="150" x2="280" y2="100" stroke="#374151" strokeWidth="1" strokeDasharray="4" />
            <line x1="120" y1="150" x2="280" y2="250" stroke="#374151" strokeWidth="1" strokeDasharray="4" />
            <line x1="320" y1="100" x2="530" y2="150" stroke="#374151" strokeWidth="1" strokeDasharray="4" />
            <line x1="320" y1="250" x2="530" y2="150" stroke="#374151" strokeWidth="1" strokeDasharray="4" />
            <line x1="320" y1="250" x2="430" y2="300" stroke="#374151" strokeWidth="1" strokeDasharray="4" />
          </svg>

          {/* Rendering Packets */}
          {packets.map(p => {
            const from = nodes.find(n => n.id === p.from)!;
            const to = nodes.find(n => n.id === p.to)!;
            const curX = from.x + (to.x - from.x) * (p.progress / 100);
            const curY = from.y + (to.y - from.y) * (p.progress / 100);
            return (
              <div 
                key={p.id}
                className="absolute w-3 h-3 bg-blue-400 rounded-full blur-[2px] shadow-[0_0_10px_#60a5fa] z-10 transition-all duration-75"
                style={{ left: curX + 20, top: curY + 20 }}
              />
            );
          })}

          {/* Rendering Nodes */}
          {nodes.map(node => (
            <div 
              key={node.id}
              className="absolute transition-all duration-300"
              style={{ left: node.x, top: node.y }}
            >
              <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center bg-gray-900 shadow-xl ${
                node.status === 'transmitting' ? 'border-blue-500 scale-110' : 'border-gray-700'
              }`}>
                <svg className={`w-6 h-6 ${node.status === 'transmitting' ? 'text-blue-400 animate-pulse' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-center text-gray-400 w-12">{node.name.split(' ')[0]}</div>
              {node.status === 'transmitting' && (
                <div className="absolute -inset-2 border border-blue-500/30 rounded-full animate-ping pointer-events-none" />
              )}
            </div>
          ))}

          <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-3 rounded-lg text-[10px] text-gray-500 font-mono space-y-1">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]"></div> ACTIVE SESSION</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-600"></div> IDLE RELAY</div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl flex flex-col overflow-hidden">
          <div className="bg-gray-700/50 px-4 py-2 text-xs font-bold text-gray-300 flex items-center justify-between">
            <span>PROTOCOL LOG</span>
            <span className="text-[10px] text-gray-500">LIVE</span>
          </div>
          <div className="flex-1 p-4 font-mono text-[11px] overflow-y-auto space-y-2">
            {log.length === 0 && <div className="text-gray-600 italic">Awaiting network activity...</div>}
            {log.map((entry, i) => (
              <div key={i} className={`flex items-start gap-2 ${
                entry.type === 'success' ? 'text-green-400' : 
                entry.type === 'secure' ? 'text-blue-400' :
                entry.type === 'warn' ? 'text-yellow-400' : 'text-gray-400'
              }`}>
                <span className="opacity-50">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}]</span>
                <span className="break-words">{entry.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorView;
