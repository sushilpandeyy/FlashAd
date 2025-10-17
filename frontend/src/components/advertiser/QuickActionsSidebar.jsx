import { Link } from 'react-router-dom';

const QuickActionsSidebar = () => {
  const actions = [
    { label: 'Create Campaign', link: '/advertiser/campaigns/new' },
    { label: 'View Analytics', link: '/advertiser/analytics' },
    { label: 'Add Funds', link: '#' },
    { label: 'Help Center', link: '/docs' },
    { label: 'Settings', link: '/settings' }
  ];

  return (
    <div className="border-2 border-vintage-white bg-vintage-black p-5 sticky top-5">
      <h3 className="font-mono uppercase tracking-wider text-xs mb-4">
        Quick Actions
      </h3>

      <div className="flex flex-col gap-2">
        {actions.map((action, index) => (
          action.link.startsWith('/') ? (
            <Link
              key={index}
              to={action.link}
              className={`p-3 font-mono text-xs uppercase tracking-wider transition-all ${
                index === 0
                  ? 'bg-vintage-white text-vintage-black hover:bg-transparent hover:text-vintage-white border-2 border-vintage-white'
                  : 'bg-transparent text-vintage-white hover:bg-vintage-gray-200 border border-vintage-gray-400'
              }`}
            >
              {action.label}
            </Link>
          ) : (
            <button
              key={index}
              className={`p-3 font-mono text-xs uppercase tracking-wider transition-all ${
                index === 0
                  ? 'bg-vintage-white text-vintage-black hover:bg-transparent hover:text-vintage-white border-2 border-vintage-white'
                  : 'bg-transparent text-vintage-white hover:bg-vintage-gray-200 border border-vintage-gray-400'
              }`}
            >
              {action.label}
            </button>
          )
        ))}
      </div>
    </div>
  );
};

export default QuickActionsSidebar;
