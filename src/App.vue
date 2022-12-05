<template lang="pug">
.card(
    ref="root"
)
    .main-message
        div(
            data-animate="fade-in"
        )
            particles-component.snow(
                :options="particlesOptions"
                :particlesInit="particlesInit"
                id="snow" 
            )

        div(
            style="width:100%"
            data-animate="slide-down"
            
        )
            img.frame-top(
                width="522" height="120"
                :src="svgUrl(isDesktop?'bg_top-a.svg':'bg_bott-a.svg')"
            )

        .message(
            data-animate="main-message"
        )
            .message-a
                img(
                    width="390" height="168"
                    :src="svgUrl('main_A-1.svg', true)"
                )
                img(
                    width="390" height="168"
                    :src="svgUrl('main_A-2.svg', true)"
                )
            .message-b
                img(
                    width="390" height="168"
                    :src="svgUrl('main_B-1.svg', true)"
                )
                img(
                    width="390" height="168"
                    :src="svgUrl('main_B-2.svg', true)"
                )


        img.frame-bottom(
            data-animate="fade-up"
            v-if="isDesktop"
            :src="svgUrl('bg_bott-a.svg')"
        )
    
    .interior-a(
        :class="{showTopCurve: !isDesktop}"
    )
        .content-container
            div(
                data-animate="fade-up"
                data-animate-children=":scope > *"
                v-html="marked.parse($t('copy.interior_a'))"
            )

    .interior-b
        .content-container
            img.best-buds-logo(
                data-animate="fade-up"
                :src="svgUrl('logo-proampac-bestbuddies.svg')"
            )

            div(
                data-animate="fade-up"
                v-html="marked.parse($t('copy.interior_b'))"
            )

    .bottom
        div(
            data-animate="fade-in"
        )
            particles-component.snow(
                :options="particlesOptions"
                :particlesInit="particlesInit"
                id="snow-bottom" 
            )
        img.frame-top(
            :src="svgUrl('bg_top-a.svg')"
        )
        .content-container
            div(
                data-animate="fade-up"
                v-html="marked.parse($t('copy.back_intro'))"
            )
        
        // logo
        img.bottom-pro-logo(
            data-animate="fade-up"
            :src="svgUrl('logo-pro360.svg')"
        )

        carousel.carousel(
            
        )

        .content-container
            h3.back-subhead(
                data-animate="fade-up"
            ) {{ $t('copy.back_subhead') }}

            div.back-list(
                data-animate="fade-up-list"
                v-html="marked.parse($t('copy.back_list'))"
            )

            a.back-logo(
                data-animate="fade-up"
                href="https://proampac.com"
                target="_blank"
            )
                img(
                    :src="svgUrl('logo-proampac.svg')"
                )

            div(
                data-animate="fade-up"
                v-html="marked.parse($t('copy.copyright'))"
            )

            .language-chooser(
                data-animate="fade-up"
            )
                ul
                    li(
                        v-for="availableLocale in availableLocales"
                        :key="`locale-${availableLocale}`"
                    )
                        label(
                            :for="`locale-${availableLocale}`"
                        )
                            input(
                                type="radio"
                                name="locale"
                                v-model="$i18n.locale"
                                :value="availableLocale"
                                :id="`locale-${availableLocale}`"
                                @input="onLocaleChange"
                            )
                            span {{ messages[availableLocale]['copy'].language_code }}

        img.frame-bottom(
            data-animate="fade-up"
            :src="svgUrl('bg_bott-a.svg')"
        )
    
    
                
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { marked } from 'marked';
import {ParticlesComponent} from 'vue3-particles';
import Carousel from './components/Carousel.vue';
import type { Engine } from 'tsparticles-engine';
import { loadBaseMover } from "tsparticles-move-base";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadWobbleUpdater } from "tsparticles-updater-wobble";


export interface Props {
    langs?: Array<string>
}

defineProps<Props>();

const mm = window.matchMedia('(min-width: 800px)');
const isDesktop = ref(mm.matches);
mm.addEventListener('change', (ev: MediaQueryListEvent) => {
    isDesktop.value = ev.matches;
});

const { locale, availableLocales, t, messages } = useI18n({useScope:'global'});

watch( locale, (v : any) => {
    if( typeof v == 'string' ){
        localStorage.setItem('locale', v);
        // lets scroll to the top too
        window.scroll({
            top: 0,
            behavior:'smooth'
        });
    }
} );

