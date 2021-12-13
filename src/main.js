import 'normalize.css';

import { createApp, reactive } from 'vue'
import App from './App.vue'
import axios from 'axios';
import { createI18n } from 'vue-i18n';
import {marked} from 'marked';
import 'pinch-zoom-element';
import VueToast from 'vue-toast-notification';

async function run(){

    const sheetId = '1K8IJKGGto4KRKVAxYR-KUyNizOP2JquE1QqEPxkCirM';
    const apiKey = 'AIzaSyAvdeXGDbQKvKaUnUwjNYZ_Sn1rRp8wPnM';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet/?ranges=Translations&ranges=Items&key=${apiKey}`;
    const response = await axios.get(url);

    // lets load up the i18n
    let headers = null;
    let messages = {};
    const items = [];
    const langs = [];
    let keyIndex = null;
    
    response.data.valueRanges[0].values.forEach( row => {
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
            headers.forEach( (v, i) => {
                if( i === keyIndex ){ return; }
                if( !messages[v] ){
                    messages[v] = {copy:{},items:{}};
                }
                messages[v].copy[row[keyIndex]] = row[keyIndex].match(/^html/) ? marked.parse(row[i]) : row[i];
            });
        }
    });

    headers = null;
    response.data.valueRanges[1].values.forEach( row => {
        if( headers === null ){
            headers = row;
            keyIndex = headers.indexOf('key');
        }
        else {
            const obj = {found:false};
            headers.forEach( (v, i) => {
                obj[v] = row[i];
                if( i === keyIndex ){ return; }
                if( messages[v] ){
                    messages[v].items[row[keyIndex]] = row[i];
                }
            });
            items.push(reactive(obj));
        }
    });
    
    let locale = localStorage.getItem('locale');
    if( !locale ) locale = navigator.language;
    if( !langs.includes(locale) ){
        if( locale.match(/-/) ){
            locale = locale.split('-').shift();
        }
    }
    if( !langs.includes(locale) ){
        locale = 'en';
    }

    const i18n = createI18n({
        locale,
        warnHtmlMessage: false,
        fallbackLocale: 'en',
        messages
    });

    const app = createApp(App,{items, langs});
    app.use(i18n);
    app.use(VueToast);
    app.mount('#app')
}

run();