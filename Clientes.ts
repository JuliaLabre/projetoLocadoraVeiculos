class Cliente {
    private id:number
    private nome:string
    private cpf:number
    private carteiraHabilitacao:string

    constructor(id:number, nome:string, cpf:number, carteiraHabilitacao:string) {
      this.id = id;
      this.nome = nome;
      this.cpf = cpf;
      this.carteiraHabilitacao = carteiraHabilitacao;
    }
  }
  
  // Exemplo de uso da classe
  const cliente1 = new Cliente(1, "Maria Silva", 12345678901, "A");
  const cliente2 = new Cliente(2, "João Oliveira", 23456789012, "B");
  
  console.log(cliente1);
  console.log(cliente2);
  