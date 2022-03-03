import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import i18n from "i18next";
import { updateActiveMap } from "../../redux/base-map/base-map.actions";
import "./legend-section.styles.scss";

class LegendSection extends React.Component {
  state = { show: true };

  render() {
    const { t } = i18n;
    const { baseMapList, updateActiveMap } = this.props;

    return (
      <div className="legend__section">
        <div className="corner-titles">
          <div
            className="corner-title corner-title-active "
            onClick={() => {
              this.setState({ show: !this.state.show });
            }}
          >
            <img src="images/icons/icon-basemap.png" alt="basecamp" />
            <span>&nbsp; &nbsp;{t("legend.basemap")} </span>
          </div>
        </div>

        <div
          className={`basemap__section ${
            this.state.show ? "basemap-content-display" : ""
          } `}
        >
          <div className="basemap-content-inner">
            {baseMapList.map((baseMap) => {
              return (
                <div
                  className={`item-corner corner-title ${
                    baseMap.isDefault ? "active" : ""
                  }`}
                  key={baseMap.id}
                  onClick={() => {
                    updateActiveMap(baseMap);
                  }}
                >
                  <img src={baseMap.image} alt="image" className="img-fluid" />
                  <p>{baseMap.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ baseMap }) => ({
  baseMapList: baseMap.baseMapList,
});

const mapDispatchToProps = (dispatch) => ({
  updateActiveMap: (baseMap) => dispatch(updateActiveMap(baseMap)),
});

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(LegendSection)
);
