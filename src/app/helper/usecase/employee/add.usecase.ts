import { Observable } from "rxjs";
import { Usecase } from "../../base/usecase";
import { Injectable } from "@angular/core";
import { UserData } from "../../domain/employee.model";
import { HttpEmployeeAddCollectionResponse } from "../../repository/employee/employee-collection.response";
import { EmployeeAbstract } from "../../abstract/employee.abstract";


@Injectable({
  providedIn: "root"
})
export class EmployeeAddUsecase implements Usecase<UserData, HttpEmployeeAddCollectionResponse> {
  constructor(private repository: EmployeeAbstract) {}
  execute(params: UserData): Observable<HttpEmployeeAddCollectionResponse> {
    return this.repository.Add(params);
  }
}
