import { IState, Iintheater } from './index';
import Vue from 'vue';
import Vuex from 'vuex';
import request from '../../../utils/request';
import api from '../../../utils/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inTheater: [],
  },
  mutations: {
    changeInTheater(state: IState, data) {
      const arr: any[] = [];
      const arrTemp: string[] = [];
      arr.map((item: Iintheater) => {
        arrTemp.push(item.projectName);
      });
      state.inTheater = arrTemp;
    },
  },
  actions: {
    async getMovieDate(context) {
      const res = await request.post(api.queryProjects, {
        pageNum: 1,
        pageSize: 10,
        keywords: '',
        flag: 'me',
      });
      context.commit('changeInTheater', res.data);
    },
  },
});
