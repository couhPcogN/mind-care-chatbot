import React from 'react';
import { experts } from '../features/experts';
import { Expert, SubscriptionPlan } from '../types';
import { subscriptionPlans } from '../features/subscriptions';

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" />
    </svg>
);


const SubscriptionPlanCard: React.FC<{ plan: SubscriptionPlan }> = ({ plan }) => {
    const handleSubscribe = () => {
        alert(`Chức năng đăng ký ${plan.name} đang được phát triển. Vui lòng quay lại sau!`);
    };

    return (
        <div className={`relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 ${plan.isPopular ? 'border-purple-500' : 'border-gray-200 dark:border-gray-700'}`}>
            {plan.isPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 text-sm font-semibold text-white bg-purple-500 rounded-full shadow-md">
                    Phổ biến nhất
                </div>
            )}
            <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white">{plan.name}</h3>
            <p className="text-center mt-2">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-base font-medium text-gray-500 dark:text-gray-400">{plan.billingCycle}</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckIcon />
                        <span className="ml-2" dangerouslySetInnerHTML={{ __html: feature.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></span>
                    </li>
                ))}
            </ul>
            <button
                onClick={handleSubscribe}
                className={`mt-8 w-full px-4 py-3 text-md font-semibold rounded-lg shadow-md transition-all duration-200 ${plan.isPopular ? 'text-white bg-purple-500 hover:bg-purple-600' : 'text-purple-600 bg-purple-100 hover:bg-purple-200 dark:bg-gray-700 dark:text-purple-300 dark:hover:bg-gray-600'}`}
            >
                Chọn gói
            </button>
        </div>
    );
};


const ExpertCard: React.FC<{ expert: Expert, onSelect: () => void }> = ({ expert, onSelect }) => {
  return (
    <div 
        onClick={onSelect}
        className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-200 transform hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      <img
        src={expert.avatarUrl}
        alt={expert.name}
        className="w-24 h-24 rounded-full object-cover flex-shrink-0 border-4 border-gray-200 dark:border-gray-700"
      />
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{expert.name}</h3>
        <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
          {expert.specializations.map((spec) => (
            <span key={spec} className="px-2 py-1 text-xs font-semibold text-pink-700 bg-pink-100 rounded-full dark:bg-pink-900 dark:text-pink-200">
              {spec}
            </span>
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">{expert.bio}</p>
         <button className="mt-4 text-sm font-semibold text-purple-600 dark:text-purple-400">
          Xem chi tiết và đặt lịch &rarr;
        </button>
      </div>
    </div>
  );
};

interface ExpertsViewProps {
    onSelectExpert: (expertId: string) => void;
}

const ExpertsView: React.FC<ExpertsViewProps> = ({ onSelectExpert }) => {
  return (
    <div className="p-4 md:p-6 space-y-12">
      {/* Subscription Plans Section */}
      <section>
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Đăng ký để được hỗ trợ chuyên sâu</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1 max-w-2xl mx-auto">
                Chọn một gói phù hợp với bạn để bắt đầu hành trình tham vấn không giới hạn cùng chuyên gia.
            </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {subscriptionPlans.map((plan) => (
                <SubscriptionPlanCard key={plan.id} plan={plan} />
            ))}
        </div>
      </section>

      {/* Experts List Section */}
      <section>
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Gặp gỡ đội ngũ chuyên gia</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1 max-w-2xl mx-auto">
                Các chuyên gia của chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn trên con đường chăm sóc sức khỏe tinh thần.
            </p>
        </div>
        <div className="space-y-4 max-w-4xl mx-auto">
            {experts.map((expert) => (
                <ExpertCard key={expert.id} expert={expert} onSelect={() => onSelectExpert(expert.id)} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default ExpertsView;