import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthUser } from "../../redux/user/user.actions";
import i18n from "i18next";
import { withTranslation } from "react-i18next";

import "./auth.styles.scss";
import Loginbg from "../../assets/images/login/login_bg.jpg";
import Logo from "../../assets/images/login/logo.png";
import agent from "../../agent";
import config from "../../config/env_config.json";

class SingIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isloggedInFail: true,
      isDisabled: false,
      errMsg: null,
    };
  }

  async componentDidMount() {
    const { setAuthUser } = this.props;
    if (window.localStorage.getItem("isLoggedIn") === "true") {
      setAuthUser({
        isLoggedIn: window.localStorage.getItem("isLoggedIn"),
        authToken: window.localStorage.getItem("authToken"),
      });
      this.props.history.push("/");
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { setAuthUser } = this.props;
    if (
      this.state.email !== "" &&
      this.state.password !== "" &&
      this.state.email !== null &&
      this.state.password !== null
    ) {
      this.setState({
        isDisabled: true,
      });
      const data = `username=${this.state.email}&password=${this.state.password}&grant_type=password&client_id=${config.clientId}`;
      agent.AuthUser.pnAuth(data)
        .then((res) => {
          if (res.status === 200) {
           
            this.setState({
              isDisabled: false,
            });
            res.json().then((res) => {
            
              
              window.localStorage.setItem("isLoggedIn", true);
              
              window.localStorage.setItem("authToken", JSON.stringify(res));
              setAuthUser({
                isLoggedIn: true,
                authToken: res,
              });
              // this.props.history.push('/')
              window.location.reload();
            }
            );
          } else {
            window.localStorage.setItem("isLoggedIn", false);
            window.localStorage.removeItem("authToken");
            res.json().then((res) => {
              this.setState({
                isloggedInFail: true,
                errMsg: res.errors[0].detail,
                password: "",
              });
              window.setTimeout(() => {
                this.setState({
                  isloggedInFail: false,
                  errMsg: null,
                });
              }, 3000);
            });
          }
        })
        .catch((err) => {
          this.setState({
            isloggedInFail: false,
          });
          window.setTimeout(() => {
            this.setState({
              isloggedInFail: true,
            });
          }, 3000);
        });
    } else {
      this.setState({
        isloggedInFail: false,
      });
      window.setTimeout(() => {
        this.setState({
          isloggedInFail: true,
        });
      }, 3000);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { t } = i18n;

    return (
      <div className="container __login-section">
        <img src={Loginbg} className="img-responsive bg" alt="" />
        <div className="main_wrapper">
          <div className="sub_wrapper">
            <div className="col-xs-5 logo_section">
              <img src={Logo} className="img-responsive" alt="" />

              <p>EKbana Solution &copy; 2021</p>
            </div>
            <div className="col-xs-7 login_section input-section">
              <br />
              <div className="title-section">
                <h4>{t("login.sub-title")}</h4>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="user-section">
                  <div className="email">
                    <input
                      type="text"
                      name="email"
                      id="username"
                      className="input-text"
                      value={this.state.email}
                      placeholder={t("login.email-user")}
                      autoFocus
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="email">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="input-password"
                      placeholder={t("login.password")}
                      onChange={this.handleChange}
                      value={this.state.password}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary custom-btn">
                  {t("login.login")}
                </button>
                {this.state.isloggedInFail && (
                  <p className="error-message">{this.state.errMsg}</p>
                )}
                <div className="bottom-link">
                  <Link className="option" to="/forget-password">
                    {t("login.forget-pass")}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setAuthUser: (user) => dispatch(setAuthUser(user)),
});

export default withTranslation()(
  withRouter(connect(null, mapDispatchToProps)(SingIn))
);
