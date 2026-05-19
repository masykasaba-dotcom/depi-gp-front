import React, { useState } from "react";
import { Link } from "react-router";
import { useGetBlogPosts } from "../hooks/useBlog";

export default function Blog() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetBlogPosts(page, 9);

  const posts = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] py-24">
        <div className="mx-auto max-w-6xl px-6 animate-pulse">
          <div className="h-12 w-64 bg-[#EAEAEA] rounded mb-4 mx-auto" />
          <div className="h-4 w-96 bg-[#EAEAEA] rounded mb-16 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#E8E4DE]">
                <div className="h-52 bg-[#EAEAEA]" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-24 bg-[#EAEAEA] rounded" />
                  <div className="h-6 w-full bg-[#EAEAEA] rounded" />
                  <div className="h-4 w-full bg-[#EAEAEA] rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#555a5b] text-[16px]">Failed to load journal articles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Hero Banner */}
      <div className="bg-[#06373A] py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold tracking-widest uppercase text-[#a8d5b5] mb-4">
            DermaCare Editorial
          </p>
          <h1 className="font-display-lg text-[48px] text-white mb-6 leading-tight">
            The Clinical Journal
          </h1>
          <p className="text-white/70 text-[15px] leading-relaxed">
            Science-backed skincare insights, ingredient deep-dives, and personalized routines from our clinical research team.
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#555a5b] text-[15px]">No articles published yet. Check back soon.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug || post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E8E4DE] hover:shadow-lg transition-shadow"
                >
                  {/* Cover Image */}
                  {post.cover_image ? (
                    <div className="h-52 overflow-hidden">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-52 bg-[#E8EFF0] flex items-center justify-center">
                      <span className="text-[#06373A]/30 font-display-lg text-[40px]">DC</span>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {post.category && (
                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#06373A] bg-[#E8EFF0] px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      )}
                      {post.published_at && (
                        <span className="text-[11px] text-[#aab7c4]">
                          {new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display-lg text-[20px] text-[#06373A] mb-2 leading-snug group-hover:underline underline-offset-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-[13px] text-[#555a5b] leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-4 text-[12px] font-bold tracking-wider uppercase text-[#06373A] flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <span>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-16">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-5 py-2.5 rounded-xl border border-[#E8E4DE] text-[13px] font-semibold text-[#06373A] hover:bg-[#E8EFF0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← Previous
                </button>
                <span className="text-[13px] text-[#555a5b] px-4">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-5 py-2.5 rounded-xl border border-[#E8E4DE] text-[13px] font-semibold text-[#06373A] hover:bg-[#E8EFF0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
