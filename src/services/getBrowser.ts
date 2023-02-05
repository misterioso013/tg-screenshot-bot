import puppeteer from 'puppeteer';

export async function getBrowser(args: string[] = []) {
    const browser = await puppeteer.launch({
        headless: true,
        args

    });
    return browser;
}