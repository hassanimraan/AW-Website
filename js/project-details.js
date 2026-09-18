document.addEventListener("DOMContentLoaded", () => {

    const projectDetails =
        document.getElementById("projectDetails");

    const projectTitle =
        document.getElementById("projectTitle");

    const projectSubtitle =
        document.getElementById("projectSubtitle");


    if (!projectDetails) {
        return;
    }


    // =========================================
    // GET PROJECT ID FROM URL
    // =========================================

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const projectId =
        urlParams.get("id");


    // =========================================
    // LOAD PROJECT
    // =========================================

    async function loadProject() {

        try {

            if (!projectId) {

                throw new Error(
                    "No project ID was provided."
                );

            }


            const response =
                await fetch("data/projects.json");


            if (!response.ok) {

                throw new Error(
                    "Could not load project data."
                );

            }


            const projects =
                await response.json();


            const project =
                projects.find(
                    item => item.id === projectId
                );


            if (!project) {

                showError(
                    "Project not found",
                    "The requested project could not be found."
                );

                return;

            }


            renderProject(project);


        } catch (error) {

            console.error(error);


            showError(
                "Project could not be loaded",
                "Please check the project information and try again."
            );

        }

    }


    // =========================================
    // RENDER PROJECT
    // =========================================

    function renderProject(project) {

        // Browser tab title
        document.title =
            `${project.name} | AW Technologies`;


        // Hero title
        projectTitle.textContent =
            project.name;


        // Hero subtitle
        projectSubtitle.textContent =
            `${project.client} | ${project.location}`;


        // =========================================
        // PROJECT IMAGES
        // =========================================

        const images =
            Array.isArray(project.images)
                ? project.images
                : [];


        const mainImage =
            images.length > 0
                ? images[0]
                : null;


        let galleryHTML = "";


        // =========================================
        // GALLERY
        // =========================================

        if (images.length > 1) {

            galleryHTML = `

                <div class="project-gallery">

                    ${images
                        .slice(1)
                        .map((image, index) => `

                            <div
                                class="project-gallery-item"
                            >

                                <img
                                    src="${image}"
                                    alt="${project.name} - Project Image ${index + 2}"
                                    loading="lazy"
                                    onerror="
                                        this.style.display='none';
                                        this.parentElement.innerHTML=
                                        '<div class=&quot;project-image-placeholder&quot;>Solar PV</div>';
                                    "
                                >

                            </div>

                        `)
                        .join("")
                    }

                </div>

            `;

        }


        // =========================================
        // MAIN CONTENT
        // =========================================

        projectDetails.innerHTML = `

            <div class="project-detail-layout">


                <!-- LEFT SIDE -->

                <div class="project-detail-main">


                    <!-- MAIN PROJECT IMAGE -->

                    <div class="project-detail-image">

                        ${
                            mainImage

                            ?

                            `
                            <img
                                src="${mainImage}"
                                alt="${project.name}"
                                onerror="
                                    this.style.display='none';
                                    this.parentElement.innerHTML=
                                    '<div class=&quot;project-image-placeholder&quot;>Solar PV</div>';
                                "
                            >
                            `

                            :

                            `
                            <div class="project-image-placeholder">
                                Solar PV
                            </div>
                            `
                        }

                    </div>


                    <!-- ADDITIONAL PROJECT IMAGES -->

                    ${galleryHTML}


                    <!-- PROJECT DESCRIPTION -->

                    <div class="project-detail-description">

                        <span class="project-category">
                            ${project.category}
                        </span>


                        <h2>
                            Project Overview
                        </h2>


                        <p>
                            ${project.description}
                        </p>

                    </div>


                </div>


                <!-- RIGHT SIDE -->

                <aside class="project-detail-sidebar">


                    <!-- PROJECT INFORMATION -->

                    <div class="project-info-panel">

                        <h3>
                            Project Information
                        </h3>


                        <div class="project-info-row">

                            <span>
                                Client
                            </span>

                            <strong>
                                ${project.client}
                            </strong>

                        </div>


                        <div class="project-info-row">

                            <span>
                                Location
                            </span>

                            <strong>
                                ${project.location}
                            </strong>

                        </div>


                        <div class="project-info-row">

                            <span>
                                Capacity
                            </span>

                            <strong>
                                ${project.capacity}
                            </strong>

                        </div>


                        <div class="project-info-row">

                            <span>
                                Project Type
                            </span>

                            <strong>
                                ${project.category}
                            </strong>

                        </div>


                        <div class="project-info-row">

                            <span>
                                System Type
                            </span>

                            <strong>
                                ${project.systemType}
                            </strong>

                        </div>

                    </div>


                    <!-- CTA -->

                    <div class="project-sidebar-cta">

                        <h3>
                            Have a Similar Project?
                        </h3>


                        <p>
                            Talk to our team about your
                            solar PV requirements.
                        </p>


                        <a
                            href="contact.html"
                            class="btn btn-primary"
                        >
                            Contact Us
                        </a>

                    </div>


                </aside>


            </div>

        `;

    }


    // =========================================
    // ERROR MESSAGE
    // =========================================

    function showError(title, message) {

        projectTitle.textContent =
            "Project Details";


        projectSubtitle.textContent =
            "";


        projectDetails.innerHTML = `

            <div class="project-error">

                <h2>
                    ${title}
                </h2>


                <p>
                    ${message}
                </p>


                <a
                    href="projects.html"
                    class="btn btn-primary"
                >
                    Back to Projects
                </a>

            </div>

        `;

    }


    // =========================================
    // START
    // =========================================

    loadProject();

});