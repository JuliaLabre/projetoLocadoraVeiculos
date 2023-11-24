import { Cliente } from "./Cliente";
import { Veiculo } from "./Veiculo";
import fs from "fs";

export class Locadora {
  private clientes: Cliente[];
  private veiculos: Veiculo[];

  constructor(clientes: Cliente[], veiculos: Veiculo[]) {
    this.clientes = clientes;
    this.veiculos = veiculos;
  }

  carregarVeiculos() {
    const jsonVeiculos: string = fs.readFileSync('./json/veiculos.json', 'utf-8');
    this.veiculos = JSON.parse(jsonVeiculos);
  }

  listarVeiculos() {
    this.carregarVeiculos;
    console.log(this.veiculos);
  }

  autenticarPlaca(veiculo: Veiculo):boolean {
    const regex = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';
    if (veiculo.getPlaca().match(regex)) {
    	return true;
    } else {
      console.log('Placa inválida');
      return false;
    }
  }

  autenticarTipo(veiculo: Veiculo):boolean {
    if (veiculo.getTipo().toUpperCase() === "CARRO" || veiculo.getTipo().toLowerCase() === "MOTO") {
      return true
    } else {
      console.log("Tipo inválido");
      return false;
    }
  }

  verificarAusenciaDePlacaDuplicada(veiculo: Veiculo):boolean {
    for (let i = 0; i <= this.veiculos.length; i++) {
      if (this.veiculos[i].getPlaca().toUpperCase() == veiculo.getPlaca()) {
        console.log("Já existe um veículo com essa placa");
        return false;
      }
    }
    return true;
  }

  retornaProximoId():number {
    return this.veiculos.length+1
  }

  cadastrarVeiculo(veiculo:Veiculo) {
    if (this.autenticarPlaca(veiculo) && this.autenticarTipo(veiculo)) {
      if (this.verificarAusenciaDePlacaDuplicada(veiculo)) {
        this.veiculos.push;
      }
    }
  }
}
