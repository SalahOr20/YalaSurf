import json

import arrow
import requests



def fetch_forecast(latitude, longitude):
    # Définir la période de la journée


    # Get first hour of today
    start = arrow.now().floor('day')

    # Get last hour of today
    end = arrow.now().ceil('day')

    response = requests.get(
        'https://api.stormglass.io/v2/weather/point',
        params={
            'lat': 58.7984,
            'lng': 17.8081,
            'params': ','.join(['waveHeight', 'airTemperature,swellPeriod,windSpeed,waterTemperature']),
            'start': start.to('UTC').timestamp(),  # Convert to UTC timestamp
            'end': end.to('UTC').timestamp()  # Convert to UTC timestamp
        },
        headers={
            'Authorization': 'df3016be-551b-11ef-95ed-0242ac130004-df301722-551b-11ef-95ed-0242ac130004'
        }
    )

    # Do something with response data.
    json_data = response.json()
    json_object = json.dumps(json_data, indent=4)

    # Writing to sample.json
    with open("sample.json", "w") as Prevision:
        Prevision.write(json_object)
    return json_data

