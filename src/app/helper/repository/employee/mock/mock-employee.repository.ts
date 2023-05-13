import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EmployeeAbstract } from "src/app/helper/abstract/employee.abstract";
import { environment } from "src/environments/environment";
import { HttpEmployeeAddCollectionResponse, HttpEmployeeCollectionResponse } from "../employee-collection.response";
import { Observable, map, of } from "rxjs";
import { UserData, filterUser } from "src/app/helper/domain/employee.model";
import { StoreService } from "src/app/helper/service/store.service";

@Injectable({
  providedIn: 'root'
})
export class MockEmployeeRepository implements EmployeeAbstract {
  constructor(private http: HttpClient,
    private storeService: StoreService) {}

  responseSuccess: HttpEmployeeAddCollectionResponse = {
    code: 200,
    message: "success",
    meta: undefined,
    data: ""
  }
  dataSuccess: Observable<HttpEmployeeAddCollectionResponse> = of(this.responseSuccess);
  List(params: filterUser): Observable<HttpEmployeeCollectionResponse> {
    const url = `${environment.apiUrl}/assets/json/employees.json`;
    return this.http.get<HttpEmployeeCollectionResponse>(url)
    .pipe(map((data) => {
      let filter = data;
      if (params.username) {
        filter = filter.filter((e: filterUser) => (e.username.toLowerCase()).includes(params.username.toLowerCase()));
      }
      if (params.email) {
        filter = filter.filter((e: filterUser) => (e.email.toLowerCase()).includes(params.email.toLowerCase()));
      }
      return filter;
    }));
  }
  Add(params: UserData): Observable<HttpEmployeeAddCollectionResponse> {
    this.storeService.addNewEmployees([params]);
    return of(this.responseSuccess);
  }
  Edit(params: UserData): Observable<HttpEmployeeAddCollectionResponse> {
    this.storeService.editEmployees(params);
    return of(this.responseSuccess);
  }
}

