## 주제: React.js, Express(Node.js 환경)를 활용한 온라인 쇼핑몰 구현 (백엔드 레포)
역할 및 범위: 풀스택, 개인 프로젝트

### Version
[![express version](https://img.shields.io/badge/Express-4.18.2-green.svg?style=flat-square)](https://react.dev)
[![node version](https://img.shields.io/badge/Node-18.x-orange.svg?style=flat-square)](https://nodejs.org/en)

<br/>

> Click the link to view Demo.&nbsp;&nbsp; [Demo 보러가기 ](https://shoppingmall-myungwan.netlify.app) <br/>

빠른 로그인을 위해 ID: a@a 비밀번호: 1234 이용하셔도 됩니다 :)

<br/>

<details open="open">
<summary>Skills Used</summary>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" /> <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white" /> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white" /> <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=flat&logo=Sequelize&logoColor=white" />
  
- 개발 언어: 타입스크립트 4.9.5

- 프레임워크: Express.js 4.18.2 (Node Environment)

- DB: MySQL
  
- ORM: Sequelize
  
- 디자인패턴: MVC
  
- 인증: JWT
  
- RESTful API
  
</details>
<br/>

## Features 

- 인증
  - JWT를 활용한 Login, Register

- 제품
  - Show products by category, search keyword
  - Create product

- 장바구니
  - Add to Cart 
  - Read Cart 
  - Update Cart 
  - Delete Cart 

- 애널리틱스
  - Query data based on selected period.(선택한 기간에 따른 데이터 조회)
    - Total Sales amount
    - New Users number
    - Sales Volumn
    - Hot Sales Item
    - Sales by Day Shown by Chart
    - Top 5 Items of Sales Shown by Chart
    - User's inflow route data Shown by Chart

- 반응형 웹사이트

<br/>

### Detail Images 
(이미지 클릭 시, 큰 화면으로 보실 수 있습니다.)

- [Basic](#Basic)
  - [Index](#Index)

- [인증](#인증)
  - [Login](#Login)
  - [Register](#Register)
  - [After Login](#After-Login)
- [제품](#제품)
  - [Men's Category](#Men's-Category)
  - [Keyword Search](#Keyword-Search)
- [장바구니](#장바구니)
  - [My Cart](#My-Cart)
  - [Cart Option](#Cart-Option)
- [애널리틱스](#애널리틱스)
  - [Analytics Set Dates](#Analytics-Set-Dates)
  - [Analytics Sales](#Analytics-Sales)
  - [Analytics User Inflow](#Analytics-User-Inflow)
- [제품 추가](#제품-추가)
  - [New Product](#New-Product)
  - [After New Product](#After-New-Product)
<br/>

## Basic

### Index
랜딩 페이지 입니다. 

<br/>

<img width="1280" alt="index-min" src="https://user-images.githubusercontent.com/56289900/226888377-cb0c276d-1038-40ae-9e76-249edb8fb756.png">

<br/>

## 인증

### Login
로그인 화면 입니다. 

<br/>

<img width="1280" alt="login-min" src="https://user-images.githubusercontent.com/56289900/226905787-d5da9c21-7363-45c5-ac3e-7faa2b4aaa09.png">

<br/>

### Register
회원가입 화면 입니다. 회원가입 후 자동으로 로그인 되도록 구현하였습니다.

<br/>

<img width="1280" alt="register-min" src="https://user-images.githubusercontent.com/56289900/226905780-375b684a-1c7d-43f6-823c-fc84350dc616.png">

<br/>

### After Login
로그인 후 화면 입니다. 네이게이션 바의 우측 상단에 이름을 포함합니다. 

<br/>

<img width="1280" alt="after-login-min" src="https://user-images.githubusercontent.com/56289900/226888354-7ac1fec5-2d4b-4b69-af63-2026e8b4cb7c.png" />

<br/>

## 제품

### Men's Category
네비게이션 바에서 Men을 클릭하면, 남성 의류 상품들을 보여줍니다. 

<br/>

<img width="1280" alt="men's category-min" src="https://user-images.githubusercontent.com/56289900/226888386-9ec36e59-ea8a-45e1-a62e-a27928fed086.png" />

<br/>

### Keyword Search
검색창에 원하는 제품의 이름을 검색하면, 이름을 포함한 상품들을 보여줍니다.

<br/>

<img width="1280" alt="keyword-list-min" src="https://user-images.githubusercontent.com/56289900/226888382-5a5b6bfe-3f00-4e4d-8f88-5dfc52fda9ac.png" />

<br/>

### Product Detail
상품을 클릭하면 상세 상품 페이지로 이동합니다. Size, Color, 수량을 선택한 후, 장바구니에 추가할 수 있습니다.

<br/>

<img width="1280" alt="product-detail-min" src="https://user-images.githubusercontent.com/56289900/226888396-08cebdc5-0a9f-4e2c-ae3e-de0103d87c9a.png" />

<br/>

## 장바구니

### My Cart
장바구니 페이지 입니다. 

<br/>

<img width="1280" alt="my cart-min" src="https://user-images.githubusercontent.com/56289900/226888389-00b9dc19-6178-4a73-9ea1-1d4e590b25c9.png" />

<br/>

### Cart Option
장바구니에 담긴 제품의 수량을 변경할 수 있으며, 삭제도 가능합니다. <br/>
구입할 제품을 선택할 수 있으며, 이때 선택한 제품만 주문이 가능합니다. <br/>
주문 후, 선택하지 않은 제품만 장바구니에 남겨다집니다.

<br/>

<img width="1280" alt="cart-change-option-min" src="https://user-images.githubusercontent.com/56289900/226888374-b3f964cd-4af7-46f8-900d-4c63996ad79f.png" />

<br/>

## 애널리틱스

### Analytics Date Setting
애널리틱스 페이지 입니다. <br/>
조회하고 싶은 기간을 선택하여, 해당 기간 안에서의 데이터를 조회합니다. <br/>
이때 맥락상 최초의 유저가 생성된 날부터 선택 가능하도록 구현하였습니다.

<br/>

<img width="1280" alt="analytics-set-date-min" src="https://user-images.githubusercontent.com/56289900/226888369-6926b0c4-7e5c-4e90-a379-a5f2d039ab77.png" />

<br/>

### Analytics Sales
좌측의 막대, 선 혼합 그래프는 선택한 기간 동안의 매출액 현황입니다. <br/>
막대는 날짜별 발생한 매출액, 선은 평균 매출액(Average)을 의미합니다. 그래프에 호버하면, 상세한 정보가 나옵니다. <br/>
우측의 원그래프는 Top 5 매출액을 차지하는 상품의 정보를 보여줍니다. 그래프에 호버하면, 제품 이름과 매출액이 나옵니다.

<br/>

<img width="1280" alt="analytics-sales-min" src="https://user-images.githubusercontent.com/56289900/226888368-4f572625-1ef8-476b-ade8-c374862c2352.png" />

<br/>

### Analytics User Inflow
새로운 유저가 얼마만큼, 어떤 경로로 오게 되었는지 인원 수, 비율, 경로를 보여주는 그래프 입니다. 

<br/>

<img width="1278" alt="analytics-user-inflow-min" src="https://user-images.githubusercontent.com/56289900/226888371-288b1563-0f25-4a46-ae86-0e85e3318f2d.png" />

<br/>

## 제품-추가

### New Product
새로운 제품을 등록할 수 있는 화면입니다. <br/>
이미지 파일을 첨부하면, 해당 이미지가 화면에 나타납니다.

<br/>

<img width="1280" alt="new-product-min" src="https://user-images.githubusercontent.com/56289900/226888391-71c561e5-8f08-4d64-9f0c-7be18136ce0c.png" />

<br/>

### After New Product
새로운 제품을 등록한 후에 메인 화면에 가보면, 새 제품을 볼 수 있습니다.<br/> 
새 제품을 클릭하면 마찬가지로 제품 상세 페이지로 이동하며, 장바구니에 추가할 수 있습니다. 

<br/>

<img width="1280" alt="after-new-product-min" src="https://user-images.githubusercontent.com/56289900/226888365-758c7281-c51e-4b03-b5f5-0f7054fbb08c.png" />

<br/>


