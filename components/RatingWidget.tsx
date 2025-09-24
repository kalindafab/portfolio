"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  increment,
  query,
  DocumentData,
} from "firebase/firestore";

type Option = "fire" | "mid" | "trash" | "ass" | "goat";

const EMOJI: Record<Option, string> = {
  fire: "🔥",
  mid: "😐",
  trash: "🗑️",
  ass: "🍑",
  goat: "🐐",
};

const DEFAULT_OPTIONS: Option[] = ["fire", "goat", "mid", "ass", "trash"];

export default function RatingWidget({ options = DEFAULT_OPTIONS }: { options?: Option[] }) {
  const [counts, setCounts] = useState<Record<Option, number>>(
    Object.fromEntries(options.map((o) => [o, 0])) as Record<Option, number>
  );
  const [busy, setBusy] = useState(false);
  const [popup, setPopup] = useState<{ type: Option; visible: boolean } | null>(null);

  useEffect(() => {
    const q = query(collection(db, "ratings"));
    const unsub = onSnapshot(q, (snap) => {
      const next = { ...counts };
      snap.forEach((d: DocumentData) => {
        next[d.id as Option] = d.data().count || 0;
      });
      setCounts(next);
    });
    return () => unsub();
  }, []);

  const handleVote = async (type: Option) => {
    if (busy) return;
    setBusy(true);
    try {
      const ref = doc(db, "ratings", type);
      await updateDoc(ref, { count: increment(1) });
    } catch {
      await setDoc(doc(db, "ratings", type), { count: 1 });
    } finally {
      // Show +1 popup
      setPopup({ type, visible: true });
      setTimeout(() => setPopup(null), 1000); // vanish after 1s
      setTimeout(() => setBusy(false), 1200);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-2xl shadow-lg w-80 relative">
      <h2 className="text-lg font-bold mb-4">Rate My Portfolio</h2>

      {/* +1 popup */}
      {popup && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-green-400 font-bold animate-bounce">
          +1 {EMOJI[popup.type]}
        </div>
      )}

      <div className="flex justify-around flex-wrap gap-2 text-lg">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleVote(opt)}
            disabled={busy}
            className="px-4 py-2 bg-gray-800 rounded-lg flex justify-between items-center gap-2 min-w-[100px] hover:bg-gray-700 transition relative"
          >
            <span>{EMOJI[opt]}</span>
            <span className="capitalize">{opt}</span>
            <span className="font-bold">{counts[opt]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
