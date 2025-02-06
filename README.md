# AIAGENT-RECOMI

## 项目结构

```bash
├── README.md                   # 项目说明文档
├── apps                        # 应用程序文件夹
│   └── recomi-app              # recomi前端应用
│       ├── src                 # 源代码
│       │   ├── components      # 组件文件夹
│       │   ├── hooks           # 自定义 Hooks
│       │   ├── App.tsx         # 应用主文件
│       │   ├── main.tsx        # 应用入口文件
│       │   ├── style.css       # 全局样式
│       │   ├── utils           # 工具函数
│       │   └── types           # 类型声明文件
│       ├── package.json        # 应用配置
│       ├── tsconfig.json       # TypeScript 配置
│       ├── vite.config.ts      # Vite 配置
│   └── recomi-test             # recomi测试项目
│   └── recomi-configuration    # recomi配置平台前端项目
├── packages                    # 内部共享包
│   ├── eslint-config           # ESLint 配置包
│   ├── recomi-sdk              # recomi SDK 包
│   ├── tailwind-config         # Tailwind 配置包
│   ├── typescript-config       # TypeScript 配置包
│   └── ui                      # UI 组件库
├── package.json                # 根项目配置
```

## 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.15.0

## 安装依赖

使用 pnpm 安装项目依赖，若未安装 pnpm，请参考 [pnpm官网安装指南](https://pnpm.io/installation#using-npm)。

```bash
pnpm i
```

## 配置环境变量

1. 在 `apps/recomi-app/` 目录下创建 `.env.local` 文件，并填入以下内容：

    ```text
    VITE_API_KEY=your_ApiKey
    ```

    **注意：**
    - 前置的团队创建与订阅分配等操作，请参考 [Powerdrill Teamspace文档](https://docs.powerdrill.ai/enterprise/workspaces)。
    - 本地开发所需的 `API_KEY` 可在 [Powerdrill 测试环境](http://10.107.0.210:3000/teamspace) 生成。
    - `API_KEY` 为Project维度的`API_KEY`，详情参考 [Powerdrill OpenAPI 文档](https://docs.powerdrill.ai/api-reference/overview)。

2. 在 `packages/recomi-sdk/` 目录下创建 `.env.local` 文件，并填入以下内容：

    ```text
    VITE_API_KEY=your_ApiKey
    VITE_USER_ID=your_userID
    ```

    **注意：**
    - `API_KEY` 与上述相同。
    - `USER_ID` 可在 [Teamspace 用户管理页面](http://10.107.0.210:3000/teamspace) 查看。该用户必须属于与 `API_KEY` 对应的项目。

## 本地开发流程

**提示：** 请按顺序执行每一步，并在独立的终端窗口中运行命令，以确保端口号和环境变量正确匹配。

1. 在终端中打包 `recomi SDK` 生成 JS 文件：

    ```bash
    cd packages/recomi-sdk
    pnpm build:dev
    ```

2. 在新的终端窗口中，启动 `recomi SDK` 测试网站：

    ```bash
    cd packages/recomi-sdk
    pnpm dev
    ```

3. 在另一个终端窗口中，启动 `recomi 前端应用`：

    ```bash
    cd apps/recomi-app
    pnpm dev
    ```

完成以上步骤后，你可以通过访问 [http://localhost:5173](http://localhost:5173) 来查看 `recomi SDK` 测试网站。

## 代码规范

- 使用 [ESLint](https://eslint.org/) 进行代码检查。
- 使用 [Prettier](https://prettier.io/) 进行代码格式化。

## 贡献指南

1. Fork 本项目。
2. 创建一个新的分支：

    ```bash
    git checkout -b feature/my-feature
    ```

3. 提交你的修改：

    ```bash
    git commit -m 'Add some feature'
    ```

4. 推送到远程分支：

    ```bash
    git push origin feature/my-feature
    ```

5. 创建 Pull Request，等待审查。

---

这个版本的 `README.md` 在结构上进行了优化，使得内容更加简洁易懂，并且突出关键操作步骤，便于开发者快速上手和贡献代码。