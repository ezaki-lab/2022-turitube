import React, { useEffect } from 'react';
import Icon from '../Icon';
import Title from '../Title';

// Icon 押したらユーザー情報が出てくる丸型のアイコンを提供
const User = ({ data, height=10 }) => {

  useEffect(() => {
    console.log(data)
  }, [data]);

  if (!data) return (<div className="h-full aspect-square object-cover rounded-full bg-white"></div>)
  return (
    <>
      <div className={`h-${height} flex flex-row`}>
        <Icon data={data} />
        <div className="h-full flex flex-col ml-1 justify-center">
          <p className="text-tcolor font-bold text-sm">{data.screen_name}</p>
          <Title title_id={data.title} scale="mini" explain={false}/>
        </div>
      </div>
    </>
  );
}

export default User;