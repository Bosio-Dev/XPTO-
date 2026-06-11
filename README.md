# 🖥️ XPTO Store

Sistema web de e-commerce e assistência técnica desenvolvido como projeto acadêmico, simulando uma plataforma moderna para venda de hardware, contratação de serviços especializados e montagem inteligente de computadores.

O projeto foi construído utilizando **HTML5**, **CSS3**, **JavaScript Vanilla (ES6+)** e **Supabase**, integrando autenticação de usuários e armazenamento de dados em nuvem.

---

## 📌 Visão Geral

A XPTO Store oferece uma experiência completa ao usuário, reunindo catálogo de produtos, simulador de montagem de computadores, serviços técnicos e área do cliente com benefícios exclusivos.

Além das funcionalidades tradicionais de uma loja virtual, o sistema incorpora mecanismos de validação de compatibilidade entre componentes e estimativas de desempenho, proporcionando uma experiência educativa e interativa.

---

## 🚀 Funcionalidades

### 🔐 Área do Cliente

* Cadastro de usuários utilizando Supabase Authentication;
* Login seguro com autenticação por e-mail e senha;
* Armazenamento de informações complementares dos clientes;
* Exibição de benefícios exclusivos para usuários autenticados;
* Controle de sessão e opção de logout.

### 🛒 Loja Virtual

* Catálogo dinâmico de produtos;
* Organização por categorias;
* Filtros inteligentes;
* Ordenação por faixa de preço;
* Carrinho de compras interativo.

### 🖥️ PC Builder Inteligente

* Montagem personalizada de computadores;
* Validação automática de compatibilidade entre componentes;
* Compatibilidade entre diferentes plataformas e soquetes;
* Verificação de memórias DDR4 e DDR5;
* Compatibilidade com diferentes tipos de armazenamento;
* Cálculo automático do consumo energético;
* Sugestão de fontes adequadas para o setup.

### 🎮 Estimativa de Performance

* Projeção de FPS em jogos populares;
* Cálculos realizados com base na combinação entre CPU e GPU;
* Simulação de desempenho em resolução Full HD (1080p).

### 🛠️ Serviços Técnicos

* Simulação de serviços de manutenção;
* Limpeza física de hardware;
* Troca de pasta térmica;
* Formatação e instalação de sistemas operacionais;
* Precificação dinâmica conforme os serviços selecionados.

### 📋 Atendimento ao Cliente

* Formulário de abertura de chamados;
* Validação dos dados informados;
* Simulação do fluxo de suporte técnico.

---

## ☁️ Integração com Supabase

O projeto utiliza o Supabase como backend para gerenciamento de usuários.

### Recursos implementados:

* Supabase Authentication;
* Cadastro e login de clientes;
* Persistência dos dados dos usuários;
* Controle de sessões autenticadas;
* Políticas de segurança (RLS).

---

## 🧰 Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (ES6+)
* Supabase
* Supabase Authentication
* Supabase Database
* Row Level Security (RLS)

---

## 📂 Estrutura do Projeto

```
XPTO-Store/
│
├── index.html          # Página inicial
├── login.html          # Cadastro e autenticação de usuários
├── loja.html           # Catálogo de produtos
├── servicos.html       # Central de serviços
├── builder.html        # PC Builder inteligente
├── limpeza.html        # Serviços de manutenção
├── contato.html        # Atendimento e suporte
│
├── style.css           # Estilos globais
│
├── database.js         # Base de dados dos produtos
├── loja.js             # Lógica da loja
├── builder.js          # Compatibilidade e montagem
├── carrinho.js         # Carrinho de compras
├── limpeza.js          # Serviços e precificação
├── contato.js          # Validação do suporte
├── auth.js             # Cadastro e login
├── session.js          # Controle de sessão
├── supabase.js         # Configuração do Supabase
│
└── README.md
```

---

## 🎯 Objetivos do Projeto

* Aplicar conceitos de desenvolvimento front-end;
* Integrar aplicações web com serviços de backend modernos;
* Simular funcionalidades reais de e-commerce;
* Desenvolver lógica de programação aplicada a regras de negócio;
* Demonstrar conhecimentos em autenticação, persistência de dados e experiência do usuário.

---

## 👨‍💻 Autor

**Guilherme Bosio Machado**

Projeto desenvolvido para fins acadêmicos, com foco em aprendizado prático de desenvolvimento web moderno e integração com banco de dados em nuvem.
