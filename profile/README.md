# 몽글몽글 상상나래 (MGMG) -> 2025 오픈소스 개발자 대회 출품

> 아이들을 위한 **AI 기반 인터랙티브 동화 생성 플랫폼**
>
> **팀명: yANUs-3** — 황순규(팀장, AI·백엔드), 정용태(팀장, AI·백엔드), 권민주(프론트/디자인), 서아영(프론트/디자인), 김보윤(프론트/디자인)

---

## 목차

* [프로젝트 소개](#프로젝트-소개)
* [핵심 기능](#핵심-기능)
* [아키텍처 한눈에 보기](#아키텍처-한눈에-보기)
* [리포지토리 구조](#리포지토리-구조)
* [빠른 시작 (Getting Started)](#빠른-시작-getting-started)

  * [사전 요구사항](#사전-요구사항)
  * [환경 변수 설정 예시](#환경-변수-설정-예시)
  * [로컬 실행: 서비스별 가이드](#로컬-실행-서비스별-가이드)
  * [(선택) Docker Compose 예시](#선택-docker-compose-예시)
* [사용 방법 (User Flow)](#사용-방법-user-flow)
* [API 요약](#api-요약)

  * [백엔드 (Express)](#백엔드-express)
  * [AI 서버 (FastAPI)](#ai-서버-fastapi)
* [데이터베이스 개요](#데이터베이스-개요)
* [기술 스택](#기술-스택)
* [개발 가이드](#개발-가이드)
* [로드맵](#로드맵)
* [문의](#문의)

---

## 프로젝트 소개

"**몽글몽글 상상나래**"는 어린이가 **주인공**이 되어 **AI와 함께 나만의 동화**를 만들고, 장면마다 **실시간 삽화**를 생성해 보여주는 **인터랙티브 동화 생성 플랫폼**입니다. 키보드 입력 없이 **선택**만으로 스토리가 분기되고, 각 분기에 맞는 이미지가 즉시 생성되어 몰입감 있는 읽기 경험을 제공합니다.

### 차별점

* **선택 기반 전개**: 키보드 타이핑 없이 버튼 선택만으로 진행
* **텍스트·이미지 동시 생성**: A.X 기반 스토리 + SDXL 기반 삽화
* **맞춤형 생성**: 주인공 이름/성격/특징/배경/장르/분량(엔딩 포인트) 설정

---

## 핵심 기능

* **맞춤형 동화 생성**: (A.X) 이름·성격·특징·시대·장소·장르·엔딩 포인트 기반 스토리 자동 생성
* **실시간 삽화 생성**: (SDXL) 장면별 화풍을 적용한 이미지 자동 생성
* **인터랙티브 분기**: 선택지(최대 4개)로 다중 엔딩 경험 제공
* **갤러리**: 내 동화 보관, 공개 갤러리 감상
* **커뮤니티**: 게시글/댓글로 창작물 공유 및 소통
* **인증/마이페이지**: 안전한 회원 시스템, 개인정보/작품 관리

---

## 아키텍처 한눈에 보기

<img width="1920" height="1080" alt="제목을-입력해주세요_-001 (4)" src="https://github.com/user-attachments/assets/3ac6a641-aaa6-47bf-9f81-ed5020260651" />
---

## 리포지토리 구조

> 실제 조직/배포 방식에 맞춰 수정하세요.

```
MGMG/
├─ FE/                 # 프론트엔드 (React)
├─ BE/                 # 백엔드 (Express)
└─ AI/                 # AI 서버 (FastAPI)
```

각 폴더에는 자체 README가 있으며, 본 문서는 **메인 리드미**로 전체 개요·실행법을 제공합니다.

---

## 빠른 시작 (Getting Started)

### 사전 요구사항

* **Node.js** v18+ / **npm** v9+
* **Python** 3.9+
* **MySQL** 8.x
* (선택) **CUDA** 환경 (GPU 가속 시)

### 환경 변수 설정 예시

각 서비스 루트에 `.env` 파일을 생성합니다.

**FE/.env**

```env
# 백엔드(Express) 접근용 — 도메인 또는 IP
REACT_APP_BACK_IP=localhost:5000
# AI 서버(FastAPI) 접근용 — 프로토콜+호스트 포함 권장
REACT_APP_AI_BASE=http://localhost:8000
# 개발 편의
BROWSER=none
```

**BE/.env**

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=mgmg
JWT_SECRET=your_very_secret_and_long_key
CORS_ORIGIN=http://localhost:3000
# (선택) AI 서버 베이스 URL
AI_BASE=http://localhost:8000
```

**AI/.env (선택)**

```env
HOST=0.0.0.0
PORT=8000
# 모델/캐시 경로 커스터마이징 가능
SDXL_MODEL_DIR=./stable-diffusion-xl-base-1.0
STATIC_DIR=./static
CACHE_DIR=./cache
```

### 로컬 실행: 서비스별 가이드

#### 1) AI 서버 (FastAPI)

```bash
# Python venv 권장
python -m venv mgmg && \
  source mgmg/bin/activate   # Windows: .\\mgmg\\Scripts\\activate

cd AI
pip install -r requirements.txt
# (GPU 선택) CUDA 버전에 맞는 PyTorch 설치
# pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# 서버 실행
python app.py  # 기본: http://0.0.0.0:8000

# 상태 확인
# GET http://localhost:8000/health
```

#### 2) 백엔드 (Express)

```bash
cd BE
npm install

# DB 준비
# MySQL 접속 후 스키마/테이블 생성 (예: mgmg.db.sql 실행)
# CREATE DATABASE mgmg;
# -- 테이블(users, articles, article_comments, story, story_content) 생성

# 서버 실행
npm start  # 기본: http://localhost:5000
```

#### 3) 프론트엔드 (React)

```bash
cd FE
npm install
npm start  # http://localhost:3000
```

> **연동 체크**: FE → BE(`/users/me`, `/articles`) / BE → AI(`/sessions`) 호출이 정상인지 확인하세요.

### (선택) Docker Compose 예시

> 실제 이미지/경로에 맞춰 변경 필요. 참조용 스캐폴드입니다.

```yaml
version: "3.9"
services:
  db:
    image: mysql:8
    environment:
      MYSQL_DATABASE: mgmg
      MYSQL_ROOT_PASSWORD: root
      TZ: Asia/Seoul
    ports: ["3306:3306"]
    volumes:
      - ./ops/mysql/init.sql:/docker-entrypoint-initdb.d/init.sql

  ai:
    build: ./AI
    environment:
      - HOST=0.0.0.0
      - PORT=8000
    ports: ["8000:8000"]
    volumes:
      - ./AI/static:/app/static

  be:
    build: ./BE
    environment:
      - PORT=5000
      - DB_HOST=db
      - DB_USER=root
      - DB_PASSWORD=root
      - DB_DATABASE=mgmg
      - AI_BASE=http://ai:8000
      - CORS_ORIGIN=http://localhost:3000
    depends_on: [db, ai]
    ports: ["5000:5000"]

  fe:
    build: ./FE
    environment:
      - REACT_APP_BACK_IP=localhost:5000
      - REACT_APP_AI_BASE=http://localhost:8000
    depends_on: [be]
    ports: ["3000:3000"]
```

---

## 사용 방법 (User Flow)

1. **회원가입/로그인**

   * 프론트에서 `/users/register`, `/users/login`을 통해 계정 생성/로그인
   * 로그인 성공 시 토큰 또는 쿠키로 인증 상태 유지 (UserContext)
2. **동화 생성 시작**

   * Create 화면에서 주인공 이름/성격/특징/시대/장르/엔딩 포인트 설정
   * **POST** `BE /stories` → (내부) **POST** `AI /sessions` 호출
   * 응답으로 초기 페이지(텍스트+이미지 URL, 선택지)와 `session_id` 획득
3. **인터랙티브 진행**

   * 사용자가 선택을 누르면
   * **POST** `AI /sessions/{session_id}/choose` → 다음 페이지(텍스트/이미지/선택지) 수신
   * 완료 시 **POST** `AI /sessions/{session_id}/title`로 제목 생성
4. **저장/갤러리/커뮤니티**

   * `BE /stories/:storyId/pages`, `/articles`, `/articles/:id/comments` 등으로 저장/공유

---

## API 요약

### 백엔드 (Express)

* **Users**

  * `POST /users/register` — 회원가입
  * `POST /users/login` — 로그인 (JWT 발급)
  * `POST /users/logout` — 로그아웃
  * `GET  /users/me` — 내 정보 조회
* **Articles**

  * `POST /articles` — 게시글 생성
  * `GET  /articles` — 전체 조회
  * `GET  /articles/:article_id` — 단건 조회
  * `PUT  /articles/:article_id` — 수정
  * `DELETE /articles/:article_id` — 삭제
* **Comments**

  * `POST /articles/:article_id/comments` — 작성
  * `GET  /articles/:article_id/comments` — 조회
  * `PUT  /articles/:article_id/comments/:comment_id` — 수정
  * `DELETE /articles/:article_id/comments/:comment_id` — 삭제
* **Stories**

  * `POST /stories` — 동화 시작 (AI `/sessions` 연동)
  * `POST /stories/:storyId/pages` — 페이지 추가 (AI `/choose` 연동)
  * `PUT  /stories/:storyId` — 제목 수정
  * `GET  /stories/:storyId` — 제목 조회
  * `GET  /stories/:storyId/pages` — 페이지 조회

### AI 서버 (FastAPI)

* `GET  /health` — 서버/모델 상태 및 CUDA 여부
* `POST /sessions` — 초기 스토리 페이지 생성
* `POST /sessions/{session_id}/choose` — 선택 반영해 다음 페이지 생성
* `GET  /sessions/{session_id}/state` — 세션 상태 조회
* `POST /sessions/{session_id}/title` — 완료된 스토리 제목 생성

> 요청/응답 스키마는 AI 리포지토리 README 참조. 프런트/백엔드 모두 \*\*`session_id`\*\*를 반드시 전달해야 합니다.

---

## 데이터베이스 개요

주요 테이블(예시):

* `users` — 사용자 계정
* `articles`, `article_comments` — 커뮤니티 게시물/댓글
* `story` — 스토리 메타(제목, 소유자 등)
* `story_content` — 페이지 단위 스토리(텍스트/이미지/선택지/페이지 번호)

> 컬럼 상세 및 제약조건은 `BE/mgmg.db.sql` 참고.

---

## 기술 스택

| 분류    | 기술                                                                        |
| ----- | ------------------------------------------------------------------------- |
| AI 모델 | A.X (스토리), SDXL (이미지)                                                  |
| 백엔드   | Express.js, MySQL(mysql2), JWT, Bcrypt, express-validator, dotenv, cors   |
| 프론트   | React, React Router, Axios, Context API/Hooks, Ant Design, react-pageflip |
| 인프라   | GPU 서버, Cloud Storage(선택), OpenAI API                                     |
| 기타    | AI-Hub 데이터셋, HTML5, CSS3                                                  |

---

## 개발 가이드

* **코드 스타일**: ESM(백엔드), 함수/파일 단위 책임 명확화, 모듈화
* **이미지 저장**: AI 서버에서 `/static/*` 경로 제공 → 프론트는 절대경로 URL 렌더링
* **에러 처리 팁**

  * `Invalid session_id` → FE에서 받은 `session_id`가 실제로 `choose/title/state`에 전달되는지 확인
  * `JSON decode error` → `Content-Type: application/json` 및 유효한 JSON 본문인지 점검
  * MySQL 스키마/컬럼 불일치 → 조인 키/컬럼명 점검, 마이그레이션 스크립트 재적용

---

## 개발 계획

* **STT/TTS**: 음성 명령/자동 낭독 지원
* **감정 애니메이션**: 감정 기반 인터랙션 강화
* **모바일 앱**: React Native 확장
* **영상화**: 동영상 생성 기능 멀티모달로 확장
* **다국어**: 글로벌 언어 지원 확대

---

## 문의

* Email: [jyt6640@naver.com](mailto:jyt6640@naver.com)
* 팀: yANUs-3

> 버그/이슈는 GitHub Issues로 등록해 주세요. 개선 제안 환영합니다!
