// Quiz Question Elements
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));


let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuestions = [];
// Question bank
// General Knowledge Questions
// remove to set question category then comment out "let questions" 
let questions = [
    { question: "Who sang the title song for the latest Bond film, No Time to Die?", choice1: "Adele", choice2: "Sam Smith", choice3: "Billie Eilish", choice4: "Lana Del Rey", answer: 3 },
    { question: "Which flies a green, white, and orange (in that order) tricolor flag?", choice1: "Ireland", choice2: "Ivory Coast", choice3: "Italy", choice4: "India", answer: 1 },
    { question: "What company makes the Xperia model of smartphone?", choice1: "Samsung", choice2: "Sony", choice3: "Nokia", choice4: "Apple", answer: 2 },
    { question: "Which city is home to the Brandenburg Gate?", choice1: "Vienna", choice2: "Zurich", choice3: "Berlin", choice4: "Munich", answer: 3 },
    { question: "Which of the following is NOT a fruit?", choice1: "Rhubarb", choice2: "Tomatoes", choice3: "Avocados", choice4: "Bananas", answer: 1 },
    { question: "Where was the first example of paper money used?", choice1: "China", choice2: "Turkey", choice3: "Greece", choice4: "Rome", answer: 1 },
    { question: "Who is generally considered the inventor of the motor car?", choice1: "Henry Ford", choice2: "Karl Benz", choice3: "Henry M. Leland", choice4: "Giovanni Agnelli", answer: 2 },
    { question: "If you were looking at Iguazu Falls, on what continent would you be?", choice1: "Asia", choice2: "Africa", choice3: "South America", choice4: "North America", answer: 3 },
    { question: "What number was the Apollo mission that successfully put a man on the moon for the first time in human history?", choice1: "Apollo 11", choice2: "Apollo 12", choice3: "Apollo 13", choice4: "Apollo 14", answer: 1 },
    { question: "Which of the following languages has the longest alphabet?", choice1: "Greek", choice2: "Russian", choice3: "English", choice4: "Arabic", answer: 2 },
    { question: "Who was the lead singer of the band The Who?", choice1: "Roger Daltrey", choice2: "Don Henley", choice3: "Robert Plant", choice4: "Mick Jagger", answer: 1 },
    { question: "What spirit is used in making a Tom Collins?", choice1: "Vodka", choice2: "Rum", choice3: "Gin", choice4: "Tequila", answer: 3 },
    { question: "The fear of insects is known as what?", choice1: "Entomophobia", choice2: "Arachnophobia", choice3: "Ailurophobia", choice4: "Ophidiophobia", answer: 1 },
    { question: "What was the name of the Franco-British supersonic commercial plane that operated from 1976-2003?", choice1: "Accord", choice2: "Concorde", choice3: "Mirage", choice4: "Boeing", answer: 2 },
    { question: "What was the name of the Franco-British supersonic commercial plane that operated from 1976-2003?", choice1: "Accord", choice2: "Concorde", choice3: "Mirage", choice4: "Boeing", answer: 2 },
    { question: "Which horoscope sign is a fish?", choice1: "Aquarius", choice2: "Cancer", choice3: "Pisces", choice4: "Scorpio", answer: 3 },
    { question: "What is the largest US state (by landmass)?", choice1: "Texas", choice2: "Alaska", choice3: "California", choice4: "Florida", answer: 2 },
    { question: "Which app has the most total users?", choice1: "TikTok", choice2: "Snapchat", choice3: "Instagram", choice4: "Facebook", answer: 3 },
    { question: "Which Game of Thrones character is known as the Young Wolf?", choice1: "Robb Stark", choice2: "Arya Stark", choice3: "Sansa Stark", choice4: "Jon Snow", answer: 1 },
    { question: "What city hosted the 2002 Olympic Games?", choice1: "Tokyo", choice2: "Beijing", choice3: "Sydney", choice4: "Athens", answer: 3 },
    { question: "How many plays do people (generally) believe that Shakespeare wrote?", choice1: "27", choice2: "37", choice3: "47", choice4: "57", answer: 2 },
    { question: "Which of the following was considered one of the Seven Ancient Wonders?", choice1: "Colosseum", choice2: "Great Wall of China", choice3: "Colossus of Rhodes", choice4: "Machu Picchu", answer: 3 },
    { question: "Who directed the Academy Award-winning movie, Gladiator?", choice1: "Ridley Scott", choice2: "James Cameron", choice3: "Steven Soderbergh", choice4: "Peter Jackson", answer: 1 },
    { question: "How long did dinosaurs live on the earth?", choice1: "100-150 million years", choice2: "150-200 million years", choice3: "200+ million years", choice4: "350+ million years", answer: 2 },
    { question: "What Italian city is famous for its system of canals?", choice1: "Rome", choice2: "Naples", choice3: "Venice", choice4: "Milan", answer: 3 },
    { question: "What is the strongest muscle in the human body?", choice1: "Jaw", choice2: "Heart", choice3: "Glutes", choice4: "Biceps", answer: 1 },
    { question: "What is the longest-running Broadway show ever?", choice1: "Les Miserable", choice2: "The Lion King", choice3: "The Phantom of the Opera", choice4: "Chicago", answer: 3 },
    { question: "Where was tea invented?", choice1: "England", choice2: "USA", choice3: "China", choice4: "India", answer: 3 },
    { question: "Where was the earliest documented case of the Spanish flu?", choice1: "USA", choice2: "Spain", choice3: "Mexico", choice4: "China", answer: 1 },
    { question: "Which of the following languages is NOT driven from Latin?", choice1: "French", choice2: "Portuguese", choice3: "English", choice4: "German", answer: 3 },
    { question: "Arnold Schwarzenegger was married to a member of what famous US political family?", choice1: "The Kennedys", choice2: "The Bushes", choice3: "The Rockefellers", choice4: "The Clintons", answer: 1 },
// remove to set question category and remove "," from the end of the last question in the array above];

// Sport Questions
// remove to set question category let sportQuestions = [
    { question: "Which country won the FIFA World Cup in 2018?", choice1: "Brazil", choice2: "Germany", choice3: "France", choice4: "Argentina", answer: "France" },
    { question: "Who holds the record for the most Grand Slam tennis titles?", choice1: "Roger Federer", choice2: "Rafael Nadal", choice3: "Novak Djokovic", choice4: "Pete Sampras", answer: "Novak Djokovic" },
    { question: "In which sport would you perform a slam dunk?", choice1: "Basketball", choice2: "Volleyball", choice3: "Football", choice4: "Baseball", answer: "Basketball" },
    { question: "Which country hosts the Tour de France?", choice1: "Italy", choice2: "France", choice3: "Spain", choice4: "Belgium", answer: "France" },
    { question: "How many players are there in a rugby union team?", choice1: "11", choice2: "13", choice3: "15", choice4: "18", answer: "15" },
    { question: "Who is known as the fastest man in the world?", choice1: "Usain Bolt", choice2: "Tyson Gay", choice3: "Yohan Blake", choice4: "Justin Gatlin", answer: "Usain Bolt" },
    { question: "Which sport uses the terms 'birdie' and 'eagle'?", choice1: "Golf", choice2: "Badminton", choice3: "Tennis", choice4: "Cricket", answer: "Golf" },
    { question: "What is the maximum score in a single frame of snooker?", choice1: "147", choice2: "155", choice3: "167", choice4: "180", answer: "147" },
    { question: "Which country won the first ever football World Cup?", choice1: "Brazil", choice2: "Uruguay", choice3: "Italy", choice4: "Germany", answer: "Uruguay" },
    { question: "Who has won the most Olympic gold medals?", choice1: "Usain Bolt", choice2: "Michael Phelps", choice3: "Larisa Latynina", choice4: "Mark Spitz", answer: "Michael Phelps" },
    { question: "Which sport is known as the 'king of sports'?", choice1: "Football (Soccer)", choice2: "Basketball", choice3: "Tennis", choice4: "Cricket", answer: "Football (Soccer)" },
    { question: "What is the national sport of Japan?", choice1: "Karate", choice2: "Sumo Wrestling", choice3: "Judo", choice4: "Baseball", answer: "Sumo Wrestling" },
    { question: "Which NFL team has won the most Super Bowls?", choice1: "Dallas Cowboys", choice2: "New England Patriots", choice3: "Pittsburgh Steelers", choice4: "San Francisco 49ers", answer: "New England Patriots" },
    { question: "Who won the NBA MVP award in 2021?", choice1: "LeBron James", choice2: "Nikola Jokic", choice3: "Giannis Antetokounmpo", choice4: "Stephen Curry", answer: "Nikola Jokic" },
    { question: "Which country is famous for the haka dance in rugby?", choice1: "Australia", choice2: "New Zealand", choice3: "South Africa", choice4: "England", answer: "New Zealand" },
    { question: "What is the diameter of a basketball hoop in inches?", choice1: "16", choice2: "18", choice3: "20", choice4: "22", answer: "18" },
    { question: "Who is the all-time top scorer in the Premier League?", choice1: "Wayne Rooney", choice2: "Alan Shearer", choice3: "Sergio Aguero", choice4: "Thierry Henry", answer: "Alan Shearer" },
    { question: "Which country has won the most Cricket World Cups?", choice1: "India", choice2: "Australia", choice3: "England", choice4: "West Indies", answer: "Australia" },
    { question: "What is the only Grand Slam tennis tournament played on clay?", choice1: "Wimbledon", choice2: "US Open", choice3: "French Open", choice4: "Australian Open", answer: "French Open" },
    { question: "Who won the Formula 1 World Championship in 2020?", choice1: "Lewis Hamilton", choice2: "Max Verstappen", choice3: "Sebastian Vettel", choice4: "Valtteri Bottas", answer: "Lewis Hamilton" },
    { question: "Which country invented table tennis?", choice1: "England", choice2: "China", choice3: "Japan", choice4: "Germany", answer: "England" },
    { question: "How many holes are there in a standard round of golf?", choice1: "9", choice2: "12", choice3: "18", choice4: "21", answer: "18" },
    { question: "Who is the most decorated Olympian of all time?", choice1: "Michael Phelps", choice2: "Simone Biles", choice3: "Usain Bolt", choice4: "Larisa Latynina", answer: "Michael Phelps" },
    { question: "Which country won the Rugby World Cup in 2019?", choice1: "England", choice2: "South Africa", choice3: "New Zealand", choice4: "Australia", answer: "South Africa" },
    { question: "What is the highest possible break in snooker?", choice1: "147", choice2: "155", choice3: "167", choice4: "180", answer: "147" },
    { question: "Who won the Ballon d'Or in 2021?", choice1: "Lionel Messi", choice2: "Cristiano Ronaldo", choice3: "Robert Lewandowski", choice4: "Karim Benzema", answer: "Lionel Messi" },
    { question: "Which country is home to the football club Ajax?", choice1: "Germany", choice2: "Netherlands", choice3: "Belgium", choice4: "France", answer: "Netherlands" },
    { question: "What is the nickname of the New Zealand rugby team?", choice1: "Wallabies", choice2: "All Blacks", choice3: "Springboks", choice4: "Pumas", answer: "All Blacks" },
    { question: "Who won the men's singles at Wimbledon in 2019?", choice1: "Roger Federer", choice2: "Novak Djokovic", choice3: "Rafael Nadal", choice4: "Andy Murray", answer: "Novak Djokovic" },
    { question: "Which country hosted the 2016 Summer Olympics?", choice1: "China", choice2: "Brazil", choice3: "UK", choice4: "Russia", answer: "Brazil" },
    { question: "Who is the only athlete to play in both a Super Bowl and a World Series?", choice1: "Bo Jackson", choice2: "Deion Sanders", choice3: "Michael Jordan", choice4: "Tim Tebow", answer: "Deion Sanders" },
// remove to set question category and remove "," from the end of the last question in the array above 
// ];

// Geography Questions
// remove to set question category let geographyQuestions = [
    { question: "What is the capital of Canada?", choice1: "Toronto", choice2: "Vancouver", choice3: "Ottawa", choice4: "Montreal", answer: "Ottawa" },
    { question: "Which river is the longest in the world?", choice1: "Amazon", choice2: "Nile", choice3: "Yangtze", choice4: "Mississippi", answer: "Nile" },
    { question: "Mount Everest is located in which mountain range?", choice1: "Andes", choice2: "Rockies", choice3: "Himalayas", choice4: "Alps", answer: "Himalayas" },
    { question: "Which country has the most natural lakes?", choice1: "USA", choice2: "Canada", choice3: "Russia", choice4: "Finland", answer: "Canada" },
    { question: "What is the smallest country in the world?", choice1: "Monaco", choice2: "Vatican City", choice3: "San Marino", choice4: "Liechtenstein", answer: "Vatican City" },
    { question: "Which desert is the largest in the world?", choice1: "Sahara", choice2: "Gobi", choice3: "Kalahari", choice4: "Arabian", answer: "Sahara" },
    { question: "Which continent has the most countries?", choice1: "Africa", choice2: "Asia", choice3: "Europe", choice4: "South America", answer: "Africa" },
    { question: "What is the capital of Australia?", choice1: "Sydney", choice2: "Melbourne", choice3: "Canberra", choice4: "Perth", answer: "Canberra" },
    { question: "Which country is both in Europe and Asia?", choice1: "Russia", choice2: "Turkey", choice3: "Kazakhstan", choice4: "All of the above", answer: "All of the above" },
    { question: "What is the largest island in the world?", choice1: "Greenland", choice2: "Australia", choice3: "Borneo", choice4: "New Guinea", answer: "Greenland" },
    { question: "Which US state has the most active volcanoes?", choice1: "California", choice2: "Alaska", choice3: "Hawaii", choice4: "Washington", answer: "Alaska" },
    { question: "What is the capital of South Korea?", choice1: "Seoul", choice2: "Busan", choice3: "Incheon", choice4: "Daegu", answer: "Seoul" },
    { question: "Which country has the most time zones?", choice1: "USA", choice2: "France", choice3: "Russia", choice4: "China", answer: "France" },
    { question: "What is the largest ocean on Earth?", choice1: "Atlantic", choice2: "Indian", choice3: "Pacific", choice4: "Arctic", answer: "Pacific" },
    { question: "Which African country has the largest population?", choice1: "Egypt", choice2: "Nigeria", choice3: "Ethiopia", choice4: "South Africa", answer: "Nigeria" },
    { question: "What is the capital of Brazil?", choice1: "Rio de Janeiro", choice2: "Brasilia", choice3: "Sao Paulo", choice4: "Salvador", answer: "Brasilia" },
    { question: "Which country is known as the Land of the Rising Sun?", choice1: "China", choice2: "Japan", choice3: "Thailand", choice4: "Vietnam", answer: "Japan" },
    { question: "What is the longest river in Europe?", choice1: "Danube", choice2: "Volga", choice3: "Rhine", choice4: "Seine", answer: "Volga" },
    { question: "Which country has the most pyramids in the world?", choice1: "Egypt", choice2: "Sudan", choice3: "Mexico", choice4: "Peru", answer: "Sudan" },
    { question: "What is the capital of New Zealand?", choice1: "Auckland", choice2: "Wellington", choice3: "Christchurch", choice4: "Hamilton", answer: "Wellington" },
    { question: "Which country is the largest by land area?", choice1: "USA", choice2: "China", choice3: "Russia", choice4: "Canada", answer: "Russia" },
    { question: "What is the capital of Egypt?", choice1: "Cairo", choice2: "Alexandria", choice3: "Giza", choice4: "Luxor", answer: "Cairo" },
    { question: "Which country is home to the Great Barrier Reef?", choice1: "Australia", choice2: "New Zealand", choice3: "Fiji", choice4: "Indonesia", answer: "Australia" },
    { question: "What is the highest mountain in Africa?", choice1: "Mount Kenya", choice2: "Mount Kilimanjaro", choice3: "Mount Elgon", choice4: "Mount Meru", answer: "Mount Kilimanjaro" },
    { question: "Which European city is divided by canals and known for its bicycles?", choice1: "Venice", choice2: "Amsterdam", choice3: "Copenhagen", choice4: "Stockholm", answer: "Amsterdam" },
    { question: "What is the capital of Thailand?", choice1: "Bangkok", choice2: "Phuket", choice3: "Chiang Mai", choice4: "Pattaya", answer: "Bangkok" },
    { question: "Which country is known as the Land of a Thousand Lakes?", choice1: "Sweden", choice2: "Finland", choice3: "Norway", choice4: "Denmark", answer: "Finland" },
    { question: "What is the capital of Argentina?", choice1: "Buenos Aires", choice2: "Cordoba", choice3: "Rosario", choice4: "Mendoza", answer: "Buenos Aires" },
    { question: "Which country is home to the city of Marrakech?", choice1: "Morocco", choice2: "Egypt", choice3: "Tunisia", choice4: "Algeria", answer: "Morocco" },
    { question: "What is the capital of Norway?", choice1: "Oslo", choice2: "Bergen", choice3: "Trondheim", choice4: "Stavanger", answer: "Oslo" },
// remove to set question category and remove "," from the end of the last question in the array above 
// ];

// Film and TV Questions
// remove to set question category let filmAndTvQuestions = [
    { question: "Who directed the movie 'Inception'?", choice1: "Steven Spielberg", choice2: "Christopher Nolan", choice3: "James Cameron", choice4: "Quentin Tarantino", answer: "Christopher Nolan" },
    { question: "Which TV series is set in the fictional town of Hawkins, Indiana?", choice1: "Riverdale", choice2: "Stranger Things", choice3: "The OA", choice4: "Dark", answer: "Stranger Things" },
    { question: "Who played Jack Dawson in 'Titanic'?", choice1: "Brad Pitt", choice2: "Leonardo DiCaprio", choice3: "Matt Damon", choice4: "Tom Cruise", answer: "Leonardo DiCaprio" },
    { question: "Which film won Best Picture at the 2020 Oscars?", choice1: "1917", choice2: "Joker", choice3: "Parasite", choice4: "Once Upon a Time in Hollywood", answer: "Parasite" },
    { question: "Who is the main character in the TV show 'Breaking Bad'?", choice1: "Jesse Pinkman", choice2: "Walter White", choice3: "Saul Goodman", choice4: "Hank Schrader", answer: "Walter White" },
    { question: "Which movie features the quote, 'Here's looking at you, kid'?", choice1: "Gone with the Wind", choice2: "Casablanca", choice3: "The Godfather", choice4: "Citizen Kane", answer: "Casablanca" },
    { question: "Who played the Joker in 'The Dark Knight'?", choice1: "Joaquin Phoenix", choice2: "Heath Ledger", choice3: "Jared Leto", choice4: "Jack Nicholson", answer: "Heath Ledger" },
    { question: "Which TV show is about a group of friends living in New York City?", choice1: "Friends", choice2: "Seinfeld", choice3: "How I Met Your Mother", choice4: "All of the above", answer: "All of the above" },
    { question: "Who directed 'Jurassic Park'?", choice1: "James Cameron", choice2: "Steven Spielberg", choice3: "George Lucas", choice4: "Peter Jackson", answer: "Steven Spielberg" },
    { question: "Which movie is the highest-grossing of all time (unadjusted for inflation)?", choice1: "Titanic", choice2: "Avatar", choice3: "Avengers: Endgame", choice4: "Star Wars: The Force Awakens", answer: "Avatar" },
    { question: "Who played Forrest Gump?", choice1: "Tom Hanks", choice2: "Robin Williams", choice3: "Bill Murray", choice4: "John Travolta", answer: "Tom Hanks" },
    { question: "Which TV show features a coffee shop called Central Perk?", choice1: "Friends", choice2: "How I Met Your Mother", choice3: "The Big Bang Theory", choice4: "Seinfeld", answer: "Friends" },
    { question: "Who played Iron Man in the Marvel Cinematic Universe?", choice1: "Chris Evans", choice2: "Robert Downey Jr.", choice3: "Mark Ruffalo", choice4: "Chris Hemsworth", answer: "Robert Downey Jr." },
    { question: "Which movie won the first Academy Award for Best Picture?", choice1: "Wings", choice2: "Sunrise", choice3: "The Broadway Melody", choice4: "All Quiet on the Western Front", answer: "Wings" },
    { question: "Who is the creator of 'The Simpsons'?", choice1: "Matt Groening", choice2: "Seth MacFarlane", choice3: "Trey Parker", choice4: "Mike Judge", answer: "Matt Groening" },
    { question: "Which film franchise features a character named Luke Skywalker?", choice1: "Star Wars", choice2: "Star Trek", choice3: "Indiana Jones", choice4: "Back to the Future", answer: "Star Wars" },
    { question: "Who played Hermione Granger in the Harry Potter films?", choice1: "Emma Watson", choice2: "Emma Stone", choice3: "Natalie Portman", choice4: "Keira Knightley", answer: "Emma Watson" },
    { question: "Which TV show is set in the fictional land of Westeros?", choice1: "The Witcher", choice2: "Game of Thrones", choice3: "Vikings", choice4: "The Mandalorian", answer: "Game of Thrones" },
    { question: "Who directed 'Pulp Fiction'?", choice1: "Martin Scorsese", choice2: "Quentin Tarantino", choice3: "Guy Ritchie", choice4: "Francis Ford Coppola", answer: "Quentin Tarantino" },
    { question: "Which movie features the character 'The Dude'?", choice1: "The Big Lebowski", choice2: "Fargo", choice3: "No Country for Old Men", choice4: "Burn After Reading", answer: "The Big Lebowski" },
    { question: "Who played the title role in 'Wonder Woman' (2017)?", choice1: "Gal Gadot", choice2: "Scarlett Johansson", choice3: "Brie Larson", choice4: "Margot Robbie", answer: "Gal Gadot" },
    { question: "Which TV show is about a chemistry teacher turned meth producer?", choice1: "Breaking Bad", choice2: "Better Call Saul", choice3: "Ozark", choice4: "Narcos", answer: "Breaking Bad" },
    { question: "Who played James Bond in 'Casino Royale' (2006)?", choice1: "Pierce Brosnan", choice2: "Daniel Craig", choice3: "Sean Connery", choice4: "Roger Moore", answer: "Daniel Craig" },
    { question: "Which movie features the song 'Let It Go'?", choice1: "Moana", choice2: "Frozen", choice3: "Tangled", choice4: "Brave", answer: "Frozen" },
    { question: "Who played the main character in 'The Matrix'?", choice1: "Keanu Reeves", choice2: "Laurence Fishburne", choice3: "Hugo Weaving", choice4: "Will Smith", answer: "Keanu Reeves" },
    { question: "Which TV show is set in the fictional town of Springfield?", choice1: "Family Guy", choice2: "The Simpsons", choice3: "South Park", choice4: "King of the Hill", answer: "The Simpsons" },
    { question: "Who directed 'The Lord of the Rings' trilogy?", choice1: "Peter Jackson", choice2: "Steven Spielberg", choice3: "James Cameron", choice4: "George Lucas", answer: "Peter Jackson" },
    { question: "Which movie features a character named Tony Stark?", choice1: "Iron Man", choice2: "Spider-Man", choice3: "Thor", choice4: "Captain America", answer: "Iron Man" },
    { question: "Who played the main character in 'Pirates of the Caribbean'?", choice1: "Orlando Bloom", choice2: "Johnny Depp", choice3: "Geoffrey Rush", choice4: "Keira Knightley", answer: "Johnny Depp" },
//remove to set question category and remove "," from the end of the last question in the array above 
// ];

// Music Questions
// remove to set question category let musicQuestions = [
    { question: "Who is known as the King of Pop?", choice1: "Elvis Presley", choice2: "Michael Jackson", choice3: "Prince", choice4: "Freddie Mercury", answer: "Michael Jackson" },
    { question: "Which band released the album 'Abbey Road'?", choice1: "The Beatles", choice2: "The Rolling Stones", choice3: "Pink Floyd", choice4: "The Who", answer: "The Beatles" },
    { question: "Who sang 'Like a Virgin'?", choice1: "Madonna", choice2: "Cyndi Lauper", choice3: "Whitney Houston", choice4: "Cher", answer: "Madonna" },
    { question: "Which artist is known for the song 'Shape of You'?", choice1: "Ed Sheeran", choice2: "Justin Bieber", choice3: "Shawn Mendes", choice4: "Sam Smith", answer: "Ed Sheeran" },
    { question: "Who is the lead singer of U2?", choice1: "Bono", choice2: "Sting", choice3: "Mick Jagger", choice4: "Bruce Springsteen", answer: "Bono" },
    { question: "Which band released 'Bohemian Rhapsody'?", choice1: "Queen", choice2: "The Beatles", choice3: "Led Zeppelin", choice4: "Pink Floyd", answer: "Queen" },
    { question: "Who is known as the Queen of Soul?", choice1: "Aretha Franklin", choice2: "Whitney Houston", choice3: "Diana Ross", choice4: "Tina Turner", answer: "Aretha Franklin" },
    { question: "Which artist released the album 'Thriller'?", choice1: "Michael Jackson", choice2: "Prince", choice3: "Stevie Wonder", choice4: "Lionel Richie", answer: "Michael Jackson" },
    { question: "Who sang 'Rolling in the Deep'?", choice1: "Adele", choice2: "Beyoncé", choice3: "Rihanna", choice4: "Taylor Swift", answer: "Adele" },
    { question: "Which band is known for the song 'Stairway to Heaven'?", choice1: "Led Zeppelin", choice2: "Pink Floyd", choice3: "The Rolling Stones", choice4: "The Doors", answer: "Led Zeppelin" },
    { question: "Who is the lead singer of Coldplay?", choice1: "Chris Martin", choice2: "Bono", choice3: "Adam Levine", choice4: "Brandon Flowers", answer: "Chris Martin" },
    { question: "Which artist is known for the song 'Poker Face'?", choice1: "Lady Gaga", choice2: "Katy Perry", choice3: "Britney Spears", choice4: "Rihanna", answer: "Lady Gaga" },
    { question: "Who released the album '1989'?", choice1: "Taylor Swift", choice2: "Selena Gomez", choice3: "Ariana Grande", choice4: "Demi Lovato", answer: "Taylor Swift" },
    { question: "Which band is known for the song 'Hotel California'?", choice1: "The Eagles", choice2: "Fleetwood Mac", choice3: "The Rolling Stones", choice4: "The Doors", answer: "The Eagles" },
    { question: "Who is the lead singer of Maroon 5?", choice1: "Adam Levine", choice2: "Chris Martin", choice3: "Bruno Mars", choice4: "Ed Sheeran", answer: "Adam Levine" },
    { question: "Which artist is known for the song 'Purple Rain'?", choice1: "Prince", choice2: "Michael Jackson", choice3: "David Bowie", choice4: "Elton John", answer: "Prince" },
    { question: "Who sang 'I Will Always Love You'?", choice1: "Whitney Houston", choice2: "Mariah Carey", choice3: "Celine Dion", choice4: "Adele", answer: "Whitney Houston" },
    { question: "Which band released 'Smells Like Teen Spirit'?", choice1: "Nirvana", choice2: "Pearl Jam", choice3: "Soundgarden", choice4: "Foo Fighters", answer: "Nirvana" },
    { question: "Who is the lead singer of The Rolling Stones?", choice1: "Mick Jagger", choice2: "Keith Richards", choice3: "Ronnie Wood", choice4: "Charlie Watts", answer: "Mick Jagger" },
    { question: "Which artist is known for the song 'Bad Guy'?", choice1: "Billie Eilish", choice2: "Ariana Grande", choice3: "Dua Lipa", choice4: "Selena Gomez", answer: "Billie Eilish" },
    { question: "Who released the album 'Back to Black'?", choice1: "Amy Winehouse", choice2: "Adele", choice3: "Lana Del Rey", choice4: "Florence Welch", answer: "Amy Winehouse" },
    { question: "Which band is known for the song 'Wonderwall'?", choice1: "Oasis", choice2: "Blur", choice3: "Radiohead", choice4: "Pulp", answer: "Oasis" },
    { question: "Who is the lead singer of Foo Fighters?", choice1: "Dave Grohl", choice2: "Kurt Cobain", choice3: "Eddie Vedder", choice4: "Chris Cornell", answer: "Dave Grohl" },
    { question: "Which artist is known for the song 'Hello'?", choice1: "Adele", choice2: "Beyoncé", choice3: "Rihanna", choice4: "Sia", answer: "Adele" },
    { question: "Who sang 'Uptown Funk'?", choice1: "Mark Ronson ft. Bruno Mars", choice2: "Bruno Mars", choice3: "Pharrell Williams", choice4: "Justin Timberlake", answer: "Mark Ronson ft. Bruno Mars" },
    { question: "Which band released 'Another Brick in the Wall'?", choice1: "Pink Floyd", choice2: "Queen", choice3: "The Who", choice4: "Genesis", answer: "Pink Floyd" },
    { question: "Who is the lead singer of The Killers?", choice1: "Brandon Flowers", choice2: "Alex Turner", choice3: "Matt Bellamy", choice4: "Chris Martin", answer: "Brandon Flowers" },
    { question: "Which artist is known for the song 'Firework'?", choice1: "Katy Perry", choice2: "Lady Gaga", choice3: "Britney Spears", choice4: "Rihanna", answer: "Katy Perry" },
    { question: "Who released the album 'Lemonade'?", choice1: "Beyoncé", choice2: "Rihanna", choice3: "Alicia Keys", choice4: "Nicki Minaj", answer: "Beyoncé" }
];
// Question bank ended

//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};


getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the results page
        return window.location.assign("results.html");
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        console.log(selectedAnswer === currentQuestion.answer);
        
        getNewQuestion();
    });
});

startGame() 
