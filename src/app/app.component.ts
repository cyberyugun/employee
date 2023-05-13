import { Component, Provider } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { CoreModule } from './helper/core.module';
import { mockProvider } from './helper/provider/mock.provider';


const DataService:  Provider[] = mockProvider;

export const NB_CORE_PROVIDERS = [...DataService];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export default class AppComponent {
  title = 'employee';
}
