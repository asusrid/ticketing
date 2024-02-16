export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    // only for login reasons, this wont be shown to user
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
