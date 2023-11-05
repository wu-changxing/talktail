"use client";
import Link from 'next/link';

// Define your supported languages
const languages = ['en', 'fr', 'es', 'zh-hans']; // Add your languages here

export default function LanguageSwitcher({ currentLocale }) {
    // Function to generate the URL for a given language
    const makeLocaleUrl = (lang, currentPath, searchParams) => {
        // Split the path into segments
        const pathSegments = currentPath.split('/');
        // Replace the first segment (language code) with the new language code
        if (pathSegments.length > 1 && languages.includes(pathSegments[1])) {
            pathSegments[1] = lang;
        } else {
            // If the first segment is not a language code, add the language code at the beginning
            pathSegments.splice(1, 0, lang);
        }
        const newPath = pathSegments.join('/');
        // Retain the search parameters (query parameters)
        const queryString = searchParams.toString();
        return `${newPath}${queryString ? `?${queryString}` : ''}`;
    };

    // Ensure window is defined (necessary for server-side rendering)
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();

    return (
        <div>
            {languages.map((lang) => (
                <Link
                    key={lang}
                    href={makeLocaleUrl(lang, currentPath, searchParams)}
                    locale={lang}

                     style={{ marginRight: '10px', textDecoration: currentLocale === lang ? 'underline' : 'none' }}>
                        {lang.toUpperCase()}
                </Link>
            ))}
        </div>
    );
}
