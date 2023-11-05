export async function getGeolocationData(ipAddress) {
    const apiKey = process.env.GEO_API_KEY;
    if (!apiKey) {
        console.error('Geolocation API key is not set');
        return null;
    }

    const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ipAddress}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data; // data contains geolocation info
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
        return null;
    }
}
