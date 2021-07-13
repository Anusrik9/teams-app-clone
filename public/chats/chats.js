
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
var database=firebase.database();

function getVal(id){
  return document.getElementById(id).value;
}


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

// console.log("chats.js")
  

function addChatUser(){

var email=getVal("newUserEmail")
var userId=localStorage.getItem("userid_ls")
var newuserid=""
for(var i=0;i<email.length;i++){
      if(email[i]!='.'){
        newuserid=newuserid+email[i];
      }else{
        newuserid=newuserid+'*';
      }
}
// console.log(newuserid)

var thisuserref=database.ref("users/"+newuserid)

flag=0

thisuserref.once("value")
    .then(function (snapshot){
            snapshot.forEach(function(childSnapshot){
                  // flag=1;  
                  var key=  childSnapshot.key;        
                  var childData = childSnapshot.val();
                  // console.log(key)
                if(key=="UserInfo"){
          
                  flag=1;    
                  
                  var ref=database.ref("users/"+newuserid+"/chatContacts")
                  var data={
                    userid:localStorage.getItem("userid_ls"),
                    email:localStorage.getItem("useremail_ls"),
                    name:localStorage.getItem("userName_ls")
                  }
                  ref.push(data);

                  var actualChatinmydb={
                    chat:"<div class='m-sent clearfix'><div class='message float-right'><p>Hi</p><div class='msg-timestamp d-flex flex-nowrap'><small class='text-muted'><i class='fas fa-check-double text-primary'></i>"+dateTime()+"</small class='text-muted'></div></div></div>"
                  }

                  var refChat=database.ref("users/"+localStorage.getItem("userid_ls")+"/Chat")
                  refChat.child(newuserid).push(actualChatinmydb)   
                   
                   var ref2=database.ref("users/"+localStorage.getItem("userid_ls")+"/chatContacts")
                   var data2={
                     userid:newuserid,
                     email:email,
                     name:childData.name
                   }
                   ref2.push(data2); 
                   // user added

                var actualChatinotherdb={
                    chat:"<div class='m-received'><div class='message'><p>Hi </p><div class='msg-timestamp d-flex flex-nowrap'><small class='text-muted'>"+dateTime()+"</small class='text-muted'></div></div></div>"
                  }

                  var refChat2=database.ref("users/"+newuserid+"/Chat")
                  refChat2.child(localStorage.getItem("userid_ls")).push(actualChatinotherdb)

                  current_userid_onscreen=newuserid
                  generateMessageArea(childData.name,newuserid)

                }
           });
           if(flag==0){ 
                  alert("No such user")
           }
       }); 
   clearField();
}

function clearField() {
     document.getElementById("newUserEmail").value = "";
}
// document.getElementById("fullname").innerHTML=localStorage.getItem("userName_ls")

showChatUsers()
function showChatUsers() {
  //  document.getElementById("fullname").innerHTML=localStorage.getItem("userName_ls")
  var userId=localStorage.getItem("userid_ls")
  var ref=database.ref("users/"+userId+"/chatContacts")
  ref.on('value',gotChatUsersData,errChatUsersData);
}

function gotChatUsersData(data){
   
    var chatUsersstr="";  
    var chatUsers_data=data.val();
    var chatUsers_keys=Object.keys(chatUsers_data);
    var n=chatUsers_keys.length-1

    let hashMap=new Map();

    for(var i=n;i>=0;i--){
      var nowKey=chatUsers_keys[i];
      var now_chatUser_name=chatUsers_data[nowKey].name;
      var now_chatUser_email=chatUsers_data[nowKey].email;
      var now_chatUser_userid=chatUsers_data[nowKey].userid;

      var now_chatUsersstr=""

      if(!hashMap.has(now_chatUser_userid)){
        hashMap.set(now_chatUser_userid,1);

        now_chatUser_name_inbtn='"'+now_chatUser_name+'"'
        now_chatUser_userid_inbtn='"'+now_chatUser_userid+'"'

        now_chatUsersstr="<div class='chat-list-item d-flex flex-row w-100 p-2 border-bottom ${unreadClass}' onclick='generateMessageArea("+now_chatUser_name_inbtn+","+now_chatUser_userid_inbtn+")'><img src='images/profilepic.png' alt='Profile Photo' class='img-fluid rounded-circle mr-2' style='height:50px;'><div class='w-50'><div class='name' id='solo'>"+now_chatUser_name+"</div><div class='small last-message'>"+now_chatUser_email+"</div></div></div>"

      }
      chatUsersstr+=now_chatUsersstr
      
      }
       document.getElementById("chat-list").innerHTML=chatUsersstr  
      //  console.log(chatUsersstr)   
       
}

