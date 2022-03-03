import React, { Component } from "react";
import { Link } from "react-router-dom";
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import agent from "../../agent";
import "./auth.styles.scss";
import Loginbg from "../../assets/images/login/login_bg.jpg";
import Logo from "../../assets/images/login/logo.png";

class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      token: "",
      password: "",
      repassword: "",
      errMsg: "",
      verifyEmailSuccess: false,
      passwordChanged: false,
    };
  }

  handlePasswordResetSubmit = async (event) => {
    event.preventDefault();
    if (this.state.password === this.state.repassword) {
      const data = `token=${this.state.token}&password=${this.state.password}`;
      agent.AuthUser.pnResetPassword(data)
        .then((res) => {
          if (res.status === 200) {
            this.setState({ passwordChanged: true, errMsg: "" });
          } else {
            this.setState({
              passwordChanged: false,
              errMsg: "Something bad has happened",
            });
          }
        })
        .catch((err) => {
          this.setState({
            passwordChanged: false,
            errMsg: err.response.body.errors[0].detail,
          });
        });
    } else {
      this.setState({
        passwordChanged: false,
        errMsg: "Passwords donot match",
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const data = `email=${this.state.email}`;
    agent.AuthUser.pnForgetPassword(data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          this.setState({ verifyEmailSuccess: true, errMsg: "" });
        } else {
          this.setState({
            verifyEmailSuccess: false,
            errMsg: "Something bad has happened",
          });
        }
      })
      .catch((err) => {
        this.setState({
          verifyEmailSuccess: false,
          errMsg: err.response.body.errors[0].detail,
        });
      });
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
              {!this.state.verifyEmailSuccess ? (
                <>
                  <div className="title-section">
                    <h4>{t("auth.forgot.title")}</h4>
                    <p>{t("auth.forgot.link-conf-msg")}</p>
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
                          placeholder={t("auth.forgot.email")}
                          autoFocus
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary custom-btn"
                      >
                        {t("auth.forgot.verify-email")}
                      </button>
                      {this.state.errMsg !== "" && (
                        <p className="error-message">{this.state.errMsg}</p>
                      )}
                      <div className="bottom-link">
                        <Link className="option" to="/">
                          {t("auth.forgot.back-login")}
                        </Link>
                        <Link
                          to="/forget-password"
                          onClick={() =>
                            this.setState({ verifyEmailSuccess: true })
                          }
                          className="mx-2 option"
                        >
                          {t("auth.forgot.have-code")}
                        </Link>
                      </div>
                    </div>
                  </form>
                </>
              ) : this.state.verifyEmailSuccess &&
                !this.state.passwordChanged ? (
                <>
                  <div className="title-section">
                    <p>{t("auth.forgot.link-msg")}</p>
                  </div>

                  <form onSubmit={this.handlePasswordResetSubmit}>
                    <div className="user-section">
                      <div className="email">
                        <input
                          type="text"
                          name="token"
                          id="token"
                          className="input-text"
                          value={this.state.token}
                          placeholder={t("auth.forgot.token")}
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
                          placeholder={t("auth.forgot.password")}
                          onChange={this.handleChange}
                          value={this.state.password}
                          required
                        />
                      </div>
                      <div className="email">
                        <input
                          type="password"
                          id="confirm-password"
                          name="repassword"
                          className="input-password"
                          placeholder={t("auth.forgot.conf-password")}
                          onChange={this.handleChange}
                          value={this.state.repassword}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary custom-btn"
                      >
                        {t("auth.forgot.reset-password")}
                      </button>
                      {this.state.errMsg !== "" && (
                        <p className="error-message">{this.state.errMsg}</p>
                      )}
                      <div className="bottom-link">
                        <Link className="option" to="/">
                          {t("auth.forgot.back-login")}
                        </Link>
                        <Link
                          to="/forget-password"
                          onClick={() =>
                            this.setState({ verifyEmailSuccess: false })
                          }
                          className="mx-2 option"
                        >
                          {t("auth.forgot.get-token")}
                        </Link>
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="title-section">
                    <h4>{t("auth.forgot.success")}</h4>
                    <p>{t("auth.forgot.success-msg")}</p>
                  </div>
                  <Link to="/" className="option">
                    {t("auth.forgot.back-login")}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(ForgetPassword);
