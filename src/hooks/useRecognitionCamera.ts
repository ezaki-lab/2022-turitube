import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// 音声認識からカメラを模した物を作成
// 撮影した画像を保持する
export const UseRecognitionCamera = () => {
    
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    
    const [imgStrings, setImgStrings] = useState<string[]>([]);
    const [img, setImg] = useState<string>();
    const [photographFlag, setPhotographFlag] = useState<boolean>(false);

    
    if (!browserSupportsSpeechRecognition) {
        console.log("使えません");
    }
    
    // 音声認識します
    useEffect(() => {
        SpeechRecognition.startListening({ continuous: true, language: 'ja' })
        return (() => {
            console.log("a");
            SpeechRecognition.abortListening();
        })
    }, [])

    // setImgFilesにぶちこむ(後)
    useEffect(() => {
        if (img) {
            setImgStrings([...imgStrings, img]);
            setImg("");
            setPhotographFlag(false);
        }
    }, [img])

    // transcriptが「記録して」ならflagをon
    useEffect(() => {
        console.log(transcript);
        if (transcript.includes("記録して")) {
            setPhotographFlag(true);
            resetTranscript();
        }
    }, [transcript]);
    
    return { setImg, img, imgStrings, photographFlag }
};
