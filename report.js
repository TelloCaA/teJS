(function() {
    'use strict';
    if(AML!=undefined){
        var reportes = new Array();
        for(var i = 0; i< AML.Comments.config.data.comments.length; i++){
            for(var x = 0; x< AML.Comments.config.data.comments[i].abuse_users.length; x++){
                reportes.push({ 'usuarioId' : AML.Comments.config.data.comments[i].id, 'abuseId':AML.Comments.config.data.comments[i].abuse_users[x]});
                $('#c'+AML.Comments.config.data.comments[i].id+'').css('border','2px solid #800000');
            }
        }
        for(var j = 0; j<reportes.length; j++){
            markComment(reportes[j])
        }
    }

    function markComment(reporte){
        var url2 = '/auth/api/user/'+reporte.abuseId+'/comments';
             $.ajax({
                url: url2,
                type: 'GET',
                success: function(respuesta) {
                    
                    if(respuesta.comments !=undefined && respuesta.comments.length>0){
                        $('#c'+reporte.usuarioId+'').find('.comment-content').prepend('<span ><a style="color:#800000;text-decoration: none;" href="#usuario/'+respuesta.comments[0].comment_author+'">[Reportado por: '+respuesta.comments[0].comment_author+']</a></span>');
                    }else{
                        $('#c'+reporte.usuarioId+'').find('.comment-content').prepend('<span ><a style="color:#800000;text-decoration: none;" href="/auth/api/user/'+reporte.abuseId+'/comments">[Reportado por: '+reporte.abuseId+']</a></span>');
                    }
                },
                error: function(error) {
                    console.log(error);
                    console.log("No se ha podido obtener la información");
                }
            });
    }
})();