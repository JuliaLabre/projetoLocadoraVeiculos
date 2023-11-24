import { Cliente } from "./Clientes"
import { Veiculo } from "./Veiculo"

export default class Locacao {
    private id:number
    private cliente:Cliente  
    private veiculo:Veiculo
    private periodoLocacao:number

    constructor(id:number, cliente:Cliente, veiculo:Veiculo, periodoLocacao:number) {
      this.id = id;
      this.cliente = cliente;
      this.veiculo = veiculo;
      this.periodoLocacao = periodoLocacao;
    }
  }