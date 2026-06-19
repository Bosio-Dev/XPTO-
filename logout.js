window.logout = async function () {

    await supabaseClient.auth.signOut();

    localStorage.clear();

    window.location.href =
        "login.html";
};