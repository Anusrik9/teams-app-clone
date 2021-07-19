var adjectives = [
  "small",
  "big",
  "large",
  "smelly",
  "new",
  "happy",
  "shiny",
  "old",
  "clean",
  "nice",
  "bad",
  "cool",
  "hot",
  "cold",
  "warm",
  "hungry",
  "slow",
  "fast",
  "red",
  "white",
  "black",
  "blue",
  "green",
  "basic",
  "strong",
  "cute",
  "poor",
  "nice",
  "huge",
  "rare",
  "lucky",
  "weak",
  "tall",
  "short",
  "tiny",
  "great",
  "long",
  "single",
  "rich",
  "young",
  "dirty",
  "fresh",
  "brown",
  "dark",
  "crazy",
  "sad",
  "loud",
  "brave",
  "calm",
  "silly",
  "smart",
];

var nouns = [
  "dog",
  "bat",
  "wrench",
  "apple",
  "pear",
  "ghost",
  "cat",
  "wolf",
  "squid",
  "goat",
  "snail",
  "hat",
  "sock",
  "plum",
  "bear",
  "snake",
  "turtle",
  "horse",
  "spoon",
  "fork",
  "spider",
  "tree",
  "chair",
  "table",
  "couch",
  "towel",
  "panda",
  "bread",
  "grape",
  "cake",
  "brick",
  "rat",
  "mouse",
  "bird",
  "oven",
  "phone",
  "photo",
  "frog",
  "bear",
  "camel",
  "sheep",
  "shark",
  "tiger",
  "zebra",
  "duck",
  "eagle",
  "fish",
  "kitten",
  "lobster",
  "monkey",
  "owl",
  "puppy",
  "pig",
  "rabbit",
  "fox",
  "whale",
  "beaver",
  "gorilla",
  "lizard",
  "parrot",
  "sloth",
  "swan",
];

var adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
var noun = nouns[Math.floor(Math.random() * nouns.length)];
noun = noun.charAt(0).toUpperCase() + noun.substring(1);
adjective = adjective.charAt(0).toUpperCase() + adjective.substring(1);
// document.getElementById("input-01").value = adjective + noun;

//qwertyuiop

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

console.log("New call ")
collectUsers();
var meetingids=" "
var meetingid

function collectUsers(){
  var url=window.location.href;
  var n=url.length
  var id=url.substring(n-10, n) 
  meetingid=id
  console.log(id)
  localStorage.setItem("meetingid",id)
  
  
  var userId=localStorage.getItem("userid_ls")
  var ref=database.ref("meetings/"+id+"/users")
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
      var now_chatmsg=task_data[nowKey].usermail;
      meetingids+=" "+now_chatmsg

      // taskstr+=now_taskstr;
      // document.getElementById("myTasksId").innerHTML=taskstr
      // console.log(taskstr);
      }
      console.log(meetingids)
      //  document.getElementById("mymeetingchatId").innerHTML=meetingids
      
}


function errData(err){
    console.log("Error");
    console.log(err);
}

function joincall(){
console.log(meetingids)
if(meetingids.includes(localStorage.getItem("useremail_ls"))){
  console.log("you can join")
   var url=window.location.href;
  var n=url.length
  var id=url.substring(0, n-20) 
  console.log(id+"/join/"+localStorage.getItem("meetingid"))
  location.replace(id+"/join/"+localStorage.getItem("meetingid"))

}else{
  // console.log("wrong")
  alert(" You have no access to enter the meeting")
}

}