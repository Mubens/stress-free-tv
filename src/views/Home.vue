<template>
  <div id="home">
    <Slider />
  </div>
</template>

<script>
import Slider from '../components/Slider'

export default {
  data () {
    return {

    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="less">
#home {
  width: 1512px;
  margin: 0 auto;
}

@media screen and(max-width: 1756px) {
  #home {
    width: 1360px;
  }
}
@media screen and(max-width: 1650px) {
  #home {
    width: 1098px;
  }
}
</style>