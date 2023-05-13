import { group } from '../mock';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import * as moment from 'moment';
import { ConvertCurrencyInputDirectiveModule } from 'src/app/helper/directive/convert-currency-input.module';
import { CustomDateFormat } from 'src/app/helper/directive/custom-date-format';
import { DatePickerFormatModule } from 'src/app/helper/directive/date-picker-format.module';
import { UserData } from 'src/app/helper/domain/employee.model';
import { StoreService } from 'src/app/helper/service/store.service';
import { ValidatorService } from 'src/app/helper/service/validator.service';
import { EmployeeEditUsecase } from 'src/app/helper/usecase/employee/edit.usecase';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
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
    ConvertCurrencyInputDirectiveModule
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
export default class EditComponent implements OnInit {
  constructor(private validatorService: ValidatorService,
    private employeeEditUsecase: EmployeeEditUsecase,
    private router: Router,
    private storeService: StoreService,
    private route: ActivatedRoute) {

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
    id: new FormControl('', [Validators.required])
  })
  ngOnInit(): void {
    this.setData();
  }

  setData() {
    const id = this.route.snapshot.paramMap.get("id") as string;
    const data = this.storeService.getDetailEmployees(id) as UserData[];
    if (data.length > 0) {
      const user = data[0];
      const addForm = this.addForm.controls;
      addForm.username.setValue(user.username);
      addForm.firstName.setValue(user.firstName);
      addForm.lastName.setValue(user.lastName);
      addForm.email.setValue(user.email);
      addForm.birthDate.setValue(user.birthDate);
      addForm.basicSalary.setValue(String(user.basicSalary));
      addForm.status.setValue(user.status);
      addForm.group.setValue(user.group);
      addForm.description.setValue(user.description);
      addForm.id.setValue(user.id);
    } else {
      this.router.navigateByUrl('/employee')
    }
  }

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
      id: form.value.id
    }
    if (form.valid) {
      this.employeeEditUsecase.execute(params).subscribe(
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
