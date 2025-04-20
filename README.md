# 🔙 Shopping Mall - Backend
온라인 쇼핑몰 프로젝트의 **백엔드** 파트 입니다. <br/>

## 🛠️ Tech Stack
### 🧠 Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **Database**: MySQL with Sequelize ORM
- **Authentication**: OAuth2 (Kakao), JWT
- **Architecture**: MVC, RESTful API

### ☁️ Deployment
- **Backend**: CloudType
- **Database**: CloudType (MySQL)
<br/>

## 🚀 Key Features

### 👤 사용자 인증 & 권한
- **소셜 로그인 (OAuth2)** – 카카오 계정을 이용한 소셜 로그인 구현
- **JWT 기반 인증** – 자체 회원가입 및 로그인, 토큰 기반 사용자 인증 처리  

### 🛍️ 상품 조회 및 생성
- **상품 목록 & 상세 페이지** – 상품 상세 정보 조회, 옵션 지정하여 장바구니 추가 기능
- **상품 등록 기능** – 새로운 상품을 등록할 수 있는 API 구현  
- **카테고리별 상품 조회** – 남성, 여성, 가방 등 카테고리별 상품 조회
- **실시간 상품 검색** – 키워드 입력 시 관련 상품을 실시간으로 조회

### 🛒 장바구니 기능
- **장바구니 CRUD** – 장바구니 추가, 상품 수량 변경, 삭제 기능

### 📊 관리자 대시보드
- **매출 및 통계 데이터 조회** – 기간별 매출, Top 5 인기 상품, 신규 유저 수 등 데이터 조회

### ⚡ 성능 개선
- **React Query 캐싱** – 중복 네트워크 요청 방지
- **Pagination** – 많은 양의 상품 데이터를 페이지 단위로 분할해 조회함으로써 서버 부하 감소  
<br/>

## 🔗 Related Repositories
- 🖥️ **[Frontend Repository](https://github.com/MyungWanPark/shopping-mall-frontend)**
- 🏠 **[Main Repository (Full Documentation)](https://github.com/MyungWanPark/Online-Shopping-Mall)**
<br/>

## 💻 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/MyungWanPark/shopping-mall-backend.git
```

### 2️⃣ Install dependencies
```bash
cd shopping-mall-backend
npm install
```

### 3️⃣ Run the application(개발 환경, .env 파일 필요)

```bash
npm run build
npm run start:dev
```
개발 모드 환경: http://localhost:8080 

