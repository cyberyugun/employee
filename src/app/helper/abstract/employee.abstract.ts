import { Observable } from "rxjs";
import { HttpEmployeeAddCollectionResponse, HttpEmployeeCollectionResponse } from "../repository/employee/employee-collection.response";
import { UserData, filterUser } from "../domain/employee.model";

export abstract class EmployeeAbstract {
  abstract List(params: filterUser): Observable<HttpEmployeeCollectionResponse>;
  abstract Add(params: UserData): Observable<HttpEmployeeAddCollectionResponse>;
  abstract Edit(params: UserData): Observable<HttpEmployeeAddCollectionResponse>;
}
