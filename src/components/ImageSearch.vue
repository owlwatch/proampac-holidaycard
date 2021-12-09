<template lang="pug">
main.image-search
    .image-container
        img.image(
            :src="imageFile"
            usemap="#items-map"
            width="1575"
            height="2475"
        )

        svg(
            viewBox="0 0 1567 2475"
            xmlns="http://www.w3.org/2000/svg"
        )
            template(
                v-for="item in items"
            )
                polygon(
                    ref="polygons"
                    v-bind="polygonAttrs(item)"
                    @click="select(item)"
                )
                    title {{ $t(`items.${item.key}`) }}

    .image-items
        .directions(
            v-html="$t('copy.html_directions')"
        )
        
        ul.sticky.items-list
            li(
                v-for="(item,i) in items"
                :class="{selected: isSelected(item)}"
            )
                span.material-icons.material-icons-outlined
                    | {{ isSelected(item) ? 'check_circle' : 'radio_button_unchecked'}} 
                span(
                    :for="`item-${i}`"
                ) {{ $t(`items.${item.key}`)}}

</template>

<script>
export default {
    data(){
        return {
            selected: []
        }
    },
    props: {
        items: Array
    },
    computed: {
        imageFile(){
            return require(`../assets/${this.$t('copy.where_file')}`);
        }
    },
    methods: {
        polygonAttrs(item){
            
            const div = document.createElement('div');
            div.innerHTML = item.image_map;
            const area = div.querySelector('area');
            if( !area || !area.hasAttributes() ){
                return {};
            }
            const points = area.getAttribute('coords');
            return {points};
        },
        select(item){
            if( !this.selected.includes(item) ){
                this.selected.push(item);
            }
        },
        isSelected(item){
            return this.selected.includes(item);
        }
    }
}
</script>

<style scoped lang="scss">
.image-search {
    display: flex;
}
.image-container {
    flex-grow: 1;
    position: relative;
    &::before, &::after{
        display: block;
        content: '';
        position: absolute;
        z-index: 1;
        left: 0;
        width: 100%;
        height: 3%;
    }
    &::before {
        top: 0;
        background-image: linear-gradient(rgba(#ffffff, 1) 0%, rgba(#ffffff, 0) 100%);
    }
    &::after {
        bottom: 0;
        background-image: linear-gradient(rgba(#ffffff, 0) 0%, rgba(#ffffff, 1) 100%);
    }
    img {
        position: relative;
        max-width: 100%;
        width: 100%;
        height: auto;
        display: block;
    }
    svg {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        polygon {
            // fill: rgba(#f00, 0.4);
            fill: transparent;
            cursor: pointer;
            // stroke-width: 0.15%;
        }
    }
}
.image-items {
    padding: 10px 20px;
    background: #fff;
    min-height: 100%;
    text-align: left;
    width: 700px;
}
.directions {
    h2 {
        font-size: 4rem;
    }
}
.sticky {
    position: sticky;
    top: 10px;
}
.items-list {
    list-style: none;
    padding-left: 0em;
    columns: 2;
    font-size: 0.9rem;
    li {
        margin-left: 0;
        display: flex;
        align-items: flex-start;
        margin-bottom: 0.5em;
        line-height: 1.5;
        .material-icons {
            font-size: 1.33em;
            margin-right: 0.25em;

        }
        &.selected {
            .material-icons {
                color: #77be43;
            }
        }
    }
}

</style>