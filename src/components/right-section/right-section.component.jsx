import React, { useState } from "react";
import "./right-section.styles.scss";
import { useLocation } from 'react-router-dom';
import AnalysisPanel from "./analytics-panel-section.component";

const RightSection = () => {
  const [expandRightSection, toggleRightSection] = useState(true);
  const location = useLocation();
  const isShowRightSection = (location.pathname === "/analysis-panel")
  return (<div>
    {(isShowRightSection) && (
      <div className={`right__section ${expandRightSection ? 'col-main-show' : ''}`}>
        <div className="trigger-inner">
          <div className="trigger">
            <button className="stat-trigger btn sticky-top" onClick={() => {toggleRightSection(!expandRightSection)}}>
              <i className="left-trigger fas fa-caret-left"></i>
              <i className="right-trigger fas fa-caret-right"></i>
            </button>
          </div>
          {(location.pathname === "/analysis-panel") && (<AnalysisPanel />)}
        </div>
      </div>
    )
    }
  </div>)
}

export default RightSection