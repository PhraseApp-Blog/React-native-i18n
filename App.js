import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import styled from "styled-components/native";
import { Fontisto } from '@expo/vector-icons';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js'
import { translations } from './localisation';


export default function App() {
  let [locale, setLocale] = useState(Localization.locale);
  const daily = dailyWeatherMock;
  const i18n = new I18n(translations)
  i18n.locale = locale
  i18n.enableFallback = true
  i18n.defaultLocale = "en";
  const dailyPrice = daily.price.toLocaleString(locale)

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
          <WeatherMain>{i18n.t(daily?.main)}</WeatherMain>
          <WeatherDesc>{i18n.t(daily?.description)}</WeatherDesc>
          <Temp>6°</Temp>
          <MaximumTemp>{i18n.t("temperature", {count: daily.maxInCelsius})}</MaximumTemp>
          <WeatherDesc>{i18n.t(daily?.description)}</WeatherDesc>
        </WeatherContainer>
        <BottomLabel>{i18n.t('subscribe', {price : dailyPrice})}</BottomLabel>

      </Container>
    </>
  );
}
const backgrounds = ["#00cec9",];
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
  main: "clouds",
  description: "broken_clouds",
  icon: "04n",
  maxInCelsius: 1,
  maxInFahrenheit: 9.2,
  currentInCelsius: 6,
  currentInFahrenheit: 6,
  price: 123565,
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
  font-size: 16px;
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
const MaximumTemp = styled(Text)`
  font-size: 18px;
  color: white;
`;


