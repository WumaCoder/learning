# Activity

一个页面就相当于是一个Activity。



## 核心类

- AppCompatActivity
  - 继承了该类就表示是Activity
  - 需要在 onCreate 调用 setContentView 去设置UI
  - startActivity
    - 跳转到某个Activy
    - 必须传入Intent
- Intent
  - 意图
  - 用于与其他Activity通信



## 核心配置

- manifest.application.activity
  - android:name=".类名"
  - 每一个activity必须注册