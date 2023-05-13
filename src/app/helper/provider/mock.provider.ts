import { EmployeeAbstract } from "../abstract/employee.abstract";
import { LoginAbstract } from "../abstract/login.abstract";
import { MockEmployeeRepository } from "../repository/employee/mock/mock-employee.repository";
import { MockLoginRepository } from "../repository/login/mock/mock-login.repository";

export const mockProvider = [
  {
    provide: LoginAbstract,
    useClass: MockLoginRepository
  },
  {
    provide: EmployeeAbstract,
    useClass: MockEmployeeRepository
  }
]
