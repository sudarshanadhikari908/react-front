import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import build from 'redux-object';
import normalize from 'json-api-normalizer';
import config from './config/env_config.json';
import { decode } from "geojson-polyline";
import uuid from 'react-uuid';
import { camelize } from './utils/util';
import { isEmpty } from 'lodash';

const superagent = superagentPromise(_superagent, global.Promise);
const responseBody = res => res.body;

// const getToken = () => {
//   let token = '';
//   if (window.localStorage.getItem('token')) {
//     token = window.localStorage.getItem('token');
//   }
//   return token;
// };

// const requests = {
//   get: url =>
//     superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
//   post: (url, body) =>
//     superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
//   system: url =>
//     superagent.get(`${DASHBOARD_API}${url}`).then(responseBody),
// };

// const nodeRequests = {
//   get: url =>
//     superagent.get(`${NODE_API_ROOT}${url}`).then(responseBody),
//   post: (url, body) =>
//     superagent.post(`${NODE_API_ROOT}${url}`, body).then(responseBody)
// };

// const foodmanduRequests = {
//   get: url =>
//     superagent.get(`${FOODMANDU_API_ROOT}${url}`).then(responseBody),
//   getDelivery: url =>
//     superagent.get(`${EK_DEVLIVERY_POINT}${url}`).then(responseBody),
//   postDelivery: (url, body) =>
//     superagent.post(`${EK_DEVLIVERY_POINT}${url}`, body).then(responseBody),
//   post: (url, body) =>
//     superagent.post(`${FOODMANDU_API_ROOT}${url}`, body).then(responseBody)
// };

// const tokenRequests = {
//   get: url =>
//     superagent.get(`${NODE_TOKEN_SERVER}${url}`).then(responseBody),
//   post: (url, body) =>
//     superagent.post(`${NODE_TOKEN_SERVER}${url}`, body).then(responseBody)
// };

// const compressRequests = {
//   get: url =>
//     superagent.get(`${COMPRESS_API}${url}`).end().then(responseBody),
//   post: (url, body) =>
//     superagent.post(`${COMPRESS_API}${url}`, body).then(responseBody)
// };

// const dashboardRequests = {
//   get: url =>
//     superagent.get(`${DASHBOARD_API}${url}`).set('key', `$2y$10$JVvyNgWiKuYqK/g6v0.rxe.MLUFJkZAlLm4gmFkrZto8b4yweUmka`).end().then(responseBody),
//   post: (url, body) =>
//     superagent.post(`${DASHBOARD_API}${url}`, body).set('key', `$2y$10$JVvyNgWiKuYqK/g6v0.rxe.MLUFJkZAlLm4gmFkrZto8b4yweUmka`).then(responseBody)
// };

// const deliveryRequests = {
//   get: url =>
//     superagent.get(`${DELIVERY_API}${url}`).set('key', 'IZdEpckK8pOUY8NqBG90IAMDQ9WaF3C9krtInXVXFsIfw4ej4u').end().then(responseBody),
//   post: (url, body) =>
//     superagent.get(`${DELIVERY_API}${url}`, body).set('key', 'IZdEpckK8pOUY8NqBG90IAMDQ9WaF3C9krtInXVXFsIfw4ej4u').then(responseBody),
// }


// const bestRouteRequests = {
//   getToken: url =>
//     superagent.get(`${BESTROUTE_API}/auth/get-token`).set({'grant-type':'client_credentials', 'client-id': 8, 'client-secret':'hG8o50Bf1RdQwAlyqKIOe00WPqcvsY7o3ijIj9fh'}).end().then(responseBody),
//   get: url =>
//     superagent.get(`${BESTROUTE_API}${url}`).set('Authorization', `Bearer ${getToken()}`).end().then(responseBody),
//   post: (url, body) =>
//     superagent.post(`${BESTROUTE_API}${url}`, body).set('Authorization', `Bearer ${getToken()}`).then(responseBody),
//   delete: (url, body) =>
//     superagent.del(`${BESTROUTE_API}${url}`).set('Authorization', `Bearer ${getToken()}`).then(responseBody),
//   put: (url, body) =>
//     superagent.put(`${BESTROUTE_API}${url}`, body).set('Authorization', `Bearer ${getToken()}`).then(responseBody),
// };

