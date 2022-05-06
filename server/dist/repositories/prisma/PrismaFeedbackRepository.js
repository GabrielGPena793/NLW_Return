"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFeedbackRepository = void 0;
const prisma_1 = require("../../prisma");
class PrismaFeedbackRepository {
    //quando o chave é igual ao nome da variável que contem o valor podemos usar short Syntax
    async create({ type, comment, screenshot }) {
        await prisma_1.prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
            },
        });
    }
}
exports.PrismaFeedbackRepository = PrismaFeedbackRepository;
