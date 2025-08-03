import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const apiKey = process.env.GOOGLE_PLACES_API_KEY;
        const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

        if (!apiKey || !placeId) {
            return NextResponse.json({ error: "Missing API key or Place ID" }, { status: 500 });
        }

        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,reviews,user_ratings_total&language=fr&key=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();

        console.log(data)

        if (!data.result) {
            return NextResponse.json({
                error: "Google API error",
                status: data.status,
                message: data.error_message,
                detail: data,
            }, { status: 500 });
        }

        return NextResponse.json({
            rating: data.result.rating,
            user_ratings_total: data.result.user_ratings_total,
            reviews: data.result.reviews?.map((r: any) => ({
                author_name: r.author_name,
                profile_photo_url: r.profile_photo_url,
                rating: r.rating,
                text: r.text,
                time: r.relative_time_description,
            })),
        });
    } catch (e) {
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
