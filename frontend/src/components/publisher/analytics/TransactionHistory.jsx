import { useState } from 'react';

const TransactionHistory = ({ transactions }) => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 25;

  const getTypeStyle = (type) => {
    switch (type) {
      case 'earning':
        return { bg: 'bg-green-900 bg-opacity-20', text: 'text-green-400', label: 'Earning' };
      case 'withdrawal':
        return { bg: 'bg-blue-900 bg-opacity-20', text: 'text-blue-400', label: 'Withdraw' };
      case 'bonus':
        return { bg: 'bg-purple-900 bg-opacity-20', text: 'text-purple-400', label: 'Bonus' };
      case 'adjustment':
        return { bg: 'bg-yellow-900 bg-opacity-20', text: 'text-yellow-400', label: 'Adjustment' };
      default:
        return { bg: 'bg-vintage-gray-400 bg-opacity-20', text: 'text-vintage-white', label: type };
    }
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    const matchesType = typeFilter === 'all' || tx.type === typeFilter;
    const matchesSearch = searchQuery === '' ||
      tx.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.txHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tx.site && tx.site.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const totalPages = Math.ceil(filteredTransactions.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + perPage);

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <h2 className="font-mono uppercase tracking-wider text-sm mb-6">
        💳 Transaction History
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="input-vintage text-xs py-2 px-3"
        >
          <option value="all">All Types</option>
          <option value="earning">Earnings</option>
          <option value="withdrawal">Withdrawals</option>
          <option value="bonus">Bonuses</option>
          <option value="adjustment">Adjustments</option>
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search transactions..."
          className="input-vintage text-xs flex-1 min-w-[200px]"
        />
      </div>

      {/* Transactions List */}
      <div className="space-y-4 mb-6">
        {paginatedTransactions.map((tx, index) => {
          const typeStyle = getTypeStyle(tx.type);
          return (
            <div
              key={index}
              className="border border-vintage-gray-400 p-4 hover:bg-vintage-gray-200 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-vintage-gray-600">{tx.dateTime}</span>
                    <span className={`font-mono text-xs px-2 py-0.5 ${typeStyle.bg} ${typeStyle.text}`}>
                      {typeStyle.label}
                    </span>
                  </div>

                  <div className="font-mono text-sm font-bold mb-1">{tx.campaign}</div>

                  {tx.site && (
                    <div className="font-mono text-xs text-vintage-gray-600 mb-2">
                      {tx.site} • {tx.placement}
                    </div>
                  )}

                  <div className="font-mono text-xs text-vintage-gray-600">
                    Tx: <span className="text-blue-400">{tx.txHash}</span>
                  </div>
                </div>

                <div className="text-right">
                  {tx.metrics && (
                    <div className="font-mono text-xs text-vintage-gray-600 mb-1">
                      {tx.metrics}
                    </div>
                  )}
                  <div className={`font-mono text-lg font-bold ${
                    tx.amount >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {tx.amount >= 0 ? '+' : ''}{tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </div>
                  <button className="font-mono text-xs text-blue-400 hover:underline mt-1">
                    🔗 View on Explorer
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="border-t-2 border-vintage-gray-400 pt-4">
        <div className="flex items-center justify-between">
          <div className="font-mono text-xs text-vintage-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + perPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`btn-vintage text-xs py-1 px-3 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              ← Previous
            </button>

            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`btn-vintage text-xs py-1 px-3 ${
                    currentPage === page ? 'bg-vintage-white text-vintage-black' : ''
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {totalPages > 5 && <span className="font-mono text-xs text-vintage-gray-600">...</span>}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`btn-vintage text-xs py-1 px-3 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
