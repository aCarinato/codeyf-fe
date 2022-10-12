// own components
import Modal from '../UI/Modal';
import BtnCTA from '../UI/BtnCTA';
import { Fragment } from 'react';

function MessageForm(props) {
  const {
    onClose,
    setShowMsgForm,
    message,
    setMessage,
    handleStartConversation,
    successMsg,
  } = props;

  return (
    <Modal onClose={onClose}>
      <div onClick={() => setShowMsgForm(false)}>X</div>
      {successMsg ? (
        <div>MESSAGE SENT</div>
      ) : (
        <Fragment>
          <div>
            <label>Your message</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <BtnCTA
              label="send message"
              onCLickAction={handleStartConversation}
            />
          </div>
        </Fragment>
      )}
    </Modal>
  );
}

export default MessageForm;
