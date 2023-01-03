
import puppeteer from 'puppeteer';
import { ITranslator } from './ITranslator';
import { getViewport } from '../utilities/get-viewport';
import { getContent } from '../utilities/get-content';
import { ITranslationContext, TranslationDefaults } from './ITranslationContext';

export class HtmlToImg implements ITranslator {

    ctx: ITranslationContext;

    constructor(ctx: ITranslationContext) {
        this.ctx = ctx;
    }
    
    async convert(): Promise<string | Buffer> {
        let ctx = { ...TranslationDefaults, ...this.ctx };
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if(request.resourceType() === 'script')
                request.abort();
            else
                request.continue();
        });
        await page.setViewport(getViewport(ctx));
        await page.setContent(getContent(ctx));
        await page.emulateMediaType('screen');
        await page.emulateMediaType('print');
        let buffer: string | Buffer = "";
        if(this.ctx.type == 'png' || this.ctx.type == 'jpeg') {
            if (ctx.selector === undefined) {
            buffer = await page.screenshot({
                type: this.ctx.type,
                encoding: 'binary',
                omitBackground: true
            });} else {
                await page.waitForSelector(ctx.selector);          // wait for the selector to load
                const element = await page.$(ctx.selector);   
                if (element !== null) { 
                buffer = await element.screenshot({
                    type: this.ctx.type,
                    encoding: 'binary',
                    omitBackground: true
                });
            }
            }
        } else if(this.ctx.type == 'pdf') {
            buffer = await page.pdf({
                format: this.ctx.format
            });
        } else {
            await browser.close();
            throw "Unknown Download Type";
        }
        await browser.close();
        return buffer;
    }

}
