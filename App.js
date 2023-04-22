import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import styled from "styled-components/native";
import { Fontisto } from '@expo/vector-icons';

const backgrounds = ["#00b894", "#00cec9", "#0984e3", "#e17055", "#2d3436"];
const { width, height } = Dimensions.get("window");
const weatherIcons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};




export default function App() {
  // const [daily, setDaily] = useState([]);
  const daily = weatherData[0];
  // const json = JSON.parse(newS)
  // console.log(newS)
  // setDaily(newS.daily)
  // setDaily(wd[0])

  return (
    // <View style={styles.container}>
    <>
      <Container>
        <TopContainer>
          <Greeting>{"Hello"}</Greeting>
          <Region>{"Region"}</Region>
          <City>
            {"City"}
          </City>
        </TopContainer>
        {/* {daily?.length > 0 &&
          daily?.map((daily, index) => ( */}
            <WeatherContainer >
              <Fontisto
                name={weatherIcons[daily?.weather[0].main] ? weatherIcons[daily?.weather[0].main] : "cloudy-gusts"}
                size={150}
                color="white"
              />
              <Dates>{new Date(daily?.dt * 1000).toString().substring(0, 10)}</Dates>
              <WeatherMain>{daily?.weather[0].main}</WeatherMain>
              <WeatherDesc>{daily?.weather[0].description}</WeatherDesc>
              <Temp>{Math.ceil(daily?.temp.max)}°</Temp>
            </WeatherContainer>
          {/* )
          )
        } */}
        <Text style={{ fontSize: 27 }}>Hsello</Text>

      </Container>
      <StatusBar style="dark" />
      {/* </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Container = styled(View)`
  flex: 1;
  background-color: ${backgrounds[Math.floor(Math.random() * backgrounds.length)]};
`;

const TopContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Region = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  color: white;
`;
const BottomContainer = styled(ScrollView)`
  flex: 3;
`;

const WeatherContainer = styled(View)`
  justify-content: center;
  align-items: center;
  width: ${width}px;
`;

const Dates = styled(Text)`
  font-size: 30px;
  color: white;
  margin-top: 20px;
`;



const City = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  color: white;
  margin-top: 7px;
`;

const Greeting = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  color: white;
`;

const WeatherMain = styled(Text)`
  font-size: 50px;
  color: white;
  margin-top: 10px;
  margin-bottom: 2px;
`;

const WeatherDesc = styled(Text)`
  font-size: 30px;
  color: white;
`;
const Temp = styled(Text)`
  font-size: 75px;
  color: white;
  margin-top: 20px;
`;

const weatherData = {
  lat: 51.5074,
  lon: -0.1278,
  timezone: "Europe/London",
  timezone_offset: 0,
  current: {
    dt: 1649159040,
    sunrise: 1649124449,
    sunset: 1649173486,
    temp: 7.23,
    feels_like: 2.78,
    pressure: 1022,
    humidity: 81,
    dew_point: 4.03,
    uvi: 0,
    clouds: 75,
    visibility: 10000,
    wind_speed: 3.09,
    wind_deg: 240,
    wind_gust: 5.14,
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04n"
      }
    ]
  },
  hourly: [
    {
      dt: 1649156400,
      temp: 7.23,
      feels_like: 2.78,
      pressure: 1022,
      humidity: 81,
      dew_point: 4.03,
      uvi: 0,
      clouds: 75,
      visibility: 10000,
      wind_speed: 3.09,
      wind_deg: 240,
      wind_gust: 5.14,
      weather: [
        {
          id: 803,
          main: "Clouds",
          description: "broken clouds",
          icon: "04n"
        }
      ],
      pop: 0
    },
    // more hourly data here
  ],
  daily: [
    {
      dt: 1649134800,
      sunrise: 1649124449,
      sunset: 1649173486,
      moonrise: 1649109660,
      moonset: 1649145960,
      moon_phase: 0.01,
      temp: {
        day: 7.6,
        min: 3.3,
        max: 9.2,
        night: 5.5,
        eve: 7.6,
        morn: 3.3
      },
      feels_like: {
        day: 3.73,
        night: 0.41,
        eve: 3.73,
        morn: 0.41
      },
      pressure: 1021,
      humidity: 72,
      dew_point: 2.12,
      wind_speed: 4.15,
      wind_deg: 255,
      wind_gust: 6.44,
      weather: [
        {
          id: 803,
          main: "Clouds",
          description: "broken clouds",
          icon: "04d"
        }
      ],
      clouds: 75,
      pop: 0,
      uvi: 0.33
    },
    // more daily data here
  ],
  alerts: [
    {
      sender_name: "Met Office",
      event: "Wind",
      start: 1649164800,
      end: 1649175600,
      description: "Wind gusts up to 45 mph expected"
    },
    // more alert data here
  ]
}
