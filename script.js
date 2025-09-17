const canvas = document.getElementById('trailCanvas');
        const ctx = canvas.getContext('2d');
        
        // Adjust canvas size to window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Store trail segments
        const segments = [];
        const maxAge = 2000; // 2 seconds in milliseconds
        
        // Handle window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Mouse position
        let lastX = 0;
        let lastY = 0;
        
        // Mouse move event
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            // Add new segment
            segments.push({
                x1: lastX,
                y1: lastY,
                x2: x,
                y2: y,
                time: Date.now()
            });
            
            lastX = x;
            lastY = y;
        });
        
        // Animation loop
        function animate() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const currentTime = Date.now();
            
            // Filter out old segments and draw remaining ones
            segments.forEach((segment, index) => {
                const age = currentTime - segment.time;
                
                // Remove segments older than maxAge
                if (age > maxAge) {
                    segments.splice(index, 1);
                    return;
                }
                
                // Calculate opacity based on age
                const opacity = 1 - age / maxAge;
                
                // Draw glowing line
                ctx.beginPath();
                ctx.moveTo(segment.x1, segment.y1);
                ctx.lineTo(segment.x2, segment.y2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 2;
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'white';
                ctx.stroke();
            });
            
            requestAnimationFrame(animate);
        }
        
        // Start animation
        animate();

        // Add this to your script.js
document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 } // Trigger when 10% of the item is visible
  );

  timelineItems.forEach((item) => observer.observe(item));
});

// Optional: Enhance download button with JS for better UX (e.g., confirm or log)
document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.querySelector('.download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      // Optional: Add analytics or confirmation here
      console.log('CV download triggered');
    });
  }
});

console.log('Window width:', window.innerWidth);