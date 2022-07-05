import React, { useState } from 'react';
import Title from "../../components/Title";

//自分がいいねした日誌リスト
const Like = () => {
    const diary = [
        {
            "img": "https://fishingjapan.jp/cmsimg/tpc9336-10.png", //今はurl
            "title": "6月29日 13:12",
            "author": "つばえもん",
            "diary_id": "123456789",
        },
        {
            "img": "https://fishingjapan.jp/cmsimg/tpc9336-10.png", //今はurl
            "title": "タイを大量に釣ってきた！！！！よよよああああああsdfk;lsdjk;fjdsj;kfhsdjkfhsdfjdsfhdsjfkdsljfdksljfjdsjlfkdjs;hfjdksjfljsdf",
            "author": "たからーん",
            "diary_id": "123456789",
        },
        {
            "img": "https://fishingjapan.jp/cmsimg/tpc9336-10.png", //今はurl
            "title": "タイを大量に釣ってきた！！！！よよよああああああsdfk;lsdjk;fjdsj;kfhsdjkfhsdfjdsfhdsjfkdsljfdksljfjdsjlfkdjs;hfjdksjfljsdf",
            "author": "たからーん",
            "diary_id": "123456789",
        },
        {
            "img": "https://fishingjapan.jp/cmsimg/tpc9336-10.png", //今はurl
            "title": "タイを大量に釣ってきた！！！！よよよああああああsdfk;lsdjk;fjdsj;kfhsdjkfhsdfjdsfhdsjfkdsljfdksljfjdsjlfkdjs;hfjdksjfljsdf",
            "author": "たからーん",
            "diary_id": "123456789",
        },
        {
            "img": "https://fishingjapan.jp/cmsimg/tpc9336-10.png", //今はurl
            "title": "タイを大量に釣ってきた！！！！よよよああああああsdfk;lsdjk;fjdsj;kfhsdjkfhsdfjdsfhdsjfkdsljfdksljfjdsjlfkdjs;hfjdksjfljsdf",
            "author": "たからーん",
            "diary_id": "123456789",
        },
        {
            "img": "https://fishingjapan.jp/cmsimg/tpc9336-10.png", //今はurl
            "title": "タイを大量に釣ってきた！！！！よよよああああああsdfk;lsdjk;fjdsj;kfhsdjkfhsdfjdsfhdsjfkdsljfdksljfjdsjlfkdjs;hfjdksjfljsdf",
            "author": "たからーん",
            "diary_id": "123456789",
        },
        {
            "img": "https://fishingjapan.jp/cmsimg/tpc9336-10.png", //今はurl
            "title": "タイを大量に釣ってきた！！！！よよよああああああsdfk;lsdjk;fjdsj;kfhsdjkfhsdfjdsfhdsjfkdsljfdksljfjdsjlfkdjs;hfjdksjfljsdf",
            "author": "たからーん",
            "diary_id": "123456789",
        },
        {
            "img": "https://fishingjapan.jp/cmsimg/tpc9336-10.png", //今はurl
            "title": "タイを大量に釣ってきた！！！！よよよああああああsdfk;lsdjk;fjdsj;kfhsdjkfhsdfjdsfhdsjfkdsljfdksljfjdsjlfkdjs;hfjdksjfljsdf",
            "author": "たからーん",
            "diary_id": "123456789",
        },
        {
            "img": "https://fishingjapan.jp/cmsimg/tpc9336-10.png", //今はurl
            "title": "タイを大量に釣ってきた！！！！よよよああああああsdfk;lsdjk;fjdsj;kfhsdjkfhsdfjdsfhdsjfkdsljfdksljfjdsjlfkdjs;hfjdksjfljsdf",
            "author": "たからーん",
            "diary_id": "123456789",
        },
        {
            "img": "https://fishingjapan.jp/cmsimg/tpc9336-10.png", //今はurl
            "title": "タイを大量に釣ってきた！！！！よよよああああああsdfk;lsdjk;fjdsj;kfhsdjkfhsdfjdsfhdsjfkdsljfdksljfjdsjlfkdjs;hfjdksjfljsdf",
            "author": "たからーん",
            "diary_id": "123456789",
        },
    ]
    return (
        <>
            <div className="flex flex-col w-full">
                <Title title="いいねした日誌" />
                {diary.map((data, index) => {
                    return (
                        <LikeDiary key={index} img={data.img} title={data.title} author={data.author} id={data.diary_id} />
                    )
                })}
            </div>
        </>
    )
}

const LikeDiary = ({ img, title, author, id }) => {
    return (
        <div className="h-12 flex flex-row my-1 w-full pr-32">
            <img src={img} className="mx-5 h-10 aspect-ratio" />

            <div className="flex flex-col justify-between w-full h-10">
                <p className="truncate">{title}</p>
                <p className="text-xs text-gray-600">{author}</p>
            </div>
        </div>
    )
}

export default Like;