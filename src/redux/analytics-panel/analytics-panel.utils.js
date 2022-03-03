export const addAnalyitcsTodo = (analyitcsTodo, payload) => {
  payload['isChecked'] = false
  payload['isDeleteBlocked'] = false
  analyitcsTodo.push(payload)
  return analyitcsTodo
}

export const updateAnalyitcsTodo = (analyitcsTodo, payload) => {
  return analyitcsTodo.map(aTd => {
    if (aTd.id === payload.id)
      aTd = payload
    else
      aTd.isChecked = false
    return aTd
  })
}

export const deleteAnalyitcsTodo = (analyitcsTodo, payload) => {
  return analyitcsTodo.filter(aTd => aTd.id !== payload.id )
}

export const activeAnalyticsFilterPanel = (analyticCatrgory) => {
  let analysisList = [];
  let currentUrl = "";
  let activeCat = analyticCatrgory.filter(catogory => catogory.isChecked === true);
  if (activeCat.length > 0) {
    activeCat.forEach(cat => {
      let actList = cat.analysisPanel.filter(analysisPanel => analysisPanel.isChecked);
      actList.forEach(act => {
        analysisList.push(act.id);
      })
      if (analysisList.length > 0) {
        currentUrl = "datasets=" + analysisList.toString();
      } else {
        currentUrl = "category=" + activeCat[0].id;
      }
    });
  } else {
    activeCat = analyticCatrgory.filter(catogory => catogory.isDefault === true);
    currentUrl = "category=" + activeCat[0].id;
  }
  return currentUrl
}

export const updateAnalysisDataShow = (analysisData, payload) => {
  return analysisData.map(aData => {
    if (aData.id === payload)
      aData.isShowData = !aData.isShowData
    return aData
  })
}