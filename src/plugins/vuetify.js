import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#419A1C',
                secondary: '#F2E416'

            },
            dark: {
                primary: '#419A1C',
                secondary: '#F2E416'
            }
        }
    }
});
