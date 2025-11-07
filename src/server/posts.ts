import { createServerFn } from "@tanstack/react-start";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export const getPosts = createServerFn().handler(async () => {
	const posts = await prisma.post.findMany();
	return posts;
});

export const getPostById = createServerFn()
	.inputValidator((id: unknown) => {
		if (typeof id === "string" && id.length > 0) {
			return id;
		}

		return null;
	})
	.handler(async ({ data: id }) => {
		if (!id) {
			return null;
		}

		const post = await prisma.post.findUnique({
			where: { id },
		});

		if (!post) {
			return null;
		}

		return post;
	});
