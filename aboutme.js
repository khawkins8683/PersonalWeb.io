
//each image must link to a title and description
//each image must have a click event
    //first remove previous imageblock
    //add in a new image block
function buildImageBlock(imageDataObj, $image){
    //add in a <div class="imageblock"
    //above the current imagerow
    let newImageBlock = document.createElement('DIV');
    newImageBlock.setAttribute('class','imageblock');
    let newImageText = document.createElement('DIV');
    newImageText.setAttribute('class','aboutmetext');

    //set image 
    let newImage = document.createElement('IMG');
    newImage.setAttribute('src', imageDataObj.url );
    newImage.setAttribute('height', '300px' );
    newImageBlock.append(newImage);
    
    //set title text
    let newTitle =  document.createElement('H1');
    newTitle.innerHTML = imageDataObj.title;
    newImageText.append(newTitle);

    //set hr
    let hr = document.createElement('HR');
    newImageText.append(hr);

    //set desc text
    let newDesc =  document.createElement('P');
    newDesc.innerHTML = imageDataObj.description;
    newImageText.append(newDesc);

    //append in text/title
    newImageBlock.append(newImageText);
    //append in entire image block
    let imageRow = $image.parentElement;
    let innerCont = imageRow.parentElement;
    innerCont.insertBefore(  newImageBlock, imageRow);

    //now set the width
    let width = newImage.parentElement.clientWidth - newImage.clientWidth - 70;
    let height = newImage.clientHeight;
    
    newImageText.style.width = width + 'px';//'calc(100% -'+ width + 'px' +')';
    newImageText.style.height = height+'px';
    NEWIMAGE = newImage;
    console.log({'width':width,'height':height},newImage,newImage.clientHeight);
}

function removeImageBlock(){
    let imageBlock=document.getElementsByClassName("imageblock")[0];
    if(imageBlock){imageBlock.parentElement.removeChild(imageBlock)};
}

//what is the best way to link these to the images
function addClickEvent(imageObj){
    //first get the image dive
    let $image =  document.querySelector('img[src="'+ imageObj.url +'"]');
    $image.addEventListener("click", function(){
        removeImageBlock();
        buildImageBlock(imageObj,$image);
    });
    //todo mouse in and out add frame
    $image.addEventListener("mouseover", frameThis );
    $image.addEventListener("mouseout", noFrameThis );

}

function frameThis(){
    this.style.border = 'solid gray 3px';
}
function noFrameThis(){
    this.style.border = '';
}



function CreateImageObj(title,description,URL){
    this.title = title;
    this.description = description;
    this.url = "./Images/"+URL;
    return this;
}

//Add event to resume
function setResumeEvents(){
    let $res = document.getElementById("resumepic");
    $res.addEventListener("mouseover", bkgThis );
    $res.addEventListener("mouseout", noBkgThis );
}
function bkgThis(){
    this.style.background = "white";
}
function noBkgThis(){
    this.style.background = "none";
}
setResumeEvents();
//add all image pictures
//--------------------------------------------------------Row #1--------------------------
let aboutMeObj = new CreateImageObj(
    'About Me',
    'Greetings from a radio telescope array at 1300 ft on the top of Manu Kea, Hawaii.  I am an optical engineer and computer programmer.  Click on the pictures bellow to find out more about me.',
    'kyle.jpg'
);
//have slide show start on the about me
addClickEvent(aboutMeObj);
buildImageBlock(aboutMeObj, document.querySelector('img[src="./Images/kyle.jpg"]') );


let backflipObj =new CreateImageObj(
    'Backflips',
    'When I was yonger I remeber seeing a soccer player do a backflip after he scored.  I thought that looks cool, and since then I have always been interested in acrobatic things.  So, I learned how to do a couple flips.  I love the feeling of the movements',
    'backflip.jpg'
);
addClickEvent(backflipObj);

let climbObj =new CreateImageObj(
    'Rock Climbing',
    'In the summer after my sophomore year, my buddy John and I got a rope and some quick draws and gave sport climbing ago.  Since we lived in Tucson, AZ the obvious place to go climbing was Mount Lemmon.  The sport took me to some of the coolest places on the mountain.  Now the sport has taken me to beautiful places like, Yosemite CA, Cochise Stronghold AZ, and Joshua Tree CA.',
    'climb.png');
addClickEvent( climbObj );

