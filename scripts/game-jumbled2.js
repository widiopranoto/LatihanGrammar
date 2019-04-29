$(document).ready( function() {

  var the_phrase = shuffle($('#hfData').val());
  var orig       = $('#hfData').val().replace(/([\,\.])/g," $1").split(" "); // save it, so we have access to it when doing tips

  //
  $.each(the_phrase, function(i,x) {
    var x_nice = x.replace(/\-/g," ").replace(/:::/g,"-");
    if (hasUppercase(x)) {
      $("#jumbleStarter").append("<label class='jumbled_word' data-upper=\"yes\" data-real-value="+x+">"+x_nice+"</label>");
    } else {
      $("#jumbleStarter").append("<label class='jumbled_word' data-real-value="+x+">"+x_nice+"</label>");
    }
  });
  $("#jumbleStarter").append("<div style=\"clear:both\"></div>");

  var div_height = $('#jumbleStarter').height();

  //console.log("height: "+ $('#jumbleStarter').height());
  $('#jumbleWords,#jumbleStarter').height( div_height + "px" ); // set the heights

  //alert("Set height to " +div_height );

  $("#jumbleWords").sortable({
        connectWith: '#jumbleStarter',
        items: '.jumbled_word',
        helper: 'clone',
        appendTo: 'body', helper: 'clone', zIndex: 300,
        stop: function( event, ui ) {
          $('#jumbleWords label').each(function(i) {
            if (i == 0 && $(this).data("upper") == undefined) {
                // if its the first word, and DOESNT have an existing uppercase set, lets uppercase the first word
                $(this).html( ucword($(this).html()) )
            } else {
                // only lowercase if we have not specifically told the script to LEAVE the case alone!
                if ($(this).data("upper") == undefined) {
                  $(this).html( lcword($(this).html()) )
                }
            }
          });
        },
        receive: function( event, ui ) {
          $('#jumbleWords label').each(function(i) {
            if (i == 0 && $(this).data("upper") == undefined) {
                // if its the first word, and DOESNT have an existing uppercase set, lets uppercase the first word
                $(this).html( ucword($(this).html()) )
            } else {
                // only lowercase if we have not specifically told the script to LEAVE the case alone!
                if ($(this).data("upper") == undefined) {
                  $(this).html( lcword($(this).html()) )
                }
            }
            //console.log("FOO " + $(this).html());
          });
        }
    });

  $("#jumbleStarter").sortable({
        connectWith: '#jumbleWords',
        items: '.jumbled_word',
        appendTo: 'body', helper: 'clone', zIndex: 300
    });

//   $("#jumbleWords").change( function() {
// alert("something changed in here");
//   });

//    ucword

    $('#btnCheckScore').click(function(event) {

        var original_str = $('#hfData').val().replace(/([\,\.])/g," $1");
        var original_str_poss2 = ''
        var original_str_poss3 = '';
        var original_str_poss4 = '';
        var original_str_poss5 = '';
        var original_str_poss6 = '';

        if ($('#hfData2').length) {
          original_str_poss2 = $('#hfData2').val().replace(/([\,\.])/g," $1");
        }
        if ($('#hfData3').length) {
          original_str_poss3 = $('#hfData3').val().replace(/([\,\.])/g," $1");
        }
        if ($('#hfData4').length) {
          original_str_poss4 = $('#hfData4').val().replace(/([\,\.])/g," $1");
        }
        if ($('#hfData5').length) {
          original_str_poss5 = $('#hfData5').val().replace(/([\,\.])/g," $1");
        }
        if ($('#hfData6').length) {
          original_str_poss6 = $('#hfData6').val().replace(/([\,\.])/g," $1");
        }

        // get the values they have put in already
        var the_string = new Array();
        $('#jumbleWords .jumbled_word').each(function(index, el) {
            the_string.push($(this).data("real-value"));
        });

        //console.log(the_string.join(" ") + " == " + original_str);

// console.log(the_string.join(" ") + " == "+ original_str);
// console.log(the_string.join(" ") + " == "+ original_str_poss2);
// console.log(the_string.join(" ") + " == "+ original_str_poss3);
// console.log(the_string.join(" ") + " == "+ original_str_poss4);
// console.log(the_string.join(" ") + " == "+ original_str_poss5);
// console.log(the_string.join(" ") + " == "+ original_str_poss6);

        if (the_string.join(" ") == original_str) {
            markCompleted();
        } else {
            if (original_str_poss2.length) {
              if (the_string.join(" ") == original_str_poss2) {
                  markCompleted();
              } else {

                if (original_str_poss3.length) {
                  if (the_string.join(" ") == original_str_poss3) {
                      markCompleted();
                  } else {

                    if (original_str_poss4.length) {

                      if (the_string.join(" ") == original_str_poss4) {
                          markCompleted();
                      } else {

                          if (original_str_poss5.length) {
                            //console.log(the_string.join(" ") == original_str_poss5);
                            if (the_string.join(" ") == original_str_poss5) {
                                markCompleted();
                            } else {

                                if (original_str_poss6.length) {
                                  if (the_string.join(" ") == original_str_poss6) {
                                      markCompleted();
                                  } else {
                                      showNotRight();
                                  }
                                } else {
                                    showNotRight();
                                }

                            }
                          } else {
                                showNotRight();
                          }

                      }
                    } else {
                        showNotRight();
                    }


                  }
                } else {
                  showNotRight();
                }

              }
            } else {
                showNotRight();
            }

        }



    });



    $('#btnShowTip').click(function(event) {

        // first lets check if they have it worked out already
        var original_str = $('#hfData').val().replace(/([\,\.])/g," $1");
        var original_str_poss2 = ''
        var original_str_poss3 = '';
        var original_str_poss4 = '';
        var original_str_poss5 = '';
        var original_str_poss6 = '';
        if ($('#hfData2').length) {
          original_str_poss2 = $('#hfData2').val().replace(/([\,\.])/g," $1");
        }
        if ($('#hfData3').length) {
          original_str_poss3 = $('#hfData3').val().replace(/([\,\.])/g," $1");
        }
        if ($('#hfData4').length) {
          original_str_poss4 = $('#hfData4').val().replace(/([\,\.])/g," $1");
        }
        if ($('#hfData5').length) {
          original_str_poss5 = $('#hfData5').val().replace(/([\,\.])/g," $1");
        }
        if ($('#hfData6').length) {
          original_str_poss6 = $('#hfData6').val().replace(/([\,\.])/g," $1");
        }

        var the_string = new Array();
        $('#jumbleWords .jumbled_word').each(function(index, el) {
            the_string.push($(this).data("real-value"));
            //console.log();
        });

        var current_str = the_string.join(" ");

        var re = new RegExp("^"+current_str,"g");

        // console.log(re.test(original_str));
        // console.log(re.test(original_str_poss2));
        // console.log(re.test(original_str_poss3));

        if (the_string.join(" ") == original_str) {
            markCompleted();
        } else {
            if (original_str_poss2.length) {
              if (the_string.join(" ") == original_str_poss2) {
                  markCompleted();
                  return false;
              } else {

                if (original_str_poss3.length) {
                  if (the_string.join(" ") == original_str_poss3) {
                      markCompleted();
                      return false;
                  }
                }

              }
            }
        }


        var string_to_check;
        if (re.test(original_str)) {
          // looks like they started with option 1, so lets go with that
          string_to_check = original_str
        } else if (re.test(original_str_poss2)) {
          // looks like they started with option 2, so lets go with that
          string_to_check = original_str_poss2;
          orig      = $('#hfData2').val().replace(/([\,\.])/g," $1").split(" ");
        } else if (re.test(original_str_poss3)) {
          // looks like they started with option 3, so lets go with that
          string_to_check = original_str_poss3;
          orig      = $('#hfData3').val().replace(/([\,\.])/g," $1").split(" ");
        } else if (re.test(original_str_poss4)) {
          // looks like they started with option 3, so lets go with that
          string_to_check = original_str_poss4;
          orig      = $('#hfData4').val().replace(/([\,\.])/g," $1").split(" ");
        } else if (re.test(original_str_poss5)) {
          // looks like they started with option 3, so lets go with that
          string_to_check = original_str_poss5;
          orig      = $('#hfData5').val().replace(/([\,\.])/g," $1").split(" ");
        } else if (re.test(original_str_poss6)) {
          // looks like they started with option 3, so lets go with that
          string_to_check = original_str_poss6;
          orig      = $('#hfData6').val().replace(/([\,\.])/g," $1").split(" ");
        }

       var correct = new Array();
       var next_word = '';
       if ($('#jumbleWords .jumbled_word').length) {
        // $('#jumbleWords .jumbled_word').each(function(index, el) {
        $('.jumbled_word').each(function(index, el) {

              //console.log("TEST: " + orig[index] +" == "+ $(this).data("real-value"));

              if (orig[index] == $(this).data("real-value") && $(this).parent().attr('id') != "jumbleStarter") {
                correct.push($(this).html());
              } else {
                //console.log("Word is: " + orig[index] + "("+index+")");
                //console.log(orig);

                next_word = orig[index];
                next_word = next_word.replace(/\-/g," ").replace(/:::/g,"-");

                if (correct.length > 0) {
                  $('#oops,#congrats').hide();
                  $('#middle-alert-wrapper,#tip').show();
                  $('#the_msg').html("So far you have '" + correct.join(" ") + "' correct. The next word is: <b>" + next_word + "</b>");
                } else {
                  $('#oops,#congrats').hide();
                  $('#middle-alert-wrapper,#tip').show();
                  $('#the_msg').html("Oops, you don't have anything right yet. The first word is: <b>" + next_word + "</b>");
                }
                return false;
              }

          });
        } else {
            $('#oops,#congrats').hide();
            $('#middle-alert-wrapper,#tip').show();
            next_word = orig[0];
            $('#the_msg').html("Oops! You didn't read the instructions. Drag the words up to the yellow bar and click <b>Check</b>");
        }

    });

   $('#closeModal').click(function() {
      $('#middle-alert-wrapper').hide();
   });
   $('#btnReset').click(function() {
      location.reload();
   });


});

