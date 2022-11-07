export interface Response {
  message?: string;
  token?: string;
  data?: [any] | any;
  errors?: [any] | any;
}

export interface ReturnValue {
    response?: Response;
    statusCode?: number;
  }