const getToken = () => {
  if (window.localStorage.getItem('authToken') !== null && window.localStorage.getItem('authToken') !== undefined) {
   return JSON.parse(window.localStorage.getItem('authToken'));
  } else {
    window.localStorage.setItem('isLoggedIn', false)
    // window.localStorage.removeItem('authToken');
    window.location.reload();
  }

};

const checkError = (res) => {
  if (res.response.status === 401) {
    window.localStorage.setItem('isLoggedIn', false)
    // window.localStorage.removeItem('authToken');
    window.location.reload();
  }
  return res.response.body
}

const dataRequests = {
  get: url =>
    superagent.get(`${config.baseApiUrl}${url}`).set('Authorization', `${getToken().token_type} ${getToken().access_token}`).then(responseBody).catch(err => { throw (err) }),
  post: (url, body) =>
    superagent.post(`${config.baseApiUrl}${url}`, body).set('Authorization', `${getToken().token_type} ${getToken().access_token}`).then(responseBody).catch(err => { throw (err) }),
  put: (url, body) =>
    superagent.put(`${config.baseApiUrl}${url}`, body).set('Authorization', `${getToken().token_type} ${getToken().access_token}`).then(responseBody).catch(err => { throw (err) }),
  delete: (url) =>
    superagent.del(`${config.baseApiUrl}${url}`).set('Authorization', `${getToken().token_type} ${getToken().access_token}`).then(responseBody).catch(err => { throw (err) }),
}
const externalLivedataRequest = {
  get: source=>   
    superagent.get(`${source}`).set('Authorization', `${getToken().token_type} ${getToken().access_token}`).then(responseBody).catch(err => { throw (err) }),
}

