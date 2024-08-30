# my-message
Messaging web application for Code Me World LLC job hiring exam.
#research
For the techstack I've chosen Next.js for frontend because it has fullstack capabilities and for backend I've chosen firebase and firestore. <br />
The reason why firestore and firebase were chosen over express.js and mongodb is because by default firestore has **realtime** DB capabilities which is reqiured for messaging apps. <br />
Since this project is relatively small and is done by me alone having dedicated backend file and connecting them over graphql adds unnecessary complexity and Next.js's fullstack capabilities can be used instead.
# testing
In order to test this application first clone the repository <br />
-git clone https://github.com/Belgudei655/my-message.git <br />
After that make sure next is installed <br />
-npm install next react react-dom <br />
And in the final step run the next.js <br />
-npm run dev <br />

Try logging in with two different browsers using separate Google accounts, and then chat between them. <br />
The chatroom is designed to be a super chat room, so everyone can chat in the same room. <br />
Initially, it will load **25 messages** at a time. To view previous chats, scroll all the way up (it will load 25 more messages each time you scroll up) <br />
