type TokenPayload = {
  userId: number;
  exp: number;
};

export const createToken = (userId: number, expiresAt: Date) => {
  const payload: TokenPayload = { userId, exp: expiresAt.getTime() };
  return btoa(JSON.stringify(payload));
};

export const readToken = (token: string): TokenPayload | null => {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

export const isTokenValid = (token: string) => {
  const payload = readToken(token);
  return payload !== null && payload.exp > Date.now();
};
