<template lang="pug">
section.scene(
    :class="{[`locale-`+locale]: true}"
)
    video-background(
        src="@/assets/snow.mp4"
        poster="@/assets/snow.jpg"
        style="height: 100%; width: 100%;"
    )
        template(v-if="'fr' == locale")
            img.spread(
                src="@/assets/img/JOIE_spread@4x.png"
                alt="Spread"
            )
            light-bulb.letter-j(
                src="@/assets/img/JOIE-J@4x.png"
                alt="J"
            )
            light-bulb.letter-o(
                src="@/assets/img/JOIE-O@4x.png"
                alt="O"
            )
            light-bulb.letter-i(
                src="@/assets/img/JOIE-I@4x.png"
                alt="Y"
            )
            light-bulb.letter-e(
                src="@/assets/img/JOIE-E@4x.png"
                alt="Y"
            )

        template(v-else)
            img.spread(
                src="@/assets/img/JOY_spread@4x.png"
                alt="Spread"
            )
            light-bulb.letter-j(
                src="@/assets/img/JOY-J@4x.png"
                alt="J"
            )
            light-bulb.letter-o(
                src="@/assets/img/JOY-O@4x.png"
                alt="O"
            )
            light-bulb.letter-y(
                src="@/assets/img/JOY-Y@4x.png"
                alt="Y"
            )

</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import VideoBackground from 'vue-responsive-video-background-player';
import LightBulb from './LightBulb.vue';

const { locale, availableLocales, t, messages } = useI18n({useScope:'global'});

</script>

<style type="scss" scoped>
.scene {
    aspect-ratio: 1.8 / 1;
    width: 100%;
    padding: 1px;
    position: relative;
}
.bg-video {
    position: absolute;
    top:0;
    left: 0;
}

.locale-en {
    .spread {
        width: 100%;
        height: auto;
        top: 10%;
        left: 0;
        position: absolute;
    }

    &:deep(.light-bulb){
        width: 16.5%;
    }
    .letter-j {
        top: 42%;
        left: 34%;
    }
    .letter-o {
        top: 45%;
        left: 52.5%;
        transform: rotate(-4deg) translateX(-50%);
    }
    .letter-o:deep(img) {
        transform-origin: 65% 0;
        animation-delay: -0.5s;
    }
    .letter-y {
        top: 43%;
        left: 71.5%;
    }
    .letter-y:deep(img) {
        animation-delay: -0.25s;
    }
}

.locale-fr {
    .spread {
        width: 100%;
        height: auto;
        top: 8%;
        left: 0;
        position: absolute;
    }

    &:deep(.light-bulb){
        width: 14.5%;
    }
    .letter-j {
        top: 51%;
        left: 28.5%;
        transform: translateX(-50%) rotate(-3deg) ;
    }
    .letter-o {
        top: 52%;
        left: 45%;
        transform: translateX(-50%) rotate(-4deg) ;
    }
    .letter-o:deep(img) {
        transform-origin: 65% 0;
        animation-delay: -0.5s;
    }
    .letter-i {
        top: 51%;
        left: 61.5%;
    }
    .letter-o:deep(img) {
        animation-delay: -0.33s;
    }
    .letter-e {
        top: 47%;
        left: 77%;
        transform-origin: 40% 0;
        transform: translateX(-50%) rotate(2deg) ;
    }
    .letter-e:deep(img) {
        animation-delay: -0.4s;
    }
}

</style>