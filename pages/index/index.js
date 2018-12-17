Page({
  data: {
    temperature: -8,
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
    this.setData({

    })
  }
})
