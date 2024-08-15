import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from '@trpc/server';
import fs from 'fs';
import path from 'path';

export const postRouter = createTRPCRouter({
  createPost: publicProcedure
    .input(z.object({ description: z.string().min(1), file: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      try {
        const uploadsDir = 'uploads';
        
        // Ensure the uploads directory exists
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir);
        }

        const fileName = `${uploadsDir}/${Date.now()}_${path.basename(input.file)}`;
        fs.writeFileSync(fileName, input.file, 'base64');

        const post = await ctx.db.designPost.create({
          data: {
            description: input.description,
            image: fileName,
          },
        });

        return post;
      } catch (error) {
        console.error(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create post' });
      }
    }),
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),
});