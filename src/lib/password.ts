import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

export async function hashPassword(
  password: string,
): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(
    password,
    salt,
    64,
  )) as Buffer;

  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  storedPassword: string,
): Promise<boolean> {
  const [salt, storedKeyHex] = storedPassword.split(":");

  if (!salt || !storedKeyHex) {
    return false;
  }

  const storedKey = Buffer.from(storedKeyHex, "hex");

  if (storedKey.length !== 64) {
    return false;
  }

  const derivedKey = (await scrypt(
    password,
    salt,
    64,
  )) as Buffer;

  return timingSafeEqual(storedKey, derivedKey);
}