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
    data: function () {
      return {
        profile: process.env.API_ENV + JSON.parse(store.state.user).profile_picture,
      }
    },
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
