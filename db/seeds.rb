

# populate database with default genres
genres = [
	{name: 'Rock'},
	{name: 'Techno'},
	{name: 'Jazz'},
	{name: 'Pop'},
	{name: 'Funk'},
	{name: 'Blues'},
	{name: 'Latin'}
]
Genre.create(genres)



# populate database with default artists
artists = [
	{name: 'Bob Dylan'},
	{name: 'Michael Jackson'},
	{name: 'Weezer'},
	{name: 'Milky Chance'},
	{name: 'Anita'},
	{name: 'Amy Winehouse'},
	{name: 'Car Seat Headrest'},
	{name: 'Alice Deejay'},
	{name: 'Chet Faker'},
	{name: 'Black Pumas'}
]
Artist.create(artists)