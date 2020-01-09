import { VagaGaragem } from './VagaGaragem';

export class VagaGaragemPageable {
  content: VagaGaragem[];
  pageable: {
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  first: boolean;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}
