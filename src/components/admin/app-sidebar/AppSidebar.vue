<template>
  <vuestic-sidebar :hidden="isOpen">
    <template slot="menu" v-if="!loading">
      <sidebar-link-group v-bind:key="dashboard.id" v-for="dashboard in dashboards">
        <span slot="title">
          <span class="sidebar-menu-item-icon" :class="'fa fa-' + dashboard.icon"></span>
          <span> {{ dashboard.title }} </span>
        </span>
      </sidebar-link-group>
    </template>
    <template slot="menu" v-if="loading">
      <sidebar-link :to="{ name: 'dashboard' }" >
        <span slot="title">
          <span class="sidebar-menu-item-icon vuestic-icon vuestic-icon-dashboard"></span>
          <span> Loading ... </span>
        </span>
      </sidebar-link>
    </template>
  </vuestic-sidebar>
</template>

<script>

  import VuesticSidebar from '../../../vuestic-theme/vuestic-components/vuestic-sidebar/VuesticSidebar'
  import SidebarLink from './components/SidebarLink'
  import SidebarLinkGroup from './components/SidebarLinkGroup'
  import axios from 'axios'
  import store from '../../../store/index'

  export default {
    name: 'app-sidebar',
    data: function () {
      return {
        loading: true,
        dashboards: null,
        error: null
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.loading = true
        axios.defaults.headers.common['Authorization'] = 'JWT ' + store.state.jwt
        axios.get(process.env.API_ENV + 'api/dashboards/')
          .then((response) => {
            this.dashboards = response.data.results
            this.loading = false
          })
          .catch((error) => {
            this.error = error
            this.loading = false
          })
      }
    },
    components: {
      VuesticSidebar,
      SidebarLink,
      SidebarLinkGroup
    },
    props: {
      isOpen: {
        type: Boolean,
        required: true
      }
    }
  }

</script>
