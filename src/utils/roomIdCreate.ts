// ルーム作成時にIDを作成するための関数
export const RoomIdCreate = () => {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let rand_str = '';
    for (var i = 0; i < 8; i++) {
        rand_str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return (rand_str);
};
