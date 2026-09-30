const { expect: chaiExpect } = require('chai');
const authenticationData = require('../data/authentication.data.json');
const { buildRandomEmail } = require('../helpers/test-data');
const AlertScreen = require('../screens/alert.screen');
const LoginScreen = require('../screens/login.screen');
const SignUpScreen = require('../screens/sign-up.screen');

describe('Login', () => {
  const registeredUsers = new Map();

  before(async () => {
    for (const userData of authenticationData.validUsers) {
      const email = buildRandomEmail(userData);

      await LoginScreen.open();
      await LoginScreen.openSignUp();
      await SignUpScreen.submitRegistration(email, userData.password);
      await AlertScreen.confirm();

      registeredUsers.set(userData.scenario, email);
    }
  });

  authenticationData.validUsers.forEach((userData) => {
    it(`should log in successfully with ${userData.scenario}`, async () => {
      const email = registeredUsers.get(userData.scenario);

      await LoginScreen.open();
      await LoginScreen.login(email, userData.password);

      await expect(AlertScreen.message).toBeDisplayed();

      const message = await AlertScreen.getMessage();
      chaiExpect(message).to.equal(authenticationData.messages.loginSuccess);

      await AlertScreen.confirm();
    });
  });

  it('should display an error message for invalid email', async () => {
    await LoginScreen.open();
    await LoginScreen.login('invalid-email', 'invalidPassword');

    await expect(AlertScreen.errorEmailMessage).toBeDisplayed();

    const message = await AlertScreen.getErrorEmailMessage();
    chaiExpect(message).to.equal(authenticationData.messages.invalidEmailError);
  });

  it('should display an error message for invalid password', async () => {
    const validUser = authenticationData.validUsers[0];
    const email = registeredUsers.get(validUser.scenario);

    await LoginScreen.open();
    await LoginScreen.login(email, 'invalid');

    await expect(AlertScreen.errorPasswordMessage).toBeDisplayed();

    const message = await AlertScreen.getErrorPasswordMessage();
    chaiExpect(message).to.equal(authenticationData.messages.invalidPasswordError);
  });
});
