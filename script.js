/* =========================================================
   AI 통합 대시보드 — script.js
   ========================================================= */

const CATEGORIES = [
  { id: "avatar",   icon: "🧑‍💼", name: "AI 아바타·버추얼 휴먼",      rec: "vidnoz" },
  { id: "workflow", icon: "⚙️",  name: "워크플로 자동화",             rec: "n8n" },
  { id: "design",   icon: "🎨",  name: "웹·UI/UX 디자인",             rec: "stitch" },
  { id: "vibe",     icon: "💻",  name: "바이브 코딩",                 rec: "lovable" },
  { id: "llm",      icon: "✍️",  name: "LLM·글쓰기 및 전반적인 작업", rec: "chatgpt" },
  { id: "viz",      icon: "📊",  name: "시각화·프레젠테이션",         rec: "gamma" },
];

/* 추천 시작점 설명 (대시보드 요약 표) */
const REC_DESC = {
  vidnoz: "초보자용 아바타 영상 제작",
  n8n: "노드 연결형 반복 업무 자동화",
  stitch: "무료 디자인 시안 탐색",
  lovable: "자연어로 웹앱 만들기",
  chatgpt: "범용 글쓰기·요약·업무 보조",
  gamma: "발표자료의 구조와 디자인 빠르게 생성",
};

