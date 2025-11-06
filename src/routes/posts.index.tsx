import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

const getPosts = createServerFn().handler(async () => {
	const posts = await prisma.post.findMany();
	return posts;
});

export const Route = createFileRoute("/posts/")({
	component: RouteComponent,
	loader: async () => getPosts(),
});

function RouteComponent() {
	const posts = Route.useLoaderData();

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Posts</h2>

			{posts.length === 0 ? (
				<div>No posts found</div>
			) : (
				<ul className="space-y-2">
					{posts.map((post) => (
						<li key={post.id}>
							<Link
								to="/posts/$id"
								params={{ id: post.id.toString() }}
								className="text-slate-800 underline hover:text-slate-900"
							>
								{post.title}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
