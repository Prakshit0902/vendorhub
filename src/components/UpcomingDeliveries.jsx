// components/UpcomingDeliveries.jsx (continued)
import { TruckIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const UpcomingDeliveries = () => {
  const upcomingDeliveries = [
    { date: new Date(), time: 'By 11:00 AM', items: 10, amount: 520 },
    { date: new Date(Date.now() + 86400000), time: 'By 11:00 AM', items: 12, amount: 685 },
    { date: new Date(Date.now() + 172800000), time: 'By 11:00 AM', items: 8, amount: 420 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Upcoming Deliveries</h2>
        <Link to="/cancel-day" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Manage
        </Link>
      </div>
      
      <div className="space-y-4">
        {upcomingDeliveries.map((delivery, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <TruckIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium">{format(delivery.date, 'dd MMM yyyy')}</p>
                <p className="text-sm text-gray-500">{delivery.time} • {delivery.items} items</p>
              </div>
            </div>
            <p className="font-semibold">₹{delivery.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDeliveries;