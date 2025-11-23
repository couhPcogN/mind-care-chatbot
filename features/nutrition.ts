import { NutritionTip } from '../types';
import { LeafIcon } from '../components/icons'; // Using a generic icon for now

const placeholderIcon = LeafIcon;

export const nutritionTips: NutritionTip[] = [
  {
    id: 'nu1',
    title: 'Axit béo Omega-3',
    content: 'Có trong cá béo (cá hồi, cá thu), quả óc chó, và hạt chia. Omega-3 có thể giúp giảm các triệu chứng trầm cảm và lo âu.',
    icon: placeholderIcon,
    category: 'mood-boosting',
  },
  {
    id: 'nu2',
    title: 'Carbohydrate phức hợp',
    content: 'Chọn ngũ cốc nguyên hạt, yến mạch, và các loại đậu. Chúng giải phóng năng lượng từ từ, giúp ổn định tâm trạng và đường huyết.',
    icon: placeholderIcon,
    category: 'energy',
  },
  {
    id: 'nu3',
    title: 'Uống đủ nước',
    content: 'Mất nước nhẹ cũng có thể ảnh hưởng tiêu cực đến tâm trạng và khả năng tập trung. Hãy đảm bảo bạn uống đủ nước trong ngày.',
    icon: placeholderIcon,
    category: 'calming',
  },
  {
    id: 'nu4',
    title: 'Hạn chế Caffeine & Đường',
    content: 'Sử dụng quá nhiều có thể gây ra cảm giác bồn chồn, lo lắng và làm gián đoạn giấc ngủ. Hãy tiêu thụ một cách điều độ.',
    icon: placeholderIcon,
    category: 'calming',
  },
];