      var DAMPING = 0.999999;
      var GRAVITY = 0.2;
      function Particle(x, y) {
        this.x = this.oldX = x;
        this.y = this.oldY = y;
      }
      Particle.prototype.integrate = function() {
        var velocity = this.getVelocity();
        this.oldX = this.x;
        this.oldY = this.y;
        this.x += velocity.x * DAMPING;
        this.y += velocity.y * DAMPING;
      };
      Particle.prototype.getVelocity = function() {
        return {
          x: this.x - this.oldX,
          y: this.y - this.oldY
        };
      };
      Particle.prototype.move = function(x, y) {
        this.x += x;
        this.y += y;
      };
      Particle.prototype.bounce = function() {
        if (this.y > height) {
          var velocity = this.getVelocity();
          this.oldY = height;
          this.y = this.oldY - velocity.y * 0.3;
        }
      };
      Particle.prototype.draw = function() {
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.oldX, this.oldY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
      };
      var display = document.getElementById('particles-lazy');
      var ctx = display.getContext('2d');
      var drops = [];
      var width = display.width = window.innerWidth;
      var height = display.height = window.innerHeight;
      ctx.globalCompositeOperation = 'overlay';
      requestAnimationFrame(frame);
      function frame() {
        requestAnimationFrame(frame);
        ctx.clearRect(0, 0, width, height);
        for (var j = 0; j < 5; j++) {
          if (drops.length < 1000) {
            var drop = new Particle(width * 0.5, height);
            drop.move(Math.random() * 4 - 2, Math.random() * -2 - 15);
            drops.push(drop);
          }
        }
        for (var i = 0; i < drops.length; i++) {
          drops[i].move(0, GRAVITY);
          drops[i].integrate();
          drops[i].bounce();
          drops[i].draw();
        }
      }



      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-50885475-1', 'playfuljs.com');
      ga('send', 'pageview');