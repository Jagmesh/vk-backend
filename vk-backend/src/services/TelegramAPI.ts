import { Log } from 'src/helpers';
import { Telegram } from 'telegraf';

export class TelegramAPI {
  telegram: Telegram;
  chatID: string;

  constructor(apiToken: string, chatID: string) {
    this.telegram = new Telegram(apiToken);
    this.chatID = chatID;
  }

  async sendMessage(text: string) {
    try {
      await this.telegram.sendMessage(this.chatID, text, {
        parse_mode: 'HTML',
      });
    } catch (error) {
      this.log(`Ошибка: ${error}`);
    }
  }

  async sendDocument(url: string) {
    try {
      await this.telegram.sendDocument(this.chatID, url);
    } catch (error) {
      this.log(`Ошибка: ${error}`);
    }
  }

  log(msg: string) {
    Log.write('TELEGRAM_API', `${msg}`);
  }
}
