import Layout from "@/components/layout";
import { useUserAuth } from "@/context/userAuthContext";
import { DocumentResponse, Post, ProfileResponse } from "@/types";
import React, { useState } from "react";
import Guest_user from "@/assets/images/Guest_user.jpg";
import { Button } from "@/components/ui/button";
import { EditIcon, HeartIcon } from "lucide-react";
import { getPostByUserId } from "@/repository/post.service";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "@/repository/user.service";

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const initialUserInfo: ProfileResponse = {
    id: "",
    userId: user?.uid,
    displayName: user?.displayName ? user.displayName : "Guest_user",
    photoURL: user?.photoURL ? user.photoURL : "",
    userBio: "Please update your Bio...",
  };
  const [userInfo, setUserInfo] = useState<ProfileResponse>(initialUserInfo);

  const [data, setData] = React.useState<DocumentResponse[]>([]);
  // console.log(userInfo);

  const getAllPost = async (id: string) => {
    try {
      const querySnapshot = await getPostByUserId(id);
      const tempArr: DocumentResponse[] = [];
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Post;
          let responseObj: DocumentResponse = {
            id: doc.id,
            ...data,
          };
          // console.log("The response object is : ", responseObj);
          tempArr.push(responseObj);
        });
        setData(tempArr);
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderPost = () => {
    return data.map((item) => {
      return (
        <div key={item.photos[0].uuid} className="relative cursor-pointer">
          <div className="absolute group transition-all duration-200 bg-transparent hover:bg-slate-950 hover:bg-opacity-75 top-0 bottom-0 left-0 right-0 w-full h-full">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <HeartIcon className="hidden group-hover:block fill-white" />
              <div className="hidden group-hover:block text-white">
                {item.likes} likes
              </div>
            </div>
          </div>
          <img
            src={`${item.photos[0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`}
          />
        </div>
      );
    });
  };

  const getUserProfileInfo = async (userId: string) => {
    const data: ProfileResponse = (await getUserProfile(userId)) || {};
    if (data) {
      setUserInfo(data);
    }
  };

  const editProfile = () => {
    navigate("/edit-profile", { state: userInfo });
  };

  React.useEffect(() => {
    if (user != null) {
      getAllPost(user.uid);
      getUserProfileInfo(user.uid);
    }
  }, []);

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Profile
          </h3>
          <div className="p-8 pb-4 border-b">
            <div className="flex flex-row item-center pb-2 mb-2">
              <div className="mr-2">
                <img
                  src={userInfo.photoURL ? userInfo.photoURL : Guest_user}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                />
              </div>
              <div>
                <div className="text-xl ml-3">
                  {userInfo.displayName ? userInfo.displayName : "Guest_user"}
                </div>
                <div className="text-xl ml-3">
                  {user?.email ? user.email : ""}
                </div>
              </div>
            </div>
            <div className="mb-4">{userInfo.userBio}</div>
            <div>
              <Button onClick={editProfile}>
                <EditIcon className="mr-2 w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </div>
          <div className="p-8">
            <h3 className="mb-5">My Posts</h3>
            <div className="">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data ? renderPost() : <div>Loading...</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