function shuffle(str) {

  var a = str.replace(/([\,\.])/g," $1").split(" ");
  var n = a.length;

  for(var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
  }

  return a;

}

function ucword(str){
    if ($('#dont_change_case').length) {
      return str; // dont do anything, as we are on a phrase
    } else {
      str = str.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(replace_latter) {
          return replace_latter.toUpperCase();
      });  //Can use also /\b[a-z]/g
      return str;  //First letter capital in each word
    }
}
function lcword(str){
    return str.toLowerCase();  //First letter capital in each word
}


function hasUppercase(str) {
    return (/[A-Z]/.test(str));
}
function markCompleted() {
    $('#jumbleWords label').each(function(i) {
      $(this).addClass('completed');
    });

    $('#oops,#tip').hide();
    $('#middle-alert-wrapper,#congrats').show();

    if ($('#hfData2').length) {
      //var other_answers = get_correct_answers();
      $('#the_msg').html("Looks like you've got it already :)<br><br>(Other answers are also possible.)");
    } else {
      $('#the_msg').html("Looks like you've got it already :)");
    }


}



function get_correct_answers() {

  var correct = new Array();;
  correct.push($('#hfData').val().replace(/([\,\.])/g," $1").replace(/-/g," ").replace(/:::/g,"-"));
  if ($('#hfData2').length) {
    correct.push($('#hfData2').val().replace(/([\,\.])/g," $1").replace(/-/g," ").replace(/:::/g,"-"));
  }
  if ($('#hfData3').length) {
    correct.push($('#hfData3').val().replace(/([\,\.])/g," $1").replace(/-/g," ").replace(/:::/g,"-"));
  }
  if ($('#hfData4').length) {
    correct.push($('#hfData4').val().replace(/([\,\.])/g," $1").replace(/-/g," ").replace(/:::/g,"-"));
  }
  if ($('#hfData5').length) {
    correct.push($('#hfData5').val().replace(/([\,\.])/g," $1").replace(/-/g," ").replace(/:::/g,"-"));
  }
  if ($('#hfData6').length) {
    correct.push($('#hfData6').val().replace(/([\,\.])/g," $1").replace(/-/g," ").replace(/:::/g,"-"));
  }

  return "<i>" + correct.join("<br>") + "</i>";

}

function showNotRight() {
  $('#oops,#congrats').hide();
  $('#middle-alert-wrapper,#tip').show();
  $('#the_msg').html("Sorry, that's not quite it.<br><br>(You can click the <b>Hint</b> button for a clue)");
}