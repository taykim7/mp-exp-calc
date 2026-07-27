import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "메랜 몬스터파크 경험치 계산기",
  description: "이벤트 진행으로 얻는 최종 레벨과 경험치를 계산해보세요!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
