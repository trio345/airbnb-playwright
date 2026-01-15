import { Page, Locator, expect } from '@playwright/test';
import BaseModal from './BaseModal';

export default class RegisterModal extends BaseModal {
    readonly emailField: Locator;
    readonly nameField: Locator;
    readonly passwordField: Locator;
    readonly continueButton: Locator;
    readonly continueGoogleButton: Locator;
    readonly continueGithubButton: Locator;
    readonly textLinkLogin: Locator;

    constructor(page: Page) {
        super(page, 'Register');
        this.emailField = page.locator('#email');
        this.nameField = page.locator('#name');
        this.passwordField = page.locator('#password');
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
        this.continueGoogleButton = page.getByRole('button', { name: 'Continue with Google' });
        this.continueGithubButton = page.getByRole('button', { name: 'Continue with Github' });
        this.textLinkLogin = page.getByText('Log in');
    }

    async fillEmail(email: string) {
        await this.emailField.fill(email);
    }

    async fillName(name: string) {
        await this.nameField.fill(name);
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }    

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickContinueWithGoogle() {
        await this.continueGoogleButton.click();
    }

    async clickContinueWithGithub() {
        await this.continueGithubButton.click();
    }

    async clickTextLogin() {
        await this.textLinkLogin.click();
    }

    async assertBlankEmail() {
        await expect(this.emailField).toHaveClass(/border-rose-500/);
    }

    async assertBlankName() {
        await expect(this.nameField).toHaveClass(/border-rose-500/);
    }

    async assertBlankPassword() {
        await expect(this.passwordField).toHaveClass(/border-rose-500/);
    }

    async doRegister(email: string, name: string,password: string) {
        await this.fillEmail(email);
        await this.fillName(name);
        await this.fillPassword(password);
        await this.clickContinue();
    }

}