var DAMPING = 0.999;
      function Particle(x, y) {
        this.x = this.oldX = x;
        this.y = this.oldY = y;
      }
      Particle.prototype.integrate = function() {
        var velocityX = (this.x - this.oldX) * DAMPING;
        var velocityY = (this.y - this.oldY) * DAMPING;
        this.oldX = this.x;
        this.oldY = this.y;
        this.x += velocityX;
        this.y += velocityY;
      };
      Particle.prototype.attract = function(x, y) {
        var dx = x - this.x;
        var dy = y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        this.x += dx / distance;
        this.y += dy / distance;
      };
      Particle.prototype.draw = function() {
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.oldX, this.oldY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
      };
      var display = document.getElementById('particles-easy');
      var ctx = display.getContext('2d');
      var particles = [];
      var width = display.width = window.innerWidth;
      var height = display.height = window.innerHeight;
      var mouse = { x: width * 0.5, y: height * 0.5 };
      for (var i = 0; i < 200; i++) {
        particles[i] = new Particle(Math.random() * width, Math.random() * height);
      }
      display.addEventListener('mousemove', onMousemove);
      function onMousemove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
      requestAnimationFrame(frame);
      function frame() {
        requestAnimationFrame(frame);
        ctx.clearRect(0, 0, width, height);
        for (var i = 0; i < particles.length; i++) {
          particles[i].attract(mouse.x, mouse.y);
          particles[i].integrate();
          particles[i].draw();
        }
      }
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-50885475-1', 'playfuljs.com');
      ga('send', 'pageview');