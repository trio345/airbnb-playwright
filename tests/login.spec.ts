import { test, type Page } from '@playwright/test';
import HomePage from '../pages/home-page';
import CreateRoomPage from '../pages/create-room-page';
import LoginModal from '../modals/LoginModal';

const URL = 'https://rent-house-application.vercel.app/'
const email = process.env.EMAIL!;
const password = process.env.PASSWORD!;
const invalid_email = 'et@gmail.com';
const invalid_password = '123456788';

let homepage: HomePage;
let loginModal: LoginModal;
let createRoomPage: CreateRoomPage;

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    homepage = new HomePage(page);
    loginModal = new LoginModal(page);
    
    await homepage.assertPageTitle();
    await homepage.navigateToMenu('login');
    await loginModal.assertVisible();
})

test.describe('Airbnb - Login', () => {    
    test('Sucessfull login', async ({ page }) => {        
        await loginModal.doLogin(email, password);
        await homepage.assertLoginSuccess();
    });

    test('Failed login - invalid email', async({ page }) => {
        await loginModal.doLogin(invalid_email, password);
        await homepage.assertLoginFailed();
    });

    test('Failed login - invalid password', async ({ page }) => {
        await loginModal.doLogin(email, invalid_password);
        await homepage.assertLoginFailed();
    });

    test('Failed login - blank input email and password', async ({ page }) => {
        await loginModal.doLogin("", "");
        await loginModal.assertBlankEmail();
        await loginModal.assertBlankPassword();
    });

    test.fixme('Failed login - email and password cached', async({ page }) => {
        await loginModal.fillEmail(email);
        await loginModal.fillPassword(password);
        await loginModal.close();
        await homepage.clickMenu('login')
        await loginModal.assertEmailCached(email);
        await loginModal.assertPasswordCached(password);
    });
})