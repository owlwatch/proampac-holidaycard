<template lang="pug">
.card(
    ref="root"
    :class="{[`locale-`+locale]: true}"
)
    scene
    language-chooser.language-chooser

    section(
        data-animate-selector="h2, img, p, a"
        data-animate-children="fade-up"
        data-animate="fade-up"
    )
        .primary-text(
            v-html="parse('copy.interior_a')"
        )

    section.border-top(
        data-animate-selector="h2, img, p" 
        data-animate-children="fade-up"
        data-animate="fade-up"
    )
        .grid--2
            .column.interior
                .secondary-text(
                    v-html="parse('copy.interior_b')"
                )
                .copyright(
                    v-if="isDesktop"
                )
                    a(
                        href="https://proampac.com/"
                        target="_blank"
                    )
                        img.proampac-logo(
                            src="@/assets/svg/logo-main.svg"
                            alt="ProAmpac Logo"
                        )

                    p &copy; 2023 ProAmpac. All rights reserved.
            .column.sponsors
                .sponsor
                    a(
                        href="https://1n5.org/"
                        target="_blank"
                    )
                        img.logo-1n5(
                            src="@/assets/img/1n5-logo.svg"
                            alt="1n5 Logo"
                        )
                    .sponsor-text(
                        v-html="parse('copy.in5_description')"
                    )
                    a(
                        href="https://1n5.org/"
                        target="_blank"
                    ) 1n5.org
                .sponsor
                    a(
                        href="https://butterfly-conservation.org/"
                        target="_blank"
                    )
                        img.logo-butterfly(
                            src="@/assets/img/butterfly-conservation.png"
                            alt="Butterfly Conservation Logo"
                        )
                    .sponsor-text(
                        v-html="parse('copy.butterfly_conservation_description')"
                    )

                    a(
                        href="https://butterfly-conservation.org/"
                        target="_blank"
                    ) butterfly-conservation.org
    section.mobile-copyright.border-top(
        v-if="!isDesktop"
        data-animate-selector="h2, img, p"
        data-animate-children="fade-up"
        data-animate="fade-up"
    )
        .copyright(
            v-if="!isDesktop"
        )
            a(
                href="https://proampac.com/"
                target="_blank"
            )
                img.proampac-logo(
                    src="@/assets/svg/logo-main.svg"
                    alt="ProAmpac Logo"
                )

            p &copy; 2023 ProAmpac. All rights reserved.

</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { marked } from 'marked';

import Scene from './components/Scene.vue';
import LanguageChooser from './components/LanguageChooser.vue';

export interface Props {
    langs?: Array<string>
}

const parse = (key:string) => {
    if( marked ){
        return marked.parse(t(key));
    }
}

const desktopMediaQuery = window.matchMedia('(min-width: 1100px)');
const isDesktop = ref(desktopMediaQuery.matches);
desktopMediaQuery.addEventListener( 'change', () => {
    isDesktop.value = desktopMediaQuery.matches;
    setTimeout( () => setupAnimations(), 100 );

});

defineProps<Props>();
const { locale, t } = useI18n({useScope:'global'});

const root = ref<HTMLDivElement>();

const observe = (entries: IntersectionObserverEntry[]) => {
    let c = 0;
    const els = [];
    entries.sort( (a,b) => {
        return a.boundingClientRect.top - b.boundingClientRect.top
    });
    entries.forEach( (entry) => {
        let delay = entry.target.getAttribute('data-animate-delay');
        let timeout = 150 * (1 + c++);
        if( delay ){
            timeout += Number(delay);
        }
        if( entry.isIntersecting ){
            setTimeout( () => {
                entry.target.classList.add('animated');
            }, timeout );
        }
    });
};

let observer : IntersectionObserver | null = null;

