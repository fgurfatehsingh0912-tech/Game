class VanillaSmoother {
  constructor(options = {}) {

    this.ease = options.smooth ? (1 / (options.smooth * 30)) : 0.05;
    this.effects = options.effects || false;

    this.viewport = document.getElementById('scroll-viewport');
    this.content = document.getElementById('scroll-content');
    
    this.data = {
      current: 0,  
      target: 0,   
    };

    this.effectElements = [];
    this.init();
  }

  init() {
    this.onResize();
    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('scroll', () => this.onScroll());


    if (this.effects) {
      const elems = document.querySelectorAll('[data-speed]');
      this.effectElements = Array.from(elems).map(el => ({
        el: el,
        speed: parseFloat(el.getAttribute('data-speed')) || 1
      }));
    }

    this.render();
  }

  onResize() {

    document.body.style.height = `${this.content.getBoundingClientRect().height}px`;
  }

  onScroll() {
    this.data.target = window.scrollY;
  }

  render() {

    this.data.current += (this.data.target - this.data.current) * this.ease;
    
    const currentRounded = Math.round(this.data.current * 100) / 100;

    this.content.style.transform = `translate3d(0, -${currentRounded}px, 0)`;

    if (this.effects) {
      this.effectElements.forEach(item => {
        const movement = (this.data.current) * (1 - item.speed);
        item.el.style.transform = `translate3d(0, ${movement}px, 0)`;
      });
    }

    requestAnimationFrame(() => this.render());
  }
}


const smoother = new VanillaSmoother({
  smooth: 2, 
  effects: true 
});
