import React, { useState } from "react";
import "./App.css";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

function App() {
  // Role
  const [role, setRole] = useState("viewer");

  // Inputs
  const [incomeInput, setIncomeInput] = useState("");
  const [expenseInput, setExpenseInput] = useState("");

  // Transactions
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2026-04-01", amount: 5000, category: "Salary", type: "income" },
    { id: 2, date: "2026-04-02", amount: 2000, category: "Food", type: "expense" },
    { id: 3, date: "2026-04-03", amount: 1000, category: "Travel", type: "expense" }
  ]);

  // Add transaction
  const handleCalculate = () => {
    const income = Number(incomeInput);
    const expense = Number(expenseInput);

    if (income > 0) {
      setTransactions([
        ...transactions,
        {
          id: Date.now(),
          date: new Date().toISOString().split("T")[0],
          amount: income,
          category: "Income",
          type: "income"
        }
      ]);
    }

    if (expense > 0) {
      setTransactions([
        ...transactions,
        {
          id: Date.now() + 1,
          date: new Date().toISOString().split("T")[0],
          amount: expense,
          category: "Expense",
          type: "expense"
        }
      ]);
    }

    setIncomeInput("");
    setExpenseInput("");
  };

  // Calculations
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = totalIncome - totalExpense;

  // Pie Chart
  const chartData = {
    labels: ["Income", "Expense", "Savings"],
    datasets: [
      {
        data: [totalIncome, totalExpense, savings],
        backgroundColor: ["#27ae60", "#c0392b", "#2980b9"],
        borderColor: "#fff",
        borderWidth: 2
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: "top"
      }
    }
  };

  // Line Chart
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Balance Trend",
        data: [20000, 25000, 22000, 30000, 28000],
        borderColor: "#2980b9",
        fill: false
      }
    ]
  };

  return (
    <div className="container">
      <h1>Finance Dashboard</h1>

      {/* Role */}
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>

      {/* Admin Inputs */}
      {role === "admin" && (
        <div className="form">
          <input
            type="number"
            placeholder="Enter Income"
            value={incomeInput}
            onChange={(e) => setIncomeInput(e.target.value)}
          />

          <input
            type="number"
            placeholder="Enter Expense"
            value={expenseInput}
            onChange={(e) => setExpenseInput(e.target.value)}
          />

          <button onClick={handleCalculate}>
            Add Income & Expense
          </button>
        </div>
      )}

      {/* Cards */}
      <div className="cards">
        <div className="card income">
          <h2>Income</h2>
          <p>₹ {totalIncome}</p>
        </div>

        <div className="card expense">
          <h2>Expense</h2>
          <p>₹ {totalExpense}</p>
        </div>

        <div className="card savings">
          <h2>Savings</h2>
          <p>₹ {savings}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="chart">
        <Pie data={chartData} options={options} />
      </div>

      {/* Line Chart */}
      <h2>Balance Trend</h2>
      <div className="chart">
        <Line data={lineData} />
      </div>

      {/* Transactions */}
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>₹ {t.amount}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Insights */}
      <h2>Insights</h2>
      <p>Total Savings: ₹ {savings}</p>
      <p>Income vs Expense ratio is healthy</p>
    </div>
  );
}

export default App;