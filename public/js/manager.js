
$(function() {
    $(".leftsidebar_box dt").css({
        "background-color": "#929496"
    });
    $(".leftsidebar_box dt img").attr("src", "image/select_xl01.png");
    $(".leftsidebar_box dd").hide();
    $(".leftsidebar_box dt").click(function() {
        $(".leftsidebar_box dt").css({
            "background-color": "#929496"
        })
        $(this).css({
            "background-color": "#566169"
        });
        $(this).parent().find('dd').removeClass("menu_chioce");
        $(".leftsidebar_box dt img").attr("src", "image/select_xl01.png");
        $(this).parent().find('img').attr("src", "image/select_xl.png");
        $(".menu_chioce").slideUp();
        $(this).parent().find('dd').slideToggle();
        $(this).parent().find('dd').addClass("menu_chioce");
    });
})