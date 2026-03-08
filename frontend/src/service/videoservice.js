import axios from "axios";

export const fetchFilteredVideos = async (searchSentence="", category="") => {
    const searchKeys = searchSentence.toLowerCase().split(' ').filter(word => word !== '');

    try {
        const response = await axios.get('http://localhost:5000/api/videos/getFilteredVideos', {
            params: {
                searchSentence,
                category
            }
        });
        // const filteredVideos = response.data.filter((video) => {
        //     return searchKeys.some((key) => video.title.toLowerCase().includes(key));
        // })

        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
        return [];
    }
}