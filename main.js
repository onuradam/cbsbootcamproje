var geojsonMarker_Ist_Ank = {
  'type': 'FeatureCollection',
  'features': [
  {
  'type': 'Feature',
  'properties': {
  'message': 'Esenler Otogarı',
  'iconSize': [20, 20]
  },
  'geometry': {
  'type': 'Point',
  'coordinates': [28.89594444, 41.03961111]
  }
  },
  {
  'type': 'Feature',
  'properties': {
  'message': 'Alibeyköy Cep Otogarı',
  'iconSize': [20, 20]
  },
  'geometry': {
  'type': 'Point',
  'coordinates': [28.944662, 41.088207]
  }
  },
  {
  'type': 'Feature',
  'properties': {
  'message': 'Dudullu Otogarı',
  'iconSize': [20, 20]
  },
  'geometry': {
  'type': 'Point',
  'coordinates': [29.149142, 40.998863]
  }
  },
  {
  'type': 'Feature',
  'properties': {
  'message': 'Dinlenme Tesisi',
  'iconSize': [20, 20]
  },
  'geometry': {
  'type': 'Point',
  'coordinates': [30.697090, 40.753410]
  }
  },
  {
  'type': 'Feature',
  'properties': {
  'message': 'Ankara Aşti Otogarı',
  'iconSize': [20, 20]
  },
  'geometry': {
  'type': 'Point',
  'coordinates': [32.811598, 39.918850]
  }
  }
  ]
  };

  var geojsonMarker_Ist_Izm = {
    'type': 'FeatureCollection',
    'features': [
    {
    'type': 'Feature',
    'properties': {
    'message': 'Gebze Otogarı',
    'iconSize': [20, 20]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [29.459588, 40.795190]
    }
    },
    {
    'type': 'Feature',
    'properties': {
    'message': 'Bursa Otogarı',
    'iconSize': [20, 20]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [29.054166, 40.266603]
    }
    },
    {
    'type': 'Feature',
    'properties': {
    'message': 'Dinlenme Tesisi',
    'iconSize': [20, 20]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [28.160144, 39.936117]
    }
    },
    {
    'type': 'Feature',
    'properties': {
    'message': 'Izmir Otogarı',
    'iconSize': [20, 20]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [27.213287, 38.430752]
    }
    }
    ]
    };

var map = new maplibregl.Map({
  container: 'map',
  style:
  'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
  center: [28.89594444, 41.03961111],
  zoom: 8
  });
   
/* var marker = new maplibregl.Marker()
  .setLngLat([28.89594444, 41.03961111])
  .addTo(map);

  var marker = new maplibregl.Marker()
  .setLngLat([28.944662, 41.088207])
  .addTo(map);

  var marker = new maplibregl.Marker()
  .setLngLat([29.149142, 40.998863])
  .addTo(map);

  var marker = new maplibregl.Marker()
  .setLngLat([30.697090, 40.753410])
  .addTo(map);

  var marker = new maplibregl.Marker()
  .setLngLat([32.811598, 39.918850])
  .addTo(map); */

  map.on('load', () => {
    map.addSource('route', {
    type: 'geojson',
    // Use a URL for the value for the `data` property.
    data: 'map.geojson'
    });
     
    map.addLayer({
    'id': 'route',
    'type': 'line',
    'source': 'route',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#aa0432',
      'line-width': 8
    }
    });
    });

    map.on('load', () => {
      map.addSource('route_izmir', {
      type: 'geojson',
      // Use a URL for the value for the `data` property.
      data: 'map_izmir.geojson'
      });
       
      map.addLayer({
      'id': 'route_2',
      'type': 'line',
      'source': 'route_izmir',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#fdb812',
        'line-width': 8
      }
      });
      });


//-------------------------------------------------------------------------------------------------------------------
//Animasyonlu marker
var size = 100;
 
// implementation of CustomLayerInterface to draw a pulsing dot icon on the map
// see https://maplibre.org/maplibre-gl-js-docs/api/properties/#customlayerinterface for more info
var pulsingDot = {
width: size,
height: size,
data: new Uint8Array(size * size * 4),
 
// get rendering context for the map canvas when layer is added to the map
onAdd: function () {
var canvas = document.createElement('canvas');
canvas.width = this.width;
canvas.height = this.height;
this.context = canvas.getContext('2d');
},
 
// called once before every frame where the icon will be used
render: function () {
var duration = 1000;
var t = (performance.now() % duration) / duration;
 
var radius = (size / 2) * 0.3;
var outerRadius = (size / 2) * 0.7 * t + radius;
var context = this.context;
 
// draw outer circle
context.clearRect(0, 0, this.width, this.height);
context.beginPath();
context.arc(
this.width / 2,
this.height / 2,
outerRadius,
0,
Math.PI * 2
);
context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
context.fill();
 
// draw inner circle
context.beginPath();
context.arc(
this.width / 2,
this.height / 2,
radius,
0,
Math.PI * 2
);
context.fillStyle = 'rgba(255, 100, 100, 1)';
context.strokeStyle = '#333';
context.lineWidth = 2 + 4 * (1 - t);
context.fill();
context.stroke();
 
// update this image's data with data from the canvas
this.data = context.getImageData(
0,
0,
this.width,
this.height
).data;
 
// continuously repaint the map, resulting in the smooth animation of the dot
map.triggerRepaint();
 
// return `true` to let the map know that the image was updated
return true;
}
};
 
