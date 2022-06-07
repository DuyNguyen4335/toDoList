<template>
    <b-col cols="12" lg="6">
        <!-- ADD : START -->
        <form-add
            v-bind:isShowForm="isShowForm"
            v-on:handleAddForm = "handleAddForm"
        />
        <!-- ADD : END -->

        <form v-if="isShowForm" action="" method="POST" class="form-inline justify-content-between">
            <div class="form-group">
                <label class="sr-only" for="">label</label>
                <input v-model="taskName" type="text" class="form-control" placeholder="Task Name" />
            </div>
            <div class="form-group">
                <label class="sr-only" for="">label</label>
                <select v-model="level" name="ds" class="form-control" required="required">
                    <option value="0">Small</option>
                    <option value="1">Medium</option>
                    <option value="2">High</option>
                </select>
            </div>

            <button 
                v-if="taskSelected === null"
                v-on:click="handleAddNew"
                type="button" class="btn btn-primary">Submit
            </button>
            <button
                v-else 
                v-on:click="handleEditTask"
                type="button" class="btn btn-primary">Update
            </button>
            <button 
                v-on:click="handleCancel"
                type="button" class="btn btn-secondary">Cancel
            </button>
        </form>
    </b-col>
</template>
<script>
import FormAdd from './FormAdd.vue';
import { v4 as uuidv4 } from 'uuid';
export default {
    name: 'comp-form',
    data() {
        return {
            taskName: '',
            level: 0
        }
    },
    beforeUpdate(){ //chay khi co su thay doi du lieu bat ky o dau
        // if(this.taskSelected != null){
        //     //Người dùng có click vào button edit
        //     this.taskName = this.taskSelected.name;
        //     this.level = this.taskSelected.level;
        // }
    },
    watch: { //chay khi co su thay doi du lieu rieng 1 phan tu
        taskSelected: function(newData, oldData){ //thay doi tu null thanh co data
            if(newData !== null){
             //Người dùng có click vào button edit
             this.taskName = newData.name;
             this.level = newData.level;
            }
        }
    },
    props: {
        isShowForm: {
            type: Boolean,
            default: false
        },
        taskSelected: {
            type: Object,
            default: null
        }
    },
    methods: {
        handleEditTask(){
            let objTaskEdit = {
                id: this.taskSelected.id,
                name: this.taskName,
                level : parseInt(this.level)
            }
            this.$emit('handleEditTaskById', objTaskEdit);
            this.handleResetData();
        },
        handleAddForm(){
            this.$emit('toggleForm');
        },
        handleCancel(){
            this.$emit('toggleForm');
            //Reset data
            this.handleResetData();
        },
        handleResetData(){
            this.taskName = '',
            this.level = 0;
        },
        handleAddNew(){
            let objTask = {
                id: uuidv4(),
                name : this.taskName,
                level : parseInt(this.level)
            }
            //Lam them kierm tra du lieu hop le
            this.$emit('handleAddNewTask',objTask);
            this.handleCancel();
        }
    },
    components: {
        FormAdd
    }
}
</script>
<style>

</style>