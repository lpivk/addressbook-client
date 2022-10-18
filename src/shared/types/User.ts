export type User = {
  token: string;
  details: {
    _id: string;
    username: string;
    email: string;
    isActive: boolean;
    role?: string;
    createdAt?: Date;
  };
};
