<template>
  <div>
    <TheHeader></TheHeader>
    <!-- 路由组件出口的位置 -->
    <router-view></router-view>
    <!-- 在Home、Search显示的，在Login、Register是隐藏的 -->
    <TheFooter v-show="$route.meta.show"></TheFooter> 
  </div>
</template>

<script>
import TheHeader from './components/TheHeader/index.vue'
import TheFooter from './components/TheFooter/index.vue'
export default {
  name: 'App',
  data() {
    return {
      msg: 'abc'
    }
  },
  components: {
    TheHeader, TheFooter
  },
  mounted() {
    //派发action|获取商品分类的三级列表的数据
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
