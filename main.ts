import { Cliente } from "./Clientes";
import { Veiculo } from "./Veiculo";
import Locacao from "./Locacao";
import * as readlineSync from 'readline-sync';

function criarCliente(): Cliente {
  const nome = readlineSync.question("Digite seu nome: ");
  const cpf = readlineSync.question("Digite seu CPF : ");
  const tipoCarteira = readlineSync.question("Digite o tipo de carteira do cliente: ");

  return new Cliente(1,nome, cpf, tipoCarteira);
}

function criarVeiculo(): Veiculo {
  const idVeiculo = readlineSync.questionInt("Digite o ID do veiculo: ");
  const tipoVeiculo = readlineSync.question("Digite o tipo de veiculo (Carro/Moto): ");
  const placaVeiculo = readlineSync.question("Digite a placa do veiculo: ");
  const alugado = readlineSync.keyInYNStrict("O veículo esti alugado?");

  return new Veiculo(idVeiculo, tipoVeiculo, placaVeiculo, alugado);
}

function main() {
  
  const cliente = criarCliente();

 
  const veiculo = criarVeiculo();

  
  const periodoLocacao = readlineSync.questionInt("Digite o periodo de locacao (em dias): ");
  const locacao = new Locacao(1, cliente, veiculo, periodoLocacao);

 
  const valorDiaria = readlineSync.questionFloat("Digite o valor da diaria: ");
  const valorAluguel = locacao.calcularValorLocacao(valorDiaria);
 
  console.log(`O valor do aluguel é: ${valorAluguel}`);
}

main();
