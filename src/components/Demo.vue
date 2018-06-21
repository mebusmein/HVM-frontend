<template>
  <div>
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="0"
                img-width="1024"
                img-height="480"
                v-model="slide"
                @sliding-start=""
                @sliding-end=""
    >

      <!-- Text slides with image -->
      <b-carousel-slide caption=""
                        text="Het is midden in de nacht"
                        img-src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/YYrb1C5/trees-framing-night-forest-with-full-moon_xyotstli__F0000.png"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide caption=""
                        text="De bewoner wordt wakker"
                        img-src="http://www.rtlnieuws.nl/sites/default/files/styles/inline_large/public/content/images/2016/02/17/overval_01_0.jpg?itok=F1UTft44">
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide caption=""
                        text="Loopt naar het toilet"
                        img-src="https://picsum.photos/1024/480/?image=58">
      </b-carousel-slide>

    </b-carousel>
    <div style="position: fixed;bottom:10px;left:10px;z-index:1000">{{ slide }}</div>
  </div>
</template>

<script>
  export default {
    name: 'Demo',
    props: ['slide', 'slide-data'],
  };
</script>

<style scoped>

</style>
