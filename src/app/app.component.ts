import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ]
})
export default class AppComponent {
  title = 'employee';
}
