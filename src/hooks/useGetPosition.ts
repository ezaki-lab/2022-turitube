import React, { useEffect, useState } from 'react';
import { useInterval } from './useInterval';
import { useRecoilState } from 'recoil';
import * as atom from '../common/atom';
import axios from 'axios'

// 現在地を取得します(5秒おき)
export const useGetPosition = () => {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    useInterval(() => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                setLat(pos.coords.latitude);
                setLng(pos.coords.longitude);
            }
        );
        console.log("重たいです");
    }, 5000)

    // 初期値セット
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                setLat(pos.coords.latitude);
                setLng(pos.coords.longitude);
            }
        )
    }, []);

    return {lat, lng};

};
