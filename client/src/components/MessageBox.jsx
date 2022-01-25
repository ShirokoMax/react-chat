import React from 'react';
import { formatDate } from '../utils/index';

export default class MessageBox extends React.Component {
  constructor(props) {
    super(props);
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { messages } = this.props;
    return (
      <>
        <div className="px-3 py-3">
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
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}
        >
        </div>
      </>
    );
  }
};
