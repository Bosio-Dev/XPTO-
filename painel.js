const form = document.getElementById("form-produto");
const tabela = document.getElementById("listaProdutos");

if (form) {
    form.addEventListener("submit", cadastrarProduto);
    carregarProdutos();
}

async function cadastrarProduto(e) {
    e.preventDefault();

    const nome = document.getElementById("nomeProduto").value;
    const preco = Number(document.getElementById("precoProduto").value);
    const estoque = Number(document.getElementById("estoqueProduto").value);
    const descricao = document.getElementById("descricaoProduto").value;

    const { error } = await supabaseClient
        .from("produtos")
        .insert([{ nome, preco, estoque, descricao }]);

    if (error) {
        alert(error.message);
        return;
    }

    form.reset();
    carregarProdutos();
}

async function carregarProdutos() {

    const { data, error } = await supabaseClient
        .from("produtos")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    tabela.innerHTML = "";

    data.forEach(p => {
        tabela.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>${p.preco}</td>
                <td>${p.estoque}</td>
                <td><button onclick="deletar(${p.id})">Excluir</button></td>
            </tr>
        `;
    });
}

async function deletar(id) {
    await supabaseClient
        .from("produtos")
        .delete()
        .eq("id", id);

    carregarProdutos();
}