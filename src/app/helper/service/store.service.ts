import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserData, filterUser } from "../domain/employee.model";

@Injectable()
export class StoreService {
  public employees = new BehaviorSubject<UserData[]>([]);
  currentEmployees = this.employees.asObservable();
  public newEmployee = new BehaviorSubject<UserData[]>([]);
  currentNewEmployees = this.newEmployee.asObservable();
  public searchString = new BehaviorSubject<filterUser>({
    email: '',
    username: ''
  });
  currentSearchString = this.searchString.asObservable();

  setSearch(user: filterUser) {
    this.searchString.next(user);
  }

  addEmployees(user: UserData[]) {
    let arr = this.employees.getValue();
    arr.unshift(...user);
    this.employees.next(arr);
  }

  getDetailEmployees(id: string) {
    let arr = this.employees.getValue();
    let filter = arr.filter((data) => data.id === id);
    return filter;
  }

  deleteEmployees(user: UserData) {
    let arr = this.employees.getValue();
    const index = arr.findIndex(data => data.id === user.id);
    arr.splice(index, 1);
    this.employees.next(arr);
  }

  addNewEmployees(user: UserData[]) {
    let arr = this.newEmployee.getValue();
    arr.unshift(...user);
    this.newEmployee.next(arr);
  }

  deleteNewEmployees() {
    this.newEmployee.next([]);
  }

  editEmployees(user: UserData) {
    let arr = this.employees.getValue();
    const index = arr.findIndex(data => data.id === user.id);
    console.log(arr);
    console.log(user);

    const data: UserData = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
      basicSalary: user.basicSalary,
      status: user.status,
      group: user.group,
      description: user.description,
      id: user.id
    }
    arr[index] = data;
    this.employees.next(arr);
  }
}
