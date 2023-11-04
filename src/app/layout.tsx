// src/app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import LanguageSwitcher from './components/LanguageSwitcher';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            {/* Add global site tag (gtag.js) - Google Analytics */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `,
                }}
            />
            <style>{inter.styles}</style>
        </head>
        <body className={inter.className}>
        <header>
            {/* Place the LanguageSwitcher in the header or wherever appropriate */}
            <LanguageSwitcher />
        </header>
        {/* The rest of your page content will be injected here */}
        {children}
        </body>
        </html>
    );
}
