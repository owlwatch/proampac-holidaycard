<template lang="pug">
.card(
    ref="root"
    :class="{[`locale-`+locale]: true}"
)
    scene(
        
    )

    section.inside-card(
        
    )
        .interior-card
            h2.heading(
                data-animate="fade-up"
                v-html="parse('copy.interior_heading')"
            )

            p(data-animate="fade-up" v-html="parse('copy.interior')")

        .primary-text
            h2(data-animate="fade-up" v-html="parse('copy.primary_heading')")

            p( data-animate="fade-up" v-html="parse('copy.primary_body')")

            .impact-2025

                img.impact-pipes(
                    data-animate="fade-up"
                    src="@/assets/img/impact-pipes.jpg"
                )
                .impact-2025-copy

                    .impact-2025-heading(
                        data-animate="fade-up"
                    ) IMPACT<strong>&rsquo;25</strong>

                    .impact-2025-text(
                        data-animate="fade-up"
                        v-html="parse('copy.impact_copy')"
                    )
        
        .secondary-text
            img(
                data-animate="fade-up"
                src="@/assets/img/balance-and-believe-foundation.png"
                alt="Balance and Believe Foundation Logo"
            )

            p(data-animate="fade-up" v-html="parse('copy.secondary_top')")

            p.link(
                data-animate="fade-up"
                style="text-align: center"
            )
                a(
                    data-animate="fade-up"
                    href="https://balanceandbelievefoundation.org"
                    target="_blank"
                ) balanceandbelievefoundation.org

    section.brand(
        style="text-align: center"
    )
        a(
            data-animate="fade-up"
            href="https://proampac.com/"
            target="_blank"
            style="max-width: 320px; width: 60%"
        )
            img(
                src="@/assets/svg/logo-main.svg"
                alt="Proampac Logo"
            )

        p(data-animate="fade-up" v-html="parse('copy.copyright')")


</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { marked } from 'marked';

import Scene from './components/Scene.vue';
import LanguageChooser from './components/LanguageChooser.vue';
import Pipes from './components/Pipes.vue';

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
    margin: -2% 5% 3rem;
    border-radius: 24px;
    
    display: grid;
    grid-template-columns: 1fr;
    flex-direction: column;
    justify-content: stretch;
    overflow: hidden;
    gap: 2rem;
    background: #fff;
    position: relative;
    box-shadow: 0 2rem 4rem rgba(0,0,0,0.25);
    
    @media screen and (min-width: 1000px) {
        gap: 0rem;
        grid-template-columns: 1.5fr 1fr;

        .interior-card {
            grid-column: 1 / span 2;
        }
    }

    h2 {
        color: var(--light-blue);
        margin-bottom:0;
        font-weight: 600;
        font-family: 'Helvetica', 'Arial', sans-serif;
        letter-spacing: -0.03em;
    }
}

.impact-pipes {
    margin-left: -2em;
    width: 150px;
}

.interior-card {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2em;

    align-items: center;
    padding-bottom: 2rem;
    position: relative;
    border-bottom: 1px solid #d8d8d8;
    img {
        max-height: 200px;
        max-width: 100%;
    }
    p {
        max-width: 50ch;
    }
    .heading {
        color: var(--light-green);
        font-family: var(--cursive-font);
        font-size: var(--step-5);
        font-weight: 200;
        word-spacing:0.25em;
        max-width: 22ch;
    }
}

:deep(strong) {
    font-weight: 600;
}
.primary-text, .secondary-text {
    padding: 1rem 2rem;
}
.primary-text {
    flex: 1 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    // padding-right: 1rem;
    @media screen and (min-width: 1000px) {
        text-align: left;
    }


    h2 {
        font-weight: 700;
        text-transform: uppercase;
    }
}
:deep(a) {
    color: var(--blue);
    text-decoration: none;
    font-weight: 600;
    &:hover {
        text-decoration: underline;
    }
}
.secondary-text {
    background: #f5f5f5;
    flex: 1 0;
    // color: var(--blue);
    text-align: center;
    align-self: stretch;
    justify-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding-left: 2rem;
    padding-top: 2rem;
    img {
        width: 320px;
        max-width: 100%;
        mix-blend-mode: multiply;
    }
    @media screen and (min-width: 1000px) {
        text-align: center;
    }

    .link {
        font-size: var(--step--1);
        a {
            color: #000;
            text-decoration: none;
            font-weight: 400;
        }

    }
}
.impact-2025 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
    flex-wrap: nowrap;
    &-copy {
        display: grid;
        gap: 0.5rem;
    }
    &-heading {
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-size: var(--step-3);
        color: var(--darkest-green);
        strong {
            color: var(--light-green);
        }
    }
    &-text {
        line-height: 1.4;
        font-size: 0.75rem;
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
    transition: 1s transform, 1s opacity, 1s top, 1s right;
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
