<template>
    <div class="col-12 col-lg-6">
				<div class="row">
					<!-- SORT : START -->
					<control-sort
                        v-bind:orderBy="orderBy"
				        v-bind:orderDir="orderDir"
                        v-on:handleSort="handleSort"
                    />

					<!-- SORT : END -->

					<!-- SEARCH : START -->
					<control-search
                        v-on:handleSearch="handleSearch"
                        v-bind:stringSearch="stringSearch"
                    />
					<!-- SEARCH : END -->
				</div>
			</div>
</template>
<script>
import ControlSearch from './ControlSearch.vue'
import ControlSort from './ControlSort.vue'
export default {
  components: { 
      ControlSearch ,
      ControlSort
  },
    name: 'comp-control',
    data(){
        return {
            
        }
    },
    props: {
        stringSearch: {
            type: String,
            default: ''
        },
        orderBy: {
            type: String,
            default: 'name'
        },
        orderDir: {
            type: String,
            default: 'asc'
        }
    },
    methods: {
        handleSearch(data){
            this.$emit('handleSearch', data);
        },
        handleSort(data){
            this.$emit('handleSort', data);
        }
    }
}
</script>
<style>

</style>