# 01-从源码里走一遍 Vue 实例化流程

## Q.0

Vue 仓库的目录结构含义是什么？

## A.0

**根目录**

```bash
total 800
-rw-r--r--    1 wmc  staff    25K  4  9 20:37 BACKERS.md
-rw-r--r--    1 wmc  staff   1.1K  4  9 20:37 LICENSE
-rw-r--r--    1 wmc  staff    19K  4  9 20:37 README.md
drwxr-xr-x    8 wmc  staff   256B  4  9 20:37 benchmarks
drwxr-xr-x   18 wmc  staff   576B  4 10 11:18 dist					# 执行npm run dev后生成的文件
drwxr-xr-x   14 wmc  staff   448B  4 10 11:18 examples			# 一些使用vue的例子，我们学习vue源码的时候也要在这里demo
drwxr-xr-x   10 wmc  staff   320B  4  9 20:37 flow					# flow 类型声明文件
drwxr-xr-x  881 wmc  staff    28K  4  9 20:41 node_modules
-rw-r--r--    1 wmc  staff   5.4K  4 10 11:18 package.json
drwxr-xr-x    6 wmc  staff   192B  4  9 20:37 packages			# vue其他的工具，学习源码不看
drwxr-xr-x   12 wmc  staff   384B  4  9 20:37 scripts				# 打包构建的脚本
drwxr-xr-x    8 wmc  staff   256B  4  9 20:37 src						# 源码，非常重要
drwxr-xr-x    7 wmc  staff   224B  4  9 20:37 test					# 测试文件
drwxr-xr-x   11 wmc  staff   352B  4  9 20:37 types					# ts 类型声明
-rw-r--r--    1 wmc  staff   336K  4  9 20:37 yarn.lock
```

**src**

```bash
src
├── sfc												# 将单文件组件（*.vue）文件解析为SFC描述符对象
├── shared										# 公共的一些工具
├── platforms 								# 不同平台的DOM操作，我们只需要看web
│   ├── weex
│   │   ├── util
│   │   ├── compiler
│   │   └── runtime
│   └── web
│       ├── server						# 与SSR有关，暂时不看
│       ├── compiler					# 编译器，他扩展了 src/compiler 功能
│       ├── util							# 工具函数
│       └── runtime						# 运行时要执行的函数，这里与patch有很大关系
├── core											# Vue核心代码
│   ├── components						# 提供的组件 如：keep-alive
│   ├── global-api						# 提供的全局API，如：Vue.use
│   ├── observer							# 响应式相关
│   ├── vdom									# 虚拟dom相关
│   │   ├── modules
│   │   └── helpers
│   ├── util
│   └── instance							# Vue 实例化相关，下面要详细说
│       └── render-helpers
├── compiler									# template 编译器
│   ├── codegen
│   ├── directives
│   └── parser
└── server										# SSR 相关
    ├── webpack-plugin
    ├── bundle-renderer
    ├── template-renderer
    └── optimizing-compiler
```

## Q.1

`new Vue()` 的时候，做了些什么？

## A.1

![生命周期](https://cn.vuejs.org/images/lifecycle.png)

首先我们打开`vue/src/core/instance/index.js` 这个文件， 并且结合生命周期图来学习

```js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  } // 忽略提醒
  this._init(options)
  // Vue在实例化的时候会执行，this._init这个方法，并且将options传入
  // 我们可以在initMixin里找到这个函数
}

initMixin(Vue) // 混入初始化函数 _init
stateMixin(Vue) // 混入状态相关的实例 $set $delete $data $props $watch
eventsMixin(Vue) // 混入事件相关的实例函数 $on $off $once $emit
lifecycleMixin(Vue) // 混入有关组件生命的实例函数 _update $forceUpdate $destroy
renderMixin(Vue)	// 混入渲染相关的函数 $nextTick _render 和一些帮助函数

export default Vue
```

接下来我们来看`this._init(options)`执行的内容，这里我们打开`vue/src/core/instance/init.js`这个文件也就是initMixin

```js
/* @flow */

import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'

let uid = 0

export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this // 只要看到vm就表示vue的实例
    // a uid
    vm._uid = uid++ // 生成一个唯一ID

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {...}

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) { // 当这个是组件的时候
 			// 优化内部组件实例化 
      // 由于动态选项合并非常慢，并且没有 
      // 内部组件选项需要特殊处理。
      initInternalComponent(vm, options) // 这里会对选项进行处理 比如：vm.$options._parentListeners ... 就是在这里创建的
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor), // 拿到 Vue.options
        options || {},
        vm
      ) // 最后得到选项
    } 
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm) // 这里会将当前的vm浅拷贝给vm._renderProxy, 这个属性会在执行vm.$options.rander.call的时候，作为第一个参数传入这样在渲染函数里就可以访问到vm了
    } else {...}
    // expose real self
    vm._self = vm
    initLifecycle(vm) // 这里会做一些有关组件生命开始的事情，比如初始化vm.$parent vm.$root ... 等
    initEvents(vm) // 这里会进行事件相关的初始化，最终执行完成后会在vm._events里看到所有的事件
    initRender(vm) // 这里会做挂载一些有关渲染的函数和对vm.$attrs和vm.$listeners的响应式挂载，如vm.$createElement vm._c
    callHook(vm, 'beforeCreate') // 调用钩子函数
    initInjections(vm) // resolve injections before data/props // 与下面的initProvide对应
    initState(vm)	// 对数据进行响应式 比如 vm.$data vm.$props ...
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created') // 调用钩子函数

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false) // 格式化名字
			...
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el) // 如果传入了el则调用$mount进行挂载操作
   															// $mount 里会进行渲染vnode
    }
  }
}

export function initInternalComponent (vm: Component, options: InternalComponentOptions) {...}

export function resolveConstructorOptions (Ctor: Class<Component>) {...}

function resolveModifiedOptions (Ctor: Class<Component>): ?Object {...}
```



到这里我们已经完成了对Vue实例化的源码分析，具体细节可以继续深入查看各个子函数的功能，在学习的过程中可以结合着官网的 生命周期图 来学习，