const pnData = {
  getUserInfo: () => dataRequests.get('auth-users?')
    .then(response => {
      const normalizeData = normalize(response)
      let authUser = Object.values(normalizeData.authUser).map(object =>
        build(normalizeData, 'authUser', object.id)
      )
      return authUser.lastItem
    })
    .catch(err => checkError(err)),
  getAboutApp: () => dataRequests.get('about-apps?')
    .then(response => {
      const normalizeData = normalize(response)
      let aboutApp = Object.values(normalizeData.aboutApp).map(object =>
        build(normalizeData, 'aboutApp', object.id)
      )
      return aboutApp.lastItem
    }),
  getBaseMap: () => dataRequests.get('base-maps')
    .then(response => {
      const normalizeData = normalize(response)
      return Object.values(normalizeData.baseMap).map(object =>
        build(normalizeData, 'baseMap', object.id)
      )
    }),
  getDataset: () => dataRequests.get('dataset-categories')
    .then(response => {
      const normalizeData = normalize(response)
      return {
        datasetCategories: Object.values(normalizeData.datasetCategory).map(object =>
          build(normalizeData, 'datasetCategory', object.id)
        ),
        dataset: Object.values(normalizeData.dataset).map(object =>
          build(normalizeData, 'dataset', object.id)
        ),
      }
    }).then(({ datasetCategories, dataset }) => {
      let newDatasetCategories = datasetCategories.map(category => {
        category['isParentCategory'] = (category.parentId === 0)
        return category;
      })
      let newDataset = dataset.map(ds => {
          ds.filter.map(filter => {
          filter.filterColumn = camelize(filter.filterColumn)
          if (filter.type === "dropdown")
            filter["selectedValue"] = "All";
          else if (filter.type === "range")
            filter["selectedRange"] = [filter.filterData.min, filter.filterData.max]
          else if (filter.type === "checkbox") {
            const dataList = Object.keys(filter.filterData).map(key => {
              return { key: key, value: filter.filterData[key], isChecked: false }
            })
            filter.filterData = dataList
          }
          return filter
        })
        return ds
      })
      
      return {
        datasetCategories: newDatasetCategories,
        dataset: newDataset
      };
    }),
    getLiveData: () => dataRequests.get('livedata-categories')
    .then(response =>{
      const normalizeData = normalize(response)
      return {
        livedataCategory: Object.values(normalizeData.livedataCategory).map(object =>
          build(normalizeData, 'livedataCategory', object.id)
        ),
        livedata: Object.values(normalizeData.livedata).map(object =>
          build(normalizeData, 'livedata', object.id)
        ),
      }
    }).then(({ livedataCategory, livedata }) => {
      let newlivedataCategory = livedataCategory.map(category => {
        category['isParentCategory'] = (category.parentId === 0)
        return category;
      })
      let newLivedata = livedata.map(ld => {
      
        return ld
      })
    
      
      return {
        livedataCategory: newlivedataCategory,
        livedata: newLivedata
      };
    }),


  getDatasetSources: (id) => dataRequests.get(`dataset-sources/${id}`)
    .then(response => {
      const normalizeData = normalize(response)
      return {
        datasetSources: Object.values(normalizeData.datasetSource).map(object =>
          build(normalizeData, 'datasetSource', object.id)
        ),
        dataset: Object.values(normalizeData.dataset).map(object =>
          build(normalizeData, 'dataset', object.id)
        ),
      }
    }).then(({ datasetSources, dataset }) => {
      let newDatasetSources = datasetSources.map(source => {
        source.geojson = decode(source.geojson);
        source.geojson['properties'] = source.properties;
        source.geojson['baseId'] = source.id;
        source.geojson['id'] = uuid();
        return source;
      })
      return {
        datasetSources: newDatasetSources,
        dataset: dataset
      };
    }),

    getLivedataSources: (id) => dataRequests.get(`livedata-sources/${id}`)
   
    .then(response => {
      const normalizeData = normalize(response)
      return {
        livedataSources: Object.values(normalizeData.livedataSource).map(object =>
          build(normalizeData, 'livedataSource', object.id)
        ),
        livedata: Object.values(normalizeData.livedata).map(object =>
          build(normalizeData, 'livedata', object.id)
        ),
      }
    }).then(({ livedataSources, livedata }) => {
      let newLivedataSources = livedataSources.map(source => {
        source.geojson['properties'] = source.properties;
        source.geojson['baseId'] = source.id;
        source.geojson['id'] = uuid();
        return source;
      }
     
      )
    return {
        
        livedataSources: newLivedataSources,
        livedata: livedata
      };
    }),

    getLivedataSourcesExternal: (source) => externalLivedataRequest.get(`${source}`).then((response) =>{
      return response
    }).then(response =>{
      return{ 
        livedata: response,
        livedataSources: response.features
      }
    
    }),
    
   

    

  getAnalyticsPanel: () => dataRequests.get('analysis-panel-categories')
    .then(response => {
      const normalizeData = normalize(response)
      return {
        analyticsPanelCategories: Object.values(normalizeData.analysisPanelCategory).map(object =>
          build(normalizeData, 'analysisPanelCategory', object.id)
        ),
        analyticsPanel: Object.values(normalizeData.analysisPanel).map(object =>
          build(normalizeData, 'analysisPanel', object.id)
        ),
      }
    }).then(({ analyticsPanelCategories, analyticsPanel }) => {
      let newAnalyticsPanelCategories = analyticsPanelCategories.map(category => {
        category['isParentCategory'] = (category.parentId === 0)
        category['isChecked'] = false
        category.analysisPanel.map(analysisPanel => {
          analysisPanel['isChecked'] = false;
          return analysisPanel
        })
        return category;
      })
      return {
        analyticsPanelCategories: newAnalyticsPanelCategories,
        analyticsPanel: analyticsPanel
      };
    }),
  getAnalyticsTodo: () => dataRequests.get('analysis-todo-lists')
    .then(response => {
      const normalizeData = normalize(response)
      if (!isEmpty(normalizeData)) {
        let analysisTodoList = Object.values(normalizeData.analysisTodoList).map(object =>
          build(normalizeData, 'analysisTodoList', object.id)
        )
        return analysisTodoList
      } else
        return []
    }).then((analysisTodoList) => {
      let newAnalysisTodoList = analysisTodoList.map(analysisTodo => {
        analysisTodo['isChecked'] = false
        analysisTodo['isDeleteBlocked'] = false
        analysisTodo['geojson'] = null
        return analysisTodo;
      })
      return newAnalysisTodoList
    }),
  getAnalyticsTodoGeojson: (id) => dataRequests.get(`analysis-todo-data/${id}`),
  postAnalyticsTodo: (body) => dataRequests.post('analysis-todo', body).catch(err => checkError(err)),
  deleteAnalyticsTodo: (id) => dataRequests.delete(`analysis-todo/${id}`).catch(err => checkError(err)),
  getGeoLocaltionAnalysis: (urlParams) => dataRequests.get(`geo-location-analysis?${urlParams}`).catch(err => checkError(err)),

}

