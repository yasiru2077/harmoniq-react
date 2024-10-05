import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class Song {
  constructor(id, title, artist, genre, year, tempo, energy, danceability) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.genre = genre;
    this.year = year;
    this.tempo = tempo;
    this.energy = energy;
    this.danceability = danceability;
  }
}

// User class to represent user preferences
class User {
  constructor(id, preferredGenres, preferredEra, energyPreference, danceabilityPreference) {
    this.id = id;
    this.preferredGenres = preferredGenres;
    this.preferredEra = preferredEra;
    this.energyPreference = energyPreference;
    this.danceabilityPreference = danceabilityPreference;
  }
}

// Sample database of songs
const songDatabase = [

  new Song(1, "Rockstar Dreams", "The Amplifiers", "Rock", 2010, 120, 0.8, 0.6),
  new Song(2, "Pop Paradise", "Melody Makers", "Pop", 2015, 100, 0.7, 0.9),
  new Song(3, "Jazz Journey", "Smooth Saxophones", "Jazz", 1990, 90, 0.5, 0.3),
  new Song(4, "Electric Pulse", "Neon Nights", "Rock", 2020, 140, 0.9, 0.7),
  new Song(5, "Bubblegum Beats", "Sugar Sonics", "Pop", 2005, 110, 0.6, 0.8),
  new Song(6, "Classic Swing", "Retro Rhythms", "Jazz", 1985, 95, 0.4, 0.5),
  new Song(7, "Future Funk", "Cyber Groove", "Electronic", 2022, 130, 0.85, 0.95),
  new Song(8, "Acoustic Dreams", "Wooden Melodies", "Folk", 2018, 75, 0.3, 0.2),
  new Song(9, "Synthwave Sunset", "Retro Waves", "Electronic", 2019, 100, 0.7, 0.8),
  new Song(10, "Country Roads", "Hilltop Harmonies", "Country", 1995, 85, 0.4, 0.5),
  new Song(11, "Hip Hop Hustle", "Urban Legends", "Hip Hop", 2010, 110, 0.6, 0.7),
  new Song(12, "Blues Boulevard", "Soul Strummers", "Blues", 2000, 105, 0.5, 0.4),
  new Song(13, "Classical Calm", "Orchestra Dreams", "Classical", 1970, 60, 0.2, 0.1),
  new Song(14, "Raging Rock", "Thunder Band", "Rock", 2013, 150, 0.9, 0.8),
  new Song(15, "Dance Delight", "Club Kings", "Dance", 2021, 120, 0.95, 0.9),
  new Song(16, "Reggae Rhythms", "Island Vibes", "Reggae", 1998, 80, 0.6, 0.7),
  new Song(17, "Soulful Serenade", "Heart Singers", "Soul", 2003, 90, 0.5, 0.6),
  new Song(18, "Heavy Metal Thunder", "Iron Clad", "Metal", 2016, 160, 0.95, 0.85),
  new Song(19, "Indie Inspiration", "Garage Band", "Indie", 2011, 115, 0.7, 0.6),
  new Song(20, "Techno Trance", "Digital Dreams", "Techno", 2018, 130, 0.8, 0.9),
  new Song(21, "Folk Fantasy", "Nature Notes", "Folk", 1992, 70, 0.3, 0.4),
  new Song(22, "Latin Lullaby", "Salsa Sounds", "Latin", 2005, 95, 0.5, 0.7),
  new Song(23, "Funk Fusion", "Groove Masters", "Funk", 2007, 115, 0.8, 0.6),
  new Song(24, "Ambient Awakenings", "Dreamy Tunes", "Ambient", 2020, 65, 0.2, 0.1),
  new Song(25, "Punk Pulse", "Rebel Rockers", "Punk", 2012, 145, 0.85, 0.75),
  new Song(26, "R&B Reflections", "Silky Smooth", "R&B", 1999, 100, 0.6, 0.8),
  new Song(27, "Grunge Glory", "Rusty Strings", "Grunge", 1994, 135, 0.7, 0.5),
  new Song(28, "Disco Dreams", "Funky Feet", "Disco", 1978, 125, 0.9, 0.9),
  new Song(29, "Opera Odyssey", "Grand Voices", "Opera", 1965, 70, 0.2, 0.3),
  new Song(30, "World Wander", "Global Sounds", "World", 2001, 90, 0.5, 0.7),
  new Song(31, "Chillwave Chill", "Relaxation Station", "Chillwave", 2023, 95, 0.4, 0.5),
  new Song(32, "K-Pop Kicks", "Star Idols", "K-Pop", 2018, 110, 0.8, 0.9),
  new Song(33, "Ska Skank", "Brass Beats", "Ska", 1996, 105, 0.6, 0.7),
  new Song(34, "Trap Tactics", "Street Beats", "Trap", 2015, 140, 0.85, 0.8),
  new Song(35, "Lo-fi Lounge", "Chill Beats", "Lo-fi", 2022, 75, 0.3, 0.2),
  new Song(36, "Gospel Glory", "Heavenly Harmonies", "Gospel", 1990, 80, 0.5, 0.6),
  new Song(37, "Bluegrass Beats", "Country Strings", "Bluegrass", 1987, 85, 0.4, 0.5),
  new Song(38, "House Harmony", "Club Classics", "House", 2019, 125, 0.9, 0.8),
  new Song(39, "Dubstep Drops", "Bass Blasters", "Dubstep", 2017, 150, 0.95, 0.9),
  new Song(40, "New Age Notes", "Calm Collective", "New Age", 2000, 70, 0.3, 0.4),
  new Song(41, "Trance Travels", "Euphoria Express", "Trance", 2016, 130, 0.85, 0.9),
  new Song(42, "EDM Euphoria", "Festival Faves", "EDM", 2021, 140, 0.95, 0.95),
  new Song(43, "Bossa Nova Bliss", "Smooth Strings", "Bossa Nova", 1993, 85, 0.5, 0.6),
  new Song(44, "Zydeco Zeal", "Cajun Kings", "Zydeco", 2004, 110, 0.6, 0.7),
  new Song(45, "Garage Grooves", "Underground Beats", "Garage", 2010, 120, 0.7, 0.8),
  new Song(46, "Grime Grind", "Street Warriors", "Grime", 2014, 135, 0.8, 0.7),
  new Song(47, "Shoegaze Sound", "Dreamy Distortions", "Shoegaze", 2009, 95, 0.4, 0.5),
  new Song(48, "Bachata Beats", "Dancefloor Dominators", "Bachata", 2013, 105, 0.6, 0.8),
  new Song(49, "Reggaeton Riddims", "Urban Heat", "Reggaeton", 2012, 115, 0.75, 0.85),
  new Song(50, "Afrobeat Adventures", "Rhythm Explorers", "Afrobeat", 2023, 120, 0.8, 0.9),
  new Song(51, "Celtic Chants", "Emerald Echoes", "Celtic", 2001, 80, 0.4, 0.5),
  new Song(52, "Meditation Melodies", "Peaceful Patterns", "Meditation", 2020, 60, 0.2, 0.3),
  new Song(53, "Klezmer Kicks", "Jewish Jazz", "Klezmer", 1995, 100, 0.5, 0.6),
  new Song(54, "Avant-garde Anthems", "Boundary Breakers", "Avant-garde", 2008, 110, 0.6, 0.5),
  new Song(55, "Bollywood Beats", "Desi Dance", "Bollywood", 2015, 130, 0.9, 0.95),
  new Song(56, "Samba Sensations", "Brazilian Beats", "Samba", 1999, 115, 0.7, 0.8),
  new Song(57, "Flamenco Fire", "Spanish Strings", "Flamenco", 2003, 95, 0.5, 0.6),
  new Song(58, "Tango Tunes", "Passionate Pairs", "Tango", 2006, 85, 0.5, 0.7),
  new Song(59, "Dub Delights", "Reggae Roots", "Dub", 2012, 100, 0.6, 0.7),
  new Song(60, "Polka Parade", "Accordion Allies", "Polka", 1980, 90, 0.4, 0.5),
  new Song(61, "Indie Introspections", "Deep Thoughts", "Indie", 2017, 110, 0.7, 0.6),
  new Song(62, "Synth Symphony", "Electronic Orchestra", "Synth", 2021, 130, 0.85, 0.9),
  new Song(63, "Hardcore Harmony", "Metal Masters", "Hardcore", 2014, 160, 0.95, 0.8),
  new Song(64, "Renaissance Reverie", "Ancient Echoes", "Renaissance", 1600, 60, 0.2, 0.2),
  new Song(65, "Big Band Bash", "Swing Set", "Big Band", 1940, 120, 0.8, 0.7),
  new Song(66, "Lounge Lizard", "Chill Cats", "Lounge", 2009, 90, 0.5, 0.6),
  new Song(67, "New Wave Nights", "Retro Revival", "New Wave", 1983, 115, 0.7, 0.8),
  new Song(68, "J-Pop Joy", "Tokyo Tunes", "J-Pop", 2019, 120, 0.85, 0.9),
  new Song(69, "Doo-wop Dreams", "Harmony Heroes", "Doo-wop", 1957, 95, 0.5, 0.6),
  new Song(70, "Baroque Beats", "Classical Ensemble", "Baroque", 1700, 70, 0.3, 0.3),
  new Song(71, "Britpop Bliss", "London Legends", "Britpop", 1995, 110, 0.6, 0.7),
  new Song(72, "Trap Thunder", "Bass Bosses", "Trap", 2016, 140, 0.9, 0.85),
  new Song(73, "Cumbia Celebration", "Fiesta Band", "Cumbia", 2000, 105, 0.6, 0.7),
  new Song(74, "Soulful Strings", "Heartfelt Harmonies", "Soul", 2012, 95, 0.5, 0.6),
  new Song(75, "Dream Pop Delight", "Ethereal Echoes", "Dream Pop", 2020, 85, 0.4, 0.5),
  new Song(76, "Psychedelic Pulse", "Mind Benders", "Psychedelic", 1969, 120, 0.7, 0.6),
  new Song(77, "Gothic Groove", "Dark Shadows", "Gothic", 1989, 115, 0.6, 0.5),
  new Song(78, "Motown Magic", "Soulful Singers", "Motown", 1965, 110, 0.6, 0.8),
  new Song(79, "Rap Rhythms", "Street Poets", "Rap", 2008, 120, 0.7, 0.9),
  new Song(80, "Industrial Impact", "Machine Music", "Industrial", 1993, 130, 0.8, 0.7),
  new Song(81, "Soca Sensation", "Caribbean Crew", "Soca", 2015, 125, 0.9, 0.9),
  new Song(82, "Folk Fusion", "Harmony Harpers", "Folk", 2002, 85, 0.4, 0.5),
  new Song(83, "Rock Revival", "Classic Hits", "Rock", 2011, 140, 0.85, 0.75),
  new Song(84, "Post-rock Patterns", "Atmospheric Artists", "Post-rock", 2018, 95, 0.5, 0.4),
  new Song(85, "Jazz Jams", "Smooth Players", "Jazz", 1990, 100, 0.6, 0.5),
  new Song(86, "Chiptune Channel", "Pixel Pioneers", "Chiptune", 2014, 115, 0.7, 0.8),
  new Song(87, "Psytrance Party", "Mind Alterers", "Psytrance", 2020, 140, 0.9, 0.95),
  new Song(88, "Ambient Adventures", "Soundscapers", "Ambient", 2006, 70, 0.3, 0.2),
  new Song(89, "Rap Revolution", "Rhythm Rebels", "Rap", 2017, 110, 0.8, 0.85),
  new Song(90, "Jazzy Journeys", "Cool Cats", "Jazz", 2005, 95, 0.5, 0.6),
  new Song(91, "Celtic Connections", "Gaelic Gatherers", "Celtic", 1998, 80, 0.4, 0.5),
  new Song(92, "Blues Ballads", "Melancholy Masters", "Blues", 1980, 85, 0.4, 0.5),
  new Song(93, "Ska Sensation", "Brass Bandits", "Ska", 2001, 105, 0.6, 0.7),
  new Song(94, "Futuristic Funk", "Space Groovers", "Funk", 2014, 120, 0.8, 0.9),
  new Song(95, "Surf Soundscapes", "Wave Riders", "Surf", 1963, 110, 0.6, 0.7),
  new Song(96, "Emo Echoes", "Heartbreak Heroes", "Emo", 2003, 95, 0.5, 0.6),
  new Song(97, "Alternative Anthems", "Indie Icons", "Alternative", 1999, 115, 0.7, 0.6),
  new Song(98, "Pop Punk Parade", "Rebel Rockers", "Pop Punk", 2007, 130, 0.85, 0.8),
  new Song(99, "Minimalist Moods", "Simple Sounds", "Minimal", 2018, 75, 0.3, 0.4),
  new Song(100, "Electro Energy", "Voltage Vibes", "Electro", 2016, 135, 0.9, 0.85),
  new Song(101, "Neo-Soul Nights", "Smooth Talkers", "Soul", 2022, 90, 0.7, 0.9),
  new Song(102, "Indie Innocence", "Whispering Winds", "Indie Folk", 2015, 75, 0.6, 0.5),
  new Song(103, "Tech House Trails", "Bass Raiders", "Tech House", 2019, 125, 0.85, 0.9),
  new Song(104, "Garage Groove", "Deep Beat Collective", "Garage", 2016, 115, 0.75, 0.85),
  new Song(105, "Klezmer Kaleidoscope", "Jewish Joy", "Klezmer", 2011, 100, 0.5, 0.7),
  new Song(106, "Eurobeat Energy", "Eurodance Stars", "Eurobeat", 2005, 135, 0.9, 0.85),
  new Song(107, "Sitar Serenade", "Eastern Echoes", "Indian Classical", 1975, 60, 0.3, 0.4),
  new Song(108, "Bolero Beats", "Rhythm Riders", "Bolero", 1994, 85, 0.5, 0.7),
  new Song(109, "Heavy Hearts", "Dark Melodies", "Emo", 2007, 95, 0.5, 0.6),
  new Song(110, "Tribal Trance", "Nature's Pulse", "World", 2013, 105, 0.7, 0.8),
  new Song(111, "Funk Frenzy", "Groove Elements", "Funk", 2008, 110, 0.8, 0.9),
  new Song(112, "Nirvana Notes", "Peaceful Souls", "Meditation", 2020, 60, 0.3, 0.2),
  new Song(113, "Boogie Blues", "Vibrant Voices", "Boogie", 1968, 100, 0.6, 0.8),
  new Song(114, "Tropical Tunes", "Island Sounds", "Tropical", 2016, 120, 0.9, 0.85),
  new Song(115, "Country Crossover", "Urban Cowboys", "Country Pop", 2019, 100, 0.75, 0.8),
  new Song(116, "Afro Groove", "Tribal Harmony", "Afrobeat", 2021, 130, 0.85, 0.9),
  new Song(117, "Cumbia Crush", "Fiesta Kings", "Cumbia", 2008, 95, 0.6, 0.75),
  new Song(118, "Lofi Chill", "Beatsmiths", "Lo-fi", 2020, 80, 0.3, 0.5),
  new Song(119, "Electrostatic Dream", "Pixel Voices", "Chiptune", 2018, 140, 0.85, 0.9),
  new Song(120, "Jazz Jitters", "Soulful Trio", "Jazz", 1997, 90, 0.6, 0.7),
  new Song(121, "Bachata Bliss", "Latin Lovers", "Bachata", 2014, 100, 0.6, 0.7),
  new Song(122, "House of Rhythm", "Bass Jumpers", "House", 2017, 120, 0.8, 0.85),
  new Song(123, "Swing Sensation", "Retro Riffs", "Swing", 1985, 110, 0.7, 0.8),
  new Song(124, "Ethnic Echoes", "Global Roots", "World Music", 1990, 95, 0.5, 0.6),
  new Song(125, "Urban Rhythms", "Street Warriors", "Hip Hop", 2003, 100, 0.6, 0.75),
  new Song(126, "Dub Dreams", "Bass Innovators", "Dubstep", 2015, 150, 0.9, 0.8),
  new Song(127, "Pop Punk Parade", "Skater Dudes", "Pop Punk", 2006, 140, 0.9, 0.85),
  new Song(128, "Soul Survival", "Heart Strummers", "Soul", 2012, 95, 0.7, 0.8),
  new Song(129, "Dark Dances", "Gothic Grooves", "Darkwave", 2009, 135, 0.85, 0.75),
  new Song(130, "Nu Jazz Jams", "The Groove Cats", "Nu Jazz", 2011, 105, 0.7, 0.9),
  new Song(131, "Dub Vibes", "Island Innovators", "Dub", 2008, 115, 0.8, 0.9),
  new Song(132, "Reggae Rhythms", "Roots Revival", "Reggae", 1996, 85, 0.6, 0.75),
  new Song(133, "Calypso Carnival", "Steel Drummers", "Calypso", 1999, 90, 0.7, 0.8),
  new Song(134, "Blues Brothers", "Soulful Shakers", "Blues", 1983, 100, 0.5, 0.6),
  new Song(135, "Neo-Soul Nirvana", "Groove Masters", "Soul", 2017, 90, 0.8, 0.9),
  new Song(136, "Tango Twist", "Passionate Performers", "Tango", 2007, 90, 0.6, 0.7),
  new Song(137, "Electro Anthems", "Bass Bombers", "Electro", 2020, 140, 0.9, 0.95),
  new Song(138, "Celtic Dreams", "Gaelic Gatherers", "Celtic", 2003, 85, 0.4, 0.5),
  new Song(139, "Hardcore Havoc", "Metal Titans", "Hardcore", 2014, 160, 0.95, 0.9),
  new Song(140, "Vaporwave Vibes", "Synth Strangers", "Vaporwave", 2018, 100, 0.7, 0.8),
  new Song(141, "Indie Intrigue", "The Whisperers", "Indie Rock", 2009, 95, 0.6, 0.7),
  new Song(142, "R&B Revolution", "Smooth Operators", "R&B", 2021, 105, 0.8, 0.9),
  new Song(143, "Grime Glory", "East End Crew", "Grime", 2010, 140, 0.85, 0.8),
  new Song(144, "Garage Glory", "Street Innovators", "Garage", 2016, 125, 0.8, 0.85),
  new Song(145, "Rock Revival", "Amped Angels", "Hard Rock", 2015, 130, 0.9, 0.85),
  new Song(146, "Trance Temptation", "Euphoria", "Trance", 2019, 135, 0.85, 0.95),
  new Song(147, "Soulful Serenade", "Heart Singers", "Soul", 2008, 90, 0.7, 0.8),
  new Song(148, "Motown Melody", "Soul Singers", "Motown", 1972, 110, 0.6, 0.8),
  new Song(149, "Afrobeat Beats", "Rhythm Kings", "Afrobeat", 2014, 130, 0.85, 0.9),
  new Song(150, "Dancehall Daze", "Island Icons", "Dancehall", 2005, 110, 0.7, 0.8),
  new Song(151, "Celtic Crossroads", "Gaelic Gatherings", "Celtic", 1998, 80, 0.6, 0.7),
  new Song(152, "Salsa Serenade", "Tropical Tunes", "Salsa", 2010, 95, 0.6, 0.75),
  new Song(153, "Classical Escape", "Symphony Strings", "Classical", 1990, 60, 0.3, 0.4),
  new Song(154, "Tropical Temptation", "Island Dreamers", "Tropical", 2016, 120, 0.8, 0.85),
  new Song(155, "Psychedelic Waves", "Mind Expanders", "Psychedelic Rock", 1969, 90, 0.65, 0.7),
  new Song(156, "Jazz Journey", "Smooth Ensemble", "Jazz", 1999, 85, 0.5, 0.6),
  new Song(157, "Electronic Pulse", "Synth Innovators", "Electronica", 2007, 125, 0.8, 0.85),
  new Song(158, "Desert Dreams", "Middle Eastern Masters", "Middle Eastern", 2002, 95, 0.5, 0.6),
  new Song(159, "K-Pop Kings", "Seoul Stars", "K-Pop", 2020, 125, 0.85, 0.9),
  new Song(160, "Mambo Madness", "Latino Legends", "Mambo", 1992, 100, 0.7, 0.75),
  new Song(161, "Bossa Nova Breeze", "Tropical Groovers", "Bossa Nova", 1966, 95, 0.55, 0.65),
  new Song(162, "Reggaeton Rave", "Urban Vibes", "Reggaeton", 2019, 105, 0.8, 0.85),
  new Song(163, "Chillstep Escape", "Bass Dreamers", "Chillstep", 2018, 140, 0.8, 0.85),
  new Song(164, "Afropop Adventures", "Pan-African Sounds", "Afropop", 2016, 120, 0.75, 0.85),
  new Song(165, "Indie Inspiration", "Creative Minds", "Indie Rock", 2013, 90, 0.7, 0.8),
  new Song(166, "Jazz Funk Fusion", "Groove Collectors", "Jazz Funk", 1977, 110, 0.8, 0.9),
  new Song(167, "Samba Sunshine", "Carnival Kings", "Samba", 1988, 95, 0.6, 0.75),
  new Song(168, "Acoustic Adventures", "Guitar Heroes", "Acoustic", 2014, 85, 0.55, 0.7),
  new Song(169, "Pop Paradise", "Radio Dreams", "Pop", 2021, 100, 0.85, 0.9),
  new Song(170, "New Wave Nostalgia", "Retro Revival", "New Wave", 1983, 110, 0.7, 0.8),
  new Song(171, "Synthpop Sunrise", "Electric Hearts", "Synthpop", 2017, 125, 0.85, 0.9),
  new Song(172, "Alternative Awakening", "Edge of Sound", "Alternative Rock", 2010, 95, 0.7, 0.8),
  new Song(173, "Tango Tempest", "Passionate Performers", "Tango", 2015, 85, 0.65, 0.7),
  new Song(174, "Hip-Hop Hustle", "Street Poets", "Hip-Hop", 2009, 100, 0.7, 0.75),
  new Song(175, "Latin Lounge", "Fiesta Soundtrack", "Latin Jazz", 1998, 90, 0.65, 0.75),
  new Song(176, "Metal Mayhem", "Power Surge", "Metal", 2014, 155, 0.95, 0.85),
  new Song(177, "Dance Delight", "Party Starters", "Dance", 2018, 125, 0.9, 0.85),
  new Song(178, "Ambient Atmosphere", "Dream Weavers", "Ambient", 2017, 60, 0.35, 0.45),
  new Song(179, "Disco Dream", "Funk Fantastic", "Disco", 1979, 120, 0.85, 0.9),
  new Song(180, "Opera Odyssey", "Vocal Virtuosos", "Opera", 1986, 60, 0.3, 0.4),
  new Song(181, "Hip Hop Hype", "Underground Kings", "Hip-Hop", 2020, 110, 0.8, 0.85),
  new Song(182, "Latin Jazz Love", "Havana Vibes", "Latin Jazz", 2004, 100, 0.6, 0.75),
  new Song(183, "Punk Perfection", "The Rebels", "Punk Rock", 1980, 150, 0.9, 0.85),
  new Song(184, "Tribal Trance", "Spiritual Nomads", "World Music", 2019, 100, 0.7, 0.8),
  new Song(185, "Techno Thrills", "Synth Soldiers", "Techno", 2015, 135, 0.9, 0.85),
  new Song(186, "Garage Groove", "Deep Beat Collective", "Garage", 2014, 125, 0.8, 0.85),
  new Song(187, "Acid Adventures", "Psychedelic Explorers", "Acid House", 1996, 125, 0.75, 0.8),
  new Song(188, "Latin Lovers", "Passionate Performers", "Latin Pop", 2019, 100, 0.7, 0.8),
  new Song(189, "Lofi Lounge", "Chill Masters", "Lo-fi", 2020, 85, 0.4, 0.55),
  new Song(190, "Cumbia Carnival", "Fiesta Kings", "Cumbia", 2015, 90, 0.65, 0.7),
  new Song(191, "Soul Symphony", "Heart Strummers", "Soul", 2008, 100, 0.7, 0.75),
  new Song(192, "New Wave Nights", "Synth Revivalists", "New Wave", 1987, 105, 0.75, 0.85),
  new Song(193, "Dance Domination", "Rhythm Rebels", "Dance", 2021, 128, 0.9, 0.85),
  new Song(194, "Chillout Charm", "The Dreamers", "Chillout", 2020, 85, 0.5, 0.6),
  new Song(195, "Afropop Anthem", "Global Rhythms", "Afropop", 2017, 120, 0.85, 0.9),
  new Song(196, "Rave Revolution", "Beat Masters", "Rave", 1993, 135, 0.9, 0.85),
  new Song(197, "Jazz Journey", "Smooth Operators", "Jazz", 2019, 90, 0.65, 0.8),
  new Song(198, "Rock & Roll Revival", "The Legends", "Rock & Roll", 1963, 140, 0.85, 0.9),
  new Song(199, "Ambient Escape", "Ethereal Soundscapes", "Ambient", 2021, 60, 0.35, 0.45),
  new Song(200, "Indie Ignition", "The Wanderers", "Indie Rock", 2016, 110, 0.8, 0.85),

];

