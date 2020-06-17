import React, { useState, useEffect} from 'react'
import loading from '../images/loading.svg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faPause, faChevronCircleRight, faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons'

const play_btn = <FontAwesomeIcon icon={faPlay} />
const pause_btn = <FontAwesomeIcon icon={faPause} />
const next_btn = <FontAwesomeIcon icon={faChevronCircleRight} />
const prev_btn = <FontAwesomeIcon icon={faChevronCircleLeft} />

function Player({track, next, prev, play, song, image}) {
    const [btn, setBtn] = useState(play_btn)
    const [duration, setduration] = useState("0:00")    
    const [song_state, setSong_state] = useState(song.state())
    function convert(seconds) {
        let sec = Math.floor(seconds % 60);
        let min = Math.floor(seconds / 60);
        sec = (sec < 10) ? "0" + sec : sec;
        // min = (min < 10) ? "0" + min : min;
        let time = min + ":" + sec;
        return time;
    }    
    useEffect(()=>{
        var current_time = document.getElementById("current_time")
        var slider_con = document.getElementById("slider_con")
        var slide = document.getElementById("slide")
        var nob = document.getElementById("nob")
        var sliding = document.getElementById("sliding")
        nob.style.left=0 
        sliding.style.width=0           
        current_time.innerHTML="0:00"
        setduration("0:00")
        setSong_state(song.state())
        song.on('load',()=>{setduration(convert(song.duration()));setSong_state(song.state())})
        song.on('play',()=>{setduration(convert(song.duration()));setBtn(pause_btn)})
        song.on('pause',()=>{setBtn(play_btn)})
        setInterval(() => {      
            if (song.playing()) {
                current_time.innerHTML=convert(song.seek())
                let pos = song.seek()*100 / song.duration()
                sliding.style.width = pos+"%"                                           
                nob.style.left =pos+"%"            
            }
        }, 500);                
        slider_con.addEventListener("mouseup",update)
        function update(e) {                       
            var parentPosition = getPosition(e.currentTarget);
            let width = e.clientX-parentPosition.x
            nob.style.left = width+"px"
            sliding.style.width= width+"px"  
            song.seek((width*song.duration())/slide.clientWidth)           
        }
        function getPosition(el) {
            var xPos = 0;
            var yPos = 0;
           
            while (el) {
              if (el.tagName === "BODY") {
                // deal with browser quirks with body/window/document and page scroll
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;
           
                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
              } else {
                // for all other non-BODY elements
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
              }
           
              el = el.offsetParent;
            }
            return {
              x: xPos,
              y: yPos
            };
        }
    },[song])
 
    return(
        <div className="player">
            <img src={image} alt=""/>
            <h2 className="center">Track : {track.track_name}</h2>
            <h3 className="center">Album : {track.album_name}</h3>
            <div className="player_controls center">
                <button onClick={()=>prev()}>{prev_btn}</button>
                <button className="center" onClick={()=>play()} id="play_con"> 
                    {
                            song_state==="loading"?                        
                            ( <img src={loading} alt=""/> ):
                            ( btn )   
                    }                                          
                </button>
                <button onClick={()=>next()}>{next_btn}</button>
            </div>
            <div className="timer">                
                <h2 id="time"><span id="current_time">0:00</span> | {duration}</h2>
            </div>
            <div className="slider_con center" id="slider_con">
                <div className="slider center">
                     <div className="slide" id="slide"></div>
                     <div className="sliding" id="sliding"></div>
                     <div className="nob" id="nob"></div>
                </div>
            </div>
        </div>
    )
}
export default Player