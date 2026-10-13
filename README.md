# Chat Offline

Aplicação de chat desenvolvida com **React, TypeScript e Zustand**, com foco em simplicidade, organização e responsividade. Permite criar múltiplas conversas, enviar mensagens como **Você** ou **Robô** e gerenciar o histórico diretamente pela interface.

As conversas e mensagens são persistidas automaticamente no `localStorage` do navegador. O projeto funciona sem necessidade de API externa, autenticação ou banco de dados.

## 🔗 Acesse o projeto

**Demonstração:** (https://react-multichat-offline-theta.vercel.app/)

**Repositório:** [GitHub — Chat Offline](https://github.com/cassiano25Ubc/chat-offline)


## ✨ Funcionalidades

- Criar e alternar entre múltiplas conversas.
- Enviar mensagens identificadas como **Você** ou **Robô**.
- Excluir mensagens individualmente.
- Excluir conversas completas.
- Salvar conversas e mensagens automaticamente no navegador.
- Recuperar o histórico salvo ao retornar à aplicação.
- Interface responsiva para diferentes tamanhos de tela.
- Utilizar o chat sem API externa ou criação de conta.

## 🛠️ Tecnologias utilizadas

- **[React](https://react.dev/)** — construção da interface com componentes.
- **[TypeScript](https://www.typescriptlang.org/)** — tipagem estática e maior segurança no código.
- **[Vite](https://vite.dev/)** — ambiente de desenvolvimento e build.
- **[Tailwind CSS](https://tailwindcss.com/)** — estilização da interface.
- **[Zustand](https://zustand.docs.pmnd.rs/)** — gerenciamento do estado das conversas.
- **localStorage** — persistência dos dados no navegador.

## 📋 Requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) — versão 20.19+ ou 22.12+.
- npm — gerenciador de pacotes do Node.js.

## 🚀 Como executar localmente

**1. Clone o repositório**

```bash
git clone https://github.com/cassiano25Ubc/chat-offline.git
```

**2. Acesse a pasta do projeto**

```bash
cd chat-offline
```

**3. Instale as dependências**

```bash
npm install
```

**4. Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação pelo navegador.

## 📦 Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Verifica os tipos TypeScript e gera a versão de produção. |
| `npm run preview` | Executa uma prévia local da versão de produção. |
| `npm run lint` | Analisa o código em busca de problemas de lint. |

## 💾 Persistência dos dados

O histórico das conversas é armazenado no `localStorage` do navegador, utilizando a chave:

```text
chat-offline-conversations
```

**Importante:**
- Os dados ficam armazenados no navegador e dispositivo utilizados.
- Não existe sincronização automática entre dispositivos ou navegadores.
- Limpar os dados do site no navegador pode apagar as conversas salvas.
- Como o projeto não utiliza um servidor para armazenar as mensagens, o histórico não é compartilhado entre usuários.

## 📁 Estrutura principal

```text
src/
├── App.tsx
├── index.css
└── store/
    └── chatStore.ts
```

- **`App.tsx`** — interface principal e interações do chat.
- **`index.css`** — estilos globais da aplicação.
- **`store/chatStore.ts`** — gerenciamento do estado, conversas, mensagens e persistência.

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido para praticar conceitos importantes do desenvolvimento front-end, incluindo componentes React, TypeScript, gerenciamento de estado com Zustand, persistência local de dados e criação de interfaces responsivas.

---

Desenvolvido como projeto de estudo e prática de desenvolvimento front-end.
