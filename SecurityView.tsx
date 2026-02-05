
import React from 'react';

const SecurityView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white">Cryptographic Architecture</h2>
        <p className="text-gray-400">WAE uses multi-layered defense to ensure confidentiality even if physical nodes are compromised.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-gray-800 rounded-2xl p-6 border border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-24 h-24 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
          </div>
          <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            Double Ratchet Algorithm
          </h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">»</span>
              <span><strong>KDF Chain:</strong> Separates symmetric keys for every single message.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">»</span>
              <span><strong>Forward Secrecy:</strong> Old keys cannot be derived from new ones.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">»</span>
              <span><strong>Future Secrecy:</strong> Recovering a key doesn't allow decrypting future messages.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">»</span>
              <span><strong>X3DH Handshake:</strong> Initial secure connection established via Out-Of-Band Bluetooth exchange.</span>
            </li>
          </ul>
        </section>

        <section className="bg-gray-800 rounded-2xl p-6 border border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-24 h-24 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-green-400 mb-4">Storage Hardening</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-2">
              <span className="text-green-500 font-bold">»</span>
              <span><strong>SQLCipher:</strong> 256-bit AES encryption for the entire SQLite database at rest.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-500 font-bold">»</span>
              <span><strong>Argon2id:</strong> Password derivation for the database master key with high memory cost.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-500 font-bold">»</span>
              <span><strong>No Metadata:</strong> Message headers are obfuscated to prevent traffic analysis by relay nodes.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-500 font-bold">»</span>
              <span><strong>Ephemeral Store:</strong> Critical keys are kept in hardware-backed KeyStore (TEE).</span>
            </li>
          </ul>
        </section>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6">
        <h4 className="font-bold text-blue-300 mb-2">The "Panic Wipe" Protocol</h4>
        <p className="text-sm text-gray-400 leading-relaxed">
          The WAE Android client monitors system events (e.g., repeated failed unlocks, specific "stress" gestures, or a hardware "dead man's switch"). Upon trigger, the app initiates a secure overwrite of the master key sectors in the TEE, effectively rendering all local and transmitted data cryptographically unrecoverable within milliseconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Voice Calls', desc: 'Opus variable bitrate + custom WebRTC-over-BLE.' },
          { label: 'OOB Handshake', desc: 'Secure QR or Bluetooth proximity pairing.' },
          { label: 'Mesh Relay', desc: 'Store-and-forward for asynchronous delivery.' }
        ].map((item, i) => (
          <div key={i} className="p-4 border border-gray-800 rounded-xl bg-gray-900">
            <div className="text-blue-500 font-bold mb-1 text-xs uppercase tracking-widest">{item.label}</div>
            <div className="text-xs text-gray-500">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityView;
