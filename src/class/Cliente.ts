import { Veiculo } from "./Veiculo";

export class Cliente {
  public id: number;
  public nome: string;
  public cpf: string;
  public carteiraHabilitacao: string;
  public veiculoAlugado: Veiculo | null;

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

  get getCpf(): string {
    return this.cpf;
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
