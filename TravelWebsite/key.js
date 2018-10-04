function Key(classList, containerID){

    this.cacheDOM = function(){
        this.$cont = document.getElementById(containerID);
        this.$ul = this.$cont.getElementsByTagName('ul')[0];
    };

    this.cachePins = function(){
        this.$pins = this.$ul.children;
        console.log('cached pins ',this.$pins);
    };

    this.init = function(){
        this.cacheDOM();
        this.makePins();
        this.cachePins();
        console.log('found pins', this.$pins );
        this.bindEvents();
    };
    this.bindEvents = function(){
        console.log( this.$pins );
        Array.prototype.forEach.call( this.$pins/*the this object*/,/*the cb*/ element => {
            element.addEventListener('mouseenter', this.addBorder );
            element.addEventListener('mouseleave', this.removeBorder );  
            element.addEventListener('click', this.toggleCheck );
        });
    };
    this.toggleCheck = function(e){

    };
    this.addBorder = function(e){
        e.target.style.border = '2px solid white';
    };
    this.removeBorder = function(e){
        e.target.style.border = '';
    };
    this.makePinHTML = function(classType){
        //make key item slot 
        let liMain = document.createElement('LI');
        let div = document.createElement('DIV');
        div.style.display = 'inline-block';

        //first make the pin
        let pin = document.createElementNS( 'http://www.w3.org/2000/svg' , 'path' );
        let svg = document.createElementNS( 'http://www.w3.org/2000/svg' , 'svg' );//<svg xmlns="http://www.w3.org/2000/svg"  class ="pin1" viewBox="0 0 24 24"></svg>
        svg.setAttribute('viewBox', "0 0 24 24");
        svg.setAttribute('height', "75px");
        svg.style.cssFloat = 'left';
        svg.style.clear = 'both';
        //svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        let at = {
            'id': classType + '_' + 'pinkey',
            'class': 'pin ' + classType,
            'd': "M18 6c0-3.314-2.687-6-6-6s-6 2.686-6 6c0 2.972 2.164 5.433 5 5.91v12.09l2-2v-10.09c2.836-.477 5-2.938 5-5.91zm-8.66-1.159c-.53-.467-.516-1.372.034-2.023.548-.65 1.422-.799 1.952-.333s.515 1.372-.033 2.021c-.549.652-1.423.801-1.953.335z"
        };
		for(let i in at ){
			pin.setAttribute(i, at[i]);
        }
        svg.appendChild(pin);
        div.appendChild(svg);

        //make the bar
        let bar = document.createElement('div');
        bar.style.cssFloat='top';
        bar.style.display='inline-block';
        bar.style.cssFloat = 'left';
        bar.style.clear = 'both';
        //now make a check box
        let check = document.createElement('INPUT');
        check.setAttribute('type','checkbox');
        check.setAttribute('checked','true');
        bar.appendChild(check);
        //now make title
        let h3 = document.createElement('H3');
        h3.innerHTML = classType;
        h3.style.display = 'inline-block';
        bar.appendChild(h3);
        //add bar to the div
        div.appendChild(bar);


        liMain.appendChild(div);
        return liMain;
    };

    this.makePins = function(){
        for(let i =0; i<classList.length; i++){
            this.$ul.appendChild( this.makePinHTML( classList[i] ) );
        }
    };

}