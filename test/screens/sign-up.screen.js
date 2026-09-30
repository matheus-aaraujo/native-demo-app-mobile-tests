const BaseScreen = require('./base.screen');

class SignUpScreen extends BaseScreen {
  get emailInput() {
    return $('~input-email');
  }

  get passwordInput() {
    return $('~input-password');
  }

  get confirmPasswordInput() {
    return $('~input-repeat-password');
  }

  get signUpButton() {
    return $('~button-SIGN UP');
  }

  async submitRegistration(email, password, confirmPassword = password) {
    await this.type(this.emailInput, email);
    await this.type(this.passwordInput, password);
    await this.type(this.confirmPasswordInput, confirmPassword);
    await this.tap(this.signUpButton);
  }
}

module.exports = new SignUpScreen();
