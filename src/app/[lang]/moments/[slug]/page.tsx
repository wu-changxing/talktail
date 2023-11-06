// app/[lang]/moments/[postSlug]/page.tsx
import Link from 'next/link'; // Make sure to import Link from 'next/link', not 'next/app'
import Layout from '../../../layout';
import {Locale} from '../../../../i18n-config'
import {loadMeta,loadPost} from "@/app/[lang]/moments/[slug]/getData";
import PostContent from "@/app/[lang]/moments/[slug]/PostContent";
import CommentsComponent from "@/app/components/comments/Comments";
import ViewinfoCollector from "@/app/components/ViewInfoCollector";
// Define a loader function outside of your component to fetch data server-side
type Props = {
    params:{lang:Locale, slug:string};
    searchParams:{ [key: string]: string | string[] | undefined };
}
export default async function BlogPost({
                                           params,
                                           searchParams,
                                       }:Props) {
    const slug = params.slug;
    const lang = params.lang;
    const data = await loadMeta(slug);
    const items = data.items;
    const meta = data.meta;
    const source= searchParams.source;
    const email= searchParams.email;
    const nickname= searchParams.nickname;
    // You might want to get the preferred language from the headers instead.
    // For simplicity, let's default to English ('en') for now.
    const defaultLanguage = 'en';

    let metaContent = items.find(item => item.meta.locale === lang);

    // Fall back to default language if no matching post is found
    if (!metaContent) {
        metaContent = items.find(item => item.meta.locale === defaultLanguage);
    }

    // If no content is found at all, show a message
    if (!metaContent) {
        return <Layout>No post found or there is an issue fetching the post content.</Layout>;
    }
    const post = await loadPost(metaContent.id)
    console.log(post)


    // Render the content
    return (
        <div>
            <PostContent post={post} />
            <CommentsComponent slug={slug}/>
            <ViewinfoCollector slug={slug} source={source} email={email} nickname={nickname}/>
        </div>
    );
}
