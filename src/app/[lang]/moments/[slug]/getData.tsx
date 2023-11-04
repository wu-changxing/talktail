export async function loadMeta(slug:string) {
    const response = await fetch(`http://127.0.0.1:8000/api/v2/pages/?slug=${slug}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    const jsonData = await response.json();
    return jsonData;
}
export async function loadPost(id:number) {

    const response = await fetch(`http://127.0.0.1:8000/api/v2/pages/${id}/`);
    if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    const jsonData = await response.json();
    return jsonData;
}
