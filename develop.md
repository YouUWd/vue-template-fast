## 创建项目

### 初始化

```
npm create vue@latest

```

| 功能                       | 推荐选择 |
| -------------------------- | -------- |
| TypeScript                 | ✅       |
| JSX Support                | ❌       |
| Router (SPA development)   | ✅       |
| Pinia (state management)   | ✅       |
| Vitest (unit testing)      | ❌       |
| End-to-End Testing         | ❌       |
| ESLint (error prevention)  | ✅       |
| Prettier (code formatting) | ✅       |

### 功能选择分析

1. TypeScript（推荐）

适用场景：中大型项目、团队协作、长期维护。

优势：提供静态类型检查，增强代码可维护性，减少运行时错误，提升开发效率。

建议：即使是小型项目，使用 TypeScript 也能带来更好的开发体验和代码质量。

2. JSX Support（可选）

适用场景：需要在 Vue 组件中使用 JSX 语法的项目。

优势：允许在 Vue 组件中使用 JSX 语法，适合喜欢 JSX 风格的开发者。

建议：如果您不熟悉或不需要 JSX，建议不勾选此项，以保持项目的简洁性。

3. Router (SPA development)（推荐）

适用场景：需要实现单页面应用（SPA）功能的项目。

优势：Vue Router 是 Vue.js 官方的路由管理工具，支持动态路由、嵌套路由、路由守卫等功能。

建议：如果您的应用需要页面间的导航，建议勾选此项。

4. Pinia (state management)（推荐）

适用场景：需要全局状态管理的项目。

优势：Pinia 是 Vue 3 官方推荐的状态管理库，替代了 Vuex，提供更简洁的 API 和更好的 TypeScript 支持。

建议：如果您的应用需要共享状态，建议勾选此项。

5. Vitest (unit testing)（推荐）

适用场景：需要进行单元测试的项目。

优势：Vitest 是一个快速的测试框架，与 Vite 紧密集成，支持 TypeScript 和 Vue 3。

建议：如果您计划进行单元测试，建议勾选此项。

6. End-to-End Testing（可选）

适用场景：需要进行端到端测试的项目。

优势：提供完整的用户场景测试，确保应用在真实环境中的表现。

建议：如果您的项目需要进行端到端测试，建议勾选此项。

7. ESLint (error prevention)（推荐）

适用场景：需要代码质量控制的项目。

优势：ESLint 是 JavaScript 和 TypeScript 的静态代码分析工具，帮助发现潜在的错误和不规范的代码。

建议：建议勾选此项，以提高代码质量。

8. Prettier (code formatting)（推荐）

适用场景：需要统一代码风格的项目。

优势：Prettier 是一个代码格式化工具，自动格式化代码，保持代码风格一致。

建议：建议勾选此项，以提高代码可读性和一致性。

### 选择建议

小型项目或快速原型开发：可以选择最基本的功能，如 TypeScript、Router 和 ESLint。

中大型项目或团队协作：建议选择 TypeScript、Router、Pinia、Vitest、ESLint 和 Prettier，以确保代码质量和开发效率。

需要端到端测试的项目：在上述基础上，勾选 End-to-End Testing。

### 可选功能

在使用 npm create vue@latest 创建 Vue 项目时，您可能会看到以下两个实验性功能选项：

- Oxlint（实验性）

- rolldown-vite（实验性）

这两个功能都属于实验性特性，适用于希望尝试最新技术的开发者。然而，由于它们尚处于实验阶段，可能存在不稳定性和兼容性问题。因此，建议在以下情况下选择这些功能：

- Oxlint（实验性）：如果您希望尝试一种新的、基于 Rust 的高性能 TypeScript 和 JavaScript 静态分析工具，且愿意承担可能的不稳定性。

- rolldown-vite（实验性）：如果您希望体验由 Rust 编写的下一代打包器，可能带来更快的构建速度和更低的内存占用，但请注意，它仍处于实验阶段，可能存在兼容性问题。

如果您更倾向于使用稳定的工具链，建议跳过这两个选项，使用默认的配置。这将确保您的项目在开发过程中更加稳定，减少潜在的兼容性问题。

### 示例代码

在使用 npm create vue@latest 创建 Vue 项目时，系统会询问您是否希望跳过所有示例代码，直接从空白项目开始。这意味着您将获得一个最简化的项目结构，只有必要的配置和文件，适合需要完全自定义项目结构的开发者。

✅ 适合选择“是”的场景：

完全自定义项目结构：如果您希望从零开始构建项目，完全控制文件结构和内容。

构建特定类型的应用：例如构建库、组件库或特定功能的应用，不需要默认的示例代码。

学习和实验：如果您希望深入理解 Vue 项目的构建过程，手动添加所需的功能和配置。

❌ 适合选择“否”的场景：

快速启动项目：如果您希望快速开始开发，使用 Vue 提供的默认模板可以节省时间。

需要示例代码：如果您希望查看 Vue 推荐的项目结构和示例代码，以便更快地上手。

团队协作：如果您的团队已经习惯于某种项目结构，使用默认模板可以保持一致性。

📝 小贴士：

选择“是”后，您将获得一个空白的 Vue 项目，您需要手动添加组件、路由、状态管理等功能。

选择“否”后，项目将包含 Vue 推荐的默认结构和示例代码，适合快速开发和学习。

## 开发阶段

> 下面是以一个简单的留言板系统为例，进行系统完整开发。

vue-template-fast/
├── public/
│ └── mockServiceWorker.js # MSW service worker (自动生成)
├── src/
│ ├── api/ # API 接口定义
│ │ ├── auth.ts # 认证相关接口
│ │ ├── message.ts # 留言相关接口
│ │ └── index.ts # API 配置
│ ├── assets/ # 静态资源
│ │ └── styles/
│ │ └── main.scss # 全局样式
│ ├── components/ # 组件
│ │ ├── MessageItem.vue # 留言项组件
│ │ ├── MessageList.vue # 留言列表组件
│ │ └── MessageForm.vue # 留言表单组件
│ ├── layouts/ # 布局组件
│ │ └── MainLayout.vue # 主布局
│ ├── mocks/ # MSW Mock 定义
│ │ ├── handlers/ # Mock 处理器
│ │ │ ├── auth.ts # 认证 Mock
│ │ │ └── message.ts # 留言 Mock
│ │ ├── browser.ts # Browser 环境 MSW 配置
│ │ ├── server.ts # Node 环境 MSW 配置
│ │ └── data.ts # Mock 数据
│ ├── router/ # 路由配置
│ │ └── index.ts
│ ├── stores/ # Pinia 状态管理
│ │ ├── auth.ts # 认证状态
│ │ └── message.ts # 留言状态
│ ├── utils/ # 工具函数
│ │ ├── request.ts # Axios 封装
│ │ └── storage.ts # 本地存储封装
│ ├── views/ # 页面组件
│ │ ├── Login.vue # 登录页
│ │ ├── Home.vue # 首页/留言板
│ │ └── NotFound.vue # 404页面
│ ├── App.vue
│ └── main.ts
├── .env # 环境变量
├── .env.development # 开发环境变量
├── .env.production # 生产环境变量
├── vite.config.ts # Vite 配置
└── package.json
