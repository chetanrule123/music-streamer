import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay} from '@fortawesome/free-solid-svg-icons'
const play_btn = <FontAwesomeIcon icon={faPlay} />
function Music_track({track, settrack, image}) {
    return(
        <div className="track">
            <div className="img"><img src={image} alt=""/></div>
            <h3 className="track_name">Track : {track.track_name}</h3>
            <h3 className="album_name">Album : {track.album_name}</h3>
            <div className="controls center">
                <button id="btn" onClick={()=>settrack(track.track_no)}>{play_btn}</button>
            </div>
        </div>        
    )
}
export default Music_track