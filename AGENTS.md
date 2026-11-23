# Codeit Backend 작업 지침

- 코딩, 디버깅, 설계, 코드 리뷰, 테스트, 개발 문서화 전에 `C:/Users/misoh/.codex/codex.md`를 읽고 관련 지침을 적용한다. 파일에 접근할 수 없으면 작업 결과에 알린다.
- 이 프로젝트는 npm과 Express를 사용한다. `npm run dev`는 `tsx watch`로 `index.ts`를 실행하고 소스 변경 시 서버를 재시작한다. 기본 포트는 `3000`이다. `fake-database.ts`에는 실습용 데이터, `types.ts`에는 그 데이터의 타입이 있다.
- `npm run typecheck`로 타입을 검사하고 `npm run build`로 TypeScript를 `dist/`에 컴파일한다. 현재 `npm test`는 자리표시자다. 서버 동작을 바꿨다면 영향받은 HTTP 응답도 확인한다.
- `GET /memos`는 실습용 메모 전체를 JSON 배열로 반환한다.
- `POST /memos`는 JSON으로 `userId`, `title`, `content`, 선택 항목 `imageUrl`을 받아 메모를 생성한다. 성공 시 `201`, 입력이 유효하지 않으면 `400`으로 응답한다. 생성된 메모는 서버 메모리에 저장되어 재시작 시 초기화된다.
- `GET /memos/:id`는 ID에 해당하는 메모를 JSON 객체로 반환한다. 잘못된 ID는 `400`, 존재하지 않는 ID는 `404`로 응답한다.
- `npm run format`으로 포맷을 적용하고 `npm run format:check`로 포맷을 검사한다. VS Code에서 저장 시 포맷하려면 추천 Prettier 확장을 설치한다.
- `node_modules/`와 `dist/`는 생성물이다. 의존성은 npm으로 관리하고 변경 시 `package-lock.json`을 함께 갱신한다. 커밋과 푸시는 사용자 요청 범위에서 수행한다.
- WSL에서 서버를 실행할 때는 WSL에서 `npm ci`를 실행한다. Windows와 WSL의 `node_modules/`는 플랫폼별 바이너리가 달라 공유하지 않는다. 개발 서버는 `/mnt/c`의 파일도 감시할 수 있도록 폴링을 사용한다.
