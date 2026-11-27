import type { Metadata } from "next";
import { Geist, Geist_Mono, Nanum_Myeongjo } from "next/font/google";
import LogoLinkComponent from "@/components/custom/layout/logo-link-component";
import NotificationButtonComponent from "@/components/custom/layout/notification-button-component";
import MyPageButtonComponent from "@/components/custom/auth/my-page-button-component";
import QueryProviderComponent from "@/components/custom/providers/query-provider-component";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nanumMyeongjo = Nanum_Myeongjo({
  variable: "--font-nanum-myeongjo",
  weight: ["400", "700", "800"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Memoit",
  description: "메모를 저장하고 공유해요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} ${nanumMyeongjo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <QueryProviderComponent>
          <header className="sticky top-0 z-50 border-b border-line bg-paper">
            <nav className="mx-auto flex h-20 max-w-page items-center gap-8 px-5 sm:px-10">
              <LogoLinkComponent />
              <NotificationButtonComponent />
              <MyPageButtonComponent />
            </nav>
          </header>
          {children}
        </QueryProviderComponent>
      </body>
    </html>
  );
}
