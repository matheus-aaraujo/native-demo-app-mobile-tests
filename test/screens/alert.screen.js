const BaseScreen = require('./base.screen');

class AlertScreen extends BaseScreen {
  get message() {
    return $('android=new UiSelector().resourceId("android:id/message")');
  }

  get okButton() {
    return $('android=new UiSelector().resourceId("android:id/button1")');
  }

  get errorEmailMessage() {
    return $('android=new UiSelector().text("Please enter a valid email address")');
  }

  get errorPasswordMessage() {
    return $('android=new UiSelector().text("Please enter at least 8 characters")');
  }

  get errorDifferentPasswordMessage() {
    return $('android=new UiSelector().text("Please enter the same password")');
  }

  async getMessage() {
    return this.getText(this.message);
  }

  async getErrorEmailMessage() {
    return this.getText(this.errorEmailMessage);
  }

  async getErrorPasswordMessage() {
    return this.getText(this.errorPasswordMessage);
  }

  async getErrorDifferentPasswordMessage() {
    return this.getText(this.errorDifferentPasswordMessage);
  }

  async confirm() {
    await this.tap(this.okButton);
  }
}

module.exports = new AlertScreen();
