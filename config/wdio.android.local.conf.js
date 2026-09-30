require('dotenv').config({ quiet: true });

const path = require('node:path');
const allureReporter = require('@wdio/allure-reporter').default;

const projectRoot = path.resolve(__dirname, '..');

exports.config = {
  hostname: process.env.APPIUM_HOST || '127.0.0.1',
  port: Number(process.env.APPIUM_PORT || 4723),
  path: process.env.APPIUM_PATH || '/',

  specs: [path.join(projectRoot, 'test', 'specs', '**', '*.spec.js')],
  exclude: [],
  maxInstances: 1,

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,

  framework: 'mocha',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        reportedEnvironmentVars: {
          Platform: 'Android',
          Execution: 'Local emulator',
          Device: process.env.ANDROID_DEVICE_NAME || 'emulator-5554',
          'App Package': process.env.ANDROID_APP_PACKAGE || 'com.wdiodemoapp',
          'Automation Driver': 'UiAutomator2'
        }
      }
    ]
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },

  async beforeTest() {
    await browser.terminateApp(process.env.ANDROID_APP_PACKAGE || 'com.wdiodemoapp');
    await browser.activateApp(process.env.ANDROID_APP_PACKAGE || 'com.wdiodemoapp');
  },

  async afterTest(_test, _context, { error }) {
    if (error) {
      const screenshot = await browser.takeScreenshot();
      allureReporter.addAttachment('Failure screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
    }
  },

  capabilities: [
    {
      maxInstances: 1,
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'emulator-5554',
      'appium:appPackage': process.env.ANDROID_APP_PACKAGE || 'com.wdiodemoapp',
      'appium:appActivity': process.env.ANDROID_APP_ACTIVITY || 'com.wdiodemoapp.MainActivity',
      'appium:noReset': true,
      'appium:forceAppLaunch': true,
      'appium:appWaitActivity': process.env.ANDROID_APP_ACTIVITY || 'com.wdiodemoapp.MainActivity',
      'appium:appWaitDuration': 20000,
      'appium:disableWindowAnimation': true,
      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 120
    }
  ]
};

