
// grab data from svg
d3.csv('https://raw.githubusercontent.com/marselgray/senate_map/main/data/data.csv').then(function(data) {


	// grab states
	var states = document.getElementsByClassName('map--state');

	var bargraph = document.getElementById('bar--graph');
	var republicans = [];
	var democrats = [];
	var independents = [];

	// add color code to states
	for(let i = 0; i < data.length; i++){
		// possible outs: 
		// state is R
		if(data[i]['senator_one'] === 'R' && data[i]['senator_two'] === 'R'){
			// console.log(data[i]['state'] + ` has two republican senators`);
			states[i].classList.add('map--red');
			republicans.push('R');
			republicans.push('R');
		} 
		// state is D
		else if (data[i]['senator_one'] === 'D' && data[i]['senator_two'] === 'D') {
			// console.log(data[i]['state'] + ` has two democratic senators`);
			states[i].classList.add('map--blue');
			democrats.push('D');
			democrats.push('D');
		} 
		// state is R and D or state is D and R
		else if ((data[i]['senator_one'] === 'R' && data[i]['senator_two'] === 'D') || (data[i]['senator_one'] === 'D' && data[i]['senator_two'] === 'R')) {
			// console.log(data[i]['state'] + ` has one democratic and one republic senator`);
			states[i].classList.add('map--purple');
			republicans.push('R');
			democrats.push('D');
		} 
		// state is I and R or state is R and I
		else if ((data[i]['senator_one'] === 'R' && data[i]['senator_two'] === 'I') || (data[i]['senator_one'] === 'I' && data[i]['senator_two'] === 'R')) {
			// console.log(data[i]['state'] + ` has one independent and one republic senator`);
			states[i].classList.add('map--green__red');
			republicans.push('R');
			independents.push('I');
		}
		// state is I and D or state is D and I
		else if ((data[i]['senator_one'] === 'D' && data[i]['senator_two'] === 'I') || (data[i]['senator_one'] === 'I' && data[i]['senator_two'] === 'D')) {
			// console.log(data[i]['state'] + ` has one independent and one democratic senator`);
			states[i].classList.add('map--green__blue');
			democrats.push('D');
			independents.push('I');
		}
		else {
			console.log(data[i]['state'] + `examine this state`);
		}
	}

	/*
	calculate the % of seats of republicans and independent and use remainder in linear 
	graident to calculate bar graph
	*/
	var rLength = republicans.length + `%`;
	var iLength = (republicans.length + independents.length) + `%`;
	bargraph.style.background = `linear-gradient(to right, red ${rLength}, green ${rLength} ${iLength}, blue ${iLength} 100%)`;


	// add event listener to states
	for(let i = 0; i < states.length; i++){
		states[i].addEventListener('click', function(){
			console.log(this.attributes[3].value);
		})
	}

});

