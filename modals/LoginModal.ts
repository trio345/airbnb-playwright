import { Page, Locator, expect } from '@playwright/test';
import BaseModal from './BaseModal';

export default class LoginModal extends BaseModal {
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly continueButton: Locator;
    readonly continueGoogleButton: Locator;
    readonly continueGithubButton: Locator;
    readonly textLinkCreateAnAccount: Locator;
    
    constructor (page: Page) {
        super(page, 'Login');
        this.emailField = page.locator('#email');
        this.passwordField = page.locator('#password');
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
        this.continueGoogleButton = page.getByRole('button', { name: 'Continue with Google' });
        this.continueGithubButton = page.getByRole('button', { name: 'Continue with Github' });
        this.textLinkCreateAnAccount = page.getByText('Create an account', { exact: true })
    }

    async fillEmail(email: string) {
        await this.emailField.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async clickLogin() {
        await this.continueButton.click();
    }

    async clickContinueWithGoogle() {
        await this.continueGoogleButton.click();
    }

    async clickContinueWithGithub() {
        await this.continueGithubButton.click();
    }

    async clickCreateAnAccount() {
        await this.textLinkCreateAnAccount.click();
    }

    async assertBlankEmail() {
        await expect(this.emailField).toHaveClass(/border-rose-500/);
    }

    async assertBlankPassword() {
        await expect(this.passwordField).toHaveClass(/border-rose-500/);
    }

    async assertEmailCached(expected: string) {
        await expect(this.emailField).not.toHaveValue(expected)
    }

    async assertPasswordCached(expected: string) {
        await expect(this.passwordField).not.toHaveValue(expected)
    }

    async doLogin(email: string, password: string) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLogin();
    }

}