// Captura do formulário e inputs
const form = document.getElementById('form-suporte');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const categoria = document.getElementById('categoria-suporte');
const mensagem = document.getElementById('mensagem');

// Escutador do evento de submit
form.addEventListener('submit', function(evento) {
    // Evita o comportamento padrão do HTML de recarregar a página
    evento.preventDefault(); 
    
    // Executa a validação e armazena o resultado (true ou false)
    let formularioValido = validarFormulario();

    if (formularioValido) {
        // Coleta os dados limpos para simulação de envio
        const chamadoData = {
            cliente: nome.value.trim(),
            contato: email.value.trim(),
            tipo: categoria.value,
            relato: mensagem.value.trim()
        };

        alert(`Sucesso!\nChamado Técnico aberto para: ${chamadoData.cliente}\nTipo de chamado: ${chamadoData.tipo}\n\nOs dados foram validados e estão prontos para envio de API.`);
        
        // Reseta o formulário após o sucesso
        form.reset();
    }
});

// Função principal de validação de dados
function validarFormulario() {
    let status = true;

    // 1. Validação do Nome (Mínimo de 3 caracteres)
    if (nome.value.trim().length < 3) {
        mostrarErro('erro-nome', nome);
        status = false;
    } else {
        esconderErro('erro-nome', nome);
    }

    // 2. Validação do E-mail (RegEx simples de validação de formato)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        mostrarErro('erro-email', email);
        status = false;
    } else {
        esconderErro('erro-email', email);
    }

    // 3. Validação da Categoria (Verifica se escolheu uma opção)
    if (categoria.value === "") {
        mostrarErro('erro-categoria', categoria);
        status = false;
    } else {
        esconderErro('erro-categoria', categoria);
    }

    // 4. Validação da Mensagem (Mínimo de 15 caracteres para detalhamento)
    if (mensagem.value.trim().length < 15) {
        mostrarErro('erro-mensagem', mensagem);
        status = false;
    } else {
        esconderErro('erro-mensagem', message = mensagem);
    }

    return status;
}

// Funções auxiliares de manipulação de interface (UI)
function mostrarErro(idErro, inputElement) {
    document.getElementById(idErro).style.display = 'block';
    inputElement.style.borderColor = '#ff4a4a';
}

function esconderErro(idErro, inputElement) {
    document.getElementById(idErro).style.display = 'none';
    inputElement.style.borderColor = 'var(--border)';
}
