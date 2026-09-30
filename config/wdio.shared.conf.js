require('dotenv').config({ quiet: true });

const path = require('node:path');
const allureReporter = require('@wdio/allure-reporter').default;

const buildName = process.env.BROWSERSTACK_BUILD_NAME || `native-demo-app-${new Date().toISOString()}`;
const projectRoot = path.resolve(__dirname, '..');

const config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  hostname: 'hub.browserstack.com',

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
          Platform: process.env.TEST_PLATFORM || 'BrowserStack mobile',
          Execution: 'BrowserStack real device cloud',
          Build: buildName,
          Project: process.env.BROWSERSTACK_PROJECT_NAME || 'native-demo-app-mobile-tests',
          'Automation Driver': process.env.APPIUM_AUTOMATION_NAME || 'UiAutomator2 / XCUITest'
        }
      }
    ]
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },

  services: [
    [
      'browserstack',
      {
        testObservability: true,
        testObservabilityOptions: {
          projectName: process.env.BROWSERSTACK_PROJECT_NAME || 'native-demo-app-mobile-tests',
          buildName
        },
        browserstackLocal: false
      }
    ]
  ],

  async afterTest(_test, _context, { error }) {
    if (error) {
      const screenshot = await browser.takeScreenshot();
      allureReporter.addAttachment('Failure screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
    }
  },

  commonCapabilities: {
    'bstack:options': {
      projectName: process.env.BROWSERSTACK_PROJECT_NAME || 'native-demo-app-mobile-tests',
      buildName,
      sessionName: 'native-demo-app mobile tests',
      debug: true,
      networkLogs: true,
      appiumVersion: '2.0.1'
    }
  }
};

exports.config = config;
