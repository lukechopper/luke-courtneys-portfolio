<?php include_once './data/projectsData.php'; ?>

<div class="project-background">
<section class="main-container main-container--project-container">
<section class="project-section">
    <h1 class="header project-section__header">
        Projects
    </h1>
    <div class="underline project-section__underline"></div>
    <div class="project-section__gallery-header">
        <ul class="project-section__un-list">
            <li id="all" class="project-section__gallery-header-item project-section__gallery-header-item--selected">all</li>
            <li id="react" class="project-section__gallery-header-item">react</li>
            <li id="frontend" class="project-section__gallery-header-item">frontend</li>
            <li id="backend" class="project-section__gallery-header-item">backend</li>
        </ul>
        <div class="project-section__selector"></div>
    </div>
    <!--BEGIN GALLERY SECTION-->
    <div class="project-section__gallery-container">
        <?php 
        foreach ($projectsData as $galleryContainer){
            echo '<div class="project-section__gallery-container-item" type="'.$galleryContainer['type'].'" id="'.$galleryContainer['id'].'">
            <section class="project-section__gallery-container-item-section">
            <div class="project-section__gallery-container-item-content">
                <div class="project-section__gallery-container-gallery-header">
                    <h1 class="project-section__gallery-container-item-header">'.$galleryContainer['title'].'</h1>
                    <p class="project-section__gallery-container-item-paragraph" >'.$galleryContainer['tech'].'</p>
                </div>
                <div class="project-section__gallery-container-btn">learn more</div>
            </div>
            <img class="project-section__gallery-container-img" src="'.$galleryContainer['img'].'" alt="Zg3aqZ.jpg" />
            <div class="project-section__gallery-container-overlay"></div>
            </section>
        </div>';
        }
        ?>
    </div>
</section>
</section>
</div>