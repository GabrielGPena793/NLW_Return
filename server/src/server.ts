import express from "express";
import cors from "cors"
import { routes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());                                                    // config para fazer o express começar a aceitar JSON
app.use(routes);

app.listen(3333, () => {
  console.log("HTTP server running")
});

// SQLite -> banco teste
// Prisma -> é uma ORM, converte código javascript em SQL 
//  dependências do prisma npm i prisma -D e npm i @prisma/client
//  npx prisma init -> para iniciar o prisma
//  npx prisma migrate dev -> para criar as tabelas 
// npx prisma studio -> abre um interface gráfica do prisma para visualizar as tabelas