/* domain: 로고(파비콘)를 가져올 도메인 / short: 행에 보이는 요약 요금 */
const SERVICES = [
  // ── AI 아바타·버추얼 휴먼
  { id: "vidnoz", cat: "avatar", name: "Vidnoz AI", domain: "vidnoz.com", short: "Starter $19.99~", free: true,
    intro: "대본과 아바타를 선택해 발표·홍보 영상을 만들고, 사진이나 일러스트에 말을 입힐 수 있는 AI 영상 도구.",
    how: "Create Video 또는 Avatars → 아바타 선택/사진 업로드 → 대본·언어·음성 설정 → 미리보기 → Generate → 다운로드 또는 공유.",
    pro: "사용법이 비교적 쉽고 튜토리얼이 있어 처음 아바타 영상을 만드는 사람에게 접근성이 좋다는 체험 기록이 있습니다.",
    con: "무료 플랜은 크레딧·영상 길이·해상도 제한이 있습니다.",
    memo: "엑셀 기록에는 계정당 무료 30크레딧, 간단한 영상 생성에 2크레딧 소모라고 기재되어 있습니다. 실제 계정에 표시되는 크레딧과 현재 요금은 가입 후 확인하세요.",
    price: "엑셀 기록: Starter $19.99, Business $56.99. 가격·통화·결제 주기를 공식 페이지에서 재확인하세요.",
    links: [["Vidnoz AI", "https://www.vidnoz.com/"]] },
  { id: "deevid", cat: "avatar", name: "DeeVid AI", domain: "deevid.ai", short: "Lite $10~",
    intro: "텍스트·사진·영상으로 영상·이미지·아바타·음성·음악을 만들고 편집하는 올인원 콘텐츠 제작 서비스.",
    how: "텍스트 프롬프트 입력 또는 참고 미디어 업로드 → 영상 스타일·효과 설정 → Create.",
    pro: "여러 종류의 AI 콘텐츠 기능을 한 플랫폼에서 탐색할 수 있습니다.",
    con: "엑셀 작성자의 체험 기록에서는 생성 단계가 유료로 제한되어 무료 이용 범위가 좁았고, 완성 결과를 충분히 평가하지 못했습니다.",
    price: "엑셀 기록: Lite $10, Pro $25, Premium $119. 통화·결제 주기와 무료 크레딧은 공식 페이지에서 확인하세요.",
    links: [["DeeVid AI", "https://deevid.ai/ko/agent"]] },
  { id: "heygen", cat: "avatar", name: "HeyGen", domain: "heygen.com", short: "Creator 33,000원~", free: true,
    intro: "대본·사진 기반의 말하는 AI 아바타 영상을 만들고, 번역과 입 모양 동기화로 여러 언어 버전을 제작하는 플랫폼.",
    how: "아바타 선택 또는 사진 업로드 → 대본·음성·언어 설정 → 생성 → 발음·속도·입 모양 확인 → 장면·자막을 다듬어 내보내기.",
    pro: "촬영 장비 없이 발표·교육·제품 소개 영상을 만들기 쉽고, 준비된 아바타·음성을 활용해 초안을 빠르게 만들 수 있습니다.",
    con: "무료 생성량과 기능에 제한이 있습니다. 엑셀 작성자는 맞춤 아바타 제작을 위해 개인 사진·모션·음성을 올리는 과정이 번거롭고 생성 시간이 길었다고 기록했습니다.",
    price: "엑셀 기록: Creator 33,000원, Pro 60,967원. 결제 시점과 플랜에 따라 변동될 수 있으니 현재 요금 페이지를 확인하세요.",
    links: [["HeyGen", "https://app.heygen.com/onboarding"]] },

  // ── 워크플로 자동화
  { id: "n8n", cat: "workflow", name: "n8n", domain: "n8n.io", short: "체험 후 월 €20", free: true,
    intro: "노드를 연결해 앱과 데이터를 이어 주고 반복 업무를 자동 실행하는 워크플로 자동화 도구.",
    how: "트리거 설정 → 데이터 수집·정제 → AI 처리 → 데이터베이스나 앱에 결과 적재.",
    pro: "드래그 앤 드롭으로 데이터 흐름을 확인하기 쉽고, Gemini API 등 외부 서비스 연동과 클라우드 자동 실행을 지원합니다.",
    con: "엑셀 기록 기준 클라우드 버전은 14일 체험 후 유료이며, 계속 무료로 사용하려면 로컬 설치가 필요할 수 있습니다.",
    memo: "노드를 연결해 AI 요약을 Notion으로 보내는 흐름이 편리하고 다른 반복 업무에도 쓸 수 있을 것 같았다는 기록입니다.",
    price: "엑셀 기록: 클라우드 14일 무료 체험 후 월 €20.",
    links: [["n8n", "https://n8n.io/"]] },
  { id: "dify", cat: "workflow", name: "Dify", domain: "dify.ai", short: "Pro $59~", free: true,
    intro: "문서를 기반으로 답하는 챗봇과 LLM 워크플로를 노코드로 구성해 웹/API로 배포하는 플랫폼.",
    how: "지식 메뉴에서 PDF·텍스트 업로드 → 스튜디오에서 챗봇 생성 → 문서를 컨텍스트에 연결 → 테스트 → 웹 링크 또는 임베드로 배포.",
    pro: "문서 분할과 검색 연결을 쉽게 구성하고 기본 챗봇 UI를 이용할 수 있습니다.",
    con: "순수 데이터 처리·외부 SaaS 연결은 n8n보다 제한적일 수 있으며, 본격 운영에는 개인 API 키 연결이 필요할 수 있습니다.",
    memo: "PDF를 업로드해 코딩 없이 전용 챗봇에 연결할 수 있어 진입장벽이 낮았다는 기록입니다.",
    price: "엑셀 기록: 무료 200회(메시지 크레딧), Professional $59, Team $159.",
    links: [["Dify", "https://dify.ai/ko"]] },

  // ── 웹/UI/UX 디자인
  { id: "figma", cat: "design", name: "Figma", domain: "figma.com", short: "Collab $5~", free: true,
    intro: "웹·앱 화면을 직접 디자인하고 팀과 실시간으로 협업하는 인터페이스 디자인 도구이며, Figma Make로 프롬프트 기반 화면 시안도 만들 수 있습니다.",
    how: "Figma Design에서 도형·텍스트·버튼 배치. 또는 Figma Make에 화면을 설명하는 프롬프트 입력 → 생성 결과를 확인하고 대화형으로 수정.",
    pro: "브라우저 기반 실시간 협업, 업계에서 널리 쓰이는 도구, 커뮤니티 자료가 풍부합니다.",
    con: "직접 세부 요소를 조정하려면 학습이 필요합니다. 디자인 시안은 그 자체로 완성된 웹사이트가 아니며, 무료 플랜과 AI 크레딧에 제한이 있을 수 있습니다.",
    memo: "초보자도 글꼴·색상·크기 같은 기본 수정은 가능하지만, 세밀한 편집은 공부가 필요하다는 기록입니다.",
    price: "엑셀 기록: Full $20, Dev $15, Collab $5.",
    links: [["Figma 요금 안내", "https://www.figma.com/ko-kr/pricing/"]] },
  { id: "v0", cat: "design", name: "v0", domain: "v0.app", short: "월 $5~", free: true,
    intro: "자연어 프롬프트로 웹사이트 UI와 코드를 만들고 Vercel에 배포할 수 있는 AI 개발 도구.",
    how: "프롬프트 입력 → 생성된 웹 화면 확인 → 디자인 모드나 대화로 수정 → 배포.",
    pro: "실제 코드 기반 결과물을 만들고 미리보기·배포까지 연결하기 쉽습니다.",
    con: "React 코드와 개발 개념이 낯선 초보자는 결과를 이해하기 어려울 수 있고, 무료 크레딧과 디자인 자유도에 한계가 있을 수 있습니다. 한글 UI도 충분하지 않을 수 있습니다.",
    memo: "ChatGPT 연동과 코드 자동 생성이 편리했다는 기록입니다.",
    price: "엑셀 기록: 기본 월 $5, Plus $30, Business $100(요금 단위와 현재 플랜은 공식 페이지 확인).",
    links: [["v0", "https://v0.app/"]] },
  { id: "stitch", cat: "design", name: "Google Stitch", domain: "stitch.withgoogle.com", short: "무료", free: true, allFree: true,
    intro: "프롬프트나 손그림을 바탕으로 웹 UI 시안을 빠르게 생성하고 Figma로 내보낼 수 있는 Google 디자인 도구.",
    how: "Google 계정으로 시작 → 프롬프트 또는 스케치 입력 → 제안된 시안 검토·수정 → 필요하면 Figma로 내보내기.",
    pro: "엑셀 기록 시점에는 무료였고 초보자가 화면 아이디어를 빠르게 시각화할 수 있었습니다.",
    con: "완성 사이트를 직접 배포하는 도구는 아니며, 실험 단계라 기능이 바뀔 수 있고 세밀한 조정이나 결과 다양성에 한계가 있을 수 있습니다.",
    memo: "초기 시안은 다듬을 필요가 있지만 초보자도 수정하기 쉬웠다는 기록입니다.",
    price: "엑셀 기록: 무료.",
    links: [["Google Stitch", "https://stitch.withgoogle.com/"]] },
  { id: "claude-design", cat: "design", name: "Claude Design", domain: "claude.ai", short: "Pro $22 포함",
    intro: "대화로 디자인 콘셉트와 프로토타입을 만들고, 디자인 선택 이유까지 설명하도록 돕는 Claude 기반 도구.",
    how: "Claude에 디자인할 제품·사용자·목표를 설명 → 초안을 검토 → 대화로 원하는 수정 요청.",
    pro: "대화형으로 디자인 방향을 잡고 제안 이유를 확인할 수 있습니다.",
    con: "엑셀 기록상 무료 사용은 불가하고 Claude 구독이 필요합니다. 사용량이 빠르게 줄거나 세부 편집·Figma 파일 전달이 제한될 수 있으며, 기록 당시 베타였습니다.",
    memo: "편리하지만 글자·색·크기·간격 같은 세밀한 수정을 충분히 하기 어려웠다는 기록입니다.",
    price: "엑셀 기록: Claude Pro $22에 포함.",
    links: [["Claude Design", "https://claude.com/ko/product/design"]] },

  // ── 바이브 코딩
  { id: "lovable", cat: "vibe", name: "Lovable", domain: "lovable.dev", short: "Pro $25~", free: true,
    intro: "자연어로 원하는 기능을 설명해 웹사이트와 웹앱을 만들고 대화로 수정하는 AI 개발 도구.",
    how: "가입 → 빌드 입력창에 기능·디자인 요청 → 생성 화면에서 기능 확인 → 같은 대화에서 추가 수정.",
    pro: "한국어 요청을 잘 반영하고 코드를 직접 작성하지 않아도 작동하는 페이지를 만들 수 있었다는 체험 기록입니다.",
    con: "체험 기록은 간단한 투두리스트에 한정되어 복잡한 기능 구현은 충분히 확인하지 못했습니다.",
    memo: "새로고침 후 완료 상태가 유지되고 우선순위 기능도 요청대로 반영됐다는 기록입니다.",
    price: "엑셀 기록(확인일 2026-10-07): Free $0/월, Pro $25부터, Business $50부터.",
    links: [["Lovable", "https://lovable.dev/"]] },
  { id: "cursor", cat: "vibe", name: "Cursor", domain: "cursor.com", short: "Pro $20~", free: true,
    intro: "자연어 대화로 코드와 파일을 생성·수정하는 AI 코드 편집기.",
    how: "PC에 설치하고 로그인 → 대화 입력창에 기능·디자인 요청 → 생성된 파일을 브라우저에서 확인 → 대화로 수정.",
    pro: "한국어 요청으로 실행 가능한 HTML 파일을 만들고 기능을 추가할 수 있었다는 기록입니다.",
    con: "생성 대기 시간이 길게 느껴질 수 있고, 초기 디자인이나 무료 사용량이 아쉬울 수 있습니다.",
    memo: "할 일 추가·완료·삭제·필터와 브라우저 저장이 작동했으나 우선순위 추가 단계에서 무료 사용량 한도에 도달했다는 기록입니다.",
    price: "엑셀 기록(확인일 2026-10-07): Hobby $0, Pro $20, Pro+ $60, Ultra $200, Teams Standard $40/인, Premium $120/인(월간 USD, 세금 별도).",
    links: [["Cursor", "https://cursor.com/"], ["요금 안내", "https://cursor.com/pricing"]] },
  { id: "bolt", cat: "vibe", name: "Bolt.new", domain: "bolt.new", short: "Pro $25~", free: true,
    intro: "자연어 대화로 웹사이트·웹앱을 생성하고 수정해 공개할 수 있는 AI 개발 도구.",
    how: "가입·로그인 → 기능과 디자인을 한국어로 요청 → 생성 결과 확인 및 대화로 수정 → Publish로 공개.",
    pro: "짧은 시간에 웹앱을 만들고 기본 기능과 브라우저 저장을 확인할 수 있었다는 체험 기록입니다.",
    con: "디자인이 평범하게 느껴질 수 있고, 공유 링크 반영이나 수정 후 업데이트를 위해 다시 Publish해야 해 번거로울 수 있습니다.",
    memo: "투두리스트와 우선순위 기능이 작동하고 새로고침 뒤에도 저장됐다는 기록입니다.",
    price: "엑셀 기록: Free $0, Pro $25부터, Teams $30/인부터.",
    links: [["Bolt.new", "https://bolt.new/"]] },

  // ── LLM·글쓰기
  { id: "chatgpt", cat: "llm", name: "ChatGPT", domain: "chatgpt.com", short: "Plus $20", free: true,
    intro: "자연어 대화로 글쓰기·수정·요약·분석과 다양한 업무를 돕는 범용 AI 서비스.",
    how: "목적·조건·원하는 출력 형식을 입력 → 결과를 검토 → 같은 대화에서 문체·분량·형식을 수정 요청.",
    pro: "엑셀 체험에서 업무 이메일의 날짜·사유·사과·양해를 반영했고, 후속 분량 축소 요청도 수행했습니다. 대화 맥락과 개인화 기능이 작업에 도움을 줄 수 있습니다.",
    con: "답변에 요청하지 않은 부가 안내가 붙을 수 있습니다. 저장된 메모리가 대화의 모든 세부 내용을 기억하는 것은 아니므로 중요한 조건은 확인해야 합니다.",
    memo: "이메일 작성과 150자 이내 수정이 만족스러웠다는 기록입니다.",
    price: "엑셀 기록(확인일 2026-10-07): Free $0, Go $8(미국 기준), Plus $20, Pro 티어 $100~$500/월. 국가·세금·결제 경로에 따라 달라질 수 있습니다.",
    links: [["ChatGPT", "https://chatgpt.com/"], ["요금 안내", "https://chatgpt.com/pricing"]] },
  { id: "claude", cat: "llm", name: "Claude", sub: "글쓰기", domain: "claude.ai", short: "Pro $20", free: true,
    intro: "대화로 글을 작성·편집하고 문서를 이해·분석하는 AI 서비스.",
    how: "목적·조건·결과 형식을 입력 → 초안을 확인 → 문체·분량·구조를 대화로 수정.",
    pro: "체험 기록에서 정중한 업무 이메일을 읽기 쉽게 구성했고 분량 수정 시 필수 내용을 유지했습니다. 문서 업로드·분석도 지원합니다.",
    con: "서명 안내나 글자 수 설명처럼 본문 외 정보가 덧붙을 수 있습니다. 해당 체험은 짧은 이메일 작성에 한정됐습니다.",
    memo: "짧은 업무 이메일 작성·수정 결과가 만족스러웠다는 기록입니다.",
    price: "엑셀 기록(확인일 2026-10-07): Free $0, Pro $20, Max 5x $100, Max 20x $200/월(USD, 세금 별도).",
    links: [["Claude", "https://claude.ai/"], ["요금 안내", "https://claude.com/pricing"]] },
  { id: "gemini", cat: "llm", name: "Gemini", domain: "gemini.google.com", short: "Pro $19.99", free: true,
    intro: "글쓰기·정보 정리와 Google 서비스 연계를 지원하는 AI 서비스.",
    how: "목적·조건·출력 형식을 입력 → 답변을 확인 → 필요하면 같은 대화에서 수정 요청.",
    pro: "체험에서 날짜와 사유를 유지하면서 업무 이메일을 간결하게 수정했고, Google 앱 연계 기능을 제공합니다.",
    con: "개인 체험에서는 의도를 충분히 반영하지 못한 경우가 있어 답변의 일관성이 아쉽다는 의견이 있었습니다. 경험은 작업과 프롬프트에 따라 달라질 수 있습니다.",
    memo: "이번 이메일 작성·수정은 잘 수행했으나 평소 사용에서는 일관성에 아쉬움이 있었다는 기록입니다.",
    price: "엑셀 기록(확인일 2026-10-07): Free, Google AI Plus $7.99, Pro $19.99, Ultra 20x $249.99/월(공식 USD 표시 기준; 지역 가격 확인 필요).",
    links: [["Gemini", "https://gemini.google.com/"], ["구독 안내", "https://gemini.google/as/subscriptions/"]] },

  // ── 시각화·프레젠테이션
  { id: "claude-viz", cat: "viz", name: "Claude", sub: "연구자료 분석·구조화", domain: "claude.ai", short: "Pro $20 · Max $110",
    intro: "논문·연구자료를 읽고 논리를 구조화해 차트와 시각화가 포함된 발표자료를 만드는 범용 AI 활용 방식.",
    how: "주제·대상·목적 입력 → 논문/PDF/데이터 첨부 또는 조사 범위 지정 → 발표 구조·핵심 메시지·차트 요청 → PPTX나 시각화 결과 검토.",
    pro: "복잡한 내용을 논리적으로 정리하고 분석부터 발표자료 초안까지 한 흐름에서 다루기 좋다는 기록입니다.",
    con: "전문 슬라이드 도구보다 시각적 완성도가 일정하지 않을 수 있습니다. 출처·수치의 원문 검증이 필요하고, 디자인 지시가 부족하면 보고서처럼 보일 수 있습니다.",
    memo: "영양 연구 프롬프트에서 핵심 관계와 “왜 중요한가”를 설명하는 데 유용했으나, 시각 디자인은 추가 지시가 필요할 수 있다는 기록입니다.",
    price: "엑셀 기록: Pro $20, Max $110.",
    links: [["Claude", "https://claude.ai/"]] },
  { id: "gamma", cat: "viz", name: "Gamma", sub: "자동 디자인·슬라이드 생성", domain: "gamma.app", short: "Pro $25 · Ultra $100",
    intro: "주제나 프롬프트에서 발표 흐름과 카드형 슬라이드, 이미지·레이아웃을 자동으로 구성하는 프레젠테이션 도구.",
    how: "Create/Generate → 주제·목적·대상·슬라이드 수 입력 → 개요 확인 → 테마·이미지 선택 → 생성 → 필요 시 PPTX/PDF로 내보내기.",
    pro: "발표자료처럼 보이는 구조와 시각 요소를 빠르게 만들기 좋다는 기록입니다.",
    con: "내용이 단순화될 수 있고, 연구 근거·수치 검증이 필요합니다. 스타일 반복이나 PPTX 내보내기 후 레이아웃 차이가 생길 수 있습니다.",
    memo: "영양 연구를 카드·이미지·핵심 포인트로 빠르게 보여주기 좋았다는 기록입니다.",
    price: "엑셀 기록: Pro $25, Ultra $100.",
    links: [["Gamma", "https://gamma.app/"]] },
];

