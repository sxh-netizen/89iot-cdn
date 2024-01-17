const newJPlayer = (playerObj = {}) => {
    // playerObj.dom: 播放器的ID
    // player.url ：视频链接
    playerObj.width = playerObj.width || '800px'
    playerObj.height = playerObj.height || '600px'
    const config = {
        loader: {
            trackerAnnounce: ["wss://tracker.openwebtorrent.com"],       // here config the tracker url
            rtcConfig: {
                iceServers: [
                    { urls: ["stun:stun.l.google.com:19302", "stun:global.stun.twilio.com:3478"] }
                ],
                sdpSemantics: "unified-plan"
            }
        },
    };
    console.log('是否支持p2p', p2pml.hlsjs.Engine.isSupported())
    if (p2pml.hlsjs.Engine.isSupported()) {
        var engine = new p2pml.hlsjs.Engine(config);

        var player = new Clappr.Player({
            parentId: "#" + playerObj.dom,
            source: playerObj.url,
            width:playerObj.width,
            height:playerObj.height,
            mute: true,
            autoPlay: true,
            playback: {
                hlsjsConfig: {
                    liveSyncDurationCount: 7,
                    loader: engine.createLoaderClass()
                }
            }
        });

        p2pml.hlsjs.initClapprPlayer(player);
        
        engine.on("peer_connect", peer => console.log("peer_connect", peer.id, peer.remoteAddress));
        engine.on("peer_close", peerId => console.log("peer_close", peerId));
        engine.on("segment_loaded", (segment, peerId) => {
            let msg = peerId ? `peer(${peerId}) :` : "HTTP:" + segment.url;
            console.log('链接',msg);
        });
        return player
    } else {
        document.write("Not supported :(");
    }
}









// 示例
// const newPlayer = newJPlayer({
//     dom:'标签的ID  不要带#',   //必传
//     url:'视频的链接',    //必传
// })
// 其他参数
// width
// height