const BaseScreen = require('./base.screen');

class NavigationBarScreen extends BaseScreen {
  get homeButton() {
    return $('android=new UiSelector().text("Home")');
  }

  get webButton() {
    return $('android=new UiSelector().text("Web")');
  }

  get webviewButton() {
    return $('android=new UiSelector().text("Webview")');
  }

  get loginButton() {
    return $('android=new UiSelector().text("Login")');
  }

  get formsButton() {
    return $('android=new UiSelector().text("Forms")');
  }

  get swipeButton() {
    return $('android=new UiSelector().text("Swipe")');
  }

  get dragButton() {
    return $('android=new UiSelector().text("Drag")');
  }

  get menuButton() {
    return $('android=new UiSelector().text("Menu")');
  }

  get homeTitle() {
    return $('android=new UiSelector().text("Demo app for the appium-boilerplate")');
  }

  get webviewLoadedText() {
    return $('android=new UiSelector().text("Next-gen browser and mobile automation test framework for Node.js")');
  }

  get loginTitle() {
    return $('android=new UiSelector().text("Login / Sign up Form")');
  }

  get formsTitle() {
    return $('android=new UiSelector().text("Form components")');
  }

  get swipeTitle() {
    return $('android=new UiSelector().text("Swipe horizontal")');
  }

  get dragTitle() {
    return $('android=new UiSelector().text("Drag and Drop")');
  }

  get sideMenuPanel() {
    return $('~tab-side-menu-panel');
  }

  async openHome() {
    await this.tap(this.homeButton);
  }

  async openWebview() {
    if (await this.webButton.isDisplayed().catch(() => false)) {
      await this.tap(this.webButton);
      return;
    }

    await this.tap(this.webviewButton);
  }

  async openLogin() {
    await this.tap(this.loginButton);
  }

  async openForms() {
    await this.tap(this.formsButton);
  }

  async openSwipe() {
    await this.tap(this.swipeButton);
  }

  async openDrag() {
    await this.tap(this.dragButton);
  }

  async openMenu() {
    await this.tap(this.menuButton);
  }
}

module.exports = new NavigationBarScreen();

