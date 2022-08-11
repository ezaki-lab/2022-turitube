/*  Book/index */
import React from 'react';

// 図鑑のヘッダー
const Infomation = ({ datas, index }) => {
    return (
        <>
            <div className="flex flex-col pt-6">
                <div className="flex flex-row items-center py-1">
                    <div className="rounded-full w-5 h-5 bg-basic" />
                    <p className="pl-2 text-xl">体長</p>
                    <p className="pl-4 text-xl">{datas[index].size}cm</p>
                </div>

                <div className="flex flex-row items-center py-1">
                    <div className="rounded-full w-5 h-5 bg-basic" />
                    <p className="pl-2 text-xl">地点</p>
                    <p className="pl-4 text-xl">{datas[index].position}</p>
                </div>

                <div className="flex flex-row items-center py-1">
                    <div className="rounded-full w-5 h-5 bg-basic" />
                    <p className="pl-2 text-xl">日付</p>
                    <p className="pl-4 text-xl">{datas[index].date}</p>
                </div>

                <div className="flex flex-row items-center py-1">
                    <div className="rounded-full w-5 h-5 bg-basic" />
                    <p className="pl-2 text-xl">釣るまでの記録</p>
                </div>
            </div>
        </>
    )
};

export default Infomation;