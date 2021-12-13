<template lang="pug">
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
            @mouseenter="$emit('enter', item)"
            @mouseleave="$emit('leave', item)"
            @click="$emit('itemClick', item)"
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
export default {
    props: {
        imageFile: {
            type: String,
            default: ''
        },
        items: {
            type: Array,
            default: ()=>[]
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
        }
    }
}
</script>

<style lang="scss" scoped>
polygon {
    // fill: rgba(#f00, 0.4);
    fill: transparent;
    cursor: pointer;
    // stroke-width: 0.15%;
}
.checkmark {
    filter: drop-shadow(0 0 10px #629f37);
}

</style>