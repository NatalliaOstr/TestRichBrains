<?php

if ( !empty( $_FILES ) ) {

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];

    move_uploaded_file($_FILES['newfile']['tmp_name'],'images/'.$_FILES['newfile']['name']);

    $answer = array( 'answer' => 'File transfer completed' );

    echo 'OK';

} else {

    echo 'No files';

}

?>

