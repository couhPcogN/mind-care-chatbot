import { SubscriptionPlan } from '../types';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'monthly',
    name: 'Gói Tháng',
    price: '299.000 VNĐ',
    billingCycle: '/ tháng',
    features: [
      'Nhắn tin không giới hạn với chuyên gia',
      'Phản hồi hàng ngày (Thứ 2 - Thứ 6)',
      'Truy cập tất cả công cụ & bài tập',
      'Hủy bất cứ lúc nào',
    ],
  },
  {
    id: 'yearly',
    name: 'Gói Năm',
    price: '2.999.000 VNĐ',
    billingCycle: '/ năm',
    features: [
      '**Tiết kiệm 15%** so với gói tháng',
      'Nhắn tin không giới hạn với chuyên gia',
      'Phản hồi hàng ngày (Thứ 2 - Thứ 6)',
      'Truy cập tất cả công cụ & bài tập',
      'Ưu tiên đặt lịch hẹn (sắp ra mắt)',
    ],
    isPopular: true,
  },
];
