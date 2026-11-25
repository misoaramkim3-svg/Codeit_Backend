import type { MemoRecordType, UserType } from "./types";

export const FAKE_USERS: UserType[] = [
  {
    id: 1,
    email: "wiz@example.com",
    password: "Password1!",
    username: "위즈",
    createdAt: "2026-01-01T09:00:00",
  },
  {
    id: 2,
    email: "seoyeon@example.com",
    password: "Password1!",
    username: "서연",
    createdAt: "2026-01-02T09:00:00",
  },
  {
    id: 3,
    email: "junho@example.com",
    password: "Password1!",
    username: "준호",
    createdAt: "2026-01-03T09:00:00",
  },
  {
    id: 4,
    email: "minji@example.com",
    password: "Password1!",
    username: "민지",
    createdAt: "2026-01-04T09:00:00",
  },
  {
    id: 5,
    email: "haneul@example.com",
    password: "Password1!",
    username: "하늘",
    createdAt: "2026-01-05T09:00:00",
  },
];

export const FAKE_MEMOS: (Omit<MemoRecordType, "userId"> & {
  userId: number;
})[] = [
  {
    id: 100,
    userId: 1,
    title: "올해 목표 점검",
    content:
      "연초에 다이어리 첫 장에 적어 둔 목표 다섯 개를 다시 펼쳐 봤다.\n운동 꾸준히 하기, 책 스무 권 읽기, 혼자 여행 가기는 이뤘다. 영어 공부랑 저축 목표는 반쯤에서 멈춰 있다.\n솔직히 다섯 개 다 지키는 사람이 있을까 싶다가도, 세 개면 꽤 잘한 거라고 스스로 칭찬해 주기로 했다.\n남은 두 달 동안은 욕심내지 말고 하나만 더 해 보자. 저축은 숫자로 보이니까 그걸로 정했다. 이번 달부터 월급날에 자동이체 걸어 두기.",
    imageUrl: "https://picsum.photos/seed/memo-100/800/600",
    createdAt: "2026-11-09T21:30:00",
  },
  {
    id: 99,
    userId: 2,
    title: "겨울 준비",
    content:
      "아침에 일어났더니 발끝이 시렸다. 드디어 전기장판을 꺼낼 때가 됐다.\n장롱 위에 올려 둔 두꺼운 이불도 내려서 햇볕에 한 번 털어 말렸다. 이불 커버를 바꾸는 데만 삼십 분이 걸렸는데, 매년 이 시간이 제일 귀찮고 또 제일 좋다.\n문제는 이제부터다. 이불 속이 너무 따뜻해서 알람이 세 번 울릴 때까지 못 일어났다. 겨울이 오는 게 반갑기도 하고 무섭기도 하다.",
    imageUrl: "https://picsum.photos/seed/memo-99/800/600",
    createdAt: "2026-11-08T05:23:00",
  },
  {
    id: 98,
    userId: 3,
    title: "무한 스크롤 공부",
    content:
      "메모 목록에 무한 스크롤을 붙여 봤다.\n원리는 생각보다 단순했다. 목록 맨 아래에 보이지 않는 감시용 박스를 하나 두고, IntersectionObserver로 그 박스가 화면에 들어오는지 지켜본다. 들어오면 다음 페이지를 불러오면 끝.\n헷갈렸던 건 커서였다. 페이지 번호 대신 마지막으로 받은 메모의 id를 서버에 넘기면, 그 뒤부터 이어서 준다. 중간에 새 메모가 생겨도 목록이 밀리지 않는 게 장점이라고 한다.\n그리고 하나 배운 것. 무한 스크롤로 열 페이지쯤 내려간 상태에서 데이터를 새로 고치면, 그 열 페이지를 처음부터 다 다시 불러온다. 메모를 새로 쓴 뒤에는 차라리 첫 페이지로 리셋하는 게 낫다.",
    imageUrl: "https://picsum.photos/seed/memo-98/800/600",
    createdAt: "2026-11-07T08:36:00",
  },
  {
    id: 97,
    userId: 4,
    title: "빨래하기 좋은 날",
    content:
      "해가 쨍쨍해서 이불 빨래를 했다.\n베란다에 널어 두고 출근했는데, 저녁에 걷어 온 이불에서 햇볕 냄새가 났다. 이 냄새를 정확히 뭐라고 설명해야 할지 모르겠다. 따뜻하고, 조금 고소하고, 어릴 때 할머니 댁 마루 같은 냄새.\n오늘 밤은 잠이 잘 올 것 같다.",
    imageUrl: "https://picsum.photos/seed/memo-97/800/600",
    createdAt: "2026-11-06T04:21:00",
  },
  {
    id: 96,
    userId: 5,
    title: "동네 서점",
    content:
      '퇴근길에 늘 지나치기만 하던 골목 안쪽 독립 서점에 처음 들어가 봤다.\n가게는 테이블 두 개 크기만 했는데 책마다 사장님이 손글씨로 쓴 짧은 소개가 꽂혀 있었다. 읽다 보니 한 시간이 지나 있었다.\n뭘 사야 할지 몰라서 머뭇거리고 있으니 사장님이 요즘 어떤 기분이냐고 물으셨다. 좀 지쳐 있다고 했더니 얇은 시집 한 권을 건네주셨다. 첫 장을 펼치자마자 마음에 드는 문장이 나왔다.\n"천천히 와도 괜찮다고, 저녁이 먼저 말해 주었다."\n다음 달에도 또 가서 기분을 말하고 책을 받아 와야겠다.',
    imageUrl: "https://picsum.photos/seed/memo-96/800/600",
    createdAt: "2026-11-05T01:13:00",
  },
  {
    id: 95,
    userId: 1,
    title: "야근한 날",
    content:
      "밤 10시에 퇴근했다.\n저녁은 편의점 삼각김밥 하나로 때웠다. 참치마요랑 전주비빔 중에 고민하다가 결국 둘 다 샀다.\n오늘 하루를 돌아보면 급한 일보다 급해 보이는 일에 시간을 너무 많이 썼다. 내일은 출근하자마자 진짜 중요한 일 하나부터 끝내자. 그리고 일찍 가자.",
    imageUrl: "https://picsum.photos/seed/memo-95/800/600",
    createdAt: "2026-11-04T01:30:00",
  },
  {
    id: 94,
    userId: 2,
    title: "상태 관리 메모",
    content:
      "useState는 값이 바뀌면 그 컴포넌트를 다시 그린다. 여기까지는 알겠는데 오늘은 여러 컴포넌트가 같은 값을 써야 하는 상황에서 막혔다.\n정답은 상태 끌어올리기. 두 컴포넌트가 같이 쓰는 값이면, 둘의 가장 가까운 부모로 올려서 props로 내려 준다.\n그런데 이게 세 단계, 네 단계 내려가기 시작하면 props를 전달만 하는 중간 컴포넌트가 생긴다. 이럴 때 Context나 상태 관리 라이브러리를 쓴다고 한다.\n정리하면\n1. 한 컴포넌트만 쓰면 그 안에 둔다\n2. 형제끼리 같이 쓰면 부모로 올린다\n3. 너무 멀리 내려가면 그때 전역 상태를 고민한다\n처음부터 전역으로 만들지 말 것.",
    imageUrl: "https://picsum.photos/seed/memo-94/800/600",
    createdAt: "2026-11-02T12:25:00",
  },
  {
    id: 93,
    userId: 3,
    title: "이웃집 강아지",
    content:
      "옆집 강아지 이름이 보리라는 걸 오늘 알았다.\n엘리베이터에서 마주칠 때마다 꼬리를 흔들어서 혹시 나를 좋아하나 했는데, 견주분 말로는 모든 사람을 좋아한다고 한다. 조금 서운했다.\n그래도 허락받고 간식을 하나 줬더니 손을 내밀었다. 나는 아마 다음 주에도 간식을 챙겨서 엘리베이터를 기다릴 것 같다.",
    imageUrl: "https://picsum.photos/seed/memo-93/800/600",
    createdAt: "2026-10-31T21:58:00",
  },
  {
    id: 92,
    userId: 4,
    title: "새 머그컵",
    content:
      "도자기 공방 원데이 클래스에서 머그컵을 만들었다.\n물레 위에서 흙을 올리는 게 생각보다 훨씬 어려웠다. 손에 힘을 조금만 줘도 한쪽이 훅 기울어 버린다. 선생님은 흙이랑 싸우지 말고 따라가라고 하셨다.\n결국 완성된 컵은 입구가 살짝 삐뚤다. 손잡이도 생각보다 두껍다. 그런데 이상하게 그래서 더 마음에 든다. 가마에 구워서 3주 뒤에 받는다고 한다.\n받으면 이 컵에 제일 먼저 뭘 마실지 벌써 고민 중이다.",
    imageUrl: "https://picsum.photos/seed/memo-92/800/600",
    createdAt: "2026-10-31T00:57:00",
  },
  {
    id: 91,
    userId: 5,
    title: "감기 조심",
    content: "목이 칼칼해서 생강차를 진하게 타 마셨다.\n오늘은 일찍 자야겠다.",
    imageUrl: "https://picsum.photos/seed/memo-91/800/600",
    createdAt: "2026-10-30T02:44:00",
  },
  {
    id: 90,
    userId: 1,
    title: "눈 오는 상상",
    content:
      "일기예보에 다음 주 첫눈 소식이 있었다.\n아직 11월인데 벌써 눈을 기다리고 있다니. 어릴 때는 눈 오면 학교 운동장으로 뛰어나갔는데, 요즘은 출근길 걱정이 먼저 든다. 그게 조금 슬펐다.\n그래서 올해는 일부러 계획을 세웠다. 첫눈이 쌓이면 출근 전에 십 분만 일찍 나가서 손바닥만 한 눈사람을 하나 만들기. 회사 앞 화단에 두고 사진도 찍어야지.",
    imageUrl: "https://picsum.photos/seed/memo-90/800/600",
    createdAt: "2026-10-28T23:12:00",
  },
  {
    id: 89,
    userId: 2,
    title: "사진 정리",
    content:
      "휴대폰 저장 공간이 꽉 찼다는 알림이 떠서 사진첩을 열었다가, 사진이 만 이천 장인 걸 보고 놀랐다.\n월별로 앨범을 나누고 흐린 사진, 똑같은 사진 연속 열 장, 언제 찍었는지도 모를 영수증 사진을 지웠다. 세 시간 걸렸다.\n지우다 보니 잊고 있던 장면들이 계속 나왔다. 3년 전 친구들이랑 간 바다, 동생이 처음 운전 연수 받던 날, 지금은 없어진 단골 식당의 마지막 메뉴판.\n정리하려고 시작했는데 결국은 추억 여행을 했다. 그래도 사천 장은 지웠다.",
    imageUrl: "https://picsum.photos/seed/memo-89/800/600",
    createdAt: "2026-10-27T08:11:00",
  },
  {
    id: 88,
    userId: 3,
    title: "떡볶이 만들기",
    content:
      "시판 소스 없이 떡볶이를 처음부터 만들어 봤다.\n고추장 두 숟가락, 고춧가루 한 숟가락, 간장 한 숟가락, 설탕 한 숟가락 반. 물엿 대신 올리고당을 넣었다. 멸치 육수를 내는 게 핵심이라고 해서 그것도 따로 끓였다.\n결과는 조금 달았다. 다음엔 설탕을 한 숟가락만 넣어야겠다. 그래도 어묵이랑 삶은 계란까지 넣으니 그럴듯했다.\n남은 국물에 밥 볶아 먹은 게 사실 제일 맛있었다.",
    imageUrl: "https://picsum.photos/seed/memo-88/800/600",
    createdAt: "2026-10-25T18:59:00",
  },
  {
    id: 87,
    userId: 4,
    title: "주간 회고",
    content:
      "이번 주 회고.\n잘한 것: 월요일부터 금요일까지 매일 30분씩 운동했다. 처음으로 한 주를 꽉 채웠다.\n아쉬운 것: 잠을 너무 늦게 잤다. 평균 새벽 1시 반. 운동해서 몸은 개운한데 아침마다 머리가 무겁다.\n다음 주에 해 볼 것: 밤 12시에 휴대폰을 거실에 두고 들어가기. 침대에서 영상 보는 습관부터 끊어 보자.",
    imageUrl: "https://picsum.photos/seed/memo-87/800/600",
    createdAt: "2026-10-24T02:15:00",
  },
  {
    id: 86,
    userId: 5,
    title: "밤 라디오",
    content:
      "잠들기 전에 오랜만에 라디오를 틀어 놓았다.\n디제이 목소리가 낮고 느려서 이야기를 듣는 것만으로 마음이 가라앉았다. 사연 중에 이사를 앞두고 오래 산 동네를 떠나는 사람 이야기가 있었는데, 괜히 내 얘기 같아서 끝까지 들었다.\n그리고 마지막 곡으로 내가 제일 좋아하는 노래가 나왔다. 아무도 내가 신청한 줄 모르겠지만 나 혼자 신청곡을 받은 기분이었다.",
    imageUrl: "https://picsum.photos/seed/memo-86/800/600",
    createdAt: "2026-10-22T12:49:00",
  },
  {
    id: 85,
    userId: 1,
    title: "배포 완료",
    content:
      "드디어 첫 배포를 했다!\n로컬에서는 잘 되던 게 배포하자마자 이미지가 안 떠서 한 시간을 헤맸다. 알고 보니 이미지 주소를 허용 목록에 안 넣어서였다. 설정 한 줄이었다.\n링크를 친구들 단톡방에 보냈더니 다들 신기해했다. 한 친구는 회원가입을 다섯 번이나 해 보면서 버그를 찾아 줬다. 고맙고 무섭다.\n오늘은 여기까지. 버그는 내일의 내가 고칠 것이다.",
    imageUrl: "https://picsum.photos/seed/memo-85/800/600",
    createdAt: "2026-10-21T09:21:00",
  },
  {
    id: 84,
    userId: 2,
    title: "손편지",
    content:
      "오랜만에 친구에게 손편지를 썼다.\n생일 축하한다는 말만 쓰려고 했는데 쓰다 보니 할 말이 많아졌다. 대학 때 같이 밤새 과제하던 얘기, 졸업하고 연락이 뜸해졌던 몇 년, 그래도 결국 이렇게 다시 가까워진 얘기.\n글씨가 엉망이라 세 번이나 다시 썼다. 마지막 장도 사실 마음에 안 들지만 이게 내 글씨니까 그냥 보내기로 했다.\n편지 봉투에 우표를 붙이는 게 이렇게 설레는 일이었나.",
    imageUrl: "https://picsum.photos/seed/memo-84/800/600",
    createdAt: "2026-10-19T19:04:00",
  },
  {
    id: 83,
    userId: 3,
    title: "단풍 구경",
    content:
      "주말에 단풍 구경을 다녀왔다.\n산 입구부터 사람이 정말 많아서 등산로가 거의 출근길 지하철 같았다. 그래도 중턱쯤 올라가니 숨통이 트였다.\n빨강, 주황, 노랑이 층층이 섞여 있는 게 꼭 누가 일부러 칠해 놓은 것 같았다. 사진을 백 장쯤 찍었는데 실제 색이 하나도 안 담겼다.\n내려오는 길에 먹은 도토리묵이 오늘의 마무리.",
    imageUrl: "https://picsum.photos/seed/memo-83/800/600",
    createdAt: "2026-10-18T22:16:00",
  },
  {
    id: 82,
    userId: 4,
    title: "가을 하늘",
    content:
      "하늘이 유난히 높고 파랬다.\n점심시간에 일부러 회사 밖으로 나가서 한 바퀴 걸었다. 바람도 딱 좋았다.",
    imageUrl: "https://picsum.photos/seed/memo-82/800/600",
    createdAt: "2026-10-17T20:32:00",
  },
  {
    id: 81,
    userId: 5,
    title: "10km 완주",
    content:
      '10km 대회 완주!\n목표였던 한 시간 안에 들어왔다. 공식 기록은 58분 42초.\n5km까지는 생각보다 몸이 가벼워서 페이스를 너무 올렸다. 그게 실수였다. 7km부터 숨이 차기 시작했고, 마지막 1km는 정말 다리가 내 다리가 아닌 것 같았다.\n결승선 앞에서 누가 "다 왔어요!" 하고 소리쳐 줬는데 그 말에 마지막 힘이 났다. 모르는 사람인데 너무 고마웠다.\n메달은 생각보다 무거웠고, 다음 목표는 하프 마라톤이다. 아마도.',
    imageUrl: "https://picsum.photos/seed/memo-81/800/600",
    createdAt: "2026-10-16T11:11:00",
  },
  {
    id: 80,
    userId: 1,
    title: "새 운동화",
    content:
      "러닝화를 새로 샀다.\n이전 신발은 2년 넘게 신어서 밑창이 다 닳아 있었다. 매장에서 발 모양을 재 주셨는데 내 발이 생각보다 넓다는 걸 처음 알았다.\n쿠션이 좋은 걸로 골랐더니 뛸 때 무릎이 덜 아프다. 신발 하나 바꿨을 뿐인데 기록도 30초 줄었다. 장비빨이 이런 거구나.",
    imageUrl: "https://picsum.photos/seed/memo-80/800/600",
    createdAt: "2026-10-15T07:02:00",
  },
  {
    id: 79,
    userId: 2,
    title: "고양이 낮잠",
    content:
      "오후에 햇빛 드는 창가에서 고양이가 자고 있었다.\n배를 드러내고 네 발을 쭉 뻗은 채로. 숨 쉴 때마다 배가 오르락내리락했다.\n그 모습을 보고 있으니 나도 졸려서 옆에 누웠다. 눈 떠 보니 두 시간이 지나 있었고 고양이는 이미 사라진 뒤였다. 휴일은 이렇게 쓰는 거다.",
    imageUrl: "https://picsum.photos/seed/memo-79/800/600",
    createdAt: "2026-10-14T04:14:00",
  },
  {
    id: 78,
    userId: 3,
    title: "치과 다녀옴",
    content:
      "6개월 만에 치과에 가서 스케일링을 받았다.\n의사 선생님이 잇몸이 조금 부어 있다면서 치실을 꼭 쓰라고 하셨다. 지난번에도 똑같은 말을 들었다.\n이번엔 진짜 쓸 거다. 그래서 치실을 칫솔 바로 옆에 꽂아 두었다. 눈에 보여야 쓴다.",
    imageUrl: "https://picsum.photos/seed/memo-78/800/600",
    createdAt: "2026-10-12T22:08:00",
  },
  {
    id: 77,
    userId: 4,
    title: "시험 끝",
    content:
      "드디어 시험이 끝났다.\n마지막 과목은 서술형이 생각보다 많아서 손목이 아팠다. 아는 건 다 쓴 것 같은데 결과는 정말 모르겠다.\n시험장을 나오는데 하늘이 너무 맑아서 그냥 웃음이 났다. 지난 두 달 동안 미뤄 둔 것들이 한꺼번에 떠올랐다. 보고 싶었던 드라마, 만나고 싶었던 친구, 정리 안 된 방.\n그래도 오늘은 아무것도 안 하고 푹 잘 거다.",
    imageUrl: "https://picsum.photos/seed/memo-77/800/600",
    createdAt: "2026-10-11T23:44:00",
  },
  {
    id: 76,
    userId: 5,
    title: "자격증 공부",
    content:
      "자격증 시험까지 딱 3주 남았다.\n남은 범위를 세어 보니 열두 챕터. 하루 두 챕터씩 보면 6일, 나머지 2주는 기출 문제를 돌리면 딱 맞다.\n계획은 늘 완벽하다. 문제는 실행이다. 그래서 오늘부터는 공부 끝나면 여기에 한 줄씩 남기기로 했다. 쓰는 사람이 나 혼자가 아니니까 괜히 더 지키게 될 것 같다.",
    imageUrl: "https://picsum.photos/seed/memo-76/800/600",
    createdAt: "2026-10-11T00:22:00",
  },
  {
    id: 75,
    userId: 1,
    title: "집들이",
    content:
      "친구가 이사해서 집들이에 다녀왔다.\n뭘 사 갈지 고민하다가 결국 휴지랑 세제를 샀다. 너무 뻔한가 싶었는데 친구가 진짜로 제일 필요했던 거라고 해서 다행이었다.\n새 집은 작지만 남향이라 햇빛이 잘 들었다. 창가에 작은 화분을 줄지어 놓아서 그런지 집 전체가 아늑했다.\n다 같이 배달 음식을 시켜 먹으면서 각자의 첫 자취방 이야기를 했다. 곰팡이, 옆집 소음, 겨울에 터진 수도관. 그때는 힘들었던 게 이제는 다 웃긴 얘기가 됐다.",
    imageUrl: "https://picsum.photos/seed/memo-75/800/600",
    createdAt: "2026-10-09T16:44:00",
  },
  {
    id: 74,
    userId: 2,
    title: "동네 축제",
    content:
      "동네 공원에서 작은 가을 축제가 열렸다.\n플리마켓이랑 버스킹 무대, 푸드트럭 몇 대가 전부였는데 생각보다 사람이 많았다. 솜사탕을 얼굴만 하게 들고 다니는 아이들이 특히 많았다.\n나는 수제 키링을 하나 샀다. 작은 나무 고양이 모양. 만드신 분이 키우는 고양이를 보고 깎았다고 했다.\n집에 오는 길에 들은 버스킹 노래가 아직도 귀에 맴돈다.",
    imageUrl: "https://picsum.photos/seed/memo-74/800/600",
    createdAt: "2026-10-08T11:53:00",
  },
  {
    id: 73,
    userId: 3,
    title: "Next.js 메모",
    content:
      "Next.js 앱 라우터 정리.\napp 폴더 안에 폴더를 만들면 그게 곧 주소가 되고, 그 안의 page.tsx가 실제 화면이 된다. app/memos/page.tsx는 /memos, app/memos/[id]/page.tsx는 /memos/1 같은 주소.\n공통으로 감싸는 틀은 layout.tsx에 둔다. 헤더처럼 모든 페이지에 나오는 건 최상위 layout에, 로그인한 사람만 보는 페이지는 (protected) 같은 괄호 폴더로 묶어서 따로 layout을 준다. 괄호 폴더는 주소에 안 나온다는 게 신기했다.\n그리고 중요한 것. 버전마다 바뀌는 게 많아서 예전 블로그 글을 그대로 따라 하면 안 된다. 공식 문서부터 볼 것.",
    imageUrl: "https://picsum.photos/seed/memo-73/800/600",
    createdAt: "2026-10-07T14:07:00",
  },
  {
    id: 72,
    userId: 4,
    title: "복귀 첫날",
    content:
      "일주일 휴가 끝나고 복귀 첫날.\n메일이 200통 쌓여 있었다. 다 읽으려다가 포기하고 제목만 훑어서 급한 것부터 표시했다. 진짜 급한 건 다섯 통이었다. 나머지 195통은 아마 내가 없어도 잘 굴러갔다는 뜻이겠지.\n오늘은 정리만 해도 성공이라고 생각하기로 했다.",
    imageUrl: "https://picsum.photos/seed/memo-72/800/600",
    createdAt: "2026-10-06T03:33:00",
  },
  {
    id: 71,
    userId: 5,
    title: "휴가 마지막 날",
    content:
      "휴가 마지막 날.\n돌아가기 싫어서 공항 가는 길에 일부러 천천히 걸었다. 숙소 근처 바다를 마지막으로 한 번 더 보고, 처음 온 날 갔던 국숫집에 다시 들렀다. 사장님이 나를 기억하셔서 괜히 뭉클했다.\n이번 여행에서 제일 좋았던 건 계획이 없었다는 거다. 아침에 일어나서 그날 하고 싶은 걸 했다. 그게 이렇게 편한 일인 줄 몰랐다.\n다음엔 더 길게 오자. 적어도 이 국숫집이 문 닫기 전에.",
    imageUrl: "https://picsum.photos/seed/memo-71/800/600",
    createdAt: "2026-10-05T03:34:00",
  },
  {
    id: 70,
    userId: 1,
    title: "귤 따기 체험",
    content: "귤밭에서 직접 귤을 땄다.\n따자마자 먹은 귤이 제일 달았다.",
    imageUrl: "https://picsum.photos/seed/memo-70/800/600",
    createdAt: "2026-10-03T19:29:00",
  },
  {
    id: 69,
    userId: 2,
    title: "제주 바다",
    content:
      "에메랄드색 바다를 보며 한참 앉아 있었다.\n사진보다 실제가 훨씬 예뻤다.",
    imageUrl: "https://picsum.photos/seed/memo-69/800/600",
    createdAt: "2026-10-02T06:11:00",
  },
  {
    id: 68,
    userId: 3,
    title: "휴가 첫날",
    content:
      "알람 없이 일어났다.\n늦은 아침을 먹고 아무 계획 없이 동네를 걸었다.",
    imageUrl: "https://picsum.photos/seed/memo-68/800/600",
    createdAt: "2026-09-30T13:32:00",
  },
  {
    id: 67,
    userId: 4,
    title: "반려 식물 근황",
    content:
      "몬스테라에 새 잎이 났다.\n처음엔 돌돌 말려 있다가 하루 만에 펴졌다.",
    imageUrl: "https://picsum.photos/seed/memo-67/800/600",
    createdAt: "2026-09-29T05:56:00",
  },
  {
    id: 66,
    userId: 5,
    title: "독서 모임",
    content:
      "이번 달 책은 단편 소설집이었다.\n같은 이야기를 읽고도 다들 다르게 느낀 게 재밌었다.",
    imageUrl: "https://picsum.photos/seed/memo-66/800/600",
    createdAt: "2026-09-28T03:11:00",
  },
  {
    id: 65,
    userId: 1,
    title: "공원 벤치",
    content:
      "점심 먹고 공원 벤치에 앉아 있었다.\n비둘기가 자꾸 가까이 와서 결국 자리를 옮겼다.",
    imageUrl: "https://picsum.photos/seed/memo-65/800/600",
    createdAt: "2026-09-27T05:09:00",
  },
  {
    id: 64,
    userId: 2,
    title: "노트북 정리",
    content:
      "바탕화면 파일을 폴더별로 정리했다.\n다운로드 폴더에 3년 치가 쌓여 있었다.",
    imageUrl: "https://picsum.photos/seed/memo-64/800/600",
    createdAt: "2026-09-26T01:20:00",
  },
  {
    id: 63,
    userId: 3,
    title: "우중 캠핑",
    content:
      "밤새 비가 와서 텐트 안에서만 있었다.\n빗소리 들으며 끓인 라면이 기억에 남는다.",
    imageUrl: "https://picsum.photos/seed/memo-63/800/600",
    createdAt: "2026-09-24T20:15:00",
  },
  {
    id: 62,
    userId: 4,
    title: "안경 맞춤",
    content:
      "시력이 조금 더 나빠졌다.\n이번엔 가벼운 테로 골랐더니 훨씬 편하다.",
    imageUrl: "https://picsum.photos/seed/memo-62/800/600",
    createdAt: "2026-09-23T16:20:00",
  },
  {
    id: 61,
    userId: 5,
    title: "새벽 공부",
    content:
      "새벽 6시에 일어나서 한 시간 공부했다.\n조용해서 집중이 잘 된다. 습관으로 만들자.",
    imageUrl: "https://picsum.photos/seed/memo-61/800/600",
    createdAt: "2026-09-22T16:56:00",
  },
  {
    id: 60,
    userId: 1,
    title: "한강 피크닉",
    content: "돗자리 펴고 치킨을 시켜 먹었다.\n해 질 무렵 바람이 정말 좋았다.",
    imageUrl: "https://picsum.photos/seed/memo-60/800/600",
    createdAt: "2026-09-21T12:27:00",
  },
  {
    id: 59,
    userId: 2,
    title: "단골 분식집",
    content:
      "떡볶이 1인분에 순대 반 접시.\n사장님이 오늘은 어묵 국물을 더 주셨다.",
    imageUrl: "https://picsum.photos/seed/memo-59/800/600",
    createdAt: "2026-09-19T19:34:00",
  },
  {
    id: 58,
    userId: 3,
    title: "코드 리뷰",
    content:
      "리뷰에서 함수가 너무 길다는 이야기를 들었다.\n역할별로 나누니 확실히 읽기 쉬워졌다.",
    imageUrl: "https://picsum.photos/seed/memo-58/800/600",
    createdAt: "2026-09-18T12:24:00",
  },
  {
    id: 57,
    userId: 4,
    title: "조카랑 놀이공원",
    content:
      "조카가 회전목마만 다섯 번 탔다.\n나는 옆에서 사진만 백 장 찍었다.",
    imageUrl: "https://picsum.photos/seed/memo-57/800/600",
    createdAt: "2026-09-17T05:02:00",
  },
  {
    id: 56,
    userId: 5,
    title: "라면 레시피",
    content:
      "물 500ml, 면 넣고 3분.\n마지막에 계란 하나랑 치즈 한 장. 이게 정답이다.",
    imageUrl: "https://picsum.photos/seed/memo-56/800/600",
    createdAt: "2026-09-16T02:20:00",
  },
  {
    id: 55,
    userId: 1,
    title: "책 한 구절",
    content:
      "천천히 가도 멈추지만 않으면 된다.\n오늘 읽은 책에서 마음에 남은 문장.",
    imageUrl: "https://picsum.photos/seed/memo-55/800/600",
    createdAt: "2026-09-14T21:36:00",
  },
  {
    id: 54,
    userId: 2,
    title: "필라테스 체험",
    content:
      "하루 체험 수업을 들었다.\n안 쓰던 근육을 써서 다음 날 계단 내려가기가 힘들었다.",
    imageUrl: "https://picsum.photos/seed/memo-54/800/600",
    createdAt: "2026-09-13T05:32:00",
  },
  {
    id: 53,
    userId: 3,
    title: "야경 드라이브",
    content:
      "친구 차를 타고 남산 쪽을 한 바퀴 돌았다.\n도시 불빛이 생각보다 훨씬 예뻤다.",
    imageUrl: "https://picsum.photos/seed/memo-53/800/600",
    createdAt: "2026-09-11T13:52:00",
  },
  {
    id: 52,
    userId: 4,
    title: "면접 후기",
    content:
      "긴장해서 준비한 말을 반도 못 했다.\n그래도 끝까지 웃으면서 대답한 건 잘했다.",
    imageUrl: "https://picsum.photos/seed/memo-52/800/600",
    createdAt: "2026-09-10T12:18:00",
  },
  {
    id: 51,
    userId: 5,
    title: "꽃시장",
    content:
      "새벽 꽃시장에 다녀왔다.\n튤립 한 단을 사서 식탁 위에 꽂아 두었다.",
    imageUrl: "https://picsum.photos/seed/memo-51/800/600",
    createdAt: "2026-09-09T09:08:00",
  },
  {
    id: 50,
    userId: 1,
    title: "첫 월급",
    content:
      "첫 월급으로 부모님께 내복을 사 드렸다.\n옛날 얘기 같지만 해 보고 싶었다.",
    imageUrl: "https://picsum.photos/seed/memo-50/800/600",
    createdAt: "2026-09-07T22:44:00",
  },
  {
    id: 49,
    userId: 2,
    title: "가을 옷 정리",
    content:
      "여름 옷을 넣고 가을 옷을 꺼냈다.\n작년에 산 니트가 아직 새것 같다.",
    imageUrl: "https://picsum.photos/seed/memo-49/800/600",
    createdAt: "2026-09-06T17:45:00",
  },
  {
    id: 48,
    userId: 3,
    title: "버그 잡은 날",
    content:
      "하루 종일 안 되던 게 오타 하나 때문이었다.\n허무하지만 그래도 해결해서 기쁘다.",
    imageUrl: "https://picsum.photos/seed/memo-48/800/600",
    createdAt: "2026-09-05T01:01:00",
  },
  {
    id: 47,
    userId: 4,
    title: "기차 여행",
    content:
      "창밖으로 논이 끝없이 펼쳐졌다.\n도시락을 까먹으면서 멍하니 풍경을 봤다.",
    imageUrl: "https://picsum.photos/seed/memo-47/800/600",
    createdAt: "2026-09-03T11:47:00",
  },
  {
    id: 46,
    userId: 5,
    title: "팀 회식",
    content:
      "오랜만에 팀 회식을 했다.\n고기 굽는 담당은 역시 막내가 아니라 팀장님이었다.",
    imageUrl: "https://picsum.photos/seed/memo-46/800/600",
    createdAt: "2026-09-02T04:54:00",
  },
  {
    id: 45,
    userId: 1,
    title: "마라톤 신청",
    content:
      "10km 마라톤을 신청했다.\n대회까지 두 달. 일주일에 세 번은 뛰기로.",
    imageUrl: "https://picsum.photos/seed/memo-45/800/600",
    createdAt: "2026-09-01T07:40:00",
  },
  {
    id: 44,
    userId: 2,
    title: "커피 원두",
    content: "에티오피아 원두를 새로 샀다.\n과일 향이 나서 아침에 마시기 좋다.",
    imageUrl: "https://picsum.photos/seed/memo-44/800/600",
    createdAt: "2026-08-31T09:49:00",
  },
  {
    id: 43,
    userId: 3,
    title: "할머니 댁",
    content:
      "시골 할머니 댁에 다녀왔다.\n마당에 핀 꽃이랑 강아지가 그대로라 반가웠다.",
    imageUrl: "https://picsum.photos/seed/memo-43/800/600",
    createdAt: "2026-08-30T03:24:00",
  },
  {
    id: 42,
    userId: 4,
    title: "새로 배운 단축키",
    content:
      "Cmd+D로 같은 단어를 여러 개 선택할 수 있다.\n이걸 왜 이제 알았을까.",
    imageUrl: "https://picsum.photos/seed/memo-42/800/600",
    createdAt: "2026-08-28T23:20:00",
  },
  {
    id: 41,
    userId: 5,
    title: "이사 준비",
    content:
      "다음 달에 이사를 간다.\n박스를 미리 모아 두고 버릴 물건부터 정리하기.",
    imageUrl: "https://picsum.photos/seed/memo-41/800/600",
    createdAt: "2026-08-27T20:22:00",
  },
  {
    id: 40,
    userId: 1,
    title: "비 오는 주말",
    content:
      "밖에 나가지 않고 하루 종일 집에 있었다.\n빗소리 들으면서 낮잠 잔 게 최고였다.",
    imageUrl: "https://picsum.photos/seed/memo-40/800/600",
    createdAt: "2026-08-26T05:26:00",
  },
  {
    id: 39,
    userId: 2,
    title: "수영 시작",
    content: "아침 수영 강습을 등록했다.\n첫날이라 물만 엄청 먹고 왔다.",
    imageUrl: "https://picsum.photos/seed/memo-39/800/600",
    createdAt: "2026-08-24T23:13:00",
  },
  {
    id: 38,
    userId: 3,
    title: "동생 졸업식",
    content:
      "꽃다발을 들고 동생 졸업식에 갔다.\n벌써 이렇게 컸다니 믿기지 않는다.",
    imageUrl: "https://picsum.photos/seed/memo-38/800/600",
    createdAt: "2026-08-23T06:42:00",
  },
  {
    id: 37,
    userId: 4,
    title: "CSS 메모",
    content:
      "flex에서 가운데 정렬은 justify-content와 align-items.\n매번 검색하지 말고 외우자.",
    imageUrl: "https://picsum.photos/seed/memo-37/800/600",
    createdAt: "2026-08-21T21:46:00",
  },
  {
    id: 36,
    userId: 5,
    title: "다이어리 꾸미기",
    content: "스티커를 잔뜩 샀다.\n쓰는 것보다 꾸미는 시간이 더 긴 건 비밀.",
    imageUrl: "https://picsum.photos/seed/memo-36/800/600",
    createdAt: "2026-08-20T05:17:00",
  },
  {
    id: 35,
    userId: 1,
    title: "전시회 관람",
    content: "사진전에 다녀왔다.\n흑백 사진인데도 색이 느껴지는 작품이 많았다.",
    imageUrl: "https://picsum.photos/seed/memo-35/800/600",
    createdAt: "2026-08-19T05:01:00",
  },
  {
    id: 34,
    userId: 2,
    title: "등산 기록",
    content:
      "왕복 네 시간. 정상에서 먹은 김밥이 제일 맛있었다.\n다음엔 조금 더 높은 산에 가 보자.",
    imageUrl: "https://picsum.photos/seed/memo-34/800/600",
    createdAt: "2026-08-18T04:46:00",
  },
  {
    id: 33,
    userId: 3,
    title: "잠이 안 오는 밤",
    content:
      "커피를 늦게 마신 탓인지 잠이 안 온다.\n내일부턴 오후엔 디카페인으로 바꿔야지.",
    imageUrl: "https://picsum.photos/seed/memo-33/800/600",
    createdAt: "2026-08-16T15:12:00",
  },
  {
    id: 32,
    userId: 4,
    title: "새 프로젝트 시작",
    content:
      "메모 앱을 만들어 보기로 했다.\n일단 목록 화면부터. 욕심내지 말고 하나씩.",
    imageUrl: "https://picsum.photos/seed/memo-32/800/600",
    createdAt: "2026-08-15T10:25:00",
  },
  {
    id: 31,
    userId: 5,
    title: "퇴근길 노을",
    content:
      "지하철에서 내렸는데 하늘이 온통 분홍색이었다.\n잠깐 멈춰서 사진을 찍었다.",
    imageUrl: "https://picsum.photos/seed/memo-31/800/600",
    createdAt: "2026-08-13T19:58:00",
  },
  {
    id: 30,
    userId: 1,
    title: "일요일 브런치",
    content:
      "팬케이크와 스크램블 에그를 만들었다.\n주말 아침엔 천천히 먹는 게 좋다.",
    imageUrl: "https://picsum.photos/seed/memo-30/800/600",
    createdAt: "2026-08-12T05:33:00",
  },
  {
    id: 29,
    userId: 2,
    title: "깃 브랜치 정리",
    content:
      "작업은 기능별 브랜치에서 하고 머지 후엔 지우기.\n이름은 feature/ 로 시작하기.",
    imageUrl: "https://picsum.photos/seed/memo-29/800/600",
    createdAt: "2026-08-10T22:19:00",
  },
  {
    id: 28,
    userId: 3,
    title: "여름 휴가 계획",
    content:
      "8월 둘째 주로 휴가를 냈다.\n제주도로 갈지 강릉으로 갈지 아직 고민 중이다.",
    imageUrl: "https://picsum.photos/seed/memo-28/800/600",
    createdAt: "2026-08-09T21:47:00",
  },
  {
    id: 27,
    userId: 4,
    title: "도서관 가는 날",
    content:
      "주말 오전엔 도서관이 제일 조용하다.\n창가 자리에 앉아서 세 시간 동안 책만 읽었다.",
    imageUrl: "https://picsum.photos/seed/memo-27/800/600",
    createdAt: "2026-08-08T10:42:00",
  },
  {
    id: 26,
    userId: 5,
    title: "요리 도전",
    content:
      "처음으로 된장찌개를 끓였다.\n간이 조금 셌지만 밥이랑 먹으니 괜찮았다.",
    imageUrl: "https://picsum.photos/seed/memo-26/800/600",
    createdAt: "2026-08-07T12:47:00",
  },
  {
    id: 25,
    userId: 1,
    title: "친구 결혼식",
    content:
      "대학 동기의 결혼식에 다녀왔다.\n오랜만에 다 같이 모여서 사진을 엄청 찍었다.",
    imageUrl: "https://picsum.photos/seed/memo-25/800/600",
    createdAt: "2026-08-06T13:38:00",
  },
  {
    id: 24,
    userId: 2,
    title: "새 키보드",
    content:
      "갈축 키보드를 샀다. 타건감이 좋아서 괜히 뭐라도 치고 싶다.\n소리는 생각보다 조용하다.",
    imageUrl: "https://picsum.photos/seed/memo-24/800/600",
    createdAt: "2026-08-04T21:28:00",
  },
  {
    id: 23,
    userId: 3,
    title: "방 정리",
    content:
      "안 입는 옷을 두 상자나 정리했다.\n기부함에 넣고 오니 마음도 가벼워졌다.",
    imageUrl: "https://picsum.photos/seed/memo-23/800/600",
    createdAt: "2026-08-03T11:50:00",
  },
  {
    id: 22,
    userId: 4,
    title: "바다 보러 간 날",
    content:
      "갑자기 바다가 보고 싶어서 기차를 탔다.\n파도 소리를 한참 듣다가 돌아왔다.",
    imageUrl: "https://picsum.photos/seed/memo-22/800/600",
    createdAt: "2026-08-02T13:26:00",
  },
  {
    id: 21,
    userId: 5,
    title: "타입스크립트 메모",
    content:
      "type과 interface는 거의 비슷하다.\n우리 팀은 type으로 통일하기로 했다.",
    imageUrl: "https://picsum.photos/seed/memo-21/800/600",
    createdAt: "2026-08-01T04:48:00",
  },
  {
    id: 20,
    userId: 1,
    title: "자전거 수리",
    content:
      "뒷바퀴 바람이 계속 빠져서 가게에 맡겼다.\n튜브를 갈았더니 훨씬 가볍게 나간다.",
    imageUrl: "https://picsum.photos/seed/memo-20/800/600",
    createdAt: "2026-07-30T18:15:00",
  },
  {
    id: 19,
    userId: 2,
    title: "영화 한 편",
    content:
      "오래된 영화를 다시 봤다.\n처음 봤을 땐 몰랐던 장면들이 이번엔 눈에 들어왔다.",
    imageUrl: "https://picsum.photos/seed/memo-19/800/600",
    createdAt: "2026-07-29T13:40:00",
  },
  {
    id: 18,
    userId: 3,
    title: "오늘의 점심",
    content:
      "회사 앞 국밥집. 비 오는 날엔 역시 국물이다.\n깍두기를 두 번이나 리필했다.",
    imageUrl: "https://picsum.photos/seed/memo-18/800/600",
    createdAt: "2026-07-28T16:57:00",
  },
  {
    id: 17,
    userId: 4,
    title: "고양이 병원",
    content:
      "정기 검진 다녀왔다. 몸무게가 조금 늘었다고 한다.\n간식을 줄여야겠다. 미안하다.",
    imageUrl: "https://picsum.photos/seed/memo-17/800/600",
    createdAt: "2026-07-27T17:14:00",
  },
  {
    id: 16,
    userId: 5,
    title: "첫 캠핑",
    content:
      "텐트 치는 데만 한 시간 걸렸다.\n그래도 밤에 본 별이 너무 많아서 다 잊었다.",
    imageUrl: "https://picsum.photos/seed/memo-16/800/600",
    createdAt: "2026-07-26T03:26:00",
  },
  {
    id: 15,
    userId: 1,
    title: "회의 정리",
    content:
      "다음 주까지 로그인 화면 시안 확정.\nAPI 문서는 금요일까지 공유받기로 함.",
    imageUrl: "https://picsum.photos/seed/memo-15/800/600",
    createdAt: "2026-07-24T22:37:00",
  },
  {
    id: 14,
    userId: 2,
    title: "밤 산책",
    content:
      "저녁 먹고 강변을 따라 걸었다.\n바람이 선선해서 이어폰도 빼고 그냥 걸었다.",
    imageUrl: "https://picsum.photos/seed/memo-14/800/600",
    createdAt: "2026-07-23T06:16:00",
  },
  {
    id: 13,
    userId: 3,
    title: "엄마 생신 준비",
    content:
      "케이크는 집 앞 가게에 예약했다.\n선물은 따뜻한 목도리로 정했다. 포장도 예쁘게 하기.",
    imageUrl: "https://picsum.photos/seed/memo-13/800/600",
    createdAt: "2026-07-22T06:58:00",
  },
  {
    id: 12,
    userId: 4,
    title: "운동 3일 차",
    content:
      "스쿼트 50개, 플랭크 1분.\n아직은 힘들지만 어제보다는 조금 덜 힘들었다.",
    imageUrl: "https://picsum.photos/seed/memo-12/800/600",
    createdAt: "2026-07-20T21:48:00",
  },
  {
    id: 11,
    userId: 5,
    title: "동네 빵집 발견",
    content:
      "골목 안쪽에 작은 빵집이 생겼다.\n소금빵이 정말 맛있어서 내일 또 갈 것 같다.",
    imageUrl: "https://picsum.photos/seed/memo-11/800/600",
    createdAt: "2026-07-19T11:48:00",
  },
  {
    id: 10,
    userId: 1,
    title: "리액트 공부 메모",
    content:
      "useEffect는 렌더링 후에 실행된다.\n의존성 배열을 비우면 처음 한 번만 돈다. 헷갈리지 말자.",
    imageUrl: "https://picsum.photos/seed/memo-10/800/600",
    createdAt: "2026-07-18T07:16:00",
  },
  {
    id: 9,
    userId: 2,
    title: "새로 산 화분",
    content:
      "몬스테라를 하나 들였다.\n물은 일주일에 한 번, 햇빛은 너무 세지 않게 두라고 했다.",
    imageUrl: "https://picsum.photos/seed/memo-9/800/600",
    createdAt: "2026-07-17T05:44:00",
  },
  {
    id: 8,
    userId: 3,
    title: "비 오는 출근길",
    content:
      "우산을 챙겼는데도 신발이 다 젖었다.\n내일은 장화를 신고 나가야겠다.",
    imageUrl: "https://picsum.photos/seed/memo-8/800/600",
    createdAt: "2026-07-16T05:49:00",
  },
  {
    id: 7,
    userId: 4,
    title: "장보기 목록",
    content:
      "우유, 계란, 두부, 대파, 사과.\n지난번에 대파를 또 빼먹어서 이번엔 맨 위에 적어 둔다.",
    imageUrl: "https://picsum.photos/seed/memo-7/800/600",
    createdAt: "2026-07-14T13:30:00",
  },
  {
    id: 6,
    userId: 5,
    title: "구름 위의 일출",
    content:
      "새벽에 일어나 산장 앞에서 해 뜨는 걸 기다렸다.\n발아래로 구름이 바다처럼 깔려 있었다.",
    imageUrl: "https://picsum.photos/seed/memo-6/800/600",
    createdAt: "2026-07-12T20:58:00",
  },
  {
    id: 5,
    userId: 1,
    title: "호수에서 보낸 오후",
    content:
      "물빛이 이렇게 맑은 호수는 처음 봤다.\n작은 배를 빌려 천천히 한 바퀴 돌았다.",
    imageUrl: "https://picsum.photos/seed/memo-5/800/600",
    createdAt: "2026-07-11T05:46:00",
  },
  {
    id: 4,
    userId: 2,
    title: "숲길 산책",
    content:
      "집 근처 숲길을 한 시간 정도 걸었다.\n나무 사이로 들어오는 햇빛이 좋아서 생각보다 오래 머물렀다.",
    imageUrl: "https://picsum.photos/seed/memo-4/800/600",
    createdAt: "2026-07-10T05:23:00",
  },
  {
    id: 3,
    userId: 3,
    title: "주말 카페 모임",
    content:
      "오랜만에 친구들과 카페에서 만났다.\n라테 아트가 예뻐서 마시기 전에 다 같이 사진부터 찍었다.",
    imageUrl: "https://picsum.photos/seed/memo-3/800/600",
    createdAt: "2026-07-09T03:49:00",
  },
  {
    id: 2,
    userId: 4,
    title: "이번 달 읽을 책",
    content:
      "책상 위에 쌓아 둔 책이 벌써 여섯 권이다.\n한 주에 한 권씩, 출퇴근길에 조금씩 읽어 보기로 했다.",
    imageUrl: "https://picsum.photos/seed/memo-2/800/600",
    createdAt: "2026-07-07T14:51:00",
  },
  {
    id: 1,
    userId: 5,
    title: "아침 작업 루틴",
    content:
      "출근 전에 커피 한 잔 내려 놓고 오늘 할 일 세 가지만 적었다.\n많이 적으면 결국 다 못 하더라. 세 개면 충분하다.",
    imageUrl: "https://picsum.photos/seed/memo-1/800/600",
    createdAt: "2026-07-06T18:13:00",
  },
];
