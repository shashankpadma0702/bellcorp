import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const token = localStorage.getItem("token");

  const fetchTransactions = async () => {
    const { data } = await axios.get("/api/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async () => {
    if (!title || !amount) return;

    await axios.post(
      "/api/transactions",
      { title, amount, category: "General", date: new Date() },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    setAmount("");
    fetchTransactions();
  };

  const deleteTransaction = async (id) => {
    await axios.delete(`/api/transactions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTransactions();
  };

  const total = transactions.reduce(
    (acc, item) => acc + Number(item.amount),
    0
  );

  const average =
    transactions.length > 0
      ? (total / transactions.length).toFixed(2)
      : 0;

  return (
    <div className="space-y-10">
      {/* TOP HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back. Here’s your financial summary.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
            U
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border-l-4 border-indigo-600">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-900">₹{total}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border-l-4 border-purple-600">
          <p className="text-sm text-gray-500">Transactions</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-900">
            {transactions.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border-l-4 border-blue-600">
          <p className="text-sm text-gray-500">Average Spend</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-900">₹{average}</h2>
        </div>
      </div>

      {/* ADD TRANSACTION SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-6">Add Transaction</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Transaction Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={addTransaction}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
          >
            Add Transaction
          </button>
        </div>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b font-semibold text-gray-800">
          Recent Transactions
        </div>

        {transactions.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No transactions added yet.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3 text-right">Amount</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {t.title}
                  </td>

                  <td className="px-6 py-4 text-right font-semibold text-gray-700">
                    ₹{t.amount}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteTransaction(t._id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
