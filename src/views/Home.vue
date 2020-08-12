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

<style lang="less" scoped>
#home {
  max-width: 1560px;
  width: 1512px;

  margin: 0 auto;
}

// @media screen and(max-width: 1756px) {
//   #home {
//     // width: ;
//     width: 1400px;
//   }
// }
@media screen and(max-width: 1756px) {
  #home {
    // width: ;
    width: 1400px;
  }
}
@media screen and(max-width: 1650px) {
  #home {
    // width: ;
    width: 1098px;
  }
}
</style>