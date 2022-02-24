# Fragment

有点像组件的概念，他具备单独的生命周期，并且可以在其他的Activily上使用。

## 核心对象

- Fragment
  - 核心对象
- FragmentManager
  - 管理器
- FragmentTransaction
  - 传输器



## Fragment栈

我们可以通过，t ransaction.addToBackStack, 来实现类似页面栈的功能。



## 与 Activify 通信

### 核心

- Bundle
  - 数据传输对象，可以穿任意类型的数据

### 核心方法

- getArguments
- setArguments



## 生命周期

<img src="%E5%B0%BA%E5%AF%B8%E5%8D%95%E4%BD%8D.assets/image-20220131160958229.png" alt="image-20220131160958229" style="zoom:67%;" /> 