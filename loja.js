// Lista de produtos comercializados na Loja
const PRODUTOS_LOJA = [
    { nome: "NVIDIA RTX 4060 8GB", categoria: "hardware", sub: "GPU", preco: 2100 },
    { nome: "AMD Ryzen 5 5600", categoria: "hardware", sub: "CPU", preco: 850 },
    { nome: "Corsair Vengeance 16GB DDR4", categoria: "hardware", sub: "RAM", preco: 340 },
    { nome: "Mouse Gamer Redragon Cobra", categoria: "perifericos", sub: "Mouse", preco: 140 },
    { nome: "Teclado Mecânico Kumara RGB", categoria: "perifericos", sub: "Teclado", preco: 260 },
    { nome: "Headset HyperX Cloud Stinger", categoria: "perifericos", sub: "Áudio", preco: 290 },
    { nome: "Caixa de Som Edifier Bluetooth", categoria: "acessorios", sub: "Som", preco: 450 },
    { nome: "Hub USB-C 4 Portas Alumínio", categoria: "acessorios", sub: "Hub", preco: 95 },
    { nome: "Suporte Articulado para Monitor", categoria: "acessorios", sub: "Suporte", preco: 180 }
];

// Captura dos elementos do HTML
const gridProdutos = document.getElementById("grid-produtos");
const filtroCategoria = document.getElementById("filtro-categoria");
const ordenarPreco = document.getElementById("ordenar-preco");

// Função principal que desenha os cards na tela
function renderizarProdutos(produtos) {
    gridProdutos.innerHTML = ""; // Limpa a tela antes de renderizar

    if (produtos.length === 0) {
        gridProdutos.innerHTML = "<p style='color: var(--text-muted)'>Nenhum produto encontrado.</p>";
        return;
    }

    produtos.forEach(produto => {
        const cardHTML = `
            <div class="produto-card">
                <div>
                    <div class="produto-badge">${produto.sub}</div>
                    <h4>${produto.nome}</h4>
                </div>
                <div>
                    <div class="produto-preco">R$ ${produto.preco.toFixed(2)}</div>
                    <button class="btn-comprar" onclick="adicionarAoCarrinho('${produto.nome}')">Comprar</button>
                </div>
            </div>
        `;
        gridProdutos.innerHTML += cardHTML;
    });
}

// Função responsável por processar os filtros e a ordenação
function filtrarEOrdenar() {
    let produtosFiltrados = [...PRODUTOS_LOJA];

    // 1. Filtrar por Categoria
    const categoriaSelecionada = filtroCategoria.value;
    if (categoriaSelecionada !== "todos") {
        produtosFiltrados = produtosFiltrados.filter(p => p.categoria === categoriaSelecionada);
    }

    // 2. Ordenar por Preço
    const ordem = ordenarPreco.value;
    if (ordem === "menor") {
        produtosFiltrados.sort((a, b) => a.preco - b.preco);
    } else if (ordem === "maior") {
        produtosFiltrados.sort((a, b) => b.preco - a.preco);
    }

    // Atualiza a tela com o resultado final
    renderizarProdutos(produtosFiltrados);
}

// Função simulada de clique de compra (para uso futuro no GitHub)
function adicionarAoCarrinho(nomeProduto) {
    alert(`"${nomeProduto}" foi adicionado ao carrinho! (Funcionalidade em desenvolvimento)`);
}

// Ouvintes de eventos (Escutam as mudanças nos seletores de filtros)
filtroCategoria.addEventListener("change", filtrarEOrdenar);
ordenarPreco.addEventListener("change", filtrarEOrdenar);

// Inicializa a página mostrando todos os itens ao carregar
document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos(PRODUTOS_LOJA);
});
