import { IPagination } from '../interfaces';

export class PaginatedResult<T> {
  items?: T; //Members[]
  pagination?: IPagination;
}
