/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-08-31 16:56:20
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-08-31 16:56:21
 * @FilePath     : /wechat-anti-revoke/src/utils/logger.ts
 * @Description  : 未添加文件描述
 */

import pino from 'pino';

export const logger = pino({
  prettyPrint: {
    colorize: true,
    translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
  },
});
