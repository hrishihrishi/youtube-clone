TODO:
1. backend -- JWT --> frontend has to persist this JWT token.
2. 

each video json:
category
likes
dislikes
comments
owner
date time
title
description
thumbnail
video
channel  --------> user.channel


user json:
channel 
email
username
password
isSignedIn
subscribersCount
subscribedChannels --------> user.channel
history --------> video.videoId
likedVideos --------> video.videoId
ownVideos --------> video.videoId