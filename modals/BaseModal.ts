import { Page, Locator, expect } from '@playwright/test';

export default class BaseModal {
    protected readonly page: Page;
    protected readonly title: Locator;
    protected readonly closeButton: Locator;

    constructor(page: Page, title: string) {
        this.page = page;
        this.title = page.getByTestId(`${title.toLowerCase()}-modal`);
        this.closeButton = page.locator('button').filter({ has: page.locator('svg') }).first()
    }

    async assertVisible() {
        await expect(this.title).toBeVisible({timeout: 1000});
    }

    async assertHidden() {
        await expect(this.title).not.toBeVisible();
    }

    async close() {
        await this.closeButton.click();
        await this.assertHidden();
    }

}