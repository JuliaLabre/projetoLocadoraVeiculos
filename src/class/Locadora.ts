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
    this.carregarDadosVeiculos();
    this.carregarDadosClientes();
    this.carregarDadosLocacoes();
  }

  carregarDadosClientes(): void {
    try {
      const clientesData = fs.readFileSync("./src/json/clientes.json", "utf-8");
      const baseClientes: { clientes: Cliente[] } = JSON.parse(clientesData);
      
      if (baseClientes && baseClientes.clientes && Array.isArray(baseClientes.clientes)) {
        this.clientes = baseClientes.clientes.map(({ id, nome, cpf, carteiraHabilitacao }) =>
          new Cliente(id, nome, cpf, carteiraHabilitacao)
        );
      }
    } catch (error) {
      console.log("Erro ao carregar dados:", error.message);
    }
  }
  carregarDadosVeiculos(): void {
    try {
      const veiculosData = fs.readFileSync("./src/json/veiculos.json", "utf-8");
      const baseVeiculos: { veiculos: Veiculo[] } = JSON.parse(veiculosData);
  
      if (baseVeiculos && baseVeiculos.veiculos && Array.isArray(baseVeiculos.veiculos)) {
        this.veiculos = baseVeiculos.veiculos.map(({ id, tipo, placa, alugado }) =>
          new Veiculo(id, tipo, placa, alugado)
        );
      }
    } catch (error) {
      console.log("Erro ao carregar dados:", error.message);
    }
  }
  
  carregarDadosLocacoes(): void {
    try {
      const locacoesData = fs.readFileSync("./src/json/locacoes.json", "utf-8");
      const baseLocacoes: { locacoes: Locacao[] } = JSON.parse(locacoesData);
  
      if (baseLocacoes && baseLocacoes.locacoes && Array.isArray(baseLocacoes.locacoes)) {
        this.locacoes = baseLocacoes.locacoes.map(({ cliente, veiculo, periodoLocacao, locacaoFinalizada }) =>
          new Locacao(cliente, veiculo, periodoLocacao, locacaoFinalizada)
        );
      }
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
      const cliente = this.clientes.find((cliente)=>cliente.getCpf===cpf);
    if (cliente) {
      if (!cliente.getVeiculoAlugado) {
        const tipoVeiculo =
          cliente.getCarteiraHabilitacao === "a" ? "moto" : "carro";
        console.log(this.veiculos[0].getAlugado);
        const veiculoDisponivel = this.veiculos.find(
          (veiculo) => !veiculo.getAlugado&& veiculo.getTipo === tipoVeiculo
        );
        console.log("imprima isso");
        console.log(veiculoDisponivel);
      
        if (veiculoDisponivel) {
          veiculoDisponivel.setAlugado = true;
          cliente.setVeiculoAlugado = veiculoDisponivel;
          const locacao = new Locacao(cliente, veiculoDisponivel, dias, false);
          console.log(locacao);
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

  cadastrarVeiculo(tipo: string, placa: string): void {
    const id = this.veiculos.length + 1;
    const veiculo = new Veiculo(id, tipo, placa, false);

    if (this.autenticarPlaca(veiculo) && this.autenticarTipo(veiculo)) {
      if (this.verificarAusenciaDeIdDuplicado(veiculo) && this.verificarAusenciaDePlacaDuplicada(veiculo)) {
        this.veiculos.push(veiculo); // Corrigir o método de push
        this.salvarDados();
      }
    }
  }

  listarVeiculosDisponiveis(): Veiculo[] {
    return this.veiculos.filter((veiculo) => !veiculo.getAlugado) || [];
  }

  listarVeiculosAlugados(): Veiculo[] {
    return this.veiculos.filter((veiculo) => veiculo.getAlugado)
  }

  devolverVeiculo(cpfDoClienteDevolucao:string): void {

    //finaliza a locacao
    const indexLocacao = Object.values(this.locacoes)
      .flat()
      .findIndex((locacao: any) => locacao.cliente.cpf.replace(/[^\d]/g, "") === cpfDoClienteDevolucao && !locacao.locacaoFinalizada);
    
    this.locacoes[indexLocacao].finalizaLocacao()
    
    //liberar o cliente
    var index = Object.values(this.clientes)
      .flat()
      .findIndex((pessoa: any) => pessoa.cpf.replace(/[^\d]/g, "") === cpfDoClienteDevolucao);
    
    this.clientes[index].setVeiculoAlugado = null

    //liberar o veiculo
    index = Object.values(this.veiculos)
    .flat()
    .findIndex((veiculo: any) => veiculo.placa === this.locacoes[indexLocacao].getVeiculo.getPlaca);
  
    this.veiculos[index].setAlugado = false
  }

}


const locadora = new Locadora();




export default Locadora;
