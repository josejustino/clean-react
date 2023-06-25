export enum httpStatusCode {
  noContent = 204,
  unauthorized = 401
}

export type HttpResponse = {
  statusCode: httpStatusCode
  body?: any
}
