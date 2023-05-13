import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserData } from 'src/app/helper/domain/employee.model';
import { ConvertCurrencyInputPipesModule } from 'src/app/helper/pipes/convert-currency-input.module';
import { ConvertCurrencyInputPipe } from 'src/app/helper/pipes/convert-currency-input.pipe';
import { StoreService } from 'src/app/helper/service/store.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ConvertCurrencyInputPipesModule
  ]
})
export default class DetailComponent implements OnInit {
  user!: UserData;
  constructor(
    private router: Router,
    private storeService: StoreService,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.setData();
  }

  setData() {
    const id = this.route.snapshot.paramMap.get("id") as string;
    const data = this.storeService.getDetailEmployees(id) as UserData[];
    if (data.length > 0) {
      this.user = data[0];
    } else {
      this.router.navigateByUrl('/employee')
    }
  }

  convert(value: number) {
    const pipes = new ConvertCurrencyInputPipe();
    return pipes.transform(String(value));
  }
}
