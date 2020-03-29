import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NewsComponent} from '../../pages/news/news.component';
import {PrimeNGModule} from '../../prime-ng.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    PrimeNGModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    NewsComponent

    // RtlComponent
  ]
})
export class AdminLayoutModule {
}
