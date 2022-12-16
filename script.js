document.querySelector(".control-buttons span").onclick = function (){
    let yourName = prompt("What's Your Name ?");
    if (yourName == null || yourName == "")
    {
        document.querySelector(".name span").innerHTML = 'Unknown' ;
    }else{
        document.querySelector(".name span").innerHTML = yourName ;
    }
    document.querySelector(".control-buttons").remove();
};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = Array.from(Array(blocks.length).keys());
// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);


blocks.forEach((block,index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click' , function () {

        flibBlock(block);
    })
});

//flibBlock function
function flibBlock(selectedBlock){

    selectedBlock.classList.add('is-flipped');

    //collect all flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    
    //if theres two selected blocks
    if(allFlippedBlocks.length === 2){

        // console.log('Two Flipped Blocks Selected');

        stopClicking();

        checkMatchedBlocks(allFlippedBlocks[0] ,allFlippedBlocks[1]);
    }

}

//stopClicking function
function stopClicking(){

    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {

        //remove class no clicking after the duration
    blocksContainer.classList.remove('no-clicking');


    }, duration)
};

//check matched block
function checkMatchedBlocks(firstBlock, secondBlock){

    let triesElement = document.querySelector('.tries span');

    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();


    } else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        },duration)

        document.getElementById('fail').play();

    }
}


//shuffel function
function shuffle(array){

    let current = array.length,
    temp,
    random;

    while (current > 0){

        random = Math.floor(Math.random() * current);

        current--;
        
        //save current element
        temp = array[current];

        //current element = random element
        array[current] = array[random];

        //random element = get element
        array[random] = temp;
    }
    return array;
}