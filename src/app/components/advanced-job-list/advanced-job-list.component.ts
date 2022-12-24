import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable, of, Subject, switchMap} from "rxjs";
import {JobPostModel} from "../../models/job-post.model";
import {JobService} from "../../services/job.service";
import {JobTagModel} from "../../models/job-tag.model";

@Component({
  selector: 'app-advanced-job-list',
  styleUrls: ['./advanced-job-list.component.scss'],
  templateUrl: './advanced-job-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedJobListComponent {
  constructor(private _jobService: JobService) {
  }

  private _orderSubject: BehaviorSubject<string> = new BehaviorSubject<string>('asc');
  public order$: Observable<string> = this._orderSubject.asObservable();
  private _tagsSubject: Subject<string[]> = new Subject<string[]>();
  public tags$: Observable<string[]> = this._tagsSubject.asObservable();

  readonly jobPosts$: Observable<JobPostModel[]> = combineLatest([
    this._jobService.getAll(),
    this.order$,
    this.tags$
  ]).pipe(
    map(([jobPosts, order, tags]: [JobPostModel[], string,string[]]) => {
      return jobPosts
        .filter
          ((jobPosts: JobPostModel)=>jobPosts.jobTagIds.some( i => tags.includes(i) ))
        .sort((a, b) => {
          if (a.title < b.title) { return order === 'asc' ? 1 : -1; }
          if (a.title > b.title) { return order === 'asc' ? -1 : 1; }
          return 0;
      })
    })
  )

  public orders: Observable<string[]> = of(['asc', 'desc']);
  readonly jobTags$: Observable<JobTagModel[]> = this._jobService.getJobTags();

  private _refreshSubject: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);
  public refresh$: Observable<void> = this._refreshSubject.asObservable();
  readonly refreshedList$: Observable<JobPostModel[]> = this.refresh$.pipe(switchMap(data => this.jobPosts$));

  selectedOptions: any;
  public tags : string[] = [];

  sort(order: string): void {
    this._orderSubject.next(order);
  }

  remove(id: string): void {
    this._jobService.delete(id).subscribe();
  }

  change($event: string[]) {
    this.tags = $event;
    this._tagsSubject.next(this.tags);
    console.log($event);
  }
}
