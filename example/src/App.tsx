/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import { Colors, Header } from 'react-native/Libraries/NewAppScreen';

import Module, {
  ModuleEventEmitter,
  Gr4vyTransactionResult,
  Gr4vyPaymentMethod,
} from 'react-native-module';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPaymentMethodSelected = (paymentMethod: Gr4vyPaymentMethod) => {
    console.log('onPaymentMethodSelected', paymentMethod);
  };

  const startPayment = () => {
    const gr4vyId = 'dev';
    const env = 'sandbox';
    const token =
      'eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IlRvS2k5VEc1X21QV2VqUVh2ZE9rUzFud2p6dkdTSU9yVEFvb2p6bzY5R28ifQ.eyJzY29wZXMiOlsiZW1iZWQiXSwiZW1iZWQiOnsiYW1vdW50IjoxMjk5LCJjdXJyZW5jeSI6IkdCUCIsImJ1eWVyX2lkIjoiYmFhN2IzYjMtYTRmMS00OWUzLWFmYjAtMGY0MWI0OGY1YWEyIiwiZGVidWciOnRydWUsImFwaV9ob3N0IjoiYXBpLnNhbmRib3guZGV2LmdyNHZ5LmFwcCIsImFwaV91cmwiOiJodHRwczovL2FwaS5zYW5kYm94LmRldi5ncjR2eS5hcHAiLCJsb2NhbGUiOiJlbiIsImludGVudCI6ImNhcHR1cmUiLCJjb3VudHJ5IjoiR0IiLCJzdG9yZSI6ImFzayIsInN1cHBvcnRlZF9hcHBsZV9wYXlfdmVyc2lvbiI6MSwic3VwcG9ydGVkX2dvb2dsZV9wYXlfdmVyc2lvbiI6MSwiYXBwbGVfcGF5X3ZlcnNpb24iOjEsInNob3dfZGVsZXRlX2J1dHRvbiI6dHJ1ZSwicmVxdWlyZV9zZWN1cml0eV9jb2RlIjp0cnVlfSwiaWF0IjoxNjc5NDkxNzk4LCJuYmYiOjE2Nzk0OTE3OTgsImV4cCI6MTY3OTQ5NTM5OCwiaXNzIjoiR3I0dnkgU0RLIDAuMzUuMCAtIE5vZGUgdjE2LjE3LjAiLCJqdGkiOiJiOWZlNDZiNi0wNTZlLTQ5YmQtODQxZS1jNjZmMWQ3YWZlZDgifQ.ABE-xhFLQNsBd7rqUDdyexuBsfj2Ck1z66djjkW-axzijZHrHiWeT-4igP1qhNLL41GM644mE8_cW0kVM-Y41TEPARjSyAzizYxbbPJo5p35jwE-SBV0zkR_OmY57K3TAIj8TGjWxSaQpp2mu8qXjiQZlfCPrZZGVypiXfTc7HTlcm1z';
    const amount = 1000;
    const currency = 'USD';
    const country = 'US';

    const onPaymentMethodSelectedSubscription = ModuleEventEmitter.addListener(
      'onPaymentMethodSelected',
      onPaymentMethodSelected
    );

    Module.showPaymentSheet(
      gr4vyId,
      token,
      amount,
      currency,
      country,
      null,
      env,
      (error: string) => {
        console.error(error);
        onPaymentMethodSelectedSubscription.remove();
      },
      (transactionResult: Gr4vyTransactionResult) => {
        console.log(transactionResult);
        onPaymentMethodSelectedSubscription.remove();
      }
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <Header />
        <View
          style={{
            padding: 10,
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <Button title="Start Payment" onPress={startPayment} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
