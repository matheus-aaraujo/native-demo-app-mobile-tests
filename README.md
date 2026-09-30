# native-demo-app-mobile-tests

Mobile test automation project for [`native-demo-app`](https://github.com/webdriverio/native-demo-app), using Appium, WebdriverIO, JavaScript, Mocha, Chai, Page Object Model, Allure Report, and BrowserStack support for Android and iOS execution.

The app builds are available in the official [`native-demo-app` releases page](https://github.com/webdriverio/native-demo-app/releases).

## Test scope

The current suite covers the main flows requested for the challenge:

- Login and sign up flows.
- Navigation between the main app screens.
- Form interactions, including input, switch, dropdown, active button alert, and inactive button behavior.
- Error and success message validations.
- Data-driven examples using JSON files.

The tests are organized with the Page Object Model pattern. Screen elements and actions are kept under `test/screens`, test data under `test/data`, and test scenarios under `test/specs`.

## Tech stack

- JavaScript
- WebdriverIO
- Appium
- Mocha
- Chai
- Allure Report
- BrowserStack

## Requirements

### Common requirements

- Node.js 22 or later.
- npm.
- Appium 2 server available when running locally.
- Project dependencies installed with `npm install`.

### Android local requirements

- Android Studio.
- Android SDK configured.
- Android emulator or physical Android device.
- `ANDROID_HOME` or `ANDROID_SDK_ROOT` configured.
- `platform-tools` and `emulator` added to `PATH`.
- The Android APK installed on the emulator/device.

The app package/activity used by this project are:

```text
com.wdiodemoapp/com.wdiodemoapp.MainActivity
```

### BrowserStack requirements

- BrowserStack username and access key.
- For Android in GitHub Actions, the BrowserStack workflow downloads the APK from the official GitHub release and uploads it to BrowserStack automatically.
- For local Android BrowserStack execution, provide `BROWSERSTACK_ANDROID_APP` in the `bs://<app-id>` format.
- For iOS BrowserStack execution, provide `BROWSERSTACK_IOS_APP` in the `bs://<app-id>` format.

## iOS support notes

This repository is prepared to support both Android and iOS because WebdriverIO and Appium allow platform-specific capabilities while keeping the same test structure, specs, test data, and Page Object Model organization.

For iOS execution, the project uses the Appium `XCUITest` driver. For Android local execution, it uses `UiAutomator2`.

There are two relevant limitations for this challenge:

1. The official [`native-demo-app`](https://github.com/webdriverio/native-demo-app) documentation states that the Android app can be installed on Android emulators and physical devices, but the iOS app can only be installed on iOS simulators. The project documentation explains that there is no build available for physical iPhones due to Apple's installation/signing restrictions.
2. This project was developed from a Windows machine. Windows cannot run a local iOS Simulator because iOS simulators require macOS and Xcode.

Because of those constraints, local execution is currently focused on Android. The iOS configuration is included to demonstrate how the same suite would be executed for iOS when a compatible iOS build and environment are available.

To run the iOS suite, one of these options would be required:

- Use a macOS machine with Xcode and an iOS Simulator, then run the tests with an iOS simulator build of the app.
- Use BrowserStack with a compatible iOS app upload. If BrowserStack execution targets real iOS devices, a valid `.ipa` signed for device execution would be required. If only a simulator build is available from the official releases, the execution must use a simulator-compatible environment or a new properly signed iOS build must be generated from the app source code.

The intended command for iOS execution is already available:

```bash
npm run test:ios
```

The Android implementation was validated locally, and the repository keeps the iOS setup documented and isolated through `config/wdio.ios.conf.js` so the platform can be enabled without changing the test architecture.

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Fill the values needed for your execution target:

```bash
BROWSERSTACK_USERNAME=
BROWSERSTACK_ACCESS_KEY=

# Required only for local Android BrowserStack execution.
# The GitHub Actions BrowserStack workflow uploads the Android app automatically.
BROWSERSTACK_ANDROID_APP=bs://<android-app-id>

# Required only for iOS BrowserStack execution.
BROWSERSTACK_IOS_APP=bs://<ios-app-id>
```

For local Android execution, keep or adjust these values:

```bash
APPIUM_HOST=127.0.0.1
APPIUM_PORT=4723
APPIUM_PATH=/
ANDROID_DEVICE_NAME=emulator-5554
ANDROID_APP_PACKAGE=com.wdiodemoapp
ANDROID_APP_ACTIVITY=com.wdiodemoapp.MainActivity
```

## Running locally on Android

Start Appium:

```bash
appium
```

Start your emulator or connect your Android device, then confirm it is visible:

```bash
adb devices
```

Run the Android local suite:

```bash
npm run test:android:local
```

Run a single spec:

```bash
npx wdio run ./config/wdio.android.local.conf.js --spec test/specs/forms.spec.js
```

To temporarily run a single scenario, add `.only` to the desired `it`, run the spec, then remove `.only` before finishing the work.

## Running on BrowserStack

Run Android on BrowserStack:

```bash
npm run test:android
```

Run iOS on BrowserStack:

```bash
npm run test:ios
```

Run both platforms:

```bash
npm run test:mobile
```

## Useful scripts

```bash
npm run lint
npm run validate:config
npm run test:android:local
npm run test:android
npm run test:ios
npm run test:mobile
npm run report:generate
npm run report:open
```

## Allure Report

Generate the report after a test run:

```bash
npm run report:generate
```

Open the generated report:

```bash
npm run report:open
```

The Allure setup includes:

- Test execution summary.
- Environment information.
- Execution logs from WebdriverIO.
- Failure screenshots attached automatically through the `afterTest` hook.

Screenshots are attached only when a test fails. A passing run will not show failure screenshots because there are no failures to capture.

## Project structure

```text
config/
  wdio.shared.conf.js
  wdio.android.local.conf.js
  wdio.android.conf.js
  wdio.ios.conf.js
test/
  data/
    authentication.data.json
    forms.data.json
  helpers/
    test-data.js
  screens/
    alert.screen.js
    base.screen.js
    forms.screen.js
    login.screen.js
    navigation-bar.screen.js
    sign-up.screen.js
  specs/
    forms.spec.js
    login.spec.js
    navigation.spec.js
    sign-up.spec.js
```

## Test data

The project uses JSON files for data-driven coverage:

- `test/data/authentication.data.json` stores login/sign up data templates.
- `test/data/forms.data.json` stores forms input, dropdown options, and expected messages.

Unique emails are generated at runtime to keep sign up and login scenarios repeatable.

## GitHub Actions

The default workflow in `.github/workflows/mobile-tests.yml` runs without BrowserStack so the project can be validated without paid third-party usage. It performs project validation, starts an Android emulator, downloads the latest Android APK from the official `native-demo-app` GitHub releases, installs it on the emulator, and runs the Android suite locally.

BrowserStack execution is isolated in `.github/workflows/browserstack-mobile-tests.yml`. This workflow is manual through `workflow_dispatch`, and both Android and iOS are disabled by default.

For Android BrowserStack execution in GitHub Actions, configure these repository secrets:

- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`

The Android BrowserStack workflow downloads the APK from the official GitHub release, uploads it to BrowserStack App Automate, reads the returned `bs://<app-id>`, and uses it during the same workflow run.

For iOS BrowserStack execution, also configure:

- `BROWSERSTACK_IOS_APP`

The iOS app value must be a compatible BrowserStack app ID in the `bs://<app-id>` format.


