<?php 
    include_once './views/header.php'; 

    include_once './views/openView.php';

    include_once './views/navBar.php';
?>

<section class="mainContainer" id="firstMain">
    <?php include_once './views/about.php'; ?>
</section>

<div style="width: 100%; background-color: #F5F5F5; overflow-x: hidden;">
    <section class="mainContainer" id="projectsContainer">
        <?php include_once './views/projects.php'; ?>
    </section>
</div>

<section class="mainContainer">
    <?php include_once './views/abilities.php'; ?>
</section>

<div style="width: 100%; background-color: #252934; overflow-x: hidden;
clip-path: polygon(0 0, 50% 10%, 100% 0, 100% 100%, 0 100%); ">
    <section class="mainContainer">
        <?php include_once './views/contact.php'; ?>
    </section>
</div>

<div style="width: 100%; background-color: #1B242F; overflow-x: hidden; ">
    <section id="footer">
        <p>luke courtney ©<?php date("Y"); ?></p>
    </section>
</div>

<div id="upArrow">
    <i class="fas fa-chevron-up"></i>
    <i class="fas fa-chevron-up"></i>
</div>

<?php include_once './views/footer.php'; ?>