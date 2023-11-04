"use client";
import Link from 'next/link';

// Define your supported languages
const languages = ['en', 'fr', 'es']; // Add your languages here

export default function LanguageSwitcher({ currentLocale }) {
    // Assuming `currentLocale` is passed as a prop to this component

    // Function to generate the URL for a given language
    const makeLocaleUrl = (lang, currentPath) => {
        // If the current locale is already in the path, replace it
        const newPath = currentPath.replace(/^\/[a-z]{2}(\/|$)/, `/${lang}$1`);
        return newPath;
    };

    return (
        <div>
            {languages.map((lang) => (
                <Link
                    key={lang}
                    href={makeLocaleUrl(lang, window.location.pathname)}
                    locale={lang}
                >
                    <span style={{ marginRight: '10px', textDecoration: currentLocale === lang ? 'underline' : 'none' }}>
                        {lang.toUpperCase()}
                    </span>
                </Link>
            ))}
        </div>
    );
}
