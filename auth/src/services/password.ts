import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static toHash(password: string) {}

  static compare(storedPassword: string, suppliedPassword: string) {}
}
