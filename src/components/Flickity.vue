<template>
    <div ref="root" class="flickity">
        <slot />
    </div>
</template>
  
<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import Flickity, { type Options } from 'flickity'

const props = defineProps<{
    options: Options
}>();

const emit = defineEmits(['scroll', 'ready']);
  
let flickity = ref<Flickity|null>(null)
const root = ref<HTMLElement | null>(null)
  
onMounted(() => flickity.value = new Flickity(root.value as HTMLElement, props.options))
onUnmounted(() => flickity.value?.destroy())

watch( flickity, (inst) => {
    if( inst ){
        inst.on('scroll', (e) => {
            emit('scroll', e);
        });
        emit('ready');
    }
});
  
defineExpose({
    root,
    flickity,
    append: (element:HTMLElement) => {
        flickity.value?.append(element)
        flickity.value?.select(-1)
    }
})
</script>
  
<style>
@import 'flickity/dist/flickity.css';
</style>