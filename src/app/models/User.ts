export interface User {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  logInDateDisplay: Date;
  joinDate: Date;
  profileImageUrl: string;
  active: boolean;
  notLocked: boolean;
  role: string;
  authorities: [];
}
