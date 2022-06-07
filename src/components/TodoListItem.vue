<template>
    <tr>
		<td class="text-center">{{index}}</td>
		<td>{{task.name}}</td>
		<td class="text-center"><span class="badge" v-bind:class="classLevel">{{getLevelName}}</span></td>
		<td>
			<button 
                v-on:click="handleEdit"
                type="button" class="btn btn-warning">Edit
            </button>
			<button 
                v-on:click="handleDelete"
                type="button" class="btn btn-danger">Delete
            </button>
		</td>
	</tr>
</template>
<script>
import mapLevel from '../mocks/level.js'
export default {
    name: 'todo-list-item',
    data() {
        return {
            mapLevel : mapLevel
        }
    },
    props: {
        task: {
            type: Object,
            default: null
        },
        index: Number
    },
    methods: {
        handleDelete(){
            if(confirm("Ban co muon xoa task co ten la " + this.task.name)){
                this.$emit('handleEdit', this.task);
            }
        },
        handleEdit(){
            this.$emit('handleEdit', this.task);
        }
    },
    computed: {
        getLevelName(){
            // switch (this.task.level) {
            //     case 0:
            //         return "Small";
            //     case 1:
            //         return "Medium";
            //     case 2:
            //         return "High";
            //     default:
            //         return '';
            // }
            return this.mapLevel[this.task.level].name;
        },
        classLevel(){
            // switch (this.task.level) {
            //     case 0:
            //         return {'badge-info' : true};
            //     case 1:
            //         return {'badge-warning' : true};
            //     case 2:
            //         return {'badge-danger' : true};
            //     default:
            //         return {};
            // }
            return this.mapLevel[this.task.level].class;
        }
    }
}
</script>
<style>

</style>