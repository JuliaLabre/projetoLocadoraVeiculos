interface Veiculo {
  id: number;
  tipo: string;
  placa: string;
  alugado: boolean;
}

class Locadora {
  private veiculos: Veiculo[]; 

  constructor() {
    this.veiculos = [];
  }

  
  adicionarVeiculo(veiculo: Veiculo): void {
    this.veiculos.push(veiculo);
  }

  
  listarVeiculosDisponiveis(): Veiculo[] {
    return this.veiculos.filter((veiculo) => !veiculo.alugado);
  }

  
  carregarVeiculosDeArquivo(): void {
    const veiculosDoArquivo = require('../json/veiculos.json') as Veiculo[];

    veiculosDoArquivo.forEach((veiculo) => this.adicionarVeiculo(veiculo));
  }
}


const locadora = new Locadora();

locadora.carregarVeiculosDeArquivo();

const veiculosDisponiveis = locadora.listarVeiculosDisponiveis();

console.log('Veículos Disponíveis:');
veiculosDisponiveis.forEach((veiculo) => {
  console.log(`ID: ${veiculo.id}, Tipo: ${veiculo.tipo}, Placa: ${veiculo.placa}, Alugado: ${veiculo.alugado}`);
});
