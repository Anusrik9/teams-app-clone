//adding task to the user dashboard

function showchat(){

var task=getVal("meetingid")
// var taskdate=getVal("deadline-date")
var userId=localStorage.getItem("userid_ls")
if(task.length!=10)
{
  alert("Invalid meeting ID");
}
else{

showchats(task);

// var ref=database.ref("meetings/"+task+"/chat")

  // var data={
  //   task:task,
  //   taskdate:taskdate
  // }
  // ref.push(data);
  // clearFields();

}
}

function clearFields() {

     document.getElementById("tasktext").value = "";
     document.getElementById("deadline-date").value = "";
}
// showTasks()

//displaying added tasks in the user dashboard with the most recent ones first
function showchats(task) {
  var userId=localStorage.getItem("userid_ls")
  var ref=database.ref("meetings/"+task+"/chat")
  ref.on('value',gotTaskData,errData);
}

function gotTaskData(data){
   
    var taskstr="";  
    var task_data=data.val();
    var task_keys=Object.keys(task_data);
    var n=task_keys.length-1

    for(var i=0;i<=n;i++){
      var nowKey=task_keys[i];
      // var now_task=task_data[nowKey].task;
      var now_chatmsg=task_data[nowKey].chatmsg;
      var now_taskstr=""
      nowKey='"'+nowKey+'"'
      now_taskstr="<div class='task'> "+now_chatmsg+"</div>"

      taskstr+=now_taskstr;
      // document.getElementById("myTasksId").innerHTML=taskstr
      // console.log(taskstr);
      }
       document.getElementById("mymeetingchatId").innerHTML=taskstr
      
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



