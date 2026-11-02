'use strict';
(()=>{const dialog=document.getElementById('handbookConventions');if(!dialog)return;let opener=null,scroll=0;
 function open(button){if(dialog.open)return;opener=button||document.activeElement;scroll=window.scrollY;dialog.showModal();document.documentElement.classList.add('hb-conventions-open');dialog.querySelector('[data-close-conventions]').focus({preventScroll:true});}
 document.addEventListener('click',e=>{const button=e.target.closest('[data-open-conventions]');if(button){e.preventDefault();open(button);}if(e.target.closest('[data-close-conventions]'))dialog.close();});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.documentElement.classList.remove('hb-conventions-open');window.scrollTo({top:scroll,behavior:'instant'});if(opener?.isConnected)opener.focus({preventScroll:true});});
 if(new URL(location.href).searchParams.get('reference')==='signs-units')open(document.getElementById('handbookSignsButton'));
})();
