import axios from "axios";

export const fetchFilteredVideos = async (searchSentence = "", category = "") => {

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

export const fetchAllVideos = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/videos/getAllVideos');
        console.log("Fetched all videos:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching videos:", error);
        return [];
    }
};


export const deleteVideo = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
        try {
            axios.delete(`http://localhost:5000/api/videos/deleteVideo/${id}`)
                .then(res => {
                    console.log("Video deleted:", res.data);
                    return res.data
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.error("Error deleting video:", error);
            return [];
        }
    }
}

export const updateVidDetails = async (id, data, token) => {
    try {
        axios.post(`http://localhost:5000/api/videos/updateVideoDetails/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                console.log("Video updated:", res.data);
                return res.data
            })
            .catch(err => console.log(err))
    } catch (error) {
        console.error("Error updating video:", error);
        alert("Error updating video : ", error);
        return [];
    }
}