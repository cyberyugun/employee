import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ValidatorService } from 'src/app/helper/service/validator.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatePickerFormatModule } from 'src/app/helper/directive/date-picker-format.module';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { group } from '../mock';
import { ConvertCurrencyInputDirectiveModule } from 'src/app/helper/directive/convert-currency-input.module';
import { EmployeeAddUsecase } from 'src/app/helper/usecase/employee/add.usecase';
import { UserData } from 'src/app/helper/domain/employee.model';
import { v4 as uuidv4 } from 'uuid';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CustomDateFormat } from 'src/app/helper/directive/custom-date-format';
import * as moment from 'moment';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    DatePickerFormatModule,
    MatNativeDateModule,
    ConvertCurrencyInputDirectiveModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useClass: CustomDateFormat
    }
  ]
})
export default class AddComponent {
  constructor(private validatorService: ValidatorService,
    private employeeAddUsecase: EmployeeAddUsecase,
    private router: Router) {

  }
  groupList = group;
  addForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, this.validatorService.emailValidator]),
    birthDate: new FormControl('', [Validators.required]),
    basicSalary: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  errorValidator(err: ValidationErrors | null, params: string) {
    if (err) {
      return err[params];
    }
    return false;
  }

  onSubmit(form: FormGroup) {
    const format1 = "YYYY-MM-DD HH:mm:ss"
    const date =  moment(form.value.birthDate).format(format1);
    const params: UserData = {
      username: form.value.username,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      birthDate: date,
      basicSalary: form.value.basicSalary,
      status: form.value.status,
      group: form.value.group,
      description: form.value.description,
      id: uuidv4()
    }
    if (form.valid) {
      this.employeeAddUsecase.execute(params).subscribe(
        (_) => {
          this.router.navigateByUrl('/employee');
        }
      )
    }
  }

  maxChooseDatePicker() {
    const today = new Date();
    return today;
  }
}
