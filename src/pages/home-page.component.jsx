import React, { useState, useEffect } from 'react';
import MapSection from '../components/map-section/map-section.component';

const HomePage = () => {
  const [title, setTitle] = useState("Analytic || Home");

  useEffect(() => {
    // This will run whethe page first loads and whenever the title changes
    document.title = title;
  }, [title]);
  return (<div>
    <MapSection />
  </div>
  )
}
export default HomePage;