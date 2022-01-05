$(document).ready(() => {
var searchBtn = $('.search-button');
var searchInput = $('.search-form input');
searchInput.width(0);
let searchOpen = false; 
searchBtn.click(() => {
    if (searchOpen == false) {
        searchBtn.addClass('open');
        searchInput.addClass('border-input');
        searchInput.width(160);
        searchOpen = true;
        searchInput.focus();
    } else {
        searchBtn.removeClass('open');
        searchInput.removeClass('border-input');
        searchInput.width(0);
        searchOpen = false;
    }
})

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
//Built default function
function transitionAnimation(btn) {
    var thisBtn = $(btn);
    let open = false;
    thisBtn.click(() => {
        if (open == false) {
            thisBtn.addClass('open');
            open = true;
        } else {
            thisBtn.removeClass('open');
            open = false;
        }
    })
}

function showModal(modalName, showButton) {
    $(showButton).click(() => {
        $(modalName).show();
    } )
    let name = modalName.slice(1, modalName.length - 6);
}

function showNewSelect(selectTagName) {
    const name = selectTagName.slice(1, selectTagName.length - 7);
    $(selectTagName).on('change', () => {
        if ($(selectTagName).val() == "new_" + name) {
            $(selectTagName).attr("name", "old_" + name);
            $(selectTagName).attr("required", false);
            $("." +name + "-input").attr("name",name);
            $(".new-" + name + " input").attr("required",true);
            $(".new-" + name).show();
        } else {
            $( "." + name + "-input").attr("name", "old_" + name);
            $(".new-" + name + " input").attr("required",false);
            $(selectTagName).attr("required", true);
            $(selectTagName).attr("name",name);
            $(".new-" + name).hide();
        }
    })
}

var collection_select = $('.collection-select').val();
var shirtOptions = $('.shirtOption');
var trouserOptions = $('.trouserOption');
var accessoryOptions = $('.accessoryOption')
if (collection_select == "Áo") {
    shirtOptions.show();
    trouserOptions.hide();
    accessoryOptions.hide();
} else if (collection_select == "Quần") {
    trouserOptions.show();
    shirtOptions.hide();
    accessoryOptions.hide();
} else if (collection_select == "Phụ kiện") {
    accessoryOptions.show();
    trouserOptions.hide();
    shirtOptions.hide();
}

function showOption(selectTag) {
    let data_option = $(selectTag).attr('data-option');
    if (data_option) {
        $(selectTag).val(data_option);
    }
}

if($('.sale-select').val() == "true") {
    $('.saledPrice-div').show();
    $('.saledPrice').attr("required", true);
}

showOption('.category-select');
showOption('.color-select');

showNewSelect('.color-select');

var starIcon = $('<i></i>');
var halfStar = $('<i></i>');
var noneStar = $('<i></i>').addClass("far fa-star");
halfStar.addClass("fas fa-star-half-alt");
starIcon.addClass("fas fa-star");
$('.is-half').append(halfStar);
$('.is-active').append(starIcon);
$('.is-none').append(noneStar);

$('.collection-select').on('change', () => {
    var categoryValue = $('.collection-select').val();
    if (categoryValue == "Áo") {
        $('.shirtOption').show();
    } else {
        $('.shirtOption').hide();
        document.getElementById("category-select").selectedIndex = "0";
        $('.category-input').hide();
    }
    if (categoryValue == "Quần") {
        $('.trouserOption').show();
    } else {
        $('.trouserOption').hide();
        document.getElementById("category-select").selectedIndex = "0";
        $('.category-input').hide();
    }
    if (categoryValue == "Phụ kiện") {
        $('.accessoryOption').show();
    } else {
        $('.accessoryOption').hide();
        document.getElementById("category-select").selectedIndex = "0";
        $('.category-input').hide();
    }
})

$('.close-logInAndLogOut').click(() => {
    $('.forgetPw').hide();
    $('.signIn').hide();
    $('.logIn').show();
    $('.logInAndLogOut-modal').hide();
})

function showAndHideComponent(button, modalHide) {
    let modalShow = button.slice(0, button.length-5);
    $(button).click(() => {
        $(modalShow).show();
        $(modalHide).hide();
    });
}
// $('.saledPrice-div').hide();
$('.productDiv span').click(() => {
    if ($('.productDropDown').hasClass('show')) {
        $('.productDropDown').removeClass('show');
    } else {
        $('.productDropDown').addClass('show');
    }
})

$("body").click(e => {
    const element = document.getElementById('prdDD')
    const parentElement = document.getElementById('prdDiv');
    let targetElement = e.target;
    do {
        if (targetElement == element || targetElement == parentElement) {
            return;
        }
        targetElement = targetElement.parentNode;
    } while(targetElement)
    element.classList.remove('show');
})
  

$('.type1 p').click(() => {
   $('.type1DropDown').toggle();
   $('.type2DropDown').hide();
   $('.type3DropDown').hide();
})

$('.type2 p').click(() => {
    $('.type1DropDown').hide()
    $('.type2DropDown').toggle();
    $('.type3DropDown').hide();
 })
 $('.type3 p').click(() => {
     $('.type2DropDown').hide();
    $('.type1DropDown').hide()
    $('.type3DropDown').toggle();
 })


$('.category-select').on('change', () => {
    if ($('.category-select').val() == "new_type") {
        $('.category-input').show();
        $('.category-input').attr("required", true);
        $('.category-select').attr("name", "old_type");
        $('.category-input').attr("name", "type");
        
    } else {
        $('.category-input').hide();
        $('.category-input').attr("required", false);
        $('.category-input').attr("name", "old_type");
        $('.category-select').attr("name", "type");
    }
})

$('.sale-select').on('change', () => {
    if ($('.sale-select').val() === "true") {
        $('.saledPrice-div').show();
        $('.saledPrice').attr("required", true);
    } else {
        $('.saledPrice-div').hide();
        $('.saledPrice').attr("required", false);
    }
})


$('.modifyPw-link').click(() => {
    if($('.modifyPw-main').css('display') == 'none') {
    $('.modifyPw-fields').attr("required", true);
    } else {
        $('.modifyPw-fields').attr("required", false);
        $('.modifyPw-fields').val("");
    }
})

$('.sortBySize').click(() => {
    if($('.sortBySize').hasClass('clicked')) {
        $('.sortBySize').removeClass('clicked');
        $('.caret-sbs').removeClass('clicked');
        $('.sortBySizeList').hide();
    } else {
        $('.sortBySize').addClass('clicked');
        $('.caret-sbs').addClass('clicked');
        $('.sortBySizeList').show();
    }
})

$('.sortByCustome').click(() => {
    if($('.sortByCustome').hasClass('clicked')) {
        $('.sortByCustome').removeClass('clicked');
        $('.caret-sbc').removeClass('clicked');
        $('.sortByCustomeList').hide();
    } else {
        $('.sortByCustome').addClass('clicked');
        $('.caret-sbc').addClass('clicked');
        $('.sortByCustomeList').show();
    }
})
$('.height-range').on('input',() => {
    $('.height-range-label').text($('.height-range').val() + "cm");
})

$('.weight-range').on('input',() => {
    $('.weight-range-label').text($('.weight-range').val() + "kg");
})

$('.modifyPw-link').click(() => {
    $('.modifyPw-main').toggle(200);
})

showAndHideComponent('.signIn-link','.logIn');
showAndHideComponent('.logIn-link','.signIn');
showAndHideComponent('.forgetPw-link','.logIn');
showModal('.logInAndLogOut-modal','.userIcon');
});