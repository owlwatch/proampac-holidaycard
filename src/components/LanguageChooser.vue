<template lang="pug">
.language-chooser(

)
    ul
        li(
            v-for="availableLocale in locales"
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
                )
                span {{ messages[availableLocale]['copy'].language_code }}
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, availableLocales, t, messages } = useI18n({useScope:'global'});

const locales = availableLocales.splice(0, availableLocales.length);
locales.sort( (a, b) => {
    if( a == 'en' ){
        return -1;
    }
    if( b == 'en' ){
        return 1;
    }
    return String(a) < String(b) ? 1 : -1;
});

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
</script>

<style lang="scss" scoped>
@import '@/assets/variables';
ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    gap: 1rem;
    font-size: 0.9rem;
    
    li {
        list-style: none;
        padding: 0;
        margin: 0;
        span {
            color: $dark-green;
            font-weight: 600;
        }
        label:hover span {
            color: $pink;
        }
        input {
            opacity: 0;
            width: 0;
            &:checked + span {
                color: inherit;
                font-weight: bold;
            }
        }
    }
}
</style>