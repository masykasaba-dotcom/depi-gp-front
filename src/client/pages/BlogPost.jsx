import React from "react";
import { Link, useParams } from "react-router";
import { useGetBlogPost } from "../hooks/useBlog";

export default function BlogPost() {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetBlogPost(slug);
  const post = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] py-24">
        <div className="mx-auto max-w-3xl px-6 animate-pulse">
          <div className="h-6 w-32 bg-[#EAEAEA] rounded mb-8" />
          <div className="h-12 w-full bg-[#EAEAEA] rounded mb-4" />
          <div className="h-4 w-48 bg-[#EAEAEA] rounded mb-12" />
          <div className="h-80 w-full bg-[#EAEAEA] rounded-2xl mb-12" />
          {[1,2,3,4,5].map(i => <div key={i} className="h-4 w-full bg-[#EAEAEA] rounded mb-3" />)}
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[#06373A] text-[24px] mb-4">Article not found</h2>
          <Link to="/blog" className="text-[#06373A] font-bold hover:underline">← Back to Journal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-24">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-[#aab7c4] mb-10">
          <Link to="/" className="hover:text-[#06373A] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-[#06373A] transition-colors">Journal</Link>
          <span>/</span>
          <span className="text-[#06373A]">{post.title}</span>
        </nav>

        {/* Category & Date */}
        <div className="flex items-center gap-3 mb-6">
          {post.category && (
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#06373A] bg-[#E8EFF0] px-3 py-1 rounded-full">
              {post.category}
            </span>
          )}
          {post.published_at && (
            <span className="text-[12px] text-[#aab7c4]">
              {new Date(post.published_at).toLocaleDateString("en-US", {
                weekday: "long", month: "long", day: "numeric", year: "numeric"
              })}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display-lg text-[40px] lg:text-[48px] text-[#06373A] leading-tight mb-4">
          {post.title}
        </h1>

        {/* Author */}
        {post.author && (
          <p className="text-[13px] text-[#555a5b] mb-10">
            By <span className="font-semibold text-[#06373A]">{post.author}</span>
          </p>
        )}

        {/* Cover Image */}
        {post.cover_image && (
          <div className="rounded-2xl overflow-hidden mb-12 aspect-[16/9]">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Body Content */}
        <div
          className="prose prose-lg max-w-none text-[#555a5b] leading-relaxed
            [&_h2]:font-display-lg [&_h2]:text-[#06373A] [&_h2]:text-[28px] [&_h2]:mt-12 [&_h2]:mb-4
            [&_h3]:font-display-lg [&_h3]:text-[#06373A] [&_h3]:text-[22px] [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:mb-5 [&_p]:text-[15px]
            [&_ul]:mb-5 [&_ul]:pl-6 [&_li]:mb-2
            [&_strong]:text-[#06373A] [&_strong]:font-semibold
            [&_a]:text-[#06373A] [&_a]:underline [&_a]:underline-offset-2"
          dangerouslySetInnerHTML={{ __html: post.content || post.body || "" }}
        />

        {/* Back to Journal */}
        <div className="mt-16 pt-8 border-t border-[#E8E4DE]">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[13px] font-bold tracking-wider uppercase text-[#06373A] hover:gap-3 transition-all"
          >
            ← Back to Journal
          </Link>
        </div>
      </article>
    </div>
  );
}
