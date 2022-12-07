import { IUser } from './user.interface';

export interface UserDetails {
  basics: IUser;
  projects: [
    {
      projectId: number;
      name: string;
    },
  ];
}
