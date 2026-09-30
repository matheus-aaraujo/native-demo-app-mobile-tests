process.env.TEST_PLATFORM = 'Android';
process.env.APPIUM_AUTOMATION_NAME = 'UiAutomator2';

const { config } = require('./wdio.shared.conf');

exports.config = {
  ...config,
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:app': process.env.BROWSERSTACK_ANDROID_APP,
      'appium:deviceName': 'Google Pixel 8',
      'appium:platformVersion': '14.0',
      ...config.commonCapabilities
    }
  ]
};

