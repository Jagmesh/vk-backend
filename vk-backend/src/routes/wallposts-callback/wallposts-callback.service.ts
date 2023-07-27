import { Body, Injectable } from '@nestjs/common';
import { Log } from 'src/helpers';
import { TelegramAPI } from 'src/services/TelegramAPI';

// import TelegramBot = require('node-telegram-bot-api');
// import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class WallpostsCallbackService {
  async sendMsg(@Body() body: IWallPost) {
    Log.write('MAIN', 'Получили новый запрос!');
    Log.write('MAIN', `Полученный полный объект запроса: ${JSON.stringify(body, null, 2)}`);

    const telegram = new TelegramAPI(process.env.TELEGRAM_BOT_API_TOKEN, process.env.TELEGRAM_CHAT_ID);

    if (body.object.post_type !== 'post') {
      Log.write('MAIN', `Получили post_type: ${body.object.post_type}. Пропускаем`);
      return;
    }

    await telegram.sendMessage(body.object.text);
    if (body.object.attachments.length) {
      for (const element of body.object.attachments) {
        await telegram.sendDocument(element.doc.url);
      }
    }
  }
}
