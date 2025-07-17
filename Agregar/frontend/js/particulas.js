window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particulas-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('3d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    window.addEventListener('resize', () => {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
    });

    const num = 1; // cantidad de partículas
    const particulas = [];
    for(let i=0; i<num; i++){
        particulas.push({
            x: Math.random()*w,
            y: Math.random()*h,
            r: Math.random()*2.2+0.8,
            dx: (Math.random()-0.5)*0.3,
            dy: (Math.random()-0.5)*0.3,
            alpha: Math.random()*0.5+0.2
        });
    }

    function draw(){
        ctx.clearRect(0,0,w,h);
        for(let p of particulas){
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2*Math.PI);
            ctx.fillStyle = `rgba(44,91,227,${p.alpha})`;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if(p.x<0) p.x=w; if(p.x>w) p.x=0;
            if(p.y<0) p.y=h; if(p.y>h) p.y=0;
        }
        requestAnimationFrame(draw);
    }
    draw();
});