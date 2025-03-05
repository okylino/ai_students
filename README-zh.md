# ClassSwift 学生端网页

---

## 环境要求

- Node.js >= 16
- Yarn

---

## 技术栈

- [React](https://react.dev/): 用于构建用户界面
- [TypeScript](https://www.typescriptlang.org/): 用于类型安全的 JavaScript 开发
- [Styled Components](https://styled-components.com/): CSS-in-JS 样式解决方案
- [MUI](https://mui.com/): 组件库(本项目配置使用 styled-components 引擎)
- [Prettier](https://prettier.io/): 代码格式化工具
- [ESLint](https://eslint.org/): 代码质量检查工具
- [Redux Toolkit](https://redux-toolkit.js.org/): 状态管理
  - 遵循 [Redux 风格指南](https://redux.js.org/style-guide) 以保持代码的一致性和可维护性
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview): 数据获取和缓存
- [Axios](https://axios-http.com/docs/intro): HTTP 请求工具
- [SocketIO](https://socket.io/): 实时通信

---

## 前端开发指南

[前端开发指南](https://outline.universe-vs.org/doc/frontend-guideline-VUIg46aMUz) 包含：

- 组件结构和命名
- 样式规范。开发前请参考此指南。

---

## 项目结构

### 主要部分

1. **`src/`**: 新版本代码，用于活跃开发
2. **`fishing_cat_src/`**: 遗留代码，用于参考和重构

### 目录结构

```
src/
├── api/
│   ├── models/         # API 请求/响应接口
│   └── services/       # API 服务实现
├── assets/             # 静态资源
├── components/         # React 组件
│   └── svgr/          # SVG 组件
│   ├── pages/         # 页面级组件
│   └── prototypes/    # 可复用的基础组件
├── enums/             # 枚举定义
├── hooks/             # 自定义 React hooks
├── i18n/              # 本地化文件
├── layouts/           # 布局组件
├── pages/             # 页面组件
├── redux/             # Redux 状态管理
│   ├── store/         # Store 配置
│   └── slices/        # Reducer 逻辑
├── router/            # 路由配置
├── service/           # 辅助服务
├── styles/            # 通用/全局样式
├── types/             # TypeScript 类型定义
└── utils/             # 工具函数
```

---

## 命名规范

### 组件文件夹结构

- 组件文件夹名称应该**首字母大写**
- 每个组件都应该有自己的文件夹，并遵循以下结构：

- `components/Foo/`
  - `index.ts`
  - `Foo.tsx`
  - `Foo.style.ts`
  - `Foo.type.ts`

### 非组件文件

- 非组件文件使用**小写**命名（如工具类文件）
- 示例：
  ```
  utils/helper.js
  config/settings.js
  ```

这样可以清晰区分组件文件和非组件文件。

---

## 资源文件

### SVG 组件

将用作组件的 SVG 文件放在：`/src/assets/svgr/**/*.svg`

### 其他资源

对于没有特定规则的其他资源

## 国际化（I18n）

### 结构

```
src/i18n/
├── i18n.ts                 # i18n 配置
└── locales/
    ├── resources.ts        # 动态加载设置
    ├── {language}/         # 必须匹配 LANGUAGE 枚举
    │   ├── {nameSpace}.json # 必须匹配命名空间
```

### 注意事项

1. **语言文件夹**
   - 必须匹配 `LANGUAGE` 枚举值
   - 示例：`LANGUAGE.ZH = 'zh'` → 文件夹必须命名为 `zh`
2. **命名空间文件**
   - 每个语言文件夹必须包含所有命名空间文件
   - 文件名必须匹配命名空间名称
   - 将共享的翻译放在 `common.json` 中

### 添加新语言

1. 在 `LANGUAGE` 枚举中添加新值
2. 创建包含所有命名空间文件的语言文件夹
3. 更新 `resource.ts` 中的命名空间列表以支持动态加载
4. 更新语言选择选项

---

## API

API 拦截器：

- 将 API 响应数据转换为小驼峰命名
- 将 API 请求数据转换为蛇形命名

## 本地开发 OIDC 登录

要为本地开发设置 OIDC 登录，请更新以下变量并在端口 3000 上运行应用程序：

```
# node 环境
VITE_NODE_ENV=local
...

# ViewSonic OIDC 配置
...
VITE_OIDC_REDIRECT_URI=http://localhost:3000/auth/callback
VITE_OIDC_POST_LOGOUT_REDIRECT_URI=http://localhost:3000/auth/logout
```
