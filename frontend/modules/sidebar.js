const mainHomeNav = document.querySelector('.mainHomeNav');

if (mainHomeNav) {
    const btnMenu = mainHomeNav.querySelector('#menuClose');
    let valid = false;
    btnMenu.addEventListener('change', () => {
        if (btnMenu.checked) {
            valid = false;
        } else {
            valid = true;
        };
        const instance = new Menu(valid);
        instance.alteration();
    });

    class Menu {
        constructor(valid) {
            this.main = mainHomeNav
            this.a = mainHomeNav.querySelectorAll('a');
            this.sideH2 = mainHomeNav.querySelector('h2');
            this.acountBox = mainHomeNav.querySelector('.acountBox');
            this.welcomeAcount = mainHomeNav.querySelector('.welcomeAcount');
            this.marginLeft = document.querySelector('.marginLeftMenu');
            this.rotateLabel = mainHomeNav.querySelector('.menuCloseBox');
            this.valid = valid;
        };

        alteration(){
            this.rotateLogo();
            this.opacity();
            this.display();
        };

        opacity(){
            for (let i of this.a) i.classList.toggle('opacity0', this.valid === true);
            this.acountBox.classList.toggle('opacity0', this.valid === true);
        };

        display(){
            this.welcomeAcount.classList.toggle('displayNone', this.valid === true);
            this.marginLeft.classList.toggle('expand', this.valid === true);
            this.main.classList.toggle('reduce', this.valid === true);
            this.main.classList.toggle('mobileMenu', this.valid === false);
            this.marginLeft.classList.toggle('mobileContent', this.valid === false);
        };

        rotateLogo(){
            this.sideH2.classList.toggle('absoluteH2', this.valid === true);
            this.rotateLabel.classList.toggle('rotateLabel', this.valid === true);
        };
    };

    const instance = new Menu(true);
    instance.alteration();
    
};
