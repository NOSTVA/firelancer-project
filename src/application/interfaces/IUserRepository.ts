import { User } from "@domain/User";

export interface IUserRepository {
  save(user: User): Promise<boolean>;
  find(id: string): Promise<User | undefined>;
}