/* 상황별 추천: [하고 싶은 일, [서비스 id...], 이유] */
const RECOMMEND = [
  ["말하는 아바타로 짧은 발표 영상 만들기", ["vidnoz"], "아바타·대본·음성을 고르는 흐름이 단순하고 초보자용 튜토리얼이 있음"],
  ["사진으로 아바타 영상을 시험하기", ["heygen"], "사진/아바타 기반 영상과 다국어 제작을 지원"],
  ["AI 영상·이미지·음악 기능을 한곳에서 탐색하기", ["deevid"], "여러 콘텐츠 생성 기능을 한 플랫폼에서 제공. 생성 전 무료 한도 확인"],
  ["문서 기반 챗봇 만들기", ["dify"], "PDF나 텍스트 문서를 지식으로 연결하는 노코드 흐름"],
  ["앱 사이 반복 업무 자동화하기", ["n8n"], "노드 연결로 트리거·데이터 처리·저장을 구성"],
  ["화면 디자인 시안 만들기", ["figma", "stitch"], "Figma는 세부 디자인·협업, Stitch는 빠른 아이디어 시안에 적합"],
  ["자연어로 웹앱 프로토타입 만들기", ["lovable", "bolt"], "대화형으로 기능을 요청하고 생성 결과를 수정"],
  ["연구를 발표 슬라이드로 정리하기", ["claude-viz", "gamma"], "Claude로 내용 구조를 잡고 Gamma로 시각적 초안을 만드는 조합"],
  ["이메일·요약 등 범용 글쓰기", ["chatgpt", "claude", "gemini"], "같은 과제를 넣고 결과와 사용 경험을 비교하기 쉬움"],
];


