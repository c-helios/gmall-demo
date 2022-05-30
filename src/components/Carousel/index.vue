<template>
    <div class="swiper-container" ref="curSwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carsousel,index) in list" :key="carsousel.id">
                <img :src="carsousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>

import Swiper from 'swiper'

export default {
    name:'Carousel',
    props:['list'],
    watch:{
        list:{
            immediate:true,
            handler(newValue,oldValue){
                // nextTick:在下次DOM更新，循环结束后 执行延迟回调，在修改数据之后立即使用方法，获取更新后的DOM
                this.$nextTick(() => {
                    //  当执行这个回调时，保证服务器数据回来了，v-for执行完毕
                    new Swiper(this.$refs.curSwiper, {
                        // direction: 'vertical', // 垂直切换选项
                        loop: true, // 循环模式选项

                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }
                    })
                })
            }
        }
    }

}
</script>

<style>

</style>