import { useState } from "react";
import { useTransactions } from "../context/TransactionsContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  ArrowDownTrayIcon,
  DocumentArrowDownIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";

const ExportData = () => {
  const { transactions, totals, loading } = useTransactions();
  const { user } = useAuth();
  const [exporting, setExporting] = useState(false);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format currency
  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("en-PK", {
      style: "currency",
      currency: "PKR",
    });
  };

  // Export to CSV
  const exportToCSV = () => {
    if (transactions.length === 0) {
      toast.error("No transactions to export");
      return;
    }

    setExporting(true);
    try {
      // CSV Headers
      const headers = ["Date", "Title", "Type", "Category", "Amount"];
      
      // CSV Rows
      const rows = transactions.map((txn) => [
        formatDate(txn.date),
        txn.title || "",
        txn.type || "",
        txn.category || "General",
        txn.amount || 0,
      ]);

      // Combine headers and rows
      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
      ].join("\n");

      // Add summary at the end
      const summary = [
        "",
        "Summary",
        `Total Income,${totals.income}`,
        `Total Expense,${totals.expense}`,
        `Balance,${totals.balance}`,
      ].join("\n");

      const fullCSV = csvContent + "\n" + summary;

      // Create blob and download
      const blob = new Blob([fullCSV], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `budget-tracker-export-${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Data exported to CSV successfully!");
    } catch (error) {
      console.error("CSV Export Error:", error);
      toast.error("Error exporting to CSV");
    } finally {
      setExporting(false);
    }
  };

  // Export to PDF
  const exportToPDF = () => {
    if (transactions.length === 0) {
      toast.error("No transactions to export");
      return;
    }

    setExporting(true);
    try {
      // Create HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Budget Tracker Export</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                color: #333;
              }
              h1 {
                color: #4F46E5;
                margin-bottom: 10px;
              }
              .header {
                margin-bottom: 30px;
                border-bottom: 2px solid #4F46E5;
                padding-bottom: 10px;
              }
              .summary {
                background-color: #F3F4F6;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 20px;
              }
              .summary-item {
                display: flex;
                justify-content: space-between;
                margin: 5px 0;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th {
                background-color: #4F46E5;
                color: white;
                padding: 12px;
                text-align: left;
                font-weight: bold;
              }
              td {
                padding: 10px;
                border-bottom: 1px solid #E5E7EB;
              }
              tr:nth-child(even) {
                background-color: #F9FAFB;
              }
              .income {
                color: #10B981;
                font-weight: bold;
              }
              .expense {
                color: #EF4444;
                font-weight: bold;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #E5E7EB;
                text-align: center;
                color: #6B7280;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Budget Tracker - Transaction Report</h1>
              <p><strong>User:</strong> ${user?.name || "User"}</p>
              <p><strong>Email:</strong> ${user?.email || ""}</p>
              <p><strong>Export Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="summary">
              <h2>Summary</h2>
              <div class="summary-item">
                <span>Total Income:</span>
                <span class="income">${formatCurrency(totals.income)}</span>
              </div>
              <div class="summary-item">
                <span>Total Expense:</span>
                <span class="expense">${formatCurrency(totals.expense)}</span>
              </div>
              <div class="summary-item">
                <span>Balance:</span>
                <span style="font-weight: bold;">${formatCurrency(totals.balance)}</span>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                ${transactions
                  .map(
                    (txn) => `
                  <tr>
                    <td>${formatDate(txn.date)}</td>
                    <td>${txn.title || ""}</td>
                    <td>${txn.type || ""}</td>
                    <td>${txn.category || "General"}</td>
                    <td class="${txn.type === "income" ? "income" : "expense"}">
                      ${txn.type === "income" ? "+" : "-"}${formatCurrency(txn.amount)}
                    </td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>

            <div class="footer">
              <p>Generated by Budget Tracker</p>
              <p>Total Transactions: ${transactions.length}</p>
            </div>
          </body>
        </html>
      `;

      // Open in new window and print
      const printWindow = window.open("", "_blank");
      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Wait for content to load, then print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          toast.success("PDF export ready! Use browser's print dialog to save as PDF.");
        }, 250);
      };
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast.error("Error exporting to PDF");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Export Data</h1>
        <p className="text-slate-600 mt-1">
          Export your transaction data in CSV or PDF format
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        {/* Summary Card */}
        <div className="mb-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Your Data Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-slate-500">Total Transactions</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {loading ? "..." : transactions.length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-slate-500">Total Income</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {loading ? "..." : formatCurrency(totals.income)}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-slate-500">Total Expense</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {loading ? "..." : formatCurrency(totals.expense)}
              </p>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Export Options</h2>

          {/* CSV Export */}
          <div className="border border-slate-200 rounded-xl p-6 hover:border-indigo-300 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 rounded-lg p-3">
                  <TableCellsIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Export as CSV</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Download your transactions as a CSV file. Perfect for Excel, Google Sheets, or
                    any spreadsheet application.
                  </p>
                  <ul className="text-xs text-slate-500 mt-2 space-y-1">
                    <li>• Includes all transaction details</li>
                    <li>• Includes summary totals</li>
                    <li>• Easy to import into spreadsheets</li>
                  </ul>
                </div>
              </div>
              <button
                onClick={exportToCSV}
                disabled={exporting || loading || transactions.length === 0}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                {exporting ? "Exporting..." : "Export CSV"}
              </button>
            </div>
          </div>

          {/* PDF Export */}
          <div className="border border-slate-200 rounded-xl p-6 hover:border-indigo-300 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 rounded-lg p-3">
                  <DocumentArrowDownIcon className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Export as PDF</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Generate a formatted PDF report of your transactions. Great for printing or
                    sharing.
                  </p>
                  <ul className="text-xs text-slate-500 mt-2 space-y-1">
                    <li>• Beautiful formatted report</li>
                    <li>• Includes summary and all transactions</li>
                    <li>• Print-ready format</li>
                  </ul>
                </div>
              </div>
              <button
                onClick={exportToPDF}
                disabled={exporting || loading || transactions.length === 0}
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                <DocumentArrowDownIcon className="h-5 w-5" />
                {exporting ? "Exporting..." : "Export PDF"}
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        {transactions.length === 0 && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              No transactions found. Add some transactions to export your data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportData;


