export class Log {
  static async write(scope: string, message: string) {
    const date = new Date();
    date.setHours(date.getHours() + 3);

    const localDate = date.toJSON().slice(0, -5).replace(/T/, ' ');

    console.log(`[${localDate}]: \x1b[32m[${scope}]\x1b[0m ${message}`);
  }
}
