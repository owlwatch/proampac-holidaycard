<template lang="pug">
flickity(
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
    prevNextButtons: false,
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
</style>