import Container from "@/components/container";
import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { getPostById } from "@/lib/actions";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;
  const post = await getPostById(id);
  console.log(post);

  if (!post) {
    return notFound();
  }

  return (
    <Container>
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
      <article>
        <h1 className="text-4xl font-bold mb-4">{post.data?.title}</h1>
        <div className="flex items-center gap-2 text-muted-foreground mb-8">
          <span>{`${post.data?.author.firstName} ${post.data?.author.lastName}`}</span>
          <span> - </span>
          <time dateTime={post.data?.createdAt.toISOString()}>
            {post.data?.createdAt
              ? formatDate(post.data?.createdAt)
              : "Unknown Date"}
          </time>
        </div>

        <RichTextEditor content={post.data?.content || ""} editable={false} />
      </article>
    </Container>
  );
}
