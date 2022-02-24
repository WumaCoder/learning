# Notification

> Notification 是用于推送信息的对象。

## 核心对象

- NotificationManager
  - 通知对象的管理中心
  - 需要从安卓系统获取
- Notification
  - 通知对象
  - 承载的通知的内容
- NotificationCompat
  - Notification 的链式风格创建器
- NotificationChannel
  - 通知渠道，在安卓O以及之后有效
  - 因为安卓O之后会有不同的通知方式，而这些方式就是渠道，他的渠道有以下类型
  - IMPORTANCE_NONE 无通知
  - IMPORTANCE_MIN 一个没有声音，没有显示的通知
  - IMPORTANCE_LOW 仅在状态栏中显示
  - IMPORTANCE_DEFAULT 有声音，并且在状态栏中显示
  - IMPORTANCE_HIGH 有弹出，有声音、并且在状态栏中显示



## 通知的属性

- title
  - 标题
  - setContentTitle
- text
  - 内容
  - setContentText
- smallIcon
  - 小图标，只能是单色（alpha）
  - setSmallIcon
- largeIcon
  - 大图标
  - setLargeIcon
- color
  - 小图片颜色
  - setColor
- intent
  - 意图，点击通知做的一些事情，这个必须是异步触发，所以他传入的值是PadingIntent
  - setContentIntent
- autoCancel
  - 是否点击后自动消失
  - setAutoCancel
- when
  - 设置通知显示的时间
  - setWhen



## 代码

```java
package com.example.frydrop;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.util.Date;

public class MainActivity extends AppCompatActivity {
    NotificationManager notifyManager;
    Notification notification;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        notifyManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);

        Log.d("Version", "Current SDK: " + Build.VERSION.SDK_INT);
    }


    public void onClick(View view) {
        NotificationCompat.Builder builder;
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
            NotificationChannel notificationChannel = new NotificationChannel("ch1", "通知一下", NotificationManager.IMPORTANCE_HIGH);
            notifyManager.createNotificationChannel(notificationChannel);
        }

        builder = new NotificationCompat.Builder(this, "ch1");

        Intent intent = new Intent(this, NotificationActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 1, intent, PendingIntent.FLAG_MUTABLE);

        notification = builder
                .setContentTitle("通知标题")
                .setContentText("通知内容")
                .setSmallIcon(R.drawable.ic_launcher_foreground)
                .setAutoCancel(true)
                .setContentIntent(pendingIntent)
                .build();
        notifyManager.notify(0, notification);
    }
}


```





## 注意

- 在`安卓10`以及之后的版本都是需要渠道（channel）去推送通知
- PendingIntent 是用于异步触发使用，在安卓12 以及之后 PendingIntent 必须传入 `PendingIntent.FLAG_MUTABLE` 或者 `FLAG_IMMUTABLE`, 来保证安全性, 如果传入 0 则会报错

```
Caused by: java.lang.IllegalArgumentException: com.example.frydrop: Targeting S+ (version 31 and above) requires that one of FLAG_IMMUTABLE or FLAG_MUTABLE be specified when creating a PendingIntent.
    Strongly consider using FLAG_IMMUTABLE, only use FLAG_MUTABLE if some functionality depends on the PendingIntent being mutable, e.g. if it needs to be used with inline replies or bubbles.
```

> [android PendingIntent理解_折翅鵬的博客-CSDN博客_android pendingintent](https://blog.csdn.net/szhupeng/article/details/119425404)





##  技巧

- 判断安卓版本的常量
  - **Build.VERSION.SDK_INT** 当前安卓SDK版本
  - **Build.VERSION_CODE.O** 安卓10