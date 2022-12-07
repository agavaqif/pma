import { UserRole } from '../enums/user-role';

export class UserModel {
  userId!: number;
  // fullName!: string;
  firstName: string;
  lastName: string;
  email!: string;
  photoUrl!: string;
  phoneNumber!: string;
  role!: UserRole;
}