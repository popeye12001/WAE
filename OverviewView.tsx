
import React from 'react';

const OverviewView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-4xl font-extrabold text-white mb-2">WAE Project Overview</h2>
        <p className="text-xl text-gray-400">The Ultimate Secure Offline Communication Ecosystem.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
          <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">E2EE Ratchet</h3>
          <p className="text-gray-400 text-sm">Implementation of the Double Ratchet algorithm ensuring Forward Secrecy and Future Secrecy for every message packet.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-colors">
          <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Bluetooth Mesh</h3>
          <p className="text-gray-400 text-sm">Decentralized peer-to-peer relay system using BLE Advertising and GATT data exchange for infinite range scalability.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-red-500 transition-colors">
          <div className="w-12 h-12 bg-red-900/50 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Panic Wipe</h3>
          <p className="text-gray-400 text-sm">Instant zero-fill of SQLCipher database and cryptographic keys via hardware-triggered or software-initiated events.</p>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-4">The Mission</h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          In a world of increasing surveillance and digital fragility, <strong>WAE</strong> provides a sovereign communication platform that functions entirely without internet, cellular networks, or central servers. 
        </p>
        <p className="text-gray-300 leading-relaxed">
          By leveraging the ubiquity of Bluetooth and combining it with military-grade encryption standards used by Signal, we create a resilient "invisible" network for activists, emergency responders, and privacy enthusiasts.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-gradient-to-br from-blue-600/20 to-transparent p-6 rounded-xl border border-blue-500/30">
          <h4 className="text-blue-400 font-bold mb-2">No Identity Leakage</h4>
          <p className="text-xs text-gray-400">Username-only registration. No phone number, no email, no metadata stored in the cloud. User discovery happens purely via Bluetooth OOB Handshake.</p>
        </div>
        <div className="flex-1 bg-gradient-to-br from-purple-600/20 to-transparent p-6 rounded-xl border border-purple-500/30">
          <h4 className="text-purple-400 font-bold mb-2">Self-Healing Mesh</h4>
          <p className="text-xs text-gray-400">If a node leaves, the protocol automatically recalculates the optimal path for the packet to reach its destination through available relay peers.</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewView;
