$(document).ready(function() {
    function popTips( t ) {
        $( `<p id=tip>${t}</p>` ).prependTo( 'fieldset' ).addClass( 'ui-state-highlight' );
        $( 'input[name="stringType"]' ).click(() => $( '#tip' ).remove());
    }

    $('#dialog-form').dialog({
        autoOpen: false,
        height: 350,
        width: 350,
        modal: true,
        buttons: {
            '提交': function() {
                if( $( 'input[name="stringType"]' ).is( ':checked' )){
                    let id = $( 'input[name="stringType"]:checked' ).attr( 'id' );
                    $( '#container' ).append(
                        (id === 'text' ? '<textarea name="formElement"></textarea><button class="delete">删除</button><br>' : 
                         id === 'date' ? '<input type="date" name="formElement"><button class="delete">删除</button><br>' : null));
                    $( this ).dialog( 'close' );
                }else{
                    $( 'fieldset' ).has( '#tip' ).length ? null : popTips( '<b>至少选择一种字段类型</b>' );
                }
            },
            '关闭': function() {
                $( this ).dialog( 'close' );
            }
        },
        close: function() { 
            $( '#tip' ).remove();
            $( 'input[name="stringType"]' ).prop( 'checked', false );
        }
    });

    $( '#add' ).button().click(() => $( '#dialog-form' ).dialog( 'open' ));

    $( '#preview' ).button().on('click', function(){
        if($( this ).hasClass( 'active' )){
            $( '#add, .delete' ).show();
            $( this ).text( '预览' ).removeClass( 'active' );
        }else{
            $( '#add, .delete' ).hide();
            $( this ).text( '编辑' ).addClass( 'active' );
        }
    });

    $( '#container' ).on('click', '.delete', function(){
        $( this ).prev().remove().end().next().remove().end().remove();
    });
});