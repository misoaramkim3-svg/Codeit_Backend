export type UserType = {
  id: number;
  email: string;
  password: string;
  username: string;
  createdAt: string;
};

export type MemoRecordType = {
  id: number;
  userId: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
};
