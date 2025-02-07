import AgoraRTC from "agora-rtc-sdk-ng";
import useUserData from "../../plugin/useUserData";
import apiInstance from "../../utils/axios";
// AgoraRTC.setLogLevel(AgoraRTC.LOG_LEVEL.NONE);
AgoraRTC.setLogLevel(4);
const APP_ID = "1be2678b4f7b4c34831b89781a29ef2f";
const CHANNEL = sessionStorage.getItem('room')  
const TOKEN = sessionStorage.getItem('token') 
let UID = sessionStorage.getItem('UID')
let NAME = sessionStorage.getItem('name')

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8"});

let localTracks = [];
let remoteUsers = {};

const fullname = useUserData()?.full_name;


let joinAndDisplayLocalStream = async () => {

    // document.getElementById('room-name').innerText = CHANNEL

    client.on('user-published', handleUserJoined)
    client.on('user-left', handleUserLeft)

    try{
        await client.join(APP_ID, CHANNEL, TOKEN, UID)
    }catch(error){
        console.error(error)
        
    }

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

    let member = await createMember()

    let player = `<div id="user-container-${UID}" class="video-container" style="display: flex; align-items: center; justify-content: center; background-color: #4a5568; color: #cbd5e0; min-height: 450px; width: 100%; max-width: 550px; margin: 16px auto; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 2px; position: relative;">
                    <div id="user-${UID}" class="video-player" style="width: 540px; height: 445px; background-color: #2d3748; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; border-radius: 5px">
                        <div class="username-wrapper" style="position: absolute; top: 10px; left: 10px; z-index:9; background-color: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px; font-size: 14px">
                            <span class="user-name" style="color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 500; font-size: 1rem;">
                            ${member.name}
                            </span>
                        </div>
                    </div>
                </div>`;

    document.getElementById("video-streams").insertAdjacentHTML("beforeend", player);

    localTracks[1].play(`user-${UID}`);
    
    await client.publish([localTracks[0], localTracks[1]]);
};


let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user
    await client.subscribe(user, mediaType)

    if (mediaType === 'video'){
        let player = document.getElementById(`user-container-${user.uid}`)
        if (player != null){
            player.remove()
        }

        let member = await getMember(user)

        player = `<div id="user-container-${user.uid}" class="video-container" style="display: flex; align-items: center; justify-content: center; background-color: #4a5568; color: #cbd5e0; min-height: 450px; width: 100%; max-width: 550px; margin: 16px auto; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 2px; position: relative;">
                    <div id="user-${user.uid}" class="video-player" style="width: 540px; height: 440px; background-color: #2d3748; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">
                        <div class="username-wrapper" style="position: absolute; top: 10px; left: 10px; z-index:9; background-color: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px; font-size: 14px">
                            <span class="user-name" style="color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 500; font-size: 1rem;">
                                ${member.name}
                            </span>
                        </div>
                    </div>
                </div>`;

        document.getElementById("video-streams").insertAdjacentHTML("beforeend", player);

        user.videoTrack.play(`user-${user.uid}`)
    }

    if (mediaType === 'audio'){
        user.audioTrack.play()
    }
}


let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}


let leaveAndRemoveLocalStream = async () => {
    for (let i=0; localTracks.length > i; i++){
        localTracks[i].stop()
        localTracks[i].close()
    }
    
    await client.leave()
    deleteMember()
    window.open('/vc-lobby', '_self')
}


let toggleCamera = async (e) => {
    console.log('TOGGLE CAMERA TRIGGERED')
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.src = 'https://cdn-icons-png.flaticon.com/128/8408/8408021.png'
        
    }else{
        await localTracks[1].setMuted(true)
        // e.target.style.backgroundColor = 'rgb(255, 80, 80, 1)'
        e.target.src = 'https://cdn-icons-png.flaticon.com/128/6514/6514566.png'
    }
}


let toggleMic = async (e) => {
    console.log('TOGGLE MIC TRIGGERED')
    if(localTracks[0].muted){
        await localTracks[0].setMuted(false)
        e.target.src = 'https://cdn-icons-png.flaticon.com/128/10347/10347481.png'
    }else{
        await localTracks[0].setMuted(true)
        e.target.src = 'https://cdn-icons-png.flaticon.com/128/16322/16322693.png'
    }
}


const createMember = async () => {
    try {
        let response = await apiInstance.post(`create_member/`, {
            name: NAME,
            room_name: CHANNEL,
            uid: UID  // Ensure this matches the field name in your Django model
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 201) {  // 201 is the status code for successful creation
            throw new Error(`Error: ${response.statusText}`);
        }

        let member = response.data;
        return member;
    } catch (error) {
        console.error("Failed to create member:", error);
    }
};


const getMember = async (user) => {
    try {
        let response = await apiInstance.get(`get_member/`, {
            params: {
                UID: user.uid,
                room_name: CHANNEL  
            }
        });

        let member = response.data;
        return member;
    } catch (error) {
        console.error("Failed to retrieve member:", error);
    }
};


let deleteMember = async () => {
    console.log('Name:', NAME);
    console.log('Room Name:', CHANNEL);
    console.log('UID:', UID);

    try {
        const response = await apiInstance.post('/delete_member/', {
            name: NAME,
            room_name: CHANNEL,
            UID: UID
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 204) { 
            console.log('Member deleted');
        } else {
            console.log(response.data.message);
        }
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.error);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error:', error.message);
        }
    }
};


joinAndDisplayLocalStream();

window.addEventListener("beforeunload",deleteMember);


export { APP_ID, CHANNEL, TOKEN, UID, leaveAndRemoveLocalStream, toggleCamera, toggleMic, joinAndDisplayLocalStream };
