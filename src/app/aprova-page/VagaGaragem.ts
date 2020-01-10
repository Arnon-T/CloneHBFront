import { Colaborador } from '../profile/Colaborador';

export class VagaGaragem {
  id: number;
  tipoVeiculo: string;
  marca: {
    id: number;
    tipoVeiculo: string;
    nome: string;
  };
  vehicleModel: {
    id: number;
    fkMarca: {
      id: number;
      tipoVeiculo: string;
      nome: string;
    };
    modelo: string;
  };
  color: string;
  placa: string;
  periodo: {
    id: number;
    tipoVeiculo: string;
    dataInicial: [number];
    dataFinal: [number];
    descricao: string;
  };
  colaborador: Colaborador;
  statusVaga: string;
}
