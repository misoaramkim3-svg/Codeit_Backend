# Codeit Backend 작업 지침

## 프로젝트 목적과 코드 구조

이 프로젝트의 범위는 백엔드 기본기를 익히는 실습이다. 구현 범위와 코드 구조는 학습 목표를 기준으로 정한다. 학습자가 요청 하나를 처음부터 끝까지 따라갈 수 있도록 파일의 역할을 드러내고 기본 문법과 읽기 쉬운 이름을 사용한다.

- `routes/`에는 HTTP 메서드, 요청 경로, 담당 컨트롤러 함수의 연결을 둔다.
- `controllers/`에서는 요청을 읽고 Zod로 검사한 다음 서비스 함수를 호출하고 HTTP 상태와 JSON 응답을 보낸다.
- `services/`에서는 등록된 사용자만 메모를 작성할 수 있다는 규칙과 페이지 크기, 응답에 필요한 작성자와 날짜 변환을 다룬다.
- `repositories/`에서는 Prisma로 PostgreSQL 데이터를 조회하고 저장한다.
- `schemas/`에서는 같은 기능의 Zod 규칙을 한 파일에 모은다. 메모 목록, 상세, 작성 규칙은 `src/schemas/memo-schemas.ts`에 둔다.
- 요청은 라우터 → 컨트롤러 → 서비스 → 레포지터리 순서로 처리한다. 주석은 커서 기준이나 날짜 시간대처럼 이유를 알아야 이해할 수 있는 곳에 적는다.

## 실행과 API

