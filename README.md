### 1. 介绍

适用于React.js的前端动画小插件,支持链式语法,类似于JQuery的动画。

### 2. 安装

```

npm install easy-animation

```

### 2. 使用

```
class Test extends Component {
    _handleButtonEvents = (type, e) => {
        //先得到动画对象,然后依次执行
        easy(this.div).slideUp().slideDown()
    }

    render() {
        return (
            <div>
                <button onClick={this._handleButtonEvents.bind(this, 'test')}>
                    动画
                </button>
                <div id="div" ref={node => this.div = node} style={{ width: 300, height: 300, backgroundColor: 'red', margin: '0 auto' }}>
                </div>
            </div>
        );
    }
}       

```

### 3. API

> 动画时间都是秒为单位,所有的动画都会返回动画对象,

获得动画对象

```
easy(通过ref获得的react节点)

```

slideUp

```
slideUp(动画时间)


```
slideDown

```
slideUp(动画时间)


```

animate,同时执行多个动画

```
animate(动画内容,动画时间)

easy(通过ref获得的react节点).animate({
    width:'120px',
    height:'120px'
},1)

```

bounce,弹性缩放

```

bounce(最大尺寸,动画时间)

```

delay,延迟

```

delay(动画时间)

```
