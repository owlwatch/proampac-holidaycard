<template lang="pug">
.card(
    ref="root"
    :class="{[`locale-`+locale]: true}"
)
    scene

    section.inside-card
        .primary-text
            h2(v-html="parse('copy.primary_heading')")

            p(v-html="parse('copy.primary_body')")
        
        .secondary-text
            img(
                src="@/assets/img/UI-Health.jpg"
                style="max-width: 400px; width: 100%"
            )

            p(v-html="parse('copy.secondary_top')")
            .donation-box
                .donation-box-top
                    p(v-html="parse('copy.donation_top')")
                .donation-box-bottom
                    p(v-html="parse('copy.donation_bottom')")

    section.brand(
        style="text-align: center"
    )
        a(
            href="https://proampac.com/"
            target="_blank"
            style="max-width: 320px; width: 60%"
        )
            img(
                src="@/assets/svg/logo-main.svg"
                alt="Proampac Logo"
            )

        p(v-html="parse('copy.copyright')")


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

const parse = (key:string, inline:boolean=true) => {
    if( marked ){
        return marked[inline?'parseInline':'parse'](t(key));
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
            els.forEach( el => (observer as IntersectionObserver).observe(el) );
        }
    }
};
onMounted(() => setTimeout( setupAnimations, 500 ) );

</script>
<style scoped lang="scss">
@use '@/assets/variables' as *;
.card {
    z-index: 1;
    animation: fade-in 1s 0 ease-in-out;
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 100vh;
    padding-bottom: 40px;
    color: var(--dark-gray);
    @media (min-width: 768px) {
        padding: 3vw;
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
.language-chooser {
    position: absolute;
    z-index: 2;
    margin-top: -1.5rem;
    right: 10px;
}
.inside-card {
    position: relative;
    z-index: 3;
    margin: -10% 5% 3rem;
    border-radius: 24px;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    flex-direction: column;
    justify-content: stretch;
    gap: 2rem;
    background: #fff;
    position: relative;
    box-shadow: 0 2rem 4rem rgba(0,0,0,0.05);
    
    @media screen and (min-width: 1000px) {
        gap: 3rem;
        grid-template-columns: 1fr 1fr;
    }

    h2 {
        color: var(--blue);;
        margin-bottom:0;
        font-weight: 600;
        font-family: 'Helvetica', 'Arial', sans-serif;
        letter-spacing: -0.03em;
    }
}
.primary-text {
    flex: 1 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media screen and (min-width: 1000px) {
        text-align: right;
    }
}
.secondary-text {
    flex: 1 0;
    color: var(--blue);
    text-align: center;
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    img {
        max-width: 100%;
    }
    @media screen and (min-width: 1000px) {
        text-align: left;
    }
}
p {
    margin-top: 0;
    margin-bottom: 0;
}
.donation-box {
    text-align: center;;
    color: #000;
    font-size: var(--step--1);
    background-color: #AED1CA;
    border-radius: 0.75rem;
    overflow: hidden;
    &:deep(a) {
        color: #000;
        text-decoration: none;
        font-weight: 600;;
    }
    > div {
        padding: 1em;
    }
    .donation-box-bottom {
        background-color: #CBE2DA;
        font-size:var(--step--2);
        p {
            max-width: 25ch;
            margin: 0 auto;
        }
    }
}
.brand {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
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
