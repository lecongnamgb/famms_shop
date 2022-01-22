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

$('.main_img-input').val($('.first-side-img img').attr("src"));

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

var src_firstSideImg = $('.first-side-img img').attr('src');

$('.product_main_img img').attr("src", src_firstSideImg);

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

$('.payment-method-body').click((e) => {
   let radioUnChecked = $(".paymentMethod-body input[type='radio']");
   parentUnchecked = radioUnChecked.parent().parent();
   parentUnchecked.removeClass('checked-input');
   let radioChecked = $(".paymentMethod-body input[type='radio']:checked");
   let parentRadio = radioChecked.parent().parent();
   parentRadio.addClass('checked-input');
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

$('.color-list img').click((e) => {
    let colorValue = $(e.target).attr("value");
    $('.color-input').val(colorValue);
    let parentNode = $(e.target.parentNode);
    $('.color-list').removeClass("chosen-color");
    parentNode.addClass("chosen-color")
    
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

$('.plus').click(() => {
    let value = $('.quantity-input').val();
    value = parseInt(value);
    value++;
    $('.quantity-input').val(value);
    if (value == 1) {
    var price = Number($('.sellPrice').text().slice(0, $('.sellPrice').text().length-5)) * Number($('.quantity-input').val());
    } else {
        var price = Number($('.gt_double_price').text()) * Number($('.quantity-input').val());
    }
    $('.price-input').val(price);
})

$('.minus').click(() => {
    let value = $('.quantity-input').val();
    value = parseInt(value);
    if(value > 1) {
        value--;
    }
    $('.quantity-input').val(value);
    if (value == 1) {
        var price = Number($('.sellPrice').text().slice(0, $('.sellPrice').text().length-5)) * Number($('.quantity-input').val());
    } else {
        var price = Number($('.gt_double_price').text()) * Number($('.quantity-input').val());
    }
    $('.price-input').val(price);
})

var price = Number($('.sellPrice').text().slice(0, $('.sellPrice').text().length-5));
    $('.price-input').val(price);

$('.logIn-button').click(() => {
    fetch()
})

$('.size-list').click((e) => {
    let value = $(e.target).attr("value");
    $('.size-input').val(value);
    $('.size-list').removeClass('check-size');
    $(e.target).addClass("check-size");
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

var productId;

function showAndHide(modal, showLink, hideLink) {
    $(showLink).click((e) => {
        $(modal).show();
        productId = $(e.target).attr('data-id');
    })
    $(hideLink).click(() => {
        $(modal).hide();
    })
}

$('.delete-button').click(() => {
    let formAction = "/admin/manage/" + productId + "?_method=DELETE";
    $('.delete-form').attr("action",formAction);
    $('.delete-form').submit();
})
$('.deletePermanently-button').click(() => {
    let formAction = "/admin/garbage/" + productId + "/forceDelete?_method=DELETE";
    $('.deletePermanently-form').attr("action", formAction);
    $('.deletePermanently-form').submit();
})

$('.side-img img').click( (e) => {
    let src = $(e.target).attr("src");
    $('.product_main_img img').attr("src", src);
    if ($('.side-img img').hasClass('show-up')) {
        $('.side-img img').removeClass('show-up');
    }
    $(e.target).addClass('show-up');
})

$('.color-input').val(
    $('.chosen-color img').attr("value")
)

var priceProduct = $('.priceProduct');
var totalPrice = 0;
for (var i = 0; i < priceProduct.length; i++) {
    var priceEachProduct = priceProduct[i].innerHTML;
    totalPrice += Number(priceEachProduct.slice(0,priceEachProduct.length - 5));
}
$('.product-fee').text(totalPrice + ".000đ");

if (totalPrice > 300) {
    $('.ship-fee').text('0đ');
    var product_discount = Math.floor(totalPrice * 0.2);
    $('.product-discount').text(product_discount + ".000đ");
} else {
    $('.ship-fee').text('25.000đ');
    $('.product-discount').text('0đ');
}

var product_fee = Number($('.product-fee').text().slice(0,$('.product-fee').text().length - 5));
var ship_fee = Number($('.ship-fee').text().slice(0,$('.ship-fee').text().length - 5));
var discount_fee = Number($('.product-discount').text().slice(0, $('.product-discount').text().length - 5 ));
$('.total-fee').text(product_fee + ship_fee - discount_fee + ".000đ");

showAndHide('.alert-modal','.delete-link','.cancel-delete');
showAndHide('.alert-modal','.delete-permanently-link','.cancel-delete');

showAndHideComponent('.signIn-link','.logIn');
showAndHideComponent('.logIn-link','.signIn');
showAndHideComponent('.forgetPw-link','.logIn');
showModal('.logInAndLogOut-modal','.userIcon');


});