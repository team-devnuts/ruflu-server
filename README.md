# Ruflu
원하는 상대와 매칭되면 대화할 수 있는 데이팅 앱 RESTful Api

### 안드로이드 1:1 데이팅 어플

### 프로젝트 소개

안드로이드 어플 배포 및 운영 목적으로 시작한 프로젝트입니다. 코로나 팬데믹 시대에 자유롭게 만날 수 있는 환경이 제한되고, 모바일, 소셜 네트워크로 소통하는 방식이 익숙한 MZ세대 사용자들을 위해 편리하고 다양한 만남을 위한 앱 서비스입니다. On-premise 자체 백엔드 서버를 구성할 목적으로 개발 서버를 구축했고, Linux centos 8, nignx, Chatting 서비스를 위한 Node.js 웹소켓 서버와 express.js로 RESTful API 서버가 있습니다.

### 1. 프로젝트 설명

-   스프링부트 웹 기반 ERP 프로그램 개발
-   기간 : 2022.07 ~ 2023.06
-   팀 인원 : 2명

#### 기술 스택
View : Native Android OS

Language : javascript CommonJS

Web Application FreameWork : express.js

Chatting : Socket.io

Web Server : nginx, node

Database : Mysql, monogoDB

OS : linux centos 8

Tool : github, git, Notion, Slack, Intelij, Android Studio, Figma, Npm

External Api : Firebase Cloud Messaging, Google OAuth2

Test : jest

Lib : eslint, nodemon, jsonwebtoken

### 2. Ruflu - 1:1 데이팅 어플

- 프로젝트 기여도 : 50%
- 역할 : AOS & Backend 개발
- 담당 업무
  - Backend RESTful API 설계 및 개발
  - ERD 설계 및 Database 구축
  - Linux 개발 서버 환경 구축
  - 좋아요, 1:1 매칭, 채팅, 알람, GPS 거리 측정, 회원 가입 및 이미지 업로드 백엔드 개발
  - Native Andorid 회원 정보 조회 화면 구성
- 공동 작업
  - 화면 레이아웃 구성
 
### 3. 개발관련 설명

#### On-Promise 선택의 이유?
AWS와 같은 클라우드 환경을 이용하지 않고, 자체 서버를 구축하려한 이유는 클라우드 환경과 네트워크 지식을 알고 있는 정도가 얕았습니다. AWS 클라우드 환경을 이용하기엔 따로 학습할 내용이 많다고 생각했으며 다른 학습할 기술들이 많다는 것이 이유 증 하나입니다. AOS 뿐만 아니라 Linux 환경과 Node.js, express.js, 네트워크 지식까지 학습해야했습니다.

또 다른 한가지 이유는 인프라를 학습하기 위해선 AWS와 같이 자동으로 구성해주는 클라우드 서비스보단 수동으로 작업하며 오류를 해결보고 부딪히는 방식이 직접적인 방식이 좋다고 생각했습니다. 그리고 Linux는 회사에서 사용하고 있어 익숙한 OS였습니다. 환경 구축, 배포, 운영, 모니터링까지 자동으로 해주는 AWS 방식이 전부 수동으로 설정하고 구성하는 것보다 개발 속도는 빠르지만, 네트워크 지식을 어느정도 갖추어야 한다고 생각했습니다.

#### nginx와 Node.js, Express.js 구성
서비스 앱에서 중요한 점은 트래픽 처리라고 생각했습니다. 트래픽 처리 성능을 높이기 위해선 다양한 방식이 있겠지만 Nignx도 동시 커넥션 수가 늘어날 때 성능이 다른 웹서버에 비해서 월등히 좋기 때문에 선택했습니다. 
Node.js와 Express.js는 API를 만들기에 적합하다고 생각했기 때문에 선택했습니다. Node.js는 동시성을 다루는 능력이 뛰어나고, Express.js는 비교적 쉽게 웹 어플리케이션 개발을 할 수 있습니다. 앱 특성상 비동기 방식이 많다는 것을 생각하여 해당 기술들을 선택했습니다.

#### 개발 중단의 이유와 앞으로의 계획
개발 중단의 이유는 보통의 이유인 길어지는 개발 기간과 취업, 이직, 시간, 역량 등 다양한 상황인 것 같습니다. 비록 개발을 멈췄지만 시도를 해봤기 때문에 후회가 되진 않습니다. 개발을 하면서 겪었던 문제와 경험들은 축적되고, 경험들은 다른 프로젝트를 할 때 저에게 다시 도움이 됩니다. 그래서 현재 주니어 개발자인 저에겐 시도하는 것만으로도 큰 성장을 준다고 생각합니다. 
지금은 개발을 하지 않고 있지만 후에 다시 진행할 예정입니다. AWS로 서버 환경을 바꾸고, Spring Boot + Node를 선택해서 서비스를 분리하고 MSA 방식을 생각하고 있습니다.

### 문서
#### API 명세서
- [API 명세서 - 노션](https://wild-path-bab.notion.site/API-5f604020e4684f7fba1e8389f9ffab3b?pvs=74)

#### ERD
![image](https://github.com/team-devnuts/ruflu-server/assets/73459956/1f20bfb5-3840-420f-8eae-f95225eb4585)

