// initialize the variables
var songIndex= 0
var audioElement= new Audio("1.mp3")
var masterPlay = document.getElementById("masterplay");
var progressBar = document.getElementById("progress-bar");
var gif = document.getElementById('gif');
var songItem = Array.from (document.getElementsByClassName('song-item'))
var mastersongkey = document.getElementById('mastersongkey');
var repeat = document.getElementById('repeat');
var timeUpdater = document.getElementsByClassName("timerupdate")[0];
var durationOfSong = document.getElementsByClassName("durationofsong")[0];


let songs = [
    {songName:"Tu-Hai-Kahan",filePath:"1.mp3",coverPath:"1.jpg",duration:"04:23"},
    {songName:"Attack on Titan — The End | Linked Horizon",filePath:"2.mp3",coverPath:"2.jpg",duration:"02:34"},
    {songName:"Happier - Marshmello",filePath:"3.mp3",coverPath:"3.jpg",duration:"03:53"},
    {songName:"Dakisimerumade (Cover) - Kotoha",filePath:"4.mp3",coverPath:"4.jpg",duration:"02:36"},
    {songName:"Dzanum",filePath:"5.mp3",coverPath:"5.jpg",duration:"02:57"},
    {songName:"Shinunoga E-Wa - Fujii Kaze",filePath:"6.mp3",coverPath:"6.jpg",duration:"03:05"},
    {songName:"spiral - LONGMAN",filePath:"7.mp3",coverPath:"7.jpg",duration:"03:51"},
    {songName:"Loreen - Tattoo",filePath:"8.mp3",coverPath:"8.jpg",duration:"03:03"},
    {songName:"Way-Back-Home",filePath:"9.mp3",coverPath:"9.jpg",duration:"03:13"},
    {songName:"One-Day-I-am-Gonna-Fly-Away",filePath:"10.mp3",coverPath:"10.jpg",duration:"03:46"},

]


mastersongkey.innerText = songs[0].songName;


songItem.forEach((element,i)=>{

    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
   element.getElementsByClassName("song-name")[0].innerText = songs[i].songName;
    // element.getElementsByClassName("time-stamp")[0].innerText = songs[i].duration;
    


})

// update timer function
audioElement.addEventListener("timeupdate",()=>{
    let currentMin = "0"+Math.floor(audioElement.currentTime/60);
    let currentSec =  Math.floor(audioElement.currentTime-(currentMin*60));
          let CurrentSeconds = currentSec<10 ? "0"+currentSec:currentSec;
          timeUpdater.innerHTML = currentMin+":"+CurrentSeconds;
           
})

// Handle play and pause play

masterPlay.addEventListener("click",()=>
{ if(audioElement.paused||audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
   var classlisting = document.querySelector(".active");
   classlisting.classList.remove('fa-circle-play');
   classlisting.classList.add('fa-circle-pause');
   gif.style.opacity = 1;
   durationOfSong.innerHTML = songs[songIndex-1].duration;

}else{
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    var classlisting = document.querySelector(".active");
   classlisting.classList.remove('fa-circle-pause');
   classlisting.classList.add('fa-circle-play');
    
    gif.style.opacity = 0;
    durationOfSong.innerHTML = songs[songIndex-1].duration;
}

})
if(audioElement.paused){

    if(audioElement.currentTime>=0){ 
        
        songIndex++;
        
       
        audioElement.addEventListener('ended',()=>{
            masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            if(songIndex===0){
                songIndex = 1;
               }
         while(songIndex<=10){
             
             if(songIndex<=9){
                
            audioElement.src = songIndex+1+".mp3"
            audioElement.play();
           var songitemplay = Array.from(document.getElementsByClassName("songitemplay"));
         
           if(songIndex===0){
            songIndex = 1;
           }
           songitemplay[songIndex-1].classList.remove('fa-circle-pause');
           songitemplay[songIndex-1].classList.add('fa-circle-play');
           songitemplay[songIndex].classList.remove('fa-circle-play');
           songitemplay[songIndex].classList.add('fa-circle-pause');
            mastersongkey.innerText = songs[songIndex].songName;
            durationOfSong.innerHTML = songs[songIndex].duration;
             }else{
                 songIndex = songIndex-9
                 audioElement.src = songIndex+".mp3"
                 audioElement.play();
                 var songitemplay = Array.from(document.getElementsByClassName("songitemplay"));
           songitemplay[songIndex+8].classList.remove('fa-circle-pause');
           songitemplay[songIndex+8].classList.add('fa-circle-play');
           songitemplay[songIndex-1].classList.remove('fa-circle-play');
           songitemplay[songIndex-1].classList.add('fa-circle-pause');
                 mastersongkey.innerText = songs[songIndex-1].songName;
                 durationOfSong.innerHTML = songs[songIndex-1].duration;
                 songIndex--;
     
             }
            songIndex++;
            break;
            
     
         }
         })}
         


}
// listner to events

