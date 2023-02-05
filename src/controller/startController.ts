import { Context } from "telegraf";
import { User } from "../models/User";

export const startController = async (ctx: Context) => {

    const user = new User()

    const userExists = await user.get(String(ctx.from?.id))

    if (!userExists) {
        await user.create({
            id: String(ctx.from?.id),
            name: String(ctx.from?.first_name + ' ' + ctx.from?.last_name),
            width: 1920,
            height: 1080,
            mobile: false,
            delay: 0,
            language: ctx.from?.language_code as unknown as string
        })
    }

    ctx.replyWithHTML(`<b>Welcome to Screenshot Bot</b>\n\nSend me a URL and I'll send you a screenshot of it.`)
}