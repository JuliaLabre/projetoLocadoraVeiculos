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
