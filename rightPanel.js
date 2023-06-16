var boolenoptionsR = false;
const RightPanel = document.getElementById('RightPanel');
const RightSiAct =document.getElementById('RSiz');
function startR(){
    if(boolenoptionsR){
        RightPanel.classList.remove('active🔓');
        RightPanel.classList.add('active🔒');
        boolenoptionsR=0;
        RightSiAct.innerHTML = '◀';
      }else{
        RightPanel.classList.remove('active🔒');
        RightPanel.classList.add('active🔓');
        boolenoptionsR=1;
        RightSiAct.innerHTML = '▶';
      }
}