const normalizeValue = (value, min, max) => (value - min) / (max - min);

const getUniqueGenres = () => [...new Set(songDatabase.map(song => song.genre))];

const getYearRange = () => {
  const years = songDatabase.map(song => song.year);
  return [Math.min(...years), Math.max(...years)];
};

// Function to calculate similarity score between a song and user preferences
function calculateSimilarity(song, user) {
  let score = 0;
  const genreMatch = user.preferredGenres.includes(song.genre);
  const yearMatch = song.year >= user.preferredEra[0] && song.year <= user.preferredEra[1];
  const energyDiff = Math.abs(song.energy - user.energyPreference);
  const danceabilityDiff = Math.abs(song.danceability - user.danceabilityPreference);

  score += genreMatch ? 0.3 : 0;
  score += yearMatch ? 0.2 : 0;
  score += 0.25 * (1 - energyDiff);
  score += 0.25 * (1 - danceabilityDiff);

  // Bonus for exact genre match
  if (genreMatch) score += 0.1;

  // Penalty for songs too far from preferred era
  const yearDiff = Math.min(Math.abs(song.year - user.preferredEra[0]), Math.abs(song.year - user.preferredEra[1]));
  score -= yearDiff > 10 ? 0.1 : 0;

  return score;
}


// Main recommendation function
function getRecommendations(user, n = 5) {
  const scoredSongs = songDatabase.map(song => ({
    song,
    score: calculateSimilarity(song, user)
  }));

  // Sort by score and add diversity bonus
  scoredSongs.sort((a, b) => b.score - a.score);
  
  const recommendations = [];
  const genreCounts = {};
  
  for (const item of scoredSongs) {
    if (recommendations.length >= n) break;
    
    const { song } = item;
    genreCounts[song.genre] = (genreCounts[song.genre] || 0) + 1;
    
    // Add diversity bonus
    if (genreCounts[song.genre] <= 2) {
      recommendations.push(song);
    } else if (Math.random() < 0.3) { // 30% chance to still include it
      recommendations.push(song);
    }
  }

  return recommendations;
}


