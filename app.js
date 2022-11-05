var playlist=document.querySelector('.playlist')
var Box=document.querySelector('.box')
var Cd=document.querySelector('.cd')
const heading=document.querySelector('header h2')
const cdThum=document.querySelector('.cd-thumb')
const audio=document.querySelector('#audio')
var  btnPlay=document.querySelector('.btn-play')
var Box=document.querySelector('.box')
var Progress=document.querySelector('.progress')
var btnNext=document.querySelector('.btn-next')
var btnPrev=document.querySelector('.btn-prev')
var  btnRandom=document.querySelector('.btn-random')
var btnRepeat=document.querySelector('.btn-repeat')
 const app={
        isPlaying:false,
        currentIndex:0, 
        isRandom:false,
        isRepeat:false,
    songs: [
         {
          name: "Tu Phir Se Aana",
          singer: "Raftaar x Salim Merchant x Karma",
          path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
          image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
          name: "Click Pow Get Down",
          singer: "Raftaar x Fortnite",
          path: "https://mp3.vlcmusic.com/download.php?track_id=34737&format=320",
          image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
         
        },
        {
          name: "Naachne Ka Shaunq",
          singer: "Raftaar x Brobha V",
          path:
            "https://mp3.filmysongs.in/download.php?id=Naachne Ka Shaunq Raftaar Ft Brodha V Mp3 Hindi Song Filmysongs.co.mp3",
          image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
          name: "Mantoiyat",
          singer: "Raftaar x Nawazuddin Siddiqui",
          path: "https://mp3.vlcmusic.com/download.php?track_id=14448&format=320",
          image:
            "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
          name: "Aage Chal",
          singer: "Raftaar",
          path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
          image:
            "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
          name: "Damn",
          singer: "Raftaar x kr$na",
          path:
            "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
          image:
            "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
        },
        {
          name: "Feeling You",
          singer: "Raftaar x Harjas",
          path: "https://mp3.vlcmusic.com/download.php?track_id=27145&format=320",
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
        
      ],
       render:function(){
            const htmls=this.songs.map(function(song,index){
                return `
                <div class="song ${index === app.currentIndex ? 'active' : ''}">
                <div class="thumb" style="background-image: url('${song.image}')">
          
                </div>
                <div class="playlist-body">
                  <h3 class="title">
                     ${song.name}
                  </h3>
                  <p class="author">
                   ${song.singer}
                  </p>
                </div>
                <div class="option">
                  <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>
                `
               
            })
         console.log('ducdz')
         
         playlist.innerHTML=htmls.join("");
       },
       handleEvents:function(){
          var _this=this;
          //xoay anh
        var cdThumAnimate= cdThum.animate([
            {transform:'rotate(360deg)'}
          ],{
            duration:10000,
            iterations:Infinity,
          })
        cdThumAnimate.pause()
        //phong to nho anh image
        const cdwidth=Cd.offsetWidth;
          document.onscroll =function(){
            const scrollTop=window.scrollY;
            // console.log(scrollTop)
            const newcdwidth=cdwidth - scrollTop;
            // console.log(newcdwidth)
            Cd.style.width=newcdwidth > 0 ?newcdwidth + "px":0;
            Cd.style.opacity=newcdwidth / cdwidth;
           }
         btnPlay.onclick=function(){
          if(_this.isPlaying){
          
               audio.pause();
               
         }else{
           
           audio.play();
           
         }
        }
         audio.onpause=function(){
          _this.isPlaying=false;
          Box.classList.remove('playing');
          cdThumAnimate.pause()
         }
         audio.onplay=function(){
          _this.isPlaying=true;
          Box.classList.add('playing')
          cdThumAnimate.play()
         }
         
         audio.ontimeupdate=function(){
            const ProgressPercent=Math.floor(audio.currentTime / audio.duration * 100)
          // console.log(ProgressPercent)
          // console.log('duc'+Math.floor(audio.currentTime))
          Progress.value=ProgressPercent;
          // console.log(audio.duration * 100)
         }
           Progress.onchange=function(e){
            const seektime=audio.duration / 100 * e.target.value;
            audio.currentTime=seektime;
              console.log(seektime)
           }
           btnNext.onclick=function(){
            if(_this.isRandom){
              _this.playRandomSong()
            }else{
              _this.nextSong();
            }
                
                audio.play();
                _this.render();
           }
           btnPrev.onclick=function(){
            if(_this.isRandom){
              _this.playRandomSong()
            }else{
              _this.btnPrevSong();
            }
            
             audio.play();
             _this.render();
           }
           btnRandom.onclick=function(){
            _this.isRandom=!_this.isRandom;
            btnRandom.classList.toggle('active',_this.isRandom)
             
            }
            //lap lai bai hat
            btnRepeat.onclick=function(){
              _this.isRepeat=!_this.isRepeat;
              btnRepeat.classList.toggle('active')
            }
            //chuyen bai hat
          audio.onended=function(){
            if(_this.isRepeat){
                audio.play()
            }else{
              btnNext.click();
            }
            
           }
        },
       defineProperties:function(){
            Object.defineProperty(this,'currentSong',{
              get:function(){
                return this.songs[this.currentIndex]
              }
            })
       },
      //  getCurrentSong:function(){
      //      return this.songs[this.currentIndex]
      //  },
       loadCurrentSong:function(){
          
           heading.textContent=this.currentSong.name;
           cdThum.style.backgroundImage=`url('${this.currentSong.image}')` ;
           audio.src=this.currentSong.path;
            
       },
       
       nextSong:function(){
         this.currentIndex++;
         if(this.currentIndex >= this.songs.length){
          this.currentIndex=0;
         }
         this.loadCurrentSong();
       },
       btnPrevSong:function(){
        this.currentIndex--;
        if(this.currentIndex <= 0){
          this.currentIndex = this.songs.length-1;
        }
        this.loadCurrentSong();
       },
       
       playRandomSong:function(){
         var newIndex;
          do{
            newIndex=Math.floor(Math.random() * app.songs.length)
         }while(newIndex == app.currentIndex){
          this.currentIndex=newIndex;
          this.loadCurrentSong();
             console.log(this.currentIndex) 
         }
       },
        
      stant:function(){
        this.render();
        this.handleEvents();
        this.defineProperties();
        this.loadCurrentSong();
        // this.playRandomSong();
      }
}
    app.stant();
    
         