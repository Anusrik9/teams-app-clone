if(navigator.onLine){
  console.log("Online")
}else{
console.log("Offline")
}

var firebaseConfig = {
    apiKey: "AIzaSyCL2epSrzXhHgZQgL2ELSOf0c4PwA5fKx8",
    authDomain: "teams-clone-db-3248d.firebaseapp.com",
    databaseURL: "https://teams-clone-db-3248d-default-rtdb.firebaseio.com",
    projectId: "teams-clone-db-3248d",
    storageBucket: "teams-clone-db-3248d.appspot.com",
    messagingSenderId: "251199655862",
    appId: "1:251199655862:web:88082192a8b124f8483b17",
    measurementId: "G-5RP0SY6Q3H"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database=firebase.database();   //initialising firebase
//writing some basic functions to avoid repetitive writing of the code
function changeDisplay(id,type){
     document.getElementById(id).style.display=type;
}

function changeTitle(newTitle){
  document.querySelector('title').textContent = newTitle;
}

function updateStatus(id,status){
  console.log("updating status")
  document.getElementById(id).innerHTML="<b>"+status+"</b>";
}

var globalUserId
var globalOTP
var globalName
var globalEmail
var globalURL

//naming the child with the email(@ is not accepted so mail is coverted)
function mail_to_userid(email){
var new_mail="";
  for(var i=0;i<email.length;i++){
      if(email[i]!='.'){
        new_mail=new_mail+email[i];
      }else{
        new_mail=new_mail+'*';
      }
  }
  return new_mail;
}

function userid_to_mail(userid){
var new_mail="";
  for(var i=0;i<userid.length;i++){
      if(email[i]!='*'){
        new_mail=new_mail+email[i];
      }else{
        new_mail=new_mail+'.';
      }
  }
  return new_mail;
}

//storing the userID, userName, userEmail in the local storage for repeated and easy access
function localStorage_set_username(name){
  localStorage.setItem("userid_ls", name);
}
function localStorage_set_name(name)
{
  localStorage.setItem("userName_ls",name);
}
function localStorage_set_useremail(email)
{
  localStorage.setItem("useremail_ls",email);
}

function clear_localStorage(){
  localStorage.clear();
}

function Bodyload(){
  var tempUserId=localStorage.getItem("userid_ls")
  if(tempUserId==null){
    console.log("-Need to Register-")
    openRegister();

  }else if(tempUserId=="-"){
    console.log("-Need to Login-")

   openLogin();

  }else{
    globalUserId=tempUserId
    console.log("-Directing to Dashboard-")
    name=localStorage.getItem("userName_ls");
 document.getElementById("fullname").innerHTML=name
//  console.log(name)
 daypart();
// openRegister()
storeURL()
  }
}

function openRegister(){
    location.replace("/register.html"); 
}

function openLogin(){
    location.replace("/login.html");  
}

function openForgetPwd(){
   location.replace("/forgot-password.html");
}

function storeURL(){
  var t=4;
   globalURL=window.location.href;
    var str="";
    for(var i=0;i<globalURL.length;i++){
      if(globalURL[i]=='/'){
        t=t-1;
        if(t==0){
            break;
        }
        str+=globalURL[i];
      }else{
        str+=globalURL[i];
      }
    }
    globalURL=str
    console.log(globalURL)
}

function openDashboard(){
  //  daypart();
    
  storeURL()

  location.replace("/index.html");
  name=localStorage.getItem("userName_ls");
 document.getElementById("fullname").innerHTML=name
 console.log(name)
}

function getVal(id){
  return document.getElementById(id).value;
}
//registration OTP to the mail
function sendOTP(){
  var email=getVal("exampleInputEmail-register");
    console.log("abcf")

  if(email.length==0){
    console.log("abc")
    updateStatus("register-status","Enter Valid Email !");
    return
  }else{

    var tempUserid=mail_to_userid(email)
    globalUserId=tempUserid
    
    var ref=database.ref("users/"+tempUserid+"/UserInfo")
    var flag=0
    ref.once("value")
      .then(function (snapshot){     
          snapshot.forEach(function(childSnapshot){   
          var key=  childSnapshot.key;        
          var childData = childSnapshot.val();
              // existing user
            updateStatus("register-status","Account with this email already exists, Please Login")  
            if(childData.email!=""){
              flag=1
              return;
            }
          });
          if(flag==0){
            updateStatus("register-status","OTP Send to your Email")  
           SentOTPtoMail(email); 
          }           
      }); 

  }
}

function SentOTPtoMail(email){
    changeDisplay("register","block")
    changeDisplay("sendOTPbtnid","none");

    globalOTP = Math.floor((Math.random() * 100000) + 1);

    Email.send({ 
        Host: "smtp.gmail.com", 
        Username: "notifications.teams.clone@gmail.com", 
        Password: "Teamsclone@1", 
        To: email, 
        From:  "notifications.teams.clone@gmail.com", 
        Subject: "OTP for the Teams Clone app ", 
        Body: "Hello <br><br> Your OTP - " +globalOTP
      }) 
        .then(function (message) { 
          console.log("mail sent successfully to "+email) 
        }); 
}

function register(){

var firstName=getVal("exampleFirstName")
var lastName=getVal("exampleLastName")
var name=firstName+" "+lastName
var email=getVal("exampleInputEmail-register")
var otp=getVal("exampleInputOTP")
var pwd1=getVal("exampleInputPassword")
var pwd2=getVal("exampleRepeatPassword")


var ref=database.ref("users/"+globalUserId)

if(otp!=globalOTP){
  updateStatus("register-status","Wrong OTP") 
}else if(pwd1!=pwd2){
  updateStatus("register-status","Passwords donot match")   
}else if(pwd1.length<6){
  updateStatus("register-status","Password should contain minimum 6 characters") 
}else{
  updateStatus("register-status","Registered Successfully")
  var data={
    name:name,
    email:email,
    password:pwd1,
    userId:globalUserId,
    status:"online"
  }
  var taskdata={
    task:"your works here",
    taskdate:"-"
  }
  var meetingdata={
    meeting:"your meeting here",
    meetingdate:"-",
    meetingtime:"-"
  }
  var chatdata={
    userid:"teams_chat_bot",
    name:"Teams chat bot",
    email:"replies in seconds"
  }
  
  var actualChat={
    chat:"<div class='m-received'><div class='message'><p>Hi "+name+" ,Welcome to microsoft teams</p><div class='msg-timestamp d-flex flex-nowrap'><small class='text-muted'>00:00</small class='text-muted'></div></div></div>"
  }

  var refChat=database.ref("users/"+globalUserId+"/Chat")
  refChat.child("teams_chat_bot").push(actualChat)
  ref.child("UserInfo").set(data);
  ref.child("tasks").push(taskdata);
  ref.child("meetings").push(meetingdata);
  ref.child("chatContacts").push(chatdata);
  globalName=name;
  globalEmail=email;
  localStorage_set_username(globalUserId);
  localStorage_set_name(name);
  localStorage_set_useremail(email);
  openDashboard()
}
}
//login function
function login(){
var email=getVal("exampleInputEmail-login")
var pwd=getVal("exampleInputPassword-login")
var tempId=mail_to_userid(email)
globalUserId=tempId
var thisuserref=database.ref("users/"+tempId)
flag=0

thisuserref.once("value")
    .then(function (snapshot){
            snapshot.forEach(function(childSnapshot){
                  flag=1;  
                  var key=  childSnapshot.key;        
                  var childData = childSnapshot.val();
                  
                if(key=="UserInfo"){        
                    if(pwd==childData.password)
                    {
                      globalName=childData.name;
                      console.log("correct - password");  
                      localStorage_set_username(globalUserId); 
                      localStorage_set_name(childData.name);
                      localStorage_set_useremail(childData.email); 
                      openDashboard()         
                    }else{
                        updateStatus("login-status","Incorrect password")
                    }
                }
           });
           if(flag==0){ 
                   updateStatus("login-status","You dont have an account ! Register to Continue")
           }
        console.log(login-status)
       });  
}

function forgetpwd(){

var email=getVal("exampleInputEmail-ForgetPwd")
var tempId=mail_to_userid(email)

globalUserId=tempId
var thisuserref=database.ref("users/"+tempId)
flag=0

thisuserref.once("value")
    .then(function (snapshot){
            snapshot.forEach(function(childSnapshot){
                  flag=1;  
                  var key=  childSnapshot.key;        
                  var childData = childSnapshot.val();
                if(key=="UserInfo"){        
                        updateStatus("forgetpwd-status","A link has been sent to your mail ")
                        SendForgetLink(tempId,email);  
                }
           });
           if(flag==0){ 
                   updateStatus("forgetpwd-status","You dont have an account ! Register to Continue")
           }
       });  



}

function SendForgetLink(userid,email){
   
   var url="https://teamclonefrontend.sivaram1234.repl.co/reset-password.html?="+userid
  
   Email.send({ 
        Host: "smtp.gmail.com", 
        Username: "notifications.teams.clone@gmail.com", 
        Password: "Teamsclone@1", 
        To: email, 
        From:  "notifications.teams.clone@gmail.com", 
        Subject: "Mail to reset your password ", 
        Body: "Hello <br><br> <a href="+url+">Click here to reset Pwd</a>" 
      }) 
        .then(function (message) { 
          console.log("mail sent successfully to "+email) 
        })
}

function logout(){
    localStorage_set_username("-")
    localStorage_set_name("-")
    localStorage_set_useremail("-")
    location.reload();
}

function textToSpeech(mess) {
  let utter = new SpeechSynthesisUtterance();
utter.lang = 'en-US';
utter.text = mess;
utter.volume = 0.5;



// speak
window.speechSynthesis.speak(utter);
}

// tasksText()
//getting the whole task text through speech
function tasksText() {
  console.log("tasktext");
  var userId=localStorage.getItem("userid_ls")
  var ref=database.ref("users/"+userId+"/tasks")
  var tasktext=ref.on('value',getTaskText,errData);
  // return tasktext;
}

function getTaskText(data){
    
   
    var taskstr="Your Tasks are";  
    var task_data=data.val();
    var task_keys=Object.keys(task_data);
    var n=task_keys.length-1

    for(var i=n;i>=1;i--){
      var nowKey=task_keys[i];
      var now_task=task_data[nowKey].task;
      var now_taskstr=""
      // nowKey='"'+nowKey+'"'
      // now_taskstr=now_task

      taskstr+=" "+now_task+".";
      // document.getElementById("myTasksId").innerHTML=taskstr
      // console.log(taskstr);
      }
      textToSpeech(taskstr)
       console.log(taskstr) ;
      
}
//getting the meeting text through speech
function meetingText(){
  var userId=localStorage.getItem("userid_ls")
  var ref=database.ref("users/"+userId+"/meetings")
  var meetingtext=ref.on('value',getMeetingText,errData);
}
function getMeetingText(data){
   
    var meetingstr="Your Meetings are";  
    var meeting_data=data.val();
    var meeting_keys=Object.keys(meeting_data);
    var n=meeting_keys.length-1

    for(var i=n;i>=1;i--){
      var nowKey=meeting_keys[i];
      var now_meeting=meeting_data[nowKey].meeting;
      var now_meetingstr=""
      // nowKey='"'+nowKey+'"'
      // now_taskstr=now_task

      meetingstr+=" "+now_meeting+".";
      // document.getElementById("myTasksId").innerHTML=taskstr
      // console.log(taskstr);
      }
      textToSpeech(meetingstr)
      
}


function errData(err){
    console.log("Error");
    console.log(err);
}


// clear_localStorage()
//voice assistant 
function runSpeechRecognition() {
  console.log("sr")
		        // get output div reference
		        var output = document.getElementById("output");
		        // get action element reference
		        var action = document.getElementById("voiceassistant");
                // new speech recognition object
                var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
                var recognition = new SpeechRecognition();
            
                // This runs when the speech recognition service starts
                recognition.onstart = function() {
                    voiceassistant.innerHTML = "<small>listening, please speak...</small>";
                };
                
                recognition.onspeechend = function() {
                    voiceassistant.innerHTML = "<small>stopped listening, hope you are done...</small>";
                    recognition.stop();
                }
              
                // This runs when the speech recognition service returns result
                recognition.onresult = function(event) {
                    var transcript = event.results[0][0].transcript;
                    console.log("transcript -> " + transcript)
                    var confidence = event.results[0][0].confidence;
                    if(transcript.includes("tasks")||transcript.includes("task"))
                    {
                      // voiceassistant.innerHTML="<small>recognised tasks</small>"
                      tasksText();
                      document.getElementById("voicestatus").innerHTML="Recognized tasks"
                    }
                    else if(transcript.includes("meeting")||   transcript.includes("meetings"))
                    {
                      meetingText();
                      document.getElementById("voicestatus").innerHTML="Recognized meetings"

                    }else{
                       textToSpeech("Couldn't recognize anything, please try again")
                      document.getElementById("voicestatus").innerHTML="Couldn't recognize anything, please try again"

                      //  voiceassistant.innerHTML="<small>recognised tasks</small>"
                    }
                };
                
                 // start recognition
                 recognition.start();
	        }

function updateUserStatus(newstatus){
// update the status in the db with newstatus string
     var data={
        status:"newstatus",
     }

}


function daypart(){
  var today = new Date()
 var curHr = today.getHours()
var daystatus="";
     if (curHr < 12) {
      daystatus="Good morning, Hope you are having a good day!!"
     } 
     else if (curHr < 18) {
        // console.log('good afternoon')
        daystatus="Good afternoon, Hope you are having a good day!!"
         } 
    else if(curHr<21) {
      // console.log('ood evening')
      daystatus='Good evening, Hope you are having a good day!!'
       }
    else 
    {
      // console.log('good night')
      daystatus='Good night, Hope you are having a good day!!'
    }

    document.getElementById("Dashboard").innerHTML="Dashboard <br><br>"+localStorage.getItem("userName_ls")+"<hr>"+daystatus
    
}

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateMeeting15(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function takeinstantcall(){

  var n=globalURL.length
  var tempid=globalURL.substring(0, n-10) 
  console.log(tempid)
  tempid=tempid+"join/"+generateMeeting15(15)
  window.open(tempid, "_blank");
}