# 🔙 Shopping Mall - Backend
온라인 쇼핑몰 프로젝트의 **백엔드** 파트 입니다. <br/>
사용자 인증, 실시간 상품 검색, 장바구니, 상품 등록 등을 구현하였습니다. <br/>

## 🚀 Features
✔ **RESTful API architecture**  <br/>
✔ **사용자 인증** – OAuth2를 활용한 소셜 로그인(카카오), JWT를 이용한 회원가입/로그인 <br/>
✔ **실시간 상품 검색** - 검색창에 키워드 입력시, 연관된 상품 데이터를 실시간으로 제공해주기 위한 API <br/>
✔ **장바구니** - 장바구니에 추가한 상품을 관리, 수량 변경 및 상품 삭제를 위한 API <br/>
✔ **상품 등록** - 새로운 상품 등록을 위한 API <br/>
✔ **상품 상세 페이지** - 상품에 대한 자세한 데이터 제공, 상품 별 옵션을 설정하여 장바구니에 추가할 수 있는 API <br/>
✔ **카테고리별 상품 조회** - 남성, 여성, 가방 등 카테고리별 상품 조회를 위한 API <br/>
✔ **Pagination** - 상품의 갯수가 10개 이상인 경우, 페이지 단위로 상품 데이터를 제공해주기 위한 API <br/>
✔ **데이터 시각화 API** - 데이터 시각화를 위한 다양한 데이터(기간별 매출액, Top 5 상품 등)를 제공하기 위한 API <br/>
✔ **CRUD operations** - 상품, 사용자 등록, 장바구니, 사용자 인증을 대상으로 한 CRUD <br/>
<br/>


## 🛠️ Tech Stack

- **🌏 Server** - Node.js with Express
- **📃 Language** - TypeScript  <br/>
- **🗄️ Database** - MySQL, Sequelize ORM
- **🔑 사용자 인증** - OAuth2 with Kakao, JWT
- **🧱 MVC architecture**
- **📡 RESTful API**

## 📡 Deployment
- **🖥️ Server** - CloudType
- **🗄️ DB** - CloudType
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

