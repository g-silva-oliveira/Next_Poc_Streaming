import VideoPlayer from '@/components/VideoPlayer';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import React from 'react'

export default function VideoPage() {
  const router = useRouter();

  // inside the brackets should have the name os the file to be dynamic => videoId.tsx
  const { videoId } = router.query as { videoId: string };
  return (
    <VideoPlayer id={videoId} />
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { query: context.query }
  }
}
