
import React, { useState } from 'react';
import Layout from './components/Layout';
import Education from './components/Education';
import DataDashboard from './components/DataDashboard';
import WasteBankMap from './components/WasteBankMap';
import Assistant from './components/Assistant';
import WasteGame from './components/WasteGame';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.EDUCATION);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.EDUCATION:
        return <Education />;
      case Tab.DATA:
        return <DataDashboard />;
      case Tab.MAPS:
        return <WasteBankMap />;
      case Tab.ASSISTANT:
        return <Assistant />;
      case Tab.GAME:
        return <WasteGame />;
      default:
        return <Education />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in duration-500">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
