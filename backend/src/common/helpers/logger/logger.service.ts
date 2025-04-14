import { Injectable, LoggerService } from '@nestjs/common';
import chalk from 'chalk';
import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from 'winston';

const { combine, timestamp, printf } = format;

@Injectable()
export class Logger implements LoggerService {
  private winstonLogger: WinstonLogger;
  constructor() {
    this.winstonLogger = createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        this.logFormat(),
      ),
      transports: [new transports.Console()],
    });
  }
  private logFormat = () =>
    printf(({ level, message, timestamp, context, ...meta }) => {
      let coloredLevel: string;
      switch (level) {
        case 'error':
          coloredLevel = chalk.bgRed.bold(`ERROR`);
          break;
        case 'warn':
          coloredLevel = chalk.bgYellow.bold(`WARN`);
          break;
        case 'info':
          coloredLevel = chalk.bgGreen.bold(`INFO`);
          break;
        case 'debug':
          coloredLevel = chalk.bgBlue.bold(`DEBUG`);
          break;
        case 'verbose':
          coloredLevel = chalk.bgMagenta.bold(`VERBOSE`);
          break;
        default:
          coloredLevel = level.toUpperCase();
          break;
      }

      const contextString = context ? chalk.cyan(context) : '';
      const metaString =
        Object.keys(meta).length > 0 ? JSON.stringify(meta) : '';

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `${chalk.gray(timestamp)} ${coloredLevel} ${contextString} ${message} ${chalk.gray(metaString)}`;
    });

  log(message: string, context?: string) {
    this.winstonLogger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.winstonLogger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.winstonLogger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.winstonLogger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.winstonLogger.verbose(message, { context });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setContext(context: string) {}
}
