let pos = {x:0,y:0};
let colorDot;

for(let li of s_li){
    const liDiv = li.querySelector('.work_title');
    liDiv.addEventListener('mouseenter',on_colorDot);
    li.addEventListener('mouseleave',off_colorDot);
}

function on_colorDot(e){
    e = e || window.event;
    pos.x = e.offsetX;
    pos.y = e.offsetY;
    colorDot = this.previousElementSibling;
    colorDot.style.transform = `
        translate(${pos.x}px, ${pos.y}px) scale(100)
    `;
}

function off_colorDot(e){
    e = e || window.event;
    pos.x = e.offsetX;
    pos.y = e.offsetY;
    colorDot.style.transform = `
        translate(${pos.x}px, ${pos.y}px) scale(.1)
    `;
}