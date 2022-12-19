const addChat = async (authState, chats, setChats, group, router) => {
  if (authState && authState.email.length > 0) {
    // console.log(user);
    const alreadyInChat =
      chats.length > 0 &&
      chats.filter((chat) => chat.messagesWith === group.organiser._id).length >
        0;

    if (alreadyInChat) {
      return router.push(`/my-profile/chats?message=${group.organiser._id}`);
    }
    //
    else {
      const newChat = {
        messagesWith: group.organiser._id,
        username: group.organiser.username,
        profilePicUrl:
          group.organiser.profilePic &&
          group.organiser.profilePic.url &&
          group.organiser.profilePic.url !== ''
            ? group.organiser.profilePic.url
            : '/img/default-pic.png',
        lastMessage: '',
        date: Date.now(),
      };

      setChats((prev) => [newChat, ...prev]);

      return router.push(
        `/my-profile/chats?message=${group.organiser._id}`,
        undefined,
        {
          shallow: true,
        }
      );

      //   return router.push(`/messages?message=${user._id}`);
    }
  } else {
    router.push('/login');
  }
};

export default addChat;
