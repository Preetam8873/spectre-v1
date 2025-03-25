import VideoCard from "./VideoCard"

export default function RelatedVideos({ videos }) {
  return (
    <div className="space-y-4">
      {videos.map((video, index) => (
        <VideoCard key={video.id} video={video} index={index} />
      ))}
    </div>
  )
}

