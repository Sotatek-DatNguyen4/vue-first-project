<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
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

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" v-bind:loading="login.isLoading">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
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
