import { Cliente } from "./Cliente";
import { Veiculo } from "./Veiculo";

export default class Locacao {
  private id: number;
  private cliente: Cliente;
  private veiculo: Veiculo;
  private periodoLocacao: number;
  private locacaoFinalizada: boolean;

  constructor(cliente: Cliente, veiculo: Veiculo, periodoLocacao: number, locacaoFinalizada: boolean) {
    this.cliente = cliente;
    this.veiculo = veiculo;
    this.periodoLocacao = periodoLocacao;
    this.locacaoFinalizada = locacaoFinalizada;
  }

  finalizaLocacao() {
    this.locacaoFinalizada = true;
  }

  get getVeiculo(): Veiculo{
    return this.veiculo
  }

  calcularValor(): number {
    return 0;
  }
}
