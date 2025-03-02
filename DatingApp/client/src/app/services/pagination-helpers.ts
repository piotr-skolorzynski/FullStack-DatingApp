import { signal } from '@angular/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { PaginatedResult } from '../models';

export const setPaginationHeaders = (
  pageNumber: number,
  pageSize: number
): HttpParams => {
  let params = new HttpParams();

  if (pageNumber && pageSize) {
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);
  }

  return params;
};

export const setPaginatedResponse = <T>(
  response: HttpResponse<T>,
  paginatedResultSignal: ReturnType<typeof signal<PaginatedResult<T> | null>>
): void => {
  paginatedResultSignal.set({
    items: response.body as T,
    pagination: JSON.parse(response.headers.get('Pagination')!),
  });
};
