import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../FeedbacksRepository";

export class PrismaFeedbackRepository implements FeedbacksRepository{
   //quando o chave é igual ao nome da variável que contem o valor podemos usar short Syntax
  async create({type, comment, screenshot}: FeedbackCreateData){
    await prisma.feedback.create({  
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}