function RecommendationPage() {
  const [genres, setGenres] = useState([]);
  const [era, setEra] = useState(getYearRange());
  const [energy, setEnergy] = useState(0.5);
  const [danceability, setDanceability] = useState(0.5);
  const [recommendations, setRecommendations] = useState([]);
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [yearRange, setYearRange] = useState([]);

  useEffect(() => {
    setUniqueGenres(getUniqueGenres());
    setYearRange(getYearRange());
  }, []);

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setGenres(prev => [...prev, value]);
    } else {
      setGenres(prev => prev.filter(genre => genre !== value));
    }
  };

  const handleEraChange = (event, index) => {
    const newEra = [...era];
    newEra[index] = parseInt(event.target.value);
    setEra(newEra);
  };

  const handleGetRecommendations = () => {
    const user = new User(1, genres, era, energy, danceability);
    const newRecommendations = getRecommendations(user);
    setRecommendations(newRecommendations);
  };

  const chartData = recommendations.map(song => ({
    name: song.title,
    energy: song.energy,
    danceability: song.danceability
  }));

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6">Music Recommendation System</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Genres:</h3>
          <div className="grid grid-cols-2 gap-2">
            {uniqueGenres.map(genre => (
              <label key={genre} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={genre}
                  onChange={handleGenreChange}
                  className="form-checkbox"
                />
                <span>{genre}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Preferred Era:</h3>
          <div className="flex space-x-4 items-center">
            <input
              type="number"
              value={era[0]}
              onChange={(e) => handleEraChange(e, 0)}
              min={yearRange[0]}
              max={yearRange[1]}
              className="w-24 p-2 border rounded"
            />
            <span>to</span>
            <input
              type="number"
              value={era[1]}
              onChange={(e) => handleEraChange(e, 1)}
              min={yearRange[0]}
              max={yearRange[1]}
              className="w-24 p-2 border rounded"
            />
          </div>
        </div>
      </div>

      <div className="my-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Energy: {energy}</h3>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={energy}
            onChange={(e) => setEnergy(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Danceability: {danceability}</h3>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={danceability}
            onChange={(e) => setDanceability(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <button 
        onClick={handleGetRecommendations}
        className="w-full bg-blue-500 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
      >
        Get Recommendations
      </button>

      {recommendations.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Recommendations:</h3>
          <ul className="space-y-2">
            {recommendations.map(song => (
              <li key={song.id} className="bg-gray-100 p-3 rounded-lg">
                <span className="font-semibold">{song.title}</span> by {song.artist}
                <br />
                <span className="text-sm text-gray-600">
                  {song.genre}, {song.year} | Energy: {song.energy.toFixed(2)} | Danceability: {song.danceability.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h4 className="text-xl font-semibold mb-4">Energy and Danceability Comparison</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="energy" fill="#8884d8" />
                <Bar dataKey="danceability" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecommendationPage;