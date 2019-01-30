window.onload = function() {
    let canvas = document.getElementById('confetti');

    let ctx = canvas.getContext('2d');
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    let pieces = [];
    let numberOfPieces = 100;
    let lastUpdateTime = Date.now();

    function randomColor () {
        let colors = ['#f00', '#0f0', '#00f', '#0ff', '#f0f', '#ff0'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function update () {
        let now = Date.now(),
            dt = now - lastUpdateTime;

        for (let i = pieces.length - 1; i >= 0; i--) {
            let p = pieces[i];

            if (p.y < -20) {
                pieces.splice(i, 1);
                continue;
            }

            p.y += p.gravity * dt;
            p.rotation += p.rotationSpeed * dt;
        }

        while (pieces.length < numberOfPieces) {
            pieces.push(new Piece(Math.random() * canvas.width, canvas.height + 20));
        }

        lastUpdateTime = now;

        setTimeout(update, 1);
    }

    function draw () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(function (p) {
            ctx.save();

            ctx.fillStyle = p.color;

            ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
            ctx.rotate(p.rotation);

            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

            ctx.restore();
        });

        requestAnimationFrame(draw);
    }

    function Piece (x, y) {
        this.x = x;
        this.y = y;
        this.size = (Math.random() * 0.5 + 0.75) * 15;
        this.gravity = (Math.random() * 0.5 + 0.75) * -0.2;
        this.rotation = (Math.PI * 2) * Math.random();
        this.rotationSpeed = (Math.PI * 2) * (Math.random() - 0.5) * this.gravity * 0.01;
        this.color = randomColor();
    }

    while (pieces.length < numberOfPieces) {
        pieces.push(new Piece(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    update();
    draw();

    let button = document.getElementById('reveal');
    let clipElement = document.getElementById('clip');
    button.addEventListener('click', function(e) {
        clipElement.classList.add('animate-clip');
        button.classList.add('hide-button');
    }); 
}