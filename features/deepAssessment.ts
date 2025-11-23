export interface AssessmentOption {
  label: string;
  score: number;
}

interface Question {
  id: string;
  type: 'phq-9' | 'gad-7';
  text: string;
  options: AssessmentOption[];
}

const standardOptions: AssessmentOption[] = [
  { label: 'Không hề', score: 0 },
  { label: 'Vài ngày', score: 1 },
  { label: 'Hơn một nửa số ngày', score: 2 },
  { label: 'Gần như mỗi ngày', score: 3 },
];

const phq9Questions: Question[] = [
  { id: 'p1', type: 'phq-9', text: 'Trong 2 tuần qua, bạn có thường xuyên cảm thấy ít hứng thú hoặc không còn niềm vui khi làm những việc mình từng yêu thích không?', options: standardOptions },
  { id: 'p2', type: 'phq-9', text: 'Trong 2 tuần qua, bạn có thường xuyên cảm thấy buồn bã, chán nản, hoặc tuyệt vọng không?', options: standardOptions },
  { id: 'p3', type: 'phq-9', text: 'Trong 2 tuần qua, bạn có gặp khó khăn khi vào giấc ngủ, ngủ không yên, hoặc ngủ quá nhiều không?', options: standardOptions },
  { id: 'p4', type: 'phq-9', text: 'Trong 2 tuần qua, bạn có thường xuyên cảm thấy mệt mỏi hoặc thiếu năng lượng không?', options: standardOptions },
  { id: 'p5', type: 'phq-9', text: 'Trong 2 tuần qua, bạn có cảm thấy chán ăn hoặc ăn quá nhiều không?', options: standardOptions },
  { id: 'p6', type: 'phq-9', text: 'Trong 2 tuần qua, bạn có cảm thấy tồi tệ về bản thân - hoặc cho rằng mình là người thất bại, đã làm gia đình hoặc bản thân thất vọng không?', options: standardOptions },
  { id: 'p7', type: 'phq-9', text: 'Trong 2 tuần qua, bạn có gặp khó khăn trong việc tập trung vào mọi việc, chẳng hạn như đọc báo hoặc xem TV không?', options: standardOptions },
  { id: 'p8', type: 'phq-9', text: 'Trong 2 tuần qua, bạn có di chuyển hoặc nói chuyện chậm đến mức người khác có thể nhận thấy? Hoặc ngược lại - bồn chồn, đứng ngồi không yên hơn bình thường không?', options: standardOptions },
  { id: 'p9', type: 'phq-9', text: 'Trong 2 tuần qua, bạn có suy nghĩ rằng sẽ tốt hơn nếu mình chết đi, hoặc có ý định tự làm hại bản thân không?', options: standardOptions },
];

const gad7Questions: Question[] = [
  { id: 'g1', type: 'gad-7', text: 'Trong 2 tuần qua, bạn có thường xuyên cảm thấy bồn chồn, lo lắng, hoặc căng thẳng không?', options: standardOptions },
  { id: 'g2', type: 'gad-7', text: 'Trong 2 tuần qua, bạn có gặp khó khăn trong việc ngừng lại hoặc kiểm soát sự lo lắng của mình không?', options: standardOptions },
  { id: 'g3', type: 'gad-7', text: 'Trong 2 tuần qua, bạn có lo lắng quá nhiều về những điều khác nhau không?', options: standardOptions },
  { id: 'g4', type: 'gad-7', text: 'Trong 2 tuần qua, bạn có gặp khó khăn khi thư giãn không?', options: standardOptions },
  { id: 'g5', type: 'gad-7', text: 'Trong 2 tuần qua, bạn có cảm thấy bồn chồn đến mức không thể ngồi yên được không?', options: standardOptions },
  { id: 'g6', type: 'gad-7', text: 'Trong 2 tuần qua, bạn có dễ trở nên cáu kỉnh hoặc khó chịu không?', options: standardOptions },
  { id: 'g7', type: 'gad-7', text: 'Trong 2 tuần qua, bạn có cảm thấy sợ hãi như thể có điều gì đó khủng khiếp sắp xảy ra không?', options: standardOptions },
];

export const allQuestions = [...phq9Questions, ...gad7Questions];

interface InterpretationResult {
    level: string;
    interpretation: string;
    colorClass: string;
}

export const interpretPHQ9 = (score: number): InterpretationResult => {
  if (score >= 0 && score <= 4) return { level: 'Không có hoặc rất ít', interpretation: 'Các dấu hiệu trầm cảm không đáng kể. Hãy tiếp tục duy trì các thói quen tốt.', colorClass: 'bg-green-100 dark:bg-green-900 border-green-500' };
  if (score >= 5 && score <= 9) return { level: 'Mức độ nhẹ', interpretation: 'Bạn có thể đang trải qua một vài dấu hiệu trầm cảm nhẹ. Việc quan sát và chăm sóc cảm xúc là điều cần thiết.', colorClass: 'bg-yellow-100 dark:bg-yellow-900 border-yellow-500' };
  if (score >= 10 && score <= 14) return { level: 'Mức độ vừa', interpretation: 'Các dấu hiệu cho thấy bạn có thể đang ở trong giai đoạn trầm cảm vừa. Việc trò chuyện với chuyên gia tâm lý được khuyến khích.', colorClass: 'bg-orange-100 dark:bg-orange-900 border-orange-500' };
  if (score >= 15 && score <= 19) return { level: 'Mức độ vừa đến nặng', interpretation: 'Các dấu hiệu trầm cảm ở mức độ đáng chú ý. Tìm kiếm sự hỗ trợ chuyên nghiệp là rất quan trọng lúc này.', colorClass: 'bg-red-100 dark:bg-red-900 border-red-500' };
  return { level: 'Mức độ nặng', interpretation: 'Các dấu hiệu cho thấy bạn đang trải qua giai đoạn trầm cảm nặng. Vui lòng tìm kiếm sự giúp đỡ từ chuyên gia tâm lý ngay lập tức.', colorClass: 'bg-red-200 dark:bg-red-900 border-red-600' };
};

export const interpretGAD7 = (score: number): InterpretationResult => {
  if (score >= 0 && score <= 4) return { level: 'Không có hoặc rất ít', interpretation: 'Các dấu hiệu lo âu không đáng kể. Hãy tiếp tục duy trì các kỹ năng đối phó tích cực.', colorClass: 'bg-green-100 dark:bg-green-900 border-green-500' };
  if (score >= 5 && score <= 9) return { level: 'Mức độ nhẹ', interpretation: 'Bạn có thể đang trải qua một vài dấu hiệu lo âu nhẹ. Các bài tập thư giãn có thể hữu ích cho bạn.', colorClass: 'bg-yellow-100 dark:bg-yellow-900 border-yellow-500' };
  if (score >= 10 && score <= 14) return { level: 'Mức độ vừa', interpretation: 'Các dấu hiệu lo âu ở mức độ vừa. Cân nhắc tham vấn chuyên gia để có chiến lược đối phó hiệu quả hơn.', colorClass: 'bg-orange-100 dark:bg-orange-900 border-orange-500' };
  return { level: 'Mức độ nặng', interpretation: 'Các dấu hiệu lo âu ở mức độ nặng. Việc tìm kiếm sự hỗ trợ chuyên nghiệp là rất cần thiết để kiểm soát các triệu chứng này.', colorClass: 'bg-red-100 dark:bg-red-900 border-red-500' };
};
