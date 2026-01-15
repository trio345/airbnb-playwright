import { Page, Locator, expect } from '@playwright/test';

export default class Counter {
    readonly page: Page;
    readonly counter: Locator;
    readonly plusButton: Locator;
    readonly minusButton: Locator;
    readonly numLabel: Locator;
    readonly labelCategory: string;

    constructor(page: Page, label: string) {
        this.page = page;
        this.labelCategory = label;
        this.counter = page.locator('div', { hasText: this.labelCategory }).locator('> div:last-child');
        this.plusButton = this.counter.locator('div').nth(2);
        this.minusButton = this.counter.locator('div').nth(0);
        this.numLabel = this.counter.locator('div').nth(1);
    }

    async increase() {
        await this.plusButton.click();
    }

    async decrease() {
        await this.minusButton.click();
    }

    async value(): Promise<number> {
        const num = Number(await this.numLabel.innerText());
        return num
    }

    assertValue(currNum: number, num: number) {
        expect(currNum).toBe(num);
    }

    async addValue() {
        const currNum = await this.value();
        await this.increase();
        this.assertValue(currNum, currNum + 1);
    }

    async subValue() {
        const currNum = await this.value();
        await this.decrease();
        this.assertValue(currNum, currNum - 1)
    }

}