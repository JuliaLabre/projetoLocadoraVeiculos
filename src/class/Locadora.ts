import { Cliente } from "./Cliente";
import { Veiculo } from "./Veiculo";
import Locacao from "./Locacao";
import * as fs from "fs";
class Locadora {
  veiculos: Veiculo[];
  clientes: Cliente[];
  locacoes: Locacao[];

  constructor() {
    this.veiculos = [];
    this.clientes = [];
    this.locacoes = [];
    this.carregarDadosClientes();
    this.carregarDadosLocacoes();
  }

  carregarDadosClientes(): void {
    try {
      const clientesData = fs.readFileSync("./src/json/clientes.json", "utf-8");
      this.clientes = JSON.parse(clientesData).map(({ id, nome, cpf, habilitacao }) => new Cliente(id, nome, cpf, habilitacao));
    } catch (error) {
      console.log("Erro ao carregar dados:", error.message);
    }
  }

  carregarDadosVeiculos(): void {
    try {
      const veiculosData = fs.readFileSync("./src/json/veiculos.json", "utf-8");
      this.veiculos = JSON.parse(veiculosData);
    } catch (error) {
      console.log("Erro ao carregar dados:", error.message);
    }
  }

  carregarDadosLocacoes(): void {
    try {
      const locacoesData = fs.readFileSync("./src/json/locacoes.json", "utf-8");
      this.locacoes = JSON.parse(locacoesData);
    } catch (error) {
      console.log("Erro ao carregar dados:", error.message);
    }
  }

  cadastrarCliente(nome: string, cpf: string, habilitacao: string): void {
    if (cpf.length !== 11 || isNaN(Number(cpf))) {
      return console.log('CPF inválido')
    }
    
    if (!['a', 'b'].includes(habilitacao.toLowerCase())) {
      return console.log('Habilitação inválida')
    }
    
    const clienteExistente = this.clientes.find((cliente) => cliente.getCpf === cpf)
    
    if (clienteExistente) {
      return console.log('Cliente com este CPF já existe')
    }
    
    const novoId = this.clientes.length + 1
    const cliente = new Cliente(novoId, nome, cpf, habilitacao)
    this.clientes.push(cliente)
    this.salvarDados()
  }

  alugarVeiculo(nome: string, cpf: string, dias: number): void {
    const cliente = Object.values(this.clientes)
      .flat()
      .find((pessoa: any) => pessoa.cpf.replace(/[^\d]/g, "") === cpf);

    if (cliente) {
      if (!cliente.getVeiculoAlugado) {
        const tipoVeiculo =
          cliente.getCarteiraHabilitacao === "A" ? "moto" : "carro";

        const veiculoDisponivel = Object.values(this.veiculos).find(
          (veiculo) => !veiculo.getAlugado
        );

        if (veiculoDisponivel) {
          veiculoDisponivel.setAlugado = true;
          cliente.setVeiculoAlugado = veiculoDisponivel;
          const locacao = new Locacao(cliente, veiculoDisponivel, dias);
          this.locacoes.push(locacao);
          console.log(
            `${nome} alugou um ${tipoVeiculo} com placa ${veiculoDisponivel.getPlaca}.`
          );
          console.log(
            `Valor do aluguel: R$${locacao.calcularValor().toFixed(2)}`
          );
          this.salvarDados();
        } else {
          console.log(`Não há ${tipoVeiculo}s disponíveis para aluguel.`);
        }
      } else {
        console.log(`${nome} já está alugando um veículo.`);
      }
    } else {
      console.log(`Cliente com CPF ${cpf} não encontrado.`);
    }
  }

  salvarDados(): void {
    try {
      const veiculosData = JSON.stringify(this.veiculos, null, 2);
      const clientesData = JSON.stringify(this.clientes, null, 2);
      const locacoesData = JSON.stringify(this.locacoes, null, 2);

      fs.writeFileSync("./src/json/veiculos.json", veiculosData);
      fs.writeFileSync("./src/json/clientes.json", clientesData);
      fs.writeFileSync("./src/json/locacoes.json", locacoesData);
    } catch (error) {
      console.log("Erro ao salvar dados:", error.message);
    }
  }

  autenticarPlaca(veiculo: Veiculo):boolean {
    const regex = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';
    if (veiculo.getPlaca.match(regex)) {
    	return true;
    } else {
      console.log('Placa inválida');
      return false;
    }
  }

  autenticarTipo(veiculo: Veiculo):boolean {
    if (veiculo.getTipo.toUpperCase() === "CARRO" || veiculo.getTipo.toUpperCase() === "MOTO") {
      return true
    } else {
      console.log("Tipo de veículo inválido");
      return false;
    }
  }

  verificarAusenciaDePlacaDuplicada(veiculo: Veiculo):boolean {
    for (let i = 0; i <= this.veiculos.length; i++) {
      if (this.veiculos[i].getPlaca.toUpperCase() == veiculo.getPlaca) {
        console.log("Já existe um veículo com essa placa");
        return false;
      }
    }
    return true;
  }

  verificarAusenciaDeIdDuplicado(veiculo: Veiculo):boolean {
    for (let i = 0; i <= this.veiculos.length; i++) {
      if (this.veiculos[i].getIdVeiculo == veiculo.getIdVeiculo) {
        console.log("Já existe um veículo com esse id");
        return false;
      }
    }
    return true;
  }

  cadastrarVeiculo(tipo: string, placa: string) {
    const id = this.veiculos.length + 1
    const veiculo = new Veiculo(id, tipo, placa, false)
    if (this.autenticarPlaca(veiculo) && this.autenticarTipo(veiculo)) {
      if (this.verificarAusenciaDeIdDuplicado(veiculo) && this.verificarAusenciaDePlacaDuplicada(veiculo)) {
        this.veiculos.push;
      }
    }
  }
}

export default Locadora;