audioElement.addEventListener("timeupdate",()=>
{
   // update seekbar
    var progress= parseInt((audioElement.currentTime/audioElement.duration)*100)||0;
    progressBar.value = progress
    
   
})
        
progressBar.addEventListener("change",()=>{

audioElement.currentTime = progressBar.value * audioElement.duration/100;




})
repeat.addEventListener("click",()=>{

    if(audioElement.loop!= true){
document.getElementsByClassName("color-change")[0].style.color = "#36e629";
audioElement.loop = true;
// audioElement.play();


}else{
    document.getElementsByClassName("color-change")[0].style.color = "#f5faf5";
   audioElement.loop = false;
   

}


})
 
 

 var playMakerAll = ()=>{
    Array.from(document.getElementsByClassName("songitemplay")).forEach((elements)=>{
        elements.classList.remove('active');
        elements.classList.remove("fa-circle-pause");
        elements.classList.add("fa-circle-play");
        
    
 })}
 

Array.from(document.getElementsByClassName("songitemplay")).forEach((elements)=>{

    elements.addEventListener("click",(e)=>{
        playMakerAll();
        
 if(audioElement.paused||audioElement.currentTime<=0){  
           e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        e.target.classList.remove("active");
        e.target.classList.add("active");
        songIndex = parseInt(e.target.id);
        audioElement.src = songIndex+".mp3"
        audioElement.play();
        // audioElement.currentTime = 0;
        
        masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
     gif.style.opacity = 1;
     mastersongkey.innerText = songs[songIndex-1].songName;
     durationOfSong.innerHTML = songs[songIndex-1].duration;
    }else{
        
        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");
        e.target.classList.remove("active");
        e.target.classList.add("active");
        songIndex = parseInt(e.target.id);
        audioElement.src = songIndex+".mp3"
        audioElement.pause();
         masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
     gif.style.opacity = 0;
     mastersongkey.innerText = songs[songIndex-1].songName;
     durationOfSong.innerHTML = songs[songIndex-1].duration;
     
    }
    if(songIndex===1){
        songIndex = 0;
    }

})



})





if(songIndex===1){
    songIndex = 0;
}

document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex===1){
        songIndex = 2;
    }

    if(songIndex<=1){

        songIndex = 0
    }else{

        songIndex -= 1
        
        
    }
    
    audioElement.src = songIndex+".mp3";
    audioElement.play();
    audioElement.currentTime = 0;
    
    // var classlisting = document.getElementsByClassName("active")[1];
    // classlisting.classList.remove('fa-circle-play');
    // classlisting.classList.add('fa-circle-pause'); 
    masterPlay.classList.remove('fa-circle-play');
masterPlay.classList.add('fa-circle-pause');
playMakerAll();
var songitemplays = Array.from(document.getElementsByClassName("songitemplay"));
songitemplays[songIndex-1].classList.remove('fa-circle-play');
songitemplays[songIndex-1].classList.add('fa-circle-pause');

gif.style.opacity = 1;
 mastersongkey.innerText = songs[songIndex-1].songName;
 durationOfSong.innerHTML = songs[songIndex-1].duration;
 var forpause = document.getElementsByClassName("songitemplay")[songIndex-1];
 forpause.classList.remove("active");
 forpause.classList.add("active");
 
})
document.getElementById("next").addEventListener("click",()=>{
    if(songIndex===0){
        songIndex = 1;
    }

    if(songIndex>=10){

        songIndex = 0
    }else{

        songIndex += 1 
        
        
    }

    if(songIndex===0){
        songIndex = 1;
    }

    
    audioElement.src = songIndex+".mp3";
    audioElement.play();
    audioElement.currentTime = 0;
    playMakerAll();
    var songitemplays = Array.from(document.getElementsByClassName("songitemplay"));
    songitemplays[songIndex-1].classList.remove('fa-circle-play');
    songitemplays[songIndex-1].classList.add('fa-circle-pause');
    
    // var classlisting = document.getElementsByClassName("active")[0];
    // classlisting.classList.remove('fa-circle-play');
    // classlisting.classList.add('fa-circle-pause'); 
    masterPlay.classList.remove('fa-circle-play');
masterPlay.classList.add('fa-circle-pause');
gif.style.opacity = 1;
 mastersongkey.innerText = songs[songIndex-1].songName;
 durationOfSong.innerHTML = songs[songIndex-1].duration;
 var forpause = document.getElementsByClassName("songitemplay")[songIndex-1];
 forpause.classList.remove("active");
 forpause.classList.add("active");


})


