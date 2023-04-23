import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import styled from "styled-components/native";
import { Fontisto } from '@expo/vector-icons';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js'
import { translations } from './localisation';


export default function App() {
  // const [location, setLocation] = useState([]);
  const daily = dailyWeatherMock;
  const i18n = new I18n(translations)
  i18n.locale = Localization.locale
  i18n.enableFallback = true
  i18n.defaultLocale = "en";
  let [locale, setLocale] = useState(Localization.locale);

  return (
    <>
      <Container>
        <TopContainer>
          <Label>{locale}</Label>
          <Greeting>{i18n.t('greeting')}</Greeting>
        </TopContainer>
        <StatusBar style="dark" />
        <WeatherContainer >
          <Fontisto
            name={weatherIcons[daily?.main] ? weatherIcons[daily?.main] : "cloudy-gusts"}
            size={150}
            color="white"
          />
          <WeatherMain>{daily?.main}</WeatherMain>
          <WeatherDesc>{daily?.description}</WeatherDesc>
          <Temp>{Math.ceil(daily?.current)}°</Temp>
        </WeatherContainer>
        <BottomLabel>{i18n.t('subscribe')}</BottomLabel>
      </Container>
    </>
  );
}
const backgrounds = ["#00b894", "#00cec9", "#e17055", "#2d3436"];
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


const greeting = {
  text: "hello",
  temp: 2
};



const dailyWeatherMock = {
  lat: 51.5074,
  lon: -0.1278,
  timezone: "Europe/London",
  main: "Clouds",
  description: "broken clouds",
  icon: "04n",
  max: 9.2,
  min: 3.3,
  current: 6,
  dt: 1649159040,
  unit: "metric"
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
  align-items: center;
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

const Label = styled(Text)`
  font-size: 23px;
  color: white;
  margin-top: 10px;
`;

const City = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  color: white;
  margin-top: 7px;
`;

const Greeting = styled(Text)`
  font-size: 30px;
  font-weight: bold;
  color: white;
  fontWeight: bold;
  fontStyle: italic;
`;

const BottomLabel = styled(Text)`
margin-top: 20px;
  font-size: 18px;
  color: white;
  flex: 1;
  align-items: center;
  justify-content: center;

 

`;

const WeatherMain = styled(Text)`
  font-size: 50px;
  color: white;
  margin-top: 10px;
  margin-bottom: 2px;
`;

const WeatherDesc = styled(Text)`
  font-size: 20px;
  color: white;
`;
const Temp = styled(Text)`
  font-size: 75px;
  color: white;
  margin-top: 20px;
`;


