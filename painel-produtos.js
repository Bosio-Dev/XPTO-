const form = document.getElementById("form-produto");
const tabela = document.getElementById("listaProdutos");
const categoria = document.getElementById("categoriaProduto").value;

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nome = nomeProduto.value;
    const preco = Number(precoProduto.value);
    const estoque = Number(estoqueProduto.value);
    const descricao = descricaoProduto.value;

    const { error } = await supabaseClient
        .from("produtos")
        .insert([
            {
                nome,
                preco,
                estoque,
                descricao
            }
        ]);

    if (error) {
        alert(error.message);
        return;
    }

    form.reset();

    carregarProdutos();
});

async function carregarProdutos() {

    const { data } = await supabaseClient
        .from("produtos")
        .select("*")
        .order("id");

    tabela.innerHTML = "";

    data.forEach(produto => {

        tabela.innerHTML += `
        <tr>
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco}</td>
            <td>${produto.estoque}</td>
            <td>
                <button onclick="deletarProduto(${produto.id})">
                    Excluir
                </button>
            </td>
        </tr>
        `;
    });
}

window.deletarProduto = async function(id){

    await supabaseClient
        .from("produtos")
        .delete()
        .eq("id", id);

    carregarProdutos();
}

carregarProdutos();