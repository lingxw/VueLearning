// JavaScript Document
function makeFragments(fragmentsId, url, width, height){
    //生成m*n个div元素
    var m = 4
    var n = 8;
    var frags = "<table id = 'fragTable' border='0'>";
    
    for(var i = 0; i < m; i++){
        frags += "<tr>";
        for(var j = 0; j < n; j++){
            frags += "<td><div id='div"+i+j+"'></div></td>";
        }
        frags += "</tr>";
    }

    frags += "</table>";

    document.getElementById(fragmentsId).innerHTML = frags;

    addImage(url, width, height);
}

//为每个div添加背景图片
function addImage(url, width, height){
 var m = 4
 var n = 8
    
 for(var i = 0; i < m; i++){
     for(var j = 0; j < n; j++){
         var curdiv=document.getElementById("div"+i+j);
         var wid = width;
         var hgt = height;
         curdiv.style.background='url(' + url + ') no-repeat scroll';	
         curdiv.style.backgroundSize= width + 'px ' + height + 'px'
         
         curdiv.style.width=(wid/n)+"px";
         curdiv.style.height=(hgt/m)+"px";
         
         curdiv.style.backgroundPosition=getInverse(j*(wid/n))+
             "px"+' '+getInverse(i*(hgt/m))+"px";
         
     }
 }
}

//取相反数
function getInverse(num){
return (0-num);
}

export default {
  makeFragments
}