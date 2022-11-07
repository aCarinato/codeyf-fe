import axios from 'axios';

const getUserInfo = async (userToFindId) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/chats/${userToFindId}`
      // {
      //   headers: {
      //     Authorization: token,
      //   },
      // }
    );
    // console.log(res);
    return res.data.user;
  } catch (error) {
    console.error(error);
  }
};

export default getUserInfo;
