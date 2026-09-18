document.addEventListener("DOMContentLoaded", () => {

    const projectGrid = document.getElementById("projectGrid");
    const searchInput = document.getElementById("projectSearch");
    const categoryFilter = document.getElementById("categoryFilter");

    if (!projectGrid) {
        return;
    }


    let projects = [];


    // =========================================
    // LOAD PROJECT DATA
    // =========================================

    async function loadProjects() {

        try {

            const response =
                await fetch("data/projects.json");

            if (!response.ok) {
                throw new Error(
                    "Could not load project data."
                );
            }

            projects = await response.json();

            renderProjects(projects);

        } catch (error) {

            console.error(error);

            projectGrid.innerHTML = `
                <div class="project-error">

                    <h3>
                        Projects could not be loaded
                    </h3>

                    <p>
                        Please check the project data file.
                    </p>

                </div>
            `;

        }

    }


    // =========================================
    // RENDER PROJECTS
    // =========================================

    function renderProjects(projectList) {

        projectGrid.innerHTML = "";


        // No projects found
        if (projectList.length === 0) {

            projectGrid.innerHTML = `
                <div class="project-empty">

                    <h3>
                        No projects found
                    </h3>

                    <p>
                        Try changing your search or filter.
                    </p>

                </div>
            `;

            return;
        }


        // Create project cards
        projectList.forEach(project => {

            const card =
                document.createElement("article");

            card.className = "project-card";


            // =========================================
            // PROJECT IMAGE
            // =========================================

            const imagePath =
                project.images &&
                project.images.length > 0
                    ? project.images[0]
                    : null;


            card.innerHTML = `

                <div class="project-image">

                    ${
                        imagePath
                        ?

                        `
                        <img
                            src="${imagePath}"
                            alt="${project.name}"
                            loading="lazy"
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


                <div class="project-card-content">

                    <span class="project-category">
                        ${project.category}
                    </span>


                    <h3>
                        ${project.name}
                    </h3>


                    <div class="project-meta">

                        <span>
                            ${project.location}
                        </span>

                        <span>
                            ${project.capacity}
                        </span>

                    </div>


                    <p>
                        ${project.description}
                    </p>


                    <div class="project-card-footer">

                        <span>
                            ${project.systemType}
                        </span>


                        <a
                            href="project-details.html?id=${project.id}"
                            class="project-link"
                        >
                            View Project →
                        </a>

                    </div>

                </div>

            `;


            projectGrid.appendChild(card);

        });

    }


    // =========================================
    // SEARCH & FILTER
    // =========================================

    function filterProjects() {

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();


        const category =
            categoryFilter.value;


        const filteredProjects =
            projects.filter(project => {

                const searchableText = `
                    ${project.name}
                    ${project.client}
                    ${project.location}
                    ${project.capacity}
                    ${project.category}
                    ${project.systemType}
                    ${project.description}
                `.toLowerCase();


                const matchesSearch =
                    searchableText.includes(
                        searchTerm
                    );


                const matchesCategory =
                    category === "All" ||
                    project.category === category;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            });


        renderProjects(filteredProjects);

    }


    // =========================================
    // SEARCH EVENT
    // =========================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterProjects
        );

    }


    // =========================================
    // CATEGORY FILTER EVENT
    // =========================================

    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            filterProjects
        );

    }


    // =========================================
    // START
    // =========================================

    loadProjects();

});