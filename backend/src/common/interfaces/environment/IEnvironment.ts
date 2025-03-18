export interface IEnvironment {
  mongoUri: string;
  port: number;
  nodeEnv: string;

  expenseDbName: string;
  userDbName: string;
  transactionDbName: string;

  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;

  cookieSecret: string;
  cookieExpiresIn: string;
}
