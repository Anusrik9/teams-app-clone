TEAMS CLONE<br>
<hr>
<B>Getting Started<B>
git clone code<br>
Run npm i <br>
Run node server.js <br>
Opens in localhost:3000<br>
<hr>
Goals:
<br>
My goals of building this webapp were:<br>
     -videocalling between atleast two or more individuals <br>
     -a chat that is retained and could be continued after and started before the meeting<br>
     -adding different vital features to the meeting like screen share, mute/unmute<br>
     -to implement user authentication with email verification process included<br>
     - to maintain an app in the whole dashboard model<br>
     - to be able to add and maintain tasks of each users with a database<br>
     - to be able to add meeting of each user and also sending invite links regarding the scheduled meeting<br>
     - a seperate chat outside of the meeting for two peers to connect without a meeting going on<br>
     - A voice assistant <br>
     - A help chat bot <br>
     - An interview panel with collaborative Compiler, whiteboard <br>
     - implementing waiting rooms<br>
     - implementing open CV<br>
     <hr>

APP ARCHITECHTURE:<br>
The app starts with a authentication, where users can either login or register with their email id. OTP would be send to the mail to check the existance of the mail.Once an user registers or logins, he doesn't need to login again and again until he logouts

Then comes the intreting part that is our dashboard,
Dashboard has 

1. Meetings
2. Chats 
3. Voice assistant
4. tasks
5. Meeting Chats



<hr>
Features included:
   -videocalling using the  Twilio API, Socket.io and NodeJS for more than 2 peers.<br>
         -A little of coffeescript was used for enhancing the readability.<br>
    - A random URL for each meeting was generated using the uuid library of the socket.io   <br>
    - Other features in the meeting like mute/unmute, turn off/on video and Screen sharing and chatting within the meeting were also included.<br>
    - User Authentication: Using the Firebase as the database, user authentication was set.<br>
         - to make it more authentic and secure, using the smtmp service, mail verification was done(through OTP verification)<br>
    - Dashboard: Each User is logged into a seperate dashboard that stores all their information. <br> <br>
        <hr>
         - <b>Features in the dashboard</b>:<br>
           -Meetings: A user can invite or schedule a meeting with another individual at a certain time and this meeting gets added to databases of both the users and the users also get an invite link via mail.(only a registered user can be invited else alert is shown)<br>
          - Each user can add tasks to his dashboard and this helps not miss any important deadlines<br>
          - A seperate chat was included to help the peers connect through the app without necessarily having a video call.<br>
          - An interview panel was added that had a collaborative WHITEBOARD, COMPILER AND DOCS for both the recruiter and the applicant to edit just through the share of a URL.<br>
          - In the interview panel, a user can schedule an interview and the applicant receives a code via EMAIL. Each interview has a unique code and anyone who enters the right code can only enter.<br>
          -<b>A VOICE ASSISTANT</b>: This intresting feature was added 
            with the intention to increase the <b>accesability</b> of the App and make it easier for people with <b>physical disabilities</b> to use the app without any issue. This was built using the <b> JAVASCRIPT INBUILT SPEECH RECOGNITION LIBRARY</b> and also some inbuilt functions to convert text to speech.
          - <b> A HELP CHAT BOT<B>: A teams help chat bot is put that replies in seconds and helps any user to easily navigate through the APP.
          

              

    