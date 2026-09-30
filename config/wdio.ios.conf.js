process.env.TEST_PLATFORM = 'iOS';
process.env.APPIUM_AUTOMATION_NAME = 'XCUITest';

const { config } = require('./wdio.shared.conf');

exports.config = {
  ...config,
  capabilities: [
    {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:app': process.env.BROWSERSTACK_IOS_APP,
      'appium:deviceName': 'iPhone 15',
      'appium:platformVersion': '17',
      ...config.commonCapabilities
    }
  ]
};