let mathObj =new CreateImageObj(
    'Math',
    'As a kid, reading and writing was hard for me, so there was always something reasuring about arithmatic.  The more I learned about math the more mistified and curious I became until I couldnt bear the idea of my math education ending, so I added it as a major.  I love the rigor and abstract cleaverness used in proofs.  One of my favorite little proofs is outlined (not proven) here in the image section. It shows how to prove that the square root of 2 is irrational.',
    'math.png');
addClickEvent( mathObj );

let paintObj = new CreateImageObj(
    'Paihting',
    'After my freshman year, I took a study abroad trip to Italy.  I had always liked art, so I decided to take a water color class there.  Since then I have always enjoyed making watercolor painting, pen drawing hybrids. This is one that was inspired by Tucson (obviously).',
    'paint.jpg');
addClickEvent( paintObj );


//--------------------------------------------------------Row #2
let mathHistObj = new CreateImageObj(
    'Math History',
    'In addition to math, I also like math history.  The stories and charecters are all so interesting, and the implications of their work is profound.  Perhaps my favorite sorty is of Evariste Galois.  A french mathematician who lived through the French Revolution, and died in a duel at twenty, but not before developing the foundations of Group Theory.',
    'galois.jpg');
addClickEvent( mathHistObj );

let travelObj = new CreateImageObj(
    'Traveling',
    'We live in a beautiful world, and I do my best to see all of it that I can.  One of my favorite trips (depicted in this photo) was a road trip up the west coast with my buddy Eric.  We started in Phoenix Az, headed through Joshua Tree out to L.A. and then made our way through Redwood forests, cities and the Olypic Pennisula to Seattle.',
    'travel.png');
addClickEvent( travelObj );

let skiObj = new CreateImageObj(
    'Skiing/Snowboarding',
    'Before I started rock climbing, and more importanly, before I moved to the middle of the desert, skiing was what got me going.  It was the first outdoor sport I fell in love with and had plenty of, speed, air and fun to justify long lift lines.  Since I am from Colorado, I was lucky enogh to have pretty good access to some terrain.  Also I like skiing and snowboarding, no need to pick sides.',
    'ski.png');
addClickEvent( skiObj );

let boulderObj = new CreateImageObj(
    'Boulder CO',
    'I was born and raised in Boulder Colorado.  It is a great place to be a kid.  Boulder had everything, mountains, rock, creeks, snow and friends.  Two things from Boulder rubbed off on me, a general interest in things like climbing, biking and backpacking, and a curiosity and respect for science.',
    'boulder.jpg');
addClickEvent( boulderObj );

//Row 3---------------------------------
let optObj = new CreateImageObj(
    'Optics',
    'One of my first encounters with optics, was reading about the Keck Observatory in Hawaii.  The astronomy was what first drew me to the keck, but the more I learned about the instrument, its precision, its size, the more intrestetd I became.  So, in my freshman year I decided to major in optical engineering and then had the pleasure of working on and seeing some pretty cool optical systems after graduation.',
    'keck.jpg');
addClickEvent( optObj );

//pink floyd or talking heads pick
let musicObj = new CreateImageObj(
    'Music',
    'Like most humans I enjoy music, however, it wasnt until my twenties that I started to like more classic rock n roll.  My two favorite bands are probably the Talking Heads and Pink Floyd.  More recently, I have started a small record collection.',
    'disk.png');
addClickEvent(musicObj );

//programming
let compObj = new CreateImageObj(
    'Compiuters',
    'Rather unfortunately, up until my senior year of high school, I was not a fan of computers.  I thought they were borring and only consisted of email and microsoft excell.  Then I audited an astronomy class and actually used a computer to analyze some spectral data.  I realized then how powerful a tool a computer is and how many interesting things you can do with them.  Since then I have always used them for modeling and web disgin, in school, professionally, and on my own time.',
    'comp.jpg');
addClickEvent(compObj );

//solowiej
let soloObj = new CreateImageObj(
    'Solowiej',
    'You may have been wondering where ksolohawk came from.  Well the solo is from my middle name, Solowiej, which is my mothers maiden name.  My mothers side of the family is Polish, and I like carrying around the name as a reminder that most of us here in the USA are immigrants.',
    'solowiej.png');
addClickEvent(soloObj );

//Tucson
let tucsonObj = new CreateImageObj(
    'Tucson AZ',
    'I moved to Tucson from Boulder Colorado, in 2012.  There is smothing great about the desert, the blue ski, dry heat, bright splashes of color, whaterver it is, it grows on you.  The desert is a very underrated place and I will always love the dark outline of a sequaro awkardly outlined by a bright red sunset.',
    'tucson.jpg');
addClickEvent(tucsonObj );
