/*  Book/index */
import React from 'react';

// 図鑑のヘッダー
const Infomation = () => {
    const datas = [
        {
            name: "日付",
            value: "2022-05-21",
        },
        {
            name: "地点",
            value: "フェリー乗り場"
        },
        {
            name: "釣果",
            value: "2匹",
        },
        {
            name: "クエスト",
            value: "3匹釣る"
        },
        {
            name: "クエスト成果",
            value: "未達成",
        },
        {
            name: "参加したグループ",
            value: "メバル釣る隊"
        },
        {
            name: "参加した人数",
            value: "16人",
        },
        {
            name: "釣り時間",
            value: "2時間13分"
        },
    ]

    return (
        <>
            <ul className="flex flex-col pt-6 pl-2">
                {datas.map((d, i) => (
                    <li className="flex flex-row py-1" key={d.name}>
                        <p className="pr-4">{d.name}</p>
                        <p>{d.value}</p>
                    </li>
                ))}
            </ul>
        </>
    )
};

export default Infomation;