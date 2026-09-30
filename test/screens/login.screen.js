const BaseScreen = require('./base.screen');

class LoginScreen extends BaseScreen {
  get loginMenu() {
    return android=new UiSelector().text(\"Login\");
  }

  get loginTab() {
    return $('android=new UiSelector().text("Login")');
  }

  get emailInput() {
    return $('~input-email');
  }

  get passwordInput() {
    return $('~input-password');
  }

  get loginButton() {
    return $('~button-LOGIN');
  }

  get signUpTab() {
    return $('android=new UiSelector().text("Sign up")');
  }

  get successMessage() {
    return $('android=new UiSelector().resourceId("android:id/message")');
  }

  async open() {
    await this.tap(this.loginMenu);
    await this.tap(this.loginTab);
  }

  async login(email, password) {
    await this.type(this.emailInput, email);
    await this.type(this.passwordInput, password);
    await this.tap(this.loginButton);
  }

  async openSignUp() {
    await this.tap(this.signUpTab);
  }
}

module.exports = new LoginScreen();