const particlesOptions = {
    background: {
        color: "transparent",
    },
    fullScreen: false,
    particles: {
        move: {
            direction: 'bottom',
            enable: true,
            random: false,
            straight: false,
        },
        opacity: {
            value: { min: 0.1, max: 0.5 },
        },
        size: {
            value: { min: 1, max: 10 },
        },
        wobble: {
            distance: 20,
            enable: true,
            speed: {
                min: -5,
                max: 5,
            },
        },
    }
}

async function particlesInit(engine: Engine): Promise<void> {
    await loadBaseMover(engine);
    await loadCircleShape(engine);
    await loadColorUpdater(engine);
    await loadOpacityUpdater(engine);
    await loadOutModesUpdater(engine);
    await loadSizeUpdater(engine);
    await loadWobbleUpdater(engine);

}

const svgUrl = (name:string, lang:boolean = false ) => {
    let path = '/assets/svg/';
    if( lang ) path+=  (locale.value) + '/' ;
    return path + name;
};

const root = ref<HTMLDivElement>();
const observe = (entries: IntersectionObserverEntry[]) => {
    let c = 0;
    const els = [];
    entries.sort( (a,b) => {
        return a.boundingClientRect.top - b.boundingClientRect.top
    });
    entries.forEach( (entry) => {
        if( entry.isIntersecting ){
            setTimeout( () => {
                entry.target.classList.add('animated');
            }, 400 * (1 + c++) );
        }
    });
};
const setupAnimations = () => {
    if( root.value ){
        // lets set up an observer
        const observer = new IntersectionObserver(observe, {
            // rootMargin: '0% 0% 0% 0%'
            // threshold: 0.2
        });

        // lets see if we have any selectors
        const parentSelectors = root.value.querySelectorAll('[data-animate][data-animate-selector]');
        parentSelectors.forEach( el => {
            let selector = el.getAttribute('data-animate-children');
            let animation = el.getAttribute('data-animate');
            el.removeAttribute('data-animate');
            if( selector && animation ) el.querySelectorAll(selector).forEach( child => {
                if( animation ){
                    child.setAttribute('data-animate', animation );
                }
            });
        });
        
        
        const els = root.value.querySelectorAll('[data-animate]');
        els.forEach( el => observer.observe(el) );
    }
};
onMounted(() => setTimeout( setupAnimations, 1000 ) );

</script>

<style scoped lang="scss">
@import '@/assets/variables';
.card {
    position: relative;
    color: #fff;
    min-height: 100vh;
    background: $dark-green;
    max-width: 1000px;
    margin: 0 auto;
    font-size: 1rem;
    line-height: 1.6;
    font-weight: 500;
    overflow: hidden;
}
.snow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    max-width: none;
    opacity: 0.4;
    pointer-events: none;
}
.main-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 100px;
    position: relative;
    overflow: hidden;
    min-height: 100vh;

    .message {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content: center;
        position: relative;
        > div {
            max-width: 400px;
        }
    }
    img {
        width: 100%;
        height: auto;
    }

    .frame-top {
        transform: rotate(180deg);
    }

    .frame-bottom {
        position: absolute;
        bottom: 0;
    }
    @media (min-width: 800px){
        padding-bottom: 0;
        .frame-top {
            transform: rotate(0deg);
        }
        .frame-bottom {
            position: static !important;
        }
        .message {
            flex-direction: row;
            img {
                width: 100%;
            }
        }
    }
}
.content-container {
    padding: 1.5em;
    max-width: 700px;
    margin: 0 auto;
}
.interior-a {
    text-align: center;
    background: #EFEFEF;
    color: #333;
    padding-top: 40px;
    padding-bottom: 40px;
    position: relative;
    &.showTopCurve {
        padding-top: 20px;
    }
    :deep(h2) {
        color: #E3746D;
    }
    &.showTopCurve::before {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 0;
        width: 100%;
        height: 80px;
    	background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg id='Layer_2' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 305.1 69.3'%3E%3Cg id='Layer_1-2'%3E%3Cpath d='M0 69.3H305.1V0s-12.8 36.5-153.8 38.3C60.3 39.5 0 69.3 0 69.3Z' style='fill:%23f0efef%3B'/%3E%3C/g%3E%3C/svg%3E");
    }
    &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 50px;
	    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg id='Layer_2' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 368.6 48.9'%3E%3Cg id='Layer_1-2'%3E%3Cpolygon points='0 0 368.6 0 368.6 48.9 0 0' style='fill:%23f0efef%3B'/%3E%3C/g%3E%3C/svg%3E");
        background-size: 100% 100%;
    }
}

