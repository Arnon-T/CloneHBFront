import { VagaGaragem } from './VagaGaragem';
import { PeriodoDTO } from './PeriodoDTO';
import { VagaInfoDTO } from './VagaInfoDTO';

export class VagaContent {
  vagaGaragemPage: {
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
  };
  periodoDTO: PeriodoDTO;
  vagaInfoDTO: VagaInfoDTO;
  periodosDTOOfVehicleType: PeriodoDTO[];
}
