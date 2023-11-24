export class Veiculo {
  private id: number;
  private tipo: string;
  private placa: string;
  private alugado: boolean;

  constructor(id: number, tipo: string, placa: string, alugado: boolean) {
    this.id = id;
    this.tipo = tipo;
    this.placa = placa;
    this.alugado = alugado;
  }

  get getIdVeiculo():number {
    return this.id
  }

  get getTipo():string {
    return this.tipo
  }

  get getAlugado(): boolean {
    return this.alugado;
  }

  set setAlugado(value: boolean) {
    this.alugado = value;
  }

  get getPlaca() {
    return this.placa;
  }
}

// Exemplo de uso da classe
const veiculo1 = new Veiculo(1, "carro", "ABC1D23", false);
const veiculo2 = new Veiculo(2, "moto", "DEF4G56", false);

console.log(veiculo1);
console.log(veiculo2);
