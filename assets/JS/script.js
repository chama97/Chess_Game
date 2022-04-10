
$(document).ready(function () {

    var selection = { piece:'', player:'', row:'', column:''},
    playerturn = 'white'

    $("[piece]").each(function(){
        let player = $(this).attr('player'),
        piece = $(this).attr('piece'),
        squareColor = $(this).css('background-color')
        if(piece == '' || player == ''){
            $(this).attr('empty', true)
            $(this).removeAttr('player').removeAttr('piece')
            return
        }
        $(this).attr('empty', false)
        $(this).css("background", "url(assets/image/"+player+"/"+piece+".png)").css("background-size", "60px 60px")
        .css('background-color', squareColor)
        .css('z-index', '3')
    })


    $("[empty]").on("click", function(){
        console.log(playerturn)
        var empty = $(this).attr('empty'),
        targpiece = $(this).attr('piece'),
        targplayer = $(this).attr('player'),
        targrow = $(this).attr('row'),
        targcolumn = $(this).attr('column')
        if(targplayer == playerturn){
            $("[empty= 'false']").each(function(){
                if($(this).hasClass('dark')){
                    var bgcolor = 'gray'
                }else{
                    var bgcolor = 'white'
                }
                $(this).css('background-color', bgcolor)
            })
            $(this).css('background-color', 'green')
            selection = { piece:targpiece, player:targplayer, row:targrow, column:targcolumn}   
        }else if(selection.piece != '' && selection.player != '' && selection.player == playerturn &&
        (targrow != selection.row || targcolumn != selection.column)){
            if(typeof targpiece == 'undefined'){
                targpiece = ''
            }
            if(typeof targplayer == 'undefined'){
                targplayer = ''
            }
            correctMove(selection.player, selection.piece, selection.row, selection.column, targrow, targcolumn, targpiece, targplayer)

        }else{
            console.log('no piece')
        }
    })


    function movePiece(player, piece, row, column, targrow, targcolumn){
        if($("[row= '"+row+"'][column= '"+column+"']").hasClass('dark')){
            var bgcolor = 'gray'
        }else{
            var bgcolor = 'white'
        }
        if($("[row= '"+targrow+"'][column= '"+targcolumn+"']").hasClass('dark')){
            var targbgcolor = 'gray'
        }else{
            var targbgcolor = 'white'
        }
        $("[row= '"+row+"'][column= '"+column+"']").css('background-image', 'none').css('background-color', bgcolor).attr('piece', '').attr('player', '').attr('empty', 'true')

        var targetpiece = $("[row= '"+targrow+"'][column= '"+targcolumn+"']").attr('piece'),
        targetplayer = $("[row= '"+targrow+"'][column= '"+targcolumn+"']").attr('player')

        if(targetpiece == 'king' && targetplayer != playerturn){
            gameEnd();
        }

        $("[row= '"+targrow+"'][column= '"+targcolumn+"']").css('background', "url(assets/image/"+player+"/"+piece+".png)")
        .css("background-size", "60px 60px")
        .css('background-color', targbgcolor).attr('player', player).attr('piece', piece).attr('empty', false)
        console.log('successful '+ piece + ' move')
        selection = { piece:'', player:'', row:'', column:''}

        if(playerturn == 'white'){
            playerturn = 'black'
            console.log('swapped ', playerturn)
        }else if(playerturn == 'black'){
            playerturn = 'white'
            console.log('swapped ', playerturn)
        }

    }


    function correctMove(player, piece, row, column, targrow, targcolumn, targpiece, targplayer){
        var canmove = '';
        row = parseInt(row)
        column = parseInt(column)
        targrow = parseInt(targrow)
        targcolumn = parseInt(targcolumn)

        if(piece == 'pawn'){
            if(player == 'white'){
                var rowlogic = row+1
                if(row == 2){
                    firstmoverowlogic = row+2
                }
            } else if(player == 'black'){
                var rowlogic = row-1
                if(row == 7){
                    firstmoverowlogic = row-2
                }
            }
            if((targrow == rowlogic || targrow == firstmoverowlogic) && (((targcolumn == (column+1) ||
            targcolumn == (column-1)) && targpiece !='' && targplayer != player && targplayer !='') ||
            (column == targcolumn && targplayer == ''))){
                canmove == true;
            }else{
                canmove == false;
                console.log('incorrect move')
            }
        }else if(piece == 'rook'){
            canmove = straightLineCheck(row, column, targrow, targcolumn)
        }else if(piece == 'bishop'){
            canmove = diagonalCheck(row, column, targrow, targcolumn)
        }else if(piece == 'knight'){
            if(row+2 == targrow && (column-1 == targcolumn || column+1 == targcolumn)){
                canmove = true;
            }else if(row-2 == targrow && (column+1 == targcolumn || column-1 == targcolumn)){
                canmove = true;
            }else if(column-2 == targcolumn && (row+1 == targrow || row-1 == targrow)){
                canmove = true;
            }else if(column+2 == targcolumn && (row-1 == targrow || row+1 == targrow)){
                canmove = true;
            }else{
                canmove = false;
            }
        }else if(piece == 'queen'){
            var diagonalcheck = diagonalCheck(row, column, targrow, targcolumn),
            straightlinecheck = straightLineCheck(row, column, targrow, targcolumn)
            if(diagonalcheck == true || straightlinecheck == true){
                canmove = true
            }else{
                canmove = false
            }
        }else if(piece == 'king'){
            var rowplusone = row + 1,
            rowminusone = row - 1,
            colplusone = column + 1,
            colminusone = column - 1;
            if((targcolumn == colplusone && row == targrow) || (targcolumn == colminusone && row == targrow) ||
            (targrow == rowplusone && column == targcolumn) || (targrow == rowminusone && column == targcolumn) ||
            (targcolumn == colplusone && (targrow == rowplusone || targrow == rowminusone)) ||
            (targcolumn == colminusone && (targrow == rowplusone || targrow ==rowminusone))){
                canmove = true;
            }
        }
        if(canmove == true){
            movePiece(player, piece, row, column, targrow, targcolumn)
        }
    }

    function gameEnd(){
        playerturn = 'end'
        console.log('ended')
    }

    function diagonalCheck(){
        console.log('ended')
    }

    function straightLineCheck(){
        console.log('ended')
    }

})


