/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from './logger.service';
import chalk from 'chalk';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const { method, originalUrl } = request;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userAgent = request.headers['user-agent'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const ip = request.ip;

    const requestLog = `[${chalk.yellow(method)} ${chalk.cyan(originalUrl)}] - ${userAgent} - ${ip} - Request Received`;
    this.logger.log(requestLog, 'HTTP');

    return next.handle().pipe(
      tap((data) => {
        const response = httpContext.getResponse();
        const statusCode = response.statusCode;
        const contentLength = response.get('content-length');
        const executionTime = Date.now() - now;

        let statusColor;
        let levelText;
        if (statusCode >= 500) {
          statusColor = chalk.bgRed.bold;
          levelText = 'ERROR';
        } else if (statusCode >= 400) {
          statusColor = chalk.bgYellow.bold;
          levelText = 'WARN';
        } else {
          statusColor = chalk.bgGreen.bold;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          levelText = 'INFO';
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const coloredStatus = statusColor(`${statusCode}`);
        const logMessage = `[${chalk.yellow(method)} ${chalk.cyan(originalUrl)}] - ${coloredStatus} ${contentLength} - ${executionTime}ms`;

        if (statusCode >= 500) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          this.logger.error(chalk.red(logMessage), data, 'HTTP');
        } else if (statusCode >= 400) {
          this.logger.warn(chalk.yellow(logMessage), 'HTTP');
        } else {
          this.logger.log(logMessage, 'HTTP');
        }
      }),
    );
  }
}
