import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Button, I18nManager } from 'react-native';
import styled from "styled-components/native";
import { Fontisto } from '@expo/vector-icons';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js'
import { translations } from './localisation';
import 'intl-pluralrules'
import { useMakePlural } from "i18n-js"
import { pl } from "make-plural"
import { ru } from "make-plural"

export default function App() {


  // let [locale, setLocale] = useState(Localization.locale)
  let [locale, setLocale] = useState('ru');
  let [isDarkModeEnabled, setIsDarkModelEnabled] = useState(false);
  const daily = dailyWeatherMock;
  const i18n = new I18n(translations)
  i18n.locale = locale
  i18n.enableFallback = true
  i18n.defaultLocale = "en";



  const localProperties = Localization.getLocales()[0]
  const measurementSystem = localProperties.measurementSystem
  // var currentTemperature;
  // if (measurementSystem === `metric`) {
  //   currentTemperature = i18n.t("current_temp_in_celsius", { degree: daily.currentInCelsius })
  // } else {
  //   currentTemperature = i18n.t("current_temp_in_fahrenheit", { degree: daily.currentInFahrenheit })
  // }
  let currentTemperature = measurementSystem === "metric"
    ? i18n.t("current_temp_in_celsius", { degree: daily.currentInCelsius })
    : i18n.t("current_temp_in_fahrenheit", { degree: daily.currentInFahrenheit })
  const currencyCode = localProperties.currencyCode
  // const ret = i18n.pluralization.register("pl", new Intl.PluralRules('pl-PL').select(0));
  // i18n.pluralization.register('pl', useMakePlural({ pluralizer: pl }));

  // i18n.pluralization.register("ru", (_i18n, count) => {
  //   const mod10 = count % 10;
  //   const mod100 = count % 100;
  //   let key;

  //   const one = mod10 === 1 && mod100 !== 11;
  //   const few = [2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100);
  //   const many =
  //     mod10 === 0 ||
  //     [5, 6, 7, 8, 9].includes(mod10) ||
  //     [11, 12, 13, 14].includes(mod100);

  //   if (one) {
  //     key = "one";
  //   } else if (few) {
  //     key = "few";
  //   } else if (many) {
  //     key = "many";
  //   } else {
  //     key = "other";
  //   }

  //   return [key];
  // });
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



  // const plural = new Intl.PluralRules('pl-PL').select(0)
  // console.log(new Intl.PluralRules('pl-PL').select(0))
  // console.log(new Intl.PluralRules('pl-PL').select(1))
  // console.log(new Intl.PluralRules('pl-PL').select(2))
  // console.log(new Intl.PluralRules('pl-PL').select(3))
  // console.log(new Intl.PluralRules('pl-PL').select(4))
  // console.log(new Intl.PluralRules('pl-PL').select(5))
  // console.log(new Intl.PluralRules('pl-PL').select(6))

  const localizedPrice = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode }).format(daily?.price)
  // console.log(new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode }).format(number));

  // let isRTL = localProperties.textDirection === 'rtl'
  // const rtlView = isRTL && { flexDirection: 'row-reverse' };

  return (
    <>
      {/* <View style={styles.container}>
        <Text style={styles.paragraph}>{I18nManager.isRTL ? ' RTL' : ' LTR'}</Text>
      </View> */}

      <Container bgColor={((isDarkModeEnabled) ? '#0A0708' : '#00cec9')}>

        {/* <View style={[{ flexDirection: 'column', marginTop: 30, marginStart: 10 }]}>
          <Text style={{ color: 'white', marginStart: 10 }}>
            {((isDarkModeEnabled) ? i18n.t('dark_mode') : i18n.t('light_mode'))}
          </Text>
        </View>
        <Text style={{ color: 'white', marginStart: 10 }}>
          {((isDarkModeEnabled) ? i18n.t('dark_mode') : i18n.t('light_mode'))}
        </Text> */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 2,
    padding: 8,
  },

  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
    backgroundColor: 'pink',
  },
});


