class Helper {
  static titleFormatter = (params/*, hash*/) => {
    let str = params.replace(/_/g, " ");
    str = str.replace(/-/g, " ");
    return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
  }

  static camelCaseToTitleCase = (str) => {
    const titleCased = str.replace(/([A-Z])/g, ' $1');
    return titleCased.charAt(0).toUpperCase() + titleCased.slice(1);
  }

  static numberFormatter = (number) => {
    if (parseInt(number) >= 1000000000) {
      return (parseInt(number) / 1000000000).toFixed(1).replace(/\.0$/, '') + "G";
    }
    if (parseInt(number) >= 1000000) {
      return (parseInt(number) / 1000000).toFixed(1).replace(/\.0$/, '') + "M";
    }
    if (parseInt(number) >= 1000) {
      return (parseInt(number) / 1000).toFixed(1).replace(/\.0$/, '') + "K";
    }
    return parseInt(number).toFixed(1).replace(/\.0$/, '');
  }

  static checkGeodataIsAvail = (params) =>{
    let geomdata = params.filter(el=> {
      if (el.geojson !== null) return el;
    })
    return (geomdata.length > 0);
  }

  static getTotalCount = (dataList) => {
    let totalData = dataList.find(data => data.type === "Total")
    return (totalData !== undefined) ? totalData.count : 0
  }

  static checkTotalZero = (params) => {
    if (params.type === 'count') {
      let test = params.dataList.map(function (d) {
        return d.count;
      });
      if (test.reduce((a, b) => a + b, 0) === 0)
        return false;
      else return true;
    } else {
      return true;
    }
  }
}

export default Helper;