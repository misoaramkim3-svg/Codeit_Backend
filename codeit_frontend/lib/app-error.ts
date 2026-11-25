export type AppErrorType = "SERVER_ERROR" | "DUPLICATE_EMAIL" | "LOGIN_FAILED";

export class AppError extends Error {
  type: AppErrorType;

  constructor(type: AppErrorType, message: string) {
    super(message);
    this.name = "AppError";
    this.type = type;
  }
}
