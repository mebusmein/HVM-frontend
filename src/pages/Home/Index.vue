<template>
  <v-layout>
    <b-btn v-b-modal.modal-center style="position:fixed;top:10px;left:10px;z-index:100" variant="outline-success">Demo
    </b-btn>
    <b-carousel id="carousel1"
                style="height: 100vh;"
                background="#ababab"
                indicators
                :interval=slide_speed
                img-width="100%"
                img-height="100%"
                v-model="slide_number"
                @sliding-start=""
                @sliding-end="">

      <!-- Text slides with image -->
      <b-carousel-slide
        v-for="slide in slide_data"
        :img-src="slide.src"
      >
        <h1>{{ slide.title }}</h1>
      </b-carousel-slide>
    </b-carousel>
    <b-col lg="3" v-bind:class="{ demoActive: demo_running}" style="position: fixed;top:10px;right:10px">
      <b-col>
        <b-card title="Verlichting" class="m-1 mt-2">
          <b-list-group flush>
            <b-list-group-item><i class="fa fa-lightbulb-o fa-fw" aria-hidden="true"></i> Badkamer
              <toggle :toggled=bathroom_light @toggled="clickToggle('bathroom_light')" class="pull-right"></toggle>
            </b-list-group-item>
            <b-list-group-item><i class="fa fa-lightbulb-o fa-fw" aria-hidden="true"></i> Woonkamer
              <toggle :toggled=livingroom_light @toggled="clickToggle('livingroom_light')"
                      class="pull-right"></toggle>
            </b-list-group-item>
            <b-list-group-item><i class="fa fa-lightbulb-o fa-fw" aria-hidden="true"></i> Trapverlichting
              <toggle :toggled="staircase_light" @toggled="clickToggle('staircase_light')"
                      class="pull-right"></toggle>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col>
        <b-card title="Sfeerverlichting" class="m-1 mt-2">
          <b-list-group flush>
            <b-list-group-item><i class="fa fa-lightbulb-o fa-fw" aria-hidden="true"></i> Woonkamer
              <b-progress :value=livingroom_wall :max="100" show-progress></b-progress>
            </b-list-group-item>
            <b-list-group-item><i class="fa fa-lightbulb-o fa-fw" aria-hidden="true"></i> Slaapkamer
              <b-progress :value=bedroom_wall :max="100" show-progress></b-progress>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col>
        <b-card title="Gordijnen" class="m-1 mt-2">
          <b-list-group flush>
            <b-list-group-item><i class="fa fa-window-maximize fa-fw" aria-hidden="true"></i> Woonkamer
              <toggle :toggled="livingroom_cover" @toggled="clickToggle('livingroom_cover')"
                      class="pull-right"></toggle>
            </b-list-group-item>
            <b-list-group-item><i class="fa fa-window-maximize fa-fw" aria-hidden="true"></i> Slaapkamer
              <toggle :toggled="bedroom_cover" @toggled="clickToggle('bedroom_cover')" class="pull-right"></toggle>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-col>
    <b-modal
      id="modal-center"
      ref="modalCenter"
      centered
      hide-header="true"
      hide-footer="true"
    >
      <b-button-group style="width:100%" vertical>
        <b-btn style="width:100%" v-for="demo in demos" @click="startDemo(demo)" variant="outline-success">{{ demo.title }}</b-btn>
      </b-button-group>
    </b-modal>
    
  </v-layout>
</template>

<style>
  .carousel-inner {
    height: 100%;
  }

  .carousel-item {
    height: 100%;
  }

  .demoActive {
    opacity: .5;
  }

  .debugger {
    position: fixed;
    right: 10px;
    bottom: 10px;
    color: white;
    mix-blend-mode: difference;
    text-align: right;
  }
</style>

<script>
  /* ============
   * Home Index Page
   * ============
   *
   * The home index page.
   */

  import VLayout from '@/layouts/Default';
  import Toggle from '../../components/Toggle';
  import store from '../../store';
  import Demo from '../../components/Demo';
  import DefaultSlides from './defaultSlides';
  import Demo1Data from './demo1.json';
  import Demo2Data from './demo2.json';
  import Demo3Data from './demo3.json';

  export default {
    /**
     * The name of the page.
     */
    name: 'home-index',

    data() {
      return {
        demo_running: false,
        slide_number: 0,
        slide_data: DefaultSlides.slides,
        demo_count: 0,
        slide_speed: 4000,
        demos: [Demo1Data, Demo2Data, Demo3Data],
      };
    },
    /**
     * The components that the page can use.
     */
    components: {
      Toggle,
      VLayout,
      Demo,
    },

    methods: {
      clickToggle(knx) {
        store.commit('toggleKNX', knx);
      },
      startDemo(demoSet) {
        const demo = demoSet.demo;
        this.slide_data = demoSet.slides;
        this.demo_count = 0;
        this.demo_running = true;
        this.$refs.modalCenter.hide();
        this.demoRunner(demo);
      },
      stopDemo() {
        this.demo_running = false;
        this.slide_number = 0;
        this.slide_data = DefaultSlides.slides;
      },
      demoRunner(demo) {
        if (this.demo_count === -1) {
          return false;
        }
        if (this.demo_count >= demo.length) {
          window.setTimeout(this.stopDemo.bind(this), 3000);
          return true;
        }
        const action = demo[this.demo_count];
        console.log(action);
        switch (action.type) {
          case 'knx':
            store.commit('setKNX', action.data);
            break;
          case 'slide':
            this.slide_number = action.slide;
            break;
          case 'wait':
            this.demo_count += 1;
            window.setTimeout(this.demoRunner.bind(this, demo), action.delay);
            return true;
          default:
        }
        this.demo_count += 1;
        return this.demoRunner(demo);
      },
    },
    watch: {
      slide_running(running) {
        this.slide_speed = (running) ? 0 : 4000;
      },
    },
    computed: {
      livingroom_light() {
        return store.state.knx.livingroom_light;
      },
      bathroom_light() {
        return store.state.knx.bathroom_light;
      },
      staircase_light() {
        return store.state.knx.staircase_light;
      },
      bedroom_wall() {
        return store.state.knx.bedroom_wall;
      },
      livingroom_wall() {
        return store.state.knx.livingroom_wall;
      },
      bedroom_cover() {
        return store.state.knx.bedroom_cover;
      },
      livingroom_cover() {
        return store.state.knx.livingroom_cover;
      },
    },
  };
</script>
