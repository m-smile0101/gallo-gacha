"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Song = {
  id: string;
  title: string;
  artist: string;
  spotifyTrackId: string;
  comment?: string;
};

const songs: Song[] = [
  {
    id: "1",
    title: "Song A",
    artist: "Your Band",
    spotifyTrackId: "4uLU6hMCjMI75M1A2tKUQC",
    comment: "ライブで盛り上がる定番曲！",
  },
  {
    id: "2",
    title: "Song B",
    artist: "Your Band",
    spotifyTrackId: "0VjIjW4GlUZAMYd2vXMi3b",
    comment: "しっとり聴きたい一曲。",
  },
  {
    id: "3",
    title: "Song C",
    artist: "Your Band",
    spotifyTrackId: "7qiZfU4dY1lWllzX7mPBI3",
    comment: "今日の気分にぴったりかも。",
  },
];

function pickRandomSong(excludeId?: string) {
  if (songs.length === 1) return songs[0];

  const filtered = excludeId
    ? songs.filter((song) => song.id !== excludeId)
    : songs;

  return filtered[Math.floor(Math.random() * filtered.length)];
}

export default function Page() {
  const searchParams = useSearchParams();
  const songIdFromUrl = searchParams.get("song");

  const initialSong =
    songs.find((s) => s.id === songIdFromUrl) || null;

  const [pickedSong, setPickedSong] =
    useState<Song | null>(initialSong);

  const handleGacha = () => {
    const nextSong = pickRandomSong(pickedSong?.id);
    setPickedSong(nextSong);

    // URLを更新
    const newUrl = `/?song=${nextSong.id}`;
    window.history.pushState(null, "", newUrl);
  };

  const spotifyUrl = useMemo(() => {
    if (!pickedSong) return "";
    return `https://open.spotify.com/track/${pickedSong.spotifyTrackId}`;
  }, [pickedSong]);

  const embedUrl = useMemo(() => {
    if (!pickedSong) return "";
    return `https://open.spotify.com/embed/track/${pickedSong.spotifyTrackId}`;
  }, [pickedSong]);

  const shareUrl = useMemo(() => {
    if (!pickedSong) {
      const text = "推し曲ガチャを回してみた🎧";
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    }

    const text = `今日の推し曲ガチャ🎧
「${pickedSong.title} / ${pickedSong.artist}」が出た！`;

    const currentUrl = `http://localhost:3000/?song=${pickedSong.id}`;

    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
  }, [pickedSong]);

  return (
    <main className="min-h-screen bg-neutral-100 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-4xl font-bold">推し曲ガチャ</h1>
        <p className="mt-3 text-center text-gray-600">
          ボタンを押すと、ランダムで1曲表示されます。
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleGacha}
            className="rounded-full bg-black px-6 py-3 text-base font-bold text-white transition hover:opacity-80"
          >
            ガチャを回す
          </button>
        </div>

        {pickedSong && (
          <section className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-sm text-gray-500">今日の1曲</p>
            <h2 className="mt-1 text-3xl font-bold">{pickedSong.title}</h2>
            <p className="mt-1 text-base text-gray-700">{pickedSong.artist}</p>

            {pickedSong.comment && (
              <p className="mt-3 text-gray-600">{pickedSong.comment}</p>
            )}

            <div className="mt-5">
              <iframe
                src={embedUrl}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
                title={`${pickedSong.title} Spotify player`}
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-black px-4 py-2 font-bold text-white transition hover:opacity-80"
              >
                Spotifyで開く
              </a>

              <a
                href={shareUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-black px-4 py-2 font-bold text-white transition hover:opacity-80"
              >
                Xで共有
              </a>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}