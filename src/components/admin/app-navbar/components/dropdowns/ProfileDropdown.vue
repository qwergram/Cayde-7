<template>
  <div class="profile-dropdown col nav-item dropdown navbar-dropdown" v-dropdown>
    <a class="nav-link dropdown-toggle" href="#">
      <span class="profile-section-avatar-container">
        <slot></slot>
      </span>
    </a>
    <div class="dropdown-menu last">
      <div class="dropdown-menu-content">
        <div v-for="(option, id) in options" :key="id"
          class="dropdown-item plain-link-item">
          <router-link v-if="option.isStaff ? store.state.user.staff === option.isStaff : true" :to="{name: option.redirectTo}" class="plain-link" href="#">
            {{ option.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../../../../../store/index' // eslint-ignore
  export default {
    name: 'profile-section',
    data: function () {
      return {
        store: store
      }
    },
    props: {
      options: {
        type: Array,
        default: () => [
          {
            name: '/dev/',
            redirectTo: 'dev',
            isStaff: true
          },
          {
            name: 'My Profile',
            redirectTo: 'profile',
          },
          {
            name: 'Logout',
            redirectTo: 'logout'
          }
        ]
      }
    },
  }
</script>

<style lang="scss">
  .profile-dropdown {

    .profile-section-avatar-container {
      display: inline-block;
      width: 50px;
      height: 50px;
      background-color: white;
      border-radius: 50%;
      border: 2px solid $lighter-gray;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
      }
    }

  }

</style>
