# Codeit Backend 작업 지침

- 코딩, 디버깅, 설계, 코드 리뷰, 테스트, 개발 문서화 전에 `C:/Users/misoh/.codex/codex.md`를 읽고 관련 지침을 적용한다. 파일에 접근할 수 없으면 작업 결과에 알린다.
- 이 프로젝트는 npm과 Express를 사용한다. 원본 코드는 `src/`에 둔다. `npm run dev`는 `tsx watch`로 `src/index.ts`를 실행하고 소스 변경 시 서버를 재시작한다. 기본 포트는 `3001`이다. `src/fake-database.ts`에는 실습용 데이터가 있다.
- `npm run typecheck`로 타입을 검사하고 `npm run build`로 TypeScript를 `dist/`에 컴파일한다. 현재 `npm test`는 자리표시자다. 서버 동작을 바꿨다면 영향받은 HTTP 응답도 확인한다.
- 백엔드 학습용 프로젝트다. 라우터는 요청 읽기, 입력 검증, 데이터 처리, 응답 순서가 한눈에 보이도록 작성한다. 변수에는 역할이 드러나는 이름을 쓰고, 주석에는 커서 기준이나 ID 생성처럼 코드만 보고 이유를 알기 어려운 부분을 설명한다.
- `src/index.ts`에서 요청 로그, CORS, JSON 파싱을 라우터보다 먼저 등록한다. CORS는 `http://localhost:3000`에서 백엔드를 직접 호출하는 브라우저 요청을 허용한다.
- 메모 목록·상세·생성 라우트는 `src/routes/memos-router.ts`에 정의하고, `src/index.ts`에서 `/memos` 경로에 연결한다.
- `GET /memos`는 작성자 이름이 포함된 메모를 최대 15개씩 `{ memos, nextCursor }`로 반환한다. `cursor`를 생략하면 첫 페이지를 반환하고, 다음 페이지는 `cursor`에 이전 응답의 `nextCursor`를 전달한다.
- API 타입은 `src/types.ts` 한 곳에서 정의한다. 프론트엔드의 `@/types`도 이 파일을 가리킨다.
- 메모 API의 `createdAt`은 UTC ISO 8601 문자열로 보낸다. 시간대 없는 실습용 날짜는 한국 시각으로 해석하고, 프론트엔드는 한국 시간으로 날짜와 시각을 표시한다.
- `POST /memos`는 `createMemoSchema`로 JSON을 검사한다. 요청 타입 `CreateMemoRequest`는 스키마에서 추론하고, 성공 응답은 `MemoResponse`다. `imageUrl`을 생략하면 응답 값은 빈 문자열이다. 생성에 성공하면 `201`, 입력이 유효하지 않으면 `400`으로 응답한다. 생성된 메모는 서버 메모리에 저장되어 재시작 시 초기화된다.
- `GET /memos/:id`는 ID에 해당하는 메모와 작성자 이름(`username`)을 JSON 객체로 반환한다. 잘못된 ID는 `400`, 존재하지 않는 ID는 `404`로 응답한다.
- `npm run format`으로 포맷을 적용하고 `npm run format:check`로 포맷을 검사한다. VS Code에서 저장 시 포맷하려면 추천 Prettier 확장을 설치한다.
- `node_modules/`와 `dist/`는 생성물이다. 의존성은 npm으로 관리하고 변경 시 `package-lock.json`을 함께 갱신한다. 커밋과 푸시는 사용자 요청 범위에서 수행한다.
- WSL에서 서버를 실행할 때는 WSL에서 `npm ci`를 실행한다. Windows와 WSL의 `node_modules/`는 플랫폼별 바이너리가 달라 공유하지 않는다. 개발 서버는 `/mnt/c`의 파일도 감시할 수 있도록 폴링을 사용한다.
