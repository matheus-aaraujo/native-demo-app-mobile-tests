const BaseScreen = require('./base.screen');

class FormsScreen extends BaseScreen {
  get title() {
    return $('android=new UiSelector().text("Form components")');
  }

  get inputField() {
    return $('~text-input');
  }

  get typedTextResult() {
    return $('~input-text-result');
  }

  get switch() {
    return $('~switch');
  }

  get switchText() {
    return $('~switch-text');
  }

  get dropdownPlaceholder() {
    return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Select an item..."))');
  }

  get dropdownField() {
    return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().className("android.widget.EditText").textContains("awesome"))');
  }

  get activeButton() {
    return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Active"))');
  }

  get inactiveButton() {
    return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Inactive"))');
  }

  get activeButtonAlertMessage() {
    return $('android=new UiSelector().resourceId("android:id/message")');
  }

  dropdownOption(optionText) {
    return $(`android=new UiSelector().text("${optionText}")`);
  }

  selectedDropdownOption(optionText) {
    return $(`android=new UiSelector().text("${optionText}")`);
  }

  async fillInputField(text) {
    await this.type(this.inputField, text);
  }

  async getTypedTextResult() {
    return this.getText(this.typedTextResult);
  }

  async toggleSwitch() {
    await this.tap(this.switch);
  }

  async getSwitchText() {
    return this.getText(this.switchText);
  }

  async selectDropdownOption(optionText) {
    const hasPlaceholder = await this.dropdownPlaceholder.isDisplayed().catch(() => false);

    if (hasPlaceholder) {
      await this.tap(this.dropdownPlaceholder);
    } else {
      await this.tap(this.dropdownField);
    }

    await this.tap(this.dropdownOption(optionText));
  }

  async getSelectedDropdownOption(optionText) {
    return this.getText(this.selectedDropdownOption(optionText));
  }

  async tapActiveButton() {
    await this.tap(this.activeButton);
  }

  async tapInactiveButton() {
    await this.tap(this.inactiveButton);
  }

  async getActiveButtonAlertMessage() {
    return this.getText(this.activeButtonAlertMessage);
  }

  async isActiveButtonAlertDisplayed() {
    return this.activeButtonAlertMessage.isDisplayed().catch(() => false);
  }
}

module.exports = new FormsScreen();