// https://system.v3.pointnemo.info/api/v1/dataset-sources/2?

// const DriverStats = {
//   get: () =>
//     deliveryRequests.get('/merchantsdrivers?include=deliveries')
//     .then(response => {
//       const normalizeData = normalize(response)
//       return {
//         deliveries: Object.values(normalizeData.deliveryorganization).map(object =>
//           build(normalizeData, 'deliveryorganization', object.id)
//         ),
//         drivers: response.data.map(object =>
//           build(normalizeData, 'drivers', object.id)
//         ),
//       }
//     })
//     .then(({deliveries, drivers}) => {
//       let newDelivery = deliveries.map(delivery => {
//         delivery['isChecked'] = true
//         return delivery;
//       })
//       let newDriver = drivers.map(driver=> {
//         driver['isChecked'] = true;
//         return driver
//       })
//       return {
//         deliveries: newDelivery,
//         drivers: newDriver
//       };
//     })
//   }

const authUserRequests = {
  post: (url, body) =>
    superagent
      .post(`${config.baseApiUrl}${url}`, body)
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set("Accept", "application/json")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      }),
};


const AuthUser = {
  pnAuth: (body) =>
 fetch(`${config.baseApiUrl}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
      },
      body
    })
      .then(res => {
        return res
      })
      .catch(err => {
        throw (err);
      }),
      pnForgetPassword: (body) =>
      authUserRequests.post(`auth/forgot-password`, body),
    pnResetPassword: (body) => authUserRequests.post(`auth/reset-password`, body),
    
};

  
  


// const Trips = {
//   getAllTrips: (start, end, userId) =>
//     nodeRequests.get(`/trips?start=${start}&end=${end}&user_id=${userId}`)
//     .then(res => {
//       return res;
//     }),
//   getChartData: (slug, start, end) =>
//     nodeRequests.get(`/charts?user_id=${slug}&start=${start}&end=${end}`)
//     .then(res => {
//       return res;
//     }),
//   mostVisited: (start, end, userId) =>
//     nodeRequests.get(`/mostAreas?start=${start}&end=${end}&user_id=${userId}`)
//     .then(res => {
//       return res;
//     }),
//   nodePath: (slug, selectedDate) =>
//     nodeRequests.get(`/nodePath?userid=${slug}&date=${selectedDate}`)
//     .then(res => {
//       return res;
//     }),
//   gpsPath: (slug, selectedDate) =>
//     nodeRequests.get(`/gpsProcessedPath?userid=${slug}&date=${selectedDate}`)
//     .then(res => {
//       return res;
//     }),
//   getPath: (slug, selectedDate) =>
//     compressRequests.get(`/getPath?userid=${slug}&date=${selectedDate} `)
//     .then(res => {
//       return res;
//     }),

//   getGpsPath: (slug, selectedDate) =>
//     nodeRequests.get(`/gpsPath?id=${slug}&date=${selectedDate} `)
//     .then(res => {
//       return res;
//     }),

//   getGpsKM: (slug, start, end) =>
//     nodeRequests.get(`/gpskm?user_id=${slug}&start=${start}&end=${end} `)
//     .then(res => {
//       return res;
//     }),

//   getCompressPath: (slug, selectedDate) =>
//     // fetch(`${COMPRESS_API}/select?client=ek&id=${slug}&date=${selectedDate}&format=p``)
//     fetch(`${COMPRESS_API}/select`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "client": "ek",
//         "id": "5187",
//         "datetime": "2019-04-04",
//         "format": "p",
//         "key": "98e717a3701cf811a751d898063fdab1"
//       }
//     })
//     .then(processChunkedResponse)
//     .then(onChunkedResponseComplete)
//     .catch(onChunkedResponseError),
//   timeline: (slug,date) =>
//     nodeRequests.get(`/timeline?user_id=${slug}&start=${date}&end=${date}`)
//     .then(res => {
//       return res;
//     }),
//   getPinPoint: (lat, lng) =>
//     nodeRequests.get(`/pinpoint?lat=${lat}&lng=${lng}`)
//     .then(res => {
//       return res;
//     }),
//   getPerformace: (start, end,userId) =>
//     nodeRequests.get(`/performance?start=${start}&end=${end}&user_id=${userId}`)
//     .then(res => {
//       return res;
//     }),
//   getProcessedPath: (slug, selectedDate) =>
//     nodeRequests.get(`/getProcessedPath?userid=${slug}`)
//     .then(res => {
//       return res;
//     }),
//   getGpsTrip: (start,userId) =>
//     nodeRequests.get(`/gpstrip?start=${start}&user_id=${userId}`)
//     .then(res => {
//       return res;
//     }),
// };



// const onChunkedResponseComplete =  (result) => {
//   return JSON.parse(result)
// }

// const onChunkedResponseError = (err) => {
//   console.error(err)
// }

// const processChunkedResponse = (response) => {
//   let text = '';
//   let reader = response.body.getReader()
//   let decoder = new TextDecoder();

//   return readChunk();

//   function readChunk() {
//     return reader.read().then(appendChunks);
//   }

//   function appendChunks(result) {
//     var chunk = decoder.decode(result.value || new Uint8Array(), {stream: !result.done});
//     text += chunk;
//     if (result.done) {
//       return text;
//     } else {
//       return readChunk();
//     }
//   }
// }


// const Token = {
//   get: userId =>
//     tokenRequests.get(`/generateToken?user_id=${userId}`)
//     .then(d => {
//       return d.token
//     })
// };

// const Login = {
//   post: (data) =>
//     foodmanduRequests.postDelivery('/token',data)
//       .then(res => res)
// }

// const Dashboard = {
//   dashboard: (data) =>
//     dashboardRequests.get(`/dashboard?org=${data.org}&device=${data.device}&user=${data.user}&from=${data.start_date}&to=${data.end_date}`)
//      .then(res => res),
//   mostVisited: (data) =>
//     dashboardRequests.get(`/mvb?org=${data.org}&device=${data.device}&user=${data.user}&from=${data.start_date}&to=${data.end_date}`),
//   mostSpent: (data) =>
//     dashboardRequests.get(`/mtsb?org=${data.org}&device=${data.device}&user=${data.user}&from=${data.start_date}&to=${data.end_date}`),
//   pathData: (data) =>
//     dashboardRequests.get(`/path-data?org=${data.org}&device=${data.device}&user=${data.user}&date=${data.date}`),
//   userList: (data) =>
//     dashboardRequests.get(`/user-list?org=${data.org}&device=${data.device}&from=${data.start_date}&to=${data.end_date}`),
//   userSearchList: (data) =>
//     dashboardRequests.get(`/user-list?org=${data.org}&device=${data.device}&user=${data.user}&from=${data.start_date}&to=${data.end_date}`),
//   pathProperties: (data) =>
//     dashboardRequests.get(`/path-properties?org=${data.org}&device=${data.device}&user=${data.user}&date=${data.date}`),
//   chartData: (data) =>
//     dashboardRequests.get(`/tor-chart?org=${data.org}&device=${data.device}&user=${data.user}&from=${data.start_date}&to=${data.end_date}`),
//   tripData: (data) =>
//     dashboardRequests.get(`/trip-data?org=skrfuejheb&device=${data.device}&user=${data.user}&date=${data.date}`)
// }

// const DriverStats = {
//   get: () =>
//     deliveryRequests.get('/merchantsdrivers?include=deliveries')
//     .then(response => {
//       const normalizeData = normalize(response)
//       return {
//         deliveries: Object.values(normalizeData.deliveryorganization).map(object =>
//           build(normalizeData, 'deliveryorganization', object.id)
//         ),
//         drivers: response.data.map(object =>
//           build(normalizeData, 'drivers', object.id)
//         ),
//       }
//     })
//     .then(({deliveries, drivers}) => {
//       let newDelivery = deliveries.map(delivery => {
//         delivery['isChecked'] = true
//         return delivery;
//       })
//       let newDriver = drivers.map(driver=> {
//         driver['isChecked'] = true;
//         return driver
//       })
//       return {
//         deliveries: newDelivery,
//         drivers: newDriver
//       };
//     })
//   }

// const checkError = async (res) => {
//   if(res.errors) {
//     let token = await BestRoute.getToken();
//     window.localStorage.setItem('token', token.access_token)
//     window.location.reload()
//   }
//   return res
// }



// const BestRoute = {
//   getToken: () =>
//     bestRouteRequests.getToken(),
//   getArea: (type) =>
//     bestRouteRequests.get(`/area/${type}`)
//       .then(res => checkError(res) ),
//   createArea: (data) =>
//     bestRouteRequests.post("/custom-area", data)
//       .then(res => checkError(res)),
//   deleteArea: (id) =>
//     bestRouteRequests.delete(`/custom-area/${id}`)
//       .then(res => checkError(res)),
//   editArea: (id, data) =>
//     bestRouteRequests.put(`/custom-area/${id}`, data)
//       .then(res => checkError(res)),
//   getStation: (id,type) =>
//     bestRouteRequests.get(`/station-list?area_type=${type}&area_id=${id}`)
//       .then(res => checkError(res)),
//   getAllStation: (id,type) =>
//     bestRouteRequests.get(`/station-list`)
//       .then(res => checkError(res)),
//   getDeliveryPoint: (date, shift, warehouse) =>
//     bestRouteRequests.get(`/order-delivery?date=${date}&shift=${shift}&warehouse=${warehouse}`)
//       .then(res => checkError(res)),
//   searchDeliveryPoint: (search) =>
//     bestRouteRequests.get(`/order-delivery?keywords=${search}`)
//       .then(res => checkError(res))
//       .catch(err => err),
//   vanList: () =>
//     bestRouteRequests.get(`/van-list`)
//       .then(res => checkError(res)),
//   assignVan: (areaType, area, van, station) =>
//     bestRouteRequests.get(`/manage-area/${areaType}?area_id=${area}&van_no=${van}&station_id=${station}`),
//   routeList: (date, shift, warehouse) =>
//     bestRouteRequests.get(`/route-list?date=${date}&shift=${shift}&warehouse=${warehouse}`)
//       .then(res => checkError(res)),
//   getAllRoute: () =>
//     bestRouteRequests.get('/route')
//       .then(res => checkError(res)),
//   resetArea: (type, id) =>
//     bestRouteRequests.get(`/reset-area/${type}?id=${id}`)
//       .then(res => checkError(res)),
//   assignVanToRoute:(route_id, van_id) =>
//     bestRouteRequests.get( `/assign-van-to-route/${route_id}?vehicle_code=${van_id}`)
//       .then(res => checkError(res)),
//   moveOrderPosition:(position_id, route_id) =>
//     bestRouteRequests.get(`/move-position?position_to=${position_id}&route_id=${route_id}`)
//       .then(res => checkError(res)),
//   assignOrderToRoute:(body) =>
//     bestRouteRequests.post(`/assign-order-to-route`, body)
//     .then(res => checkError(res)),
//   removeOrderFromRoute: (body) =>
//     bestRouteRequests.post('/remove-order-from-route', body)
//     .then(res => checkError(res)),
//   startAnalysis: (type, id) =>
//     bestRouteRequests.get(`/route-analysis?id=${id}&areatype=${type}`)
//       .then(res=> checkError(res))
//       .catch(err => err),
//   reAnalysis: () =>
//     bestRouteRequests.get(`/route-re-analysis`)
//       .then(res => checkError(res))
//       .catch(err => err),
//   syncData: () =>
//     bestRouteRequests.get(`/sync-data`)
//       .then(res=> checkError(res))
//       .catch(err=>err),
//   routeReset: () =>
//     bestRouteRequests.get('/reset-route ')
//       .then(res=> checkError(res))
//       .catch(err=>err),
//   routeHistory: (date) =>
//     bestRouteRequests.get(`/route-list-history?date=${date}`)
//       .then(res=> checkError(res))
//       .catch(err=>err),
//   vanHistory: (date) =>
//     bestRouteRequests.get(`/van-list-history?date=${date}`)
//     .then(res=> checkError(res))
//     .catch(err=>err),
//   resetConfirmRoute: (id)=>
//     bestRouteRequests.get(`/reset-confirm-route/${id}`)
//       .then(res=> checkError(res))
//       .catch(err=>err),
//   assignVehicleToOrder: (body) =>
//     bestRouteRequests.post('/assign-vehicle',body)
//       .then(res=>checkError(res))
//       .catch(err=>err),
// }


export default { AuthUser, pnData };