const setupAnimations = () => {
    if( root.value ){
        if( observer == null ){
            // lets set up an observer
            observer = new IntersectionObserver(observe, {
                // rootMargin: '0% 0% 0% 0%'
                // threshold: 0.2
            });
        }

        // lets see if we have any selectors
        const parentSelectors = root.value.querySelectorAll('[data-animate-children][data-animate-selector]');
        parentSelectors.forEach( el => {
            let animation = el.getAttribute('data-animate-children');
            let selector = el.getAttribute('data-animate-selector');
            if( selector && animation ) el.querySelectorAll(selector).forEach( child => {
                if( animation ){
                    child.setAttribute('data-animate', animation );
                }
            });
        });
        
        if( observer ){
            const els = root.value.querySelectorAll('[data-animate]');
            console.log(els);
            els.forEach( el => (observer as IntersectionObserver).observe(el) );
        }
    }
};
onMounted(() => setTimeout( setupAnimations, 500 ) );

</script>
<style scoped lang="scss">
@import '@/assets/variables';
.card {
    z-index: 1;
    animation: fade-in 1s 0 ease-in-out;
    position: relative;
    max-width: 1366px;
    margin: 0 auto;
    background: #fff;
    min-height: 100vh;
    color: $dark-gray;
}
@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.language-chooser {
    position: absolute;
    z-index: 2;
    margin-top: -1.5rem;
    right: 10px;
}
section {
    padding: 4rem 2rem;
    position: relative;
    &.border-top::before {
        content: '';
        display: block;
        width: calc( 100% - 4rem );
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        height: 1px;
        top: -1px;
        background: #ccc;
        margin: 0 auto;
    }
}
.primary-text {
    text-align: center;
    font-family: $heading-font;
    &:deep(h2){
        color: $pink;
        font-size: var(--step-3);
    }
    &:deep(p){
        color: $darkest-green;
        font-size: 1.4rem;
        line-height: 1.5;
        max-width: 17em;
        margin: 0 auto;
        font-size: var(--step-1);
    }
}
.secondary-text {
    &:deep(h2){
        color: $dark-green;
        font-size: var(--step-2);
    }
    &:deep(p){
        font-size: var(--step--1);
        line-height: 1.5;
    }
}
.sponsor-text {
    font-family: $base-font;
    font-size: 0.9rem;
}
.locale-fr .primary-text:deep(p) {
    max-width: 20em;
}

.grid--2 {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    gap: 4rem;
    .interior {
        flex: 3 0;
    }
    .sponsors {
        flex: 2 0;
    }
}
@media( max-width: 1100px ){
    .grid--2 {
        flex-wrap: wrap;
        flex-direction: column;
        .interior, .sponsors {
            width: 100%;
        }
    }
}
.sponsor img {
    max-height: 90px;
    height: 100%;
    width: auto;
}
.mid-gray-section {
    color: #f2f2f2;
}
.sponsors {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    @media (min-width: 700px) and (max-width: 1100px){
        flex-direction: row;
        .sponsor {
            flex: 1 0 50%;
        }
    }
}
.proampac-logo {
    max-width: 400px;
    width: 100%;

}
.sponsor {
    a {
        color: inherit;
        font-weight: 800;
        text-decoration: none;
        color: $dark-gray;
        transition: 0.2s color;
        display: block;
        &:hover {
            color: $pink;
        }
    }
}
.interior {
    display: flex;
    flex-direction: column;
    .secondary-text {
        flex: 1;
    }
}
.copyright {
    p {
        margin-bottom: 0;
    }
}
.mobile-copyright {
    padding-top: 2rem;
    padding-bottom: 2rem;
}
</style>

<style>
[data-animate] {
    transition: 1s all;
}
[data-animate="slide-open"]:not(.animated) {
    left: 50%;
    right:50%;
}
[data-animate="fade-up"]:not(.animated){
    transform: translateY(20px);
    opacity: 0;
}
[data-animate="fade-in"] {
    transition-delay: 1s;
}
[data-animate="fade-in"]:not(.animated){
    opacity: 0;
}
</style>
