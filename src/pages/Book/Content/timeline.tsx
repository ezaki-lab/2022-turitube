/*  Book/index */
import React from 'react';

// 図鑑のヘッダー
const Timeline = ({datas, index}) => {
    return (
        <>
            <div className="flex flex-row">
                <ul className="flex flex-col w-1/2 text-right pr-5">
                    {datas[index].background.map((d, i) => (
                        <li className="py-1">{d.time}</li>
                    ))}
                </ul>

                <ul className="flex flex-col w-1/2 text-left">
                    {datas[index].background.map((d, i) => (
                        <li className="py-1 flex flex-row items-center">
                            <div className="w-4 h-4 rounded-full bg-white border-2 border-basic mr-2" />
                            <p>{d.do}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
};

export default Timeline;