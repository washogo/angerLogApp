import "server-only";

import "./globals.css";
import { ToastContainer } from "react-toastify";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export const metadata = {
  title: "アンガーログアプリ",
  description:
    "このアプリは、ユーザーが自分の怒りのレベル、日時、状況、感情等を記録し、振り返り分析することで、感情のコントロールを助けることを目的としたアプリです。",
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
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
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
        <AppRouterCacheProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1 container max-w-screen-xl mx-auto">
              <ToastContainer position="top-center" />
              {children}
            </main>

            <footer className="py-5 border-t">
              <div className="text-center text-sm text-gray-500">
                Copyright © All rights reserved
              </div>
            </footer>
          </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
