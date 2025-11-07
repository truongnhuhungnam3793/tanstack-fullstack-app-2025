import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPostById } from "@/server/posts";

export const Route = createFileRoute("/posts/$id")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const post = await getPostById({ data: params.id });

		if (!post) {
			throw notFound();
		}

		return post;
	},
});

function RouteComponent() {
	const post = Route.useLoaderData();

	return (
		<div>
			<article className="space-y-8">
				<h1 className="text-3xl font-bold text-slate-900">{post.title}</h1>
				<p className="whitespace-pre-line text-slate-800">{post.content}</p>
			</article>
		</div>
	);
}