window.addEventListener("keydown",(event)=>{
    
    if(event.keyCode===32){
   if(audioElement.paused){
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    var classlisting = document.getElementsByClassName("active")[0];
    classlisting.classList.remove('fa-circle-play');
    classlisting.classList.add('fa-circle-pause');
    audioElement.play();
     gif.style.opacity = 1;
     durationOfSong.innerHTML = songs[songIndex-1].duration;

   }else{
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    var classlisting = document.getElementsByClassName("active")[0];
    classlisting.classList.remove('fa-circle-pause');
    classlisting.classList.add('fa-circle-play');
    audioElement.pause();
    gif.style.opacity = 0;
    durationOfSong.innerHTML = songs[songIndex-1].duration;
   }}
})

if(songIndex===0){
    songIndex = 1;
}
window.addEventListener("keydown",(event)=>{
    if(event.keyCode===37){
        

        
    //   previous
    if(songIndex===1){
        songIndex = 2;
    }


    if(songIndex<=1){

        songIndex = 0
    }else{

        songIndex -= 1
        
        
    }
    
    
    audioElement.src = songIndex+".mp3";
    audioElement.play();
    audioElement.currentTime = 0;
    
    // var classlisting = document.getElementsByClassName("active")[1];
    // classlisting.classList.remove('fa-circle-play');
    // classlisting.classList.add('fa-circle-pause');
    playMakerAll();
    var songitemplays = Array.from(document.getElementsByClassName("songitemplay"));
    songitemplays[songIndex-1].classList.remove('fa-circle-play');
    songitemplays[songIndex-1].classList.add('fa-circle-pause'); 
    masterPlay.classList.remove('fa-circle-play');
masterPlay.classList.add('fa-circle-pause');
gif.style.opacity = 1;
 mastersongkey.innerText = songs[songIndex-1].songName;
 durationOfSong.innerHTML = songs[songIndex-1].duration;
 var forpause = document.getElementsByClassName("songitemplay")[songIndex-1];
 forpause.classList.remove("active");
 forpause.classList.add("active");
 


        
    }
})

window.addEventListener("keydown",(event)=>{
    if(event.keyCode===39){
       
         // Next
         if(songIndex===0){
            songIndex = 1;
        }
if(songIndex>=10){

    songIndex = 0
}else{

    songIndex += 1 
    
    
}
if(songIndex===0){
    songIndex = 1;
}

audioElement.src = songIndex+".mp3";
audioElement.play();
audioElement.currentTime = 0;
// var classlisting = document.getElementsByClassName("active")[0];
// classlisting.classList.remove('fa-circle-play');
// classlisting.classList.add('fa-circle-pause');
playMakerAll();
var songitemplays = Array.from(document.getElementsByClassName("songitemplay"));
songitemplays[songIndex-1].classList.remove('fa-circle-play');
songitemplays[songIndex-1].classList.add('fa-circle-pause');
masterPlay.classList.remove('fa-circle-play');
masterPlay.classList.add('fa-circle-pause');
gif.style.opacity = 1;
mastersongkey.innerText = songs[songIndex-1].songName;
durationOfSong.innerHTML = songs[songIndex-1].duration;
var forpause = document.getElementsByClassName("songitemplay")[songIndex-1];
forpause.classList.remove("active");
forpause.classList.add("active");







    }})


// <-----------------------------HomePage-------------------------->
// var sliderLeft = document.querySelector(".slider-left");
// var sliderRight= document.querySelector(".slider-right");
// var playlistRow = document.querySelector(".playlist-row");
// sliderRight.addEventListener("click",()=>{
//     console.log("1");
//     playlistRow.scrollLeft += 200; 
// })
