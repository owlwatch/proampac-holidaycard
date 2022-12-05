<template lang="pug">
div.quote(
    ref="root"
)
    .quote-content(
        ref="quoteContent"
    )
        .quote-arrow(
            :style="arrowStyle"
        )
            template(
                v-if="0 == index % 3"
            )
                <svg width="27" preserveAspectRatio="none" height="48" viewBox="0 0 27 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.2865 0L26.0507 47.3512L0.760498 35.7703L10.2865 0Z" fill="#E3746D"/>
                </svg>
            template(
                v-if="1 == index % 3"
            )
                <svg width="26" preserveAspectRatio="none" height="34" viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.2494 0.942383L0.856934 31.9436L25.5658 33.4937L10.2494 0.942383Z" fill="#6AA39F"/>
                </svg>
            
            template(
                v-if="2 == index % 3"
            )
                <svg width="20" preserveAspectRatio="none" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.17312 0.25L0.713623 39.0073L19.5735 33.913L5.17312 0.25Z" fill="#908FB5"/>
                </svg>



        .quote-bg
                template(
                    v-if="0 == index % 3"
                )
                    <svg width="189" preserveAspectRatio="none" height="87" viewBox="0 0 189 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M171.942 86.7553L20.8319 85.0526C10.3225 84.9352 1.79456 76.5394 1.501 66.0299L0.282725 21.4822C-0.040191 9.62237 9.67665 -0.0797888 21.5512 0.272483L170.239 4.67588C179.457 4.95477 186.855 12.3525 187.119 21.5703L188.528 69.8903C188.792 79.1961 181.277 86.858 171.957 86.7553H171.942Z" fill="#E3746D"/>
                    </svg>
                
                template(
                    v-if="1 == index % 3"
                )
                    <svg width="173" preserveAspectRatio="none" height="68" viewBox="0 0 173 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M157.542 0.544999L14.4759 2.41735C6.49539 2.52478 0.0649414 9.64585 0.0649414 18.4091V49.2722C0.0649414 58.0047 6.44935 65.1104 14.3992 65.2639L154.519 67.8115C162.146 67.9496 168.592 61.6113 169.282 53.2778L172.214 17.9947C172.996 8.5562 166.167 0.43757 157.511 0.544999H157.542Z" fill="#6AA39F"/>
                    </svg>

                template(
                    v-if="2 == index % 3"
                )
                    <svg width="170" preserveAspectRatio="none" height="69" viewBox="0 0 170 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M154.202 68.5052L16.1747 66.6936C7.6893 66.5852 0.8607 59.0133 0.783278 49.6763L0.535523 17.8869C0.458101 8.14723 7.75127 0.281186 16.5928 0.590872L154.605 5.36005C162.951 5.65425 169.609 13.1487 169.687 22.3464L169.934 51.1782C170.012 60.8095 162.904 68.6291 154.171 68.5052H154.202Z" fill="#908FB5"/>
                    </svg>


                
        p {{ copy }}
</template>
    
<script lang="ts" setup>
import { watch, ref, toRefs, onMounted } from 'vue';

const props = defineProps<{
    copy: string
    index: number
    ready: boolean
    progress: any
}>();

const {progress, ready} = toRefs(props);

const root = ref<HTMLDivElement>();
const quoteContent = ref<HTMLDivElement>();
const parent = ref<Element|null>();
const position = ref<number>(0);
const arrowStyle = ref<any>({});

onMounted( () => {
    parent.value = root.value?.closest('.flickity');

});

const updatePosition = () => {
    if( root.value && parent.value ){
        let box = root.value.getBoundingClientRect();
        // lets get the halfway
        let x = box.left + (box.width/2);

        let windowWidth = window.innerWidth;
        let center = windowWidth / 2;

        position.value = (x - center) / center;
    }
}

const updateArrow = () => {
    const left = 50 + Math.max(-1, Math.min(1, position.value)) * -30;
    const rotate = Math.max(-1, Math.min(1, position.value)) * -35
    arrowStyle.value.left = left + '%';
    arrowStyle.value.transform = `rotate(${rotate}deg)`;
};

const updateBox = () => {
    if( !quoteContent.value ){
        return;
    }
    const rotate = Math.max(-2, Math.min(2, position.value)) * -20;
    const left = 50 + Math.max(-2, Math.min(2, position.value)) * -30;
    const translateY = Math.abs( Math.max(-2, Math.min(2, position.value)) ) * -40;
    const opacity = 1 + Math.abs( Math.max(-1, Math.min(1, position.value*.75)) ) * -1;
    const blur = 0 + Math.abs( Math.max(-1, Math.min(1, position.value)) ) * 2;

    quoteContent.value.style.transform = `rotate(${rotate}deg) translateY(${translateY}%)`;
    quoteContent.value.style.filter = `blur(${blur}px)`;
    quoteContent.value.style.transformOrigin = `${left}% 20px`;
    quoteContent.value.style.opacity = `${opacity}`;
};

watch( progress, updatePosition);
watch( ready, updatePosition);
watch( position, updateArrow );
watch( position, updateBox );

</script>

<style scoped lang="scss">
.quote {
    width: 240px;
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1.33rem;
}
.quote-content {
    position: relative;
    width: 100%;
    min-height: 120px;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        margin-top: 0;
        margin-bottom: 0;
        padding: 20px;
        position: relative;
        z-index: 1;
        line-height: 1.2;
    }
}
.quote-bg {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    bottom: 0px;
    svg {
        width: 100%;
        height: 100%;
    }
}

.quote-arrow {
    position: absolute;
    top: 0%;
    left: 50%;
    height: 50%;
    width: 20%;
    transform-origin: 0% 50%;
    svg {
        transform: translate(-50%, -30px);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

}

@media( min-width: 600px ){
    .quote {
        width: 400px;
        font-size: 1.4rem;
    }
    .quote-content {
        min-height: 180px;
    }
}
</style>