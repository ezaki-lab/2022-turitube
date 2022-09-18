import React, {useState, useEffect} from "react";
import ProgressBar from "../../ProgressBar";
import StickyNote from "../stickyNote";
import AchiveFishActiveGreen from '../../../img/icons/achive_fish_green.active.png';
import AchiveFishInactiveGreen from '../../../img/icons/achive_fish_green.inactive.png';
import { useRecoilState } from 'recoil';
import * as atom from '../../../common/atom';
import axios from "axios";

interface AchiveInfo {
  title: string,
  purpose: string,
  progress: number,
  max_progress: number,
  rewords: string[],
  rewords_text: string[],
  id: number
}

var COLOR = "sub";

// クエストボードのうち実績に分類されるもの
const Achive = ({place}) => {
  const [achives, setAchives] = useState<AchiveInfo[]>();
  const [achiveInfo, setAchiveInfo] = useState<AchiveInfo>();
  const [selectId, setSelectId] = useState<number | null>(null);
  const [userInfo] = useRecoilState(atom.user_info);
  const base_url = "https://ezaki-lab.cloud/~turitube/api/achive";
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    axios.get(base_url, {
      params: {
        user_id: userInfo.user_id
      }
    })
      .then((res) => {
        setAchives(res.data);
        setSelectId(1);
      })
  }, []);

  useEffect(() => {
    if (achives) {
      setReady(true);
    }
  }, [achives]);

  useEffect(() => {
    if (selectId) {
      achives.map((achive, index) => {
        if (selectId == achive.id) {
          setAchiveInfo(achive);
        }
      });
    }
  }, [selectId]);

  if (!ready) return (<></>)


  return (
    <div className={`h-80 flex-auto w-full flex flex-col bg-background rounded-b-lg sm:flex-row sm:h-3/5 sm:pb-6 ${place!=="achive" ? "hidden" : ""}`}>
      <AchiveInfo achiveInfo={achiveInfo} />

      <div className="h-16 flex-auto mx-3 sm:h-full my-3">
        <ul className="h-full max-h-full overflow-y-scroll flex flex-col items-center">
          {achives.map((achive, index) => (
            <button className="w-full" key={achive.id} onClick={() => setSelectId(achive.id)}>
              <AchiveSelection achive={achive} selected={achive.id == selectId} />
            </button>
          ))}
        </ul>
      </div>
    </div>
  )
}

const AchiveInfo = ({ achiveInfo }) => {
  return (
    <div className="bg-white rounded-2xl h-48 my-3 mx-3 sm:ml-3 sm:w-72 sm:h-full">
      <div className="flex justify-center">
        <h1 className={`text-${COLOR} font-bold text-xl my-1`}>{achiveInfo.title}</h1>
      </div>

      <StickyNote text="目的" color={COLOR} />
      <h1 className={`text-${COLOR} font-bold text-sm ml-4 mt-1`}>{achiveInfo.purpose}</h1>
      <div className="px-4">
        <ProgressBar value={achiveInfo.progress} max={achiveInfo.max_progress} color={COLOR} />
      </div>

      <StickyNote text="報酬" color={COLOR} />
      <div className="flex flex-row">
        {achiveInfo.rewords_text.map((reword, index) => (
          <h1 className={`text-${COLOR} font-bold text-sm ml-4 mt-1`} key={index}>{reword}</h1>
        ))}
      </div>
    </div>
  )
}


const AchiveSelection = ({ achive, selected }) => {
  return (
    <li className={`my-1 px-2 bg-${selected ? COLOR : "white"} rounded-xl w-full h-16 flex-none flex flex-row items-center`}>
      <img src={selected ? AchiveFishActiveGreen : AchiveFishInactiveGreen} className="w-7 aspect-square rounded-full" />
      <div className="flex flex-col px-1 w-20 flex-auto">
        <h3 className={`text-${selected ? "md" : "sm"} text-left font-bold text-${selected ? "white" : COLOR}`}>{achive.title}</h3>
        {!selected ?
          (<div className="w-full">
            <ProgressBar value={achive.progress} max={achive.max_progress} color={COLOR} />
          </div>) : <></>}

      </div>
    </li>
  )
}

export default Achive;