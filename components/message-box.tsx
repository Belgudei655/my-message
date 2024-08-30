import React from "react";

interface MessageBoxProps {
  isMine: boolean;
  message: string;
  displayName: string;
  photoURL: string;
}

export const MessageBox: React.FC<MessageBoxProps> = ({
  isMine,
  message,
  displayName,
  photoURL,
}) => {
  return (
    <>
      {isMine ? (
        <div className="flex justify-end w-full h-max">
          <div className="bg-[#F7EFE5] w-max max-w-[50%] p-2 rounded-lg text-black">
            {message}
          </div>
        </div>
      ) : (
        <div className="flex items-center w-full h-max gap-2">
          <img
            src={photoURL}
            alt={displayName}
            className="w-8 h-8 rounded-full"
          />
          <div className="bg-[#C8A1E0] w-max max-w-[50%] p-2 rounded-lg text-black">
            <strong>{displayName}</strong>: {message}
          </div>
        </div>
      )}
    </>
  );
};
