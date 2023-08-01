$(document).ready(function () {

    // toggle code from https://api.jqueryui.com/toggle/
    // scrollTop ensures revealed content is visible - from https://www.geeksforgeeks.org/how-to-scroll-automatically-to-the-bottom-of-the-page-using-jquery/

    $(".toggle").click(function () {
        $(this).siblings("div").toggle("drop");
        $(document).scrollTop($(document).height());
    });

});
