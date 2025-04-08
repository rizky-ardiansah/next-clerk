import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";
import { Post as PrismaPost, User } from "@prisma/client";

interface Post extends PrismaPost {
  author: User;
}
interface BlogPostListProps {
  posts: Post[];
}

export default function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">
                {DOMPurify.sanitize(post.content, {
                  ALLOWED_TAGS: [],
                })}
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>{`${post.author.firstName} ${post.author.lastName}`}</span>
                <span> </span>
                <time dateTime="{post.createdAt}">
                  {formatDate(post.createdAt)}
                </time>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
