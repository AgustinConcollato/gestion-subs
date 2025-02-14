<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email verificado - Gestion Subs</title>
    <link rel="shortcut icon" href="/icon.png" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<style>
    @font-face {
        font-family: 'Ubuntu';
        src: url('/fonts/Ubuntu-Regular.ttf');
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Ubuntu';
    }

    body {
        background: #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    img {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        object-fit: contain;
        width: 120px;
        z-index: -1;
    }

    div {
        background: #fff;
        border-radius: 5px;
        padding: 20px;
        width: 100%;
        max-width: 300px;
        text-align: center;
    }

    i {
        color: rgb(61, 151, 50);
        font-size: 50px;
    }

    h1 {
        font-size: 28px;
        margin: 20px 0 10px;
    }

    button {
        background: #232853;
        border: none;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        font-size: 16px;
        margin: 60px 0 20px;
        padding: 10px;
        width: 100%;
    }
</style>

<body>
    <img src="/logo.png" alt="logo Gestion Subs">
    <div>
        <i class="fa-regular fa-circle-check"></i>
        <h1>¡Email verificado!</h1>
        <p>Tu Email ya está verificado, puedes cerrar esta página.</p>
        <button id="btn-close">Cerrar</button>
    </div>
</body>

<script>
    document.getElementById('btn-close').addEventListener('click', () => {
        window.close();
    });
</script>

</html>