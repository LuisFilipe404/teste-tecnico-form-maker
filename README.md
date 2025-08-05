# 📝 Form Maker

Form Maker é um projeto desenvolvido como teste técnico. Ele permite a criação dinâmica de formulários com múltiplos tipos de perguntas, organização por ordem, e visual responsivo com Tailwind CSS.

---

## 🚀 Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zustand](https://github.com/pmndrs/zustand) – gerenciamento de estado

---

## 💻 Como Rodar Localmente

Clone o repositório:

```bash
cd https://github.com/LuisFilipe404/teste-tecnico-form-maker.git
cd form-maker
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` com as variáveis necessárias:

```env
DATABASE_USER="postgres"
DATABASE_PASSWORD="715905854476"
DATABASE_HOST="localhost"
DATABASE_PORT=5432
DATABASE_NAME="main"

DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}"
```

Rode o Banco de Dados Postgres no Docker compose (Certifique-se de ter disponível a porta 5432):

```bash
docker compose up -d
```

Rode as migrações do banco de dados:

```bash
npx prisma migrate dev
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para ver o projeto rodando.

---

## 📜 Scripts Disponíveis

```bash
npm run dev         # Inicia o servidor de desenvolvimento
npm run build       # Gera o build de produção
npm run start       # Inicia o servidor após o build
npx prisma studio   # Abre o Prisma Studio para visualizar o banco
```

---

## 🧪 Status do Teste Técnico

✅  Implementação:

- Criação de formulários dinâmicos  
- Drag and drop para ordenação das questões  
- Validação de campos  
- Salvar no banco com Prisma  
- Responsividade

