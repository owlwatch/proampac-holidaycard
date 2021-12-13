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
            type="circle"
            :outZoomer="isTouch"
            :scale="1.5"
            ref="photoZoom"
            :activeItem="activeItem"
            :isSelected="isSelected"
            @found="found"
        )

            image-svg.preview(
                :items="items"
                :imageFile="imageFile"
                @enter="enter"
                @leave="leave"
            )
</template>

<script>
import confetti from 'canvas-confetti';
import VuePhotoZoomPro from './VuePhotoZoomPro/VuePhotoZoomPro.vue';
import ImageSvg from './ImageSvg.vue';
const dingUrl = require("../assets/335908__littlerainyseasons__correct.mp3");
const finishUrl = require("../assets/171671__leszek-szary__success-1.wav");
export default {
    components: {
        VuePhotoZoomPro,
        ImageSvg
    },
    data(){
        const ding = new Audio(dingUrl);
        const finish = new Audio(finishUrl);
        const dingReady = new Promise( (resolve) => {
            ding.addEventListener('canplaythrough', () => {
                resolve(ding);
            });
        });
        const finishReady = new Promise( (resolve) => {
            finish.addEventListener('canplaythrough', () => {
                resolve(finish);
            });
        });
        return {
            selected: [],
            activeItem: null,
            started: false,
            dingReady,
            finishReady

        }
    },
    props: {
        items: Array,
        isTouch: {
            type: Boolean,
            default: false
        }
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
        complete(v){
            if( v ){
                // we need to throw a little party.
                this.party();
            }
        }
    },
    methods: {
        select(item){
            item.found = true;
        },
        isSelected(item){
            return this.selected.includes(item);
        },
        enter(item){
            this.activeItem = item;
        },
        leave(){
            this.activeItem = null;
        },
        found(item){
            item.found=true;
            this.$refs.info.classList.remove('found');
            setTimeout( () => this.$refs.info.classList.add('found'), 1);
            if( this.complete ){
                this.finishReady.then(sound => {
                    sound.pause();
                    sound.currentTime=0;
                    sound.play();
                });
            }
            else {
                this.dingReady.then(sound => {
                    sound.pause();
                    sound.currentTime=0;
                    sound.play();
                });
            }
        },

        party(){
            var end = Date.now() + (4 * 1000);

            // go Buckeyes!
            var colors = ['#0b8dba', '#77BC1F'];

            (function frame() {
                confetti({
                    particleCount: 4,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 4,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
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
    .preview {
        position: relative;
        max-width: 100%;
        width: 100%;
        height: auto;
        display: block;
        z-index: 1;
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
    top: 20px;
    pointer-events: all;
    padding: 0.2em 1em;
    border-radius: 10px;
    margin-top: 20px;
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