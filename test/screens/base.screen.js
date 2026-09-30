class BaseScreen {
  async waitForDisplayed(element, timeout = 10000) {
    await element.waitForDisplayed({ timeout });
  }

  async tap(element) {
    await this.waitForDisplayed(element);
    await element.click();
  }

  async type(element, value) {
    await this.waitForDisplayed(element);
    await element.setValue(value);
  }

  async getText(element) {
    await this.waitForDisplayed(element);
    return element.getText();
  }
}

module.exports = BaseScreen;