map.on('load', function () {
map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
 
map.addSource('points', {
'type': 'geojson',
'data': {
'type': 'FeatureCollection',
'features': [
  {
    'type': 'Feature',
    'properties': {
    'message': 'Esenler Otogarı',
    'iconSize': [20, 20]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [28.89594444, 41.03961111]
    }
    },
    {
    'type': 'Feature',
    'properties': {
    'message': 'Alibeyköy Cep Otogarı',
    'iconSize': [20, 20]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [28.944662, 41.088207]
    }
    },
    {
    'type': 'Feature',
    'properties': {
    'message': 'Dudullu Otogarı',
    'iconSize': [20, 20]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [29.149142, 40.998863]
    }
    },
    {
    'type': 'Feature',
    'properties': {
    'message': 'Dinlenme Tesisi',
    'iconSize': [20, 20]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [30.697090, 40.753410]
    }
    },
    {
    'type': 'Feature',
    'properties': {
    'message': 'Ankara Aşti Otogarı',
    'iconSize': [20, 20]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [32.811598, 39.918850]
    }
    },
    {
      'type': 'Feature',
      'properties': {
      'message': 'Gebze Otogarı',
      'iconSize': [20, 20]
      },
      'geometry': {
      'type': 'Point',
      'coordinates': [29.459588, 40.795190]
      }
      },
      {
        'type': 'Feature',
        'properties': {
        'message': 'Bursa Otogarı',
        'iconSize': [20, 20]
        },
        'geometry': {
        'type': 'Point',
        'coordinates': [29.054166, 40.266603]
        }
        },
              {
        'type': 'Feature',
        'properties': {
        'message': 'Bursa Otogarı',
        'iconSize': [20, 20]
        },
        'geometry': {
        'type': 'Point',
        'coordinates': [29.054166, 40.266603]
        }
        },
        {
          'type': 'Feature',
          'properties': {
          'message': 'Dinlenme Tesisi',
          'iconSize': [20, 20]
          },
          'geometry': {
          'type': 'Point',
          'coordinates': [28.160144, 39.936117]
          }
          },
          {
            'type': 'Feature',
            'properties': {
            'message': 'İzmir Otogarı',
            'iconSize': [20, 20]
            },
            'geometry': {
            'type': 'Point',
            'coordinates': [27.213287, 38.430752]
            }
            },
]
}
});
map.addLayer({
'id': 'points',
'type': 'symbol',
'source': 'points',
'layout': {
'icon-image': 'pulsing-dot'
}
});
});

geojsonMarker_Ist_Ank.features.forEach(function (marker) {
  // create a DOM element for the marker
  var el = document.createElement('div');
  el.className = 'marker';
  el.style.width = marker.properties.iconSize[0] + 'px';
  el.style.height = marker.properties.iconSize[1] + 'px';

  const taskTitle = document.getElementById('task-title');
   
  el.addEventListener('click', function () {
  taskTitle.textContent = marker.properties.message;
  taskTitle.innerText = marker.properties.message;
  window.alert(marker.properties.message);
  });
   
  // add marker to map
  new maplibregl.Marker(el)
  .setLngLat(marker.geometry.coordinates)
  .addTo(map);
  });

  geojsonMarker_Ist_Izm.features.forEach(function (marker) {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.width = marker.properties.iconSize[0] + 'px';
    el.style.height = marker.properties.iconSize[1] + 'px';
     
    const taskTitle = document.getElementById('task-title');
   
    el.addEventListener('click', function () {
    taskTitle.textContent = marker.properties.message;
    taskTitle.innerText = marker.properties.message;
    window.alert(marker.properties.message);
    });
     
    // add marker to map
    new maplibregl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
    });
//--------------------------------------------------------------------------------------------------------------------------------------------

map.addControl(new maplibregl.NavigationControl());



//https://docs.mapbox.com/mapbox-gl-js/example/external-geojson/
//https://maplibre.org/maplibre-gl-js-docs/example/geojson-line/
//https://www.groovypost.com/howto/export-google-maps-route-data/
//https://geojson.io/#map=11.88/41.06464/28.92693