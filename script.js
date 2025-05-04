document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-timer');
    const stopBtn = document.getElementById('stop-timer');
    const targetDateInput = document.getElementById('target-date');
    const countdownDisplay = document.getElementById('countdown');
    const progressBar = document.getElementById('progress');
    
    let countdownInterval;
    let endTime;
  
    startBtn.addEventListener('click', () => {
      const targetDate = new Date(targetDateInput.value);
      if (isNaN(targetDate.getTime())) {
        alert('Please select a valid date and time');
        return;
      }
      
      endTime = targetDate.getTime();
      startBtn.disabled = true;
      stopBtn.disabled = false;
      
      updateCountdown();
      countdownInterval = setInterval(updateCountdown, 1000);
    });
  
    stopBtn.addEventListener('click', () => {
      clearInterval(countdownInterval);
      startBtn.disabled = false;
      stopBtn.disabled = true;
    });
  
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = endTime - now;
      
      if (distance <= 0) {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = "TIME'S UP!";
        progressBar.style.width = '100%';
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      countdownDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      
      // Update progress bar (example for 1 hour max duration)
      const totalDuration = 60 * 60 * 1000; // 1 hour in ms
      const progressPercent = 100 - (distance / totalDuration * 100);
      progressBar.style.width = `${Math.min(progressPercent, 100)}%`;
    }
  });