export interface IreqConfig {
  credentials: string;
  headers: {
    Accept: string;
    'Content-Type': string;
  };
}

export interface Iresult {
  code: number;
  message: string;
  data: any;
}
