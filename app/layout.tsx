import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "메이플랜드 몬스터파크 경험치 계산기",
  description: "메이플랜드 버닝서버 몬스터파크 이벤트로 얻을 경험치와 최종 레벨을 정확히 계산해보세요.",
  keywords: ["메이플랜드", "경험치계산기", "몬스터파크", "버닝서버", "EXP계산", "메랜 계산기"],
  authors: [{ name: "메랜 경험치 계산기" }],
  openGraph: {
    title: "메이플랜드 몬스터파크 경험치 계산기",
    description: "버닝서버 몬스터파크 이벤트의 경험치와 최종 레벨을 계산하세요",
    url: "https://mapleland-monsterpark.vercel.app",
    type: "website",
    images: [
      {
        url: "https://mapleland-monsterpark.vercel.app/images/thums/thum.png",
        width: 1200,
        height: 630,
        alt: "메이플랜드 경험치 계산기",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "메이플랜드 몬스터파크 경험치 계산기",
    description: "버닝서버 EXP 계산 도구",
    images: ["https://mapleland-monsterpark.vercel.app/images/thums/thum.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  metadataBase: new URL("https://mapleland-monsterpark.vercel.app"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X38ETBVM40"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-X38ETBVM40', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
