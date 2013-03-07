var formReader = (function(){

    function readForm(formID){
        
        var elements = formID.children('input').not('input[type="submit"]'),
            eleLength = elements.length,
            valueArray = new Array();

        for (var i = eleLength - 1; i >= 0; i--) {
            var ele = $(elements[i]);
            valueArray[ele.attr('id')] = ele.val();
        }

        return valueArray;
    }

    function submitListen(formID){
        $(formID).children('input[type="submit"]').on("click",function(){
            console.log(readForm(formID));
            return false;
        });
    }

    return {
        init : function(formID){
            submitListen(formID);
        }
    }

})();

$(document).ready(function(){
    formReader.init($('#recipeForm'));
});

