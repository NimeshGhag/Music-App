let mini = document.querySelector(".mini-player")

export function updateMini(song){
    mini.classList.remove('hide');
   if(window.innerWidth <=768){
    mini.style.backgroundColor = song.bgColor
   }else{
    mini.style.backgroundColor = '#18181C'
   }
}
