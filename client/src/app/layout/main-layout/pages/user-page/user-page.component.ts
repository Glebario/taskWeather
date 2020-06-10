import { Component, OnInit } from '@angular/core';
import {dayWeather} from "../../interface/main-interface";
import {LocalStorageServices} from "../../../../shared/services/localStorage.services";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  WeatherData:any;
  namePlaceCity: string
  errorMessage: string
  WeatherDays: dayWeather[] = [];
  constructor(
      public localStorageServices: LocalStorageServices
  ) { }

  ngOnInit() {
    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.getWeatherData();
    //console.log(this.WeatherData);
  }

  getWeatherData(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.localStorageServices.userData.profile.city.split(' ')[0]}&appid=dee517afcfd96a01e3dec19e0afd6b48`)
        .then( response => response.json())
        .then( data => {
          if (data.cod == 404) {
            this.errorMessage = 'City not found'
          }
          else {
            this.namePlaceCity = data.name
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&appid=dee517afcfd96a01e3dec19e0afd6b48`)
                .then( response => response.json())
                .then( data => {
                  data.daily.map( day => {
                    this.setWeatherData(day)
                  })
                })
          }
        })
        //.then(data=>{this.setWeatherData(data)})
  }

  setWeatherData(data){
    this.WeatherData = data
    let sunsetTime = new Date(this.WeatherData.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.temp.day - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.temp.min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.temp.max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.feels_like.day - 273.15).toFixed(0);
    this.WeatherData.date = new Date()
    this.WeatherData.date.setDate(this.WeatherData.date.getDate() + this.WeatherDays.length)
    this.WeatherData.name = this.namePlaceCity
    this.WeatherDays.push(this.WeatherData)
  }

}
