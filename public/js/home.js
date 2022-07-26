$(document).ready( function () {
    $('#table').DataTable({
        processing : true,
        serverSide : true,
        serverMethod : 'post',
        ajax : {
            url : '/'
        },
        aaSorting : [],
        columns : [
            { data : 'categories'},
            { data : 'companies'},
            { data : 'models'}
        ]
    });
} );