import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.onewrapp.login',
  appName: 'OneWrapp Login',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    "SplashScreen": {
      "launchShowDuration": 0
    },
    "GoogleAuth":{
      "scopes":["profile","email"],
      "serverClientId": "417588692467-atg80dle31vfjdrfci9lnf775rdefnvg.apps.googleusercontent.com",
      "clientId": "417588692467-aslmsvepgc5kc7vgnogqt5dut77qrtqm.apps.googleusercontent.com",
      "forceCodeForRefreshToken": true
    }

  }
};

export default config;
