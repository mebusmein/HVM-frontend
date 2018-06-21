/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// Modules
import account from './modules/account';
import auth from './modules/auth';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  /**
   * Assign the modules to the store.
   */
  modules: {
    account,
    auth,
  },

  state: {
    knx: {
      livingroom_light: 0,
      bathroom_light: 1,
      staircase_light: 1,
      bedroom_wall: 60,
      livingroom_wall: 100,
      bedroom_cover: 1,
      livingroom_cover: 0,
    },
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    },
  },

  mutations: {
    SOCKET_ONOPEN(state) {
      state.socket.isConnected = true;
    },
    SOCKET_ONCLOSE(state) {
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      state.knx = { ...state.knx, ...message };
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    toggleKNX(state, knx) {
      state.knx[knx] = !state.knx[knx];
      this.$socket.sendObj({ [knx]: state.knx[knx] });
    },
    setKNX(state, newState) {
      //state.knx[newState.knx] = newState.value;
      //console.log(JSON.stringify({ [newState.knx]: state.knx[newState.knx] }));
      this.$socket.sendObj(newState);
    },
  },

  /**
   * If strict mode should be enabled.
   */
  strict: debug,

  /**
   * Plugins used in the store.
   */
  plugins: debug ? [createLogger()] : [],
});