function errChatUsersData(err){
    console.log("Error");
    console.log(err);
}

// dateTime();
function dateTime()
{
  const d= new Date();
  var k= d.toUTCString();
  var n=d.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
  // console.log(n);
   var date= k.substring(4,12);
  var time=n.substring(11,15);
  var am_pm=n.substring(18,21);
  var time_final=time.concat(am_pm);
  // console.log(time_final.concat(date))
  return (time_final.concat(date));
}
 
var current_userid_onscreen="teams_chat_bot";

function generateMessageArea(username,userid){
  console.log("generating message area of "+username);

  current_userid_onscreen=userid
  document.getElementById("chatcontactname").innerHTML=username

 var userId=localStorage.getItem("userid_ls")
  var ref=database.ref("users/"+userId+"/Chat/"+current_userid_onscreen)
  ref.on('value',gotChatData,errChatData);
}

function gotChatData(data){
   
    var chatstr="";  
    var chat_data=data.val();
    var chat_keys=Object.keys(chat_data);
    // console.log(chat_keys)
    var n=chat_keys.length-1
    // console.log(chat_keys[n]);

    var nowKey=chat_keys[n];
    chatstr=chat_data[nowKey].chat
    // console.log(chatstr)

    document.getElementById("actualChat").innerHTML=chatstr  
    updateScroll()
    // console.log("charstr "+chatstr)   
}

function errChatData(err){
    console.log("Error");
    console.log(err);
}


// sendMessagetoOnScreenuser();

function sendMessagetoOnScreenuser(){
  // console.log("msg send to "+current_userid_onscreen)
    var msgtobesent=document.getElementById("messagetext").value;
    // console.log(msgtobesent)
     document.getElementById("messagetext").value = "";
    var msgtime=dateTime()

    if(msgtobesent==""){
      return;
    }else{
      if(current_userid_onscreen=="teams_chat_bot"){

         var my_db_msg= "<div class='m-sent clearfix'><div class='message float-right'><p>"+msgtobesent+"</p><div class='msg-timestamp d-flex flex-nowrap'><small class='text-muted'><i class='fas fa-check-double text-primary'></i> "+msgtime+"</small class='text-muted'></div></div></div>"
          

        if(msgtobesent=="help"){
          msgtobesent="Commands present are <b>chat</b>, <b>meetings</b>, <b>tasks</b>, <b>interview</b>, <b>voice assitant</b>, <b>chat bot</b>"
        }else if(msgtobesent=="chat"){
            msgtobesent="This is for chat with other users regardless of the meeting. You need to add a new user using email, you can then send or receive messages in real time"
        }else if(msgtobesent=="meetings"){
            msgtobesent="This is for having meetings with any user, we can send meeting invitation in your dashboard, they can get the meeting invite in their dashboard with meeting url to join."
        }else if(msgtobesent=="tasks"){
            msgtobesent="This is for storing our tasks, we can add or remove tasks with our dead line"
        }else if(msgtobesent=="interview"){
            msgtobesent="This is foe having interview, we have added white board, compiler and editor where both pesons in the interview can actually involve in real time"
        }else if(msgtobesent=="voice assistant"){
            msgtobesent="This is my friend voice assistant, you can ask it about your tasks and meetings, it would speak it out for you"
        }else if(msgtobesent=="chat bot"){
          var name=localStorage.getItem("userName_ls")
            msgtobesent="Thats actually me, My name is " +name+",Its you that copied my name !"
        }else{
          msgtobesent="send <b>help</b>"
        }  

         var other_db_msg= "<div class='m-received'><div class='message'><p>"+msgtobesent+"</p><div class='msg-timestamp d-flex flex-nowrap'><small class='text-muted'>"+msgtime+"</small class='text-muted'></div></div></div>"

         var userIdnow=localStorage.getItem("userid_ls")
    var refnow=database.ref("users/"+userIdnow+"/Chat/"+current_userid_onscreen)

    refnow.once("value")
      .then(function (snapshot){     
          snapshot.forEach(function(childSnapshot){   
          var key=  childSnapshot.key;        
          var childData = childSnapshot.val();
              // existing user
              // console.log(key)
              // console.log(childData)
              // console.log(childData.chat)
              nowchat=childData.chat
              nowchat+=(my_db_msg+other_db_msg)
              data={
                chat:nowchat
              }
            refnow.child(key).set(data);            
          });    
      }); 


      }else{

      var other_db_msg= "<div class='m-received'><div class='message'><p>"+msgtobesent+"</p><div class='msg-timestamp d-flex flex-nowrap'><small class='text-muted'>"+msgtime+"</small class='text-muted'></div></div></div>"

    var my_db_msg="<div class='m-sent clearfix'><div class='message float-right'><p>"+msgtobesent+"</p><div class='msg-timestamp d-flex flex-nowrap'><small class='text-muted'><i class='fas fa-check-double text-primary'></i>"+msgtime+"</small class='text-muted'></div></div></div>"

    
    //pushin_mydb(my_db_msg)
    //pushin_otherdb(other_db_msg)
  
    var userIdnow=localStorage.getItem("userid_ls")
    var refnow=database.ref("users/"+userIdnow+"/Chat/"+current_userid_onscreen)

    refnow.once("value")
      .then(function (snapshot){     
          snapshot.forEach(function(childSnapshot){   
          var key=  childSnapshot.key;        
          var childData = childSnapshot.val();
              // existing user
              // console.log(key)
              // console.log(childData)
              // console.log(childData.chat)
              nowchat=childData.chat
              nowchat+=my_db_msg
              data={
                chat:nowchat
              }
            refnow.child(key).set(data);            
          });    
      }); 

      var refnow2=database.ref("users/"+current_userid_onscreen+"/Chat/"+userIdnow)
      
      refnow2.once("value")
      .then(function (snapshot){     
          snapshot.forEach(function(childSnapshot){   
          var key=  childSnapshot.key;        
          var childData = childSnapshot.val();
              // existing user
              // console.log(key)
              // console.log(childData)
              // console.log(childData.chat)
              nowchat=childData.chat
              nowchat+=other_db_msg
              data={
                chat:nowchat
              }
            refnow2.child(key).set(data);            
          });    
      }); 


      }
    }

}

