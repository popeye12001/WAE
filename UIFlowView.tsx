
import React from 'react';

const UIFlowView: React.FC = () => {
  const flows = [
    {
      title: "User Onboarding",
      steps: [
        "Select unique username (Salted locally)",
        "Generate X25519 Identity Key-pair",
        "Setup SQLCipher Database (Argon2 passphrase)",
        "Enter Dashboard (Invisible Mode by default)"
      ]
    },
    {
      title: "Secure Pairing",
      steps: [
        "Open 'Add Contact' via Bluetooth Proximity",
        "Perform OOB Key Exchange (QR code scan)",
        "Verify Safety Numbers (Identity Key fingerprint)",
        "Establish first Double Ratchet session"
      ]
    },
    {
      title: "Protected Channels",
      steps: [
        "Create Channel (Password-derived AES-256 group key)",
        "Admin approval required for new relay requests",
        "Group Ratchet update on member kick",
        "Distributed Admin Control Lists (ACL)"
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-3xl font-bold text-white">Experience Architecture</h2>
        <p className="text-gray-400">Security-first UX ensuring zero friction for mission-critical privacy.</p>
      </header>

      <div className="space-y-16">
        {flows.map((flow, i) => (
          <section key={i} className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
                {i + 1}
              </div>
              <h3 className="text-2xl font-bold text-white">{flow.title}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {flow.steps.map((step, si) => (
                <div key={si} className="relative">
                  <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl h-full flex flex-col justify-center text-center group hover:border-blue-500 transition-colors">
                    <span className="text-xs text-blue-500 font-mono mb-2">STEP 0{si+1}</span>
                    <span className="text-sm font-medium text-gray-200">{step}</span>
                  </div>
                  {si < flow.steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
        <h4 className="text-xl font-bold text-white mb-6">Live Call Interaction Flow</h4>
        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-lg p-6 bg-gray-900 border border-dashed border-gray-700 rounded-xl text-center space-y-4">
            <div className="flex justify-between items-center px-4">
              <div className="text-xs font-bold text-blue-400">CALLER</div>
              <div className="h-[1px] flex-1 mx-4 bg-gray-800"></div>
              <div className="text-xs font-bold text-green-400">RECEIVER</div>
            </div>
            <div className="text-[11px] font-mono text-gray-500 space-y-2">
              <p className="bg-blue-500/10 p-2 rounded">1. Init: [BLE_ADV] {`{ type: 'call_req', encrypted_sdp: '...' }`}</p>
              <p className="bg-gray-800/50 p-2 rounded">2. Relay: [HOP] -> Node A -> Node B -> Receiver</p>
              <p className="bg-green-500/10 p-2 rounded">3. Resp: [GATT_WRITE] {`{ status: 'accept', sdp_answer: '...' }`}</p>
              <p className="bg-purple-500/10 p-2 rounded">4. Stream: Fragmented Opus Frames over BLE MTU (244 bytes)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIFlowView;
