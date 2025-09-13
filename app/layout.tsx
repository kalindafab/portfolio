import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { ParticlesBackground } from '@/components/particles-background';
import { Footer } from '@/components/footer';
import { getPersonalInfo } from '@/lib/config';
import { Toaster } from '@/components/ui/toaster';
import { LoadingAnimation } from '@/components/loading-animation';
import { ScrollIndicator } from '@/components/scroll-indicator';

const inter = Inter({ subsets: ['latin'] });

const personalInfo = getPersonalInfo();

export const metadata: Metadata = {
  title: `${personalInfo.name} - ${personalInfo.title}`,
  description: personalInfo.bio,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingAnimation />
          <ParticlesBackground />
          <Navbar />
          <ScrollIndicator />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}