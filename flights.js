fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/DAL-sky/PHX-sky/anytime/anytime", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "ef0e508b02mshb7290647be2287ep1cc798jsnd7558781a3a5",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	}
})
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
        console.log(data);
        // data.Places.forEach(place=>{
        //   console.log(place);
        //
        // })
      })
