const BudgetWidget = () => {
  return (
    <div className="border-2 border-vintage-white bg-vintage-black p-6">
      <h3 className="font-mono uppercase tracking-wider text-sm mb-5">
        Account Balance
      </h3>

      <div className="mb-4">
        <div className="flex justify-between mb-2 font-mono text-xs">
          <span className="text-vintage-gray-600">Available Balance:</span>
          <span>$342.00</span>
        </div>

        <div className="flex justify-between mb-3 font-mono text-xs">
          <span className="text-vintage-gray-600">Pending Transactions:</span>
          <span>$12.50</span>
        </div>

        <div className="border-t-2 border-vintage-white pt-3 flex justify-between font-mono text-sm font-bold">
          <span>Total:</span>
          <span>$354.50</span>
        </div>
      </div>

      <div className="flex gap-3 flex-col">
        <button className="btn-vintage-inverse text-xs py-2">
          + Add Funds
        </button>
        <button className="btn-vintage text-xs py-2">
          History
        </button>
      </div>
    </div>
  );
};

export default BudgetWidget;
