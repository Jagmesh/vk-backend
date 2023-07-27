import { Body, Injectable } from '@nestjs/common';
import { TelegramAPI } from 'src/services/TelegramAPI';

// import TelegramBot = require('node-telegram-bot-api');
// import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class WallpostsCallbackService {
  async sendMsg(@Body() body: IWallPost) {
    console.log('[LOG] Получили новый запрос!');
    console.log(`Полученный полный объект запроса: ${JSON.stringify(body, null, 2)}`);

    const telegram = new TelegramAPI(process.env.TELEGRAM_BOT_API_TOKEN, process.env.TELEGRAM_CHAT_ID);

    //await telegram.sendMessage('<i>НОВЫЙ ЗАПРОС</i>');
    await telegram.sendMessage(body.object.text);
    //await telegram.sendMessage(JSON.stringify(body, null, 2));

    if (body.object.attachments.length) {
      for (const element of body.object.attachments) {
        await telegram.sendDocument(element.doc.url);
      }
    }

    // // Токен бота, полученный от BotFather
    // const token = '6140927434:AAHTyicAWXkhsDWeh2K-wCQa5_muJtmmUfU';
    // const chatId = '@gifandtext';
    // const bot = new TelegramBot(token);
    // try {
    //   // Отправляем сообщение в канал
    //   await bot.sendMessage(chatId, 'НОВЫЙ ЗАПРОС');
    //   await bot.sendMessage(chatId, body.object.text);

    //   // if (body.object.attachments.length) {
    //   //   for (const element of body.object.attachments) {
    //   //     await bot.sendDocument(chatId, element.doc.url);
    //   //   }
    //   // }

    //   await bot.sendMessage(chatId, `\`\`\`Полученный полный объект запроса: ${JSON.stringify(body, null, 2)}\`\`\``);
    // } catch (error) {
    //   console.log(`Ошибка при выполнении запроса: ${error}`);
    // }
  }
}
