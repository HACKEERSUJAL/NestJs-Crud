import { HttpException, InternalServerErrorException } from '@nestjs/common';

/**
 * Generic interface for a successful API response.
 */
export interface SuccessResponse<T> {
  error: false;
  message: string;
  statusCode: number;
  data: T;
}

/**
 * Constructs a standardized success response object.
 *
 * @param message - A message describing the success
 * @param data - Optional data payload to include
 * @param statusCode - Optional HTTP status code (defaults to 200)
 * @returns The formatted success response
 */
export function successResponse<T = null>(
  message: string,
  data?: T,
  statusCode = 200,
): SuccessResponse<T | null> {
  return {
    error: false,
    message,
    statusCode,
    data: data ?? null,
  };
}

/**
 * Catches and handles errors, rethrowing them as appropriate.
 *
 * @param e - The error to handle
 * @throws Rethrows known NestJS HttpExceptions
 * @throws Wraps unknown Error types into InternalServerError
 */
export function catchError(e: unknown): never {
  if (e instanceof HttpException)
    // Rethrow known NestJS HttpExceptions
    throw e;

  if (e instanceof Error)
    // Wrap unknown Error types into InternalServerError
    throw new InternalServerErrorException([e.message]);

  // Catch anything else unexpected
  throw new InternalServerErrorException(['Something went wrong!']);
}