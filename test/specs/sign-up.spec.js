const { expect: chaiExpect } = require('chai');
const authenticationData = require('../data/authentication.data.json');
const { buildRandomEmail } = require('../helpers/test-data');
const AlertScreen = require('../screens/alert.screen');
const LoginScreen = require('../screens/login.screen');
const SignUpScreen = require('../screens/sign-up.screen');

describe('Sign up', () => {
  authenticationData.validUsers.forEach((userData) => {
    it(`should sign up successfully with ${userData.scenario}`, async () => {
      const email = buildRandomEmail(userData);

      await LoginScreen.open();
      await LoginScreen.openSignUp();
      await SignUpScreen.submitRegistration(email, userData.password);

      await expect(AlertScreen.message).toBeDisplayed();

      const message = await AlertScreen.getMessage();
      chaiExpect(message).to.equal(authenticationData.messages.signUpSuccess);

      await AlertScreen.confirm();
    });
  });

  it('should display the sign up form fields', async () => {
    await LoginScreen.open();
    await LoginScreen.openSignUp();

    await expect(SignUpScreen.emailInput).toBeDisplayed();
    await expect(SignUpScreen.passwordInput).toBeDisplayed();
    await expect(SignUpScreen.confirmPasswordInput).toBeDisplayed();
  });

  it('should display an error message for invalid email', async () => {
    await LoginScreen.open();
    await LoginScreen.openSignUp();
    await SignUpScreen.submitRegistration('invalid-email', 'validPassword');

    await expect(AlertScreen.errorEmailMessage).toBeDisplayed();

    const message = await AlertScreen.getErrorEmailMessage();
    chaiExpect(message).to.equal(authenticationData.messages.invalidEmailError);
  });

  it('should display an error message for invalid password', async () => {
    const validEmail = buildRandomEmail();

    await LoginScreen.open();
    await LoginScreen.openSignUp();
    await SignUpScreen.submitRegistration(validEmail, 'invalid');

    await expect(AlertScreen.errorPasswordMessage).toBeDisplayed();

    const message = await AlertScreen.getErrorPasswordMessage();
    chaiExpect(message).to.equal(authenticationData.messages.invalidPasswordError);
  });

  it('should display an error message for different passwords', async () => {
    const validEmail = buildRandomEmail();

    await LoginScreen.open();
    await LoginScreen.openSignUp();
    await SignUpScreen.submitRegistration(validEmail, 'validPassword', 'differentPassword');

    await expect(AlertScreen.errorDifferentPasswordMessage).toBeDisplayed();

    const message = await AlertScreen.getErrorDifferentPasswordMessage();
    chaiExpect(message).to.equal(authenticationData.messages.differentPasswordError);
  });
});
