/*  Room */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSocketIo from '../../hooks/useSocketIo';
import Chat from './chat';
import Stream from './stream';
import Send from './send';
import Shrink from '../../img/icons/shrink.png';
import Mic from '../../img/icons/mic.active.png';
import MicInactive from '../../img/icons/mic.inactive.png';

// ちゃっとのてすと
const Room = () => {
	const [ready, setReady] = useState<boolean>(false);
	const [mic, setMic] = useState<boolean>(false); // trueならマイクオン
	const { room_id } = useParams();
	const socket = useSocketIo('chat');

	useEffect(() => {
		if (socket) {
			// 接続できたら
			socket.on('connect', async () => {
				// roomに参加
				socket.emit("join", { "room_id": room_id, });
				setReady(true);
			})
		}
	}, [socket]);

	const MuteSwitch = () => {
		setMic(mic ? false : true);
		console.log(mic)
	};

	if (!ready) {
		return (<></>)
	}
	else {
		return (
			<>
				<div className="flex flex-col w-full h-screen">

					<div className="w-full h-16 fixed top-0 mt-2 flex flex-row justify-end items-center p-2 z-50 bg-opacity-50">
						<button className="aspect-square h-full mr-2 flex items-center justify-center">
							<img src={Shrink} className="h-full object-cover" />
						</button>
					</div>



					<div className="flex-grow">
						<Stream />
					</div>


					<div className="flex flex-col fixed h-full w-full pt-20 z-51">
						<div className="flex-grow flex flex-row pb-4">
							<div className="flex-grow" />
							<div className="w-64 lg:w-96 h-full flex flex-col">
								<div className="flex-grow" />
								<Chat socket={socket} />
							</div>
						</div>

						<div className="h-16 w-full flex flex-row px-8 pb-4">
							<div className="flex-grow mx-2 self-end">
								<Send socket={socket} />
							</div>

							<div className="mutebutton w-20 h-full">
								<button className="aspect-square h-full flex items-center justify-center rounded-full bg-white bg-opacity-50" onClick={MuteSwitch}>
									<img src={mic ? Mic : MicInactive} className="h-full object-cover rounded-full h-5/6 w-5/6" />
								</button>
							</div>

						</div>
					</div>


				</div>
			</>
		);
	}
};

export default Room;