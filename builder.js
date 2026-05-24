// Objeto que guarda as peças atualmente selecionadas pelo usuário
let setupSelecionado = {
    placaMae: null,
    cpu: null,
    gpu: null,
    ram: null,
    armazenamento: null,
    fonte: null,
    gabinete: null
};

// Executa ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    atualizarComponentes();
});

// Renderiza todas as seções atualizando as regras de compatibilidade
function atualizarComponentes() {
    renderizarOpcoes("opcoes-mae", HARDWARE_DB.placasMae, 'placaMae', item => true);
    
    // Regra CPU: Mesmo soquete da Placa-Mãe selecionada
    renderizarOpcoes("opcoes-cpu", HARDWARE_DB.cpus, 'cpu', item => {
        if (!setupSelecionado.placaMae) return true;
        return item.soquete === setupSelecionado.placaMae.soquete;
    });

    // Regra GPU: Exibe opções se não tiver vídeo integrado, ou apenas superiores se tiver
    renderizarOpcoes("opcoes-gpu", HARDWARE_DB.gpus, 'gpu', item => {
        if (setupSelecionado.cpu && setupSelecionado.cpu.videoIntegrado) {
            return item.forca > setupSelecionado.cpu.desempenhoVideo;
        }
        return true;
    });

    // Regra RAM: Tipo de tecnologia compatível com a Placa-Mãe (DDR4 / DDR5)
    renderizarOpcoes("opcoes-ram", HARDWARE_DB.memorias, 'ram', item => {
        if (!setupSelecionado.placaMae) return true;
        return item.ddr === setupSelecionado.placaMae.ddr;
    });

    // Regra Armazenamento: Se for NVMe, a Placa-Mãe precisa ter suporte
    renderizarOpcoes("opcoes-armazenamento", HARDWARE_DB.armazenamentos, 'armazenamento', item => {
        if (item.tipo === "NVMe" && setupSelecionado.placaMae) {
            return setupSelecionado.placaMae.nvme === true;
        }
        return true;
    });

    // Regra Fonte: Mostra apenas fontes que suportem o consumo total atual do PC + margem de segurança
    let consumoAtual = calcularConsumoTotal();
    renderizarOpcoes("opcoes-fonte", HARDWARE_DB.fontes, 'fonte', item => {
        return item.watts >= (consumoAtual + 50); 
    });

    // Gabinete é livre
    renderizarOpcoes("opcoes-gabinete", HARDWARE_DB.gabinetes, 'gabinete', item => true);

    atualizarResumoLateral();
}

// Renderizador genérico de carrossel de itens
function renderizarOpcoes(idContainer, listaDados, chaveSetup, filtroCallback) {
    const container = document.getElementById(idContainer);
    container.innerHTML = "";
    
    const itensFiltrados = listaDados.filter(filtroCallback);

    itensFiltrados.forEach(item => {
        const div = document.createElement("div");
        div.className = `peca-item ${setupSelecionado[chaveSetup]?.id === item.id ? 'selecionado' : ''}`;
        
        let infoExtra = item.soquete || item.ddr || item.tipo || (item.watts ? `${item.watts}W` : "");
        
        div.innerHTML = `
            <strong>${item.nome}</strong>
            <p>${infoExtra}</p>
            <div class="peca-preco">R$ ${item.preco.toFixed(2)}</div>
        `;
        
        div.onclick = () => selecionarPeca(chaveSetup, item);
        container.appendChild(div);
    });
}

// Trata a seleção e dispara validações específicas como alertas de vídeo integrado
function selecionarPeca(chave, item) {
    if (setupSelecionado[chave]?.id === item.id) {
        setupSelecionado[chave] = null; // Remove se clicar de novo
    } else {
        setupSelecionado[chave] = item;
        
        // Alerta inteligente de vídeo integrado
        if (chave === 'cpu' && item.videoIntegrado) {
            alert(`Atenção: O processador ${item.nome} possui vídeo integrado! Você pode utilizá-lo sem placa de vídeo dedicada ou escolher uma GPU dedicada listada abaixo para maior performance.`);
            setupSelecionado.gpu = null; // Reinicia a GPU para forçar filtro de superioridade
        }
        
        // Se mudar a placa mãe, limpa CPU e RAM incompatíveis
        if (chave === 'placaMae') {
            setupSelecionado.cpu = null;
            setupSelecionado.ram = null;
        }
    }
    atualizarComponentes();
}

function calcularConsumoTotal() {
    let total = 0;
    if (setupSelecionado.placaMae) total += setupSelecionado.placaMae.consumo;
    if (setupSelecionado.cpu) total += setupSelecionado.cpu.consumo;
    if (setupSelecionado.gpu) total += setupSelecionado.gpu.consumo;
    return total;
}

// Atualiza os dados matemáticos na barra lateral direita
function atualizarResumoLateral() {
    let totalPreco = 0;
    let containerResumo = document.getElementById("lista-resumo");
    containerResumo.innerHTML = "";

    Object.keys(setupSelecionado).forEach(chave => {
        const item = setupSelecionado[chave];
        if (item) {
            totalPreco += item.preco;
            containerResumo.innerHTML += `
                <div class="resumo-item">
                    <span>• ${item.nome}</span>
                    <span>R$ ${item.preco.toFixed(2)}</span>
                </div>
            `;
        }
    });

    if (totalPreco === 0) {
        containerResumo.innerHTML = `<p style="color: var(--text-muted);">Nenhuma peça selecionada.</p>`;
    }

    document.getElementById("preco-total").innerText = totalPreco.toFixed(2);
    document.getElementById("consumo-total").innerText = `${calcularConsumoTotal()}W`;
    
    calcularDesempenhoJogos();
}

// Algoritmo simplificado para projeção de taxa de quadros (FPS)
function calcularDesempenhoJogos() {
    const containerJogos = document.getElementById("jogos-fps");
    
    if (!setupSelecionado.cpu) {
        containerJogos.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">Escolha um processador para projetar o FPS.</p>`;
        return;
    }

    containerJogos.innerHTML = "";
    
    // Define o poder gráfico base (se não tem GPU dedicada, usa o vídeo integrado se houver)
    let forcaGrafica = 0;
    if (setupSelecionado.gpu) {
        forcaGrafica = setupSelecionado.gpu.forca;
    } else if (setupSelecionado.cpu.videoIntegrado) {
        forcaGrafica = setupSelecionado.cpu.desempenhoVideo;
    }

    HARDWARE_DB.jogos.forEach(jogo => {
        let fpsCalculado = 0;
        
        if (forcaGrafica === 0) {
            fpsCalculado = 0; // Sem vídeo integrado e sem placa dedicada = não roda
        } else {
            // Conta matemática baseada nos pesos de CPU e GPU definidos no banco de dados
            fpsCalculado = Math.round((forcaGrafica * (jogo.pesoGpu / 10)) + (100 * (jogo.pesoCpu / 10)) / 2);
        }

        containerJogos.innerHTML += `
            <div class="resumo-item" style="font-size: 0.85rem; margin-top: 5px;">
                <span>${jogo.nome}:</span>
                <strong style="color: #00ffcc;">${fpsCalculado > 0 ? fpsCalculado + ' FPS' : 'Não roda'}</strong>
            </div>
        `;
    });
}
