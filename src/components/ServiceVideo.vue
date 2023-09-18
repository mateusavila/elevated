<script setup lang="ts">
import { ServicesVideo } from './images'
import { useWindowScroll } from '@vueuse/core'
import { watch, ref } from 'vue'
const { y } = useWindowScroll()
const getPlacedY = (): number => {
  const serviceVideoMaster = document.getElementById('service-video-master')?.offsetTop!
  const header = document.getElementById('header')?.clientHeight!
  const blockY: number = Math.ceil(serviceVideoMaster - y.value - header) * -1 ?? 0
  return blockY
}

const line1 = ref<number>(0)
const line2 = ref<number>(0)
const line3 = ref<number>(0)
const line4 = ref<number>(0)
const parallaxY = ref<string>('')

const lineStyle1 = ref<string>('0%')
const lineStyle2 = ref<string>('0%')
const lineStyle3 = ref<string>('0%')
const lineStyle4 = ref<string>('0%')

const parallaxText = (scroll: number) => {
  // const clientHeight = window.innerHeight
  parallaxY.value = `${(scroll / 2) * -1}%`
}

watch(y, () => {
  const globalPct = getPlacedY() / 10

  if (globalPct > 0){
    line1.value = globalPct * 4
  } else {
    line1.value = 0
  }
  
  if (globalPct > 25) {
    line2.value = (globalPct - 25) * 4
  } else {
    line2.value = 0
  }
  
  if (globalPct > 50) {
    line3.value = (globalPct - 50) * 4
  } else {
    line3.value = 0
  }
  
  if (globalPct > 75) {
    line4.value = (globalPct - 75) * 4
  } else {
    line4.value = 0
  }

  (globalPct > 0) && parallaxText(globalPct)


  lineStyle1.value = `${line1.value}%`
  lineStyle2.value = `${line2.value}%`
  lineStyle3.value = `${line3.value}%`
  lineStyle4.value = `${line4.value}%`
})
</script>
<template>

  <div class="service-video-master" id="service-video-master">
    <div class="service-video">
      <video :src="ServicesVideo" autoplay muted loop></video>
      <div class="container">
        <p id="video-text">
          <span class="line line-1">LET’S CREATE</span><br>
          <span class="line line-2">BIG IDEAS, REIMAGINE</span><br>
          <span class="line line-3">THE STATUS QUO AND</span><br>
          <span class="line line-4">LEAVE A MARK.</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  .service-video-master
    position: relative
    height: 2115px
    width: 100%
  .service-video, .service-video video
    width: 100%
  .service-video .container
    position: relative
  .service-video
    position: sticky
    top: 100px
    left: 0
  .service-video
    video
      position: absolute
      top: 0
      left: 0
      z-index: 1
      height: 80vh
      object-fit: fill
    .container
      margin: 0 auto
      max-width: 1400px
      width: calc(100% - 80px)
      align-items: center
      z-index: 2
      display: flex
      height: 100%
      justify-content: flex-end
      padding: 30px 0 0
    p
      font-family: var(--flexible700)
      font-size: 150px
      text-transform: uppercase
      line-height: 90%
      margin: 30vh 0 0
      color: #373737
      letter-spacing: 0.02em
      transform: translateY(v-bind('parallaxY'))
      .line
        -webkit-background-clip: text
        -webkit-text-fill-color: transparent
        &.line-1
          background-image: linear-gradient(to right, rgba(255,255,255,1) v-bind('lineStyle1'),rgba(55,55,55,1) v-bind('lineStyle1'),rgba(55,55,55,1) 100%)
        &.line-2
          background-image: linear-gradient(to right, rgba(255,255,255,1) v-bind('lineStyle2'),rgba(55,55,55,1) v-bind('lineStyle2'),rgba(55,55,55,1) 100%)
        &.line-3
          background-image: linear-gradient(to right, rgba(255,255,255,1) v-bind('lineStyle3'),rgba(55,55,55,1) v-bind('lineStyle3'),rgba(55,55,55,1) 100%)
        &.line-4
          background-image: linear-gradient(to right, rgba(255,255,255,1) v-bind('lineStyle4'),rgba(55,55,55,1) v-bind('lineStyle4'),rgba(55,55,55,1) 100%)
        
  @media all and (max-width: 1100px)
    .service-video
      p
        font-size: clamp(80px, calc(5rem + ((1vw - 6.78px) * 16.5877)), 150px)
  @media all and (max-width: 767px)
    .service-video
      height: auto
      padding: 100px 0
      video
        object-fit: cover
        height: 65vh
      .container
        justify-content: flex-start
      p
        font-size: clamp(60px, calc(3.75rem + ((1vw - 3.2px) * 4.4743)), 80px)
  @media all and (max-width: 410px)
    .service-video-master
      height: 1400px
    .service-video
      padding: 0
      .container
        padding: 0
        width: calc(100% - 40px)
      video
        object-fit: cover
        height: 58vh
      p
        letter-spacing: 0.03em
        font-size: clamp(48px, calc(3rem + ((1vw - 3.2px) * 17.7778)), 64px)
</style>
