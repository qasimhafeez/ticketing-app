import {ValidationError} from "express-validator";

export class RequestValidationError extends Error {
  constructor(private errors: ValidationError[]) {
    super();

    // to extend Error class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
