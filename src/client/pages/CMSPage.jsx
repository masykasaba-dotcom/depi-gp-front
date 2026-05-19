import React from "react";
import { useParams, Link } from "react-router";
import { useGetCMSPage } from "../hooks/useCMS";

// Reusable CMS Page renderer — reads any /cms/:key and renders it
export default function CMSPage({ pageKey: propKey }) {
  const params = useParams();
  const key = propKey || params.key;
  
  const { data, isLoading, isError } = useGetCMSPage(key);
  const page = data?.data;

  const titleMap = {
    about: "About DermaCare",
    privacy_policy: "Privacy Policy",
    terms: "Terms & Conditions",
    returns_policy: "Returns Policy",
    contact_info: "Contact Information",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] py-24">
        <div className="mx-auto max-w-3xl px-6 animate-pulse">
          <div className="h-10 w-64 bg-[#EAEAEA] rounded mb-12 mx-auto" />
          {[1,2,3,4,5,6,7].map(i => (
            <div key={i} className={`h-4 ${i % 3 === 0 ? 'w-3/4' : 'w-full'} bg-[#EAEAEA] rounded mb-4`} />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !page) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#555a5b] mb-4">This page could not be found.</p>
          <Link to="/" className="text-[#06373A] font-bold hover:underline">← Go Home</Link>
        </div>
      </div>
    );
  }

  const title = page.title || titleMap[key] || key?.replace(/_/g, " ");

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 border-b border-[#E8E4DE] pb-12">
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#aab7c4] mb-4">DermaCare</p>
          <h1 className="font-display-lg text-[40px] text-[#06373A] capitalize">
            {title}
          </h1>
          {page.updated_at && (
            <p className="text-[12px] text-[#aab7c4] mt-4">
              Last updated: {new Date(page.updated_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}
        </div>

        {/* Content */}
        {typeof page.content === "string" ? (
          <div
            className="prose prose-lg max-w-none text-[#555a5b] leading-relaxed
              [&_h2]:font-display-lg [&_h2]:text-[#06373A] [&_h2]:text-[26px] [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:font-display-lg [&_h3]:text-[#06373A] [&_h3]:text-[20px] [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:mb-5 [&_p]:text-[15px]
              [&_ul]:mb-5 [&_ul]:pl-6 [&_li]:mb-2 [&_li]:text-[15px]
              [&_strong]:text-[#06373A] [&_strong]:font-semibold
              [&_a]:text-[#06373A] [&_a]:underline [&_a]:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        ) : typeof page.content === "object" && page.content !== null ? (
          // Handle JSON content (like contact_info)
          <div className="space-y-6">
            {Object.entries(page.content).map(([k, v]) => (
              <div key={k} className="bg-white border border-[#E8E4DE] rounded-xl p-6">
                <p className="text-[10px] font-bold tracking-wider uppercase text-[#aab7c4] mb-2 capitalize">
                  {k.replace(/_/g, " ")}
                </p>
                <p className="text-[15px] font-semibold text-[#06373A]">{String(v)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#555a5b]">No content available.</p>
        )}
      </div>
    </div>
  );
}
