import React from "react";
import { connect } from "react-redux";
import { Form, Accordion } from "react-bootstrap";
import "./dataset-category-section.styles.scss";
import { createStructuredSelector } from "reselect";
import { selectDatasetCategories} from "../../../../redux/dataset/dataset.selectors";
import DatasetSubCategory from "./dataset-sub-category-section/dataset-sub-category-section.component";
import InputCheckboxSection from "../../input-checkbox/input-checkbox.component";
import { useTranslation } from "react-i18next";

const DatasetCategory = ({ datasetCategories}) => {

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
        {datasetCategories.map(({ ...category }) => {
          if (category.parentId === 0) {
            return (
              <Accordion.Item
                key={`dataset-category-${category.id}`}
                eventKey={category.id}
              >
                <Accordion.Header>{category.name}</Accordion.Header>
                <Accordion.Body>
                  <DatasetSubCategory key={category.id} {...category} />
                  <div className="checked-sec">
                    {category.dataset.map(({ ...dataset }) => (
                      <InputCheckboxSection
                        key={dataset.id}
                        dataset={dataset}
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
  datasetCategories: selectDatasetCategories,
  
  
});
export default connect(mapStateToProps)(DatasetCategory);
