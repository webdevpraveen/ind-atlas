export interface Camera {
  id: string;
  name: string;
  location: string;
  state: string;
  type: 'temple' | 'traffic' | 'ghat' | 'city' | 'nature' | 'beach' | 'news';
  source: 'youtube' | 'image';
  youtubeChannelId?: string;
  youtubeVideoId?: string;
  youtubeQuery?: string;
  directImageUrl?: string;
  refreshMs?: number;
  lat: number;
  lng: number;
  status: 'live' | 'checking' | 'offline';
  fallbackUrl?: string;
}

export const CAMERAS: Camera[] = [
  // ================= NATIONAL NEWS (DELHI HQ) =================
  {
    id: 'ndtv-india-live', name: 'NDTV India Live News', location: 'New Delhi', state: 'Delhi', type: 'news', source: 'youtube',
    youtubeChannelId: 'UCZFMm1mMw0F81Z37aaEzTUA', lat: 28.6139, lng: 77.2090, status: 'live'
  },
  {
    id: 'aaj-tak-live', name: 'Aaj Tak Live News', location: 'New Delhi', state: 'Delhi', type: 'news', source: 'youtube',
    youtubeQuery: 'aaj tak news', youtubeChannelId: 'UCt4t-jeY85JegMlZ-E5UWuQ', lat: 28.5500, lng: 77.2100, status: 'live'
  },
  {
    id: 'republic-tv', name: 'Republic TV Live', location: 'New Delhi', state: 'Delhi', type: 'news', source: 'youtube',
    youtubeQuery: 'republic tv english', youtubeChannelId: 'UCwvdWnEwSgKkK1N6D-k4rCQ', lat: 28.6120, lng: 77.2200, status: 'live'
  },
  {
    id: 'india-today', name: 'India Today Live', location: 'New Delhi', state: 'Delhi', type: 'news', source: 'youtube',
    youtubeQuery: 'india today live', youtubeChannelId: 'UCYPvAwZP8pZhSMW8qs7cVCw', lat: 28.5600, lng: 77.2300, status: 'live'
  },

  // ================= UTTAR PRADESH =================
  {
    id: 'kashi-vishwanath', name: 'Kashi Vishwanath Temple', location: 'Varanasi, UP', state: 'Uttar Pradesh', type: 'temple', source: 'youtube',
    youtubeQuery: 'kashi vishwanath temple live darshan', lat: 25.3109, lng: 83.0107, status: 'live'
  },
  {
    id: 'iskcon-vrindavan', name: 'ISKCON Vrindavan', location: 'Vrindavan, UP', state: 'Uttar Pradesh', type: 'temple', source: 'youtube',
    youtubeChannelId: 'UCAA6IsLVfbHrP1I_lzxv09Q', lat: 27.5704, lng: 77.6967, status: 'live'
  },
  {
    id: 'up-tak-news', name: 'UP Tak Live', location: 'Lucknow, UP', state: 'Uttar Pradesh', type: 'news', source: 'youtube',
    youtubeChannelId: 'UCR_9I9gOaGI0l5HdWGVh8Pw', lat: 26.8467, lng: 80.9462, status: 'live'
  },
  {
    id: 'ayodhya-ram-mandir', name: 'Ram Mandir Parisar', location: 'Ayodhya, UP', state: 'Uttar Pradesh', type: 'temple', source: 'youtube',
    youtubeChannelId: 'UCN7nF4v5W0x-Bv9ZkC1x4wQ', lat: 26.7922, lng: 82.2046, status: 'checking'
  },

  // ================= MAHARASHTRA =================
  {
    id: 'shirdi-sai', name: 'Shirdi Sai Baba Temple', location: 'Shirdi, Maharashtra', state: 'Maharashtra', type: 'temple', source: 'youtube',
    youtubeChannelId: 'UCdYR5Oyz8Q4g0ZmB4PkTD0A', lat: 19.7667, lng: 74.4764, status: 'live'
  },
  {
    id: 'abp-majha', name: 'ABP Majha Live', location: 'Mumbai, Maharashtra', state: 'Maharashtra', type: 'news', source: 'youtube',
    youtubeQuery: 'abp majha live', youtubeChannelId: 'UCcdTKv6nZpA3845bH8t4Pcw', lat: 19.0760, lng: 72.8777, status: 'live'
  },
  {
    id: 'tv9-marathi', name: 'TV9 Marathi', location: 'Pune, Maharashtra', state: 'Maharashtra', type: 'news', source: 'youtube',
    youtubeChannelId: 'UCBIfZ27n78gM5T1aE0n9Bpw', lat: 18.5204, lng: 73.8567, status: 'live'
  },
  {
    id: 'mumbai-traffic-bkc', name: 'BKC Junction', location: 'Mumbai, Maharashtra', state: 'Maharashtra', type: 'traffic', source: 'image',
    directImageUrl: 'https://images.livemint.com/img/2022/10/24/600x338/MUMBAI-TRAFFIC_1666611462473_1666611462678_1666611462678.jpg', refreshMs: 60000, lat: 19.0658, lng: 72.8658, status: 'checking'
  },

  // ================= WEST BENGAL =================
  {
    id: 'iskcon-mayapur', name: 'ISKCON Mayapur', location: 'Mayapur, West Bengal', state: 'West Bengal', type: 'temple', source: 'youtube',
    youtubeChannelId: 'UCQG0YwKntJ0W0b5H2Fh50bw', lat: 23.4244, lng: 88.3888, status: 'live'
  },
  {
    id: 'abp-ananda', name: 'ABP Ananda Live', location: 'Kolkata, West Bengal', state: 'West Bengal', type: 'news', source: 'youtube',
    youtubeChannelId: 'UCGfE8V983z3rL8h3lBOPsBw', lat: 22.5726, lng: 88.3639, status: 'live'
  },

  // ================= GUJARAT =================
  {
    id: 'somnath-temple', name: 'Somnath Temple Live', location: 'Prabhas Patan, Gujarat', state: 'Gujarat', type: 'temple', source: 'youtube',
    youtubeChannelId: 'UC7-M4J0A23k38PzX5YQd9Kw', lat: 20.8880, lng: 70.4010, status: 'live'
  },
  {
    id: 'tv9-gujarati', name: 'TV9 Gujarati Live', location: 'Ahmedabad, Gujarat', state: 'Gujarat', type: 'news', source: 'youtube',
    youtubeChannelId: 'UC12s2E910xW0r4aZ3X11JBA', lat: 23.0225, lng: 72.5714, status: 'live'
  },

  // ================= KARNATAKA =================
  {
    id: 'tv9-kannada', name: 'TV9 Kannada Live', location: 'Bengaluru, Karnataka', state: 'Karnataka', type: 'news', source: 'youtube',
    youtubeChannelId: 'UC2OaK_jS9W5-R2Jj0A3N8Xw', lat: 12.9716, lng: 77.5946, status: 'live'
  },
  {
    id: 'bengaluru-silkboard', name: 'Silk Board Junction', location: 'Bengaluru, Karnataka', state: 'Karnataka', type: 'traffic', source: 'image',
    directImageUrl: 'https://images.indianexpress.com/2023/09/bengaluru-traffic.jpg', lat: 12.9177, lng: 77.6238, status: 'checking'
  },

  // ================= TAMIL NADU =================
  {
    id: 'puthiya-thalaimurai', name: 'Puthiya Thalaimurai', location: 'Chennai, Tamil Nadu', state: 'Tamil Nadu', type: 'news', source: 'youtube',
    youtubeChannelId: 'UC51X57oDqgS-e4FzZc8s9Lg', lat: 13.0827, lng: 80.2707, status: 'live'
  },
  {
    id: 'meenakshi-temple', name: 'Meenakshi Temple', location: 'Madurai, Tamil Nadu', state: 'Tamil Nadu', type: 'temple', source: 'youtube',
    youtubeChannelId: 'UCXJv4o9YgE8R4z4X8u8X_4w', lat: 9.9195, lng: 78.1193, status: 'checking'
  },

  // ================= ANDHRA PRADESH / TELANGANA =================
  {
    id: 'tirupati-queue-cam', name: 'TTD Tirumala Queue Cam', location: 'Tirupati, Andhra Pradesh', state: 'Andhra Pradesh', type: 'traffic', source: 'youtube',
    youtubeVideoId: 'cuGuTJPg_I8', lat: 13.6833, lng: 79.3465, status: 'live'
  },
  {
    id: 'tv9-telugu', name: 'TV9 Telugu Live', location: 'Hyderabad, Telangana', state: 'Telangana', type: 'news', source: 'youtube',
    youtubeChannelId: 'UCJ2hBsz_B-3pXFvN84d4_Aw', lat: 17.3850, lng: 78.4867, status: 'live'
  },

  // ================= KERALA =================
  {
    id: 'asianet-news', name: 'Asianet News Live', location: 'Thiruvananthapuram, Kerala', state: 'Kerala', type: 'news', source: 'youtube',
    youtubeChannelId: 'UCsN2a3b9m-r-nU4G36o0zHg', lat: 8.5241, lng: 76.9366, status: 'live'
  },

  // ================= ODISHA =================
  {
    id: 'otv-news', name: 'OTV News Live', location: 'Bhubaneswar, Odisha', state: 'Odisha', type: 'news', source: 'youtube',
    youtubeChannelId: 'UC8kQp5y4H-h7d307eYgOQpw', lat: 20.2961, lng: 85.8245, status: 'live'
  },
  {
    id: 'jagannath-puri', name: 'Jagannath Temple Area', location: 'Puri, Odisha', state: 'Odisha', type: 'temple', source: 'youtube',
    youtubeChannelId: 'UCR44uSXXF-hXG2d8h_8zXKw', lat: 19.8044, lng: 85.8180, status: 'checking'
  },

  // ================= PUNJAB & J&K =================
  {
    id: 'golden-temple', name: 'Golden Temple (Harmandir Sahib)', location: 'Amritsar, Punjab', state: 'Punjab', type: 'temple', source: 'youtube',
    youtubeChannelId: 'UCqHuS_Y5GFmBwpLxYTDU_JA', lat: 31.6200, lng: 74.8765, status: 'live'
  },
  {
    id: 'mata-vaishno', name: 'Mata Vaishno Devi', location: 'Katra, J&K', state: 'Jammu & Kashmir', type: 'temple', source: 'youtube',
    youtubeChannelId: 'UCXuD2XmPTdpVy7zmwbFVZWA', lat: 33.0299, lng: 74.9476, status: 'live'
  },

  // ================= MADHYA PRADESH =================
  {
    id: 'mahakaleshwar-ujjain', name: 'Mahakaleshwar Jyotirlinga', location: 'Ujjain, Madhya Pradesh', state: 'Madhya Pradesh', type: 'temple', source: 'youtube',
    youtubeChannelId: 'UCAc9K-hBqRzQ0NlK79O0V9A', lat: 23.1827, lng: 75.7682, status: 'checking'
  },

  // ================= UTTARAKHAND =================
  {
    id: 'kedarnath', name: 'Kedarnath Temple Base', location: 'Rudraprayag, Uttarakhand', state: 'Uttarakhand', type: 'temple', source: 'youtube',
    youtubeChannelId: 'UC4xR0YcO2VzVn-tL4w62Wyw', lat: 30.7352, lng: 79.0669, status: 'checking'
  },
  {
    id: 'har-ki-pauri', name: 'Har Ki Pauri Ghat', location: 'Haridwar, Uttarakhand', state: 'Uttarakhand', type: 'ghat', source: 'youtube',
    youtubeChannelId: 'UC-Nl3_P9O_hUfG4nL2yXn4Q', lat: 29.9568, lng: 78.1706, status: 'checking'
  }
];
