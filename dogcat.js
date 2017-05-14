var dog={
		raining:true,
		noise:'Woff',
		makeNoise:function({
			if (this.raining===true){console.log(dog.noise)
			})

var cat = {
		raining:false,
		noise:'Meow!',
		makeNoise:function({
			if (this.raining===true){
				console.log(cat.noise)
			})
}
console.log(dog.makeNoise);
console.log(cat.makeNoise);



