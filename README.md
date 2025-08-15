# Projeto Fullstack

Um sistema completo desenvolvido com arquitetura moderna, composto por frontend em React, backend principal e servidor legado.

## 📋 Visão Geral

Este projeto consiste em uma aplicação fullstack com as seguintes partes:

- **Frontend**: Interface moderna desenvolvida em React com TypeScript
- **Backend Principal**: API REST com Express.js, MySQL e Sequelize
- **Servidor Legado**: API complementar com Express.js e MongoDB

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilos
- **Framer Motion** - Animações
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Zustand** - Gerenciamento de estado
- **Shadnc/ui** - Componentes acessíveis
- **Lucide React** - Ícones
- **Axios** - Cliente HTTP

### Backend Principal
- **Node.js** - Runtime JavaScript
- **Express 5** - Framework web
- **TypeScript** - Tipagem estática
- **MySQL** - Banco de dados principal
- **Sequelize** - ORM para MySQL
- **Winston** - Sistema de logs
- **Node-Cron** - Agendamento de tarefas
- **Zod** - Validação de dados
- **Scalar** - Documentação da API

### Servidor Legado
- **Node.js** - Runtime JavaScript
- **Express 5** - Framework web
- **TypeScript** - Tipagem estática
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **Winston** - Sistema de logs

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **MySQL** (para o backend principal)
- **MongoDB** (para o servidor legado)
- **npm** ou **yarn**

### Configuração

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-projeto>
   ```

2. **Configure as variáveis de ambiente**
   
   Crie os arquivos de ambiente necessários:
   
   **Backend Principal:**
   ```bash
   # .env.development
   DATABASE_URL=mysql://user:password@localhost:3306/database_name
   PORT=3001
   
   # .env.production
   DATABASE_URL=mysql://user:password@localhost:3306/database_name_prod
   PORT=3001
   ```
   
   **Servidor Legado:**
   ```bash
   # .env.development
   MONGODB_URI=mongodb://localhost:27017/database_name
   PORT=3002
   
   # .env.production
   MONGODB_URI=mongodb://localhost:27017/database_name_prod
   PORT=3002
   ```

### Instalação e Execução

#### 1. Backend Principal
```bash
cd backend
npm install
npm run dev  # Para desenvolvimento
# ou
npm run prod # Para produção
```

#### 2. Servidor Legado
```bash
cd server-legado
npm install
npm run dev  # Para desenvolvimento
# ou
npm run prod # Para produção
```

#### 3. Frontend
```bash
cd front-end
npm install
npm run dev  # Para desenvolvimento
npm run build # Para produção
```

## 📁 Estrutura do Projeto

```
projeto/
├── backend/              # API principal (MySQL)
│   ├── src/
│   │   └── server.ts    # Servidor principal
│   ├── package.json
│   └── ...
├── server-legado/        # API legada (MongoDB)
│   ├── src/
│   │   └── server.ts    # Servidor legado
│   ├── package.json
│   └── ...
├── front-end/           # Interface do usuário
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md
```

## 🔗 URLs de Desenvolvimento

- **Frontend**: http://localhost:4000 
- **Backend Principal**: http://localhost:3001
- **Servidor Legado**: http://localhost:5000
- **Documentação da API**: http://localhost:3001/docs (Scalar)

## 📚 Documentação da API

O backend principal utiliza o **Scalar** para documentação automática da API. Acesse `/docs` no servidor para visualizar todos os endpoints disponíveis.

## 🔄 Scripts Disponíveis

### Backend Principal
- `npm run dev` - Executa em modo desenvolvimento
- `npm run prod` - Executa em modo produção

### Servidor Legado
- `npm run dev` - Executa em modo desenvolvimento
- `npm run prod` - Executa em modo produção

### Frontend
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção

## 🔧 Recursos Principais

### Backend
- ✅ API REST completa
- ✅ Banco de dados MySQL com Sequelize
- ✅ Sistema de logs com Winston
- ✅ Agendamento de tarefas (node-cron)
- ✅ Validação de dados com Zod
- ✅ Documentação automática da API
- ✅ Suporte a CORS

### Frontend
- ✅ Interface moderna e responsiva
- ✅ Componentes reutilizáveis com Radix UI
- ✅ Animações fluidas com Framer Motion
- ✅ Formulários com validação
- ✅ Gerenciamento de estado global
- ✅ Design system com Tailwind CSS

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

---
