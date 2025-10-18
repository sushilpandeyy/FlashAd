import { useState } from 'react';

const WithdrawalHistory = ({ withdrawals, stats }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const itemsPerPage = 10;

  // Filter withdrawals
  const filteredWithdrawals = withdrawals.filter((w) => {
    const matchesSearch =
      searchTerm === '' ||
      w.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.amount.toString().includes(searchTerm);
    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredWithdrawals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWithdrawals = filteredWithdrawals.slice(startIndex, endIndex);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'success':
        return { text: 'text-green-400', icon: '✅', label: 'Success' };
      case 'pending':
        return { text: 'text-yellow-400', icon: '⏳', label: 'Pending' };
      case 'failed':
        return { text: 'text-red-400', icon: '❌', label: 'Failed' };
      default:
        return { text: 'text-vintage-white', icon: '⚪', label: status };
    }
  };

  const periods = [
    { value: 'all', label: 'All Time' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  return (
    <div className="border-2 border-vintage-white p-6">
      <h2 className="font-mono uppercase tracking-wider text-sm mb-6">
        📜 Withdrawal History
      </h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        {/* Period Filter */}
        <div className="relative">
          <button
            onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
            className="btn-vintage text-xs py-2 px-4 flex items-center gap-2"
          >
            {periods.find((p) => p.value === filterPeriod)?.label}
            <span>▼</span>
          </button>
          {showPeriodDropdown && (
            <div className="absolute top-full left-0 mt-2 border-2 border-vintage-white bg-vintage-black z-10 min-w-[150px]">
              {periods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => {
                    setFilterPeriod(period.value);
                    setShowPeriodDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 font-mono text-xs hover:bg-vintage-gray-200 transition-colors"
                >
                  {period.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by tx hash or amount..."
          className="input-vintage flex-1 text-xs"
        />
      </div>

      {/* Table */}
      <div className="border-2 border-vintage-gray-400 mb-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-vintage-gray-400">
              <th className="text-left p-3 font-mono text-xs text-vintage-gray-600 uppercase">
                Date/Time
              </th>
              <th className="text-left p-3 font-mono text-xs text-vintage-gray-600 uppercase">
                Amount
              </th>
              <th className="text-left p-3 font-mono text-xs text-vintage-gray-600 uppercase">
                Status
              </th>
              <th className="text-left p-3 font-mono text-xs text-vintage-gray-600 uppercase">
                Transaction
              </th>
            </tr>
          </thead>
          <tbody>
            {currentWithdrawals.map((withdrawal) => {
              const statusStyle = getStatusStyle(withdrawal.status);
              return (
                <tr
                  key={withdrawal.id}
                  className="border-b border-vintage-gray-400 hover:bg-vintage-gray-200 transition-colors"
                >
                  <td className="p-3">
                    <div className="font-mono text-xs text-vintage-white">
                      {withdrawal.date}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-mono text-sm font-bold text-green-400">
                      ${withdrawal.amount.toFixed(2)}
                    </div>
                    <div className="font-mono text-xs text-vintage-gray-600">
                      To: {withdrawal.walletAddress}
                    </div>
                    <div className="font-mono text-xs text-vintage-gray-600">
                      Gas: ${withdrawal.gasFee.toFixed(2)} MATIC
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`font-mono text-xs ${statusStyle.text}`}>
                      {statusStyle.icon} {statusStyle.label}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-vintage-white">
                        {withdrawal.txHash}
                      </span>
                      <a
                        href={`https://polygonscan.com/tx/${withdrawal.txHashFull}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        🔗
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mb-6 font-mono text-xs">
        <div className="text-vintage-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredWithdrawals.length)} of{' '}
          {filteredWithdrawals.length} withdrawals
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`btn-vintage text-xs py-1 px-3 ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            ← Previous
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn-vintage text-xs py-1 px-3 ${
                currentPage === page ? 'btn-vintage-inverse' : ''
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`btn-vintage text-xs py-1 px-3 ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next →
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="border-t-2 border-vintage-gray-400 pt-6">
        <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-4">
          📊 Summary:
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <div className="font-mono text-xs text-vintage-gray-600 mb-1">
              Total Withdrawn:
            </div>
            <div className="font-mono text-lg font-bold text-green-400">
              ${stats.totalWithdrawn.toFixed(2)} USDC
            </div>
          </div>
          <div>
            <div className="font-mono text-xs text-vintage-gray-600 mb-1">
              Total Gas Paid:
            </div>
            <div className="font-mono text-lg font-bold text-yellow-400">
              ${stats.totalGas.toFixed(2)} MATIC
            </div>
          </div>
          <div>
            <div className="font-mono text-xs text-vintage-gray-600 mb-1">
              Average Withdrawal:
            </div>
            <div className="font-mono text-lg font-bold text-blue-400">
              ${stats.averageWithdrawal.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="font-mono text-xs text-vintage-gray-600 mb-1">
              Largest Withdrawal:
            </div>
            <div className="font-mono text-lg font-bold text-purple-400">
              ${stats.largestWithdrawal.toFixed(2)}
            </div>
            <div className="font-mono text-xs text-vintage-gray-600">
              ({stats.largestWithdrawalDate})
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-3">
          <button className="btn-vintage text-xs py-2 px-4">
            📥 Export CSV
          </button>
          <button className="btn-vintage text-xs py-2 px-4">
            📄 Export PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalHistory;
