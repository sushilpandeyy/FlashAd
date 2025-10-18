import { useState } from 'react';
import Header from '../../components/common/Header';
import WithdrawHeader from '../../components/publisher/withdraw/WithdrawHeader';
import BalanceOverview from '../../components/publisher/withdraw/BalanceOverview';
import WithdrawForm from '../../components/publisher/withdraw/WithdrawForm';
import WithdrawalHistory from '../../components/publisher/withdraw/WithdrawalHistory';
import ConfirmWithdrawModal from '../../components/publisher/withdraw/ConfirmWithdrawModal';
import ProcessingModal from '../../components/publisher/withdraw/ProcessingModal';
import SuccessModal from '../../components/publisher/withdraw/SuccessModal';

const Withdraw = () => {
  // Mock user data
  const user = {
    name: 'Alex Publisher',
    walletAddress: '0x7c3d...89f'
  };

  const walletAddressFull = '0x7c3d89f245a8bdef456abc';

  // Balance state
  const [balance, setBalance] = useState({
    available: 1098.60,
    pending: 44.20,
    pendingTime: '1.5 hours',
    pendingImpressions: 245,
    monthEarnings: 1142.80,
    monthTrend: 8,
    monthImpressions: 571400,
    lifetimeEarnings: 8945.60,
    campaignsServed: 156,
    lifetimeImpressions: 4470000
  });

  // Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [processingStep, setProcessingStep] = useState(1);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [lastTxHash, setLastTxHash] = useState('');
  const [lastBlockNumber, setLastBlockNumber] = useState(0);

  // Mock withdrawal history
  const [withdrawals, setWithdrawals] = useState([
    {
      id: 1,
      date: 'Oct 15, 3:42 PM',
      amount: 1098.60,
      status: 'success',
      txHash: '0xabc123...def',
      txHashFull: '0xabc123def456789abc',
      walletAddress: '0x7c3d...89f',
      gasFee: 0.02
    },
    {
      id: 2,
      date: 'Oct 10, 9:20 AM',
      amount: 500.00,
      status: 'success',
      txHash: '0x123abc...789',
      txHashFull: '0x123abc456def789ghi',
      walletAddress: '0x7c3d...89f',
      gasFee: 0.02
    },
    {
      id: 3,
      date: 'Oct 3, 2:15 PM',
      amount: 425.80,
      status: 'success',
      txHash: '0x456def...abc',
      txHashFull: '0x456def789abc123ghi',
      walletAddress: '0x7c3d...89f',
      gasFee: 0.02
    },
    {
      id: 4,
      date: 'Sep 28, 11:30 AM',
      amount: 350.00,
      status: 'success',
      txHash: '0x789ghi...123',
      txHashFull: '0x789ghi123abc456def',
      walletAddress: '0x7c3d...89f',
      gasFee: 0.02
    },
    {
      id: 5,
      date: 'Sep 20, 4:45 PM',
      amount: 275.50,
      status: 'success',
      txHash: '0xabcdef...456',
      txHashFull: '0xabcdef456ghi789abc',
      walletAddress: '0x7c3d...89f',
      gasFee: 0.02
    },
    {
      id: 6,
      date: 'Sep 12, 1:20 PM',
      amount: 198.30,
      status: 'success',
      txHash: '0x111222...333',
      txHashFull: '0x111222333abc456def',
      walletAddress: '0x7c3d...89f',
      gasFee: 0.02
    }
  ]);

  // Withdrawal stats
  const stats = {
    totalWithdrawn: 8945.60,
    totalGas: 0.90,
    averageWithdrawal: 198.79,
    largestWithdrawal: 1098.60,
    largestWithdrawalDate: 'Oct 15, 2024'
  };

  // Handle withdraw all
  const handleWithdrawAll = () => {
    handleWithdraw(balance.available);
  };

  // Handle withdraw
  const handleWithdraw = (amount) => {
    setWithdrawAmount(amount);
    setShowConfirmModal(true);
  };

  // Handle confirm withdrawal
  const handleConfirmWithdraw = async () => {
    setShowConfirmModal(false);
    setShowProcessingModal(true);
    setProcessingStep(1);

    // Simulate blockchain transaction
    // Step 1: Preparing
    await new Promise((resolve) => setTimeout(resolve, 500));
    setProcessingStep(2);

    // Step 2: Wallet approval
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProcessingStep(3);

    // Step 3: Blockchain confirmation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProcessingStep(4);

    // Step 4: Transfer
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate mock transaction data
    const txHash = '0x' + Math.random().toString(16).substring(2, 42);
    const blockNumber = 45234567 + Math.floor(Math.random() * 1000);

    setLastTxHash(txHash);
    setLastBlockNumber(blockNumber);

    // Update balance
    setBalance((prev) => ({
      ...prev,
      available: prev.available - withdrawAmount
    }));

    // Add to history
    const newWithdrawal = {
      id: withdrawals.length + 1,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      amount: withdrawAmount,
      status: 'success',
      txHash: txHash.substring(0, 10) + '...' + txHash.substring(txHash.length - 3),
      txHashFull: txHash,
      walletAddress: '0x7c3d...89f',
      gasFee: 0.02
    };

    setWithdrawals([newWithdrawal, ...withdrawals]);

    // Show success
    setShowProcessingModal(false);
    setShowSuccessModal(true);
  };

  // Handle cancel
  const handleCancel = () => {
    setShowConfirmModal(false);
    setWithdrawAmount(0);
  };

  // Handle close success
  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setWithdrawAmount(0);
  };

  return (
    <>
      <Header user={user} userType="publisher" />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <WithdrawHeader walletAddress={walletAddressFull} />

        {/* Balance Overview */}
        <BalanceOverview balance={balance} onWithdrawAll={handleWithdrawAll} />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Withdraw Form */}
          <WithdrawForm
            balance={balance.available}
            walletAddress={walletAddressFull}
            onWithdraw={handleWithdraw}
            onCancel={() => {}}
          />

          {/* Placeholder for future components or empty */}
          <div className="hidden lg:block"></div>
        </div>

        {/* Withdrawal History */}
        <div id="withdrawal-history">
          <WithdrawalHistory withdrawals={withdrawals} stats={stats} />
        </div>
      </div>

      {/* Modals */}
      {showConfirmModal && (
        <ConfirmWithdrawModal
          amount={withdrawAmount}
          walletAddress={walletAddressFull}
          onConfirm={handleConfirmWithdraw}
          onCancel={handleCancel}
        />
      )}

      {showProcessingModal && <ProcessingModal currentStep={processingStep} />}

      {showSuccessModal && (
        <SuccessModal
          amount={withdrawAmount}
          txHash={lastTxHash}
          blockNumber={lastBlockNumber}
          newBalance={balance.available}
          pendingBalance={balance.pending}
          onClose={handleCloseSuccess}
        />
      )}
    </>
  );
};

export default Withdraw;
