<template>

  <vuestic-navbar>
    <header-selector slot="selector" :isOpen.sync="valueProxy"/>
    <span slot="logo" class="i-vuestic"></span>
    <!-- <span slot="center">
      <a></a>
    </span> -->
    <message-dropdown/>
    <notification-dropdown/>
    <language-dropdown/>
    <profile-dropdown>
      <img v-bind:src="profile"/>
    </profile-dropdown>
  </vuestic-navbar>

</template>

<script>
  import VuesticNavbar from '../../../vuestic-theme/vuestic-components/vuestic-navbar/VuesticNavbar'
  import HeaderSelector from './components/HeaderSelector'
  import LanguageDropdown from './components/dropdowns/LanguageDropdown'
  import ProfileDropdown from './components/dropdowns/ProfileDropdown'
  import NotificationDropdown from './components/dropdowns/NotificationDropdown'
  import MessageDropdown from './components/dropdowns/MessageDropdown'
  import store from '../../../store/index'

  export default {
    name: 'app-navbar',
    components: {
      VuesticNavbar,
      HeaderSelector,
      MessageDropdown,
      NotificationDropdown,
      LanguageDropdown,
      ProfileDropdown
    },
    props: {
      isOpen: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      profile: {
        get () {
          if (store.state.user) {
            return process.env.API_ENV + store.state.user.profile_picture
          } else {
            return 'https://imgur.com/tI5I666.png'
          }
        }
      },
      valueProxy: {
        get () {
          return this.isOpen
        },
        set (opened) {
          this.$emit('toggle-menu', opened)
        },
      },
    },
  }
</script>
