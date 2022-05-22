var postac = document.getElementById("postac");
var przeszkoda = document.getElementById("przeszkoda");
var rekord=0;
var rekord1=0;
var wynik=0;
var wynik1=0;
var wykonaj;
function skok(){
    if(postac.classList == "animacja"){return}
    postac.classList.add("animacja");
    setTimeout(function(){
        postac.classList.remove("animacja");
    },300);
}
var checkDead = setInterval(function() {
    let postacTop = parseInt(window.getComputedStyle(postac).getPropertyValue("top"));
    let przeszkodaLeft = parseInt(window.getComputedStyle(przeszkoda).getPropertyValue("left"));
    if(przeszkodaLeft<91 && przeszkodaLeft>50 && postacTop>=150){
        wynik=0;
        przeszkoda.style.animation = "przeszkoda 1s infinite linear";
    }else{
        wynik++;
        //if(Math.floor(wynik/150)<5 ){
            if(rekord<=wynik){
                rekord++;
                rekord1=Math.floor(rekord /100);
                document.getElementById("rekord").innerHTML = rekord1 ;
                
            }
            wynik1=Math.floor(wynik/100);
            document.getElementById("wynik").innerHTML = wynik1;
        //}
        /**
        else if(100>wynik1>=5){
            przeszkoda.style.animation = "przeszkoda 1s infinite linear";
            rekord=rekord1*100;
            wynik=wynik1*100;
            if(rekord<=wynik){
                rekord++;
                rekord1=Math.floor(rekord /100);
                document.getElementById("rekord").innerHTML = rekord1 ;
                
            }
            wynik1=Math.floor(wynik/100);
            document.getElementById("wynik").innerHTML = wynik1;
        }
        else{
            przeszkoda.style.animation = "przeszkoda 0.75s infinite linear";
            rekord=rekord1*75;
            wynik=wynik1*75;
            if(rekord<=wynik){
                rekord++;
                rekord1=Math.floor(rekord /75);
                document.getElementById("rekord").innerHTML = rekord1 ;
                
            }
            wynik1=Math.floor(wynik/75);
            document.getElementById("wynik").innerHTML = wynik1;
        } */
    }
}, 10);
document.addEventListener("keydown", event => {
    if(event.key===" "){
        wykonaj=setInterval(skok, 1);
    }
});
document.addEventListener("keyup", event => {
    clearInterval(wykonaj);
});