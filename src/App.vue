<template>
  <v-app style="font-family: 'Kanit', sans-serif;">

    <v-navigation-drawer fixed temporary v-model="sideNav">
      <v-list>
        <!-- <v-list-tile
        v-for="item in menuItems"
        :key="item.title"
        router
        :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile> -->
       <v-list-tile to="/signin" v-if="userIsAuthenticated === false">
          <v-list-tile-action>
            <v-icon>lock_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ $t("message.signin") }}</v-list-tile-content>
        </v-list-tile>


        <v-list-tile to="/signup" v-if="userIsAuthenticated === false">
          <v-list-tile-action>
            <v-icon>face</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ $t("message.signup") }}</v-list-tile-content>
        </v-list-tile>
        
 
        

        <v-list-tile to="/funreads" v-if="userIsAuthenticated">
          <v-list-tile-action>
            <v-icon>book</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ $t("message.readall") }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/funread/new" v-if="userIsAuthenticated">
          <v-list-tile-action>
            <v-icon>library_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ $t("message.add") }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/member" v-if="userIsAuthenticated">
          <v-list-tile-action>
            <v-icon>face</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ $t("message.members") }}</v-list-tile-content>
        </v-list-tile>

        
        <v-list-tile
        @click="switchLocale">
          <v-list-tile-action>
            <v-icon>translate</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ $t("message.translate") }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="userIsAuthenticated"
        @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ $t("message.logout") }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click.native.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer"><v-icon>import_contacts</v-icon>
        FunRead</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        
        <v-btn to="/signin"
          v-if="userIsAuthenticated === false"
          flat >
          <v-icon left dark>lock_open</v-icon>
          {{ $t("message.signin") }}
        </v-btn>

        <v-btn to="/signup"
          v-if="userIsAuthenticated === false"
          flat >
          <v-icon left dark>face</v-icon>
          {{ $t("message.signup") }}
        </v-btn>

        

        <v-btn to="/funreads"
          v-if="userIsAuthenticated"
          flat >
          <v-icon left dark>book</v-icon>
          {{ $t("message.readall") }}
        </v-btn>

        <v-btn to="/funread/new"
          v-if="userIsAuthenticated"
          flat >
          <v-icon left dark>library_add</v-icon>
          {{ $t("message.add") }}
        </v-btn>

        <v-btn to="/member"
          v-if="userIsAuthenticated"
          flat >
          <v-icon left dark>face</v-icon>
          {{ $t("message.members") }}
        </v-btn>


        <v-btn
          flat
          @click="switchLocale">
          <v-icon left dark>translate</v-icon>
          {{ $t("message.translate") }}
        </v-btn>
        <!-- <v-btn flat
        v-for="item in menuItems"
        :key="item.title"
        router
        :to="item.link"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}</v-btn> -->
        <v-btn
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          {{ $t("message.logout") }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    // menuItems () {
    //   let menuItems = [
    //     { icon: 'face', title: 'สมัครสมาชิก', link: '/signup' },
    //     { icon: 'lock_open', title: 'เข้าสู่ระบบ', link: '/signin' },
       
    //   ]
    //   if (this.userIsAuthenticated) {
    //     menuItems = [
    //       { icon: 'book', title: 'อ่านการ์ตูนทั้งหมด', link: '/funreads' },
    //       { icon: 'library_add', title: 'เพิ่มการ์ตูน', link: '/funread/new' },
    //       { icon: 'face', title: 'สมาชิกในกลุ่ม', link: '/member' }
    //     ]
    //   }
    //   return menuItems
    // },
    displayLocale () {
      if (this.$i18n.locale === 'th') {
        return 'en'
      }
      return 'th'
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout').then(
    () => {
      this.$router.push('/signin')
        }
      )
    },
    switchLocale () {
      if (this.$i18n.locale === 'th') {
        this.$i18n.locale = 'en'
      } else {
        this.$i18n.locale = 'th'
      }
    }
  }
}
</script>
