import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectLeftPanel } from "../../../redux/about-app/about-app.selectors";
import { selectActiveSource } from "../../../redux/dataset/dataset.selectors";
import { selectUserInfo } from '../../../redux/user/user.selectors'
import { setLeftPanel } from "../../../redux/about-app/about-app.actions";
import HeadProfileSection from "./head-profile-section/head-profile-section.component";
import { useLocation } from "react-router-dom";

const LeftHeadSection = ({ setLeftPanel, leftPanel, activeSource, userInfo }) => {
  const location = useLocation();
  const { t } = useTranslation();
  
  
  return (
    <div className="aside-head">
      <div className="aside-head-top">
        <HeadProfileSection />
        <div className="input-group search-group flex-nowrap">
          <input
            autoComplete="off"
            type="search"
            placeholder="Search Datasets"
            id="dataset-input"
            className="form-control"
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <i className="fas fa-search"></i>
            </div>
          </div>
        </div>
      </div>
      <div>
        {location.pathname === "/" && (
          <div className="aside-head-bottom">
            <ul>
              <li
                className={`${
                  leftPanel === "dataset-list" || leftPanel === "livedata-list"
                    ? "active"
                    : ""
                }`}
              >
                <div className="btn-group a-drop">
                  <div>
                    <img src="/images/icons/icon-database.png" alt="database" />
                  </div>
                  <div
                    href="#"
                    className="dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-chevron-down"></i>
                  </div>
                  <div className="dropdown-menu">
                    <div className="bottom-content">
                      <div className="item-btm-cnt">
                        <button
                          className="link-cover dropdown-item"
                          onClick={() => setLeftPanel("dataset-list")}
                        >
                       <span>
                          <img
                            src="/images/icons/icon-database-cl.png"
                            alt="database"
                          />
                        </span>
                        </button>
                       
                     

                        <p>{t("left-section.dataset")}</p>
                      </div>
                      {
                        userInfo?.permittedModules?.includes('livedata') &&
                          <div className="item-btm-cnt">
                          <button
                            className="link-cover"
                            onClick={() => setLeftPanel("livedata-list")}
                          >
                             <span>
                            <img
                              src="/images/icons/icon-live-data-cl.png"
                              alt="live data"
                            />
                          </span>
                          </button>
                         
                         
                          <p>{t("left-section.livedata")}</p>
                        </div>
                        }
                        
                      
                     
                    </div>
                  </div>
                </div>
              </li>
              <li className="divider">&nbsp;</li>
              <li
                className={`${leftPanel === "dataset-filter" ? "active" : ""}`}
              >
                <button
                  className=""
                  onClick={() => setLeftPanel("dataset-filter")}
                >
                  <img src="/images/icons/icon-filter.png" alt="filter" />{" "}
                </button>
              </li>
              <li className="divider">&nbsp;</li>
              <li
                className={`${leftPanel === "dataset-detail" ? "active" : ""}`}
              >
                <button
                  className={`${activeSource === null ? "inactive" : ""}`}
                  onClick={() => setLeftPanel("dataset-detail")}
                  disabled={activeSource === null}
                >
                  <img src="/images/icons/icon-tool.png" alt="tool" />{" "}
                </button>
              </li>
            </ul>
          </div>
        )}
        {location.pathname === "/analysis-panel" && (
          <div className="aside-head-bottom">
            <ul>
              <li className={`${leftPanel === "dataset-list" ? "active" : ""}`}>
                <button
                  className=""
                  onClick={() => setLeftPanel("dataset-list")}
                >
                  <img src="/images/icons/icon-database.png" alt="dataset" />{" "}
                </button>
              </li>
              <li className="divider">&nbsp;</li>
              <li
                className={`${leftPanel === "analytics-list" ? "active" : ""}`}
              >
                <button
                  className=""
                  onClick={() => setLeftPanel("analytics-list")}
                >
                  <img
                    src="/images/icons/icon-analysis.png"
                    alt="analytics-list"
                  />
                </button>
              </li>
            </ul>
          </div>
        )}
         {location.pathname === "/analysis-panel" && (
          <div className="aside-head-bottom">
            <ul>
              <li className={`${leftPanel === "livedata-list" ? "active" : ""}`}>
                <button
                  className=""
                  onClick={() => setLeftPanel("livedata-list")}
                >
                  <img src="/images/icons/icon-database.png" alt="dataset" />{" "}
                </button>
              </li>
              <li className="divider">&nbsp;</li>
              <li
                className={`${leftPanel === "analytics-list" ? "active" : ""}`}
              >
                <button
                  className=""
                  onClick={() => setLeftPanel("analytics-list")}
                >
                  <img
                    src="/images/icons/icon-analysis.png"
                    alt="analytics-list"
                  />
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  leftPanel: selectLeftPanel,
  activeSource: selectActiveSource,
  userInfo: selectUserInfo,
});

const mapDispatchToProps = (dispatch) => ({
  setLeftPanel: (aboutApp) => dispatch(setLeftPanel(aboutApp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftHeadSection);
