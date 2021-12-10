<template lang="pug">
main.image-search
    .image-container
        .fade-sides

        .info-wrap(
            :class="{'no-mouse-events': started}"
        )
            .intro(
                v-if="!started"
            )
                div(
                    v-html="$t('copy.html_directions')"
                )

                button(
                    @click="started=true"
                ) 
                    span Start Search
                    span.material-icons(
                        style="margin-left: 0.25em;"
                    ) chevron_right
            .info(
                v-if="started"
                ref='info'
            )
                p(
                    v-if="!complete"
                ) {{ $t('copy.found_progress', [foundItems, totalItems]) }}

                p(
                    v-else
                ) {{ $t('copy.found_complete', [totalItems]) }}

        vue-photo-zoom-pro(
            :disabled="false"
            :high-url="imageFile"
            type="circle"
            :scale="1.5"
            ref="photoZoom"
            :activeItem="activeItem"
            :isSelected="isSelected"
            @found="found"
        )
            svg(
                viewBox="0 0 1567 2475"
                xmlns="http://www.w3.org/2000/svg"
                ref="svg"
            )
                symbol(
                    id="check"
                    viewBox="0 0 24 24"
                )
                    path(
                        d="M0 0h24v24H0V0z" fill="none"
                    )
                    path(
                        d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm-2 13l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
                    )
                    path(
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" fill="#ffffff"
                    )

                image(
                    :href="imageFile"
                    width="1567"
                    height="2475"
                )

                template(
                    v-for="item in items"
                )
                    polygon(
                        ref="polygons"
                        v-bind="polygonAttrs(item)"
                        @mouseenter="highlight(item);"
                        @mouseleave="unhighlight(item)"
                    )

                    use.checkmark(
                        v-if="item.found"
                        v-bind="checkboxAttrs(item)"
                        href="#check"
                        fill="#629f37"
                        width="40"
                        height="40"
                        transform="translate(-20 -50)"
                    )
</template>