/* ---------- 유틸 ---------- */
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const catVar = (id) => `--cat: var(--c-${id})`;
const catOf = (id) => CATEGORIES.find((c) => c.id === id);
const svc = (id) => SERVICES.find((s) => s.id === id);
const isRec = (s) => catOf(s.cat).rec === s.id;
const logoUrl = (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=128`;
const narrow = () => matchMedia("(max-width: 1100px)").matches;

/* 로고: 파비콘을 불러오고, 실패하면 머리글자로 대체 */
function logo(s, size = "") {
  return `<span class="logo ${size}" aria-hidden="true">
    <img src="${logoUrl(s.domain)}" alt="" loading="lazy" onerror="this.parentNode.classList.add('fallback')">
    <span class="mono">${esc(s.name[0].toUpperCase())}</span>
  </span>`;
}

$("#summaryText").innerHTML =
  `${CATEGORIES.length}개 분야 · ${SERVICES.length}개 서비스<span class="sep">|</span><span class="legend"><i class="free-dot"></i>무료로 시작 가능 ${SERVICES.filter((s) => s.free).length}</span><span class="legend"><i class="star-i">★</i>추천 시작점</span>`;

/* ---------- 분야 레인 ---------- */
$("#board").innerHTML = CATEGORIES.map((c) => {
  const list = SERVICES.filter((s) => s.cat === c.id);
  return `<div class="lane" style="${catVar(c.id)}">
    <div class="lane-label">
      <span class="name"><span class="dot"></span>${esc(c.name)}</span>
      <span class="n">${list.length}개 서비스</span>
    </div>
    <div class="tiles">${list.map((s) => `
      <button class="tile" type="button" data-id="${s.id}" aria-pressed="false" title="${esc(s.intro)}">
        <span class="logo-wrap">${logo(s)}${s.free ? `<span class="free-dot" title="무료로 시작 가능"></span>` : ""}</span>
        <span class="tile-text">
          <span class="tile-name">${esc(s.name)}</span>
          <span class="tile-meta">${s.allFree ? `<span class="f">무료</span>` : esc(s.short)}</span>
        </span>
        ${isRec(s) ? `<span class="star" title="추천 시작점">★</span>` : ""}
      </button>`).join("")}
    </div>
  </div>`;
}).join("");

/* ---------- 오른쪽 패널 ---------- */
let selected = null;

function renderHome() {
  const d = $("#detail");
  d.className = "detail";
  d.style.cssText = "";
  d.innerHTML = `<div class="detail-scroll fade">
    <p class="eyebrow">상황별 추천</p>
    <ul class="recs">${RECOMMEND.map(([want, ids]) => `<li class="rec">
      <button class="rec-btn" type="button" data-id="${ids[0]}">
        <span class="rec-text">
          <span class="rec-want">${esc(want)}</span>
          <span class="rec-why">${ids.map((id) => esc(svc(id).name)).join(" · ")}</span>
        </span>
        <span class="stack">${ids.map((id) => logo(svc(id), "sm")).join("")}</span>
      </button>
    </li>`).join("")}</ul>
    <details class="checks">
      <summary>확인 사항</summary>
      <ul>
        <li>엑셀의 사용 요금은 작성 시점의 메모를 옮긴 것이며 통화·세금·월간/연간 결제 조건이 서로 다를 수 있습니다. 결제 전 각 서비스의 공식 페이지를 확인하세요.</li>
        <li>사용 소감은 엑셀 작성자의 개인 체험을 요약한 것으로, 모든 사용자에게 같은 결과를 보장하지 않습니다.</li>
        <li>AI 아바타·음성 복제에는 본인 또는 해당 인물의 명확한 동의를 받고, 생성물의 정확성·저작권·상업적 이용 조건을 확인하세요.</li>
      </ul>
    </details>
  </div>`;
}

function renderDetail(s) {
  const c = catOf(s.cat);
  const steps = s.how.split("→").map((t) => t.trim().replace(/\.$/, "")).filter(Boolean);
  const note = (cls, k, v) => v ? `<div class="note ${cls}"><b>${k}</b>${esc(v)}</div>` : "";
  const rec = RECOMMEND.find(([, ids]) => ids.includes(s.id));
  const d = $("#detail");
  d.className = "detail" + (narrow() ? " sheet" : "");
  d.style.cssText = catVar(s.cat);
  d.innerHTML = `<div class="detail-scroll fade">
    <button class="back" type="button" data-back>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>상황별 추천
    </button>
    <div class="d-head">
      ${logo(s, "lg")}
      <div>
        <h2>${esc(s.name)}</h2>
        <div class="d-meta">
          <span class="dot"></span><span>${esc(s.sub || c.name)}</span>
          ${s.free ? `<span class="sep">·</span><span class="f">${s.allFree ? "무료" : "무료로 시작 가능"}</span>` : ""}
          ${isRec(s) ? `<span class="sep">·</span><span class="s">★ 추천 시작점</span>` : ""}
        </div>
      </div>
    </div>
    <p class="d-intro">${esc(s.intro)}</p>
    ${rec ? `<div class="d-sec"><h3>이럴 때 추천</h3><div class="d-price">${esc(rec[0])} — ${esc(rec[2])}</div></div>` : ""}
    <div class="d-sec"><h3>요금</h3><div class="d-price">${esc(s.price)}</div></div>
    <div class="d-sec"><h3>사용 방법</h3><ol class="steps">${steps.map((t) => `<li>${esc(t)}</li>`).join("")}</ol></div>
    <div class="d-sec"><h3>체험 기록</h3><div class="notes">
      ${note("pro", "장점", s.pro)}
      ${note("con", "아쉬운 점", s.con)}
      ${note("memo", "체험 메모", s.memo)}
    </div></div>
  </div>
  <div class="d-links">${s.links.map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join("")}</div>`;
}

function select(id) {
  selected = id;
  document.querySelectorAll(".tile").forEach((t) => t.setAttribute("aria-pressed", t.dataset.id === id));
  document.querySelector(".scrim")?.remove();
  if (!id) return renderHome();
  renderDetail(svc(id));
  if (narrow()) {
    const scrim = document.createElement("div");
    scrim.className = "scrim";
    scrim.addEventListener("click", () => select(null));
    document.body.appendChild(scrim);
  }
}

/* ---------- 검색 / 무료 필터 (흐리게 처리해 배치 유지) ---------- */
let freeOnly = false;
function applyFilter() {
  const q = $("#search").value.trim().toLowerCase();
  document.querySelectorAll(".tile").forEach((t) => {
    const s = svc(t.dataset.id);
    const text = [s.name, s.sub, s.intro, s.how, s.pro, s.con, s.memo, s.price, catOf(s.cat).name].join(" ").toLowerCase();
    t.classList.toggle("dim", !((!q || text.includes(q)) && (!freeOnly || s.free)));
  });
}

/* ---------- 이벤트 ---------- */
document.addEventListener("click", (e) => {
  const t = e.target.closest(".tile, .rec-btn, [data-back]");
  if (!t) return;
  if (t.matches("[data-back]")) return select(null);
  select(t.classList.contains("tile") && selected === t.dataset.id ? null : t.dataset.id);
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && selected) select(null); });
$("#search").addEventListener("input", applyFilter);
$("#freeBtn").addEventListener("click", (e) => {
  freeOnly = !freeOnly;
  e.currentTarget.setAttribute("aria-pressed", freeOnly);
  applyFilter();
});

/* ---------- 테마 ---------- */
(() => {
  const root = document.documentElement;
  try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
  $("#themeBtn").addEventListener("click", () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });
})();

renderHome();
