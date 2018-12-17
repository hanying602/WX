Page({
  data: {
    temperature: 8,
    location: "Bejing",
    weather: "Snow",
    predictArray: [{
      weekDay: "Sunday",
      temperature: 4,
      weather: "Sunny",
    }, {
      weekDay: "Monday",
      temperature: 7,
      weather: "Chilly",
    }, {
      weekDay: "Tuesday",
      temperature: 7,
      weather: "Chilly",
    }, {
      weekDay: "Wednesday",
      temperature: 3,
      weather: "Rain",
    }, {
      weekDay: "Thursday",
      temperature: 6,
      weather: "Sunny",
    }
    // , {
    //   weekDay: "Friday",
    //   temperature: 2,
    //   weather: "Sunny",
    // }, {
    //   weekDay: "Saturday",
    //   temperature: 5,
    //   weather: "Cloudy",
    // }
    ],
  },
  
  onLoad: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.request({
          url: 'https://api.darksky.net/forecast/b71ca68cca4c59a4e1197efd72c98656/'+latitude+','+longitude,
          data: {},
          method: 'GET',
          success: function (res) {
            var predictDatas = res.data.daily.data;
            for (var i = 0; i < 5; i++) {
              predictDatas[i].time = timeConverter(predictDatas[i].time)
              predictDatas[i].temperatureHigh = Math.round((predictDatas[i].temperatureHigh-32)*5/9)
            }
            that.setData({
              temperature: Math.round((res.data.currently.temperature - 32) * 5 / 9),
              location: (res.data.timezone).split("/")[1],
              weather: res.data.currently.summary,
              predictArray: predictDatas.slice(0,5),
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
      }
    })
  }
  
})
function timeConverter(UNIX_timestamp) {
  var i = 0;
  var data = { list: [{ dt: UNIX_timestamp }] };
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var dayNum = new Date(data.list[i].dt * 1000).getDay();
  var result = days[dayNum];
  return result;
}
