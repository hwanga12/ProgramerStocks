요청하신 내용을 바탕으로 **Problems & Solutions** 섹션을 상세하게 확장하고, 코드 스니펫을 포함하여 가독성 있게 정리했습니다. 또한 **협업 방식**, **배운 점**, **마무리** 섹션까지 모두 포함하여 하나의 완벽한 `README.md`로 통합해 드립니다.

아래 내용을 복사하여 그대로 사용하세요.

-----

````markdown
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

## 🧩 Problems & Solutions (Detailed)

### 1. 실시간 시세 API 호출 제한으로 인한 서비스 불안정
**문제**: 초기에는 프론트에서 직접 Alpha Vantage API를 호출하도록 구현했으나, 무료 플랜 호출 제한(API Limit)으로 인해 다중 접속 시 데이터가 누락되거나(`undefined/null`) 서비스가 중단되는 현상 발생.

**해결**:
- 백엔드에서 주기적으로 데이터를 수집하고 DB에 캐싱하도록 구조 전환.
- `node-cron`을 활용해 한국 시간 기준 장 운영 시간대(밤 11시~새벽 5시)에 가격 수집.
- 프론트는 외부 API가 아닌 DB를 조회하도록 변경하여 안정성 확보.

```javascript
// 시간별 가격 수집 (장 운영 시간 고려)
cron.schedule("0 14,16,18,20 * * *", async () => { ... });

// 일별 종가 수집
cron.schedule("0 0 * * *", async () => { ... });
````

### 2\. 주식 자산 계산 시 데이터 불일치 문제

**문제**: 사용자의 자산 조회 시 기준 가격이 명확하지 않아, 조회 시점마다 결과가 달라지거나 최신 가격을 가져오지 못해 수익률 계산 오류 발생.

**해결**:

  - 종목별 최신 `fetched_at` 시간을 서브쿼리로 조회하여 해당 시간의 가격만 JOIN.
  - 일관된 기준으로 자산 및 수익률 계산 로직 정립.

<!-- end list -->

```javascript
// 자산 가치 및 수익률 계산 로직 통일
const valuation = h.quantity * h.current_price;
const profit = valuation - h.quantity * h.average_price;
```

### 3\. 잘못된 요청으로 인한 데이터 무결성 위험

**문제**: 사용자가 `cash`나 `quantity`에 문자열, `null`, `undefined` 등 비정상적인 값을 전송할 경우 DB에 잘못된 데이터가 저장될 위험 존재.

**해결**:

  - 서버 진입점(Controller)에서 모든 중요한 값을 1차 검증.
  - 숫자가 아니거나 필수 값이 누락된 경우 즉시 400 에러 반환.

<!-- end list -->

```javascript
// 유효성 검사 예시
if (cash === undefined || isNaN(cash)) {
  return res.status(400).json({ error: "cash는 숫자여야 합니다" });
}
```

### 4\. 주식 등락률 계산 로직 부재

**문제**: 외부 API에서 등락률(%) 데이터를 제공하지 않음. 전일 종가(`daily_stock_prices`)와 실시간 가격(`stock_prices`)을 비교해야 하는데, 데이터가 없으면 계산 에러 발생.

**해결**:

  - 백엔드에서 전일 종가와 최신 가격을 안전하게 비교하는 유틸리티 함수 구현.
  - `change_rate`를 계산해서 응답 객체에 포함시켜 프론트 연산 부담 제거.

<!-- end list -->

```javascript
function calculateChangeRate(prevPrice, currPrice) {
  if (!prevPrice || !currPrice || prevPrice === 0) return null;
  // 소수점 첫째 자리까지 등락률 계산
  return parseFloat((((currPrice - prevPrice) / prevPrice) * 100).toFixed(1));
}
```

### 5\. 기능 증가로 인한 코드 복잡도 상승

**문제**: 자산 조회, 종목 조회, 가격 수집 등 기능이 하나의 파일에 섞이면서 유지보수성과 가독성 저하.

**해결**:

  - 각 기능을 명확히 분리하고 RESTful 구조 적용.
  - SQL 쿼리와 비즈니스 로직을 분리하여 확장성 확보.

<!-- end list -->

```javascript
// Controller 모듈화
exports.getStockList = ...
exports.getStockDetail = ...
exports.getMyAssets = ...
exports.updateCash = ...
```

### 6\. 수동 운영 → 자동화 시스템

**문제**: 초기에는 데이터를 수동으로 갱신해야 했기 때문에 실제 라이브 서비스 운영에는 부적합.

**해결**:

  - `cron` 기반 자동 수집 시스템을 구축하여 서버가 실행 중이면 자동으로 데이터 업데이트.
  - 실제 서비스 운영 환경과 유사한 자동화 구조 구현.

<br>

## 🤝 협업 방식

  - **GitHub Flow**: `main`(배포), `dev`(개발), `feature/#issue`(기능) 브랜치 전략 사용.
  - **Code Review**: Pull Request를 통한 코드 리뷰 진행 후 Merge.
  - **Commit Convention**: `feat`, `fix`, `chore`, `docs` 등 커밋 메시지 규칙 통일.

<br>

## 📚 프로젝트를 통해 배운 점

  - **실시간 데이터 처리**: 주식 시장 데이터의 특성을 이해하고 캐싱 전략을 통해 API 제한을 극복하는 방법.
  - **데이터 무결성**: 백엔드 트랜잭션 처리(ACID)와 철저한 유효성 검사의 중요성.
  - **보안**: JWT를 이용한 인증 처리 및 사용자 정보 보호 설계.
  - **인프라**: AWS EC2 인스턴스에 서버를 배포하고 Nginx와 PM2로 운영하는 실무 경험.

<br>

## 📸 실행 화면

| 홈 화면 | 종목 상세 |
| :---: | :---: |
|  |  |
| **로그인** | **자산 현황** |
|  |  |
| **회원가입** | **거래 내역** |
|  |  |

<br>

## 🧱 설치 및 실행 방법 (Installation)

```bash
# 1. Repository Clone
$ git clone [https://github.com/kevinmj12/stock-simulator.git](https://github.com/kevinmj12/stock-simulator.git)

# 2. Backend Setup
$ cd backend
$ npm install

# 3. Environment Configuration (.env)
MYSQL_HOST=...
MYSQL_USER=...
ALPHA_VANTAGE_API_KEY=...
JWT_SECRET=...

# 4. Server Start
$ npm start
```

<br>

## 🏁 마무리

이 프로젝트는 실시간 주식 시세와 트랜잭션 기반 매수/매도 시뮬레이션을 구현하며 **실제 서비스처럼 작동하는 구조**를 만드는 데 집중했습니다.

백엔드 전반을 구현하며 실무 감각을 익힐 수 있었고, **EC2 Instance 서버 배포 경험**을 통해 개발부터 배포까지의 전체 사이클을 경험할 수 있었습니다. 또한 팀원과의 소통 및 Git 기반 협업 경험도 큰 자산이 되었습니다.

-----

```
```
