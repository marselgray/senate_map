
// grab data from svg
d3.csv('https://raw.githubusercontent.com/marselgray/senate_map/main/data/data.csv').then(function(data) {

	// grab states
	var states = document.getElementsByClassName('map--state');

	for(let i = 0; i < data.length; i++){
		// possible outs: 
		// state is R
		if(data[i]['senator_one'] === 'R' && data[i]['senator_two'] === 'R'){
			// console.log(data[i]['state'] + ` has two republican senators`);
			states[i].classList.add('map--red');
		} 
		// state is D
		else if (data[i]['senator_one'] === 'D' && data[i]['senator_two'] === 'D') {
			// console.log(data[i]['state'] + ` has two democratic senators`);
			states[i].classList.add('map--blue');
		} 
		// state is R and D or state is D and R
		else if ((data[i]['senator_one'] === 'R' && data[i]['senator_two'] === 'D') || (data[i]['senator_one'] === 'D' && data[i]['senator_two'] === 'R')) {
			// console.log(data[i]['state'] + ` has one democratic and one republic senator`);
			states[i].classList.add('map--purple');
		} 
		// state is I and R or state is R and I
		else if ((data[i]['senator_one'] === 'R' && data[i]['senator_two'] === 'I') || (data[i]['senator_one'] === 'I' && data[i]['senator_two'] === 'R')) {
			// console.log(data[i]['state'] + ` has one independent and one republic senator`);
			states[i].classList.add('map--green__red');
		}
		// state is I and D or state is D and I
		else if ((data[i]['senator_one'] === 'D' && data[i]['senator_two'] === 'I') || (data[i]['senator_one'] === 'I' && data[i]['senator_two'] === 'D')) {
			// console.log(data[i]['state'] + ` has one independent and one democratic senator`);
			states[i].classList.add('map--green__blue');
		}
		else {
			console.log(data[i]['state'] + `examine this state`);
		}
	}


	for(let i = 0; i < states.length; i++){
		states[i].addEventListener('click', function(){
			console.log(this.attributes[3].value);
		})
	}

});

