<template>
    <div class="col-12">
		<div class="input-group">
			<input 
				v-bind:value="stringSearch"
				v-on:input="handleSearch"
				type="text" class="form-control" placeholder="Search for..." 
			/>
			<span class="input-group-append">
			<button 
				v-on:click="handleCancel"
				class="btn btn-info" type="button">Clear!
			</button>
			</span>
		</div>
	</div>
</template>
<script>
export default {
    name: 'control-search',
    data() {
        return {

        }
    },
	props: {
        stringSearch: {
            type: String,
            default: ''
        }
    },
	methods: {
		handleSearch(e){
			this.$emit('handleSearch', e.target.value);
		},
		handleCancel(){
			this.$emit('handleSearch', '');
		}
	}
}
</script>
<style>

</style>