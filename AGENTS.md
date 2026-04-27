# 项目概览

这是一个基于 Next.js 16 的个人博客系统，支持文章分类和全文搜索功能。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **数据库**: PostgreSQL + Supabase + Drizzle ORM
- **样式**: Tailwind CSS + shadcn/ui
- **包管理**: pnpm

## 核心功能

### 1. 文章管理
- 文章列表展示（支持分页）
- 文章详情页
- Markdown 内容渲染

### 2. 分类系统
- 按分类筛选文章
- 分类统计文章数量
- 侧边栏快速访问

### 3. 标签系统
- 文章标签管理
- 按标签筛选
- 标签云展示

### 4. 全文搜索
- 基于 PostgreSQL 全文搜索 (GIN 索引)
- 支持标题和内容搜索
- 高亮关键词

## 页面路由

| 路径 | 描述 |
|------|------|
| `/` | 首页，展示最新文章 |
| `/blog` | 博客列表，支持分页 |
| `/blog/[slug]` | 文章详情页 |
| `/category/[slug]` | 分类文章列表 |
| `/tag/[slug]` | 标签文章列表 |
| `/search?q=xxx` | 搜索结果页 |

## API 接口

| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/posts` | GET | 获取文章列表，支持 category、tag、page 参数 |
| `/api/posts/[slug]` | GET | 获取单篇文章 |
| `/api/categories` | GET | 获取分类列表及统计 |
| `/api/tags` | GET | 获取标签列表及统计 |
| `/api/search` | GET | 全文搜索，支持 q 参数 |

## 数据库表结构

### categories (分类表)
- `id`: 主键
- `name`: 分类名称
- `slug`: URL 友好的标识符
- `description`: 描述
- `created_at`: 创建时间

### tags (标签表)
- `id`: 主键
- `name`: 标签名称
- `slug`: URL 友好的标识符
- `created_at`: 创建时间

### posts (文章表)
- `id`: 主键
- `title`: 文章标题
- `slug`: URL 友好的标识符
- `content`: 文章内容 (Markdown)
- `excerpt`: 文章摘要
- `cover_image`: 封面图片
- `category_id`: 分类 ID
- `published`: 是否发布
- `created_at`: 创建时间
- `updated_at`: 更新时间
- `fts`: 全文搜索向量

### post_tags (文章标签关联表)
- `post_id`: 文章 ID
- `tag_id`: 标签 ID

## 开发命令

```bash
# 安装依赖
pnpm install

# 开发环境
pnpm dev

# 构建生产版本
pnpm build

# 启动生产环境
pnpm start
```

## 注意事项

1. 数据库迁移使用 `coze-coding-ai db upgrade`
2. Schema 同步使用 `coze-coding-ai db generate-models`
3. 静态检查使用 `pnpm lint`
