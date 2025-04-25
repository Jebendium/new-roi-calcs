import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Employee Benefits ROI Calculator Suite',
  description: 'Comprehensive tools to calculate the real value and return on investment for UK employee benefits and HR systems',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen bg-slate-50">
        {children}
      </body>
    </html>
  );
}
