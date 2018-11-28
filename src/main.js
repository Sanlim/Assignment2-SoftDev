import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditFunrunDetailsDialog from './components/Funrun/Edit/EditFunrunDetailsDialog.vue'
import VueI18n from 'vue-i18n'


Vue.use(Vuetify)
Vue.use(VueI18n)

const messages = {
  en: {
    message: {
      hello: 'hello world',
      signup: 'Register',
      signin: 'Signin',
      translate: 'Translate to TH',
      readall: 'Read All Posts',
      add: 'Add Your Cartoon',
      members: 'Members',
      logout: 'Logout'
    }
  },
  th: {
    message: {
      hello: 'こんにちは、世界',
      signup: 'สมัครสมาชิก',
      signin: 'เข้าสู่ระบบ',
      translate: 'เปลี่ยนภาษา เป็น EN',
      readall: 'อ่านการตูนทั้งหมด',
      add: 'เพิ่มการ์ตูน',
      members: 'สมาชิกในกลุ่ม',
      logout: 'ออกจากระบบ'
    }
  }
}

const i18n = new VueI18n({
  locale: 'th', // set locale
  messages, // set locale messages
})

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-funrun-details-dialog', EditFunrunDetailsDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyD1TDCwoqDloX6vICzyMtfhmn1wDyfgTDk",
      authDomain: "softwaredev-46883.firebaseapp.com",
      databaseURL: "https://softwaredev-46883.firebaseio.com",
      projectId: "softwaredev-46883",
      storageBucket: "gs://softwaredev-46883.appspot.com"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadFunruns')
  }
})
