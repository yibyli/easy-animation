const _ = require('lodash'),
    ReactDOM = require('react-dom');

class EasyAnimation {

    constructor(node) {
        if (node === undefined)
            throw new Error('魔法失效了,原因是魔法师不存在!')
        this.element = ReactDOM.findDOMNode(node)
        this.style = this.element.style
    }

    //当前的delay
    current_delay = null

    /**
     * 如果当前存在delay,则推入cb到当前的delay栈
     * 当前没有delay,则直接执行这个cb
     * 如果有下一个delay,则不仅推入cb到delay栈,并且替换当前的delay为传入的下一个delay
     */
    smartResolveCallbackAndDelay = (cb) => {
        if (this.current_delay)
            this.current_delay.nexts.push(cb)
        else
            cb()

        return this
    }
    /**
     * 并发的执行一些动画,动画的时间是最终指定的时间
     * 
     * @memberof EasyAnimation
     */
    animate = (params, duration) => {
        if (_.isEmpty(params))
            return
        this.smartResolveCallbackAndDelay(() => {
            this.style.transition = `all ${duration}s ease-in-out`;
            _.forEach(params, (v, k) => this.style[k] = v)
        })

        return this.delay(duration)

    }
    slideDown = (duration = 0.5) => {

        this.smartResolveCallbackAndDelay(() => {
            this.style.transition = `all ${duration}s ease-in-out`;
            this.style.transform = `scaleY(1)`
            this.style['transform-origin'] = '50% 0%';

        })

        return this.delay(duration)
    }
    slideUp = (duration = 0.5) => {

        this.smartResolveCallbackAndDelay(() => {
            this.style.transition = `all ${duration}s ease-in-out`;
            this.style.transform = `scaleY(0)`
            this.style['transform-origin'] = '50% 0%';

        })

        return this.delay(duration)
    }
    rotate = (x, duration = 1) => {
        if (x === undefined) return
        this.smartResolveCallbackAndDelay(() => {
            this.style.transition = `all ${duration}s ease-in-out`;
            this.style.transform = `rotate(${x}deg)`
        })

        return this.delay(duration)
    }
    bounce = (max = 1.5, duration = 0.5, ) => {
        this.smartResolveCallbackAndDelay(() => {
            this.style.transition = `all ${duration / 2}s ease-in-out`;
            this.style.transform = `scale(1.5)`
        })

        this.delay(duration / 2)

        this.smartResolveCallbackAndDelay(() => {
            this.style.transition = `all ${duration / 2}s ease-in-out`;
            this.style.transform = `scale(1)`
        })

        return this.delay(duration / 2)

    }
    delay = (duration) => {
        if (!(duration > 0)) return this

        //一个delay对象,保存了当前delay需要在定时器结束之后执行的所有cb
        const delay = { nexts: [] }

        this.smartResolveCallbackAndDelay(() => {
            setTimeout(() => {
                //借助函数的闭包,可以正确的执行cb,携带正确的cb
                _.forEach(delay.nexts, next => {
                    next()
                })
            }, duration * 1000);
        })

        this.current_delay = delay

        return this
    }
}

const easy = (node) => new EasyAnimation(node)

module.exports = easy