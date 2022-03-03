import React from "react";
import { connect } from "react-redux";
import { Form, Accordion } from "react-bootstrap";
import "./livedata-category-section.styles.scss";
import { createStructuredSelector } from "reselect";
import { selectLivedataCategory} from "../../../../redux/livedata/livedata.selectors";
import LivedataSubCategory from "./livedata-sub-category-section/livedata-sub-category-section.component";
import InputCheckboxSection from "../../input-checkbox/input-checkbox.component";
import { useTranslation } from "react-i18next";

const LivedataCategory = ({ livedataCategories}) => {

  const { t } = useTranslation();
  
return (
    <div className="dataset__category">
      <div className="label-switch">
        <label className="label-title">{t("left-section.label-show")}</label>
        <div className="label-inner">
          <Form.Check
            inline
            label="Always On"
            name="label-check"
            type="radio"
            id="label-on"
          />
          <Form.Check
            inline
            label="On Hover"
            name="label-check"
            type="radio"
            id="label-hover"
          />

          <Form.Check
            inline
            label="Always Off"
            name="label-check"
            type="radio"
            id="label-off"
          />
        </div>
      </div>
      <Accordion flush>
        {livedataCategories.map(({ ...category }) => {
          if (category.parentId === 0) {
            return (
              <Accordion.Item
                key={`livedata-category-${category.id}`}
                eventKey={category.id}
              >
                <Accordion.Header>{category.name}</Accordion.Header>
                <Accordion.Body>
                  <LivedataSubCategory key={category.id} {...category} />
                  <div className="checked-sec">
                      
                    {
                        category.livedata.map(({ ...livedata }) => (
                         
                      <InputCheckboxSection
                      
                        key={livedata.id}
                        livedata={livedata}
                      />
                     
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          }
        })}
      </Accordion>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  livedataCategories: selectLivedataCategory,
  
  
});
export default connect(mapStateToProps)(LivedataCategory);
