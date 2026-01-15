import { type Locator, type Page, expect } from '@playwright/test';
import Counter from '../components/counter';

export default class CreateRoomPage {

    readonly page: Page;
    readonly nextButton: Locator;
    readonly backButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.nextButton = this.page.getByRole('button', { name: 'Next', exact: true });
        this.backButton = this.page.getByRole('button', { name: 'Back', exact: true });
    }
    
    category(name: string) {
        const categorySection = this.page.locator('.grid');
        return categorySection.getByText(name);
    }

    async selectCategory(name: string) {
       await this.category(name).click();
    }

    async clickButtonNext() {
        await this.nextButton.click();
    }

    async clickButtonBack() {
        await this.backButton.click();
    }

    async fillFacility() {
        const guests = new Counter(this.page, 'Guests');
        const rooms = new Counter(this.page, 'Rooms');
        const bathrooms = new Counter(this.page, 'Bathrooms');

        guests.addValue();
        guests.subValue();
        rooms.addValue();
        rooms.subValue();
        bathrooms.addValue();
        bathrooms.subValue();
    }
}

