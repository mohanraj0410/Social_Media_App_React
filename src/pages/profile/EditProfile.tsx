import FileUploader from "@/components/fileUploader";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileEntry, ProfileInfo, UserProfile } from "@/types";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Guest_user from "@/assets/images/Guest_user.jpg";
import { Input } from "@/components/ui/input";
import {
  createUserProfile,
  updateUserProfile,
} from "@/repository/user.service";
import { useUserAuth } from "@/context/userAuthContext";
import { updateUserInfoOnPost } from "@/repository/post.service";

interface Props {}

const EditProfile: React.FC<Props> = (props) => {
  const { user, updateProfileInfo } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { id, userId, userBio, displayName, photoURL } = location.state;
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({
    files: [],
  });
  const [data, setData] = useState<UserProfile>({
    userId: userId,
    displayName: displayName,
    photoURL: photoURL,
    userBio: userBio,
  });
  const updateProfile = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        const response = await updateUserProfile(id, data);
        // console.log(response);
      } else {
        const response = await createUserProfile(data);
        // console.log(response);
      }
      const profileInfo: ProfileInfo = {
        user: user!,
        displayName: data.displayName,
        photoURL: data.photoURL,
      };
      updateProfileInfo(profileInfo);
      updateUserInfoOnPost(profileInfo)
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (fileEntry.files.length > 0) {
      setData({ ...data, photoURL: fileEntry.files[0].cdnUrl || "" });
    }
  }, [fileEntry]);
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Edit Profile
          </h3>
          <div className="p-8">
            <form onSubmit={updateProfile}>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="photo">
                  Photos
                </Label>
                <div className="mb-4">
                  {fileEntry.files.length > 0 ? (
                    <img
                      src={fileEntry.files[0].cdnUrl!}
                      alt="Avatar"
                      className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                    />
                  ) : (
                    <img
                      src={data.photoURL ? data.photoURL : Guest_user}
                      alt="Avatar"
                      className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                    />
                  )}
                </div>
                <FileUploader
                  fileEntry={fileEntry}
                  onChange={setFileEntry}
                  preview={false}
                />
              </div>
              <div className="flex flex-col">
                <Label className="mb-4 mt-4" htmlFor="DisplayName">
                  Display Name
                </Label>
                <Input
                  className="mb-8"
                  id="displayName"
                  placeholder="Enter your UserName"
                  value={data.displayName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setData({ ...data, displayName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="userBio">
                  Bio
                </Label>
                <Textarea
                  className="mb-8"
                  id="userBio"
                  placeholder="What's in your mind!"
                  value={data.userBio}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setData({ ...data, userBio: e.target.value })
                  }
                />
              </div>

              <Button className="mt-4 w-32 mr-8" type="submit">
                Update
              </Button>
              <Button
                variant="destructive"
                className="mt-4 w-32 mr-8"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
