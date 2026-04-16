import { ORDER_STATUS, PAYMENT_STATUS } from '@/utils/constants';

interface StatusBadgeProps {
  status: string;
  type: 'order' | 'payment';
}

const StatusBadge = ({ status, type }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    if (type === 'order') {
      return ORDER_STATUS[status as keyof typeof ORDER_STATUS] || { 
        label: status, 
        bgColor: 'bg-gray-100', 
        textColor: 'text-gray-800' 
      };
    }
    if (type === 'payment') {
      const paymentStatus = PAYMENT_STATUS[status as keyof typeof PAYMENT_STATUS];
      if (paymentStatus) {
        const colors = {
          pending: { bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
          paid: { bgColor: 'bg-green-100', textColor: 'text-green-800' },
          failed: { bgColor: 'bg-red-100', textColor: 'text-red-800' },
        };
        return { 
          label: paymentStatus.label, 
          ...colors[status as keyof typeof colors] 
        };
      }
    }
    return { 
      label: status, 
      bgColor: 'bg-gray-100', 
      textColor: 'text-gray-800' 
    };
  };

  const config = getStatusConfig();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
