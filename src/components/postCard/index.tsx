import { useUserAuth } from "@/context/userAuthContext";
import { DocumentResponse } from "@/types";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import image7 from "@/assets/images/image7.jpg";
import { HeartIcon, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateLikesPostData } from "@/repository/post.service";

interface IPostCardProps {
  data: DocumentResponse;
}

interface likesInfo {
  like: number;
  isLike: boolean;
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data }) => {
  const { user } = useUserAuth();
  const [likesInfo, setLikesInfo] = useState<likesInfo>({
    like: data.likes,
    isLike: data.userlikes.includes(user?.uid) ? true : false,
  });

  // console.log(data);

  const updateLike = async (isVal: boolean) => {
    setLikesInfo({
      like: isVal ? likesInfo.like + 1 : likesInfo.like - 1,
      isLike: !likesInfo.isLike,
    });
    if (isVal) {
      data.userlikes.push(user!.uid);
    } else {
      data.userlikes?.splice(data.userlikes.indexOf(user!.uid), 1);
    }
    await updateLikesPostData(
      data.id!,
      data.userlikes!,
      isVal ? likesInfo.like + 1 : likesInfo.like - 1
    );
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-col p-3">
        <CardTitle className="text-sm text-center flex justify-start items-start">
          <span className="mr-2">
            <img
              src={data.photoURL}
              className="h-10 w-10 rounded-full border-2 border-slate-800 object-cover"
            />
          </span>
          <span className="">{data.userName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <img src={data.photos ? data.photos[0].cdnUrl : ""} />
      </CardContent>
      <CardFooter className="flex flex-col p-3">
        <div className="flex justify-between w-full mb-3">
          <HeartIcon
            className={cn(
              "mr-3",
              "cursor-pointer",
              likesInfo.isLike ? "fill-red-500" : "fill-none"
            )}
            onClick={() => updateLike(!likesInfo.isLike)}
          />
          <MessageCircle className="mr-3" />
        </div>
        <div className="w-full text-sm">{likesInfo.like} Likes</div>
        <div className="w-full text-sm">
          <span>{data.userName} : </span>
          {data.caption}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
