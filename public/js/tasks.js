//adding task to the user dashboard

function addTask(){

var task=getVal("tasktext")
var taskdate=getVal("deadline-date")
var userId=localStorage.getItem("userid_ls")
if(task=="")
{
  alert("Empty task!!");
}
else{
var ref=database.ref("users/"+userId+"/tasks")

  var data={
    task:task,
    taskdate:taskdate
  }
  ref.push(data);
  clearFields();

}
}

function clearFields() {

     document.getElementById("tasktext").value = "";
     document.getElementById("deadline-date").value = "";
}
showTasks()

//displaying added tasks in the user dashboard with the most recent ones first
function showTasks() {
  var userId=localStorage.getItem("userid_ls")
  var ref=database.ref("users/"+userId+"/tasks")
  ref.on('value',gotTaskData,errData);
}

function gotTaskData(data){
   
    var taskstr="";  
    var task_data=data.val();
    var task_keys=Object.keys(task_data);
    var n=task_keys.length-1

    for(var i=n;i>=1;i--){
      var nowKey=task_keys[i];
      var now_task=task_data[nowKey].task;
      var now_taskdate=task_data[nowKey].taskdate;
      var now_taskstr=""
      nowKey='"'+nowKey+'"'
      now_taskstr="<div class='task'><button class='btn btn-secondary removeBtnClass' type='button' data-dismiss='modal' onclick='removeTask("+nowKey+")'>Remove task</button>[ "+now_taskdate+" ]"+now_task +"</div>"

      taskstr+=now_taskstr;
      // document.getElementById("myTasksId").innerHTML=taskstr
      // console.log(taskstr);
      }
       document.getElementById("myTasksId").innerHTML=taskstr
      
}


function errData(err){
    console.log("Error");
    console.log(err);
}

 function removeTask(id){
  var userId=localStorage.getItem("userid_ls")
  var ref=database.ref("users/"+userId+"/tasks")
  ref.child(id).remove()
}

bodyload()
function bodyload(){
  console.log("body loaded")
  var tempUserId=localStorage.getItem("userid_ls")
  if(tempUserId==null){
     location.replace("/register.html"); 

  }else if(tempUserId=="-"){
   location.replace("/login.html"); 
  }else{
    // globalUserId=tempUserId
    console.log("-Directing to Dashboard-")
    name=localStorage.getItem("userName_ls");
 document.getElementById("fullname").innerHTML=name
 console.log(name)
// openRegister()
// storeURL()
  }
}


