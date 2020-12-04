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
                rd: 0.00008
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
            const width = this.util.width * this.param.w, height = this.util.height * this.param.h
            this.style.wrap.width = this.util.width + (width * 2) + 'px'
            this.style.wrap.height = this.util.height + (height * 2) + 'px'
            this.style.wrap.left = (this.util.width - (this.util.width + (width * 2))) / 2 + 'px'
            this.style.wrap.top = (this.util.height - (this.util.height + (height * 2))) / 2 + 'px'

            this.style.back.width = this.util.width + (width * 2) + 'px'
            this.style.back.height = this.util.height + (height * 2) + 'px'

            console.log(this.util.width * this.param.w * 2)
            console.log(this.util.width * this.param.w)
            console.log(this.util.width)
        },
        moveBackground(time){
            const width = this.util.width * this.param.w, height = this.util.height * this.param.h
            this.back.x = this.util.simplex.noise2D(time * 0.02 / this.param.smooth, time * this.param.rd) * width / 2
            this.back.y = this.util.simplex.noise2D(time * 0.01 / this.param.smooth, time * this.param.rd) * height / 2
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