module.exports = (function(){

    function readForm(formID){

        var elements = formID.children('input').not('input[type="submit"]'),
            eleLength = elements.length,
            obj = {};

        for (var i = eleLength - 1; i >= 0; i--){
            var ele = $(elements[i]);
            obj[ele.attr('id')] = ele.val();
        }

        return JSON.stringify(obj);
    }

    // consider fleshing out data proxy for local storage
    function storeData(formID,formData){
        var formName = formID.attr('id').replace('#','');
        /*
        TODO: error check localStorage support
        */
        localStorage[formName] = formData;

    }


    function submitListen(formID){
        $(formID).children('input[type="submit"]').on("click",function(){
            var formData = readForm(formID);
            storeData(formID,formData);
        });
    }

    return {
        init : function(formID){
            submitListen(formID);
        }
    }

})();
