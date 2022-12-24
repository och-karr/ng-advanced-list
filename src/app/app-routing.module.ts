import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdvancedJobListComponent } from './components/advanced-job-list/advanced-job-list.component';
import { AdvancedJobListComponentModule } from './components/advanced-job-list/advanced-job-list.component-module';
import { JobServiceModule } from './services/job.service-module';

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'advanced-job-list', component: AdvancedJobListComponent }]), AdvancedJobListComponentModule, JobServiceModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
