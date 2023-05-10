import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions, Button, I18nManager, Switch } from 'react-native';
import styled from "styled-components/native";
import { Fontisto } from '@expo/vector-icons';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js'
import { translations } from './localisation';
import BlankSpacer from "react-native-blank-spacer";

export default function App() {


  let [locale, setLocale] = useState(Localization.locale);
  let [isDarkModeEnabled, setIsDarkModelEnabled] = useState(true);

  I18nManager.allowRTL(true)
  // I18nManager.forceRTL(true);
  const daily = dailyWeatherMock;
  const i18n = new I18n(translations)
  i18n.locale = locale
  i18n.enableFallback = true
  i18n.defaultLocale = "en";

  const dailyPrice = daily.price.toLocaleString(locale)
  let localProperties = Localization.getLocales()[0]
  let measurementSystem = localProperties.measurementSystem
  var currentTemperature;
  if (measurementSystem === `metric`) {
    currentTemperature = i18n.t("current_temp_in_celsius", { degree: daily.currentInCelsius })
  } else {
    currentTemperature = i18n.t("current_temp_in_fahrenheit", { degree: daily.currentInFahrenheit })
  }
  let currencySymbol = localProperties.currencySymbol

  const today = new Date()
  const formattedDate = today.toLocaleDateString(locale,)


  let isRTL = localProperties.textDirection === 'rtl'
  console.log(isRTL)
  if (isRTL) {
    I18nManager.allowRTL(true)
    // I18nManager.forceRTL(true);
    I18nManager.forceRTL(true);
    // RNRestart.Restart();

  }
  const rtlText = isRTL && { textAlign: 'right', writingDirection: 'rtl' };
  const rtlView = isRTL && { flexDirection: 'row-reverse' };

  return (
    <>

      <Container bgColor={((isDarkModeEnabled) ? '#0A0708' : '#00cec9')}>
        <View style={[{ flexDirection: 'row', }, rtlView]}>
          <View style={[{ flexDirection: 'column', }]}>
            <Text style={{
              width: '100%',
              color: 'white'
            }}>
              {((isDarkModeEnabled) ? i18n.t('dark_mode') : i18n.t('light_mode'))}
            </Text>

            <Switch value={isDarkModeEnabled}
              onValueChange={(value) => setIsDarkModelEnabled(value)}
              style={[{ flexDirection: 'row', marginBottom: 40, alignSelf: 'flex-start' }]}
            >

            </Switch>
            {/* <View style={{ height: 40, width: 40, backgroundColor: '#db4437' }} />
            <View style={{ height: 40, width: 40, backgroundColor: '#0f9d58' }} />
            <View style={{ height: 40, width: 40, backgroundColor: '#4285f4' }} />
          </View>
          <View style={{ height: 40, width: 40, backgroundColor: '#db4437' }} />
          <View style={{ height: 40, width: 40, backgroundColor: '#0f9d58' }} />
          <View style={{ height: 40, width: 40, backgroundColor: '#4285f4' }} />
          <Switch value={isDarkModeEnabled}
            onValueChange={(value) => setIsDarkModelEnabled(value)}
            style={[{ flexDirection: 'row', marginBottom: 40, alignSelf: 'flex-start' }]}
          >

          </Switch> */}
          </View>
        </View>
        {/* <AppHeader>
          <Text style={{
            width: '100%',
            color: 'white'
          }}>
            {((isDarkModeEnabled) ? i18n.t('dark_mode') : i18n.t('light_mode'))}
          </Text>
        </AppHeader> */}
        {/* <ThemeContainer>

          <Label>
            {((isDarkModeEnabled) ? i18n.t('dark_mode') : i18n.t('light_mode'))}
          </Label>
          <Switch value={isDarkModeEnabled}
            onValueChange={(value) => setIsDarkModelEnabled(value)}
            style={{
              marginTop: 2,
              alignSelf: 'flex-end',
            }}
          >
          </Switch>
        </ThemeContainer> */}

        {/* <Switch value={isDarkModeEnabled}
          onValueChange={(value) => setIsDarkModelEnabled(value)}
          style={[{ flexDirection: 'row', marginBottom: 40, alignSelf: 'flex-start' }, rtlView]}
        >

        </Switch> */}
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
        <BottomLabel>{i18n.t('subscribe', { price: currencySymbol + dailyPrice })}</BottomLabel>
        <Footer>
          <Button onPress={() => setLocale("en")} title="English" color="#841584" />
          <BlankSpacer width={50} />
          <Button onPress={() => setLocale("de")} title="German" color="#841584" />
        </Footer>
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
  price: 123565,
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const Container = styled(View)`
  flex: 1;
  // align-items: center;
  background-color: ${props => props.bgColor};
`;

const AppHeader = styled(View)`
  flex: 1;
  width: 100%;
  margin-top: 40px;
  flex-direction: row-reverse;
  background-color: blue;
  align-items: center;

`;

const TopContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  // margin-top: 40px;
`;
// const BackContainer = styled(View)`
//   flex: 1;
//   align-items: left;
// `;

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
  margin-top: 40px;
`;
const Footer = styled(View)`
  justify-content: center;
  align-items: center;
  width: ${width}px;
  margin-top: 40px;
  flex-direction: row;
`;

const ModeLabel = styled(Text)`
  font-size: 20px;
  color: white;
  margin-top: 30px;
  align-items: flex-start;
`;

const Label = styled(Text)`
  font-size: 23px;
  color: white;
  margin-top: 2px;
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
  margin-top: 2px;
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


