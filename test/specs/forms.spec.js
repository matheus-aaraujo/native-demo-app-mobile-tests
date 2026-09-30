const { expect: chaiExpect } = require('chai');
const formsData = require('../data/forms.data.json');
const AlertScreen = require('../screens/alert.screen');
const FormsScreen = require('../screens/forms.screen');
const NavigationBarScreen = require('../screens/navigation-bar.screen');

async function openFormsScreen() {
  await NavigationBarScreen.openForms();
  await expect(FormsScreen.title).toBeDisplayed();
}

describe('Forms', () => {
  it('should display the typed text below the input field', async () => {
    await openFormsScreen();
    await FormsScreen.fillInputField(formsData.inputText);

    const typedText = await FormsScreen.getTypedTextResult();
    chaiExpect(typedText).to.equal(formsData.inputText);
  });

  it('should update the switch helper text when toggled', async () => {
    await openFormsScreen();
    await expect(FormsScreen.switchText).toHaveText(formsData.messages.switchOn);

    await FormsScreen.toggleSwitch();

    const switchText = await FormsScreen.getSwitchText();
    chaiExpect(switchText).to.equal(formsData.messages.switchOff);
  });

  formsData.dropdownOptions.forEach((option) => {
    it(`should select the "${option}" dropdown option`, async () => {
      await openFormsScreen();
      await FormsScreen.selectDropdownOption(option);

      const selectedOption = await FormsScreen.getSelectedDropdownOption(option);
      chaiExpect(selectedOption).to.equal(option);
    });
  });

  it('should display an alert when tapping the active button', async () => {
    await openFormsScreen();
    await FormsScreen.tapActiveButton();

    await expect(FormsScreen.activeButtonAlertMessage).toBeDisplayed();

    const alertMessage = await FormsScreen.getActiveButtonAlertMessage();
    chaiExpect(alertMessage).to.equal(formsData.messages.activeButtonAlert);

    await AlertScreen.confirm();
  });

  it('should not display an alert when tapping the inactive button', async () => {
    await openFormsScreen();
    await FormsScreen.tapInactiveButton();

    const isAlertDisplayed = await FormsScreen.isActiveButtonAlertDisplayed();
    chaiExpect(isAlertDisplayed).to.equal(false);
  });
});
