# my-message
Messaging web application for Code Me World LLC job hiring exam.
# research
For the tech stack, I've chosen Next.js for the frontend because it has full-stack capabilities, and for the backend, I've chosen Firebase and Firestore. The reason for choosing Firestore and Firebase over Express.js and MongoDB is that Firestore provides real-time database capabilities by default, which is essential for messaging apps. Since this project is relatively small and developed by me alone, having a dedicated backend and connecting it over GraphQL adds unnecessary complexity. Instead, Next.js's full-stack capabilities can be utilized.
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
