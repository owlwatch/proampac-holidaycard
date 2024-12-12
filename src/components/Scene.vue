<template lang="pug">
section.scene(
    :class="{[`locale-`+locale]: true}"
)
    .inner
    .balloon
        img(
            src="@/assets/img/Balloon/balloon-298322860_sm.png"
        )
    .text-container
        .white-burst
        card-text.text
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import coverTextEn from '@/assets/img/Text/A - All-in-one/SVG/Text_Eng.svg';
import CardText from './CardText.vue';
const { locale, availableLocales, t, messages } = useI18n({useScope:'global'});

const coverText = computed( () => {
    return coverTextEn;
});

</script>

<style type="scss" scoped>
.scene {
    overflow: hidden;
    position: relative;
    background-image: url(@/assets/img/Background/background-298322860-BG_exp_sm.jpg);
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    text-align: center;
    box-shadow: 0 2rem 4rem rgba(0,0,0,0.1);
    animation: zoom-background 7s 0s 1 forwards;
    @media (min-width: 768px){
        border-radius: 24px;
    }
}

.balloon {
    position: absolute;
    z-index: 3;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
    width: 33%;
    animation: float-up-from-the-bottom 3s 0s 1;

    img {
        
        animation-name: sway;
        animation-duration:  12s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        width: 100%;
        transform-origin: 50% 100%;
    }

    @media screen and (min-width: 768px ) {
        width: 28%;
    }
}

.white-burst {
    background-image: radial-gradient( ellipse at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.8) 35%, rgba(255,255,255,0) 70% );
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 170%;
    height: 170%;
    opacity: 0;
    animation: fade-in 3s 1s 1 forwards;
}

.text {
    opacity: 0;
    animation: fade-in 4s 1s 1 forwards;
}

.text-container {
    position: relative;
    width: 90%;
    height: auto;
    margin: 30% auto 25%;
    position: relative;
    z-index: 3;
    aspect-ratio: 280 / 130;

    @media screen and (min-width: 500px ) {
        width: 80%;
        margin: 30% auto 15%;
    }

    @media screen and (min-width: 768px ) {
        width: 65%;
        margin: 25% auto 10%;
    }
    
}
.text {
    position: relative;
    z-index: 4;
    width: 100% !important;
    height: auto;
    filter: drop-shadow(0 0px 7px rgba(255,255,255,1));
}
@keyframes sway {
    0% {
        transform: translateX(-3px) rotate(-1deg);
    }
    25% {
        transform: translateX(3px) rotate(1deg);
    }
    50% {
        transform: translateX(-3px) rotate(-1deg);
    }
    75% {
        transform: translateX(3px) rotate(1deg);
    }
    100% {
        transform: translateX(-3px) rotate(-1deg);
    }
}

@keyframes float-up-from-the-bottom {
    0% {
        top: 100%;
    }
    100% {
        top: 0%;
    }
}
@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes zoom-background {
    0% {
        background-size: 140% auto
    }
    100% {
        background-size: 180%;
    }
    
}
</style>
<style>
</style>