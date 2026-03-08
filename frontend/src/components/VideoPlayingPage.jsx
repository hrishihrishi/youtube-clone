import { useState } from 'react';
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike, AiOutlineShareAlt, AiOutlineDelete } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import { TfiMoreAlt } from "react-icons/tfi";
import { videoData } from './../data/videos.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import VideoCard from './VideoCard';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../index.css';
import { fetchVideos } from '../utils/api.js';
import { deleteVideo, fetchAllVideos, updateVidDetails } from '../service/videoservice.js';


// PLAYS THE VIDEO BASED ON URL PARAMS (ID) AND UPDATES LIKES, COMMENTS, SUBSCRIPTIONS ETC.
export default function VideoPlayingPage() {
    // const [videoData, setVideoData] = useState([]);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get('id'); // Get ID from query string (?id=...)

    const [videoDetails, setVideoDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMoreOpen, setIsMoreOpen] = useState(false);


    useEffect(() => {
        // if (!id) return;
        axios.get(`http://localhost:5000/api/videos/getVideoDetails/${id}`)
            .then(res => {
                setVideoDetails(res.data);
                setLikes(res.data.likes);
                setComments(res.data.comments || []);
                setLoading(false);
            })
            .catch(err => {
                console.log("Error fetching video details (in VideoPlayingPage.js):", err);
            })
        // videoData = fetchAllVideos();
        // console.log(videoData);
        // if (!videoData) videoData = [];
    }, [id]);


    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [comments, setComments] = useState([
    ]);
    const [newComment, setNewComment] = useState("");
    const [likes, setLikes] = useState(0);


    const handleLike = () => {
        // 1. If the button is already liked, redirect to handleUnlike and return
        if (liked) {
            handleUnlike();
            return;
        }
        // 2. If not liked initially, continue
        setLiked(true);

        // Clear dislike if it was active
        if (disliked) setDisliked(false);

        const newLikesCount = likes + 1;
        setLikes(newLikesCount);
        // Sync with backend
        axios.post(`http://localhost:5000/api/videos/updateVideoDetails/${id}`, { likes: newLikesCount })
            .then(res => {
                setVideoDetails(res.data);
                // setLikes(res.data.likes);
            })
            .catch(err => console.log("Error during like:", err));
    };

    // Helper function to handle the "Unlike" logic
    const handleUnlike = () => {
        setLiked(false);
        const newLikesCount = likes - 1;
        setLikes(newLikesCount);
        // Sync with backend
        axios.post(`http://localhost:5000/api/videos/updateVideoDetails/${id}`, { likes: newLikesCount })
            .then(res => {
                setVideoDetails(res.data);
                // setLikes(res.data.likes);
            })
            .catch(err => console.log("Error during unlike:", err));
    };

    // const handleLike = () => {
    //     setLiked(!liked);

    //     axios.post(`http://localhost:5000/api/videos/updateVideoDetails/${id}`, { likes: videoDetails.likes + 1 })
    //         .then(res => {
    //             console.log(res.data);
    //             setVideoDetails(res.data);
    //             setLikes(videoDetails.likes);
    //         })
    //         .catch(err => {
    //             console.log("Error updating video details (in VideoPlayingPage.js):", err);
    //         })

    //     if (disliked) setDisliked(false);
    // };

    const handleDislike = () => {
        setDisliked(!disliked);
        handleUnlike();
        axios.post(`http://localhost:5000/api/videos/updateVideoDetails/${id}`, { dislikes: videoDetails.dislikes + 1 })
            .then(res => {
                console.log(res.data);
                setVideoDetails(res.data);
            })
            .catch(err => {
                console.log("Error updating video details (in VideoPlayingPage.js):", err);
            })
        // if (liked) setLiked(false);
    };

    const addComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        const comment = {
            id: Date.now(),
            username: "Guest User",
            comment: newComment,
            likes: 0
        };
        setComments([comment, ...comments]);
        setNewComment("");

        axios.post(`http://localhost:5000/api/videos/updateVideoDetails/${id}`, { comments: [...comments, comment] })
            .then(res => {
                console.log(res.data);
                setVideoDetails(res.data);
                setComments(res.data.comments || []);
            })
            .catch(err => {
                console.log("Error updating video details (in VideoPlayingPage.js):", err);
            })
    };

    const onMoreClick = () => {
        setIsMoreOpen(!isMoreOpen);
    };

    const onDeleteClick = () => {
        try {
            deleteVideo(id);
            navigate('/');
        }
        catch (error) {
            console.log("Error deleting video (in VideoPlayingPage.js):", error);
        }
    };

    const onDeleteComment = (commentId) => {
        try {
            setComments(comments.filter(c => c.id !== commentId));
            updateVidDetails(id, { comments: comments.filter(c => c.id !== commentId) });
        }
        catch (error) {
            console.log("Error deleting comment (in VideoPlayingPage.js):", error);
        }
    };

    return (
        loading ? (
            <div className="flex items-center justify-center h-full">
                <p>Loading video...</p>
            </div>
        ) : (
            <div className="flex flex-col lg:flex-row gap-6 p-4 lg:px-10 bg-white">

                {/* LEFT SIDE: PLAYER & INFO */}
                <div className="flex-grow lg:max-w-[calc(100%-400px)]">

                    {/* VIDEO PLAYER */}
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-lg">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <p>Loading video...</p>
                            </div>
                        ) : (
                            <iframe width="100%" height="100%" src={"http://localhost:5000/api/videos/stream/" + videoDetails.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        )}
                    </div>

                    {/* TITLE */}
                    <h1 className="text-xl font-bold mt-4 line-clamp-2">{videoDetails.title}</h1>

                    {/* ACTIONS BAR (CHANNEL + BUTTONS) */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-yellow-400 to-red-500" />
                            <div>
                                <p className="font-bold text-base">{videoDetails.channel}</p>
                                <p className="text-gray-600 text-xs">1.2m subscribers</p>
                            </div>
                            <button onClick={() => setIsSubscribed(!isSubscribed)} className={`ml-4 px-4 py-2 rounded-full font-medium transition ${isSubscribed ? 'bg-gray-100 text-black' : 'bg-black text-white hover:bg-zinc-800'}`}>
                                {isSubscribed ? 'Subscribed' : 'Subscribe'}
                            </button>
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                            <div className="flex items-center bg-gray-100 rounded-full">
                                {/* LIKE BUTTON */}
                                <button onClick={handleLike} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 border-r border-gray-300 rounded-l-full">
                                    {liked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />} {likes}
                                </button>
                                {/* DISLIKE BUTTON */}
                                <button onClick={handleDislike} className="px-4 py-2 hover:bg-gray-200 rounded-r-full">
                                    {disliked ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}
                                </button>
                            </div>
                            {/* SHARE BUTTON */}
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full font-medium">
                                <AiOutlineShareAlt size={20} /> Share
                            </button>
                            {/* MORE BUTTON */}
                            <div >
                                <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full" onClick={onMoreClick}>
                                    <TfiMoreAlt />
                                </button>

                                {isMoreOpen && (
                                    <div className="absolute right-[10] mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                        <button
                                            onClick={() => {
                                                console.log("Save to playlist");
                                                setIsMoreOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition text-sm font-medium"
                                        >
                                            <MdPlaylistAdd size={20} /> Save to playlist
                                        </button>
                                        <button
                                            onClick={() => {
                                                onDeleteClick();
                                                setIsMoreOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition text-sm font-medium text-red-600"
                                        >
                                            <AiOutlineDelete size={20} /> Delete video
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* DESCRIPTION BOX */}
                    <div className="bg-gray-100 rounded-xl p-3 mt-4 text-sm hover:bg-gray-200 cursor-pointer transition">
                        <p className="font-bold">152K views • 2 days ago</p>
                        <p className="mt-1">{videoDetails.description} <span className="font-bold">more</span></p>
                    </div>

                    {/* COMMENTS SECTION */}
                    <div className="mt-6">
                        <h3 className="text-xl font-bold mb-4">{comments.length} Comments</h3>
                        <form onSubmit={addComment} className="flex gap-3 mb-8">
                            <div className="h-10 w-10 rounded-full bg-blue-500 shrink-0" />
                            <div className="flex-grow flex flex-col gap-2">

                                {/* comment input */}
                                <input type="text" placeholder="Add a comment..." className="border-b border-gray-300 focus:border-black outline-none py-1 w-full" value={newComment} onChange={(e) => setNewComment(e.target.value)} />

                                {/* comment buttons */}
                                <div className="flex justify-end gap-3 mt-1">
                                    <button type="button" onClick={() => setNewComment("")} className="px-4 py-2 hover:bg-gray-100 rounded-full font-medium">Cancel</button>
                                    <button type="submit" disabled={!newComment} className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium disabled:bg-gray-200 disabled:text-gray-400">Comment</button>
                                </div>

                            </div>
                        </form>

                        <div className="flex flex-col gap-6">
                            {comments.map(c => (

                                // COMMENT CARD
                                <div key={c.id} className="flex gap-3 text-sm">
                                    <div className="h-10 w-10 rounded-full bg-gray-300 shrink-0" />
                                    <div>
                                        <p className="font-bold">@{c.username?.toLowerCase() || 'guest'} <span className="font-normal text-gray-500 ml-2">1 second ago</span></p>
                                        <p className="mt-1">{c.comment}</p>
                                        <div className="flex items-center gap-4 mt-2">
                                            <AiOutlineLike className="cursor-pointer" /> {c.likes}
                                            <AiOutlineDislike className="cursor-pointer" />
                                            <span className="font-bold cursor-pointer">Reply</span>
                                            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full" onClick={() => onDeleteComment(c.id)}>
                                                <AiOutlineDelete size={15} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: RECOMMENDED VIDEOS */}
                <div className="lg:w-[400px] flex flex-col gap-4">
                    <h4 className="font-bold lg:hidden">Related Videos</h4>
                    {videoData.map((v, index) => (
                        <div key={index} className="flex gap-2">
                            <div className="w-40 h-24 shrink-0 rounded-lg overflow-hidden">
                                <img src={v.thumbnailUrl} className="w-full h-full object-cover" alt="thumbnail" />
                            </div>
                            <div className="flex flex-col">
                                <h5 className="text-sm font-bold line-clamp-2">{v.title}</h5>
                                <p className="text-xs text-gray-600 mt-1">{v.uploader}</p>
                                <p className="text-xs text-gray-600">{v.views} views</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
}