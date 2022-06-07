<template>
	<div id="app">
		<b-container>

		<!-- TITLE : START -->
		<comp-title/>
		<!-- TITLE : END -->


		<b-row>
			<!-- CONTROL (SEARCH + SORT + ADD) : START -->
			<comp-control
				v-bind:orderBy="orderBy"
				v-bind:orderDir="orderDir"
				v-on:handleSearch="handleSearch"
				v-bind:stringSearch="stringSearch"
				v-on:handleSort="handleSort"
			/>
			<!-- CONTROL (SEARCH + SORT + ADD) : END -->

			<!-- FORM : START -->
			<comp-form
				v-bind:isShowForm = "isShowForm"
				v-on:toggleForm = "toggleForm"
				v-on:handleAddNewTask="handleAddNewTask"
				v-bind:taskSelected="taskSelected"
				v-on:handleEditTaskById="handleEditTaskById"
			/>
			<!-- FORM : END -->
		</b-row>

		<!-- LIST : START -->

		<todo-list-table
			v-bind:listTask="listTaskSort"
			v-on:handleDelete="handleDelete"
			v-on:handleEdit="handleEdit"
		/>
	</b-container>
	</div>
</template>

<script>
import TodoListTable from './components/TodoListTable.vue';
import CompTitle from './components/CompTitle.vue';
import CompControl from './components/CompControl.vue';
import CompForm from './components/CompForm.vue';
import listTask from './mocks/tasks.js';
export default {
	name: 'app',
	data () {
		return {
			listTask: null,
			isShowForm: false,
			stringSearch: '',
			orderBy: 'name',
			orderDir: 'asc',
			taskSelected: null
		}
	},
	// watch: {
	// 	listTask: function(newTasks){
	// 		var tasksString = JSON.stringify(newTasks);
	// 		localStorage.setItem('tasks',tasksString);
	// 	}
	// },
	components: {
		CompTitle,
		TodoListTable,
		CompControl,
		CompForm
	},
	methods: {
		toggleForm(){
			//Nếu form đang bật -> isShowForm = true => thay đổi lại là false
			//Nếu form đang ẩn -> isShowForm = false => thay đổi lại là true
			if(this.isShowForm) this.taskSelected = null;
			this.isShowForm = !this.isShowForm;
		},
		handleSearch(data){
			this.stringSearch = data;
		},
		handleSort(data){
			this.orderBy = data.orderBy;
			this.orderDir = data.orderDir;
		},
		//Rut gon code
		compareSort(a, b){
			var numberSort = this.orderDir === 'asc' ? -1 : 1;
			if(a[this.orderBy] < b[this.orderBy]) return numberSort;
			else if(a[this.orderBy] > b[this.orderBy]) return numberSort * (-1);
			return 0;
		},
		// compareName(a, b){
		// 	var numberSort = this.orderDir === 'asc' ? -1 : 1;
		// 	if(a.name < b.name) return numberSort;
		// 	else if(a.name > b.name) return numberSort * (-1);
		// 	return 0;
		// },
		// compareLevel(a, b){
		// 	var numberSort = this.orderDir === 'asc' ? -1 : 1;
		// 	if(a.level < b.level) return numberSort;
		// 	else if(a.level > b.level) return numberSort * (-1);
		// 	return 0;	
		// }
		handleDelete(taskDelete) {
			//Cach 1 dung filter
			this.listTask= this.listTask.filter(item => item.id !== taskDelete.id);
			//Cach 2 dung splice
			// var idDelete = -1;
			// for(var index=0; index<this.listTask.length; index++){
			// 	if(this.listTask[index].id === taskDelete.id){
			// 		idDelete = index;
			// 		break;
			// 	}
			// }
			// if(idDelete !== -1) this.listTask.splice(idDelete,1);
		},
		handleAddNewTask(task){
			this.listTask.push(task);
		},
		handleEdit(taskEdit){
			this.isShowForm = true;
			this.taskSelected = taskEdit;
		},
		handleEditTaskById(taskEdit){
			//Tìm index tương ứng với taskEdit.id nằm trong this.listTask gốc
			let index = this.listTask.findIndex(item => item.id === taskEdit.id);
			if(index !== -1){
				//Áp dụng splice để tiến hành xóa và thêm mới giá trị vào listTask
				this.listTask.splice(index, 1, taskEdit);
				this.toggleForm();
			}
		}
	},
	computed: {
		listTaskSearch(){
			const {stringSearch} = this;
			var newItems = [];
			this.listTask.forEach(function(item, index){
				if(item.name.toLowerCase().includes(stringSearch.toLowerCase()) === true){
					newItems.push(item);
				}
			});
			return newItems;
			//Gon hon
			 //var newItems = this.listTask.filter(item => item.name.toLowerCase().includes(stringSearch.toLowerCase()));
		},
		listTaskSort(){
			//Luu y: khi co su thay doi cua stringSearch thi ham listTaskSearch chay
			//var listTask = [...this.listTaskSearch]; //clone data (ES6)
			// if(this.orderBy === 'name'){
			// 	listTask.sort(this.compareName);
			// }else if(this.orderBy === 'level'){
			// 	listTask.sort(this.compareLevel);
			// }
			//listTask.sort(this.compareSort);
			//return listTask;
			var listTask = [...this.listTaskSearch];
			console.log(listTask);
				listTask.sort(this.compareSort);		
			return listTask;
		}
	}
	//  created() {
	//  	//Lấy listTask từ trong localStorage
	//  	let tasks = localStorage.getItem('tasks');
	// 	 console.log(tasks);
	//  	if(a !== null){
	//  		this.listTask = JSON.parse(tasks);
	//  	}else{
	//  		this.listTask = [];
	//  	}
	//  }
}
</script>

<style>
	body {
    padding: 100px 0;
}
.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
    vertical-align: middle;
}

.container > .row {
    margin-top: 20px;
    margin-bottom: 30px;
}

span.badge-medium {
	padding: 11px 10px;
    margin: 0px 8px;
    font-size: 16px;
    display: inline-block;
    vertical-align: top;
}

@media (max-width: 992px) {
    .add-task {
        margin-top: 50px;
    }
}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}

	h1, h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
