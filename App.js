
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


// Render
// Scroll
// Add Audio / update Title
// Play / Pause / Seek 
// 

const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const heading = $('header h2')
const audio = $('#audio')
const cdThumb = $('.cd-thumb')
const progressInput = $('input#progress')
const btnNext = $('.btn-next')
const btnPrev = $('.btn-prev')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')
let isPlaying = false,
    isRandom = false,
    isRepeat = false,
    progress = 0
const App = {
    currentIndex: 0,
    songs : [
        {
            title:'Jesus in LA',
            singer:'Alec Benjamin',
            imgUrl:'./Images/Alec Benjamin - Jesus in LA.jpg',
            audioSrc:'./Audio/Alec Benjamin - Jesus in LA [Official Music Video].mp3'
        },
        {
            title:'An thần',
            singer:'Low-G & Thắng',
            imgUrl:'./Images/An thần - Low - G & Thắng.jpg',
            audioSrc:'./Audio/An Thần (ft. Thắng) - Low G - Rap Nhà Làm.mp3'
        },

        {
            title:'Cưới em',
            singer:'Bray',
            imgUrl:'./Images/Cưới em - Bray.jpg',
            audioSrc:'./Audio/B RAY - CƯỚI EM [ OFFICIAL MV ].mp3'
        },
        {
            title:'Càng cua',
            singer:'Low-G',
            imgUrl:'./Images/Càng cua - Low-G.jpg',
            audioSrc:'./Audio/Càng Cua - Low G x Last Fire Crew - Nhà Hóa Học Đống Đa.mp3'
        },
        {
            title:'Gieo quẻ',
            singer:'Hoàng Thùy Linh',
            imgUrl:'./Images/Gieo Quẻ - Hoàng Thùy Linh.jpg',
            audioSrc:'./Audio/Hoàng Thuỳ Linh & ĐEN - Gieo Quẻ (Casting Coins) - Official Music Video.mp3'
        },
        {
            title:'Enemy',
            singer:'Imagine Dragons & J.I.D',
            imgUrl:'./Images/Imagine Dragons x J.I.D - Enemy.jpg',
            audioSrc:'./Audio/Imagine Dragons x J.I.D - Enemy (from the series Arcane League of Legends).mp3'
        },
        {
            title:'Wrong',
            singer:'Luh Kel',
            imgUrl:'./Images/Luh Kel - Wrong.jpg',
            audioSrc:'./Audio/Luh Kel - Wrong (Official Music Video).mp3'
        },
        {
            title:'Dại Kher',
            singer:'Sony Tran & Tage & Blacka',
            imgUrl:'./Images/Dại Kher - Sony Tran x Tage x Blacka.jpg',
            audioSrc:'./Audio/Sony Tran - Dại Kher ft. Tage & Blacka - Official Animation Video.mp3'
        },
        {
            title:'Freaky Squad',
            singer:'SpaceSpeakers',
            imgUrl:'./Images/SpaceSpeakers - Freaky Squad.jpg',
            audioSrc:'./Audio/SpaceSpeakers - Freaky Squad (Official Music Video).mp3'
        },
        {
            title:'Gặp may',
            singer:'Wren Even',
            imgUrl:'./Images/Gặp may - Wren Even.jpg',
            audioSrc:'./Audio/WREN EVANS - GẶP MAY (OFFICIAL MUSIC VIDEO).mp3'
        }
    ],
    defineProperties: function () {
        Object.defineProperty(this, 'currentThisSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvent: function() {

        // Xử lý Scroll
        const cdWidth = cd.offsetWidth
        window.onscroll = function () {
            const scroll = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scroll
            cd.style.width =  newCdWidth > 0
                ? newCdWidth +'px'
                : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Play Pause
        playBtn.onclick = () => {
            if(isPlaying) {
                audio.pause()
            }else {
                audio.play()
            }
        }
        audio.onplay = () => {
            isPlaying = true
            $('.player').classList.add('playing')
            cdRoate.play()
        }
        audio.onpause = () => {
            isPlaying = false
            $('.player').classList.remove('playing')
            cdRoate.pause()
        }

        // Check Audio Volume
      

        //Progress && Seek
        audio.ontimeupdate = () => {
            if(audio.duration) {
                const progress = audio.currentTime / audio.duration * 100
                progressInput.value = progress.toFixed(4)
            }
        }
        progressInput.oninput = e => {
            if(audio.duration > 0) {
                const seekTime = e.target.value * audio.duration / 100 
                audio.currentTime = seekTime.toFixed(4)
            }
            
        }

        
        // Xoay cd
        const cdRoate = cdThumb.animate([
            {transform: 'rotate(0deg)'},
            {transform: 'rotate(359deg)'}
        ],
        {
                duration: 40000,
                iterations: Infinity
        })
        cdRoate.pause()

        // Next && Prev song
        btnNext.onclick = () => {
            if(isRandom) {
                this.randomThisSong()
            }else {
                this.nextThisSong()
            }
            audio.play()
            this.render()
            this.scrollToThisSong()
        }
        btnPrev.onclick = () => {
            if(isRandom) {
                this.randomThisSong()
            }else {
                this.prevThisSong()
            }
            audio.play()
            this.render()
            this.scrollToThisSong()
        } 

        // Random Song
        btnRandom.onclick = () => {
            isRandom = !isRandom
            btnRandom.classList.toggle('active',isRandom)
        }
        // Khi End Song
        audio.onended = () => {
            if(isRepeat) {
                this.repeatThisSong()
            }else if(isRandom) {
                this.randomThisSong()
            }else {
                this.nextThisSong()
            }
            audio.play()
            this.render()
            this.scrollToThisSong()
        }
        // Repeat Song
        btnRepeat.onclick = () => {
            isRepeat = !isRepeat
            btnRepeat.classList.toggle('active', isRepeat)
        }
    },
    randomThisSong: function () {
        let newIndex
        do{
            newIndex = Math.floor(Math.random()*this.songs.length)
        }while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    repeatThisSong: function () {
        audio.play()
    },
    nextThisSong: function () {
        if(this.currentIndex < this.songs.length -1) {
            this.currentIndex ++ 
        }
        this.loadCurrentSong()
        
    },
    prevThisSong: function () {
        if(this.currentIndex >= 1 ) {
            this.currentIndex--
        }
        this.loadCurrentSong()
    },
    chooseThisSong: function () {
        $('.playlist').onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')) {
                // Click song để play song đó'
                if(songNode) {
                    App.currentIndex = Number(songNode.dataset.index)
                    App.loadCurrentSong()
                    App.render()
                    audio.play()
                }
                // Options
                if(e.target.closest('.option')) {
                    // Not Done
                }
            }
        }
    },
    scrollToThisSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }, 300)
    },
    loadCurrentSong: function () {
            heading.innerHTML = this.currentThisSong.title
            cdThumb.style.backgroundImage = `url('${this.currentThisSong.imgUrl}')`
            audio.src = this.currentThisSong.audioSrc
    },
    render: function () {
        var output = this.songs.map( (song, index) => {
            return `<div class="song ${this.currentIndex === index ? 'active':''}" data-index='${index}'>
                        <div class="thumb" style="background-image: url('${song.imgUrl}')"></div>
                        <div class="body">
                        <h3 class="title">${song.title}</h3>
                        <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>`

        })
        $('.playlist').innerHTML = output.join('')
    },
    start: function () {
        this.defineProperties()
        this.handleEvent()
        this.loadCurrentSong()
        this.render()
        //check

        this.chooseThisSong()
        this.scrollToThisSong()
    }

}
App.start()
