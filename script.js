let salario = 0;
let gastos = [];

function adicionarGasto() {
    const nomeGasto = document.getElementById('gasto-nome').value;
    const valorGasto = parseFloat(document.getElementById('gasto-valor').value);
    
    if (!nomeGasto || isNaN(valorGasto) || valorGasto <= 0) {
        alert('Por favor, insira um nome e um valor válido para o gasto.');
        return;
    }

    // Adiciona o gasto ao array
    gastos.push({ nome: nomeGasto, valor: valorGasto });
    atualizarTabela();
    atualizarSaldo();

    // Limpa os campos de input
    document.getElementById('gasto-nome').value = '';
    document.getElementById('gasto-valor').value = '';
}

function atualizarTabela() {
    const tabela = document.getElementById('gastos-table').getElementsByTagName('tbody')[0];
    tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os novos valores

    gastos.forEach((gasto, index) => {
        const row = tabela.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        
        cell1.innerHTML = gasto.nome;
        cell2.innerHTML = `R$ ${gasto.valor.toFixed(2)}`;
        cell3.innerHTML = `
            <button onclick="editarGasto(${index})"><i class="fas fa-edit"></i> Editar</button>
            <button onclick="removerGasto(${index})"><i class="fas fa-trash"></i> Remover</button>
        `;
    });
}

function removerGasto(index) {
    gastos.splice(index, 1);
    atualizarTabela();
    atualizarSaldo();
}

function editarGasto(index) {
    const gasto = gastos[index];
    document.getElementById('gasto-nome').value = gasto.nome;
    document.getElementById('gasto-valor').value = gasto.valor;

    // Quando o usuário clica em editar, o botão de "adicionar gasto" será alterado para "Atualizar Gasto"
    const botaoAdicionar = document.querySelector('button');
    botaoAdicionar.textContent = 'Atualizar Gasto';
    botaoAdicionar.setAttribute('onclick', `atualizarGasto(${index})`);
}

function atualizarGasto(index) {
    const nomeGasto = document.getElementById('gasto-nome').value;
    const valorGasto = parseFloat(document.getElementById('gasto-valor').value);
    
    if (!nomeGasto || isNaN(valorGasto) || valorGasto <= 0) {
        alert('Por favor, insira um nome e um valor válido para o gasto.');
        return;
    }

    // Atualiza o gasto no array
    gastos[index] = { nome: nomeGasto, valor: valorGasto };
    
    // Restaura o texto do botão de volta para "Adicionar Gasto"
    const botaoAdicionar = document.querySelector('button');
    botaoAdicionar.textContent = 'Adicionar Gasto';
    botaoAdicionar.setAttribute('onclick', 'adicionarGasto()');
    
    // Atualiza a tabela e o saldo
    atualizarTabela();
    atualizarSaldo();

    // Limpa os campos de input
    document.getElementById('gasto-nome').value = '';
    document.getElementById('gasto-valor').value = '';
}

function atualizarSaldo() {
    const salarioInput = document.getElementById('salario');
    salario = parseFloat(salarioInput.value);

    if (isNaN(salario) || salario <= 0) {
        document.getElementById('saldo').innerText = 'R$ 0.00';
        return;
    }

    let totalGastos = gastos.reduce((acc, curr) => acc + curr.valor, 0);
    let saldoRestante = salario - totalGastos;
    document.getElementById('saldo').innerText = `R$ ${saldoRestante.toFixed(2)}`;
}
