import { createServerFn } from "@tanstack/react-start";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export const getPosts = createServerFn().handler(async () => {
	const posts = await prisma.post.findMany();
	return posts;
});
