export type NewsItem = {
  title: string;
  source: string;
  time: string;
  state?: string;
  link: string;
};

const RSS2JSON = 'https://api.rss2json.com/v1/api.json?rss_url=';

export const NEWS_FEEDS = [
  {
    name: 'NDTV India',
    color: '#ff6b35',
    rss: RSS2JSON + encodeURIComponent('https://feeds.feedburner.com/ndtvnews-india-news'),
  },
  {
    name: 'Times of India',
    color: '#00b4ff',
    rss: RSS2JSON + encodeURIComponent('https://timesofindia.indiatimes.com/rssfeedstopstories.cms'),
  },
  {
    name: 'Indian Express',
    color: '#ff2244',
    rss: RSS2JSON + encodeURIComponent('https://indianexpress.com/feed/'),
  },
  {
    name: 'UP Tak',
    color: '#ff8800',
    rss: RSS2JSON + encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UCR_9I9gOaGI0l5HdWGVh8Pw'),
  },
];

export const SAMPLE_NEWS: NewsItem[] = [
  { title: 'PM inaugurates new expressway connecting Delhi-Mumbai', source: 'NDTV', time: '5m ago', state: 'National', link: '#' },
  { title: 'IMD issues heatwave warning for North India states', source: 'TOI', time: '18m ago', state: 'National', link: '#' },
  { title: 'Kumbh Mela 2025 sets world record for pilgrims', source: 'Indian Express', time: '1h ago', state: 'UP', link: '#' },
  { title: 'Bengaluru Metro Phase 3 gets cabinet approval', source: 'NDTV', time: '2h ago', state: 'Karnataka', link: '#' },
  { title: 'Monsoon arrives 3 days early in Kerala', source: 'TOI', time: '3h ago', state: 'Kerala', link: '#' },
  { title: 'Golden Temple receives highest footfall this year', source: 'Tribune', time: '4h ago', state: 'Punjab', link: '#' },
];

export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const promises = NEWS_FEEDS.map(async (feed) => {
      const res = await fetch(feed.rss, { next: { revalidate: 300 } });
      if (!res.ok) return [];
      const data = await res.json();
      return (data.items || []).map((item: any) => ({
        title: item.title,
        source: feed.name,
        time: 'Recently',
        link: item.link,
      }));
    });

    const results = await Promise.all(promises);
    const flattened = results.flat().filter(item => item.title);
    
    if (flattened.length === 0) return SAMPLE_NEWS;
    
    return flattened.slice(0, 15);
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return SAMPLE_NEWS;
  }
}
