<template lang="pug">
section.scene(
    :class="{[`locale-`+locale]: true}"
)
    language-chooser.language-chooser

    
    img.unwrapped.presents(
        src="@/assets/img/Presents/presents-unwrapped.png"
    )
    
    img.wrapped.presents(
        :class="{'is-hidden': !wrappedVisible}"
        src="@/assets/img/Presents/presents-wrapped.png"
    )

    vue-particles.snowstorm(
        id="snowstorm"
        @particles-loaded="particlesLoaded"
        :options="snowStormOptions"
    )

    .text
        .making-an {{ t('copy.making_an') }}
        .impact {{ t('copy.impact') }}

    .burst-of-light
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguageChooser from './LanguageChooser.vue';
import {snowStormOptions} from './snowstorm';
const { locale, availableLocales, t, messages } = useI18n({useScope:'global'});

const revealActive = ref(true);
const wrappedVisible = ref(true);


function particlesLoaded(container:any){
    console.log(container);
}

</script>

<style type="scss" scoped>
.scene {
    overflow: hidden;
    position: relative;
    background-image: url(@/assets/img/Background/snow-bg.jpg);
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

.snowstorm {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.presents {
    position: absolute;
    bottom: 0%;
    left: 0;
    width: 70%;
    height: auto;
}

.wrapped {
    animation: fade-out 0s 3s forwards
}

.language-chooser {
    position: absolute;
    z-index: 2;
    top: 1rem;
    right: 1rem;
    z-index: 10;
}
.burst-of-light {
    position: absolute;
    z-index: 0;
    /* radial gradient, white to transparent */
    background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 0) 70%);
    width: 300%;
    height: 500%;
    top: 90%;
    left: -200%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    animation: burst-of-light 3s ease-in forwards;
    animation-delay: 1.5s;
}

.text {
    position: absolute;
    bottom: 0%;
    left: 60%;
    right: 0%;
    top: 50%;
    z-index: 5;
    color: var(--blue);
    font-weight: 200;
    letter-spacing: -0.03em;
    container-type: inline-size;

    .making-an {
        font-family: var(--cursive-font);
        font-size: 20cqi;
        white-space: nowrap;
        opacity: 0;
        text-shadow: 0.025em 0.025em 0.05em rgba(255,255,255,0.9);
        animation: fade-in-up 1s ease-in-out forwards;
        animation-delay: 3s;
    }

    .impact {
        text-transform: uppercase;
        font-size: 22cqi;
        font-weight: 600;
        color: var( --dark-green );
        opacity: 0;
        text-shadow: 0.025em 0.025em 0.05em rgba(255,255,255,0.9);
        animation: fade-in-down 1s ease-in-out forwards;
        animation-delay: 3s;
    }
}

@keyframes fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@keyframes fade-in-up {
    0% {
        opacity: 0;
        transform: translateY(20%);
    }
    100% {
        opacity: 1;
        transform: translateY(0%);
    }
}

@keyframes fade-in-down {
    0% {
        opacity: 0;
        transform: translateY(-20%);
    }
    100% {
        opacity: 1;
        transform: translateY(0%);
    }
}

@keyframes burst-of-light {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.5;
        left: -400%;
        top: 90%;
        
    }
    50% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
        top: 65%;
        left: 30%;
    }

    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.5;
        left: 200%;
        top: -30%;
    }
}

</style>
