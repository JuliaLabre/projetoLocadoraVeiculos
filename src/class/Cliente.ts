import { Veiculo } from "./Veiculo";

export class Cliente {
  private id: number;
  private nome: string;
  private cpf: string;
  private carteiraHabilitacao: string;
  private veiculoAlugado: boolean;

  constructor(
    id: number,
    nome: string,
    cpf: string,
    carteiraHabilitacao: string
  ) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.carteiraHabilitacao = carteiraHabilitacao;
    this.veiculoAlugado = false;
  }

  get getCpf(): string {
    return this.cpf;
  }

  get getCarteiraHabilitacao(): string {
    return this.carteiraHabilitacao;
  }

  get getVeiculoAlugado(): boolean {
    return this.veiculoAlugado;
  }

  set setVeiculoAlugado(status: boolean) {
    this.veiculoAlugado = status;
  }
}
