/*  Book/index */
import React from 'react';

// 図鑑のヘッダー
const Timeline = ({ index }) => {

    const datas = [[
        {
            time: "17:30",
            do: "釣り開始"
        },
        {
            time: "17:38",
            do: "糸を垂らす"
        },
        {
            time: "17:54",
            do: "釣り竿に反応"
        },
        {
            time: "17:56",
            do: "ゲット"
        },
        {
            time: "19:43",
            do: "釣り終了"
        }
    ]]

    return (
        <>
            <div className="flex flex-row pl-2 pt-1">
                <p className="pr-4">釣り記録</p>
                <ul className="">
                    {datas[index].map((d, index) => (
                        <li className="flex-row flex pb-2 pr-4">
                            <p>{d.time}</p>
                            <p>{d.do}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
};

export default Timeline;