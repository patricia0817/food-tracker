const macrosSelected = document.querySelector( '.macros-selected' );
const kcalSelected = document.querySelector( '.kcal-selected' );
const addFood = document.querySelector( '.add-food' );
const foodList = document.querySelector( '.search-list' );
const foodListLogs = document.querySelector( '.food-list-logs' );
const searchInput = document.querySelector( '.food-search__container__input' );
const searchButton = document.querySelector( '.food-search__container__button' );
const searchForm = document.querySelector( '.food-search__container' );
let selectedFoods = [];
let foodListData;
let carbsData;
let proteinData;
let fatData;
let kcalData = [];


handleSelectMacros = () => {
  document.querySelector( '.chart-options__kcal' ).style.display = 'none';
  document.querySelector( '.chart-options__macros' ).style.display = 'block';
  document.querySelector( '.line-chart' ).style.display = 'none';
  document.querySelector( '.pie-chart' ).style.display = 'block';
}

handleSelectKcal = () => {
  document.querySelector( '.chart-options__macros' ).style.display = 'none';
  document.querySelector( '.chart-options__kcal' ).style.display = 'block';
  document.querySelector( '.line-chart' ).style.display = 'block';
  document.querySelector( '.pie-chart' ).style.display = 'none';
}


populateFoodList = ( data ) => {
  let foodListItems = [];
  data.map( ( item ) => {
    foodListItems += `<button type="button" class="list-group-item list-group-item-action" data-dismiss="modal" data-id="${ item.id }">
     <h5 class="search-list__item__title">${item[ 'food_name' ] }</h5>
      <span class="search-list__item__content  d-flex justify-content-between">
       <span class="description">
         <span class="description__brand">${item[ 'brand_name' ] }</span>
          <span class="description__quantity">
            ${item[ 'quantity' ] }
             <span class="description__quantity__units">g</span>
           </span>
          </span>
          <span class="kcal">${item[ 'kcal' ] }</span>
         </span>
     </button>`
  } )
  foodList.innerHTML = foodListItems;

}

handleFetchData = () => {
  const url = 'https://datastore-1ede4.firebaseio.com/foodList.json';
  fetch( url ).then( function( response ) {
    return response.json();
  } ).then( function( data ) {
    populateFoodList( data );
    foodListData = [ ...data ]
  } );
}

handleAddFood = () => {
  handleFetchData();
}

handlePopulateFoodListLogs = () => {
  let foodListLogsItems = [];
  selectedFoods.map( ( selectedFood ) => {
    foodListLogsItems += `<li class="food-list-logs__item list-group-item">
    <span class="food-name">${selectedFood[ 'food_name' ] }</span>
    <ul class="text-center macros-list list-group list-group-horizontal">
      <li class="list-group-item">
        <div class="food-macros__kcal">
          <span class="quantity">${selectedFood.kcal }</span>
          <span class="quantity-unit">kcal</span>
        </div>
      </li>
      <li class="list-group-item">
        <div class="food-macros__carbs">
          <span class="quantity">${selectedFood.carbs }</span>
          <span class="quantity-unit">g</span>
          <sub>Carbs</sub>
        </div>
      </li>
      <li class="list-group-item">
        <div class="food-macros__protein">
          <span class="quantity">${selectedFood.protein }</span>
          <span class="quantity-unit">g</span>
          <sub>Protein</sub>
        </div>
      </li>
      <li class="list-group-item">
        <div class="food-macros__fat">
          <span class="quantity">${selectedFood.fat }</span>
          <span class="quantity-unit">g</span>
          <sub>Fat</sub>
        </div>
      </li>
    </ul>
  </li>`;
  } )

  foodListLogs.innerHTML = foodListLogsItems;
}

renderPieChart = () => {
  var ctx = document.getElementById( 'pieChart' );
  var myPieChart = new Chart( ctx, {
    type: 'pie',
    data: {
      labels: [ 'Carbs', 'Protein', 'Fat' ],
      datasets: [ {
        data: [ carbsData, proteinData, fatData ],
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
}

renderLineChart = () => {
  var ctx = document.getElementById( 'lineChart' );
  var myLineChart = new Chart( ctx, {
    type: 'line',
    data: {
      labels: [ ...selectedFoods.map( ( f, i ) => i ) ],
      datasets: [ {
        fill: false,
        label: 'Kcal Consumption',
        data: kcalData,
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
}

handleMacrosChartUpdate = () => {
  carbsData = 0;
  proteinData = 0;
  fatData = 0;
  kcalData = [];
  selectedFoods.map( ( selectedFood ) => {
    carbsData += selectedFood.carbs;
    proteinData += selectedFood.protein;
    fatData += selectedFood.fat;
    kcalData = [ ...kcalData, selectedFood.kcal ];
  } )

  renderPieChart();
  renderLineChart();
}

handleSelectFood = ( e ) => {
  let { target } = e
  let itemId;
  while ( !itemId ) {
    const targetId = target.dataset.id;
    if ( targetId ) {
      itemId = targetId;
    } else {
      target = target.parentNode;
    }
  }

  selectedFoods = [ ...selectedFoods, ...foodListData.filter( ( item ) => item.id === itemId ) ]
  handlePopulateFoodListLogs();
  handleMacrosChartUpdate();
  searchInput.value = '';
}

handleSearch = ( e ) => {
  let results = foodListData.filter( ( foodData ) => {
    return foodData[ 'food_name' ].toLowerCase().includes( searchInput.value.toLowerCase() );
  } )
  populateFoodList( results )
}

macrosSelected.addEventListener( 'click', handleSelectMacros );
kcalSelected.addEventListener( 'click', handleSelectKcal );
addFood.addEventListener( 'click', handleAddFood );
foodList.addEventListener( 'click', ( e ) => handleSelectFood( e ) );
searchInput.addEventListener( 'input', ( e ) => handleSearch( e ) )

$( '#addLogModal' ).on( 'shown.bs.modal', function() {
} )