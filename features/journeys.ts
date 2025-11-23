import { Journey } from '../types';

export const journeys: Journey[] = [
  {
    id: 'j1',
    title: 'Hành trình: Tiếp đất & Chánh niệm',
    description: 'Một liệu trình 5 ngày được thiết kế để giúp bạn kết nối lại với hiện tại, giảm bớt cảm giác lo âu và xa rời thực tại.',
    tags: ['Lo âu', 'Tiếp đất', 'Các nhân hóa', 'Căng thẳng'],
    steps: [
      {
        day: 1,
        title: 'Ngày 1: Hiểu về Chánh niệm',
        content: 'Chánh niệm là khả năng chú tâm vào khoảnh khắc hiện tại, nhận biết suy nghĩ, cảm xúc và cảm giác cơ thể mà không phán xét. Đó là một công cụ mạnh mẽ để thoát khỏi vòng xoáy lo lắng về quá khứ hoặc tương lai.',
        exerciseId: null,
        reflectionPrompt: 'Hôm nay, hãy thử để ý xem có khoảnh khắc nào bạn hoàn toàn "có mặt" không? Đó là lúc nào và bạn cảm thấy ra sao?'
      },
      {
        day: 2,
        title: 'Ngày 2: Sức mạnh của Hơi thở',
        content: 'Hơi thở là mỏ neo kết nối ta với hiện tại. Khi tập trung vào hơi thở, chúng ta kích hoạt hệ thần kinh phó giao cảm, giúp cơ thể và tâm trí thư giãn. Bài tập hôm nay sẽ giúp bạn làm quen với kỹ thuật này.',
        exerciseId: 'ex1',
        reflectionPrompt: 'Sau khi thực hành bài tập thở, bạn có nhận thấy sự thay đổi nào trong cơ thể hoặc tâm trí mình không?'
      },
      {
        day: 3,
        title: 'Ngày 3: Kết nối với Giác quan',
        content: 'Khi tâm trí trở nên quá tải, việc quay về với 5 giác quan có thể giúp bạn "tiếp đất" một cách nhanh chóng. Kỹ thuật 5-4-3-2-1 là một bài tập tuyệt vời để đưa sự chú ý của bạn ra khỏi những suy nghĩ tiêu cực và trở về với môi trường xung quanh.',
        exerciseId: 'ex2',
        reflectionPrompt: 'Trong bài tập 5-4-3-2-1, giác quan nào giúp bạn cảm thấy kết nối với thực tại mạnh mẽ nhất?'
      },
      {
        day: 4,
        title: 'Ngày 4: Nhận biết Cơ thể',
        content: 'Căng thẳng và lo âu thường tích tụ trong cơ thể dưới dạng các cơn co cứng hoặc đau mỏi mà chúng ta không hề hay biết. Quét cơ thể là một bài tập chánh niệm giúp bạn nhận ra những điểm căng thẳng này và học cách thả lỏng chúng.',
        exerciseId: 'ex4',
        reflectionPrompt: 'Bạn có ngạc nhiên khi phát hiện ra sự căng thẳng ở một bộ phận nào đó trên cơ thể mình không?'
      },
      {
        day: 5,
        title: 'Ngày 5: Tích hợp vào Cuộc sống',
        content: 'Chánh niệm không chỉ là một bài tập, mà là một lối sống. Hôm nay, hãy thử áp dụng chánh niệm vào một hoạt động hàng ngày, như ăn uống, đi bộ, hoặc rửa bát. Hãy thực hiện nó một cách chậm rãi và chú tâm.',
        exerciseId: null,
        reflectionPrompt: 'Bạn cảm thấy thế nào khi thực hiện một công việc quen thuộc với sự chú tâm hoàn toàn mới? Bạn đã học được gì trong 5 ngày qua?'
      }
    ]
  },
  {
    id: 'j2',
    title: 'Hành trình: Xây dựng Lòng tự trắc ẩn',
    description: 'Học cách đối xử với bản thân bằng sự tử tế và thấu hiểu, đặc biệt là trong những lúc khó khăn. Liệu trình này giúp giảm tự chỉ trích và tăng cường sự chấp nhận bản thân.',
    tags: ['Tự trọng', 'Tự phê bình', 'Cảm xúc'],
    steps: [
        {
            day: 1,
            title: 'Ngày 1: Lòng trắc ẩn là gì?',
            content: 'Tìm hiểu về ba thành phần cốt lõi của lòng tự trắc ẩn: sự tử tế với bản thân, nhận thức về nhân loại chung, và chánh niệm.',
            exerciseId: 'ex3',
            reflectionPrompt: 'Bạn thường nói với chính mình điều gì khi mắc lỗi? Hãy thử viết lại câu nói đó theo một cách tử tế hơn.'
        },
        {
            day: 2,
            title: 'Ngày 2: Thực hành Chánh niệm',
            content: 'Học cách quan sát những suy nghĩ và cảm xúc tự chỉ trích của bạn mà không bị chúng cuốn đi.',
            exerciseId: 'ex4',
            reflectionPrompt: 'Cảm giác như thế nào khi chỉ quan sát một suy nghĩ tiêu cực thay vì tin vào nó ngay lập tức?'
        }
    ]
  },
];
