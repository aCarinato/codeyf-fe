// import classes from './ItemSelector.module.css';
// components
import BuddyCard from '../people/BuddyCard';
import MentorCard from '../people/MentorCard';
import BtnCTA from './BtnCTA';

function ItemSelector(props) {
  const { type, user, selectedId, setSelectedId, addUser } = props;
  return (
    <div className="outline">
      {type === 'mentor' && (
        <MentorCard
          // key={mentor._id}
          userId={user._id}
          username={user.username}
          handle={user.handle}
          description={user.shortDescription}
          country={user.country}
          teaching={user.teaching}
          profilePic={user.profilePic}
        />
      )}
      {type === 'buddy' && (
        <BuddyCard
          // key={buddy._id}
          userId={user._id}
          username={user.username}
          handle={user.handle}
          description={user.shortDescription}
          country={user.country}
          learning={user.learning}
          profilePic={user.profilePic}
        />
      )}
      <div className="addbuddy-footer">
        <div className="addbuddy-action">
          {user._id === selectedId && (
            <BtnCTA
              classname="btn-light-big"
              label="Add mentor"
              onCLickAction={addUser}
            />
          )}
        </div>
        <div className="addbuddy-check-div">
          <div
            onClick={() => {
              if (user._id === selectedId) {
                setSelectedId('');
              } else {
                setSelectedId(user._id);
              }
            }}
            className="addbuddy-check"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ItemSelector;
