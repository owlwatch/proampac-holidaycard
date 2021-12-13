<template lang="pug">
main.image-search(
    :class="{'is-touch': isTouch}"
)
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
                    @click="start()"
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

        .touch-container(
            v-if="isTouch"
            :class="{'playing':started && !paused && !complete}"
        )
            .touch-scroller
                .touch-sizer
                    .touch-element
                        image-svg.preview(
                            :items="items"
                            :imageFile="imageFile"
                            @itemClick="itemClick"
                        )

        vue-photo-zoom-pro(
            v-if="!isTouch"
            :disabled="false"
            type="circle"
            :outZoomer="isTouch"
            :scale="1.5"
            ref="photoZoom"
            :activeItem="activeItem"
            :isSelected="isSelected"
            @mouseleave="mouseleave"
            @found="found"
        )

            image-svg.preview(
                :items="items"
                :imageFile="imageFile"
                @enter="enter"
                @leave="leave"
            )
            template(
                v-slot:zoomer=""
            )
                image-svg(
                    :items="items"
                    :imageFile="imageFile"
                )
            template(
                v-slot:selector=""
            )
                div.item-label(
                    v-if="activeItem"
                ) {{ $t('items.'+activeItem.key) }}

</template>

<script>
import confetti from 'canvas-confetti';
import ImageSvg from './ImageSvg.vue';
import VuePhotoZoomPro from './VuePhotoZoomPro/VuePhotoZoomPro.vue';
const dingUrl = require("../assets/335908__littlerainyseasons__correct.mp3");
const finishUrl = require("../assets/171671__leszek-szary__success-1.wav");
export default {
    components: {
        VuePhotoZoomPro,
        ImageSvg
    },
    data(){
        const ding = new Audio();
        const finish = new Audio();
        
        let dingReady = false;
        
        ding.addEventListener('canplaythrough', () => {
            // alert('got the ding');
            this.dingReady = true;
        });

        ding.addEventListener('error', () => {
            // alert(e);
        })
        ding.src = dingUrl;
        ding.load();
        
        let finishReady = false;
        finish.addEventListener('canplaythrough', () => {
            this.finishReady = true;
        });
        finish.src=finishUrl;
        finish.load();

        document.body.appendChild( ding );
        document.body.appendChild( finish );
        
        return {
            selected: [],
            activeItem: null,
            started: false,
            paused: false,
            ding, finish,
            dingReady, finishReady

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
        },

        playing(){
            return this.started && !this.paused && !this.complete;
        }
    },
    mounted(){
        window.addEventListener('focus', ()=>this.maybeScrollALittle());
    },
    watch: {
        complete(v){
            if( v ){
                // we need to throw a little party.
                this.party();
            }
        },
        // playing(v){
        //     // document.body.style.overflow = v ? 'hidden' : '';
        // }
    },
    methods: {
        start(){
            this.started = true;
            if( this.isTouch ){
                // scroll to the game
                let top = this.$el.offsetTop;
                window.scrollTo({
                    top,
                    behavior: 'smooth'
                });
            }
        },
        select(item){
            item.found = true;
        },
        isSelected(item){
            return this.selected.includes(item);
        },
        itemClick(item){
            this.$toast.success(this.$t('items.'+item.key));
            if( !item.found ){
                this.found(item);
            }
        },
        enter(item){
            this.activeItem = item;
            this.$refs.photoZoom.$el.classList.add('found');
            if( !item.found ){
                this.found(item);
                this.$refs.photoZoom.$el.classList.remove('pulse');
                setTimeout( () =>  this.$refs.photoZoom.$el.classList.add('pulse'), 1 );
            }
        },
        leave(){
            this.activeItem = null;
            this.$refs.photoZoom.$el.classList.remove('found');
        },
        mouseleave(){
            this.$refs.photoZoom.$el.classList.remove('pulse');
        },
        found(item){
            item.found=true;
            this.$refs.info.classList.remove('found');
            setTimeout( () => this.$refs.info.classList.add('found'), 100);

            if( this.complete ){
                if( this.finishReady ){
                    this.finish.pause();
                    this.finish.currentTime=0;
                    this.finish.play();
                }
            }
            else {
                if( this.dingReady ){
                    this.ding.pause();
                    this.ding.currentTime=0;
                    this.ding.play();
                }
            }
        },
        maybeScrollALittle(){
            if(this.playing){
                // scroll to the game
                let top = this.$el.offsetTop - 1;
                window.scrollTo({
                    top,
                    behavior: 'smooth'
                });
                window.scrollTo({
                    top,
                    behavior: 'smooth'
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

    .touch-zoom-area > .moving {
        transition: all 0.25s;
    }

    &:not(.is-touch)::v-deep {
        .selector-inner {
            border: 4px solid #fff;
        }
        .found .selector-inner {
            border-color: $dark-green;
        }
        .pulse .selector-inner {
            animation: pulse 2s ease-out 0s 1;
        }
        .item-label {
            position: absolute;
            left: 50%;
            bottom: 100%;
            background: rgba(#fff, 1);
            mix-blend-mode: multiply;
            z-index: 100;
            font-size: 0.9rem;
            font-weight: 600;
            color: darken( $dark-green, 10% );
            border-radius: 0.5rem;
            padding: 4px 1em;
            transform: translate(-50%, -5px);
            border: 2px solid darken( $dark-green, 5%);
            // text-shadow: 1px 1px 1px rgba($dark-green,0.65);
            // box-shadow: 1px 1px 2px rgba(0,0,0,0.75);
            white-space: nowrap;
            transform-origin: 0% 50%;
            animation: slide-up 0.4s ease-out 0s 1;
        }
    }
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
.touch-container {
    height: 2475 / 1567 * 100%;

    .touch-scroller{
        transition: width 2s;
    }
    .touch-scroller {
        width: 100%;
        position: relative;
    }
    .touch-sizer {
        padding-bottom: 2475 / 1567 * 100%;
        position: relative;
        height: 0;
    }
    .touch-element {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    &.playing {
        height: 80vh;
        width: 100vw;
        overflow: scroll;

        .touch-scroller {
            width: 280%;
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

@keyframes pulse-circle {
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

@keyframes slide-up {
	0% {
    opacity: 0;
		transform: scale(0) translate(-50%, -5px);
	}
	100% {
    opacity: 1;
		transform: scale(1) translate(-50%, -5px);
	}
}
</style>