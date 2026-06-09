import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get('channel');
  const query = searchParams.get('query');

  try {
    let videoId = null;

    // if we got a search query, let's scrape youtube search page
    // youtube blocks direct channel embed sometimes, this is a neat bypass lol
    if (query) {
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}+live`;
      const res = await fetch(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        next: { revalidate: 300 }
      });
      const text = await res.text();
      const match = text.match(/"videoId":"([^"]+)"/);
      if (match && match[1]) {
        videoId = match[1];
      }
    }

    // fallback to channel ID scraping if search didn't work or wasn't provided
    if (!videoId && channelId) {
      const res = await fetch(`https://www.youtube.com/channel/${channelId}/live`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        next: { revalidate: 300 }
      });
      const text = await res.text();
      const match = text.match(/"videoId":"([^"]+)"/);
      if (match && match[1]) {
        videoId = match[1];
      }
    }
    // found it! redirect iframe straight to the specific video
    if (videoId) {
      return NextResponse.redirect(`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`);
    } else if (channelId) {
      // worst case scenario just use default embed format and pray it works
      return NextResponse.redirect(`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&mute=1`);
    } else {
      return new NextResponse('Not found', { status: 404 });
    }
  } catch (e) {
    if (channelId) {
      return NextResponse.redirect(`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&mute=1`);
    }
    return new NextResponse('Error', { status: 500 });
  }
}
