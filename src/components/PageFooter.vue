<template lang="pug">
footer.footer
    a(
        href="https://peaf.org/"
        target="_blank"
    )
        img(
            src="../assets/PEAFlogoCMYK.webp"
        )

    div(
        v-html="$t('copy.html_fund')"
    )

    .locale-changer
        ul
            li(
                v-for="locale in $i18n.availableLocales"
                :key="`locale-${locale}`"
            ) 
                a(
                    :class="{'active': locale === $i18n.locale}"
                    @click.prevent="updateLocale(locale)"
                ) {{ $t('copy.language_code', locale) }}
</template>

<script>
export default {

    methods: {
        updateLocale(locale){
            this.$root.$i18n.locale = locale;
            localStorage.setItem('locale', locale);
        }
    }

}
</script>

<style lang="scss">
@import "rfs/scss";
.footer {
    padding: 4rem 1rem;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    @include font-size(1rem);
    @media( min-width: 800px ){
        @include font-size(1.7rem);
    }
    img {
        width: 350px;
        max-width: 60vw;
    }
}
.locale-changer {
    font-size: 0.75rem;
    position: fixed;
    z-index: 3;
    left: 0;
    width: 100%;
    bottom: 0;
    background: rgba(#fff, 0.9);
    padding: 4px 10px;
    text-align: left;

    ul {
        margin: 0 0 0 auto;
        list-style: none;
        display: block;
        text-align: center;
        padding-left: 0;
        li {
            display: inline-block;
            padding-left: 0;

            a {
                display: block;
                padding: 0 0.5em;
                cursor: pointer;
                &.active {
                    color: #000;
                }
            }
        }
    }
}
</style>