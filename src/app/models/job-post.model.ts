export interface JobPostModel {
  readonly title: string;
  readonly description: string;
  readonly id: string;
  readonly jobTagIds: Array<string>;
}
