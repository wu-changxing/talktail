// src/app/layout.tsx
import './globals.css';
import LanguageSwitcher from './components/LanguageSwitcher';
import { Inter, Zhi_Mang_Xing, Long_Cang, Ma_Shan_Zheng, Noto_Sans } from 'next/font/google';

const zhiMangXing = Zhi_Mang_Xing({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    variable: '--font-zhi-mang-xing',
});
const maShanZheng = Ma_Shan_Zheng({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    variable: '--font-ma-shan-zheng',
});
const inter = Inter({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    variable: '--font-inter',
});
const longCang = Long_Cang({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    variable: '--font-long-cang',
});



export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`${longCang.variable} ${zhiMangXing.variable} ${maShanZheng}`}>
            <header>
                {/* Place the LanguageSwitcher in the header or wherever appropriate */}
                <LanguageSwitcher />
            </header>
            {/* The rest of your page content will be injected here */}
            {children}
        </div>
    );
}
