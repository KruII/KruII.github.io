var boolenoptionsL = false;
const LeftPanel = document.getElementById('LeftPanel');
const LeftSiAct =document.getElementById('LSiz');
function startL(){
    if(boolenoptionsL){
        LeftPanel.classList.remove('active🔓');
        LeftPanel.classList.add('active🔒');
        boolenoptionsL=0;
        LeftSiAct.innerHTML = '▶';
      }else{
        LeftPanel.classList.remove('active🔒');
        LeftPanel.classList.add('active🔓');
        boolenoptionsL=1;
        LeftSiAct.innerHTML = '◀';
      }
}