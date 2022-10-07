import {createStore} from "vuex";
import AxiosUtils from "@/axios-utils";
import {saveToken, removeToken} from "@/utils/auth";
import router from '@/router';

const store = createStore({
  state () {
    return {
      login: {
        isLoading: false,
        data: null,
        error: '',
      }
    }
  },
  mutations: {
    loginLoading (state: any) {
      state.login = {
        isLoading: true,
        data: null,
        error: '',
      };
    },
    loginSuccess (state: any, payload: any) {
      state.login = {
        isLoading: false,
        data: payload,
        error: '',
      };
    },
    loginFailure (state: any, payload: any) {
      state.login = {
        isLoading: false,
        error: payload,
      };
    },
    logout (state) {
      state.login = {
        isLoading: false,
        data: null,
        error: '',
      };
    }

  },
  actions: {
    async login ({ commit } : any, loginData: any) {
      try {
        commit('loginLoading');
        const apiResponse: any = await AxiosUtils.post('/admin/signin', loginData);
        saveToken(apiResponse.data.accessToken);
        commit('loginSuccess', apiResponse.data);
        router.push({path: '/'});
      } catch (error) {
        commit('loginFailure', error);
      }
    },
    logout ({commit}) {
      commit('logout');
      removeToken();
      router.push({path: '/login'});
    }
  }
});

export default store;
