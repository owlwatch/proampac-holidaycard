import {createApp} from "vue";
import axios from 'axios';
import {createI18n} from 'vue-i18n';
import {marked} from 'marked';

import App from "./App.vue";


async function run(){

    const sheetId = '1CqXld23sAimNWboKOE8nvep-iiIir82wbz9JisqiBtA';
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
            headers.forEach( (v:string, i) => {
                if( i === keyIndex ){ return; }
                if( !messages[v] ){
                    messages[v] = {copy:{}};
                }
                messages[v].copy[row[keyIndex]] = row[i];
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
    
    const pageLoader = document.querySelector('.page-loader');
    if( pageLoader ){
        pageLoader.classList.add('loaded');
    }

    app.mount('#app');
}
run();