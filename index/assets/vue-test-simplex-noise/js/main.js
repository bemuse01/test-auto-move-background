new Vue({
    el: '#wrap',
    data(){
        return{
            util: {
                width: window.innerWidth,
                height: window.innerHeight,
                simplex: new SimplexNoise()
            },
            style: {
                wrap: {width: '100vw', height: '100vh', left: '0', top: '0'},
                back: {width: '100vw', height: '100vh'}
            },
            param: {
                w: 0.05,
                h: 0.05,
                smooth: 200,
                rd: 0.00008,
                ratio: 2188 / 3500
            },
            back: {
                x: 0,
                y: 0
            }
        }
    },
    computed: {
        backgroundStyle(){
            return {transform: `translate(${this.back.x}px, ${this.back.y}px)`}
            // return {transform: `translate(-50%, -50%)`}
        }
    },
    created(){
        this.init()
    },
    methods: {
        // init
        init(){
            this.setBackgroundSize()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },


        // background
        setBackgroundSize(){
            const width = this.util.width * this.param.w

            const oWidth = this.util.width + (width * 2), oHeight = oWidth * this.param.ratio, height = oHeight * this.param.h

            // this.style.wrap.width = this.util.width + (width * 2) + 'px'
            // this.style.wrap.height = this.util.height + (height * 2) + 'px'
            // this.style.wrap.left = (this.util.width - (this.util.width + (width * 2))) / 2 + 'px'
            // this.style.wrap.top = (this.util.height - (this.util.height + (height * 2))) / 2 + 'px'
            this.style.wrap.width = oWidth + 'px'
            this.style.wrap.height = oHeight + 'px'
            this.style.wrap.left = (this.util.width - oWidth) / 2 + 'px'
            this.style.wrap.top = (this.util.height - oHeight) / 2 + 'px'

            this.style.back.width = oWidth + 'px'
            this.style.back.height = oHeight + 'px'

            // console.log(this.util.width * this.param.w * 2)
            // console.log(this.util.width * this.param.w)
            // console.log(this.util.width)
            console.log(width, oWidth)
        },
        moveBackground(time){
            const width = this.util.width * this.param.w

            const oWidth = this.util.width + (width * 2), oHeight = oWidth * this.param.ratio, height = oHeight * this.param.h
            
            this.back.x = this.util.simplex.noise2D(time * 0.02 / this.param.smooth, time * this.param.rd) * width * 0.5
            this.back.y = this.util.simplex.noise2D(time * 0.01 / this.param.smooth, time * this.param.rd) * height * 0.5
        },


        // window event
        onWindowResize(){
            this.util.width = window.innerWidth
            this.util.height = window.innerHeight

            this.setBackgroundSize()
        },


        // render
        render(){
            const time = window.performance.now()

            this.moveBackground(time)
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})