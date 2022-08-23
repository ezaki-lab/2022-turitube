/* アバター描画コンポーネント*/
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Group, Rect, Circle, Image } from 'react-konva';
import { hats, hairs, faces, bodies, pantses, foots } from './avatarLoad';
import useImage from 'use-image';

interface AvatarData {
  hat: number,
  hair: number,
  face: number,
  body: number,
  pants: number,
  foot: number
}

const Avatar = ({ avatarData, size=100 }) => {

  return (
    <>
      <AvatarGroup avatarImgs={foots} size={size} avatarIndex={avatarData.foot}  />
      <AvatarGroup avatarImgs={pantses} size={size} avatarIndex={avatarData.pants} />
      <AvatarGroup avatarImgs={bodies} size={size} avatarIndex={avatarData.body} />
      <AvatarGroup avatarImgs={faces} size={size} avatarIndex={avatarData.face} />
      <AvatarGroup avatarImgs={hairs} size={size} avatarIndex={avatarData.hair} />
      <AvatarGroup avatarImgs={hats} size={size} avatarIndex={avatarData.hat} />
    </>
  );
};

const AvatarGroup = ({ avatarImgs, size, avatarIndex }) => {
  return (
    <Group>
      {avatarImgs.map((avatarImg, index) => {
        const [img] = useImage(avatarImg);
        if (avatarIndex == index) return <Image image={img} x={0} y={0} key={index} width={size} height={size*1.5} />
      })}
    </Group>
  )
}

export default Avatar;