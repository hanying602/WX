Page({
  data: {
  },
  
  onLoad: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var locationStr = latitude + ',' + longitude
        wx.request({
          url: 'https://api.darksky.net/forecast/b71ca68cca4c59a4e1197efd72c98656/' + locationStr +'?&lang=zh-tw',
          data: {},
          method: 'GET',
          success: function (res) {
            var predictDatas = res.data.daily.data;
            for (var i = 0; i < predictDatas.length; i++) {
              predictDatas[i].time = timeConverter(predictDatas[i].time)
              predictDatas[i].temperatureHigh = Math.round((predictDatas[i].temperatureHigh - 32) * 5 / 9)
              predictDatas[i].temperatureLow = Math.round((predictDatas[i].temperatureLow - 32) * 5 / 9)
              predictDatas[i].summary = (predictDatas[i].summary).split("。")[0]
            }
            that.setData({
              temperature: Math.round((res.data.currently.temperature - 32) * 5 / 9),
              weather: res.data.currently.summary,
              predictArray: predictDatas,
            })
          },
          fail: function (res) {
            console.log('submit fail');
          },
          complete: function (res) {
            console.log('submit complete');
            console.log(res.data)
          }
        })
      wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?l&get_poi=1',
          data: {
            "key": "WO5BZ-ANDWX-WV54Q-Z27A2-SQL2Z-RDBNX",
            "location": locationStr
          },
          method: 'GET',
           
          success: function (res) {
            that.setData({
              location: res.data.result.address_component.city + res.data.result.address_component.district,
            })
          },
          fail: function () {
            console.log('submit fail');
          },
          complete: function (res) {
            console.log('submit complete');
            console.log(res.data)
          }
        })
              
      }
    })
  }

  
  
})
function timeConverter(UNIX_timestamp) {
  var i = 0;
  var data = { list: [{ dt: UNIX_timestamp }] };
  var days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  var dayNum = new Date(data.list[i].dt * 1000).getDay();
  var result = days[dayNum];
  return result;
}

