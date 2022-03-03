
export const addLivedataSources = (baseDatasource, newDataSource) => {
    return baseDatasource.concat(newDataSource)
  }
  
  export const selectLivedataSourcesData = (livedata, id) => {

    return livedata.livedataSources.filter(source => {

      if(source.livedata){
       
        if (source.livedata.id === id) {
       
          return source
      }
      }else {
        return source
         
      } 
     
     
    })
  
  }