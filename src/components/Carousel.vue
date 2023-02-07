<template lang="pug">

flickity.quote-carousel(
    :options="options"
    @scroll="onScroll"
    @ready="onReady"
)
    quote(
        v-for="i in 9"
        :index="i"
        :progress="progress"
        :ready="ready"
        :copy="$t('copy.service'+(i))"
    )

</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Flickity from './Flickity.vue';
import Quote from './Quote.vue';

const { t } = useI18n({useScope:'global'});

const options = {
    pageDots: false,
    wrapAround: true,
    prevNextButtons: true,
    autoPlay: 4000
};

const progress = ref(0);
const ready = ref(false);

const onScroll = (e:any) => {
    progress.value = e;
}
const onReady = (e:any) => {
    ready.value = true;
}
</script>

<style scoped lang="scss">
.quote-carousel:deep(.flickity-viewport){
    overflow: visible !important;
}
.quote-carousel:deep(.flickity-prev-next-button){
    // top: calc(50% - 20px);
    background: transparent;
    svg {
        fill: #fff;
    }
}
</style>