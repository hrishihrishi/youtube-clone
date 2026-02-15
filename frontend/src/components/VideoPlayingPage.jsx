import { useState } from 'react';
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike, AiOutlineShareAlt } from "react-icons/ai";
import { TfiMoreAlt } from "react-icons/tfi";
import { videoData } from './../data/videos.jsx'; 

import VideoCard from './VideoCard';

export default function VideoPlayingPage() {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [comments, setComments] = useState([
        { id: 1, user: "DevGuru", text: "This explanation is crystal clear! Thanks.", likes: 12 },
    ]);
    const [newComment, setNewComment] = useState("");

    const handleLike = () => {
        setLiked(!liked);
        if (disliked) setDisliked(false);
    };

    const handleDislike = () => {
        setDisliked(!disliked);
        if (liked) setLiked(false);
    };

    const addComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        const comment = {
            id: Date.now(),
            user: "Guest User",
            text: newComment,
            likes: 0
        };
        setComments([comment, ...comments]);
        setNewComment("");
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 lg:px-10 bg-white">

            {/* LEFT SIDE: PLAYER & INFO */}
            <div className="flex-grow lg:max-w-[calc(100%-400px)]">
                {/* Video Player */}
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-lg">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>

                {/* Video Title */}
                <h1 className="text-xl font-bold mt-4 line-clamp-2">Learn React in 30 Minutes: From Zero to Hero</h1>

                {/* Actions Bar (Channel + Buttons) */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-yellow-400 to-red-500" />
                        <div>
                            <p className="font-bold text-base">CodeAcademy</p>
                            <p className="text-gray-600 text-xs">1.2M subscribers</p>
                        </div>
                        <button onClick={() => setIsSubscribed(!isSubscribed)} className={`ml-4 px-4 py-2 rounded-full font-medium transition ${isSubscribed ? 'bg-gray-100 text-black' : 'bg-black text-white hover:bg-zinc-800'}`}>
                            {isSubscribed ? 'Subscribed' : 'Subscribe'}
                        </button>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                        <div className="flex items-center bg-gray-100 rounded-full">
                            <button onClick={handleLike} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 border-r border-gray-300 rounded-l-full">
                                {liked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />} 15K
                            </button>
                            <button onClick={handleDislike} className="px-4 py-2 hover:bg-gray-200 rounded-r-full">
                                {disliked ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}
                            </button>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full font-medium">
                            <AiOutlineShareAlt size={20} /> Share
                        </button>
                        <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
                            <TfiMoreAlt />
                        </button>
                    </div>
                </div>

                {/* Description Box */}
                <div className="bg-gray-100 rounded-xl p-3 mt-4 text-sm hover:bg-gray-200 cursor-pointer transition">
                    <p className="font-bold">152K views • 2 days ago</p>
                    <p className="mt-1">A quick tutorial to get started with React. We cover JSX, Props, and State... <span className="font-bold">more</span></p>
                </div>

                {/* COMMENTS SECTION */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-4">{comments.length} Comments</h3>
                    <form onSubmit={addComment} className="flex gap-3 mb-8">
                        <div className="h-10 w-10 rounded-full bg-blue-500 shrink-0" />
                        <div className="flex-grow flex flex-col gap-2">
                            <input type="text" placeholder="Add a comment..." className="border-b border-gray-300 focus:border-black outline-none py-1 w-full" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                            <div className="flex justify-end gap-3 mt-1">
                                <button type="button" onClick={() => setNewComment("")} className="px-4 py-2 hover:bg-gray-100 rounded-full font-medium">Cancel</button>
                                <button disabled={!newComment} className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium disabled:bg-gray-200 disabled:text-gray-400">Comment</button>
                            </div>
                        </div>
                    </form>

                    <div className="flex flex-col gap-6">
                        {comments.map(c => (
                            <div key={c.id} className="flex gap-3 text-sm">
                                <div className="h-10 w-10 rounded-full bg-gray-300 shrink-0" />
                                <div>
                                    <p className="font-bold">@{c.user.toLowerCase()} <span className="font-normal text-gray-500 ml-2">1 second ago</span></p>
                                    <p className="mt-1">{c.text}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <AiOutlineLike className="cursor-pointer" /> {c.likes}
                                        <AiOutlineDislike className="cursor-pointer" />
                                        <span className="font-bold cursor-pointer">Reply</span>
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
                {videoData.map((v) => (
                    <div key={v.videoId} className="flex gap-2">
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
    );
}