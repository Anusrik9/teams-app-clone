var joinermail
var joinerId 
//adding the meeting to the users database
function addMeetingOld(){
console.log("add meeting")
var meetingjoinermail=getVal("meetingmail")
var joinerId=mail_to_userid(meetingjoinermail)
var thisuserref=database.ref("users/"+joinerId)
flag=0

thisuserref.once("value")
    .then(function (snapshot){
            snapshot.forEach(function(childSnapshot){
                  flag=1;  
            });
  });

if(flag==0)
{
  // updateStatus("login-status","This is not a registered account")
  console.log("not registered account")
}
else if(flag==1)
{

var meetingtext=getVal("meetingtext")
var meetingdate=getVal("meeting-date")
var meetingtime=getVal("meeting-time")
var userId=localStorage.getItem("userid_ls")
if(meetingtext=="")
{
  alert("Enter a valid meeting!!");
}
else{
var ref=database.ref("users/"+userId+"/meetings")
var otherref=database.ref("users/"+joinerId+"/meetings")
 meetingurl=globalURL+"newcall?="+generateMeeting(10)

  var data={
    meetingjoinermail:meetingjoinermail,
    meeting:meetingtext,
    meetingdate:meetingdate,
    meetingtime:meetingtime,
    meetingurl:meetingurl
  }
  var data2={
    meetingjoinermail:localStorage.getItem("useremail_ls"),
    meeting:meetingtext,
    meetingdate:meetingdate,
    meetingtime:meetingtime,
    meetingurl:meetingurl
  }
  ref.push(data);
  otherref.push(data2);
  
  meetingaddtext=" Your meeting ID is "+meetingurl
  SendMeetingInvite(joinerId,meetingjoinermail,meetingtext+meetingaddtext,meetingdate,meetingtime)
  SendMeetingMail(localStorage.getItem("userid_ls"),localStorage.getItem("useremail_ls"),meetingtext+meetingaddtext,meetingdate,meetingtime)
  
  clearFields();
}

}
}

function addMeeting(){
console.log("add meeting")
var meetingjoinermail=getVal("meetingmail")
var joinerId=mail_to_userid(meetingjoinermail)
var thisuserref=database.ref("users/"+joinerId)
flag=0

thisuserref.once("value")
    .then(function (snapshot){
            snapshot.forEach(function(childSnapshot){
                  var key=  childSnapshot.key;        
                  var childData = childSnapshot.val();
                  // console.log(key)
                if(key=="UserInfo"){
          
                  flag=1;    
                  
                 
var meetingtext=getVal("meetingtext")
var meetingdate=getVal("meeting-date")
var meetingtime=getVal("meeting-time")
var userId=localStorage.getItem("userid_ls")
if(meetingtext=="")
{
  alert("Enter a valid meeting!!");
}
else{
var ref=database.ref("users/"+userId+"/meetings")
var otherref=database.ref("users/"+joinerId+"/meetings")

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = "";
    const charactersLength = characters.length;
    for ( let i = 0; i < 10; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        // console.log(result)
    }
    // console.log(result)

  var meetingurl=globalURL+"newcall?="+result
  console.log(meetingurl)
  var meetingid=result

  var data={
    meetingjoinermail:meetingjoinermail,
    meeting:meetingtext,
    meetingdate:meetingdate,
    meetingtime:meetingtime,
    meetingurl:meetingurl
  }
  var data2={
    meetingjoinermail:localStorage.getItem("useremail_ls"),
    meeting:meetingtext,
    meetingdate:meetingdate,
    meetingtime:meetingtime,
    meetingurl:meetingurl
  }
  ref.push(data);
  otherref.push(data2);

  var meetref=database.ref("meetings/"+meetingid+"/users")
  dat1={
    usermail:localStorage.getItem("useremail_ls")
  } 
  dat2={
    usermail:meetingjoinermail
  } 
  meetref.push(dat1)
  meetref.push(dat2)

 meetingaddtext=" Your meeting ID is "+meetingurl
  SendMeetingInvite(joinerId,meetingjoinermail,meetingtext+meetingaddtext,meetingdate,meetingtime)
  SendMeetingMail(localStorage.getItem("userid_ls"),localStorage.getItem("useremail_ls"),meetingtext+meetingaddtext,meetingdate,meetingtime)
  
  clearFields();
}


                }
            });
            if(flag==0)
          {
          //  updateStatus("login-status","This is not a registered account")
          alert(" This is not a registered account ");
            console.log("not registered account")
          }
  });

// if(flag==0)
// {
//   // updateStatus("login-status","This is not a registered account")
//   console.log("not registered account")
// }
// else if(flag==1)
// {

// var meetingtext=getVal("meetingtext")
// var meetingdate=getVal("meeting-date")
// var meetingtime=getVal("meeting-time")
// var userId=localStorage.getItem("userid_ls")
// if(meetingtext=="")
// {
//   alert("Enter a valid meeting!!");
// }
// else{
// var ref=database.ref("users/"+userId+"/meetings")
// var otherref=database.ref("users/"+joinerId+"/meetings")
//  meetingurl=globalURL+"newcall?="+generateMeeting(10)

//   var data={
//     meetingjoinermail:meetingjoinermail,
//     meeting:meetingtext,
//     meetingdate:meetingdate,
//     meetingtime:meetingtime,
//     meetingurl:meetingurl
//   }
//   var data2={
//     meetingjoinermail:localStorage.getItem("useremail_ls"),
//     meeting:meetingtext,
//     meetingdate:meetingdate,
//     meetingtime:meetingtime,
//     meetingurl:meetingurl
//   }
//   ref.push(data);
//   otherref.push(data2);
  
//   // SendMeetingInvite(joinerId,meetingjoinermail,meetingtext,meetingdate,meetingtime)
//   // SendMeetingMail(localStorage.getItem("userid_ls"),localStorage.getItem("useremail_ls"),meetingtext,meetingdate,meetingtime)
  
//   clearFields();
// }

// }
}
//sending meeting invite via to the scheduled person
function SendMeetingInvite(userid,email,text,date,time){
  
   Email.send({ 
        Host: "smtp.gmail.com", 
        Username: "notifications.teams.clone@gmail.com", 
        Password: "Teamsclone@1", 
        To:email,
        From:  "notifications.teams.clone@gmail.com", 
        Subject: "Meeting Mail", 
        Body: "Hello "+email+" You have been invited to a meeting on "+date+" at "+time+"for "+text
      }) 
        .then(function (message) { 
          console.log("mail sent successfully to "+email) 
        })
}

