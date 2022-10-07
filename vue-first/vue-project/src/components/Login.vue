<template>
  <a-form
    :model="formState"
    name="loginForm"
    autocomplete="off"
    @finish="onFinish"
    layout="vertical"
  >
    <a-form-item
      label="Email"
      name="email"
      :rules="[{ required: true, message: 'Please input your email!' }]"
    >
      <a-input v-model:value="formState.email" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit" v-bind:loading="login.isLoading">Login</a-button>
    </a-form-item>

    <div class="error" v-if="login.error">{{login.error}}</div>

  </a-form>
</template>

<style scoped>
  .ant-form {
    width: 500px;
    margin: 100px auto;
  }
  .error {
    color: red;
    text-align: center;
  }
</style>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import {mapActions, mapState} from "vuex";

  interface FormState {
    email: string;
    password: string;
  }

  export default defineComponent({
    setup() {
      const formState = reactive<FormState>({
        email: '',
        password: '',
      });

      return {
        formState,
      };
    },

    computed: {
      ...mapState({
        login: 'login'
      })
    },

    methods: {
      ...mapActions({
        onLogin: 'login',
      }),
      onFinish (values: any) {
        this.onLogin(values);
      },
    }
  });
</script>
