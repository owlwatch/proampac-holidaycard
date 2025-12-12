import {createApp} from "vue";
import axios from 'axios';
import {createI18n} from 'vue-i18n';
import {marked} from 'marked';

import App from "./App.vue";
import Particles from "@tsparticles/vue3";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadFull } from "tsparticles"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.


async function run(){

    const sheetId = '1uG6_ndH6qbCDvYO9Vll-2-9lHugiORwCovIYwW85YDQ';
    const apiKey = 'AIzaSyAvdeXGDbQKvKaUnUwjNYZ_Sn1rRp8wPnM';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet/?ranges=Translations&key=${apiKey}`;
    const response = await axios.get(url);

    // lets load up the i18n
    let headers : Array<string>|null = null;
    let messages : {[lang:string]: {[key:string]: {[key:string]: string}}} = {};
    const langs : Array<string> = [];
    let keyIndex = -1;
    
    response.data.valueRanges[0].values.forEach( (row: Array<string>) => {
        if( !headers ){
            headers = row;
            keyIndex = headers.indexOf('key');
            headers.forEach( v => {
                if( 'key' !== v ){
                    langs.push(v);
                }
            })
        }
        else {
            if (keyIndex === -1) { return; }
            const key = row[keyIndex];
            if (!key) { return; }
            headers.forEach( (v:string, i) => {
                if( i === keyIndex ){ return; }
                const value = row[i];
                if (value === undefined) { return; }
                let langMessages = messages[v];
                if( !langMessages ){
                    langMessages = {copy:{}};
                    messages[v] = langMessages;
                }
                if( !langMessages.copy ){
                    langMessages.copy = {};
                }
                langMessages.copy[key] = value;
            });
        }
    });
    
    let locale : string | null | undefined = localStorage.getItem('locale');
    if( !locale ) locale = navigator.language;
    if( !langs.includes(locale) ){
        if( locale.match(/-/) ){
            locale = locale.split('-').shift();
        }
    }
    if( !locale || !langs.includes(locale) ){
        locale = 'en';
    }

    const i18n = createI18n({
        locale,
        legacy: false,
        warnHtmlMessage: false,
        fallbackLocale: 'en',
        messages
    });

    const app = createApp(App, {langs} );
    app.use(i18n);
    app.use(Particles, {
        init: async engine => {
            // await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
            await loadFull(engine); // or you can load the slim version from "@tsparticles/slim" if don't need Shapes or Animations
        },
    });
    
    const pageLoader = document.querySelector('.page-loader');
    if( pageLoader ){
        pageLoader.classList.add('loaded');
    }

    app.mount('#app');
}
run();