.interior-b {
    text-align: center;
    background: #fff;
    color: #333;
    min-height: 400px;
    padding-top: 80px;
    padding-bottom: 40px;
    :deep(h2) {
        color: #E3746D;
    }
    &:deep(a){
        color: $bright-green;
        font-weight: 600;
    }
}

.bottom {
    background: $dark-green;
    text-align: center;
    position: relative;
    
    .frame-top,
    .frame-bottom {
        display: block;
    }
    .frame-top {
        // position: sticky;
        // z-index: 2;
        // top: 0;
    }

    .frame-bottom {
        // position: sticky;
        // bottom: 0;
    }
    &:deep(ul) {
        margin-left: 0;
        padding-left: 0;
    }
    &:deep(li) {
        text-align: center;
        list-style: none;
        padding-left: 0;
        margin-left: 0;
    }
}

.best-buds-logo {
    max-width: 500px;
}

.back-subhead {
    font-weight: 100;
    color: $bright-green;
    font-size: 1.5rem;
}
.back-list {
    margin-bottom: 3rem;
}

.back-logo {
    max-width: 240px;
    display: block;
    margin: 0 auto;
    img {
        max-width: 100%;
    }
}

.bottom-pro-logo {
    max-width: 200px;
    margin: 0 auto;
}
.carousel {
    margin: 3em 0;
}
[data-animate] {
    transition: 1s all;
}
[data-animate="fade-up"]:not(.animated){
    transform: translateY(20px);
    opacity: 0;
}
[data-animate="fade-in"] {
    transition-delay: 0.1s;
}
[data-animate="fade-in"]:not(.animated){
    opacity: 0;
}
[data-animate="fade-up-list"] {
    &:deep(li){
        transition: 0.4s all;
    }
    &:deep(li + li) {
        transition-delay: 0.2s;
    }
    &:deep(li + li + li) {
        transition-delay: 0.3s;
    }
    &:deep(li + li + li + li) {
        transition-delay: 0.4s;
    }
    &:deep(li + li + li + li + li) {
        transition-delay: 0.5s;
    }
    &:deep(li + li + li + li + li + li) {
        transition-delay: 0.6s;
    }

    &:deep( li + li + li + li + li + li + li ){
        transition-delay: 0.7s;
    }

    &:deep( li + li + li + li + li + li + li + li ){
        transition-delay: 0.8s;
    }
    &:deep( li + li + li + li + li + li + li + li + li ){
        transition-delay: 0.9s;
    }
    &:deep( li + li + li + li + li + li + li + li + li + li ){
        transition-delay: 1s;
    }
}
[data-animate="fade-up-list"]:not(.animated):deep(li){
    transform: translateY(20px);
    opacity: 0;
}
[data-animate="slide-down"]:not(.animated){
    transform: translateY(-100%);
}
[data-animate="slide-up"]:not(.animated){
    transform: translateY(100%);
}
[data-animate="main-message"]:deep(img) {
    transition: 2s all;
}
[data-animate="main-message"]:not(.animated):deep(img) {
    transform: translateY(10px) scale(0.9);
    opacity: 0;
}
[data-animate="main-message"]:deep(.message-a img + img) {
    transition-delay: 1s;
}
[data-animate="main-message"]:deep(.message-b img) {
    transition-delay: 2.5s;
}
[data-animate="main-message"]:deep(.message-b img + img) {
    transition-delay: 3.5s;
}
.language-chooser {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    ul {
        margin: 0;
        padding: 0;
        display: inline-flex;
    }
    li {
        margin: 0;
        padding: 0;
        list-style: none;
        padding: 0;
        margin: 0;
    }
    label {
        display: block;
        input {
            position: absolute;
            opacity: 0;
        }
        span {
            display: block;
            padding: 0.3em 0.75em;
        }
        input:checked+span {
            text-decoration: underline;
            font-weight: bold;
        }
    }
}
</style>
