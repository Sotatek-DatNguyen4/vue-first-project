import {createStore} from "vuex";
import AxiosUtils from "@/axios-utils";
import {saveToken, removeToken} from "@/utils/auth";
import router from '@/router';

const blackBooksInitial = {
  data: [],
  loading: false,
  error: '',
  total: 0,
  paramsData: {
    page: 1,
    limit: 10,
    name: '',
    startDate: '',
    endDate: '',
  },
};

const store = createStore({
  state () {
    return {
      login: {
        isLoading: false,
        data: null,
        error: '',
      },
      blackBooks: blackBooksInitial
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
    },
    getBlackBooksLoading (state: any) {
      state.blackBooks = {
        isLoading: true,
        data: [],
        error: '',
      };
    },
    getBlackBooksSuccess (state: any, payload: any) {
      state.blackBooks = {
        isLoading: false,
        data: payload.list,
        total: payload.count,
        error: '',
      };
    },
    getBlackBooksFailure (state: any, payload: any) {
      state.blackBooks = {
        isLoading: false,
        data: [],
        error: payload,
      };
    },
    setParamsBlackBooks (state: any, payload: any) {
      state.blackBooks = {
        paramsData: payload ? {...state.blackBooks.paramsData, ...payload} : blackBooksInitial.paramsData
      };
    },
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
    },
    async getBlackBooks ({ commit } : any, params: any) {
      try {
        commit('getBlackBooksLoading');
        const apiResponse: any = await AxiosUtils.get('/black-book', params);
        commit('getBlackBooksSuccess', apiResponse.data);
      } catch (error) {
        commit('getBlackBooksFailure', error);
      }
    },
    setParamsBlackBook ({ commit } : any, params: any) {
      commit('setParamsBlackBooks', params);
    },
  }
});

export default store;
