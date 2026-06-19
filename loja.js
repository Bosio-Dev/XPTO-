// ================================
// LOJA XPTO - SUPABASE + CARRINHO + ESTOQUE
// ================================

const grid = document.getElementById("grid-produtos");
const filtroCategoria = document.getElementById("filtro-categoria");
const ordenarPreco = document.getElementById("ordenar-preco");

// ================================
// CARRINHO
// ================================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// normaliza dados
carrinho = carrinho.map(i => ({
    id: i.id,
    qtd: Number(i.qtd)
}));

// ================================
// ADICIONAR AO CARRINHO (COM ESTOQUE)
// ================================

window.adicionarCarrinho = function (id, estoque) {

    const item = carrinho.find(i => i.id === id);

    const qtdAtual = item ? item.qtd : 0;

    if (qtdAtual >= estoque) {
        alert("Estoque insuficiente!");
        return;
    }

    if (item) {
        item.qtd += 1;
    } else {
        carrinho.push({ id, qtd: 1 });
    }

    salvarCarrinho();
    renderCarrinho();
};

// ================================
// REMOVER ITEM
// ================================

window.removerItem = function (id) {
    carrinho = carrinho.filter(i => i.id !== id);
    salvarCarrinho();
    renderCarrinho();
};

// ================================
// TOGGLE CARRINHO
// ================================

window.toggleCarrinho = function () {
    document.getElementById("sidebar-carrinho")
        .classList.toggle("ativo");
};

// ================================
// RENDER CARRINHO
// ================================

async function renderCarrinho() {

    const { data: produtos } = await supabaseClient
        .from("produtos")
        .select("*");

    const box = document.getElementById("carrinho-itens");
    const totalBox = document.getElementById("total-carrinho");
    const contador = document.getElementById("contador-carrinho");

    let total = 0;
    let qtdTotal = 0;

    box.innerHTML = "";

    carrinho.forEach(item => {

        const produto = produtos.find(p => p.id === item.id);
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

// ================================
// CARREGAR LOJA
// ================================

async function carregarLoja() {

    const { data, error } = await supabaseClient
        .from("produtos")
        .select("*")
        .order("id");

    if (error) {
        console.error(error);
        return;
    }

    let produtos = data;

    // filtro categoria
    if (filtroCategoria && filtroCategoria.value !== "todos") {
        produtos = produtos.filter(p => p.categoria === filtroCategoria.value);
    }

    // ordenação
    if (ordenarPreco) {
        if (ordenarPreco.value === "menor") {
            produtos.sort((a, b) => a.preco - b.preco);
        }
        if (ordenarPreco.value === "maior") {
            produtos.sort((a, b) => b.preco - a.preco);
        }
    }

    grid.innerHTML = "";

    produtos.forEach(p => {

        grid.innerHTML += `
        <div class="produto-card">
            <div class="produto-badge">${p.sub || "Produto"}</div>

            <h4>${p.nome}</h4>

            <p>${p.descricao || ""}</p>

            <p style="opacity:.7; font-size:12px;">
                Estoque: ${p.estoque}
            </p>

            <div class="produto-preco">
                R$ ${Number(p.preco).toFixed(2)}
            </div>

            <button class="btn-comprar"
                onclick="adicionarCarrinho(${p.id}, ${p.estoque})"
                ${p.estoque <= 0 ? "disabled" : ""}>
                ${p.estoque > 0 ? "Comprar" : "Esgotado"}
            </button>
        </div>`;
    });
}

// ================================
// REALTIME SUPABASE (SEM SETINTERVAL)
// ================================

supabaseClient
    .channel("produtos-realtime")
    .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "produtos" },
        carregarLoja
    )
    .subscribe();

// ================================
// INIT
// ================================

carregarLoja();
renderCarrinho();