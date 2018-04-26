const cities = [
  {
    cityName: 'Biarritz',
    schoolName: 'Wild Code School Biarritz',
    position: { lat: 43.44635239999999, lng: -1.55276 }
  },
  {
    cityName: 'Bordeaux',
    schoolName: 'Wild Code School Bordeaux',
    position: { lat: 44.849407, lng: -0.574978 }
  },
  {
    cityName: 'Fontainebleau',
    schoolName: 'Wild Code School Fontainebleau',
    position: { lat: 48.4037414, lng: 2.6943212 }
  },
  {
    cityName: 'La Loupe',
    schoolName: 'Wild Code School La Loupe',
    position: { lat: 48.473295, lng: 1.0118297 }
  },
  {
    cityName: 'Lille',
    schoolName: 'Wild Code School Lille',
    position: { lat: 50.6331129, lng: 3.01882650 }
  },
  {
    cityName: 'Lyon',
    schoolName: 'Wild Code School Lyon',
    position: { lat: 45.7461607, lng: 4.8274399 }
  },
  {
    cityName: 'Lille',
    schoolName: 'Wild Code School Lille',
    position: { lat: 50.6331129, lng: 3.01882650 }
  },
  {
    cityName: 'Marseille',
    schoolName: 'Wild Code School Marseille',
    position: { lat: 43.3007892, lng: 5.3672117 }
  },
  {
    cityName: 'Orléans',
    schoolName: 'Wild Code School Orléans',
    position: { lat: 47.8931681, lng: 1.8949890 }
  },
  {
    cityName: 'Paris',
    schoolName: 'Wild Code School Paris',
    position: { lat: 48.8490723, lng: 2.352600 }
  },
  {
    cityName: 'Reims',
    schoolName: 'Wild Code School Reims',
    position: { lat: 49.2569415, lng: 4.0197215 }
  },
  {
    cityName: 'Strasbourg',
    schoolName: 'Wild Code School Strasbourg',
    position: { lat: 48.5600046, lng: 7.773299 }
  },
  {
    cityName: 'Toulouse',
    schoolName: 'Wild Code School Toulouse',
    position: { lat: 43.6014536, lng: 1.4421 }
  }
]

const setMarkers = (map, locations) => {
  cities.forEach(city => {
    const infoWindow = new window.google.maps.InfoWindow()
    const marker = new window.google.maps.Marker({
      position: city.position,
      map: map,
      animation: window.google.maps.Animation.DROP
    })
    window.google.maps.event.addListener(marker, 'click', () => {
      // city
      infoWindow.close()
      infoWindow.setContent('<div>' + city.cityName + '<br />' + city.schoolName + '</div>')
      infoWindow.open(map, marker)
    })
  })
}

function initialize () {
  console.log('init')
  const mapOptions = {
    zoom: 6, // 0 à 21
    center: new window.google.maps.LatLng(47, 2), // centre de la carte
    mapTypeId: window.google.maps.MapTypeId.ROADMAP // ROADMAP, SATELLITE, HYBRID, TERRAIN
  }
  const map = new window.google.maps.Map(document.getElementById('map'), mapOptions)
  setMarkers(map)
}
