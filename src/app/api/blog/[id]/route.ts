import {NextResponse} from "next/server";

export async function GET(request: Request, context: any, params: { id: string }) {
    console.log("params", context.params)
    console.log("id", params.id)
    const postSlug = params.id
    console.log('Params:', params);
    try {
        NextResponse.json({ postSlug })
    } catch (error) {
        console.error('Failed to fetch comments', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch comments' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}