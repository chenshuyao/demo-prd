# 学生管理系统 (Student Management System)

本项目是一个完整的学生管理系统，包含前端和后端实现。前端使用Next.js框架，后端使用Spring Boot框架。

## 项目结构 (Project Structure)

```
demo-prd/
├── backend/                # 后端项目
│   └── student-management/ # Spring Boot应用
│       ├── src/            # 源代码
│       └── pom.xml         # Maven配置文件
└── frontend/               # 前端项目
    ├── src/                # 源代码
    ├── package.json        # NPM配置文件
    └── next.config.ts      # Next.js配置文件
```

## 技术栈 (Technology Stack)

### 后端 (Backend)
- Spring Boot 3.x
- Spring Data JPA
- H2数据库 (开发环境)
- Maven

### 前端 (Frontend)
- Next.js 15.x
- React 19.x
- TypeScript
- Tailwind CSS

## 功能特性 (Features)

- 学生信息管理 (CRUD操作)
- 分页显示学生列表
- 搜索功能
- 表单验证
- 响应式UI设计

## 部署指南 (Deployment Guide)

### 后端部署 (Backend Deployment)

1. 确保已安装Java 17或更高版本和Maven
   ```bash
   java -version
   mvn -version
   ```

2. 进入后端项目目录
   ```bash
   cd backend/student-management
   ```

3. 编译并打包项目
   ```bash
   mvn clean package
   ```

4. 运行应用
   ```bash
   java -jar target/student-management-0.0.1-SNAPSHOT.jar
   ```

   或者使用Maven运行
   ```bash
   mvn spring-boot:run
   ```

5. 后端服务将在 http://localhost:8080 上运行

### 前端部署 (Frontend Deployment)

1. 确保已安装Node.js 18或更高版本
   ```bash
   node -v
   npm -v
   ```

2. 进入前端项目目录
   ```bash
   cd frontend
   ```

3. 安装依赖
   ```bash
   npm install
   ```

4. 开发模式运行
   ```bash
   npm run dev
   ```

5. 构建生产版本
   ```bash
   npm run build
   ```

6. 运行生产版本
   ```bash
   npm run start
   ```

7. 前端应用将在 http://localhost:3000 上运行

## 开发指南 (Development Guide)

### 后端开发 (Backend Development)

1. 数据库配置在 `application.properties` 文件中
2. 主要类:
   - `StudentManagementApplication.java`: 应用入口
   - `Student.java`: 学生实体类
   - `StudentRepository.java`: 数据访问接口
   - `StudentService.java`: 业务逻辑层
   - `StudentController.java`: REST API控制器

### 前端开发 (Frontend Development)

1. 主要组件:
   - `StudentList.tsx`: 学生列表组件
   - `StudentForm.tsx`: 学生表单组件(创建/编辑)
   - `StudentDetail.tsx`: 学生详情组件
   - `studentApi.ts`: API调用服务

2. 页面:
   - `/`: 学生列表页
   - `/students/new`: 创建学生页
   - `/students/[id]`: 学生详情页
   - `/students/[id]/edit`: 编辑学生页

## 需求文档 (Requirements)

### 学生实体 (Student Entity)

学生实体包含以下字段:
- 姓名 (name): 字符串，最大长度64，必填
- 性别 (gender): 字符串，最大长度8，必填
- 电话 (phone): 字符串，最大长度16，必填
- 年龄 (age): 整数，非负，必填
- 专业 (major): 字符串，最大长度128，必填
- 籍贯 (nativePlace): 字符串，最大长度64，选填
- 邮箱 (email): 字符串，最大长度32，选填
- 标签 (tag): 字符串，最大长度512，选填
- 备注 (remark): 字符串，最大长度512，选填

### API接口 (API Endpoints)

#### 学生管理接口

- `GET /api/students`: 获取学生列表，支持分页
- `GET /api/students/{id}`: 获取单个学生详情
- `POST /api/students`: 创建新学生
- `PUT /api/students/{id}`: 更新学生信息
- `DELETE /api/students/{id}`: 删除学生
- `GET /api/students/search`: 搜索学生，支持按姓名、电话或邮箱搜索

### 前端页面 (Frontend Pages)

- 学生列表页: 显示所有学生，支持分页、搜索和操作按钮
- 学生详情页: 显示单个学生的详细信息
- 创建学生页: 提供表单创建新学生
- 编辑学生页: 提供表单编辑现有学生信息

## 许可证 (License)

本项目采用MIT许可证。详情请参阅LICENSE文件。
