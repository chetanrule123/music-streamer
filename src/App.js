import React,{useState, useEffect} from 'react';
import Header from './components/header'
import MusicTrack from './components/music_track'
import Player from './components/player'
import './App.css';

import images from './components/images'

import {Howl} from 'howler'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faListAlt, faCompactDisc, faExclamationCircle, faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons'

const AIM_playlist = [
  {
    track_no : 1,
    track_name : "Light Up",
    album_name : "A . I . M",    
  },
  {
    track_no : 2,
    track_name : "Celebration",
    album_name : "A . I . M",    
  },
  {
    track_no : 3,
    track_name : "Struggle",
    album_name : "A . I . M",    
  },
  {
    track_no : 4,
    track_name : "Together",
    album_name : "A . I . M",    
  }
]
const ALT_playlist = [
  {
    track_no : 1,
    track_name : "ALT-1",
    album_name : "A . L . T"
  },
  {
    track_no : 2,
    track_name : "ALT-2",
    album_name : "A . L . T"
  },
  {
    track_no : 3,
    track_name : "ALT-3",
    album_name : "A . L . T"
  }
]
var alb = "aim"
var play_false = true
var btn_w = true
var caution_toggle = true

function App() {
  const [playlist, setPlaylist] = useState(AIM_playlist)
  const [track_no, setTrack_no] = useState(1) 
  const [alb_img , setalb_img] = useState(images[alb+"_main"])
  const [alb_track_img , setalb_track_img] = useState(images[alb+"_track"])

  useEffect(()=>{
    const alb_btn = document.getElementById("alb_btn")
    const albums_display = document.getElementById("albums_display") 
    const tracks_btn = document.getElementById("tracks_btn")
    const tracks_display = document.getElementById("tracks_display") 
    const caution = document.getElementById("caution")
    const caution_btn_con = document.getElementById("caution_btn_con")
    alb_btn.addEventListener('click',()=>{
      if (btn_w) {
        tracks_btn.style.display="none"
        albums_display.style.left="0"        
        btn_w = false
      }
      else{        
        albums_display.style.left="-100%"
        btn_w = true
        tracks_btn.style.display="flex"
      }   
    })
    tracks_btn.addEventListener('click',()=>{
      if (btn_w) {
        alb_btn.style.display="none"
        tracks_display.style.right="0"
        btn_w = false
      }
      else{        
        tracks_display.style.right="-100%"
        btn_w = true
        alb_btn.style.display="flex"
      }   
    })
    caution_btn_con.addEventListener('click',()=>{
      if (caution_toggle) {
        let height = caution.clientHeight+2
        caution.style.bottom=-height+"px"
        caution_toggle = false
      } else {
        caution.style.bottom="0"
        caution_toggle = true
      }
    })
    setTimeout(()=>{
      let height = caution.clientHeight+2
      caution.style.bottom=-height+"px"
      caution_toggle = false
    },7000)
  },[])

  const song = new Howl({
    src : require('./audio/'+alb+'/'+track_no+'.mp3'), 
    onend : ()=>{next()}
  })  

  song.once('load',()=>{
    if (play_false) {
      play_false = false
    }
    else{
      song.play()
    }
  })

  useEffect(()=>{
    if (song.state()==="loaded") {
      song.play()
    }
  },[song])

  function settrack(track_num){
    if (track_no!==track_num) {
      if (song.state()==="loading") {
        song.unload()
      }
      song.stop()
      setTrack_no(track_num)  
    }
  }
  function next() {
    if (song.state()==="loading") {
      song.unload()
    }
    song.stop()
    let track_num = track_no
    if (track_num===playlist.length) {
      track_num = 1
    }
    else{
      track_num+=1
    }
    setTrack_no(track_num)
  }
  function prev() {
    if (song.state()==="loading") {
      song.unload()
    }
    song.stop()
    let track_num = track_no
    if (track_num===1) {
      track_num = playlist.length
    }
    else{
      track_num-=1
    }   
    setTrack_no(track_num)
  }
  function play() {
    if (!song.playing()) {
      song.play()
    }
    else{
      song.pause()
    }
  }

  const tracks = playlist.map(track=>{
    return(
      <MusicTrack key={track.track_no} track={track} settrack={settrack} image={alb_track_img}/>
    )
  }) 
 
  const playlist_icon = <FontAwesomeIcon icon={faListAlt} />
  const album_cd_icon = <FontAwesomeIcon icon={faCompactDisc} />
  const note = <FontAwesomeIcon icon={faExclamationCircle} />
  const external_link = <FontAwesomeIcon icon={faExternalLinkAlt} />

  return (
    <div className="App">
      <div className="albums_display" id="albums_display">        
        <h2>ARTIST ALBUMS</h2>
        <div className="albums center">
          <button onClick={()=> {    
            if (alb!=="alt") {  
              if (song.state()==="loading") {
                song.unload()
              }
              song.stop()                        
              alb="alt"; 
              setalb_img(images[alb+"_main"])
              setalb_track_img(images[alb+"_track"])
              setTrack_no(1); 
              setPlaylist(ALT_playlist)
              }
            }}>A . L . T</button>
          <button onClick={()=> {
            if (alb!=="aim") { 
              if (song.state()==="loading") {
                song.unload()
              }                            
              song.stop()                        
              alb="aim"; 
              setalb_img(images[alb+"_main"])
              setalb_track_img(images[alb+"_track"])
              setTrack_no(1); 
              setPlaylist(AIM_playlist)
              }
            }}>A . I . M</button>
        </div>
      </div>           
      <div className="player_con" id="player_con">
        <Header/>
        <Player track={playlist[track_no-1]} next={next} prev={prev} play={play} song={song} image={alb_img}/>
      </div>
      <div className="tracks_display" id="tracks_display">
        <h2>ALBUM PLAYLIST</h2>  
        {tracks}      
      </div>      
      <span className="special_btns center" id="alb_btn">{album_cd_icon}</span> 
      <span className="special_btns center" id="tracks_btn">{playlist_icon}</span>
      <div className="caution" id="caution">
        <div className="center" id="caution_btn_con">
          <div className="caution_btn center">{note}</div>
        </div>
        <h3>SPECS</h3>
        <p style={{fontWeight:"600",color:"rgb(253, 28, 197)"}}>1. Used Howler.js.</p>  
        <p><span style={{fontWeight:"600",color:"rgb(253, 28, 197)"}}>2. One time loading</span> (once the song is loaded, it is stored as cache. Next time you play the song, it playes directly without loading.)</p>      
        <h3>For best experience</h3>        
        <p style={{fontWeight:"600",color:"rgb(253, 28, 197)"}}>1. Use Headphones / Earphones.</p>   
        <p><span style={{fontWeight:"600",color:"rgb(253, 28, 197)"}}>2. Make sure you have good internet access</span> (&gt;1MBPS, for loading audio files).</p>    
        <h3>Support</h3>
        <p>The app is still under development. If found any issues with the app, feel free to mail us.</p>
          <p><a href="mailto:chetanrule123@gmail.com">music-streamer-support {external_link}</a></p>
      </div>
    </div>
  );
}

export default App;
