from parse import * 

flights = get_flights()
with open('data.json', 'w') as outfile:
    json.dump(flights, outfile)