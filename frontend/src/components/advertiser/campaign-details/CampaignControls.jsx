import { useState } from 'react';

const CampaignControls = ({ campaign, onPause, onResume, onAddBudget, onEdit, onExport, onShare, onArchive }) => {
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

  const [budgetAmount, setBudgetAmount] = useState('50');
  const [editData, setEditData] = useState({
    name: campaign.name,
    targetUrl: campaign.targetUrl,
    ratePerAction: campaign.ratePerAction
  });
  const [exportFormat, setExportFormat] = useState('json');
  const [exportDateRange, setExportDateRange] = useState({
    from: campaign.created,
    to: new Date().toISOString().split('T')[0]
  });

  const isPaused = campaign.status === 'PAUSED';

  const handleAddBudget = async () => {
    const amount = parseFloat(budgetAmount);
    if (amount > 0) {
      await onAddBudget(amount);
      setShowBudgetModal(false);
      setBudgetAmount('50');
    }
  };

  const handleSaveEdit = async () => {
    await onEdit(editData);
    setShowEditModal(false);
  };

  const handleExport = async () => {
    await onExport({ format: exportFormat, dateRange: exportDateRange });
    setShowExportModal(false);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/campaign/${campaign.id}/share`;
    await navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
  };

  const platformFee = parseFloat(budgetAmount) * 0.05;
  const totalCost = parseFloat(budgetAmount) + platformFee;
  const additionalImpressions = campaign.type === 'CPM'
    ? Math.round((parseFloat(budgetAmount) / campaign.ratePerAction) * 1000)
    : Math.round((parseFloat(budgetAmount) / campaign.ratePerAction) * 50);

  return (
    <>
      <div className="border-2 border-vintage-white p-6 mb-8">
        <h3 className="font-mono uppercase tracking-wider text-sm mb-6">
          ⚙️ Campaign Controls
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Pause/Resume Campaign */}
          <div className="border border-vintage-gray-400 p-4">
            <div className="text-2xl mb-2">{isPaused ? '▶️' : '⏸️'}</div>
            <h4 className="font-mono text-sm mb-2">
              {isPaused ? 'Resume' : 'Pause'} Campaign
            </h4>
            <p className="text-xs text-vintage-gray-600 mb-4">
              {isPaused ? 'Start serving ads again' : 'Temporarily stop serving ads'}
            </p>
            <button
              onClick={() => isPaused ? setShowResumeModal(true) : setShowPauseModal(true)}
              className="btn-vintage text-xs py-2 px-4 w-full"
            >
              {isPaused ? 'Resume Now' : 'Pause Now'}
            </button>
          </div>

          {/* Add Budget */}
          <div className="border border-vintage-gray-400 p-4">
            <div className="text-2xl mb-2">💰</div>
            <h4 className="font-mono text-sm mb-2">Add Budget</h4>
            <p className="text-xs text-vintage-gray-600 mb-4">
              Current: ${campaign.budget.toFixed(2)}
            </p>
            <button
              onClick={() => setShowBudgetModal(true)}
              className="btn-vintage text-xs py-2 px-4 w-full"
            >
              Add Funds
            </button>
          </div>

          {/* Edit Settings */}
          <div className="border border-vintage-gray-400 p-4">
            <div className="text-2xl mb-2">✏️</div>
            <h4 className="font-mono text-sm mb-2">Edit Settings</h4>
            <p className="text-xs text-vintage-gray-600 mb-4">
              Modify rate, target URL, or name
            </p>
            <button
              onClick={() => setShowEditModal(true)}
              className="btn-vintage text-xs py-2 px-4 w-full"
            >
              Edit
            </button>
          </div>

          {/* Export Report */}
          <div className="border border-vintage-gray-400 p-4">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-mono text-sm mb-2">Export Report</h4>
            <p className="text-xs text-vintage-gray-600 mb-4">
              Download CSV or PDF
            </p>
            <button
              onClick={() => setShowExportModal(true)}
              className="btn-vintage text-xs py-2 px-4 w-full"
            >
              Export
            </button>
          </div>

          {/* Share Link */}
          <div className="border border-vintage-gray-400 p-4">
            <div className="text-2xl mb-2">🔗</div>
            <h4 className="font-mono text-sm mb-2">Share Link</h4>
            <p className="text-xs text-vintage-gray-600 mb-4">
              Share campaign performance dashboard
            </p>
            <button
              onClick={handleShare}
              className="btn-vintage text-xs py-2 px-4 w-full"
            >
              Get Link
            </button>
          </div>

          {/* Archive Campaign */}
          <div className="border border-vintage-gray-400 p-4">
            <div className="text-2xl mb-2">🗑️</div>
            <h4 className="font-mono text-sm mb-2">Archive Campaign</h4>
            <p className="text-xs text-vintage-gray-600 mb-4">
              End campaign permanently
            </p>
            <button
              onClick={() => setShowArchiveModal(true)}
              className="btn-vintage text-xs py-2 px-4 w-full"
            >
              Archive
            </button>
          </div>
        </div>
      </div>

      {/* Pause Modal */}
      {showPauseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-vintage-black border-2 border-vintage-white p-6 max-w-md w-full">
            <h3 className="font-mono text-lg mb-4">⏸️ Pause Campaign?</h3>
            <div className="font-mono text-sm space-y-3 mb-6">
              <p>Your campaign will stop serving ads immediately. You can resume anytime.</p>
              <div className="border border-vintage-gray-400 p-3">
                <p className="text-vintage-gray-600 mb-2">While paused:</p>
                <ul className="text-xs space-y-1">
                  <li>• No new impressions or clicks</li>
                  <li>• Budget remains locked</li>
                  <li>• Publishers won't display your ad</li>
                </ul>
              </div>
              <p className="text-xs text-vintage-gray-600">
                You can resume your campaign later without any additional setup.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPauseModal(false)}
                className="btn-vintage text-xs py-2 px-4 flex-1"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await onPause();
                  setShowPauseModal(false);
                }}
                className="btn-vintage-inverse text-xs py-2 px-4 flex-1"
              >
                Pause Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-vintage-black border-2 border-vintage-white p-6 max-w-md w-full">
            <h3 className="font-mono text-lg mb-4">▶️ Resume Campaign?</h3>
            <div className="font-mono text-sm space-y-3 mb-6">
              <p>Your campaign will start serving ads again within 30 seconds.</p>
              <div className="border border-vintage-gray-400 p-3">
                <p className="text-vintage-gray-600 mb-2">Current status:</p>
                <ul className="text-xs space-y-1">
                  <li>• Remaining Budget: ${(campaign.budget - campaign.spent).toFixed(2)}</li>
                  <li>• Estimated Impressions: ~{(((campaign.budget - campaign.spent) / campaign.ratePerAction) * 1000).toFixed(0)}</li>
                  <li>• Active Publishers: {campaign.activePublishers || 0}</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResumeModal(false)}
                className="btn-vintage text-xs py-2 px-4 flex-1"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await onResume();
                  setShowResumeModal(false);
                }}
                className="btn-vintage-inverse text-xs py-2 px-4 flex-1"
              >
                Resume Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-vintage-black border-2 border-vintage-white p-6 max-w-md w-full">
            <h3 className="font-mono text-lg mb-4">💰 Add Budget to Campaign</h3>
            <div className="font-mono text-sm space-y-3 mb-6">
              <div className="border border-vintage-gray-400 p-3 text-xs">
                <div className="flex justify-between mb-1">
                  <span className="text-vintage-gray-600">Current Budget:</span>
                  <span>${campaign.budget.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-vintage-gray-600">Spent:</span>
                  <span>${campaign.spent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vintage-gray-600">Remaining:</span>
                  <span>${(campaign.budget - campaign.spent).toFixed(2)}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs mb-2">Add Amount:</label>
                <input
                  type="number"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  className="input-vintage w-full"
                  placeholder="50"
                  min="10"
                />
                <div className="flex gap-2 mt-2">
                  {[25, 50, 100, 250].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setBudgetAmount(amount.toString())}
                      className="btn-vintage text-xs py-1 px-3"
                    >
                      +${amount}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-vintage-gray-400 p-3 text-xs">
                <div className="flex justify-between mb-1">
                  <span className="text-vintage-gray-600">New Total Budget:</span>
                  <span>${(campaign.budget + parseFloat(budgetAmount || 0)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-vintage-gray-600">Additional Impressions:</span>
                  <span>~{additionalImpressions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vintage-gray-600">Extended Duration:</span>
                  <span>~3-4 more days</span>
                </div>
              </div>

              <div className="text-xs">
                <div className="flex justify-between mb-1">
                  <span className="text-vintage-gray-600">Your Wallet Balance:</span>
                  <span className="text-green-400">$342.00 USDC ✓</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-vintage-gray-600">Platform Fee (5%):</span>
                  <span>${platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total to Approve:</span>
                  <span>${totalCost.toFixed(2)} USDC</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBudgetModal(false)}
                className="btn-vintage text-xs py-2 px-4 flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBudget}
                className="btn-vintage-inverse text-xs py-2 px-4 flex-1"
              >
                Add Budget
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Settings Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-vintage-black border-2 border-vintage-white p-6 max-w-md w-full">
            <h3 className="font-mono text-lg mb-4">✏️ Edit Campaign Settings</h3>
            <div className="font-mono text-sm space-y-4 mb-6">
              <div>
                <label className="block text-xs mb-2">Campaign Name:</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="input-vintage w-full"
                />
              </div>
              <div>
                <label className="block text-xs mb-2">Target URL:</label>
                <input
                  type="url"
                  value={editData.targetUrl}
                  onChange={(e) => setEditData({ ...editData, targetUrl: e.target.value })}
                  className="input-vintage w-full"
                />
              </div>
              <div>
                <label className="block text-xs mb-2">Rate Per Action:</label>
                <input
                  type="number"
                  value={editData.ratePerAction}
                  onChange={(e) => setEditData({ ...editData, ratePerAction: e.target.value })}
                  className="input-vintage w-full"
                  step="0.01"
                />
                <p className="text-xs text-vintage-gray-600 mt-1">
                  ⚠️ Changing rate affects future impressions only
                </p>
              </div>
              <div className="border border-vintage-gray-400 p-3 text-xs text-vintage-gray-600">
                ⚠️ Changes require blockchain transaction<br />
                Gas fee: ~$0.02
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="btn-vintage text-xs py-2 px-4 flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="btn-vintage-inverse text-xs py-2 px-4 flex-1"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Report Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-vintage-black border-2 border-vintage-white p-6 max-w-md w-full">
            <h3 className="font-mono text-lg mb-4">📊 Export Campaign Report</h3>
            <div className="font-mono text-sm space-y-4 mb-6">
              <div>
                <label className="block text-xs mb-2">Select Format:</label>
                <div className="space-y-2">
                  {[
                    { value: 'csv', label: 'CSV (Spreadsheet data)' },
                    { value: 'pdf', label: 'PDF (Visual report)' },
                    { value: 'json', label: 'JSON (Raw data)' }
                  ].map((format) => (
                    <label key={format.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        value={format.value}
                        checked={exportFormat === format.value}
                        onChange={(e) => setExportFormat(e.target.value)}
                      />
                      <span className="text-xs">{format.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs mb-2">Date Range:</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="date"
                    value={exportDateRange.from}
                    onChange={(e) => setExportDateRange({ ...exportDateRange, from: e.target.value })}
                    className="input-vintage text-xs"
                  />
                  <span className="text-xs">to</span>
                  <input
                    type="date"
                    value={exportDateRange.to}
                    onChange={(e) => setExportDateRange({ ...exportDateRange, to: e.target.value })}
                    className="input-vintage text-xs"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="btn-vintage text-xs py-2 px-4 flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                className="btn-vintage-inverse text-xs py-2 px-4 flex-1"
              >
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Archive Modal */}
      {showArchiveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-vintage-black border-2 border-vintage-white p-6 max-w-md w-full">
            <h3 className="font-mono text-lg mb-4 text-red-400">🗑️ Archive Campaign?</h3>
            <div className="font-mono text-sm space-y-3 mb-6">
              <p>This will permanently end your campaign. This action cannot be undone.</p>
              <div className="border border-red-500 p-3 text-xs">
                <p className="text-red-400 mb-2">Warning:</p>
                <ul className="space-y-1">
                  <li>• Campaign will stop immediately</li>
                  <li>• Remaining budget will be refunded</li>
                  <li>• Historical data will be preserved</li>
                  <li>• This action is permanent</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowArchiveModal(false)}
                className="btn-vintage text-xs py-2 px-4 flex-1"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await onArchive();
                  setShowArchiveModal(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-vintage-black font-mono text-xs py-2 px-4 flex-1 transition-colors"
              >
                Archive Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CampaignControls;
