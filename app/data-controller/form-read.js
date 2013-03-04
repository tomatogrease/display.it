var formReader = (function(){

    function readForm(formID){
        var elements = formID.children('input');
        for (var i = elements.length - 1; i >= 0; i--) {
            console.log($(elements[i]).attr("id");       
        };
    }
    
    return {
        init : function(formID){
            readForm(formID);
        }
    }

})();

$(document).ready(function(){
    formReader.init($('#recipeForm'),'input');
});
