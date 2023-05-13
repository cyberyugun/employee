import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'src/app/theme/table/table.module';
import { DisplayedColumns, HeaderTitle, HeaderType, Width } from './mock';
import { UserData, filterUser } from 'src/app/helper/domain/employee.model';
import { EmployeeListUsecase } from 'src/app/helper/usecase/employee/list.usecase';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreService } from 'src/app/helper/service/store.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    TableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export default class ListComponent implements OnInit {
  width = Width;
  displayedColumns = DisplayedColumns;
  headerType = HeaderType;
  headerTitle = HeaderTitle;
  idTable = 'submission_id';
  list: UserData[] = [];
  count: number = 0;
  pagenum: number = 1;
  filterForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('')
  })
  constructor(private router: Router,
    private employeeListUsecase: EmployeeListUsecase,
    private storeService: StoreService) {}
  ngOnInit(): void {
    this.setFormSearch();
    this.getData();
  }

  setFormSearch() {
    const data = this.storeService.searchString.getValue() as filterUser;
    this.filterForm.controls.email.setValue(data.email);
    this.filterForm.controls.username.setValue(data.username);
  }

  LinkAction(event: UserData) {
    this.router.navigateByUrl(`/employee/detail/${event.id}`);
  }

  DeleteAction(event: UserData) {
    const params: filterUser = {
      username: (this.filterForm.controls.username.value) ?? '',
      email: (this.filterForm.controls.email.value) ?? ''
    }
    this.storeService.deleteEmployees(event);
    const data = this.storeService.employees.getValue();
    if (data.length > 0) {
      this.list = data;
      this.list = this.filterData(this.list, params);
    }
  }

  EditAction(event: UserData) {
    this.router.navigateByUrl(`/employee/edit/${event.id}`);
  }

  getData() {
    const params: filterUser = {
      username: (this.filterForm.controls.username.value) ?? '',
      email: (this.filterForm.controls.email.value) ?? ''
    }
    this.storeService.setSearch(params);
    this.employeeListUsecase.execute(params).subscribe(
      (response) => {
        const data = this.storeService.employees.getValue();
        const filter = this.checkNotExistValue(response, data);
        this.storeService.addEmployees([...filter]);
        this.list = data;
        this.setNewData(data);
        if (this.filterForm.controls.username.value || this.filterForm.controls.email.value) {
          this.list = this.filterData(this.list, params);
        }
        this.count = this.list.length;
      }
    )
  }

  setNewData(data: UserData[]) {
    const newData = this.storeService.newEmployee.getValue();
    if (newData.length > 0) {
      const newDataFilter = this.checkNotExistValue(data, newData);
      this.storeService.addEmployees([...newDataFilter]);
      this.storeService.deleteNewEmployees();
      if (this.storeService.employees.getValue().length > 0) {
        this.list = this.storeService.employees.getValue();
      }
    }
  }

  filterData(data: UserData[], params: filterUser) {
    let filter = data;
    if (params.username) {
      filter = filter.filter((e: filterUser) => (e.username.toLowerCase()).includes(params.username.toLowerCase()));
    }
    if (params.email) {
      filter = filter.filter((e: filterUser) => (e.email.toLowerCase()).includes(params.email.toLowerCase()));
    }
    return filter;
  }

  checkNotExistValue(res: UserData[], existValue: UserData[]) {
    let arr: UserData[] = [];
    if (res.length > 0 && existValue.length > 0) {
      let minArr = existValue;
      let maxArr = res;
      if (existValue.length > res.length) {
        minArr = res;
        maxArr = existValue;
      }

      minArr.forEach((item) => {
        const found = maxArr.find((elem) => elem.id === item.id);
        if (!found) {
          arr.push(item);
        }
      });
    }  else {
      arr.push(...res);
    }
    return arr;
  }
}
