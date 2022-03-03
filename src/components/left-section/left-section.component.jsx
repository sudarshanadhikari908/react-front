import React from "react";
import "./left-section.styles.scss";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectHideLeftPanel } from "../../redux/about-app/about-app.selectors";
import { toggleLeftPanel } from "../../redux/about-app/about-app.actions";
import LeftHeadSection from "./left-head-section/left-head-section.component";
import LeftBodySection from "./left-body-section/left-body-section.component";

const LeftSection = ({hideLeftPanel, toggleLeftPanel}) => {
  return (
    <aside className={`__left-section display-height ${hideLeftPanel ? "toggle-aside" : ""}`}>
      <div className="aside-arrow" onClick={() => toggleLeftPanel(!hideLeftPanel)}><i className="fas fa-caret-left"></i></div>
      <div className="lf-aside-outer">
        <LeftHeadSection />
        <LeftBodySection />
      </div>
    </aside>
  )
}

const mapStateToProps = createStructuredSelector({
  hideLeftPanel: selectHideLeftPanel
})

const mapDispatchToProps = dispatch => ({
  toggleLeftPanel: aboutApp => dispatch(toggleLeftPanel(aboutApp))
})

export default connect(mapStateToProps,mapDispatchToProps)(LeftSection);