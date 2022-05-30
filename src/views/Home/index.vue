<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor :floor="floor" v-for="floor in floorList" :key="floor.id"/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'
import {mapState} from 'vuex'

export default {
    name: 'Home',
    components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    mounted() {
        this.$store.dispatch('floorList')
    },
    computed: {
        ...mapState({
            floorList:state => state.home.floorList
        })
    },
}
</script>

<style>

</style>