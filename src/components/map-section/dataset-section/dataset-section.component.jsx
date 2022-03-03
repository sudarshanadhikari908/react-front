import React from "react";
import { connect } from 'react-redux'
import { createStructuredSelector } from "reselect";
import { selectDataset } from "../../../redux/dataset/dataset.selectors";
import GeojsonLayer from "./geojson-layer.component";

const DatasetSection = ({ dataset }) => {
  return (
    <div>
      {
        dataset.map(({...dataset }) => {
          if (dataset.isChecked && dataset.responseType === "geojson") {
            return (<GeojsonLayer key={`dataset-geojsonlayer-${dataset.id}`} dataset={dataset}/>)
          }
          // else if (dataset.responseType === "mbtiles") {
          //   return ()
          // }
          // if (category.parentId === 0) {
          //   return (<Accordion.Item key={id} eventKey={id}>
          //     <Accordion.Header>{category.name}</Accordion.Header>
          //     <Accordion.Body>
          //       <DatasetSubCategory key={id} pId={id} {...category} />
          //       <div className="checked-sec">
          //         {
          //           category.dataset.map(({ id, ...dataset }) =>
          //             (<InputCheckboxSection key={id} id={id} dataset={dataset} />)
          //           )
          //         }
          //       </div>
          //     </Accordion.Body>
          //   </Accordion.Item>)
          // }
        })
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  dataset: selectDataset
})
export default connect(mapStateToProps)(DatasetSection);
