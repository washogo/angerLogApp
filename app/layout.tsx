import "server-only";

import "./globals.css";

export const metadata = {
  title: "アンガーログアプリ",
  description:
    "このアプリは、ユーザーが自分の怒りのレベル、日時、状況、感情等を記録し、振り返り分析することで、感情のコントロールを助けることを目的としたアプリです。",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
  icons: {
    icon: "/favicon.ico",
  },
  other: [
    {
      rel: "preload",
      href: "/_next/static/css/app/layout.css",
      as: "style",
    },
  ],
};

/**
 * レイアウト
 * @param
 * @returns
 */
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 container max-w-screen-xl mx-auto px-5 py-10">
            {children}
          </main>

          <footer className="py-5 border-t">
            <div className="text-center text-sm text-gray-500">
              Copyright © All rights reserved
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
