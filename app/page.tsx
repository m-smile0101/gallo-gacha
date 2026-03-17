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

import { songs } from "./data/songs";

import { RocknRoll_One } from "next/font/google";

const rock = RocknRoll_One({
  subsets: ["latin"],
  weight: "400",
});

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
      const text = "ギャロガチャを回してみた🎧";
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    }

    const text = `今日のギャロガチャ🎧
「${pickedSong.title} / ${pickedSong.artist}」が出た！`;

    const currentUrl = `http://localhost:3000/?song=${pickedSong.id}`;

    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
  }, [pickedSong]);

return (
  <main className="min-h-screen bg-[#3a3a3a] px-4 pt-6 pb-6">
    <div className="mx-auto w-full max-w-md">
      <section className="rounded-3xl bg-gray-50 p-5 shadow-lg">
      <h1 className={`${rock.className} mt-0 text-center text-4xl font-black tracking-wide text-gray-900`}>
        ギャロガチャ
      </h1>

        <p className="mt-3 text-center text-sm text-gray-600">
          ボタンを押して、今日の1曲を聴こう🥄
        </p>

        <button
          onClick={handleGacha}
          className="mt-6 w-full rounded-2xl bg-black px-4 py-4 text-lg font-bold text-white transition hover:scale-101 active:scale-[0.98]"
        >
          ガチャを回す
        </button>

        {pickedSong && (
          <section className="mt-8 rounded-2xl border border-gray-200 bg-gray-200 p-2">
            <p className="text-sm text-gray-500">今日の1曲</p>
            <h2 className="notranslate mt-1 text-2xl font-bold">
              {pickedSong.title}
            </h2>

            {/* アーティスト名は一旦非表示 */}
            {/* <p className="mt-1 text-base text-gray-700">{pickedSong.artist}</p> */}

            {pickedSong.comment && (
              <p className="mt-3 text-gray-600">{pickedSong.comment}</p>
            )}

            <div className="mt-3 -mx-2">
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
                className="rounded-full bg-black px-4 py-2 font-bold text-white transition  hover:opacity-80"
              >
                Xで共有
              </a>
            </div>
          </section>
        )}
      </section>
    </div>
  </main>
);
}