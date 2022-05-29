// 自定义全局指令

export const imageerror = {
  // 当被绑定该指令的元素插入节点时触发
  inserted(dom, options) { // dom是当前指令作用的dom对象, options是指令变量的解释，有一个属性value
    dom.src = dom.src || options.value
    dom.onerror = function() {
      // 当图片地址没有加载成功时，触发onerror事件
      dom.src = options.value
      // a
    }
  },
  // 绑定了此指令的组件每一次更新时触发此函数
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}

