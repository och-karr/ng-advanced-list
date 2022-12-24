import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JobPostModel} from "../models/job-post.model";
import {Observable} from "rxjs";
import {JobTagModel} from "../models/job-tag.model";

@Injectable()
export class JobService {
  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<JobPostModel[]> {
    return this._httpClient.get<JobPostModel[]>('https://my-json-server.typicode.com/azosa/dbJobs/posts');
  }

  getJobTags(): Observable<JobTagModel[]> {
    return this._httpClient.get<JobTagModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/job-tags');
  }

  delete(id: string): Observable<JobPostModel> {
    return this._httpClient.delete<JobPostModel> (`https://636ce2d8ab4814f2b2712854.mockapi.io/job-posts/${id}`);
  }
}
