

export const addDatasetSources = (baseDatasource, newDataSource) => {
  return baseDatasource.concat(newDataSource)
}

export const updateStyleFilter = (dataset, payload) => {
  return dataset.map(ds => {
    if (ds.id === payload.id)
      ds.defaultStyleColumn = payload.colName
    return ds
  })
}

export const updateDatasetFilter = (dataset, payload) => {
  return dataset.map(ds => {
    if (ds.id === payload.id) {
      ds.filter.map(filter => {
        if (filter.slug === payload.filter) {
          if (filter.type === "dropdown")
            filter.selectedValue = payload.value
          else if (filter.type === "checkbox") {
            filter.filterData.map(fd => {
              if (fd.key === payload.value)
                fd.isChecked = !fd.isChecked
              return fd
            })
          }
          else if (filter.type === "range")
            filter.selectedRange = payload.value
        }
        return filter
      })
    }
    return ds
  })
}

export const resetDatasetFilter = (dataset, payload) => {
  return dataset.map(ds => {
    if (ds.id === payload.id) {
      ds.filter.map(filter => {
        if (filter.slug === payload.filter) {
          if (filter.type === "dropdown")
            filter.selectedValue = "All"
          else if (filter.type === "checkbox")
            filter.filterData.map(fd => fd.isChecked = false)
          else if (filter.type === "range")
            filter.selectedRange = [filter.filterData.min, filter.filterData.max]
        }
        return filter
      })
    }
    return ds
  })
}

export const selectDatasetSourcesData = (dataset, id) => {
  let activeData = dataset.dataset.find(data => data.id === id)
  return dataset.datasetSources.filter(source => {
    if (source.dataset.id === id) {
      let temp = true;
      activeData.filter.forEach((fd) => {
        if (fd.type === 'dropdown') {
          if (fd.selectedValue !== "All") {
            temp = temp && (source.properties[fd.filterColumn] === fd.selectedValue)
          }
        } else if (fd.type === "checkbox") {
          let checkValue = fd.filterData.map(dt => { if (dt.isChecked) return dt.value; })
            .filter(e => e != null);
          temp = temp && (checkValue.length === 0 || checkValue.includes(source.properties[fd.filterColumn]))
        } else if (fd.type === "range") {
          if (fd.selectedRange[0] !== 0 && fd.selectedRange[1] !== 0) {
            temp = temp && (parseFloat(source.properties[fd.filterColumn]) >= fd.selectedRange[0] && parseFloat(source.properties[fd.filterColumn]) <= fd.selectedRange[1])
          }
        }
      })
      if (temp)
        return source
    }
  })

}