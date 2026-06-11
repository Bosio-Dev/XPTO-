async function atualizarNavbar() {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    const areaUsuario = document.getElementById("area-usuario");

    if (!areaUsuario) return;

    if (session) {

        const email = session.user.email;

        const { data: usuario } = await supabaseClient
            .from("usuarios")
            .select("nome")
            .eq("id", session.user.id)
            .single();

        areaUsuario.innerHTML = `
            <span class="usuario-logado">
                Olá, ${usuario?.nome || email}
            </span>

            <button class="btn-logout"
                onclick="logout()">
                Sair
            </button>
        `;

    } else {

        areaUsuario.innerHTML = `
            <a href="login.html" title="Entrar">
                👤
            </a>
        `;

    }
}

async function logout() {

    await supabaseClient.auth.signOut();

    alert("Logout realizado.");

    window.location.href = "index.html";
}

document.addEventListener(
    "DOMContentLoaded",
    atualizarNavbar
);

async function atualizarBeneficios() {

    const beneficios =
        document.getElementById(
            "beneficios-exclusivos"
        );

    const visitante =
        document.getElementById(
            "visitante-info"
        );

    const nomeBeneficio =
        document.getElementById(
            "nome-beneficio"
        );

    if (!beneficios || !visitante) {
        return;
    }

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    if (session) {

        const { data: usuario } = await supabaseClient
            .from("usuarios")
            .select("nome")
            .eq("id", session.user.id)
            .single();

        beneficios.style.display = "block";

        visitante.style.display = "none";

        nomeBeneficio.textContent =
            `Bem-vindo, ${usuario?.nome || session.user.email}!`;

    } else {

        beneficios.style.display = "none";

        visitante.style.display = "block";

    }
}

document.addEventListener(
    "DOMContentLoaded",
    atualizarBeneficios
);