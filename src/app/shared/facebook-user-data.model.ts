export class FacebookUserData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  location: string;
  educationList: [{}];
  workList: [{}];

  constructor(id: string, first_name: string, last_name: string, email: string, location: string, educationList: [{}], workList: [{}]) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.location = location;
    this.educationList = educationList;
    this.workList = workList;
  }
}
