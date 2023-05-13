import { NgModule } from "@angular/core";
import AppComponent from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.route";
import { CoreModule } from "./helper/core.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { StoreService } from "./helper/service/store.service";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    CoreModule.forRoot(),
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
