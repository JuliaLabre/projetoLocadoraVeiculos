import * as fs from 'fs';

import { Cliente } from "./Clientes";
import { Veiculo } from "./Veiculo"

export class Locadora {
    protected clientes: Cliente
    protected veiculos: Veiculo


    static listarVeiculosAlugados(){
        const content = fs.readFileSync('./json./veiculos.json', 'utf-8');
        const veiculosTotais = JSON.parse(content);
        return veiculosTotais
    
    }
}

listarVeiculosAlugados(Veiculo)