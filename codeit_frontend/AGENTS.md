<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 스타일

- TailwindCSS를 사용하고, 색·폰트·폭은 `app/globals.css`의 디자인 토큰을 사용한다

# 폴더 구조

- `components/ui/`: shadcn/ui 컴포넌트
- `components/custom/`: 직접 만든 컴포넌트

# 커밋

- 커밋 전에 `npm run format`을 실행한다
