<template lang="pug">
section.scene(
    :class="{[`locale-`+locale]: true}"
)
    language-chooser.language-chooser

    img.unwrapped.presents(
        src="@/assets/img/Presents/presents-unwrapped.png"
    )
    
    img.wrapped.presents(
        src="@/assets/img/Presents/presents-wrapped.png"
    )
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguageChooser from './LanguageChooser.vue';
const { locale, availableLocales, t, messages } = useI18n({useScope:'global'});


</script>

<style type="scss" scoped>
.scene {
    overflow: hidden;
    position: relative;
    background-image: url(@/assets/img/Background/snow-bg.png);
    background-size: cover;
    background-position: 50% 50%;
    aspect-ratio: 1631 / 1022;
    background-repeat: no-repeat;
    text-align: center;
    box-shadow: 0 2rem 4rem rgba(0,0,0,0.1);
    @media (min-width: 768px){
        animation-duration: 30s;
        border-radius: 24px;
    }
}

.presents {
    position: absolute;
    bottom: 0%;
    left: 0;
    width: 70%;
    height: auto;
}

.language-chooser {
    position: absolute;
    z-index: 2;
    top: 1rem;
    right: 1rem;
    z-index: 10;
}

</style>