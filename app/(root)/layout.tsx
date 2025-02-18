export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
        <main className="flex-1 wrapper-1">
            {children}
        </main>
    </div>
  );
}
