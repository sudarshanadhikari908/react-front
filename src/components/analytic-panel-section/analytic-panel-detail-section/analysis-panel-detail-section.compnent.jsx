import React from "react";
import "./analysis-panel-detail-section.styles.scss";
import { createStructuredSelector } from "reselect";
import Helper from "../../../utils/helper";
import { selectHideLeftPanel } from "../../../redux/about-app/about-app.selectors";
import { selectAnalysisData } from "../../../redux/analytics-panel/analytics-panel.selectors";
import { updateAnalysisDataShow } from "../../../redux/analytics-panel/analytics-panel.actions";
import { connect } from 'react-redux'
import uuid from "react-uuid";



class AnalyticPanelDetailSection extends React.Component {
  render() {
    const { hideLeftPanel, analysisData, updateAnalyticPanelCategory } = this.props;
    return (
      <div className={`__analysis-panel-detail-section position-absolute ${!hideLeftPanel ? "left-panelshow" : ""}`}>
        <div className="data-draw-info-table">
          {(analysisData.length) && (<>
            <div className="local-body-item-list">
              {analysisData.map((analysis) => {
                return (<div className="location-body-item" key={uuid()} onClick={() => updateAnalyticPanelCategory(analysis.id)}>
                  <div>
                    {analysis.name}:
                    {(analysis.type === "list") && (
                      <span>
                        &nbsp; {Helper.numberFormatter(analysis.geodata.length)}
                      </span>
                    )}
                    {(analysis.type === "count") && (
                      <span>
                        &nbsp; {Helper.getTotalCount(analysis.dataList)}
                      </span>
                    )}
                  </div>
                  <span><img src={`/images/icons/pin-${Helper.checkGeodataIsAvail(analysis.geodata) ? "act" : "inact"}.png`} alt="" /></span>
                </div>)
              })}
            </div>

            {analysisData.map((analysis) => {
              return (
                <>
                  {(analysis.geodata) && (analysis.dataList) && (Helper.checkTotalZero(analysis)) && (
                    <div key={uuid()} className={`local-body-item ${analysis.isShowData ? "show" : ""}`}>
                      <div className="local_title">
                        <span className="local-img"><img src={analysis.icon} alt={analysis.name} /></span>
                        <p>{analysis.name}</p>
                        {(analysis.filter) && (
                          <span className="local-img-rt" data-toggle="modal" data-target="#location-analysis-{{collection.slug}}">
                            <img className="header-img" src="/images/icons/analize-filter.png" alt="" /></span>
                        )}
                        {(Helper.checkGeodataIsAvail(analysis.geodata)) && (
                          <span className="local-img-rt">
                            <img className="header-img" src="/images/icons/pin.png" alt="" />
                          </span>
                        )}
                      </div>
                      <div className="local-content">
                        <ul>
                          {(analysis.type === "admin") && (
                            <>
                              {analysis.dataList.map((admin) => {
                                if (admin.list === undefined) {
                                  return (<li key={uuid()}>
                                    <p><strong>{admin.type}</strong></p>
                                    <p>{admin.name.lastItem}</p>
                                  </li>)
                                } else {
                                  return (
                                    <div key={uuid()}>
                                      {admin.list.map((admList) => {
                                        return (<>
                                          {admList.relation.list.map((admDist) => {
                                            return (<>
                                              {admDist.relation.list.map((admLoc) => {
                                                return (<li key={uuid()}>
                                                  <p><strong>{admLoc.name}</strong>, {admLoc.type}</p>
                                                  <p><strong>District: </strong>{admDist.name}, <strong>{admList.name}</strong></p>
                                                </li>)
                                              })}
                                            </>)
                                          })}
                                        </>)
                                      })}
                                    </div>
                                  )
                                }
                              })}
                            </>
                          )
                          }
                          {(analysis.type === "count") && (
                            <>
                              {analysis.dataList.map((data) => {
                                return (<li key={uuid()}>
                                  <p><strong>{data.type}</strong></p>
                                  <p>{data.count}</p>
                                </li>)
                              })}
                            </>
                          )}
                          {(analysis.type === "list") && (
                            <>
                              {
                                analysis.geodata.map((geodata) => {
                                  return (<li key={uuid()}>
                                    <p><strong>{(geodata.properties.name !== "") ? geodata.properties.name : "Unknown"}</strong></p>
                                    <p>{
                                      Object.keys(geodata.properties).map((key) => {
                                        {
                                          if ((key !== "name") && (geodata.properties[key] !== undefined)) {
                                            if (key === "nearest_distance"
                                              && geodata.properties[key] !== "undefined"
                                              && geodata.properties[key] !== ""
                                              && geodata.properties[key] !== null) {
                                              return (<span key={uuid()}>{geodata.properties[key]} <strong>Away</strong></span>)
                                            } else {
                                              return (<span key={uuid()}>{geodata.properties[key]}</span>)
                                            }
                                          }
                                        }
                                      })}
                                    </p>
                                  </li>)
                                })
                              }
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </>
              )
            }
            )}
          </>)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  hideLeftPanel: selectHideLeftPanel,
  analysisData: selectAnalysisData,
})

const mapDispatchToProps = dispatch => ({
  updateAnalyticPanelCategory: analyticsPanel => dispatch(updateAnalysisDataShow(analyticsPanel)),

})
export default connect(mapStateToProps,mapDispatchToProps)(AnalyticPanelDetailSection)