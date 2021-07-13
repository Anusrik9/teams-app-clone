//generating random string for the interview code
function generateRandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

var meetingCode=generateRandomString(6)

updateStatus("interview-status","Interview Dashboard")

function getVal(id){
  return document.getElementById(id).value;
}

var interviewemail= getVal("interview-emailId")
var interviewDate= getVal("interview-date")
var interviewTime=getVal("interview-time")

//sending mail to the candidate regarding the meeting info
function SendCandidateMail(email){
     var candidateCode= generateRandomString(8)
    Email.send({ 
        Host: "smtp.gmail.com", 
        Username: "notifications.teams.clone@gmail.com", 
        Password: "Teamsclone@1", 
        To: email, 
        From:  "notifications.teams.clone@gmail.com", 
        Subject: "OTP for the Teams Clone app ", 
        Body: " Your code to join the interview - "+ candidateCode
      }) 
        .then(function (message) { 
          console.log("mail sent successfully to "+email) 
        }); 
}

function SendInterviewerMail(email){
     var interviewerCode= generateRandomString(8)
    Email.send({ 
        Host: "smtp.gmail.com", 
        Username: "notifications.teams.clone@gmail.com", 
        Password: "Teamsclone@1", 
        To: email, 
        From:  "notifications.teams.clone@gmail.com", 
        Subject: "OTP for the Teams Clone app ", 
        Body: " Your code to join the interview - "+ interviewerCode
      }) 
        .then(function (message) { 
          console.log("mail sent successfully to "+email) 
        }); 
}


function schedule(){
    changeDisplay("schehdule-interview","block");
    changeDisplay("interview-menu","none");
}

function scheduleInterview(){

}

function enterExistingInterview(){
    changeDisplay("interveiwArea","block");
    changeDisplay("interview","none");
}

function joinWithCode(){
     changeDisplay("interview")
}

// console.log("-------------")
// setTimeout(console.log(document.getElementById("ididi").contentWindow.location.href), 5000);

