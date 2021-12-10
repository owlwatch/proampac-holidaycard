<template lang="pug">
header.intro(
    
)
    img.logo(
        src="../assets/proampac-logo.svg"
    )

    p(
        v-html="$t('copy.html_intro')"
    )
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
@import "rfs/scss";
.intro {
    text-align: center;
    max-width: 90vw;
    width: 900px;
    margin: 1rem auto 3rem;
    @include font-size(1.05rem);
    @media( min-width: 800px ){
        @include font-size(1.5rem);
    }
}
.logo {
    max-width: 70vw;
    width: 380px;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
</style>