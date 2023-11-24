import { Cliente } from "./Cliente";
import { Veiculo } from "./Veiculo";

export default class Locacao {
  private id: number;
  private cliente: Cliente;
  private veiculo: Veiculo;
  private periodoLocacao: number;

  constructor(cliente: Cliente, veiculo: Veiculo, periodoLocacao: number) {
    this.cliente = cliente;
    this.veiculo = veiculo;
    this.periodoLocacao = periodoLocacao;
  }

  calcularValor(): number {
    return 0;
  }
}
