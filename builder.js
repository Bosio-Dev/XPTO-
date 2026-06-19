let setupSelecionado = {
    placaMae: null,
    cpu: null,
    gpu: null,
    ram: null,
    armazenamento: null,
    fonte: null,
    gabinete: null
};

document.addEventListener("DOMContentLoaded", () => {
    carregarComponentes();
});

// =============================
// BUSCA POR CATEGORIA
// =============================
async function buscarPorCategoria(categoria) {
    const { data, error } = await supabaseClient
        .from("produtos")
        .select("*")
        .eq("categoria", categoria);

    if (error) {
        console.error(error);
        return [];
    }

    return data || [];
}

// =============================
// CARREGAR COMPONENTES
// =============================
async function carregarComponentes() {

    render("mb-box", await buscarPorCategoria("placaMae"), "placaMae");
    render("cpu-box", await buscarPorCategoria("cpu"), "cpu");
    render("gpu-box", await buscarPorCategoria("gpu"), "gpu");
    render("ram-box", await buscarPorCategoria("ram"), "ram");
    render("storage-box", await buscarPorCategoria("armazenamento"), "armazenamento");
    render("psu-box", await buscarPorCategoria("fonte"), "fonte");
    render("case-box", await buscarPorCategoria("gabinete"), "gabinete");

    atualizarResumo();
}

// =============================
// RENDER GENÉRICO
// =============================
function render(containerId, lista, chave) {

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (!lista || lista.length === 0) {
        container.innerHTML = "<p>Nenhuma peça encontrada</p>";
        return;
    }

    lista.forEach(item => {

        const div = document.createElement("div");
        div.className = "peca-item";

        div.innerHTML = `
            <strong>${item.nome}</strong>
            <p>${item.descricao || ""}</p>
            <span>R$ ${Number(item.preco).toFixed(2)}</span>
        `;

        div.onclick = () => selecionar(chave, item);

        container.appendChild(div);
    });
}

// =============================
// SELEÇÃO
// =============================
function selecionar(chave, item) {
    setupSelecionado[chave] = item;
    atualizarResumo();
}

// =============================
// RESUMO
// =============================
function atualizarResumo() {

    const container = document.getElementById("lista-resumo");
    let total = 0;

    container.innerHTML = "";

    Object.values(setupSelecionado).forEach(item => {

        if (!item) return;

        total += Number(item.preco);

        container.innerHTML += `
            <div class="resumo-item">
                <span>${item.nome}</span>
                <span>R$ ${Number(item.preco).toFixed(2)}</span>
            </div>
        `;
    });

    document.getElementById("preco-total").textContent =
        total.toFixed(2);
}