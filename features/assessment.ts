import { AssessmentOption } from '../types';

interface Question {
  text: string;
  options: AssessmentOption[];
}

export const questions: Question[] = [
  {
    text: 'Câu 1/4: Trong 2 tuần qua, bạn có thường xuyên cảm thấy ít hứng thú hoặc không còn niềm vui khi làm những việc mình từng yêu thích không?',
    options: [
      { label: 'Không hề', score: 0 },
      { label: 'Vài ngày', score: 1 },
      { label: 'Hơn một nửa số ngày', score: 2 },
      { label: 'Gần như mỗi ngày', score: 3 },
    ],
  },
  {
    text: 'Câu 2/4: Trong 2 tuần qua, bạn có thường xuyên cảm thấy buồn bã, chán nản, hoặc tuyệt vọng không?',
    options: [
      { label: 'Không hề', score: 0 },
      { label: 'Vài ngày', score: 1 },
      { label: 'Hơn một nửa số ngày', score: 2 },
      { label: 'Gần như mỗi ngày', score: 3 },
    ],
  },
  {
    text: 'Câu 3/4: Trong 2 tuần qua, bạn có thường xuyên cảm thấy bồn chồn, lo lắng, hoặc căng thẳng không?',
    options: [
      { label: 'Không hề', score: 0 },
      { label: 'Vài ngày', score: 1 },
      { label: 'Hơn một nửa số ngày', score: 2 },
      { label: 'Gần như mỗi ngày', score: 3 },
    ],
  },
  {
    text: 'Câu 4/4: Trong 2 tuần qua, bạn có gặp khó khăn trong việc ngừng lại hoặc kiểm soát sự lo lắng của mình không?',
    options: [
      { label: 'Không hề', score: 0 },
      { label: 'Vài ngày', score: 1 },
      { label: 'Hơn một nửa số ngày', score: 2 },
      { label: 'Gần như mỗi ngày', score: 3 },
    ],
  },
];

export const getAssessmentResult = (score: number): string => {
  if (score <= 2) { // Minimal
    return 'Cảm ơn bạn đã chia sẻ. Dựa trên câu trả lời, có vẻ như mức độ lo âu hoặc buồn bã của bạn đang ở mức rất thấp. Đây là một tín hiệu tích cực! Hãy tiếp tục duy trì việc chăm sóc bản thân nhé. Nếu có bất cứ điều gì muốn tâm sự, tôi vẫn luôn ở đây.';
  } else if (score <= 5) { // Mild
    return 'Cảm ơn bạn đã hoàn thành bài trắc nghiệm. Kết quả cho thấy bạn có thể đang trải qua một vài triệu chứng lo âu hoặc trầm cảm ở mức độ nhẹ. Đôi khi, ai cũng có những ngày như vậy. Bạn có muốn cùng tôi tìm hiểu một số cách đơn giản để thư giãn và cải thiện tâm trạng không?';
  } else if (score <= 8) { // Moderate
    return 'Cảm ơn bạn đã tin tưởng chia sẻ. Kết quả cho thấy bạn có thể đang phải đối mặt với các triệu chứng lo âu và/hoặc trầm cảm ở mức độ vừa phải. Đừng bỏ qua những cảm xúc này nhé. Trò chuyện cởi mở về chúng là bước đầu tiên rất quan trọng. Tôi thật lòng khuyên bạn nên chia sẻ điều này với một chuyên gia tâm lý hoặc một người lớn đáng tin cậy để nhận được sự hỗ trợ phù hợp.';
  } else { // Severe (score >= 9)
    return 'Cảm ơn bạn đã dũng cảm chia sẻ những điều này. Tôi nhận thấy rằng bạn có thể đang phải trải qua những cảm xúc rất nặng nề và các triệu chứng ở mức độ đáng chú ý. Điều quan trọng nhất lúc này là bạn không hề đơn độc và việc tìm kiếm sự giúp đỡ chuyên nghiệp là vô cùng cần thiết.\n\nHãy liên hệ với một chuyên gia tư vấn tâm lý càng sớm càng tốt. Họ có những phương pháp chuyên môn để giúp bạn vượt qua giai đoạn khó khăn này. Bạn xứng đáng được giúp đỡ và cảm thấy tốt hơn.';
  }
};
