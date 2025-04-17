
import React from "react";
import { Header } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-6 md:py-8">
        {children}
      </main>
      <footer className="border-t py-6 bg-white/50">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Savings Savvy. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Helping you save for what matters most
          </p>
        </div>
      </footer>
    </div>
  );
}
