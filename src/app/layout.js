import { Inter } from 'next/font/google';
import './App.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Test Ops',
    description: 'A system for test operations',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${inter.className} min-h-screen bg-gray-50`}>
        {children}
        </body>
        </html>
    );
}