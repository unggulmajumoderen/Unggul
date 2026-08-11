"use client";

import { useState, useEffect } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [igCopied, setIgCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopyLink = () => {
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleFacebookShare = () => {
    if (!url) return;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank", "width=600,height=400");
  };

  const handleTwitterShare = () => {
    if (!url) return;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank", "width=600,height=400");
  };

  const handleInstagramShare = () => {
    if (!url) return;
    // Instagram tidak punya API web untuk membagikan link.
    // Solusi terbaik: copy link otomatis lalu buka Instagram.
    navigator.clipboard.writeText(url).then(() => {
      setIgCopied(true);
      setTimeout(() => {
        setIgCopied(false);
        window.open("https://www.instagram.com/", "_blank");
      }, 1500);
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button 
        onClick={handleTwitterShare}
        className="bg-white hover:bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center shadow-sm border border-gray-200 hover:border-green-200"
      >
        <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
        Twitter
      </button>
      <button 
        onClick={handleFacebookShare}
        className="bg-white hover:bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center shadow-sm border border-gray-200 hover:border-green-200"
      >
        <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
        Facebook
      </button>
      <button 
        onClick={handleInstagramShare}
        className="bg-white hover:bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center shadow-sm border border-gray-200 hover:border-green-200"
      >
        {igCopied ? (
          <>
            <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Tersalin!
          </>
        ) : (
          <>
            <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            Instagram
          </>
        )}
      </button>
      <button 
        onClick={handleCopyLink}
        className="bg-white hover:bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center shadow-sm border border-gray-200 hover:border-green-200"
      >
        {copied ? (
          <>
            <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Tersalin!
          </>
        ) : (
          <>
            <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            Copy Link
          </>
        )}
      </button>
    </div>
  );
}
