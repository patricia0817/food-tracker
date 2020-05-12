var ctx = document.getElementById( 'pieChart' );
var myPieChart = new Chart( ctx, {
  type: 'pie',
  data: {
    labels: [ 'Carbs', 'Protein', 'Fat' ],
    datasets: [ {
      data: [ 12, 19, 3 ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],


      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1
    } ]
  },
  options: {
    scales: {
      yAxes: [ {
        ticks: {
          beginAtZero: true
        }
      } ]
    }
  }
} );

var ctx = document.getElementById( 'lineChart' );
var myLineChart = new Chart( ctx, {
  type: 'line',
  data: {
    labels: [ '02/13', '02/27', '03/12', '04/09', '04/23', '05/7' ],
    datasets: [ {
      fill: false,
      label: 'Last 3 Months',
      data: [ 12, 19, 3, 5, 2, 3 ],
      backgroundColor: 'rgba(54, 162, 235, 1)',
      borderColor: [
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1
    } ]
  },
  options: {
    scales: {
      yAxes: [ {
        ticks: {
          beginAtZero: true
        }
      } ]
    }
  }
} );

const macrosSelected = document.querySelector( '.macros-selected' );
const kcalSelected = document.querySelector( '.kcal-selected' );
const showCalendar = document.querySelector( '.show-calendar' );
const submitDate = document.querySelector( '.date-picker__submit' );
const addFood = document.querySelector( '.add-food' );

handleSelectMacros = () => {
  document.querySelector( '.chart-options__kcal' ).style.display = 'none';
  document.querySelector( '.chart-options__macros' ).style.display = 'block';
  document.getElementById( 'lineChart' ).style.display = 'none';
  document.getElementById( 'pieChart' ).style.display = 'block';
}

handleSelectKcal = () => {
  document.querySelector( '.chart-options__macros' ).style.display = 'none';
  document.querySelector( '.chart-options__kcal' ).style.display = 'block';
  document.getElementById( 'lineChart' ).style.display = 'block';
  document.getElementById( 'pieChart' ).style.display = 'none';
}

handleDisplayDatePicker = () => {
  document.querySelector( '.date-picker' ).style.display = 'block';
}

handleSubmitDate = ( e ) => {
  e.preventDefault();
  console.log( 'submitting date' );
}

handleAddFood = () => {
  console.log( 'add food' )
}

macrosSelected.addEventListener( 'click', handleSelectMacros );
kcalSelected.addEventListener( 'click', handleSelectKcal );
showCalendar.addEventListener( 'click', handleDisplayDatePicker );
submitDate.addEventListener( 'click', ( e ) => handleSubmitDate( e ) );
addFood.addEventListener( 'click', handleAddFood );

$( '#exampleModal' ).on( 'shown.bs.modal', function() {
  $( '#myInput' ).trigger( 'focus' );
} )