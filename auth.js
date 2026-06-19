// ================================
// XPTO STORE - AUTH.JS (REFEITO)
// ================================

let modoCadastro = true;

const btnLogin = document.getElementById("btn-login");
const btnCadastro = document.getElementById("btn-cadastro");

const form = document.getElementById("form-auth");

const nome = document.getElementById("nome");
const telefone = document.getElementById("telefone");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

const btnSubmit = document.getElementById("btn-submit");
const esqueciSenha = document.getElementById("esqueciSenha");
const termos = document.querySelector(".checkbox-termos");

function animarForm(callback) {
    form.classList.add("fade-out");

    setTimeout(() => {
        callback();
        form.classList.remove("fade-out");
        form.classList.add("fade-in");
    }, 200);
}

// =========================
// MODOS
// =========================

function setModoLogin() {
    animarForm(() => {
        modoCadastro = false;

        btnLogin.classList.add("ativo");
        btnCadastro.classList.remove("ativo");

        nome.style.display = "none";
        telefone.style.display = "none";

        nome.required = false;
        telefone.required = false;

        btnSubmit.textContent = "Entrar";

        esqueciSenha.style.display = "inline-block";
        termos.style.display = "none";
        document.getElementById("aceitouTermos").required = false;
    });
}

function setModoCadastro() {
    animarForm(() => {
        modoCadastro = true;

        btnCadastro.classList.add("ativo");
        btnLogin.classList.remove("ativo");

        nome.style.display = "block";
        telefone.style.display = "block";

        nome.required = true;
        telefone.required = true;

        btnSubmit.textContent = "Cadastrar";

        esqueciSenha.style.display = "none";
        termos.style.display = "block";
        document.getElementById("aceitouTermos").required = true;
    });
}

btnLogin.addEventListener("click", setModoLogin);
btnCadastro.addEventListener("click", setModoCadastro);

// estado inicial
setModoCadastro();

// =========================
// FEEDBACK UI (TOAST SIMPLES)
// =========================

function toast(msg, cor = "green") {
    const div = document.createElement("div");

    div.textContent = msg;

    div.style.position = "fixed";
    div.style.bottom = "20px";
    div.style.right = "20px";
    div.style.padding = "12px 18px";
    div.style.background = cor;
    div.style.color = "#fff";
    div.style.borderRadius = "8px";
    div.style.zIndex = "9999";
    div.style.fontSize = "14px";

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 2500);
}

// =========================
// LOGIN
// =========================

async function login() {
    try {
        btnSubmit.disabled = true;
        btnSubmit.textContent = "Entrando...";

        const { error } = await supabaseClient.auth.signInWithPassword({
            email: email.value,
            password: senha.value
        });

        if (error) throw error;

        const { data: { user } } = await supabaseClient.auth.getUser();

        const { data: funcionario } = await supabaseClient
            .from("funcionarios")
            .select("*")
            .eq("email", user.email)
            .maybeSingle();

        toast("Login realizado!");

        setTimeout(() => {
            window.location.href = funcionario
                ? "index2.html"
                : "index.html";
        }, 800);

    } catch (err) {
        toast(err.message, "crimson");

    } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Entrar";
    }
}

// =========================
// CADASTRO
// =========================

async function cadastrar() {
    try {
        btnSubmit.disabled = true;
        btnSubmit.textContent = "Criando...";

        const { data, error } = await supabaseClient.auth.signUp({
            email: email.value,
            password: senha.value
        });

        if (error) throw error;

        const user = data.user;

        await supabaseClient.from("usuarios").insert({
            id: user.id,
            nome: nome.value,
            telefone: telefone.value,
            email: email.value
        });

        toast("Cadastro realizado!");
        setModoLogin();

    } catch (err) {
        toast(err.message, "crimson");

    } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Cadastrar";
    }
}

// =========================
// SUBMIT
// =========================

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    modoCadastro ? cadastrar() : login();
});

// ================================
// INIT
// ================================

function setModoLogin() {
    modoCadastro = false;

    btnLogin.classList.add("ativo");
    btnCadastro.classList.remove("ativo");

    nome.style.display = "none";
    telefone.style.display = "none";

    nome.required = false;
    telefone.required = false;

    btnSubmit.textContent = "Entrar";

    // só login mostra isso
    esqueciSenha.style.display = "inline-block";
    termos.style.display = "none";
}

function setModoCadastro() {
    modoCadastro = true;

    btnCadastro.classList.add("ativo");
    btnLogin.classList.remove("ativo");

    nome.style.display = "block";
    telefone.style.display = "block";

    nome.required = true;
    telefone.required = true;

    btnSubmit.textContent = "Cadastrar";

    // esconde no cadastro
    esqueciSenha.style.display = "none";
    termos.style.display = "block";
}

// inicial padrão
setModoCadastro();

// ================================
// TROCA DE MODOS
// ================================

btnLogin.addEventListener("click", setModoLogin);
btnCadastro.addEventListener("click", setModoCadastro);

// ================================
// SUBMIT
// ================================

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (modoCadastro) {
        await cadastrar();
    } else {
        await login();
    }
});

// ================================
// CADASTRO
// ================================

async function cadastrar() {
    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email.value,
            password: senha.value
        });

        if (error) throw error;

        const user = data.user;

        await supabaseClient.from("usuarios").insert({
            id: user.id,
            nome: nome.value,
            telefone: telefone.value,
            email: email.value
        });

        alert("Cadastro realizado.");
        setModoLogin();

    } catch (err) {
        alert(err.message);
    }
}

// ================================
// LOGIN
// ================================

async function login() {
    try {
        const { error } = await supabaseClient.auth.signInWithPassword({
            email: email.value,
            password: senha.value
        });

        if (error) throw error;

        const { data: { user } } = await supabaseClient.auth.getUser();

        const { data: funcionario } = await supabaseClient
            .from("funcionarios")
            .select("*")
            .eq("email", user.email)
            .maybeSingle();

        if (funcionario) {
            window.location.href = "index2.html";
        } else {
            window.location.href = "index.html";
        }

    } catch (err) {
        alert(err.message);
    }
}

// ================================
// ESQUECI MINHA SENHA
// ================================

esqueciSenha.addEventListener("click", async (e) => {
    e.preventDefault();

    const userEmail = email.value.trim();

    if (!userEmail) {
        alert("Digite seu e-mail primeiro.");
        return;
    }

    const { error } = await supabaseClient.auth.resetPasswordForEmail(userEmail, {
        redirectTo: "http://127.0.0.1:5500/nova-senha.html"
    });

    if (error) {
        alert(error.message);
        return;
    }

    alert("Email de recuperação enviado.");
});