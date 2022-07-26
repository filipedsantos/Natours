/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
//console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiZmlsaXBlZHNhbnRvcyIsImEiOiJjbDJ4YXl5NjYwdHlvM2tsYmRyYWZ1YmpkIn0.yGFdcJVz-i2IxgzU-ydYlA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/filipedsantos/cl2xbagzl000815mh4gt3gyau',
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();
locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';
  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 35,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current locations
  bounds.extend(loc.coordinates);
});
map.fitBounds(bounds, {
  padding: { top: 200, bottom: 150, right: 100, left: 100 },
});
