/* アバター描画コンポーネント*/
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Group, Rect, Circle, Image } from 'react-konva';
import * as img from "./avatarLoad"
import useImage from 'use-image';

const Avatar = ({ avatarData, size=100, type = "normal", face=1 }) => {
  if (type == "normal") {
    return (
      <Group width={size} height={size * 1.5} >
        <AvatarGroup avatarImgs={img.normal_body} size={size} avatarIndex={0} />
        <AvatarGroup avatarImgs={img.normal_bottoms} size={size} avatarIndex={avatarData.bottoms} />
        <AvatarGroup avatarImgs={img.normal_tops} size={size} avatarIndex={avatarData.tops} />
        <AvatarGroup avatarImgs={img.normal_hand} size={size} avatarIndex={1} /> 
        <AvatarGroup avatarImgs={img.normal_fishing_rod} size={size} avatarIndex={avatarData.fishing_rod} />
        <AvatarGroup avatarImgs={img.normal_hand} size={size} avatarIndex={0} />
        <AvatarGroup avatarImgs={img.normal_hair} size={size} avatarIndex={avatarData.hair} />
        <AvatarGroup avatarImgs={img.normal_hat} size={size} avatarIndex={avatarData.hat} />
        <AvatarGroup avatarImgs={img.normal_face} size={size} avatarIndex={face} />
      </Group>
    )
  }
  else if (type == "fished") {
    return (
      <Group width={size} height={size * 1.5} >
        <AvatarGroup avatarImgs={img.fished_hand} size={size} avatarIndex={0} />
        <AvatarGroup avatarImgs={img.fished_tops} size={size} avatarIndex={avatarData.tops} />
        <AvatarGroup avatarImgs={img.fished_fishing_rod} size={size} avatarIndex={avatarData.fishing_rod} />
        <AvatarGroup avatarImgs={img.fished_hand} size={size} avatarIndex={1} />
        <AvatarGroup avatarImgs={img.fished_tops_parts} size={size} avatarIndex={avatarData.tops} />
      </Group>
    )
  }
};

const AvatarGroup = ({ avatarImgs, size, avatarIndex }) => {
  return (
    <Group>
      {avatarImgs.map((avatarImg, index) => {
        const [img] = useImage(avatarImg);
        if (avatarIndex == index) return <Image image={img} x={0} y={0} key={index} width={size} height={size * 1.5} />
      })}
    </Group>
  )
}

export default Avatar;