async function verificarFuncionario() {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    if (!session) {

        window.location.href =
            "login.html";

        return;
    }

    const {
        data: funcionario
    } = await supabaseClient
        .from("funcionarios")
        .select("*")
        .eq("email", session.user.email)
        .maybeSingle();

    if (!funcionario) {

        alert("Acesso negado");

        window.location.href =
            "login.html";

        return;
    }

    console.log(
        "Funcionário autenticado:",
        funcionario.nome
    );
}

verificarFuncionario();