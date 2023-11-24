export class Veiculo {
    protected id:number
    protected tipo:string  
    protected placa:string
    public alugado:boolean

    constructor(id:number, tipo:string, placa:string, alugado:boolean) {
      this.id = id;
      this.tipo = tipo;
      this.placa = placa;
      this.alugado = alugado;
    }
    
  }
  
  // Exemplo de uso da classe
  const veiculo1 = new Veiculo(1,
  "carro", "ABC1D23", false);
  const veiculo2 = new Veiculo(2, "moto", "DEF4G56", false);
  
  console.log(veiculo1);
  console.log(veiculo2);
  
  
