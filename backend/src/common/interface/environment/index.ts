export interface IEnvironment {
  nodeEnv: string;
  port: number;

  mongoUri: string;

  userDbName: string;
  categoryDbName: string;
  transactionDbName: string;
}
