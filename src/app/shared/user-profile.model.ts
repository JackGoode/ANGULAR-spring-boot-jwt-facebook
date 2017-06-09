export class UserProfile {
  last_name: string;
  first_name: string;
  username: string;

  constructor(last_name: string, first_name: string, username: string) {
    this.last_name = last_name;
    this.first_name = first_name;
    this.username = username;
  }
}
