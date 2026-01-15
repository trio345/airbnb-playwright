import { type Locator, type Page, expect } from '@playwright/test';

class HomePage {

    readonly titleText: RegExp = /Airbnb/;
    readonly page: Page;
    readonly menuButton: Locator;
    readonly loginSuccess: Locator;
    readonly loginFailed: Locator;
    readonly airbnbLinkText : Locator;

    constructor (page: Page) {
        this.page = page;
        this.menuButton = page.getByTestId('user-menu-button');
        this.loginSuccess = page.getByText('Logged In', { exact: true });
        this.loginFailed = page.getByText('Invalid credentials', { exact: true });
        this.airbnbLinkText = page.locator('div.transition', { hasText: "Airbnb your home" });
    }

    menu = {
        login: () => this.page.getByTestId('login'),
        signup: () => this.page.getByText('Sign Up', { exact: true }),
        my_trips: () => this.page.getByText('My Trips', { exact: true }),
        my_favorites: () => this.page.getByText('My Favorites', { exact: true }),
        my_reservations: () => this.page.getByText('My Reservations', { exact: true }),
        my_properties: () => this.page.getByText('My Properties', { exact: true }),
        my_home: () => this.page.getByText('Airbnb my home', { exact: true }),
        logout: () => this.page.getByText('Logout', { exact: true })
    }

    async navigateToMenu(profileMenu: keyof typeof this.menu) {
        await this.clickProfileMenu();
        await this.clickMenu(profileMenu);
    }

    async clickProfileMenu() {
        await this.menuButton.click();
    }

    async clickMenu(name: keyof typeof this.menu) {
        await this.menu[name]().waitFor({ state: 'visible' })
        await this.menu[name]().click();
    }

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.titleText);
    }

    async assertLoginSuccess() {
        await expect(this.loginSuccess).toBeVisible({timeout: 10000});
    }
    
    async assertLoginFailed() {
        await expect(this.loginFailed).toBeVisible();
    }

    async clickAirbnbTextButton() {
        await this.airbnbLinkText.click();
    }

}

export default HomePage;