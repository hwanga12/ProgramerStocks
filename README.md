# 📈 ProgramerStocks - 모의 주식 투자 시뮬레이터

> **실제 주식 거래처럼! 실시간 가격 변동을 반영한 종목 매수/매도 시뮬레이션 웹 서비스**

![Generic badge](https://img.shields.io/badge/Node.js-18.x-green.svg) ![Generic badge](https://img.shields.io/badge/React-18.x-blue.svg) ![Generic badge](https://img.shields.io/badge/MySQL-8.0-orange.svg)

<br/>

## 🔗 링크
- **GitHub Repository**: [https://github.com/kevinmj12/stock-simulator](https://github.com/kevinmj12/stock-simulator)

<br/>

## 🗓️ 프로젝트 개요

| 항목 | 내용 |
| --- | --- |
| **프로젝트명** | ProgramerStocks |
| **개발 기간** | 2025.05.20 ~ 2025.06.11 (약 3주) |
| **팀 구성** | 4인 팀 프로젝트 (Frontend 2명, Backend 2명) |
| **담당 역할** | **Backend Lead** (API 설계 및 개발, DB 구축, 서버 배포) |

<br/>

## 🛠️ 기술 스택 (Tech Stack)

### 💻 Frontend
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/Styled Components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/Zustand-orange?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/Recharts-22B5BF?style=flat-square&logo=apache-echarts&logoColor=white"/>

### 🌐 Backend
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/> <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>

### 🚀 DevOps & Tools
<img src="https://img.shields.io/badge/AWS EC2-FF9900?style=flat-square&logo=Amazon EC2&logoColor=white"/> <img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=NGINX&logoColor=white"/> <img src="https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=PM2&logoColor=white"/>

<br/>

## 📦 주요 기능

### 1. 주식 정보 조회
- **홈 화면**: 대표 종목 5개의 실시간 등락률 시각화 (색상 및 기호 표시).
- **상세 페이지**: Recharts를 활용한 실시간 및 일별 차트 제공.

### 2. 모의 투자 (매수/매도)
- 현재가 기반 매수/매도 주문 (수량 입력 지원).
- 보유 현금 및 주식 수량 실시간 검증.

### 3. 자산 관리
- **보유 자산**: 총 자산, 총 수익률 및 종목별 수익률 요약 제공.
- **거래 내역**: 일시, 종목, 수량, 거래 유형(매수/매도), 금액 상세 조회.

### 4. 회원 관리
- JWT 기반 로그인/회원가입.
- React-hook-form을 이용한 유효성 검사.

<br/>

## 👨‍💻 백엔드 구현 상세 (My Contributions)

### 1️⃣ DB 설계 및 정규화
- 도메인 주도 설계를 통한 MySQL 테이블 구축.
- `User` - `Asset` (1:1), `User` - `Transactions` (1:N) 등 관계 설정 및 정규화 적용.

### 2️⃣ 안정적인 주식 거래 API
- 매수/매도 프로세스에 **DB Transaction**을 적용하여 데이터 원자성 보장.
- 현금 부족, 보유 수량 부족 등 다양한 예외 케이스에 대한 유효성 검사 로직 구현.

### 3️⃣ 외부 API 한계 극복 및 캐싱 시스템
- **문제**: Alpha Vantage 무료 플랜의 호출 횟수 제한으로 인한 서비스 불안정.
- **해결**: `node-cron`을 도입하여 주기적으로 데이터를 수집하고 DB에 캐싱.
    - 한국 시간 기준 특정 시간대(11, 13, 15, 17시) 자동 업데이트.
    - 프론트엔드는 외부 API가 아닌 내부 DB를 조회하도록 변경하여 속도 및 안정성 확보.

### 4️⃣ RESTful API 구조화
- `/stocks`, `/transactions`, `/assets`, `/users` 등 리소스별 라우터 분리.
- 유지보수성을 위해 **Controller - Service - Model** 계층 구조 도입.

<br/>

## 🔥 트러블 슈팅 (Technical Issues & Solutions)

<details>
<summary><b>1. 외부 API 호출 제한으로 인한 데이터 누락 및 속도 저하</b></summary>
<div markdown="1">

- **문제 상황**: 사용자가 동시에 접속 시 Alpha Vantage API의 Rate Limit에 걸려 데이터가 `undefined`로 뜨거나 로딩이 지연됨.
- **해결 방법**:
    - 백엔드에서 `node-cron`을 이용해 정해진 시간에 주가 데이터를 수집하여 DB(`stock_prices`, `daily_stock_prices`)에 저장.
    - 클라이언트는 항상 DB의 캐싱된 데이터를 조회하도록 변경.
- **결과**: 외부 API 의존도를 낮추고 응답 속도를 획기적으로 개선함.

</div>
</details>

<details>
<summary><b>2. 자산 가치 계산 시 데이터 불일치 문제</b></summary>
<div markdown="1">

- **문제 상황**: 주식 자산 조회 시점마다 기준 가격이 달라지거나, 과거 데이터와 혼재되어 정확한 수익률 계산이 어려움.
- **해결 방법**:
    - 가장 최신의 `fetched_at` 시간을 서브쿼리로 조회하여 해당 시점의 가격(`current_price`)만을 JOIN.
    - `valuation = quantity * current_price`, `profit = valuation - (quantity * average_price)` 공식으로 일관된 기준 확립.

</div>
</details>

<details>
<summary><b>3. 잘못된 요청 데이터(Type Error)로 인한 무결성 위협</b></summary>
<div markdown="1">

- **문제 상황**: `cash`나 `quantity`에 문자열이나 `null` 값이 들어올 경우 DB 에러 발생 가능성.
- **해결 방법**:
    - 컨트롤러 단에서 1차 유효성 검증(Validation) 로직 추가.
    - 숫자가 아니거나 음수인 경우 400 Bad Request 반환하여 DB 오염 방지.

</div>
</details>

<details>
<summary><b>4. 등락률 데이터 부재 해결</b></summary>
<div markdown="1">

- **문제 상황**: API에서 전일 대비 등락률을 제공하지 않음.
- **해결 방법**: 전일 종가와 현재가를 비교하여 백엔드에서 직접 `change_rate` 계산 후 응답값에 포함. (`((curr - prev) / prev) * 100`)

</div>
</details>

<br/>

## 📸 실행 화면

| 홈 화면 | 종목 상세 |
| :---: | :---: |
| ![홈 화면](./screenshot/home.png) | ![종목 상세](./screenshot/info.png) |
| **로그인** | **자산 현황** |
| ![로그인](./screenshot/login.png) | ![자산](./screenshot/asset.png) |
| **회원가입** | **거래 내역** |
| ![회원가입](./screenshot/signup.png) | ![거래 내역](./screenshot/transaction.png) |

<br/>

## 🧱 설치 및 실행 방법 (Installation)

```bash
# 1. Repository Clone
$ git clone [https://github.com/kevinmj12/stock-simulator.git](https://github.com/kevinmj12/stock-simulator.git)

# 2. Backend Setup
$ cd backend
$ npm install

# 3. Environment Configuration (.env)
# 프로젝트 루트에 .env 파일 생성 후 아래 내용 입력
MYSQL_HOST=your_host
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password
MYSQL_DB=your_db_name
ALPHA_VANTAGE_API_KEY=your_api_key
JWT_SECRET=your_jwt_secret

# 4. Server Start
$ npm start
