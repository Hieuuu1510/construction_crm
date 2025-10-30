import { IntegerEntity } from "./common/baseEntity.interface";

export interface IUser extends IntegerEntity {
  email?: string;
  password?: string;
  username?: string;
}
