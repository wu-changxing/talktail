// src/app/moments/page.tsx
import BlogPostPage from './[slug]/page';

const MomentsPage = () => {
    // This is the parent page that might handle routing to individual blog post pages.
    // ... other page logic

    return (
        // ... your other components
        <BlogPostPage />
        // ... your other components
    );
};

export default MomentsPage;
