
import React, { useState } from 'react';
import { View } from './types';
import Sidebar from './components/Sidebar';
import OverviewView from './views/OverviewView';
import ImplementationView from './views/ImplementationView';
import SimulatorView from './views/SimulatorView';
import SecurityView from './views/SecurityView';
import UIFlowView from './views/UIFlowView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.OVERVIEW);

  const renderContent = () => {
    switch (currentView) {
      case View.OVERVIEW:
        return <OverviewView />;
      case View.IMPLEMENTATION:
        return <ImplementationView />;
      case View.SIMULATOR:
        return <SimulatorView />;
      case View.SECURITY:
        return <SecurityView />;
      case View.UI_FLOW:
        return <UIFlowView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 font-sans antialiased">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 overflow-y-auto h-screen p-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
