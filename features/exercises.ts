import { Exercise } from '../types';
import { BrainIcon } from '../components/icons'; // Using a generic icon for now

// A more specific icon mapping could be done here if more icons are available
const placeholderIcon = BrainIcon;

export const exercises: Exercise[] = [
  {
    id: 'ex1',
    title: 'Hít thở sâu (Thở hộp)',
    description: 'Hít vào trong 4 giây, giữ hơi trong 4 giây, thở ra trong 4 giây, và nghỉ 4 giây. Lặp lại để làm dịu hệ thần kinh.',
    icon: placeholderIcon,
    category: 'anxiety',
  },
  {
    id: 'ex2',
    title: 'Kỹ thuật Tiếp đất 5-4-3-2-1',
    description: 'Nhận biết 5 thứ bạn có thể thấy, 4 thứ có thể chạm, 3 thứ có thể nghe, 2 thứ có thể ngửi, và 1 thứ có thể nếm để trở về với thực tại.',
    icon: placeholderIcon,
    category: 'grounding',
  },
  {
    id: 'ex3',
    title: 'Tự khẳng định tích cực',
    description: 'Lặp lại những câu khẳng định tích cực về bản thân, ví dụ: "Tôi có đủ khả năng để vượt qua thử thách này." để xây dựng sự tự tin.',
    icon: placeholderIcon,
    category: 'self-esteem',
  },
   {
    id: 'ex4',
    title: 'Quét cơ thể (Body Scan)',
    description: 'Tập trung sự chú ý vào từng bộ phận của cơ thể từ đầu đến chân, nhận biết mọi cảm giác mà không phán xét.',
    icon: placeholderIcon,
    category: 'mindfulness',
  },
];