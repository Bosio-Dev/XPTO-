// Captura dos elementos do DOM
const checkboxes = document.querySelectorAll('.chk-servico');
const seletorOS = document.getElementById('select-os');
const displayTotal = document.getElementById('total-servico');
const btnFinalizar = document.getElementById('btn-finalizar');

// Função matemática que calcula o valor somando os inputs marcados
function calcularTotalServico() {
    let valorTotal = 0;

    // 1. Soma os valores dos checkboxes marcados
    checkboxes.forEach(chk => {
        if (chk.checked) {
            valorTotal += parseFloat(chk.getAttribute('data-preco'));
        }
    });

    // 2. Soma o valor do Sistema Operacional selecionado
    const opcaoSelecionada = seletorOS.options[seletorOS.selectedIndex];
    const precoOS = parseFloat(opcaoSelecionada.getAttribute('data-preco'));
    valorTotal += precoOS;

    // 3. Atualiza a interface gráfica do usuário
    displayTotal.innerText = valorTotal.toFixed(2);
}

// Dispara o alerta simulando o encerramento do pedido técnico
function processarFinalizacao() {
    let valorTotal = parseFloat(displayTotal.innerText);

    if (valorTotal === 0) {
        alert("Por favor, selecione ao menos um serviço para finalizar.");
        return;
    }

    alert(`Serviço registrado com sucesso!\nValor Total: R$ ${valorTotal.toFixed(2)}\n\nEsta funcionalidade será integrada ao banco de dados nas próximas etapas do seu repositório do GitHub!`);
}

// Vincula os escutadores de eventos de mudança de estado (Input Listeners)
checkboxes.forEach(chk => chk.addEventListener('change', calcularTotalServico));
seletorOS.addEventListener('change', calcularTotalServico);
btnFinalizar.addEventListener('click', processarFinalizacao);
