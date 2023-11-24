import { Cliente } from "./Cliente";
import { Veiculo } from "./Veiculo";
import Locacao from "./Locacao";
import * as fs from "fs";
class Locadora {
  veiculos: { [placa: string]: Veiculo };
  clientes: { [cpf: string]: Cliente };
  locacoes: Locacao[];

  constructor() {
    this.veiculos = {};
    this.clientes = {};
    this.locacoes = [];
    this.carregarDadosClientes();
    this.carregarDadosLocacoes();
  }

  carregarDadosClientes(): void {
    try {
      const clientesData = fs.readFileSync("./src/json/clientes.json", "utf-8");
      this.clientes = JSON.parse(clientesData);
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

  alugarVeiculo(nome: string, cpf: string, dias: number): void {
    const cliente = Object.values(this.clientes)
      .flat()
      .find(
        (pessoa: any) =>
          pessoa.cpf.replace(/[^\d]/g, "") === cpf && pessoa.nome === nome
      );

    if (cliente) {
      const possuiVeiculoAlugado = cliente.getVeiculoAlugado;
      console.log(possuiVeiculoAlugado);
      if (!possuiVeiculoAlugado) {
        const tipoVeiculo =
          cliente.getCarteiraHabilitacao === "A" ? "moto" : "carro";

        const veiculoDisponivel = Object.values(this.veiculos).find(
          (veiculo) => !veiculo.getAlugado
        );

        if (veiculoDisponivel) {
          const veiculoParaAluguel = Object.values(veiculoDisponivel).find(
            (veiculo) => veiculo.alugado === false
          );
          veiculoParaAluguel.alugado = true;
          const locacao = new Locacao(cliente, veiculoParaAluguel, dias);

          this.locacoes.push(locacao);
          cliente.setVeiculoAlugado = true;
          console.log(this.locacoes);
          console.log(
            `${nome} alugou um ${tipoVeiculo} com placa ${veiculoParaAluguel.placa}.`
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
}

export default Locadora;
