async function verificarSessao() {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    if (!session) {
        return;
    }

    console.log(
        "Logado:",
        session.user.email
    );
}

verificarSessao();