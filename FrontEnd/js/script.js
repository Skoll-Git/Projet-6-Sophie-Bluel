//Script Gallerie
fetch("http://localhost:5678/api/works") 
// Determiner le format de la reponse "json" pour la lecture
.then(function(response) {
	if(response.ok) {
		return response.json();
	}
})
// Second Then pour voir le travail apparaître dans la console
.then(function(data) {
	let works = data;
	console.log(works);
	// Boucle pour chaque travail au lieu d'un for...
	works.forEach(function (work) {
        // Creation de <figure>
        let Figure = document.createElement('figure');
        Figure.setAttribute('class', `work-item category-id-0 category-id-${work.categoryId}`);
        Figure.setAttribute('id', `work-item-${work.id}`);
        // Creation de <img>
        let Img = document.createElement('img');
        Img.setAttribute('src', work.imageUrl);
        Img.setAttribute('alt', work.title);
        Figure.appendChild(Img);
        // Creation de <figcaption>
        let FigCaption = document.createElement('figcaption');
        FigCaption.textContent = work.title;
        Figure.appendChild(FigCaption);
        // Ajouter les nouvelles "figures" dans la div "gallery"
        document.querySelector("div.gallery").appendChild(Figure);
    });
})
// catch pour attrapper les eventuelles erreurs à débogguer
.catch(function(err) {
	console.log(err);
});


//Script Catégorie
fetch("http://localhost:5678/api/categories")
.then(function(response) {
	if(response.ok) {
		return response.json();
	}
})
.then(function(data) {
	let categories = data;
    //unshift pour ajouter la catégorie "Tous" inexistante
	categories.unshift({id: 0, name: 'Tous'});
	console.log(categories);
    // Boucle pour chaque Catégories
	categories.forEach((category, index) => {
		// Creation du <button> filter
		let filterButton = document.createElement('button');
		filterButton.classList.add('work-filter');
		filterButton.classList.add('filters-design');
		if(category.id === 0) filterButton.classList.add('filter-active', 'filter-all');
		filterButton.setAttribute('data-filter', category.id);
		filterButton.textContent = category.name;
		// Ajout des nouveaux boutons dans la div "filters"
		document.querySelector("div.filters").appendChild(filterButton);
		// EventListener pour le boutton du filtre à activer
		filterButton.addEventListener('click', function(event) {
			event.preventDefault();
			// Gestion du filtre actif
			document.querySelectorAll('.work-filter').forEach((workFilter) => {
				workFilter.classList.remove('filter-active');
			});
			event.target.classList.add('filter-active');
			// Gestion des travaux à afficher
			let categoryId = filterButton.getAttribute('data-filter');
			document.querySelectorAll('.work-item').forEach(workItem => {
				workItem.style.display = 'none';
			});
			document.querySelectorAll(`.work-item.category-id-${categoryId}`).forEach(workItem => {
				workItem.style.display = 'block';
			});
		});
	});
})
.catch(function(err) {
	console.log(err);
});

    