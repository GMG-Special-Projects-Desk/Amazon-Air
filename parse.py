from bs4 import BeautifulSoup
import datetime as DT
import json
import os


def get_flights():
	flights=[]
	for name in os.listdir('scraper/data'):
		print("Get Flights :: Parsing :: " + name)
		f = open("scraper/data/"+name, "r")
		soup = BeautifulSoup(f.read(), 'html.parser')
		for tb in soup.find_all('tbody'):
			rows = tb.find_all('tr')
			for row in rows:
				data = row.find_all('td',{ "class" : "hidden-xs hidden-sm" })
				plane = row.find_all('a')[-1]['href'].split('/')[-1].split('#')[0]
				if len(data) < 10:
					locs = row.find_all('td',{ "class" : "text-center-sm hidden-xs hidden-sm" })	
					dur = data[2].get_text()
					try:
						t1 = DT.datetime.strptime(data[2].get_text(), '%H:%M')
						t2 = DT.datetime(1900,1,1)
						dur = (t1-t2).total_seconds()/60
						print(dur)
					except:
						print("Get Flights :: Could Not Parse Time")

					flight = {
					"date":data[0].get_text(),
					"flight_number":data[1].get_text(),
					"duration":dur,
					"std":data[3].get_text(),
					"atd":data[4].get_text(),
					"sta":data[5].get_text(),
					"from":locs[0].get_text(),
					"to":locs[1].get_text(),
					"plane":plane,
					"carrier":name.split('-')[0]
					}
				else:
					# Quick hack to fix the time issue need to make a diff function #
					dur = data[4].get_text()
					try:
						t1 = DT.datetime.strptime(data[4].get_text(), '%H:%M')
						t2 = DT.datetime(1900,1,1)
						dur = (t1-t2).total_seconds()/60
					except:
						print("Get Flights :: Could Not Parse Time")
					##############
					flight = {
					"date":data[0].get_text(),
					"flight_number":data[3].get_text(),
					"duration":data[4].get_text(),
					"std":data[5].get_text(),
					"atd":data[6].get_text(),
					"sta":data[7].get_text(),
					"from":data[1].get_text(),
					"to":dur,
					"plane":plane,
					"carrier":name.split('-')[0]

					}
				print("Get Flights :: Saving :: " + flight['flight_number'])
				flights.append(flight)

	return flights