/*
function pushin_mydb(username,userid){
 var userId=localStorage.getItem("userid_ls")
  var ref=database.ref("users/"+userId+"/Chat")
  ref.on('value',pushin_mydbData,errpushin_mydb);
}

function pushin_mydbData(data){
     
    var chat_data=data.val();
    var chat_keys=Object.keys(chat_data);
    var n=chat_keys.length-1

    var nowKey=chat_keys[n];
    var chatstr=chatUsers_data[nowKey].chat

    var userIdnow=localStorage.getItem("userid_ls")
    var refnow=database.ref("users/"+userIdnow+"/Chat")
    
}

function errpushin_mydb(err){
    console.log("Error");
    console.log(err);
}

function pushin_otherdb(username,userid){

 var userId=localStorage.getItem("userid_ls")
  var ref=database.ref("users/"+userId+"/Chat")
  ref.on('value',pushin_otherdbData,errpushin_otherdb);
}

function pushin_otherdbData(data){
   
    var chatstr="";  
    var chat_data=data.val();
    var chat_keys=Object.keys(chat_data);
    var n=chat_keys.length-1

    var nowKey=chat_keys[n];
    chatstr=chatUsers_data[nowKey].chat

    document.getElementById("chat-list").innerHTML=chatUsersstr     
}

function errpushin_otherdb(err){
    console.log("Error");
    console.log(err);
}
*/


// "<div class='m-received'><div class='message'><p>"+message+"</p><div class='msg-timestamp d-flex flex-nowrap'><small class='text-muted'>"+07:48+"</small class='text-muted'></div></div></div>"

// "<div class='m-sent clearfix'><div class='message float-right'><p>"++"</p><div class='msg-timestamp d-flex flex-nowrap'><small class='text-muted'><i class='fas fa-check-double text-primary'></i>"+08:00+"</small class='text-muted'></div></div></div>"

// "<div class='m-received'><div class='message'><p>"+message+"</p><div class='msg-timestamp d-flex flex-nowrap'><small class='text-muted'>"+07:48+"</small class='text-muted'></div></div></div>"


//  "<div class='m-sent clearfix'><div class='message float-right'><p>"+message+"</p><div class='msg-timestamp d-flex flex-nowrap'><small class='text-muted'><i class='fas fa-check-double text-primary'></i> "+08:00+"</small class='text-muted'></div></div></div>"


// function addnotification(){
//   document.getElementById("chatcontactname").innerHTML="New message received"
//  setTimeout(alertFunc, 3000);
// }

// function alertFunc() {
//   alert("Hello!");
// }

// }

    // if (keyCode === 13) {
    //     $("#basic-text1").click();
    // }