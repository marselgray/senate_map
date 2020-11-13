window.addEventListener('load', function() {
	loadData();
});


function loadData(){
	// grab data from svg
	d3.csv('https://raw.githubusercontent.com/marselgray/senate_map/main/data/data.csv').then(function(data) {

		// grab states
		var states = document.getElementsByClassName('map--state');

		var bargraph = document.getElementById('bar--graph');
		var republicans = [];
		var democrats = [];
		var independents = [];

		// add color code to states
		let i = 0;
		data.map(function(item){
			// possible outs: 
			// state is R
			if(item['senator_one'] === 'R' && item['senator_two'] === 'R'){
				// console.log(item['state'] + ` has two republican senators`);
				states[i].classList.add('map--red');
				republicans.push('R');
				republicans.push('R');
			} 
			// state is D
			else if (item['senator_one'] === 'D' && item['senator_two'] === 'D') {
				// console.log(item['state'] + ` has two democratic senators`);
				states[i].classList.add('map--blue');
				democrats.push('D');
				democrats.push('D');
			} 
			// state is R and D or state is D and R
			else if ((item['senator_one'] === 'R' && item['senator_two'] === 'D') || (item['senator_one'] === 'D' && item['senator_two'] === 'R')) {
				// console.log(item['state'] + ` has one democratic and one republic senator`);
				states[i].classList.add('map--purple');
				republicans.push('R');
				democrats.push('D');
			} 
			// state is I and R or state is R and I
			else if ((item['senator_one'] === 'R' && item['senator_two'] === 'I') || (item['senator_one'] === 'I' && item['senator_two'] === 'R')) {
				// console.log(item['state'] + ` has one independent and one republic senator`);
				states[i].classList.add('map--green__red');
				republicans.push('R');
				independents.push('I');
			}
			// state is I and D or state is D and I
			else if ((item['senator_one'] === 'D' && item['senator_two'] === 'I') || (item['senator_one'] === 'I' && item['senator_two'] === 'D')) {
				// console.log(item['state'] + ` has one independent and one democratic senator`);
				states[i].classList.add('map--green__blue');
				democrats.push('D');
				independents.push('I');
			}
			else {
				console.log(item['state'] + `examine this state`);
			}

			i++;
		});


		/*
		calculate the % of seats of republicans and independent and use remainder in linear 
		graident to calculate bar graph
		*/
		var rLength = republicans.length + `%`;
		var iLength = (republicans.length + independents.length) + `%`;
		bargraph.style.background = `linear-gradient(to right, red ${rLength}, green ${rLength} ${iLength}, blue ${iLength} 100%)`;


		/*
		add event listener to state to fetch senator 
		information from google civic api
		*/
		var API_KEY = 'AIzaSyDtSK9ypmcfip8v2gZb8dhJYpIxqgLVwJI';
		var senators;
		var arrStates = Array.prototype.slice.call(states);


		arrStates.map(function(item){
			item.addEventListener('click', function(){

				let display = document.getElementById('senator--display');
				let address = this.attributes[3].value;
				var url = `https://www.googleapis.com/civicinfo/v2/representatives?address=${address}&includeOffices=true&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody&key=${API_KEY}`;

				fetch(url)
					.then(res => res.json())
					.then(data => senators = data)
					.then(function(){

						if(display){
							display.remove();
							document.getElementById('bar').insertAdjacentHTML('afterend', `<section id='senator--display' class="sentor"></section>`);
							addInformation();
						} else {
							addInformation();
						}


						// displays senator information
						function addInformation(){
							display = document.getElementById('senator--display');
							let title = `
								<h3 class="senator--heading">
									The Senators for ${address}:
								</h3>
								<div class="senator--container"></div>`;
							display.insertAdjacentHTML('afterbegin', title);

							senators['officials'].map(function(sen){
								// console.log(sen);
			
								let phoneNumber = sen['phones'][0];
								phoneNumber = phoneNumber.replace(/\s+/g, '');

								let img = sen['photoUrl'];
								/* 
								google civic serves images as http
								so pull from congress link if its from the bio guides
								nor do all senators have photos on the api apparently
								*/
								if (img) {
									if (img.slice(0,15) === 'http://bioguide'){
										let bioID = img.slice(46,53);
										img = `https://theunitedstates.io/images/congress/225x275/${bioID}.jpg`
									} else {
										img = img;
									}
								} else {
									img = './avatar.jpg'
								}
				
								let senatorInfo = `
								<div>
									<p class="senator--item">${sen['name']}</p>
									<p class="senator--item">${sen['party']}</p>
									<img class='senator--img' src="${img}" alt="Photo of ${sen['name']}" loading="lazy">
									<a href="${sen['urls'][0]}" class="senator--item" target="_blank" rel="noreferrer noopener" aria-label="This is an external link (opens in a new tab)">Website</a>
									<a href="https://twitter.com/${sen['channels'][1]['id']}" class="senator--item" target="_blank" rel="noreferrer noopener" aria-label="This is an external link (opens in a new tab)">Twitter</a>
									<a href="tel:${phoneNumber}" class="senator--item">DC Office Phone Number</a>
								</div>
								`;
								document.getElementsByClassName('senator--container')[0].insertAdjacentHTML('beforeend', senatorInfo);
							})
						}
					})
			})
		})
	});
}



