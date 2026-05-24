# 🛠️ XPTO Store - E-Commerce & Construtor Inteligente de PC

Um ecossistema completo de hardware desenvolvido em **HTML5**, **CSS3 (Modo Escuro)** e **JavaScript Vanila (ES6+)**. O projeto simula uma plataforma de e-commerce integrada com assistentes de compatibilidade técnica.

## 🚀 Funcionalidades Principais

- **PC Builder Inteligente**: Validação em tempo real de sockets de processadores (AM4, AM5, Intel), barramentos de memória RAM (DDR4/DDR5) e suporte a armazenamento NVMe.
- **Cálculo Automatizado de Fonte**: Sistema de somatório de TDP dinâmico que filtra e exibe apenas fontes que suportam a demanda energética da máquina.
- **Projeção de Performance**: Algoritmo que calcula e projeta a média estimada de FPS para jogos competitivos (CS2, GTA V, Cyberpunk 2077) com base no setup escolhido.
- **Painel de Serviços**: Checkboxes dinâmicos de manutenção física e precificação variável de software baseada no Sistema Operacional escolhido (Linux, Windows, MacOS).
- **Catálogo com Filtros**: Renderização automatizada de itens gerais por categorias e ordenação inteligente por faixa de preço.
- **Validação de Suporte**: Formulário com validações de dados (RegEx e comprimento de strings) antes da simulação de envio.

## 📁 Estrutura de Arquivos

```text
├── index.html       # Página Inicial institucional
├── loja.html        # Interface do catálogo de hardware
├── servicos.html    # Hub de cards de serviços clicáveis
├── builder.html     # Construtor de computadores com listas deslizantes
├── limpeza.html     # Checkbox de ordens de serviço de hardware/OS
├── contato.html     # Formulário de abertura de chamados técnicos
├── style.css        # Estilização global e responsiva em modo escuro
├── database.js      # Banco de dados centralizado de componentes
├── loja.js          # Lógica de renderização e ordenação da loja
├── builder.js       # Regras de compatibilidade matemática do hardware
├── limpeza.js       # Somatórios de checkboxes e regras de OS
└── contato.js       # Validação e captura do formulário de chamados
```
