import {Routes} from '@angular/router';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {NewsComponent} from '../../pages/news/news.component';
import {NewsDetailsComponent} from '../../pages/news/news-details/news-details.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'globalNews', component: NewsComponent},
  {path: 'globalNews/:id', component: NewsDetailsComponent},
];
