var revert;

$.fn.randomize = function (selector) {
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function () {
        $(this).children(selector).sort(function () {
            return Math.round(Math.random()) - 0.5;
            // }). remove().appendTo(this); // 2014-05-24: Removed `random` but leaving for reference. See notes under 'ANOTHER EDIT'
        }).detach().appendTo(this);
    });

    return this;
};

$(document).ready(function () {

    var Data = JSON.parse($('#hfData').val());

    $(Data).each(function (i, a) {
        this.ID = (i + 1);
    });

    $("#ulFirst").empty();
    var rows = $("#questionTmpl").tmpl(Data);
    $("#ulFirst").append(rows);

    $("#ulSecond").empty();
    var rows = $("#answerTmpl").tmpl(Data);
    $("#ulSecond").append(rows);

    $("#ulThird").empty();
    var rows = $("#choiceTmpl").tmpl(Data);
    $("#ulThird").append(rows);

    $('#ulThird').randomize('li');

    $(".drop").droppable({
        tolerance: 'intersect',
        accept: ".drag",
        drop: function (event, ui) {


            var secondIndex = $(event.target).index() + 1;

            var Occupied = $('#ulThird').find('div[dataAtLi="' + secondIndex + '"]');

            if (Occupied.length >= 1) {

                revert = true;

            }
            else
                {
                revert = false;
            var dataID = $(ui.draggable[0]).attr('dataID');

            //Set Div Occupied

            $(ui.draggable[0]).attr('dataAtLi', secondIndex);

            var firstIndex = $('#ulFirst').find('div[dataID="' + dataID + '"]').closest('li').index() + 1;

            //var secondIndex = $(event.target).index() + 1;

            if (firstIndex == secondIndex) {
                $(ui.draggable[0]).attr('matched', true);
            }
            else {
                $(ui.draggable[0]).attr('matched', false);
            }

        }
            var drop_p = $(this).offset();
            var drag_p = ui.draggable.offset();
            var left_end = drop_p.left - drag_p.left;
            var top_end = drop_p.top - drag_p.top;
            ui.draggable.animate({
                top: '+=' + top_end,
                left: '+=' + left_end
            });


        }

    });

    $('.dragBox').droppable({

        accept: '.drag',
        drop: function (event, ui) {

            revert = false;
            $(ui.draggable[0]).removeAttr('dataatli');
            $(ui.draggable[0]).removeAttr('matched', 'false');

            var drop_p = $(this).offset();
            var drag_p = ui.draggable.offset();
            var left_end = drop_p.left - drag_p.left;
            var top_end = drop_p.top - drag_p.top;
            ui.draggable.animate({
                top: '+=' + top_end,
                left: '+=' + left_end
            });
        }
    });



    $(".drag").draggable({

        stack: ".drag",
        revert: function (event, ui) {

            if(!event){
                return true;
            }
           else if (revert) {
                return true;
            }
            else {
                return false;
            }
        },
        //snap: true,
        cursor: "move",


    }).disableSelection();


    $('#btnCheckScore').click(function () {

        $('div.drag').removeClass('blue');
        $('div.drag[matched="false"]').addClass('blue');

        var SingleAnswerScore = Number(60) / Number($('div.drag').length);

        var TotalScore = Number($('div.drag[matched="true"]').length) * Number(SingleAnswerScore);

        var score = (Number(TotalScore) / Number(60)) * 100;



        alert('Your total Score is : ' + score.toFixed(0) + '%');
    });

});
