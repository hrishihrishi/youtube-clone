export const fetchVideos = async (query) => {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=YOUR_API_KEY`);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error("Error fetching videos:", error);
        return [];
    }
};

export const fetchVideoDetails = async (videoId) => {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=YOUR_API_KEY`);
        const data = await response.json();
        return data.items[0];
    } catch (error) {
        console.error("Error fetching video details:", error);
        return null;
    }
};