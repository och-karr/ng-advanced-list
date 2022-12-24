import { NgModule } from '@angular/core';
import { AdvancedJobListComponent } from './advanced-job-list.component';
import {MatListModule} from "@angular/material/list";
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  imports: [
    MatListModule,
    FormsModule,
    NgForOf,
    AsyncPipe,
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [AdvancedJobListComponent],
  providers: [],
  exports: [AdvancedJobListComponent]
})
export class AdvancedJobListComponentModule {
}
