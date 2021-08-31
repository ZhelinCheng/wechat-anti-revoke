/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-08-31 16:21:44
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-08-31 17:59:09
 * @FilePath     : /wechat-anti-revoke/src/app.ts
 * @Description  : 未添加文件描述
 */

import dotenv from 'dotenv';
import { resolve } from 'path';
import { Wechaty } from 'wechaty';
import { logger } from './utils';
import QrCode from 'qrcode-terminal';

dotenv.config({
  path: resolve(__dirname, '../.env'),
});

logger.info(`WECHATY_PUPPET：${process.env.WECHATY_PUPPET}`);

async function main() {
  const bot = new Wechaty();
  bot
    .on('scan', (qrcode, status) => {
      logger.info(`Scan QR Code to login: ${status}:`);
      QrCode.generate(qrcode, { small: true });
    })
    .on('login', (user) => logger.info(`User ${user} logged in`))
    .on('message', (message) => console.log(message));
  await bot.start();
}

main().catch(console.error);
