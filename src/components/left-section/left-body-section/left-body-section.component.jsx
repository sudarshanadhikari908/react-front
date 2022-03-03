import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectLeftPanel } from "../../../redux/about-app/about-app.selectors";
import DatasetCategory from "./dataset-category-section/dataset-category-section.component";
import DatasetFilter from "./dataset-filter-section/dataset-filter-section.component";
import DatasetDetail from "./dataset-detail-section/dataset-detail-section.component";
import LivedataCategory from './livedata-category-section/livedata-category-section.component';
import AnalyticCategory from "./analytics-category-section/analytics-category-section.component";
import { useLocation } from 'react-router-dom';
const LeftBodySection = ({ leftPanel }) => {
  const location = useLocation();
  return (
    <div className="aside-body">
      {((location.pathname === "/") || (location.pathname === "/analysis-panel")) && (leftPanel === "dataset-list") &&
        (<DatasetCategory />)
      }
        {((location.pathname === "/") || (location.pathname === "/analysis-panel")) && (leftPanel === "livedata-list") &&
        (<LivedataCategory />)
      }
      {(location.pathname === "/") && (leftPanel === "dataset-filter") &&
        (<DatasetFilter />)
      }
      {(location.pathname === "/") && (leftPanel === "dataset-detail") &&
        (<DatasetDetail />)
      }
      {(location.pathname === "/analysis-panel") &&
        (<AnalyticCategory />)}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  leftPanel: selectLeftPanel
});
export default connect(mapStateToProps)(LeftBodySection)