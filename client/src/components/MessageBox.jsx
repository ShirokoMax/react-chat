import { formatDate } from '../utils/index';

const MessageBox = (props) => {
  const { messages } = props;

  return (
    <div className="h-100 overflow-auto px-3 py-3">
      {messages.map((message, index) => {
        const formatedDate = formatDate(message.date);

        return (
          <div
            key={message.id}
            className="text-break mb-2"
          >
            <b>{message.username}</b> ({formatedDate}): {message.text}
          </div>
        );
      })}
    </div>
  );
};

export default MessageBox;