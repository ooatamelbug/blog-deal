class ErrorGen extends Error {
  constructor(msg: string, status: number) {
    super(msg);
    // this.statusCode = status;
  }
}
