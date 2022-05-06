"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_mail_adapater_1 = require("./adapters/nodemailer/nodemailer-mail-adapater");
const PrismaFeedbackRepository_1 = require("./repositories/prisma/PrismaFeedbackRepository");
const SubmitFeedbackUseCase_1 = require("./use-cases/SubmitFeedbackUseCase");
exports.routes = express_1.default.Router();
exports.routes.post('/feedbacks', async (request, response) => {
    const { type, comment, screenshot } = request.body; // desestruturando a requisição
    const prismaFeedbacksRepository = new PrismaFeedbackRepository_1.PrismaFeedbackRepository();
    const nodemailerMailAdapter = new nodemailer_mail_adapater_1.NodemailerMailAdapter();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase_1.SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);
    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    });
    return response.status(201).send();
});
