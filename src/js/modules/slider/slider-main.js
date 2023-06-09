import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        this.hanson = document.querySelector('.hanson');
        
        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        try {
            this.showSlides(this.slideIndex += n);
            if (this.slideIndex === 3) {
                this.hanson.style.opacity = 0;
                setTimeout(() => {
                    this.hanson.style.opacity = 1;
                    this.hanson.classList.add("animated", "fadeInUp");
                }, 3000);
            } else {
                this.hanson.classList.remove("animated", "fadeInUp");
            }
        } catch(e) {}
    }

    bindTriggers() {
        document.querySelectorAll('.prevmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1);
            });
        });

        document.querySelectorAll('.nextmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1);
            });
        });
    }

    render() {
        if (this.container) {
            this.btns.forEach(item => {
                item.addEventListener('click', () => {
                    this.plusSlides(1);
                });
    
                item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.slideIndex = 1;
                    this.showSlides(this.slideIndex);
                });
            });
    
            this.showSlides(this.slideIndex);
            this.bindTriggers();
        }
    }
}