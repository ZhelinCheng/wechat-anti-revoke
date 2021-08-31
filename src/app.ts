/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-08-31 16:21:44
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-08-31 21:07:09
 * @FilePath     : /wechat-anti-revoke/src/app.ts
 * @Description  : 未添加文件描述
 */

import dotenv from 'dotenv';
import { resolve } from 'path';
import { Wechaty, Contact, Message, ScanStatus } from 'wechaty';
import { logger } from './utils';
import QrCode from 'qrcode-terminal';

dotenv.config({
  path: resolve(__dirname, '../.env'),
});

logger.info(`WECHATY_PUPPET：${process.env.WECHATY_PUPPET}`);

async function main() {
  const bot = new Wechaty({
    name: 'Bot',
    puppet: 'wechaty-puppet-wechat',
  });
  bot
    .on('scan', (qrcode, status: ScanStatus) => {
      logger.info(`Scan QR Code to login: ${status}:`);
      QrCode.generate(qrcode, { small: true });
    })
    .on('login', (user: Contact) => logger.info(`User ${user} logged in`))
    .on('message', async (message: Message) => {
      const room = message.room();
      const type = message.type();

      if (type === bot.Message.Type.Recalled && !room) {
        const recalledMessage = await message.toRecalled();
        const contact = recalledMessage?.talker();
        const text = recalledMessage?.text();
        const recalledType = recalledMessage?.type();

        // 忽略图片撤回
        if (contact && recalledType !== 6) {
          const sendMsg = `=== 撤回信息 === \n账号: ${contact.name()}\n信息: ${text}`;

          const senUser = await bot.Contact.find({
            id: 'filehelper',
          });

          await senUser?.say(sendMsg);
        }
      }
    })
    .on('logout', (user: Contact, reason: string) => {
      logger.info('Bot', `${user} logout, reason: ${reason}`);
    });
  await bot.start();
}

main().catch(console.error);
