import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { checkIsLoggedIn } from "./redux/user/user.selectors";
import LoginPage from "./pages/login-page.component";
import HomePage from "./pages/home-page.component";
import AnalyticsPanelPage from "./pages/analytics-panel.component";
import LeftSection from "./components/left-section/left-section.component";
import RightSection from "./components/right-section/right-section.component";
import LegendSection from "./components/legend-section/legend-section.components";
import { setAuthUser, setCurrentUser } from "./redux/user/user.actions";
import { setBaseMap } from "./redux/base-map/base-map.actions";
import { setAboutApp } from "./redux/about-app/about-app.actions";
import { setDataset } from "./redux/dataset/dataset.actions";
import { setLivedata } from "./redux/livedata/livedata.actions";
import {
  setAnalyticsPanel,
  setAnalyticsTodo,
} from "./redux/analytics-panel/analytics-panel.actions";
import agent from "./agent";
import "./styles/app.scss";
import ForgetPasswordPage from "./pages/forget-password.component";

class App extends React.Component {
  async componentDidMount() {
    const {
      setAuthUser,
      setCurrentUser,
      setAboutApp,
      setBaseMap,
      setDataset,
      setLivedata,
      setAnalyticsPanel,
      setAnalyticsTodo,
    } = this.props;

    if (window.localStorage.getItem("isLoggedIn") === "true") {
      setAuthUser({
        isLoggedIn: window.localStorage.getItem("isLoggedIn"),
        authToken: window.localStorage.getItem("authToken"),
      });
      setCurrentUser({ userInfo: await agent.pnData.getUserInfo() });
      setAboutApp({ aboutApp: await agent.pnData.getAboutApp() });
      setBaseMap({ baseMap: await agent.pnData.getBaseMap() });
      const dataset = await agent.pnData.getDataset();
      const analyticsPanel = await agent.pnData.getAnalyticsPanel();
      setDataset({
        dataset: dataset.dataset,
        datasetCategories: dataset.datasetCategories,
      });
     const livedata =await agent.pnData.getLiveData();
      setLivedata({
      livedata: livedata.livedata,
      livedataCategory: livedata.livedataCategory,
    });
      setAnalyticsPanel({
        analyticsPanel: analyticsPanel.analyticsPanel,
        analyticsPanelCategories: analyticsPanel.analyticsPanelCategories,
      });
      setAnalyticsTodo({ analyticsTodo: await agent.pnData.getAnalyticsTodo() });
    }
  }

  render() {
    return (
      <>
        {this.props.isLoggedIn && (
          <>
            <LeftSection />
            <RightSection />
            <LegendSection />
          </>
        )}
        <Switch>
          <Route exact path="/" render={() =>this.props.isLoggedIn ? <HomePage /> : <LoginPage /> } />
          <Route exact path="/login" render={() => this.props.isLoggedIn ? <Redirect to="/" /> : <LoginPage />}/>
          <Route exact path="/forget-password" render={() => <ForgetPasswordPage/>} />
          <Route exact path="/analysis-panel" render={() => this.props.isLoggedIn ? <AnalyticsPanelPage /> : <LoginPage /> }/>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoggedIn: checkIsLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  setAuthUser: (user) => dispatch(setAuthUser(user)),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setAboutApp: (aboutApp) => dispatch(setAboutApp(aboutApp)),
  setBaseMap: (baseMap) => dispatch(setBaseMap(baseMap)),
  setDataset: (dataset) => dispatch(setDataset(dataset)),
  setLivedata: (livedata)=> dispatch(setLivedata(livedata)),
  setAnalyticsPanel: (analyticsPanel) => dispatch(setAnalyticsPanel(analyticsPanel)),
  setAnalyticsTodo: (analyticsPanel) =>  dispatch(setAnalyticsTodo(analyticsPanel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
