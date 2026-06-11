console.log("carrinho.js carregado");

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarAoCarrinho(nomeProduto) {
    const produto = PRODUTOS_LOJA.find(p => p.nome === nomeProduto);

    if (!produto) return;

    const item = carrinho.find(i => i.nome === produto.nome);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    salvarCarrinho();
    atualizarContador();
    renderizarCarrinho();
}

function removerDoCarrinho(nomeProduto) {
    carrinho = carrinho.filter(item => item.nome !== nomeProduto);

    salvarCarrinho();
    atualizarContador();
    renderizarCarrinho();
}

function alterarQuantidade(nomeProduto, valor) {
    const item = carrinho.find(i => i.nome === nomeProduto);

    if (!item) return;

    item.quantidade += valor;

    if (item.quantidade <= 0) {
        removerDoCarrinho(nomeProduto);
        return;
    }

    salvarCarrinho();
    atualizarContador();
    renderizarCarrinho();
}

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function atualizarContador() {
    const contador = document.getElementById("qtd-carrinho");

    if (!contador) return;

    const totalItens = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    contador.textContent = totalItens;
}

function abrirCarrinho() {
    document.getElementById("painel-carrinho")
        .classList.add("aberto");

    renderizarCarrinho();
}

function fecharCarrinho() {
    document.getElementById("painel-carrinho")
        .classList.remove("aberto");
}

function renderizarCarrinho() {
    const container = document.getElementById("itens-carrinho");
    const totalElemento = document.getElementById("total-carrinho");

    if (!container || !totalElemento) return;

    if (carrinho.length === 0) {
        container.innerHTML = "<p>Seu carrinho está vazio.</p>";
        totalElemento.textContent = "R$ 0,00";
        return;
    }

    let total = 0;

    container.innerHTML = "";

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;

        container.innerHTML += `
            <div class="item-carrinho">
                <h4>${item.nome}</h4>

                <p>
                    R$ ${item.preco.toFixed(2)}
                </p>

                <div class="controle-qtd">
                    <button onclick="alterarQuantidade('${item.nome}', -1)">−</button>

                    <span>${item.quantidade}</span>

                    <button onclick="alterarQuantidade('${item.nome}', 1)">+</button>
                </div>

                <button
                    class="btn-remover"
                    onclick="removerDoCarrinho('${item.nome}')"
                >
                    Remover
                </button>
            </div>
        `;
    });

    totalElemento.textContent =
        `R$ ${total.toFixed(2)}`;
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    let mensagem =
        "Olá! Gostaria de solicitar um orçamento.%0A%0A";

    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;

        mensagem +=
            `• ${item.nome} (${item.quantidade}x)%0A`;
    });

    mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

    const telefone = "5527999999999";

    window.open(
        `https://wa.me/${telefone}?text=${mensagem}`,
        "_blank"
    );
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarContador();
    renderizarCarrinho();
});