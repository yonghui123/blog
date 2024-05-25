---
title: 初始化canvas
date: 2024-05-25
cover:
categories:
  - 前端
tags:
  - Canvas
description: 初始化canvas，渲染出图形，文字等信息
---

## 初始化 canvas 执行环境

```javascript
let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
```

## Canvas 操作

### 绘制基础的图元

```javascript
ctx.beginPath(); // 新建一条路径，生成之后图形绘制命令被指向到路径上生成路径
ctx.moveTo(10, 10); // 将画笔移动到（10， 10）的位置
ctx.lineTo(20, 20); // 画笔落到画布上开始构建一条从（10， 10）到（20， 20）的直线
ctx.arc(60, 60, 30, 0, Math.PI, true); // 构建一条以（60， 60）为圆心，30为半径的，从0deg到180deg的，按照顺时针来生成一条圆弧
ctx.quadraticCurveTo(10, 10, 30, 30); // 构建一条二次贝塞尔曲线，该曲线以（10， 10）为控制点，（30， 30）为结束点
ctx.bezierCurveTo(15, 15, 20, 20, 40, 40); // 构建一条三次贝塞尔曲线，该曲线需要两个控制点，分别是（15， 15），（20， 20）
```

### 设置图形的属性

1. 设置颜色

```javascript
let color = "#000000"; // 设置颜色，可以是css颜色字符串(颜色值，rgb或者rgba)，渐变色，或者图案对象
ctx.fillStyle = color; // 设置图形的填充颜色
ctx.strokeStyle = color; // 设置图形的边框颜色
```
一旦设置了两个颜色值，那么后续绘制的图形颜色都会使用当前设置的值，如果想要不同颜色，需要重新设置两个值

### path2D

使用 path2D 对象来记录路径

```javascript
// 使用path2D对象来记录路径，
let rectangle = new Path2D();
rectangle.rect(10, 10, 50, 50);
```

如果一条路径中有多个元素，可以使用 addPath 来添加

### 绘制 canvas 路径

具体步骤：
首先，需要创建路径起始点。
然后使用画图命令去画出路径。
之后把路径封闭。
一旦路径生成，就能通过描边或填充路径区域来渲染图形。

```javascript
ctx.beginPath();
ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
ctx.moveTo(110, 75);
ctx.arc(75, 75, 35, 0, Math.PI, false); // 口 (顺时针)
ctx.moveTo(65, 65);
ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
ctx.moveTo(95, 65);
ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
ctx.stroke();
```
