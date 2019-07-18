[![N|Solid](https://i.kinja-img.com/gawker-media/image/upload/s--t_24nofE--/c_scale,dpr_2.0,f_auto,fl_progressive,q_80,w_1600/mxg3jhonqceujvem9mgy.jpg)]()
# Tracking Amazon Air
Amazon leases planes operated by Atlas Air for their logistics operations.  Below is data from a fleet of their B763 used to ferry products to warehouses domestically.  The data ( flights.json ) is in json format and contains the most recent 200ish flights from each plane in the fleet. For comparison, the data also contains data from a FedEx Fleet. 

### Dependencies 
python,node,puppeteer,beautifulsoup
### fields
 1. date: Date the flight was observered
 2. flight_number: flight number
 3. duration: duration of flight in minuted
 4. std: Scheduled Time of Departure
 5. atd: Actual Time of Departure	
 6. sta: Scheduled Time of Arrival
 7. from: Where the plane took off from
 8. to: Where the plane landed
 9. plane: N-Number
 10. carrier: Amazon or FedEx
 

