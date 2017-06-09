
import {UserData} from "./user-data.model";
export class UserService {
  users: UserData[] = [];

  addUser(entry: UserData) {
    console.log(entry);
    this.users.push(entry);
  }

}
