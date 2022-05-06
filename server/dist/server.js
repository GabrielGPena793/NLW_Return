"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // config para fazer o express começar a aceitar JSON
app.use(routes_1.routes);
app.listen(3333, () => {
    console.log("HTTP server running");
});
// SQLite -> banco teste
// Prisma -> é uma ORM, converte código javascript em SQL 
//  dependências do prisma npm i prisma -D e npm i @prisma/client
//  npx prisma init -> para iniciar o prisma
//  npx prisma migrate dev -> para criar as tabelas 
// npx prisma studio -> abre um interface gráfica do prisma para visualizar as tabelas
