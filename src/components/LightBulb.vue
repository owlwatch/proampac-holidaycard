<template lang="pug">
.light-bulb
    img(
        :src="src"
        :alt="alt"
    )
</template>

<script setup lang="ts">
export interface Props {
    src: String,
    alt?: String
}

defineProps<Props>();

</script>
<style scoped lang="scss">
.light-bulb {
    transform: translateX(-50%);
    position: absolute;
    img {
        display: block;
        width: 100%;
        height: auto;
        transform-origin: 50% 0;
        animation: swing 3s ease-in-out 0s infinite;
    }
}

@keyframes swing {
    0% {
        transform: rotate(-3deg);
    }
    50% {
        transform: rotate(3deg);
    }
    100% {
        transform: rotate(-3deg);
    }
}
</style>