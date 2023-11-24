import { Veiculo } from "./Veiculo";

export class Cliente {
  private id: number;
  private nome: string;
  private cpf: string;
  private carteiraHabilitacao: string;
  private veiculoAlugado: Veiculo | null;

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
    this.veiculoAlugado = null;
  }

  get getCarteiraHabilitacao(): string {
    return this.carteiraHabilitacao;
  }

  get getVeiculoAlugado(): Veiculo | null {
    return this.veiculoAlugado;
  }

  set setVeiculoAlugado(veiculo: Veiculo | null) {
    this.veiculoAlugado = veiculo;
  }
}
