import { FAKE_MEMOS, FAKE_USERS } from "./fake-database";
import { AppError } from "./lib/app-error";
import { createToken, isTokenValid, readToken } from "./lib/token";
import type {
  LoginResultType,
  MemoPageType,
  MemoRecordType,
  MemoType,
  NewMemoType,
  NewUserType,
  PublicUserType,
  UserType,
} from "@/types";

const readMemos = (): MemoRecordType[] => {
  const memos = localStorage.getItem("memos");
  if (memos === null) {
    writeMemos(FAKE_MEMOS);
    return FAKE_MEMOS;
  }
  return JSON.parse(memos);
};

const writeMemos = (memos: MemoRecordType[]) => {
  localStorage.setItem("memos", JSON.stringify(memos));
};

const readUsers = (): UserType[] => {
  const users = localStorage.getItem("users");
  if (users === null) {
    writeUsers(FAKE_USERS);
    return FAKE_USERS;
  }
  return JSON.parse(users);
};

const writeUsers = (users: UserType[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const getNowString = (now: Date) => {
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 19);
};

const toMemoResponses = (memos: MemoRecordType[]): MemoType[] => {
  const users = readUsers();
  return memos.map((memo) => ({
    ...memo,
    username:
      users.find((user) => user.id === memo.userId)?.username ?? "알 수 없음",
  }));
};

const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 100);
  });
};

const loadMemos = async (
  cursor: number | null = null,
): Promise<MemoPageType> => {
  const limit = 15;
  await delay();

  const restMemos =
    cursor === null
      ? readMemos()
      : readMemos().filter((memo) => memo.id < cursor);

  const memos = restMemos.slice(0, limit);
  const hasNext = restMemos.length > limit;

  return {
    memos: toMemoResponses(memos),
    nextCursor: hasNext ? memos[memos.length - 1].id : null,
  };
};

const loadMemo = async (id: number): Promise<MemoType | null> => {
  await delay();
  const memo = readMemos().find((memo) => memo.id === id);
  if (memo === undefined) {
    return null;
  }
  return toMemoResponses([memo])[0];
};

const createMemo = async (newMemo: NewMemoType): Promise<MemoType> => {
  await delay();

  const now = new Date();
  const memo: MemoRecordType = {
    ...newMemo,
    id: now.getTime(),
    createdAt: getNowString(now),
  };

  writeMemos([memo, ...readMemos()]);
  return toMemoResponses([memo])[0];
};

const signUp = async (newUser: NewUserType): Promise<void> => {
  await delay();

  const users = readUsers();
  if (users.some((user) => user.email === newUser.email)) {
    throw new AppError("DUPLICATE_EMAIL", "이미 가입된 이메일이에요.");
  }

  const now = new Date();
  const user: UserType = {
    ...newUser,
    id: now.getTime(),
    createdAt: getNowString(now),
  };

  writeUsers([...users, user]);
};

const TOKEN_EXPIRES_IN_MS = 24 * 60 * 60 * 1000;

const login = async (
  email: string,
  password: string,
): Promise<LoginResultType> => {
  await delay();

  const user = readUsers().find(
    (user) => user.email === email && user.password === password,
  );
  if (user === undefined) {
    throw new AppError("LOGIN_FAILED", "이메일 또는 비밀번호가 맞지 않아요.");
  }

  const expiresAt = new Date(Date.now() + TOKEN_EXPIRES_IN_MS);
  return { token: createToken(user.id, expiresAt) };
};

const getMe = async (token: string): Promise<PublicUserType> => {
  await delay();

  const payload = readToken(token);
  if (payload === null || !isTokenValid(token)) {
    throw new AppError("UNAUTHORIZED", "로그인이 필요해요.");
  }

  const user = readUsers().find((user) => user.id === payload.userId);
  if (user === undefined) {
    throw new AppError("UNAUTHORIZED", "로그인이 필요해요.");
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt,
  };
};

export default {
  loadMemos: loadMemos,
  loadMemo: loadMemo,
  createMemo: createMemo,
  signUp: signUp,
  login: login,
  getMe: getMe,
};
