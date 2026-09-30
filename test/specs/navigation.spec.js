const NavigationBarScreen = require('../screens/navigation-bar.screen');

describe('Navigation', () => {
  it('should navigate to the home screen from the bottom navigation bar', async () => {
    await NavigationBarScreen.openHome();

    await expect(NavigationBarScreen.homeTitle).toBeDisplayed();
  });

  it('should navigate to the webview screen from the bottom navigation bar', async () => {
    await NavigationBarScreen.openWebview();

    await expect(NavigationBarScreen.webviewLoadedText).toBeDisplayed({ wait: 30000 });
  });

  it('should navigate to the login screen from the bottom navigation bar', async () => {
    await NavigationBarScreen.openLogin();

    await expect(NavigationBarScreen.loginTitle).toBeDisplayed();
  });

  it('should navigate to the forms screen from the bottom navigation bar', async () => {
    await NavigationBarScreen.openForms();

    await expect(NavigationBarScreen.formsTitle).toBeDisplayed();
  });

  it('should navigate to the swipe screen from the bottom navigation bar', async () => {
    await NavigationBarScreen.openSwipe();

    await expect(NavigationBarScreen.swipeTitle).toBeDisplayed();
  });

  it('should navigate to the drag screen from the bottom navigation bar', async () => {
    await NavigationBarScreen.openDrag();

    await expect(NavigationBarScreen.dragTitle).toBeDisplayed();
  });

  it('should open the side menu from the bottom navigation bar', async () => {
    await NavigationBarScreen.openMenu();

    await expect(NavigationBarScreen.sideMenuPanel).toBeDisplayed();
    await expect(NavigationBarScreen.homeButton).toBeDisplayed();
    await expect(NavigationBarScreen.webviewButton).toBeDisplayed();
    await expect(NavigationBarScreen.loginButton).toBeDisplayed();
    await expect(NavigationBarScreen.formsButton).toBeDisplayed();
    await expect(NavigationBarScreen.swipeButton).toBeDisplayed();
    await expect(NavigationBarScreen.dragButton).toBeDisplayed();
  });
});


