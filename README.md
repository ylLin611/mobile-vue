# 移动端H5工程

[TOC]

## 概述

一个使用 create-preset 创建的 Vue3 + Ts + Vite 的项目,此工程主要目的：
- 基于此模板进行H5项目开发

## 启动方式

目前工程使用node版本为`16.12.0`.
- 拉代码到本地
- `cd mobile-vue`
- `npm i`
- `npm run dev`

## 操作日志

### 2022.09.07
- `src/router/routes/index.ts`只留下home路由
- 删除`views/foo`
- 删除`components`下文件
- `npm i amfe-flexible postcss-pxtorem`做移动端适配
- 去掉`eslint.js`中的`prettier/prettier`,prettierrc 中添加校验规则
- 添加 axios，封装 axios

### 2022.11.1
- 添加 vant
- axios 添加请求拦截
- 添加全局 loading
- 体积分析 https://blog.csdn.net/g18204746769/article/details/127431733
