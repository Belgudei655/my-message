import React, { useState, useRef, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "@/utils/firebase";
import { MessageBox } from "./message-box";
import { SendIcon } from "@/public";
import SignOutButton from "./sign-out-button";

export const ChatDisplay = () => {
  const userId = auth.currentUser?.uid;
  const [msgLimit, setMsgLimit] = useState(25);
  const [messages, setMessages] = useState<
    {
      id: string;
      uid: string;
      isMine: boolean;
      message: string;
      displayName: string;
      photoURL: string;
    }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const prevScrollTop = useRef(0);
  const prevMessagesHeight = useRef(0);
  const isScrollingUp = useRef(false);

  useEffect(() => {
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(msgLimit)
    );

    const unsubscribe = onSnapshot(messagesQuery, async (snapshot) => {
      const fetchedMessages = await Promise.all(
        snapshot.docs.map(async (docSnapshot) => {
          const messageData = {
            id: docSnapshot.id,
            ...docSnapshot.data(),
          } as {
            id: string;
            uid: string;
            isMine: boolean;
            message: string;
          };

          const userRef = doc(db, "users", messageData.uid);

          try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();

              return {
                ...messageData,
                displayName: userData?.displayName || "Unknown User",
                photoURL: userData?.photoURL || "",
              };
            } else {
              console.warn(`No user document found for UID ${messageData.uid}`);
              return {
                ...messageData,
                displayName: "Unknown User",
                photoURL: "",
              };
            }
          } catch (error) {
            console.error(
              `Error fetching user data for UID ${messageData.uid}:`,
              error
            );
            return {
              ...messageData,
              displayName: "Unknown User",
              photoURL: "",
            };
          }
        })
      );

      setMessages(fetchedMessages.reverse());
    });

    return () => unsubscribe();
  }, [msgLimit]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    const handleScroll = () => {
      if (chatContainer) {
        isScrollingUp.current = chatContainer.scrollTop === 0;
        if (isScrollingUp.current) {
          setMsgLimit((prevLimit) => prevLimit + 25);
          setScrollToBottom(false);
        }
      }
    };

    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      prevScrollTop.current = chatContainer.scrollTop;
      prevMessagesHeight.current = chatContainer.scrollHeight;
    }
  }, [msgLimit]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    if (chatContainer) {
      const newScrollHeight = chatContainer.scrollHeight;
      const scrollOffset = newScrollHeight - prevMessagesHeight.current;

      if (isScrollingUp.current) {
        chatContainer.scrollTop = prevScrollTop.current + scrollOffset;
      }

      prevScrollTop.current = chatContainer.scrollTop;
      prevMessagesHeight.current = newScrollHeight;
    }

    if (scrollToBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, scrollToBottom]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      try {
        await addDoc(collection(db, "messages"), {
          message: inputValue,
          uid: userId,
          isMine: true,
          createdAt: new Date(),
        });
        setInputValue("");
        setScrollToBottom(true);
      } catch (error) {
        console.error("Error adding message: ", error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-end w-full h-screen bg-[#2E073F] gap-y-4 px-4 pt-4 sm:w-full">
      <SignOutButton />
      <div
        className="flex flex-col gap-y-3 flex-1 overflow-y-auto mb-4"
        ref={chatContainerRef}
      >
        {messages.map((msg) => (
          <MessageBox
            key={msg.id}
            isMine={msg.uid === userId}
            message={msg.message}
            displayName={msg.displayName}
            photoURL={msg.photoURL}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full h-16 bg-[#2E073F] items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-x-4">
            <input
              type="text"
              placeholder="type here"
              className="w-full h-10 bg-[#EBD3F8] text-black rounded-lg placeholder-black pl-4"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="w-max px-4 rounded-lg h-10 bg-[#EBD3F8] hover:bg-[#7A1CAC]"
              type="submit"
            >
              <SendIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
