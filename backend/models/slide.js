class SlidingWindow {
    constructor(size) {
      this.size = 10;
      this.window = [];
    }
  
    addNumber(number) {
      if (this.window.length >= this.size) {
        this.window.shift();
      }
      this.window.push(number);
    }
  
    getNumbers() {
      return this.window;
    }
  
    getAverage() {
      if (this.window.length === 0) return 0;
      const sum = this.window.reduce((acc, num) => acc + num, 0);
      return sum / this.window.length;
    }
  
    getPreviousState() {
      return this.window.slice(0, -1);
    }
  
    getCurrentState() {
      return this.window;
    }
  }
  
  module.exports = SlidingWindow;
