		/*jshint esversion: 6 */
       
		let searchFlight = document.getElementById("searching");   

		searchFlight.addEventListener('click', function(e) { 
			let departFrom = document.getElementById("dep-from").value;
			let departTo = document.getElementById("dep-to").value;
			let departF = departFrom.slice(0,3);
			let departT = departTo.slice(0,3);
			let leaveDate = document.getElementById("leave-date").value;
			let returnDate = document.getElementById("return-date").value;
			let departHeader = document.getElementById("depart-header");
			let containMe = document.querySelector(".container");
			let searchForm = document.getElementById("search-form");
			let returnHeader = document.getElementById("return-header");
			let departDateHeader = document.getElementById("departdate-header");
			let returnDateHeader = document.getElementById("returndate-header");
		
			  e.preventDefault();
				fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${departF}-sky/${departT}-sky/${leaveDate}/${returnDate}`, {
					"method": "GET",
					"headers": {
						"x-rapidapi-key": "ef0e508b02mshb7290647be2287ep1cc798jsnd7558781a3a5",
						"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
						"mode": "no-cors",
					}
				})
			.then(function(response) {
				if(response.ok){
				 return response.json();
			} else{ 
				alert("Please select another route and time");
						document.location='https://www.antonio-b.tech/flights';
			}
		  })
				.then(function(data) {
					if (!data.Quotes || !data || !data.Carriers.length){
						alert("Please select another route and time ");
						document.location='https://www.antonio-b.tech/flights';
					}
					 console.log(data.Carriers);
					 searchForm.style.opacity = 0;
					 searchForm.style.height = 0;
					 searchForm.style.transition = ".5s";
					 containMe.style.opacity = 1;
					 containMe.style.transition = ".5s";
					 containMe.style.marginTop = 0;
					 departHeader.innerHTML= departF;
					 returnHeader.innerHTML = departT;
					 departDateHeader.innerHTML = leaveDate;
					 returnDateHeader.innerHTML = returnDate;
					

					
				   
							// for(let i = 0; i < data.Quotes.length; i++){
							// // 	let newFlight = document.getElementById("newflight");
							// // 	newFlight.innerHTML = data.Carriers[0].Name;
							// console.log(data.Carriers[0].Name);
							// //   console.log(data.Quotes[i].InboundLeg);
							// //     console.log(data.Quotes[i].InboundLeg.CarrierIds);
							// //      console.log(data.Quotes[i].InboundLeg.DepartureDate);
							// //       console.log(data.Quotes[i].InboundLeg.DestinationId);
							// //       console.log(data.Quotes[i].InboundLeg.OriginId);
							// //  console.log(data.Quotes[i].MinPrice);
							// }

});
});//Searchflightfunction

		let modifyButton = document.getElementById("modify-button");
			modifyButton.addEventListener('click', function(){
			document.location='https://www.antonio-b.tech/flights';
	  });


	/* flight search form plugin
	// https://codepen.io/carloDev/pen/ZqWaRq
	/*jshint esversion: 6 */

	let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	let dateObj = new Date();
	let month = dateObj.getMonth();
	let currMonth = dateObj.getMonth();
	let year = dateObj.getFullYear();
	let currYear = dateObj.getFullYear();
	let tDate = dateObj;
	let stayOpen = false;
	let pickedDate = '';
	let table = _('cal');
	let cal = _('calender');
	let xhr = new XMLHttpRequest();
	let fromTo = 'from';

	function _(id) {
	  return document.getElementById(id);
	}

	function addZero(d) {
	  if (d < 10) return '0' + d;
	  return d;
	}

	function convertDate(d) {
	  var ts = new Date(d).toString();
	  ts = ts.substr(0, 15);
	  // console.log(ts);
	  return ts;
	}

	function positionCalender(box) {
	  let boxPos = _('search-form').getBoundingClientRect(),
		leaveBoxPos = _('leave-date').getBoundingClientRect(),
		returnBoxPos = _('return-date').getBoundingClientRect(),
		leaveTopPos = leaveBoxPos.top - boxPos.top,
		leaveLeftPos = leaveBoxPos.left - boxPos.left,
		returnTopPos = returnBoxPos.top - boxPos.top,
		returnLeftPos = returnBoxPos.left - boxPos.left;

	  if (box === 'leave-date') {
		cal.style.top = (leaveTopPos + 32) + 'px';
		cal.style.left = (leaveLeftPos) + 'px';
	  }
	  if (box === 'return-date') {
		cal.style.top = (returnTopPos + 32) + 'px';
		cal.style.left = (returnLeftPos) + 'px';
	  }
	}
	
	function toggleReturnBox(btn) {
		 let box1 = _('return-box');
		  // console.log(this.checked);
		  if (btn == 'return') {
			box1.style.opacity = 1;
		  }else if (btn == 'one-way') {//changed to else if 
			box1.style.opacity = 0;
		  }
		}

	function showCalender() {
	  cal.style.opacity = 1;
	  cal.style.pointerEvents = "auto";
	  stayOpen = true;
	  pickedDate = this.id;
	  positionCalender(pickedDate);
	}

	function hideCalender() {
	  if (!stayOpen) {
		cal.style.opacity = 0;
		cal.style.pointerEvents = 'none';
	  }
	}

	function fetchDate() {
	  let td = this.getAttribute('data-date');
	  if (pickedDate == 'leave-date') {
		_('leave-date').setAttribute('value', td);
	  }
	  if (pickedDate == 'return-date') {
		_('return-date').value = td;
	  }
	  stayOpen = false;
	  hideCalender();
	 // console.log("check one");
	}
	
function getCellDate() {
	  var tds = document.querySelectorAll('tbody td'),
		i;
	  for (i = 0; i < tds.length; i++) {
		let btn = tds[i];
	    btn.addEventListener('click', fetchDate);
	   }
	}
	
	function calender(month, year) {
	   
	  let today = dateObj.getDate();
	  let firstDay = new Date(year, month, 1);
	  let startDay = firstDay.getDay();
	  let weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	  var monthLength = new Date(year, month + 1, 0).getDate();
	  let html = '';
	  let dd;

	  // DAYS OF WEEK HEADER
	  html += '<tr>';
	  for (let i = 0; i < weekDays.length; i++) {
		html += '<td>' + weekDays[i] + '</td>';
	  }
	  html += '</tr>';
	   
	  // CALENDAR PART
	  var count = 0; // count of table's <td> cells
	  if (startDay !== 0) { // Leave these cells blank
		html += "<tr><td colspan='" + startDay + "'></td>";
		count = startDay;
	  }
	  for (var day = 1; day <= monthLength; day++) {
			   
		if (count % 7 === 0) { // new table row
		  html += "<tr>";
		}
			
		dd = addZero(year) + '-' + addZero(month + 1) + '-' + day;

		if (count < today && month == currMonth || year < currYear) {
		  html += "<td class='closed' data-date=" + dd + ">" + day + "</td>";
		} else {
		  html += "<td class='normal' data-date=" + dd + ">" + day + "</td>";
		}

		count++;
		if (count % 7 === 0) {
		  html += "</tr>";
		}
	  }
	  var blankCells = 7 - count % 7;
	  if (blankCells < 7) {
		html += "<td colspan='" + blankCells + "'></td></tr>";
	  }

	  table.innerHTML = html;
		
	  getCellDate();
	}


function trackMonth(dir) {
	'use strict';
	  if (dir == 'prev') month -= 1;
	  if (dir == 'next') month += 1;
	  if (month > 11) {
		month = 0;
		year += 1;
	  }
	  if (month < 0) {
		month = 11;
		year -= 1;
	  }
	  _('month').innerHTML = months[month];
	  _('year').innerHTML = year;
	  calender(month, year);
	}
	

			
			_('month').innerHTML = months[month];
			_('year').innerHTML = year;
			_('prev').addEventListener('click', () => trackMonth('prev'));
			_('next').addEventListener('click', () => trackMonth('next'));

			// _('dep-to').addEventListener('focus', () => whichCityBox('to'));
			_('one-way').addEventListener('click', () => toggleReturnBox('one-way'));
			_('return').addEventListener('click', () => toggleReturnBox('return'));
			_('leave-date').addEventListener('focus', showCalender);
			_('leave-date').addEventListener('blur', hideCalender);
			_('return-date').addEventListener('focus', showCalender);
			_('return-date').addEventListener('blur', hideCalender);
					

			calender(month, year);
			positionCalender('leave-date');

			//autocomplete plugin JS for airport name input
			AirportInput("dep-from");
			AirportInput("dep-to");





// {CarrierId: 851, Name: "Alaska Airlines"}
// 1: {CarrierId: 1065, Name: "Frontier Airlines"}
// 2: {CarrierId: 1793, Name: "United"}