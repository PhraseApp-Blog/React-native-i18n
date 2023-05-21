import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Button, I18nManager } from 'react-native';
import styled from "styled-components/native";
import { Fontisto } from '@expo/vector-icons';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js'
import { translations } from './localisation';
import { useMakePlural } from "i18n-js"
import { ru } from "make-plural"

export default function App() {


  let [locale, setLocale] = useState(Localization.locale)
  // let [locale, setLocale] = useState('ru');
  const daily = dailyWeatherMock;
  const i18n = new I18n(translations)
  i18n.locale = locale
  i18n.enableFallback = true
  i18n.defaultLocale = "en";

  const localProperties = Localization.getLocales()[0]
  const measurementSystem = localProperties.measurementSystem

  let currentTemperature = measurementSystem === "metric"
    ? i18n.t("current_temp_in_celsius", { degree: daily.currentInCelsius })
    : i18n.t("current_temp_in_fahrenheit", { degree: daily.currentInFahrenheit })
  const currencyCode = localProperties.currencyCode

  i18n.pluralization.register("ru", useMakePlural({ pluralizer: ru }));

  const today = new Date()
  const formattedDate = new Intl.DateTimeFormat(locale).format(today)

  console.log(i18n.t('steps', { count: 0 }))
  console.log(i18n.t('steps', { count: 1 }))
  console.log(i18n.t('steps', { count: 2 }))
  console.log(i18n.t('steps', { count: 3 }))
  console.log(i18n.t('steps', { count: 4 }))
  console.log(i18n.t('steps', { count: 5 }))
  console.log(i18n.t('steps', { count: 6 }))
  console.log(i18n.t('steps', { count: 7 }))

  const localizedPrice = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode }).format(daily?.price)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.paragraph}>
          <Text style={styles.title}>{i18n.t('app_title')}</Text>
        </View>
      </View>

      <Container bgColor={'#00cec9'}>
        <TopContainer>
          <Label>{locale}</Label>
          <DateFormatted>{formattedDate}</DateFormatted>
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
          <Temp>{currentTemperature}</Temp>
          <MaximumTemp>{i18n.t("temperature", { count: daily.maxInCelsius })}</MaximumTemp>
          <WeatherDesc>{i18n.t(daily?.description)}</WeatherDesc>
        </WeatherContainer>
        <BottomLabel>{i18n.t('subscribe', { price: localizedPrice })}</BottomLabel>
        {/* <Footer>
          <Button onPress={() => setLocale("en")} title="English" color="#841584" />
          <BlankSpacer width={50} />
          <Button onPress={() => setLocale("de")} title="German" color="#841584" />
        </Footer> */}
      </Container>
    </>
  )
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


const dailyWeatherMock = {
  main: "clouds",
  description: "broken_clouds",
  icon: "04n",
  maxInCelsius: 8,
  maxInFahrenheit: 9.2,
  currentInCelsius: 20,
  currentInFahrenheit: 68,
  price: 18.99,
}

const Container = styled(View)`
  flex: 1;
  // align-items: center;
  background-color: ${props => props.bgColor};
`;

const TopContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const WeatherContainer = styled(View)`
  justify-content: center;
  align-items: center;
  width: ${width}px;
  margin-top: 40px;
`;
const Footer = styled(View)`
  justify-content: center;
  align-items: center;
  width: ${width}px;
  margin-top: 2px;
  margin-bottom: 10px;
  flex-direction: row;
`;


const Label = styled(Text)`
  font-size: 23px;
  color: white;
  margin-top: 2px;
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
  text-align: center;
`;

const WeatherMain = styled(Text)`
  font-size: 50px;
  color: white;
  margin-top: 2px;
  margin-bottom: 2px;
`;
const DateFormatted = styled(Text)`
  font-size: 30px;
  color: white;
  margin-top: 5px;
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: 2,
//     padding: 8,
//   },

//   paragraph: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'left',
//     width: '100%',
//     backgroundColor: 'pink',
//   },
// });


const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    padding: 0,
    backgroundColor: 'pink',
  },
  paragraph: {
    fontSize: 35,
    paddingVertical: 5,
    marginLeft: 50,
    height: 40,
    width: '100%',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  }
})