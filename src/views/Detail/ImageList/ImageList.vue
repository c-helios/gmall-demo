<template>
  <div class="swiper-container" ref="curSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(zoomImg,index) in zoomImgList" :key="index" >
        <img :src="zoomImg.imgUrl" :class="{active: currentIndex == index}" @click="changeCurrentIndex(index, zoomImg.imgUrl)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
export default {
  name: "ImageList",
  props: ['zoomImgList'],
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    changeCurrentIndex(index, imgUrl) {
      this.currentIndex = index
      this.$bus.$emit('getImgUrl', imgUrl)
    }
  },
  watch: {
    zoomImgList: {
      handler(newValue,oldValues) {
        this.$nextTick(() => {
        for (let index = 0; index < this.zoomImgList.length; index++) {
          let zoomImg = this.zoomImgList[index];
          if (zoomImg.isDefault == '1') {
            this.changeCurrentIndex(index, zoomImg.imgUrl)
            break
          }
        }
          new Swiper(this.$refs.curSwiper, {
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // slidesPerView: 3,
            slidesPerView: 'auto',
            slidesPreGroup: 3,
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>