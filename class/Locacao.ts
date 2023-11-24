import { Cliente } from "./Clientes"
import { Veiculo } from "./Veiculo"

export default class Locacao {
    protected id:number
    protected cliente:Cliente  
    protected veiculo:Veiculo
    protected periodoLocacao:number

    constructor(id:number, cliente:Cliente, veiculo:Veiculo, periodoLocacao:number) {
      this.id = id;
      this.cliente = cliente;
      this.veiculo = veiculo;
      this.periodoLocacao = periodoLocacao;
    }
  }