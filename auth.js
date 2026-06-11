// ================================
// XPTO STORE - AUTH.JS
// ================================

let modoCadastro = true;

const btnLogin = document.getElementById("btn-login");
const btnCadastro = document.getElementById("btn-cadastro");

const form = document.getElementById("form-auth");

const campoNome = document.getElementById("nome");
const campoTelefone = document.getElementById("telefone");

const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");

const btnSubmit = document.getElementById("btn-submit");

inicializarFormulario();

function inicializarFormulario() {

    btnCadastro.classList.add("ativo");
    btnLogin.classList.remove("ativo");

    campoNome.style.display = "block";
    campoTelefone.style.display = "block";

    campoNome.required = true;
    campoTelefone.required = true;

    btnSubmit.textContent = "Cadastrar";

    modoCadastro = true;
}


// ================================
// Alternar entre Login e Cadastro
// ================================

btnLogin.addEventListener("click", () => {

    modoCadastro = false;

    btnLogin.classList.add("ativo");
    btnCadastro.classList.remove("ativo");

    campoNome.style.display = "none";
    campoTelefone.style.display = "none";

    campoNome.required = false;
    campoTelefone.required = false;

    btnSubmit.textContent = "Entrar";
});

btnCadastro.addEventListener("click", () => {

    modoCadastro = true;

    btnCadastro.classList.add("ativo");
    btnLogin.classList.remove("ativo");

    campoNome.style.display = "block";
    campoTelefone.style.display = "block";

    campoNome.required = true;
    campoTelefone.required = true;

    btnSubmit.textContent = "Cadastrar";
});


// ================================
// Submit
// ================================

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (modoCadastro) {
        await cadastrarUsuario();
    } else {
        await fazerLogin();
    }
});


// ================================
// Cadastro
// ================================

async function cadastrarUsuario() {

    const nome = campoNome.value.trim();
    const telefone = campoTelefone.value.trim();
    const email = campoEmail.value.trim();
    const senha = campoSenha.value;

    if (!nome || !telefone || !email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    btnSubmit.disabled = true;
    btnSubmit.textContent = "Cadastrando...";

    try {

        // Cria usuário no Auth
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password: senha
        });

        if (error) {
            throw error;
        }

        const user = data.user || data.session?.user;
        if (!user) {
            throw new Error(
                "Confirme o e-mail enviado pelo Supabase antes de continuar."
            );
        }

        if (!user) {
            throw new Error(
                "Não foi possível obter os dados do usuário."
            );
        }

        // Salva dados extras
        const { error: erroTabela } =
            await supabaseClient
                .from("usuarios")
                .insert({
                    id: user.id,
                    nome,
                    telefone,
                    email
                });

        if (erroTabela) {
            throw erroTabela;
        }

        alert(
            "Cadastro realizado com sucesso! Faça login para continuar."
        );

        // Volta para login
        form.reset();

        alert("Cadastro realizado com sucesso! Agora faça login.");

        btnLogin.click();

        campoEmail.focus();

    } catch (erro) {

        alert("Erro: " + erro.message);

    } finally {

        btnSubmit.disabled = false;

        btnSubmit.textContent =
            modoCadastro
                ? "Cadastrar"
                : "Entrar";
    }
}


// ================================
// Login
// ================================

async function fazerLogin() {

    const email = campoEmail.value.trim();
    const senha = campoSenha.value;

    if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    btnSubmit.disabled = true;
    btnSubmit.textContent = "Entrando...";

    try {

        const { error } =
            await supabaseClient.auth.signInWithPassword({
                email,
                password: senha
            });

        if (error) {
            throw error;
        }

        alert("Login realizado com sucesso!");

        window.location.href = "index.html";

    } catch (erro) {

        alert("Erro: " + erro.message);

    } finally {

        btnSubmit.disabled = false;

        btnSubmit.textContent =
            modoCadastro
                ? "Cadastrar"
                : "Entrar";
    }
}


// ================================
// Já está logado?
// ================================

verificarSessao();

async function verificarSessao() {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    if (session) {
        console.log(
            "Usuário logado:",
            session.user.email
        );
    }
}