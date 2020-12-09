new Vue({
    el: '#wrap',
    data(){
        return{
            util: {
                width: window.innerWidth / 2,
                height: window.innerHeight / 2,
                // width: window.innerWidth,
                // height: window.innerHeight,
                simplex: new SimplexNoise()
            },
            style: {
                wrap: {width: '100vw', height: '100vh', left: '0', top: '0'},
                back: {width: '100vw', height: '100vh'},
                frame: {width: '100vw', height: '100vh'}
            },
            param: {
                w: 0.01,
                h: 0.01,
                smooth: 200,
                velocity: 0.00075,
                ratio: 2188 / 3500,
                range: 0.5,
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
            this.setFrameSize()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },


        // background
        setBackgroundSize(){
            const width = this.util.width * this.param.w, oWidth = this.util.width + (width * 2)
            const oHeight = oWidth * this.param.ratio, height = oHeight * this.param.h

            this.style.wrap.width = oWidth + 'px'
            this.style.wrap.height = oHeight + 'px'
            this.style.wrap.left = (this.util.width * 2 - oWidth) / 2 + 'px'
            this.style.wrap.top = (this.util.height * 2 - oHeight) / 2 + 'px'
            // this.style.wrap.left = (this.util.width - oWidth) / 2 + 'px'
            // this.style.wrap.top = (this.util.height - oHeight) / 2 + 'px'

            this.style.back.width = oWidth + 'px'
            this.style.back.height = oHeight + 'px'

            console.log(width, oWidth)
        },
        moveBackground(time){
            const width = this.util.width * this.param.w, oWidth = this.util.width + (width * 2)
            const oHeight = oWidth * this.param.ratio, height = oHeight * this.param.h
            
            this.back.x = this.util.simplex.noise2D(time * 0.02 / this.param.smooth, time * this.param.velocity) * width * this.param.range
            this.back.y = this.util.simplex.noise2D(time * 0.01 / this.param.smooth, time * this.param.velocity) * height * this.param.range
        },


        // frame
        setFrameSize(){
            this.style.frame.width = this.util.width + 'px'
            this.style.frame.height = this.util.height + 'px'
        },


        // window event
        onWindowResize(){
            this.util.width = window.innerWidth / 2
            this.util.height = window.innerHeight / 2

            this.setBackgroundSize()
            this.setFrameSize()
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