- 코딩, 디버깅, 설계, 코드 리뷰, 테스트, 개발 문서화 전에 `C:/Users/misoh/.codex/codex.md`를 읽고 관련 지침을 적용한다. 파일에 접근할 수 없으면 작업 결과에 알린다.
- 이 프로젝트는 npm과 Express를 사용한다. 원본 코드는 `src/`에 둔다. `npm run dev`는 `tsx watch`로 `src/index.ts`를 실행하고 소스 변경 시 서버를 재시작한다. 기본 포트는 `3001`이다.
- PostgreSQL 모델은 `prisma/schema.prisma`에서 정의한다. Zod 스키마는 API 요청의 형식을 검사하고, Prisma 스키마는 데이터베이스의 테이블과 관계를 정의한다.
- 처음 실행할 때 백엔드에서 `npm ci`를 실행하고, `.env.example`을 `.env`로 복사한다. `DATABASE_URL`에 로컬 PostgreSQL 사용자 이름과 URL 인코딩한 비밀번호를 넣는다.
- `npm run db:generate`로 Prisma Client를 생성하고, `npm run db:migrate`로 테이블을 만든 다음 `npm run db:seed`로 실습 데이터를 넣는다. 시드는 실습 사용자의 문자열 ID를 사용하며 다시 실행해도 중복 행을 만들지 않는다.
- Better Auth의 `/api/better-auth` 경로가 가입, 로그인, 로그아웃과 세션 조회를 처리한다. 환경변수는 `BETTER_AUTH_SECRET`과 `BETTER_AUTH_URL`이다.
- 이메일 로그인에는 가입 시 등록한 유저이름도 받는다. 쿠키 세션은 15분 동안 유효하다. 사용자, 로그인 계정, 세션, 인증 정보는 Better Auth 모델에 저장한다.
- `POST /memos`의 `userId`는 로그인한 `BetterAuthUser.id`와 일치해야 한다. 잘못된 요청은 `400`, 세션 없음은 `401`, 작성자 불일치는 `403`, 생성 성공은 `201`이다.
- WSL의 백엔드 폴더에서 `npm run db:studio`를 실행하고 브라우저에서 `http://localhost:5555`를 열면 PostgreSQL의 테이블과 행을 볼 수 있다.
- `npm run typecheck`로 타입을 검사하고 `npm run build`로 TypeScript를 `dist/`에 컴파일한다. 현재 `npm test`는 자리표시자다. 서버 동작을 바꿨다면 영향받은 HTTP 응답도 확인한다.
- `src/index.ts`에서 요청 로그, CORS, JSON 파싱을 라우터보다 먼저 등록한다. CORS는 `http://localhost:3000`에서 백엔드를 직접 호출하는 브라우저 요청을 허용한다.
- 메모 목록·상세·생성·삭제 라우트는 `src/routes/memos-router.ts`에 정의하고, `src/index.ts`에서 `/memos` 경로에 연결한다. 공통 미들웨어 `requireLogin`이 Better Auth 세션을 검사하며, 유효한 세션이 없으면 `401`을 반환한다.
- `GET /memos`는 작성자 이름이 포함된 메모를 최대 15개씩 `{ memos, nextCursor }`로 반환한다. `cursor`를 생략하면 첫 페이지를 반환하고, 다음 페이지는 `cursor`에 이전 응답의 `nextCursor`를 전달한다.
- API 타입은 `src/types.ts` 한 곳에서 정의한다. 프론트엔드의 `@/types`도 이 파일을 가리킨다.
- 회원가입은 `POST /auth/signup`, 로그인은 `POST /auth/login`으로 요청한다. 새 비밀번호는 UTF-8 기준 최대 72바이트를 허용하고 `bcrypt`로 해시해 PostgreSQL에 저장한다. 기존 `scrypt` 계정은 로그인에 성공하면 72바이트 이하인 비밀번호를 bcrypt 해시로 갱신한다.
- `POST /auth/login`은 이메일, 비밀번호, 가입 시 등록한 유저이름(`username`)을 받는다.
- 메모 API의 `createdAt`은 UTC ISO 8601 문자열로 보낸다. 시드는 시간대 없는 실습용 날짜를 한국 시각으로 해석하고, 프론트엔드는 한국 시간으로 날짜와 시각을 표시한다.
- `GET /memos/:id`는 ID에 해당하는 메모와 작성자 이름(`username`)을 JSON 객체로 반환한다. 잘못된 ID는 `400`, 존재하지 않는 ID는 `404`로 응답한다.
- `POST /memos/:id/comments`는 로그인한 사용자 ID로 댓글을 저장한다. 본문은 `{ content }`이며 공백을 제거한 뒤 1~1,000자를 받는다. 성공은 `201`, 잘못된 입력은 `400`, 세션 없음은 `401`, 연결할 메모나 작성자가 없으면 `404`다. 메모를 삭제하면 해당 댓글도 삭제된다.
- 기존 로컬 DB에 예시 댓글만 추가하려면 `npm run db:seed -- -- --comments-only`를 실행한다.
- `DELETE /memos/:id`는 지정한 메모 한 건을 PostgreSQL에서 삭제한다. 성공은 `204`, 잘못된 ID는 `400`, 존재하지 않는 메모는 `404`로 응답한다. 이 API는 로컬 CRUD 실습용으로 모든 메모에 적용된다. 프론트엔드와 백엔드 개발 서버는 `127.0.0.1`에 바인딩한다.
- `npm run format`으로 포맷을 적용하고 `npm run format:check`로 포맷을 검사한다. VS Code에서 저장 시 포맷하려면 추천 Prettier 확장을 설치한다.
- `node_modules/`, `dist/`, `src/generated/`는 생성물이다. 의존성은 npm으로 관리하고 변경 시 `package-lock.json`을 함께 갱신한다. 커밋과 푸시는 사용자 요청 범위에서 수행한다.
- WSL에서 서버를 실행할 때는 WSL에서 `npm ci`를 실행한다. Windows와 WSL의 `node_modules/`는 플랫폼별 바이너리가 달라 공유하지 않는다. 개발 서버는 `/mnt/c`의 파일도 감시할 수 있도록 폴링을 사용한다.
