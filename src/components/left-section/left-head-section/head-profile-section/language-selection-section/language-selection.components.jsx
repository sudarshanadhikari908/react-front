import React, { Component } from "react";
import uuid from "react-uuid";
import i18n from "../../../../../i18n";
import "./langauge-selection.styles.scss";
import config from '../../../../../config/env_config.json';


class LanguageSelection extends Component {
  handleClick(lng) {
    i18n.changeLanguage(lng);
  }

  render() {
    return (
      <div className="locale">
        {config.availableLanguage.map((lang) => {
          return (
          <button key={uuid()} onClick={() => this.handleClick(lang.slice(0,2))}>
            <img className="lang-img" src={`./locale/${lang}.png`} alt={`${lang}`} />
          </button>
          )
        })}
      </div>
    );
  }
}
export default LanguageSelection;
