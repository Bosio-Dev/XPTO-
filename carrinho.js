let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// normaliza
carrinho = carrinho.map(i => ({
    id: i.id,
    qtd: Number(i.qtd)
}));

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

window.adicionarCarrinho = function (id) {

    const item = carrinho.find(i => i.id === id);

    if (item) {
        item.qtd += 1;
    } else {
        carrinho.push({ id, qtd: 1 });
    }

    salvarCarrinho();
    renderCarrinho();

    // 👇 BOUNCE AQUI (CORRETO)
    const btn = document.getElementById("btn-carrinho");

    btn.classList.remove("bounce");
    void btn.offsetWidth;
    btn.classList.add("bounce");
};

window.removerItem = function (id) {
    carrinho = carrinho.filter(i => i.id !== id);
    salvarCarrinho();
    renderCarrinho();
};

window.toggleCarrinho = function () {
    document.getElementById("sidebar-carrinho")
        .classList.toggle("ativo");
};

async function renderCarrinho() {

    const { data } = await supabaseClient
        .from("produtos")
        .select("*");

    const box = document.getElementById("carrinho-itens");
    const totalBox = document.getElementById("total-carrinho");
    const contador = document.getElementById("contador-carrinho");

    let total = 0;
    let qtdTotal = 0;

    box.innerHTML = "";

    carrinho.forEach(item => {

        const produto = data.find(p => p.id === item.id);
        if (!produto) return;

        const subtotal = Number(produto.preco) * Number(item.qtd);

        total += subtotal;
        qtdTotal += item.qtd;

        box.innerHTML += `
        <div class="item-carrinho">
            <div>
                <strong>${produto.nome}</strong><br>
                Qtd: ${item.qtd}
            </div>

            <div>
                R$ ${subtotal.toFixed(2)}
                <button onclick="removerItem(${item.id})">X</button>
            </div>
        </div>`;
    });

    totalBox.textContent = `Total: R$ ${total.toFixed(2)}`;
    contador.textContent = qtdTotal;
}

window.finalizarCompra = async function () {

    if (carrinho.length === 0) {
        alert("Carrinho vazio");
        return;
    }

    // pega produtos atuais do banco
    const { data: produtos, error } = await supabaseClient
        .from("produtos")
        .select("*");

    if (error) {
        alert("Erro ao buscar produtos");
        return;
    }

    // =========================
    // 1. VALIDAR ESTOQUE
    // =========================

    for (const item of carrinho) {

        const produto = produtos.find(p => p.id === item.id);

        if (!produto) {
            alert("Produto não encontrado");
            return;
        }

        if (item.qtd > produto.estoque) {
            alert(`Estoque insuficiente: ${produto.nome}`);
            return;
        }
    }

    // =========================
    // 2. BAIXAR ESTOQUE
    // =========================

    for (const item of carrinho) {

        const produto = produtos.find(p => p.id === item.id);

        const novoEstoque = produto.estoque - item.qtd;

        const { error: updateError } = await supabaseClient
            .from("produtos")
            .update({
                estoque: novoEstoque
            })
            .eq("id", item.id);

        if (updateError) {
            alert("Erro ao atualizar estoque");
            return;
        }
    }

    // =========================
    // 3. FINALIZAR
    // =========================

    carrinho = [];
    salvarCarrinho();
    renderCarrinho();
    carregarLoja();

    alert("Compra finalizada com sucesso!");
};

renderCarrinho();