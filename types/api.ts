export type Response<T = any> = {
  data: T | null;
  error: {
    msg: string;
    statusCode: string;
  } | null;
};
