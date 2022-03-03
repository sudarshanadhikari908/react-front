import React from "react";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import "./head-profile-section.styles.scss";
import i18n from "i18next";
import { withTranslation, Trans } from "react-i18next";
import { withRouter } from "react-router";
import { setAuthUser } from "../../../../redux/user/user.actions";
import { setLeftPanel } from "../../../../redux/about-app/about-app.actions";
import { selectUserInfo } from "../../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import LanguageSelection from "./language-selection-section/language-selection.components";

class HeadProfileSection extends React.Component {
  handleLogout = () => {
    window.localStorage.setItem("isLoggedIn", false);
    window.localStorage.removeItem("authToken");
    const { setAuthUser } = this.props;
    setAuthUser({
      isLoggedIn: false,
      authToken: null,
    });
    this.props.history.push("/");
  };

  render() {
    const { t } = i18n;
    const { history, userInfo, setLeftPanel } = this.props;

    return (
      <div>
        {userInfo && (
          <Dropdown className="__profile-drop" autoClose="outside">
            <Dropdown.Toggle className="" variant="plain">
              <img src="/images/icons/icon-user-dash.png" alt="user" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className="profile-block">
                <div className="profile-img">
                  <img
                    src={userInfo ? userInfo.profilePic : ""}
                    alt="username"
                    className="img-fluid"
                  />
                </div>
                <div className="profile-name">
                  <h6>
                    <Trans i18nKey="greeting">
                    {{ name: userInfo ? userInfo.name : "" }}
                    </Trans>
                  </h6>
                  <button
                    type="button"
                    className="btn-logout"
                    onClick={this.handleLogout}
                  >
                    {t("profile.logout")}
                  </button>
                  <button
                    type="button"
                    className="btn-logout"
                    data-toggle="modal"
                    data-target="#exampleModalLong"
                  >
                    {t("profile.repass")}
                  </button>
                </div>
              </div>
              <div className="profile-block-right">
                <div className="locale">
                  <LanguageSelection />
                  {/* {{#each selections as |model|}}
          <button className={{if model.active "active" }} {{action "changeLocale" model.locale}}>
            <img className="lang-img {{if model.active " active"}}" src={{model.image}} alt="">
          </button>
          {{/each}} */}
                </div>
                <div className="about">
                  <p>{t("profile.about")}</p>
                  <span>
                    <img src="/images/icons/icon-about.png" alt="about" />
                  </span>
                </div>
              </div>

              <div className="profile-content">
                {userInfo.permittedModules.includes("dataset") && (
                  <div className="item-prof">
                    <button
                      className="link-cover"
                      onClick={() => {
                        history.push("/");
                        setLeftPanel("dataset-list");
                      }}
                    ></button>
                    <span>
                      <img
                        src="/images/icons/icon-database-cl.png"
                        alt="dataset"
                      />
                    </span>
                    <p>{t("profile.dataset")}</p>
                  </div>
                )}

                {userInfo.permittedModules.includes("dataset-analysis") && (
                  <div className="item-prof">
                    <button
                      className="link-cover"
                      onClick={() => {
                        history.push("analysis");
                        setLeftPanel("dataset-analysis-list");
                      }}
                    ></button>
                    <span>
                      <img
                        src="/images/icons/icon-analysis-cl.png"
                        alt="data analytics"
                      />
                    </span>

                    <p>{t("profile.datasetanalysis")}</p>
                  </div>
                )}
                {userInfo.permittedModules.includes("timeline") && (
                  <div className="item-prof">
                    <button
                      className="link-cover"
                      onClick={() => {
                        history.push("timeline");
                        setLeftPanel("timeline-list");
                      }}
                    ></button>
                    <span>
                      <img
                        src="/images/icons/icon-timeline-cl.png"
                        alt="timeline"
                      />
                    </span>

                    <p>{t("profile.timeline")}</p>
                  </div>
                )}
                {userInfo.permittedModules.includes("analysis-panel") && (
                  <div className="item-prof">
                    <button
                      className="link-cover"
                      onClick={() => {
                        history.push("analysis-panel");
                        setLeftPanel("analytics-list");
                      }}
                    ></button>
                    <span>
                      <img
                        src="/images/icons/icon-analysis-cl.png"
                        alt="analytics-panel"
                      />
                    </span>
                    <p>{t("profile.analysispanel")}</p>
                  </div>
                )}
              </div>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo,
});

const mapDispatchToProps = (dispatch) => ({
  setAuthUser: (user) => dispatch(setAuthUser(user)),
  setLeftPanel: (aboutApp) => dispatch(setLeftPanel(aboutApp)),
});

export default withTranslation()(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(HeadProfileSection))
);
