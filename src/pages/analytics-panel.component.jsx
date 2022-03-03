import React, { useState, useEffect } from 'react';
import AnalyticPanelSection from '../components/analytic-panel-section/analytic-panel-section.component';

const AnalyticsPanelPage = () => {
  const [title, setTitle] = useState("Analytic || Home");

  useEffect(() => {
    // This will run whethe page first loads and whenever the title changes
    document.title = title;
  }, [title]);
  return (<div>
    <AnalyticPanelSection />
  </div>
  )
}

export default AnalyticsPanelPage