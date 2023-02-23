import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const entryRouter = createTRPCRouter({
  createEntry: publicProcedure.input(z.object({
    emotion: z.number(),
    userID: z.string(),
  })).mutation(async (ctx)=>{
    return await ctx.ctx.prisma.entry.create({data: {
        emotion: ctx.input.emotion,
        userId: ctx.input.userID,
    }});
  }),
});
