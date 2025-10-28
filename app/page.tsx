"use client";

import { useState, useMemo } from "react";

type Expense = {
  item: string;
  amount: number;
  category: string;
};

export default function Home() {
  // form state
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  // saved expenses
  const [expenses, setExpenses] = useState<Expense[]>([
    // seed with a couple sample rows so the UI doesn't look empty on first load
    { item: "Team pizza after game", amount: 42, category: "Sports / Kids" },
    { item: "Propane for cottage BBQ", amount: 28, category: "Cottage" },
    { item: "Grocery top-up", amount: 55, category: "Food" },
  ]);

  // handle form submit
  function handleAddExpense(e: React.FormEvent) {
    e.preventDefault();

    if (!item.trim() || !amount.trim() || isNaN(Number(amount))) {
      return;
    }

    const newExpense: Expense = {
      item: item.trim(),
      amount: Number(amount),
      category,
    };

    setExpenses((prev) => [newExpense, ...prev]);

    // reset form
    setItem("");
    setAmount("");
    setCategory("Food");
  }

  // compute total per category
  const totalsByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    for (const ex of expenses) {
      map[ex.category] = (map[ex.category] || 0) + ex.amount;
    }
    return map;
  }, [expenses]);

  // figure out top spend category
  const topCategory = useMemo(() => {
    let top: { category: string; total: number } | null = null;
    for (const [cat, total] of Object.entries(totalsByCategory)) {
      if (!top || total > top.total) {
        top = { category: cat, total };
      }
    }
    return top;
  }, [totalsByCategory]);

  // compute grand total
  const grandTotal = useMemo(() => {
    return expenses.reduce((sum, ex) => sum + ex.amount, 0);
  }, [expenses]);

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900 flex flex-col items-center p-6">
      <section className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Input form */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4 lg:col-span-1">
          <header className="space-y-1">
            <h1 className="text-xl font-semibold">Spend Control</h1>
            <p className="text-sm text-zinc-600">
              Track where the money is going. Fast.
            </p>
          </header>

          <form className="space-y-4" onSubmit={handleAddExpense}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">
                What did you buy?
              </label>
              <input
                className="w-full rounded-lg border border-zinc-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                placeholder="Pizza for the team"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">
                How much? ($)
              </label>
              <input
                className="w-full rounded-lg border border-zinc-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                placeholder="42"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">
                Category
              </label>
              <select
                className="w-full rounded-lg border border-zinc-300 p-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Food</option>
                <option>Sports / Kids</option>
                <option>Cottage</option>
                <option>House</option>
                <option>Fun / Going Out</option>
                <option>Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-zinc-900 text-white font-medium py-2 text-sm hover:bg-zinc-800 active:bg-zinc-700"
            >
              Add Expense
            </button>
          </form>

          <div className="text-[10px] text-zinc-400 pt-2">
            v2 • Local only demo (no login yet)
          </div>
        </div>

        {/* MIDDLE COLUMN: Summary / insights */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              Total Spent
            </div>
            <div className="text-3xl font-semibold text-zinc-900">
              ${grandTotal.toFixed(2)}
            </div>
            <div className="text-xs text-zinc-500 pt-1">
              Across {expenses.length} purchases
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              Top Category
            </div>
            {topCategory ? (
              <>
                <div className="text-lg font-medium text-zinc-900">
                  {topCategory.category}
                </div>
                <div className="text-sm text-zinc-600">
                  ${topCategory.total.toFixed(2)} so far
                </div>
              </>
            ) : (
              <div className="text-sm text-zinc-600">No data yet</div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              Breakdown
            </div>
            <ul className="pt-3 space-y-2">
              {Object.entries(totalsByCategory).map(([cat, total]) => (
                <li
                  key={cat}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-zinc-700">{cat}</span>
                  <span className="font-medium text-zinc-900">
                    ${total.toFixed(2)}
                  </span>
                </li>
              ))}

              {Object.keys(totalsByCategory).length === 0 && (
                <li className="text-sm text-zinc-500 italic">
                  Nothing yet. Add an expense.
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Activity log */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4 lg:col-span-1">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-zinc-800">
              Recent Activity
            </h2>
            <p className="text-xs text-zinc-500">
              Most recent first
            </p>
          </div>

          <ul className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
            {expenses.length === 0 && (
              <li className="text-sm text-zinc-500 italic">
                Nothing logged yet.
              </li>
            )}

            {expenses.map((ex, idx) => (
              <li
                key={idx}
                className="border border-zinc-200 rounded-lg p-3 bg-zinc-50"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-zinc-900">
                    {ex.item}
                  </div>
                  <div className="text-sm font-semibold text-zinc-900">
                    ${ex.amount.toFixed(2)}
                  </div>
                </div>
                <div className="text-[11px] text-zinc-500">
                  {ex.category}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="text-[10px] text-zinc-400 pt-6">
        Built by Peter • Spend Control v2
      </footer>
    </main>
  );
}
