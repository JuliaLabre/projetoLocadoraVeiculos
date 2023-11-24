export class Cliente {
    private id:number
    private nome:string
    private cpf:string
    private carteiraHabilitacao:string

    constructor(id:number, nome:string, cpf:string, carteiraHabilitacao:string) {
      this.id = id;
      this.nome = nome;
      this.cpf = cpf;
      this.carteiraHabilitacao = carteiraHabilitacao;
    }
  }