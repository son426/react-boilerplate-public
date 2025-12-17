# React TypeScript Boilerplate

취향 가득 보일러플레이트

## ✨ 주요 특징

- **Firebase 올인원**: Hosting, Firestore, Auth, Analytics 통합
- **타입 안전성**: TypeScript + Generic 기반 엔드투엔드 타입 안전성
- **모바일 최적화**: 키보드 높이 추적, Safe Area 대응
- **레이아웃 프리셋**: BottomTab, Basic Layout 등 즉시 사용 가능
- **에러 처리**: 다층 에러 바운더리 + 중앙 집중식 로깅

## 🚀 기술 스택

- **빌드**: Pnpm + Vite + React 19 + TypeScript
- **스타일링**: Tailwind CSS 4
- **라우팅**: React Router 7 (Data-mode)
- **백엔드**: Firebase (Firestore, Auth, Analytics, Hosting)
- **UI 라이브러리**: Radix UI (shadcn/ui 스타일)
- **유틸리티**: overlay-kit, usehooks-ts, es-toolkit, @toss/storage

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 컴포넌트
│   ├── layout/         # 레이아웃 컴포넌트 (Container, Flex, Top, BottomTab 등)
│   └── ui/             # 범용 UI 컴포넌트 (Button, Dialog, Input 등)
├── pages/              # 페이지 컴포넌트
│   └── index.ts        # 페이지 export 중앙화
├── router/             # 라우팅 설정
│   ├── layout/         # 라우터 레벨 레이아웃 (Basic, BottomTabs)
│   └── auth-guard.tsx  # 인증 가드
├── hooks/              # 커스텀 훅
│   ├── use-strict-params.ts    # 타입 안전한 URL 파라미터
│   ├── use-back-blocker.ts     # 이탈 방지 모달 (3줄 구현)
│   └── use-keyboard-height.ts  # 모바일 키보드 높이 추적
├── db/                 # Firestore
│   ├── helper.ts       # Generic 기반 CRUD 헬퍼
│   └── repo/           # Repository 패턴 (todo, user)
├── services/           # 서비스 레이어
│   └── logger.ts       # Type-safe 로깅 (screen/click/action/error)
├── lib/                # 유틸리티
│   ├── firebase.ts     # Firebase 초기화
│   └── utils.ts        # cn() 등 유틸 함수
└── global.css         # 전역 스타일 (Tailwind + 다크모드)
```

## 🏃 빠른 시작

### 설치

```bash
pnpm install
```

### 환경 변수 설정

`.env` 파일 생성 (Firebase 설정 필요):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 개발 서버 실행

```bash
pnpm dev
```

### 빌드

```bash
pnpm build
```

## 💡 핵심 기능

### 커스텀 훅

- **`useStrictParams`**: `useParams`의 `undefined` 타입 제거
- **`useBackBlocker`**: overlay-kit + useBlocker로 이탈 방지 모달 3줄 구현
- **`useKeyboardHeight`**: `visualViewport`로 모바일 키보드 높이 추적

### Firebase 유틸

- **Type-safe Logger**: `screen/click/popup/action/error` 타입별 로깅 + `LogId as const`로 타입 안전성
- **Firestore 헬퍼**: Generic 기반 CRUD + 자동 타임스탬프 + 에러 로깅 통합

### 레이아웃 프리셋

- **BottomTab Layout**: 하단 탭 네비게이션 (모바일 앱 스타일)
- **Basic Layout**: 상단 헤더만 있는 레이아웃
- **AppContainer**: 헤더/바텀 탭에 따른 패딩 자동 계산
