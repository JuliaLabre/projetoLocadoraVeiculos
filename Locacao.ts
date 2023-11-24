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
    calcularValorLocacao(valorDiaria: number): number {  
    let acrescimoTipoVeiculo: number;
    
    if (this.veiculo.getTipo() === 'Moto') {
      acrescimoTipoVeiculo = 0.05;
    } else if(this.veiculo.getTipo() === 'Carro') {
      acrescimoTipoVeiculo = 0.1;
    } else {
      console.error("Tipo de veiculo inválido")
      return 0;
    }

    const valorAluguel = (valorDiaria * this.periodoLocacao) +  acrescimoTipoVeiculo;
    return valorAluguel
      
    }

    getIdLocacao(){
      return this.id;
    }
    getCliente(){
      return this.id;
    }
    getVeiculo(){
      return this.veiculo;
    }
    getPeriodoLocacao(){
      return this.periodoLocacao;
    }
    }
  