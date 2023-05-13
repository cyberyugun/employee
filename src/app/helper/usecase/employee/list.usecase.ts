import { Observable } from "rxjs";
import { LoginAbstract } from "../../abstract/login.abstract";
import { Usecase } from "../../base/usecase";
import { Login } from "../../domain/login.model";
import { HttpLoginCollectionResponse } from "../../repository/login/login-collection.response";
import { Injectable } from "@angular/core";
import { filterUser } from "../../domain/employee.model";
import { HttpEmployeeCollectionResponse } from "../../repository/employee/employee-collection.response";
import { EmployeeAbstract } from "../../abstract/employee.abstract";


@Injectable({
  providedIn: "root"
})
export class EmployeeListUsecase implements Usecase<filterUser, HttpEmployeeCollectionResponse> {
  constructor(private repository: EmployeeAbstract) {}
  execute(params: filterUser): Observable<HttpEmployeeCollectionResponse> {
    return this.repository.List(params);
  }
}
