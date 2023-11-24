import * as promptSync from "prompt-sync";
const prompt = promptSync();

import { Locadora } from "./class/Locadora";

const locadora = new Locadora();

function exibirMenu(): void {
  console.log(`
    Menu:
    1. Cadastrar Cliente
    2. Cadastrar veículo
    3. Alugar veículo
    4. Devolver veículo
    5. Listar veículos disponíveis
    6. Listar veículos alugados
    7. Sair
    `);
}

function executarOpcao(opcao: number): void {
  switch (opcao) {
    case 1:
      const nome = prompt("Informe o nome do cliente: ");
      const cpf = prompt("Informe o CPF do cliente:");
      const habilitacao = prompt(
        "Informe o tipo de habilitação do cliente. A -Moto ou B -Carro :"
      );
      locadora.cadastrarCliente(nome, cpf, habilitacao);
      break;
    case 2:
      const tipo = prompt(
        "Informe o tipo do veículo. Digite o numero correspondente, 0 -Carro ou 1 -Moto : "
      );
      const placa = prompt("Informe a placa do veículo: ");
      locadora.cadastrarVeiculo(tipo, placa);
      break;
    case 3:
      const nomeDoClienteAluguel = prompt(
        "Informe o nome do cliente que deseja alugar um veiculo: "
      );
      const cpfDoClienteAluguel = prompt(
        "Informe o CPF do cliente que deseja alugar um veiculo: "
      );
      const diasAlugar = prompt("Informe a quantidade de dias para aluguel: ");
      locadora.alugarVeiculo(
        nomeDoClienteAluguel,
        cpfDoClienteAluguel,
        diasAlugar
      );
      break;
    case 4:
      const cpfDoClienteDevolução = prompt(
        "Informe o CPF do cliente que deseja devolver um veiculo: "
      );
      locadora.devolverVeiculo(cpfDoClienteDevolução);
      break;
    case 5:
      locadora.listarVeiculosDisponiveis();
      break;
    case 6:
      locadora.listarVeiculosAlugados();
      break;
    case 7:
      console.log("Saindo do sistema de locação");
      process.exit(0);
      break;
    default:
      console.log("Opção inválida.");
  }
}

// Loop principal
while (true) {
  exibirMenu();
  const opcao = parseInt(prompt("Escolha uma opção: "));

  executarOpcao(opcao);
}
