console.log('hi');

d3.csv('https://raw.githubusercontent.com/marselgray/senate_map/main/data/data.csv').then(function(data) {

	for(let i = 0; i < data.length; i++){
		// possible outs: 
		// state is R
		if(data[i]['senator_one'] === 'R' && data[i]['senator_two'] === 'R'){
			console.log(data[i]['state'] + ` has two republican senators`);
			data[i].color = 'state--red';
		} 
		// state is D
		else if (data[i]['senator_one'] === 'D' && data[i]['senator_two'] === 'D') {
			console.log(data[i]['state'] + ` has two democratic senators`);
			data[i].color = 'state--blue';
		} 
		// state is R and D or state is D and R
		else if ((data[i]['senator_one'] === 'R' && data[i]['senator_two'] === 'D') || (data[i]['senator_one'] === 'D' && data[i]['senator_two'] === 'R')) {
			console.log(data[i]['state'] + ` has one democratic and one republic senator`);
			data[i].color = 'state--purple';
		} 
		// state is I and R or state is R and I
		else if ((data[i]['senator_one'] === 'R' && data[i]['senator_two'] === 'I') || (data[i]['senator_one'] === 'I' && data[i]['senator_two'] === 'R')) {
			console.log(data[i]['state'] + ` has one independent and one republic senator`);
			data[i].color = 'state--green__red';
		}
		// state is I and D or state is D and I
		else if ((data[i]['senator_one'] === 'D' && data[i]['senator_two'] === 'I') || (data[i]['senator_one'] === 'I' && data[i]['senator_two'] === 'D')) {
			console.log(data[i]['state'] + ` has one independent and one democratic senator`);
			data[i].color = 'state--green__blue';
		}
		else {
			console.log(data[i]['state'] + `examine this state`);
		}
	}

	console.log(data);

});

