<template lang="pug">
.card 
    topSvg

</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';

export interface Props {
    langs?: Array<string>
}
defineProps<Props>();

// images
// const imageSvg = (name: string) => {
//     return new URL(`/assets/svg/${name}`, import.meta.url).href
// }

// const topSvg = ref<any>(null);
const loadAssets = async () => {
    const svg = await import('/src/assets/svg/bg_top-a.svg');
    console.log(svg);
    // topSvg.value = svg;
}
const topSvg = computed( () => {
    return import('@/assets/svg/bg_top-a.svg?component');
});
loadAssets();
</script>

<style scoped lang="scss">
@import '@/assets/variables';
.card {
    min-height: 100vh;
    background: $dark-green;
    max-width: 1000px;
    margin: 0 auto;
}
</style>
