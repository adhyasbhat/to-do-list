import { Component, OnInit } from '@angular/core';
import { CurdService } from 'src/app/service/curd.service';
import {Task} from 'src/app/model/task';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[] = [];


  addTaskValue : string = '';
  editTaskValue : string = '';

  
    constructor(private curdService :CurdService ){ }

    ngOnInit(): void {
      this.taskObj = new Task();
      this.editTaskValue = '';
      this.addTaskValue = '';
      this.taskArr = [];      
      this.getAllTask();
    }
    getAllTask(){
      this.curdService.getAllTask().subscribe(res =>{
        this.taskArr = res;
      }, err =>{
        alert("unable to get list of tasks");
      }
      )
    }

    addTask() {
      this.taskObj.task_name = this.addTaskValue;
      this.curdService.addTask(this.taskObj).subscribe(res =>{
        this.ngOnInit();
        this.addTaskValue ='';
      }, err => {
        alert(err);
      })
    }
    editTask(){
      this.taskObj.task_name = this.editTaskValue;
      this.curdService.editTask(this.taskObj).subscribe(res => {
        this.ngOnInit();
      }, err =>{
        alert("Failed to update task")
      })
    }
    deleteTask(etask : Task){
      this.curdService.deleteTask(etask).subscribe(res => {
        this.ngOnInit();
      }, err =>
      {
        alert("Failed to delete task")
      })
    }
    call(etask : Task){
      this.taskObj = etask;
      this.editTaskValue = etask.task_name;
    }
}
 