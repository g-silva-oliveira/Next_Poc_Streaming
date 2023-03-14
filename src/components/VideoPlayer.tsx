import React from 'react'

export default function VideoPlayer({ id }: { id: string }) {
  return (
    <div>
      <video
        src={`/api/videos?videoId=${id}`}
        width="1500px"
        height="auto"
        controls
        autoPlay
        id="video-player"
      />
    </div>
  )
}
