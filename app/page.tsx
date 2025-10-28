"use client";

import { useState } from "react";

type MealIdea = {
  title: string;
  instructions: string;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [ideas, setIdeas] = useState<MealIdea[]>([]);
  const [favorites, setFavorites] = useState<MealIdea[]>([]);

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();

    // simple fake ideas
    const newIdeas: MealIdea[] = [
      {
        title: "Spinach Fried Rice with Soft Egg",
        instructions:
          "Sauté onion in oil. Add rice and spinach. Push aside, fry egg until jammy, fold in. Splash soy sauce.",
      },
      {
        title: "Warm Egg & Spinach Toast Stack",
        instructions:
          "Toast bread. Soft scramble eggs with spinach. Stack high, drizzle olive oil.",
      },
      {
        title: "Crispy Onion Spinach Omelette Bites",
        instructions:
          "Caramelize onion, add eggs + spinach, cook thin, slice into wedges.",
      },
    ];

    setIdeas(newIdeas);
  }

  function handleSave(idea: MealIdea) {
    setFavorites((prev) => {
      if (prev.find((f) => f.title === idea.title)) return prev;
      return [...prev, idea];
    });
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col items-center p-6">
      <section className="w-full max-w-xl bg-white rounded-2xl shadow p-6 space-y-4">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold">What Should We Eat?</h1>
          <p className="text-sm text-zinc-600">
            Tell me what you've got. I'll pitch dinner.
          </p>
        </header>

        <form className="space-y-3" onSubmit={handleGenerate}>
          <label className="block text-sm font-medium text-zinc-700">
            What ingredients do you have?
          </label>
          <textarea
            className="w-full rounded-lg border border-zinc-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            rows={3}
            placeholder="eggs, spinach, half an onion, leftover rice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-zinc-900 text-white font-medium py-2 text-sm hover:bg-zinc-800 active:bg-zinc-700"
          >
            Suggest Meals
          </button>
        </form>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-zinc-800">Ideas</h2>

          {ideas.length === 0 && (
            <div className="text-sm text-zinc-600 italic">
              (Meal ideas will show up here)
            </div>
          )}

          <ul className="space-y-3">
            {ideas.map((idea, idx) => (
              <li
                key={idx}
                className="border border-zinc-200 rounded-lg p-3 bg-zinc-50"
              >
                <div className="text-sm font-medium text-zinc-900">
                  {idea.title}
                </div>
                <div className="text-xs text-zinc-600">
                  {idea.instructions}
                </div>
                <button
                  className="mt-2 text-[11px] font-medium text-zinc-900 border border-zinc-300 rounded px-2 py-1 hover:bg-zinc-100 active:bg-zinc-200"
                  onClick={() => handleSave(idea)}
                  type="button"
                >
                  Save to favorites
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-2 pt-6 border-t border-zinc-200">
          <h2 className="text-sm font-semibold text-zinc-800">
            Saved favorites
          </h2>

          {favorites.length === 0 && (
            <div className="text-sm text-zinc-600 italic">
              (Nothing saved yet)
            </div>
          )}

          <ul className="space-y-3">
            {favorites.map((idea, idx) => (
              <li
                key={idx}
                className="border border-amber-300 rounded-lg p-3 bg-amber-50"
              >
                <div className="text-sm font-medium text-zinc-900">
                  {idea.title}
                </div>
                <div className="text-xs text-zinc-600">
                  {idea.instructions}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>

      <footer className="text-[10px] text-zinc-400 pt-6">
        Built by Me • v0.1
      </footer>
    </main>
  );
}
