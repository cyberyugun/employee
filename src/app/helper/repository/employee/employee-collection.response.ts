import { UserData } from "../../domain/employee.model";
import { HttpResponseEntity } from "../http-reposponse.entity";

export type HttpEmployeeCollectionResponse = UserData[];

export type HttpEmployeeAddCollectionResponse = HttpResponseEntity<string>;
