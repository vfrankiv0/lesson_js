
let seconds = 59;
let t;
let check = true;
function startTimer(){
    t = setTimeout(function(){
        if(seconds < 10){
            $('.right-num').text('0'+`${seconds}`);
        }
        else{
            $('.right-num').text(seconds);
        }
        $('.left-num').text('00');
        seconds--;
        startTimer();
    }, 1000);
    if(seconds < 1){
        clearTimeout(t);
        $('.left-num').text('00');
        $('.right-num').text('00');
        $('#result-btn').attr('disabled', 'disabled');
        $('.modal-container').css({
            zIndex : 3,
            backgroundColor:'rgba(0, 0, 0, 0.550)'
        });
        $('.modal-message').css({
            top: `${(window.innerHeight -  $('.modal-message').height())/6}px` ,
            left:  `${(window.innerWidth -  $('.modal-message').width())/2}px`,
            display: 'block'
        });
        $('#check-btn').css('display', 'none');
        document.querySelector('.message').innerHTML = 'its a pity, but you lost';

    }
}


$(function(){

    let modalDiv = $('.modal-message');
    $('#startGame').on('click', function(){
        startTimer();
        $('#result-btn').removeAttr('disabled');
        $('#startGame').attr('disabled', 'disabled') ;
        check = false;
    
    });
    let rezult = [];
    $('#result-btn').on('click', function(){
    
        $('.modal-container').css({
            zIndex : 3,
            backgroundColor:'rgba(0, 0, 0, 0.550)'
        });
        $('.modal-message').css({
            top: `${(window.innerHeight - modalDiv.height())/6}px` ,
            left:  `${(window.innerWidth - modalDiv.width())/2}px`,
            display: 'block'
        });
        document.querySelector('.message').innerHTML = `You still have time, are you sure? ${document.querySelector('.timer').innerHTML}`;
    });
    $('#close-btn').on('click', function(){
        $('.modal-container').animate({
            zIndex : -1,
            backgroundColor:'rgba(255, 255, 255, 0.6)'
        },500); 
        $('.modal-message').css('display','none');
        $('#check-btn').css('display', 'inline-block');
    });

    let winArr = ['20px 0px', '-55px 0px', '-130px 0px', '-205px 0px', '20px -75px',
    '-55px -75px', '-130px -75px', '-205px -75px',
    '20px -150px', '-55px -150px', '-130px -150px', '-205px -150px', '20px -225px',
    '-55px -225px', '-130px -225px','-205px -225px'];
 
    let copyWin = winArr.slice(0);

    $('#new-btn').on('click', function(){
        $('#result-btn').attr('disabled', 'disabled');
        $('#startGame').removeAttr('disabled');
        clearTimeout(t);
        check = true;
        seconds = 59;
        $('.left-num').text('01');
        $('.right-num').text('00');
        $('.puzzle-block').empty('.puzzle');
        $('.puzzle-rez').empty('.puzzle');
        $('.puzzle-block').html(`<div class="puzzle piece1"></div>
        <div class="puzzle piece2"></div>
        <div class="puzzle piece3"></div>
        <div class="puzzle piece4"></div>
        <div class="puzzle piece5"></div>
        <div class="puzzle piece6"></div>
        <div class="puzzle piece7"></div>
        <div class="puzzle piece8"></div>
        <div class="puzzle piece9"></div>
        <div class="puzzle piece10"></div>
        <div class="puzzle piece11"></div>
        <div class="puzzle piece12"></div>
        <div class="puzzle piece13"></div>
        <div class="puzzle piece14"></div>
        <div class="puzzle piece15"></div>
        <div class="puzzle piece16"></div>`)
        
        let copyWin = winArr.slice(0);
        for(let i = 1; i<=$('.puzzle').length; i++){
            const random = Math.floor(Math.random()*copyWin.length);
            $(`.puzzle:nth-of-type(${i})`).css('backgroundPosition', copyWin[random]);
            copyWin.splice(random,1);
        }

        $(`.puzzle`).draggable();
    
        $(`.puzzle-rez`).droppable({
            accept: `.puzzle`,
            tolerance: 'intersect',
            drop: function(event, ui){
                $(this).append(ui.draggable[0])
                ui.draggable[0].style.top = '0px',
                ui.draggable[0].style.left = '0px'
            },
        });

    });

    for(let i = 1; i<=$('.puzzle').length; i++ ){

            const random = Math.floor(Math.random()*copyWin.length);
            $(`.puzzle:nth-of-type(${i})`).css('backgroundPosition', copyWin[random]);
            copyWin.splice(random,1);
        $(`.puzzle:nth-of-type(${i})`).draggable();

        $(`.puzzle-rez`).droppable({
            accept: `.puzzle`,
            tolerance: 'intersect',
            drop: function(event, ui){
                $(this).append(ui.draggable[0])
                ui.draggable[0].style.top = '0px',
                ui.draggable[0].style.left = '0px'
            },
        });
    }


    $('.puzzle-block').on('drag', function(){
        if(check === true){
            check = false;
            $('.puzzle-block').one('drag', function(){
                startTimer();
                $('#result-btn').removeAttr('disabled');
                $('#startGame').attr('disabled', 'disabled') ;
            });


        }

    });
 
    $('#check-btn').on('click', function(){
        clearTimeout(t);
        $('.puzzle-rez').each(function(i, elem){
            if(this.children[0] == undefined){
                document.querySelector('.message').innerHTML = 'its a pity, but you lost';
                return
            }
            rezult.push(this.children[0].style.backgroundPosition);
        });
        $('#check-btn').css('display', 'none');
        for(let i = 0; i< winArr.length; i++){
            if(rezult[i] == winArr[i]){
                document.querySelector('.message').innerHTML = 'Woohoo, well done, you did it!'
            }
            else{
                document.querySelector('.message').innerHTML = 'its a pity, but you lost';
            }
        }
            
        $('#result-btn').attr('disabled', 'disabled');
        console.log(rezult);
        console.log(winArr);
    });
});
