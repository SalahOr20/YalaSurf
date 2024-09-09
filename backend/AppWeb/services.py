import json

import arrow
import requests

def fetch_forecast(latitude, longitude):

    # Get first hour of today
    start = arrow.now().floor('day')

    # Get last hour of today
    end = arrow.now().ceil('day')

    response = requests.get(
        'https://api.stormglass.io/v2/weather/point',
        params={
            'lat': latitude,
            'lng': longitude,
            'params': ','.join(['waveHeight', 'airTemperature,swellPeriod,windSpeed,waterTemperature']),
            'start': start.to('UTC').timestamp(),
            'end': end.to('UTC').timestamp()
        },
        headers={
            'Authorization': 'df3016be-551b-11ef-95ed-0242ac130004-df301722-551b-11ef-95ed-0242ac130004'
        }
    )

    json_data = response.json()
    return json_data

