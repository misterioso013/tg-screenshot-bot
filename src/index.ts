import { Context, Telegraf } from 'telegraf'
import { Message } from 'telegraf/typings/core/types/typegram';
import {getBrowser} from './services/getBrowser';
import fs from 'fs';
import 'dotenv/config';

import { startController } from './controller/startController';
import { verifyURL } from './services/verifyURL';


const bot = new Telegraf(process.env.BOT_TOKEN as string)

bot.start(startController)


bot.command('config', async (ctx: Context) => {
    await ctx.replyWithHTML(`<b>Set your config</b>`, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Set Width',
                        callback_data: 'set_width'
                    },
                    {
                        text: 'Set Height',
                        callback_data: 'set_height'
                    }
                ],
                [
                    {
                        text: 'Set Delay',
                        callback_data: 'set_delay'
                    }
                ]
            ]
        }
    })
})

bot.on('text', async (ctx: Context) => {

    await ctx.reply('Processing...');

    const msg = ctx.message as Message.TextMessage;
    const url = msg.text;

    if (!verifyURL(url)) {
        await ctx.reply('Invalid URL');
        return;
    }

    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.goto(url);
    await ctx.sendChatAction('upload_photo');
    await page.screenshot({ path: 'photo.png' });
    await browser.close();
    await ctx.replyWithPhoto({ source: 'photo.png' });

    fs.unlink('photo.png', (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));