//sending meeting info via mail to the user.
function SendMeetingMail(userid,email,text,date,time){
  
   Email.send({ 
        Host: "smtp.gmail.com", 
        Username: "notifications.teams.clone@gmail.com", 
        Password: "Teamsclone@1", 
        To:email,
        From:  "notifications.teams.clone@gmail.com", 
        Subject: "Meeting Mail", 
        Body: "Hello "+email+"You have scheduled a meeting on "+date+"at "+time+"for "+text
      }) 
        .then(function (message) { 
          console.log("mail sent successfully to "+email) 
        })
}

function clearFields() {

     document.getElementById("meetingtext").value = "";
     document.getElementById("meeting-date").value = "";
     document.getElementById("meeting-time").value="";
}
showMeetings()
//function to display all the meetings of the user in his meeting dashboard
function showMeetings() {
  var userId=localStorage.getItem("userid_ls")
  var ref=database.ref("users/"+userId+"/meetings")
  ref.on('value',gotData,errData);
}

function gotData(data){
   
    var meetingstr="";  
    var meeting_data=data.val();
    var meeting_keys=Object.keys(meeting_data);
    var n=meeting_keys.length-1

    for(var i=n;i>=1;i--){
      var nowKey=meeting_keys[i];
      var now_meetingtext=meeting_data[nowKey].meeting;
      var now_meetingdate=meeting_data[nowKey].meetingdate;
      var now_meetingtime=meeting_data[nowKey].meetingtime;
      var inviteemail=meeting_data[nowKey].meetingjoinermail
      var nowMeetingURL=meeting_data[nowKey].meetingurl

      nowKey='"'+nowKey+'"'

    // nowMeetingURL=globalURL+"newcall?="+generateMeeting(10)

      now_meetingstr="<div class='meeting'><a target='_blank' href="+" " +nowMeetingURL+"><button class='btn btn-secondary removeBtnClass' type='button' data-dismiss='modal' >Join Meeting</button></a>[ "+now_meetingdate+" "+now_meetingtime+" ]"+now_meetingtext +" "+"["+inviteemail+"]" +"</div>"

      meetingstr+=now_meetingstr;
      // document.getElementById("myTasksId").innerHTML=taskstr
      // console.log(taskstr);
      }
       document.getElementById("myMeetingsId").innerHTML=meetingstr
      
}


function errData(err){
    console.log("Error");
    console.log(err);
}
//removing meeting from the dashboard 
 function removeMeeting(id){
  var userId=localStorage.getItem("userid_ls")
  var ref=database.ref("users/"+userId+"/meetings")
  ref.child(id).remove()
}


const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateMeeting(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var globalURL=""
storeURL()
function storeURL(){
  var t=3;
   globalURL=window.location.href;
    var str="";
    for(var i=0;i<globalURL.length;i++){
      if(globalURL[i]=='/'){
        str+=globalURL[i];
        t=t-1
        if(t==0){
            break;
        }  
      }else{
        str+=globalURL[i];
      }
    }
    globalURL=str
    // console.log(globalURL)
}

console.log(globalURL);

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