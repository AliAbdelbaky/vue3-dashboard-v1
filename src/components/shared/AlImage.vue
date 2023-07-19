<script lang="ts" setup>
import {computed, nextTick, onMounted, ref} from 'vue'
// @ts-ignore
import UrlValidator from '@/utils/imageURLValidator'
// @ts-ignore
import fallBack from "@/assets/images/disk.jpg";
// eslint-disable-next-line
const {src, alt, placeholder} = defineProps<{
  src: string
  placeholder?: string
  alt: string
}>()

const ImgRef = ref(null)
const placeholderSrc = ref(placeholder ? placeholder : fallBack)
const mainSrc = ref(placeholderSrc.value)


const checkImage = async () => {
  try {
    const res = await UrlValidator(src);
    mainSrc.value = src;
    return res
  } catch (error) {
    mainSrc.value = placeholderSrc.value;
    return error
  }
}

const style = computed(() => {
  if (mainSrc.value === placeholderSrc.value) return {background: '#000000'}
  return {background: 'transparent'}
})
const onImageLoad = (event: any) => {
  // do something when an image finishes loading
  console.group({event}, 'finishes loading')
}
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('lazy-load')
      await checkImage()
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5,
});
onMounted(async () => {
  await nextTick(() => {
    // @ts-ignore
    observer.observe(ImgRef.value)
  })
})
</script>

<template>
  <img
      ref="ImgRef"
      :alt="alt"
      :data-src="placeholderSrc"
      :src="mainSrc"
      :style="style"
      class="lazy-load"
      loading="lazy"
      @load="onImageLoad"
  >
</template>

<style lang="scss" scoped>
img {
  transition: all 0.2s ease-in-out;
  filter: blur(0px);
  &.lazy-load {
    filter: blur(10px);
  }
}
</style>