<script>
import VuePhotoZoomPro from './VuePhotoZoomPro/VuePhotoZoomPro.vue';
export default {
    components: {
        VuePhotoZoomPro
    },
    data(){
        return {
            selected: [],
            activeItem: null,
            started: false
        }
    },
    props: {
        items: Array
    },
    computed: {

        imageFile(){
            return require(`../assets/${this.$t('copy.where_file')}`);
        },

        svgDataUrl(){
            if( this.$refs.svg ){
                const string = new XMLSerializer().serializeToString(this.$refs.svg);
                return "data:image/svg+xml;base64,"+window.btoa(string);
            }
            return '';
        },

        foundItems(){
            return this.items.filter(item => {
                return item.found;
            }).length;
        },

        totalItems(){
            return this.items.length;
        },

        complete(){
            return this.items.length == this.foundItems;
        }
    },
    mounted(){

    },
    watch: {
        foundItems(){
            
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
        areaAttrs(item){
            const div = document.createElement('div');
            div.innerHTML = item.image_map;
            const area = div.querySelector('area');
            if( !area || !area.hasAttributes() ){
                return {};
            }
            const a = area.attributes;
            const attrs = {};
            for(let i=0; i<a.length; i++){
                attrs[a.name] = a.value;
            }
            return attrs;
        },
        checkboxAttrs(item){
            if( !item.checkboxPosition ){
                const coords = this.getCoords(item);
                let xys = coords.split(',');
                let xmin, xmax, ymin, ymax;
                xys.forEach( (v,i) => {
                    if( i%2 == 0 ){
                        xmin = xmin ? Math.min(xmin, v) : v;
                        xmax = xmax ? Math.max(xmax, v) : v;
                    }
                    else{
                        ymin = ymin ? Math.min(ymin, v) : v;
                        ymax = ymax ? Math.max(ymax, v) : v;
                    }
                });
                let x = xmin + (xmax-xmin) / 2;
                let y = ymin + (ymax-ymin) / 2;
                return {x,y};
            }
        },
        getCoords(item){
            const div = document.createElement('div');
            div.innerHTML = item.image_map;
            const area = div.querySelector('area');
            if( !area || !area.hasAttributes() ){
                return {};
            }
            const coordinates = area.getAttribute('coords');
            return coordinates;
        },
        select(item){
            item.found = true;
        },
        isSelected(item){
            return this.selected.includes(item);
        },
        highlight(item){
            this.activeItem = item;
        },
        unhighlight(){
            this.activeItem = null;
        },
        found(item){
            item.found=true;
            this.$refs.info.classList.remove('found');
            setTimeout( () => this.$refs.info.classList.add('found'), 1)
        }
    }
}
</script>

<style scoped lang="scss">
@import '../variables.scss';
.image-search {
    display: flex;
}
.image-container {
    flex-grow: 1;
    position: relative;
    margin: 0 auto;
    max-width: 1500px;
    &::before, &::after{
        display: block;
        content: '';
        position: absolute;
        z-index: 2;
        left: 0;
        width: 100%;
        height: 3%;
        pointer-events: none;
    }
    &::before {
        top: 0;
        background-image: linear-gradient(rgba(#ffffff, 1) 0%, rgba(#ffffff, 0) 100%);
    }
    &::after {
        bottom: 0;
        background-image: linear-gradient(rgba(#ffffff, 0) 0%, rgba(#ffffff, 1) 100%);
    }
    .fade-sides {
        pointer-events: none;
        z-index: 2;
        &::before, &::after{
            display: block;
            content: '';
            position: absolute;
            z-index: 2;
            top: 0;
            height: 100%;
            width: 2%;
            pointer-events: none;
        }
        &::before {
            left: 0;
            background-image: linear-gradient(to right, rgba(#ffffff, 1) 0%, rgba(#ffffff, 0) 100%);
        }
        &::after {
            right: 0;
            background-image: linear-gradient(to left, rgba(#ffffff, 1) 0%, rgba(#ffffff, 0) 100%);
        }
    }
    img {
        position: relative;
        max-width: 100%;
        width: 100%;
        height: auto;
        display: block;
        z-index: 1;
    }
    svg {
        position: relative;
        max-width: 100%;
        width: 100%;
        height: auto;
        display: block;
        z-index: 1;
        polygon {
            // fill: rgba(#f00, 0.4);
            fill: transparent;
            cursor: pointer;
            // stroke-width: 0.15%;
        }
        .checkmark {
            filter: drop-shadow(0 0 10px #629f37);
        }
    }
}
.image-items {
    padding: 10px 20px;
    background: #fff;
    min-height: 100%;
    text-align: left;
    width: 400px;
    max-width: 25%;
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
    // columns: 2;
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
                color: #629f37;
            }
        }
    }
}

.info-wrap {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    &.no-mouse-events {
        pointer-events: none;
    }
}

.intro {
    background: rgba( #ffffff, 0.9);
    // mix-blend-mode: multiply;
    position: sticky;
    top: 20px;
    width: 400px;
    max-width: 95%;
    padding: 2rem;
    margin-top: 20px;
    border-radius: 20px;
}

.info {
    color: #fff;
    background: rgba($dark-green,0.8);
    mix-blend-mode: multiply;
    position: sticky;
    top: 10px;
    pointer-events: all;
    padding: 0.2em 1em;
    border-radius: 10px;
    margin-top: 10px;
    font-weight: 400;
    border: 2px solid #fff;
    text-shadow: 0px 1px 4px rgba(0,0,0,0.5);
    p {
        margin: 0;
    }
    &.found {
        animation: pulse 1.5s ease-out 0s 1;
    }
}

button {
    background: #fff;
    transition: color 0.2s;
    border: 1px solid $blue;
    color: $blue;
    padding: 0.5em 1em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{ 
        color: darken($blue, 10%);
    }
}

@keyframes pulse {
	0% {
		box-shadow: 0 0 0 0 rgba($green, 0.7);
	}

	70% {
		box-shadow: 0 0 0 50px rgba($green, 0);
	}

	100% {
		box-shadow: 0 0 0 0 rgba($green, 0);
	}
}
</style>