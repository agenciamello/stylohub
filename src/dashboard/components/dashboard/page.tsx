'use client'
import React from 'react';
import { DashboardPage } from '@/dashboard/components/DashboardPage';

function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased selection:bg-amber-500/30">
      {/* In a real app, this would handle routing. 
          For this specific task, we render the Dashboard directly. */}
      <DashboardPage />
    </div>
  );
}

export default App;