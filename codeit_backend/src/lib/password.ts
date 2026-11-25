import bcrypt from "bcrypt";
import { scrypt, timingSafeEqual } from "node:crypto";

const BCRYPT_ROUNDS = 12;
const BCRYPT_MAX_BYTES = 72;
const LEGACY_SCRYPT_OPTIONS = {
  N: 2 ** 17,
  r: 8,
  p: 1,
  maxmem: 160 * 1024 * 1024,
};

export function fitsBcryptPassword(password: string): boolean {
  return Buffer.byteLength(password, "utf8") <= BCRYPT_MAX_BYTES;
}

export async function hashPassword(password: string): Promise<string> {
  if (!fitsBcryptPassword(password)) {
    throw new RangeError("bcrypt 비밀번호는 72바이트 이하여야 합니다.");
  }
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

function deriveLegacyKey(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, LEGACY_SCRYPT_OPTIONS, (error, key) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(key);
    });
  });
}

export async function verifyPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  if (passwordHash.startsWith("$2")) {
    // bcrypt가 마지막 바이트를 잘라 비교하지 않도록 입력 길이를 확인한다.
    return (
      fitsBcryptPassword(password) &&
      (await bcrypt.compare(password, passwordHash))
    );
  }

  // 이전에 저장한 scrypt 해시는 기존 계정 로그인에 사용한다.
  const parts = /^v1:([a-f0-9]{32}):([a-f0-9]{128})$/.exec(passwordHash);
  if (!parts) {
    return false;
  }

  const [, salt, savedKey] = parts;
  const key = await deriveLegacyKey(password, Buffer.from(salt, "hex"));
  return timingSafeEqual(key, Buffer.from(savedKey, "hex"));
}
