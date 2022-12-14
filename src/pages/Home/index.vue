<template>
  <div>
    <!-- s三级联动全局组件：三级联动已经注册全局，因此不需要引用了 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- floor这个组件：自己在组件内部是没有发请求的，数据是父组件给的 -->
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand> 
  </div>
</template>

<script>
// import TypeNav from './TypeNav/index.vue';
import TypeNav from '@/components/TypeNav/index.vue';
//引入其余组件
import ListContainer from '../Home/ListContainer/index.vue'
import Recommend from '../Home/Recommend/index.vue'
import Rank from '../Home/Rank/index.vue'
import Like from '../Home/Like/index.vue'
import Floor from '../Home/Floor/index.vue'
import Brand from '../Home/Brand/index.vue'
import { mapState } from 'vuex';

export default {
  name: '',
  components: { TypeNav, ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    //派发action,获取floor组件的数据
    this.$store.dispatch("getFloorList")
    //获取用户信息在首页展示
    // this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
}
  
</script>

<style>

</style>