<template>
  <div class="login">
    <h2>Qwergram HQ Login</h2>
    <form @submit="login" name="login">
      <div class="form-group with-icon-right" :class="{'has-error': error}">
        <div class="input-group">
          <input v-on:keyup="resetError" type="text" id="user" required="required" v-model="username" autocomplete="false" autofocus :class="{'has-error': error}"/>
          <i class="bar"></i>
          <i class="fa fa-exclamation-triangle icon-right input-icon" v-show="error"></i>
          <small v-show="error" class="help text-danger">{{ detail }}</small>
          <label v-show="!error" class="control-label" for="user">{{'auth.user' | translate}}</label>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input v-on:keyup="resetError" type="password" id="password" required="required" v-model="password"/>
          <label class="control-label" for="password">{{'auth.password' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
        <button class="btn btn-primary" type="submit">
          {{'auth.login' | translate}}
        </button>
        <router-link class='link' :to="{name: 'signup'}">{{'auth.createAccount' | translate}}</router-link>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data: function () {
      return {
        'username': '',
        'password': '',
        'error': false,
        'detail': null
      }
    },
    methods: {
      resetError: function () {
        this.error = false
        this.detail = null
      },
      login: function (e) {
        const self = this
        this.$store.dispatch('obtainToken', {
          username: this.username,
          password: this.password,
          _callback: function () {
            if (self.$store.state.user) {
              self.$router.push('/dash')
            } else {
              self.error = true
              self.detail = 'Invalid Credentials'
            }
          }
        })
        e.preventDefault()
      }
    }
  }
</script>

<style lang="scss">
  .login {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding-right: 2rem;
      padding-left: 2rem;
      .down-container {
        .link {
          margin-top: 2rem;
        }
      }
    }

    h2 {
      text-align: center;
    }
    width: 21.375rem;

    .down-container {
      margin-top: 3.125rem;
    }
  }
</style>
