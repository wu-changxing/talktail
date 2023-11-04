// app/[lang]/moments/[slug]/page.tsx
import Link from 'next/link'; // Make sure to import Link from 'next/link', not 'next/app'
import Layout from '../../../layout';
import Locale from '../../../../i18n-config'

// Define a loader function outside of your component to fetch data server-side
export async function loader(slug) {
    const response = await fetch(`http://127.0.0.1:8000/api/v2/pages/?slug=${slug}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    const jsonData = await response.json();
    return jsonData;
}

export default async function BlogPostPage({params: {lang, slug},}: { params: { lang: Locale, slug: string } })
{
    const data = await loader(slug);
    const items = data.items;
    const error = data.error;
    const meta = data.meta;



    // This will be server-side, so `navigator` is not available.
    // You might want to get the preferred language from the headers instead.
    // For simplicity, let's default to English ('en') for now.
    const defaultLanguage = 'en';

    let postContent = items.find(item => item.meta.locale === lang);

    // Fall back to default language if no matching post is found
    if (!postContent) {
        postContent = items.find(item => item.meta.locale === defaultLanguage);
    }

    // If no content is found at all, show a message
    if (!postContent) {
        return <Layout>No post found or there is an issue fetching the post content.</Layout>;
    }

    // Render the content
    return (
        <Layout>
            <nav>
                {/* Language Switcher */}
                {items.map((item) => (
                    <Link key={item.id} href={`/moments/${item.meta.slug}`} locale={item.meta.locale}>
                       {item.meta.locale.toUpperCase()}
                    </Link>
                ))}
            </nav>
            <article>
                <h1>{postContent.title}</h1>
                {/* Render your content here */}
                <div>Content for {postContent.meta.locale}</div>
            </article>
        </Layout>
    );
}
