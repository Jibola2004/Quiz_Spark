-- Drop tables if they exist
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS questions;

-- Create subjects table
CREATE TABLE subjects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

-- Create questions table
CREATE TABLE questions (
  question_id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject_id INTEGER NOT NULL,
  question TEXT NOT NULL,
  options TEXT NOT NULL,  -- JSON array string of options
  FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

-- Insert subjects
INSERT INTO subjects (name) VALUES ('Mathematics');
INSERT INTO subjects (name) VALUES ('English');
INSERT INTO subjects (name) VALUES ('Physics');
INSERT INTO subjects (name) VALUES ('Chemistry');
INSERT INTO subjects (name) VALUES ('Biology');
INSERT INTO subjects (name) VALUES ('Computer');

-- Insert Mathematics questions (29 questions)
INSERT INTO questions (subject_id, question, options) VALUES
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is 7 × 8?', '["54", "56", "58", "60"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the square root of 81?', '["7", "8", "9", "10"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is 15% of 200?', '["25", "30", "35", "40"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'Solve for x: 2x + 3 = 11', '["2", "3", "4", "5"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the value of π (pi) approximately?', '["2.14", "3.14", "4.14", "5.14"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is 12 squared?', '["122", "144", "156", "169"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the derivative of x²?', '["x", "2x", "x²", "2"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the sum of angles in a triangle?', '["90°", "180°", "270°", "360°"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is 5 factorial (5!)?', '["60", "100", "120", "150"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the next prime number after 7?', '["8", "9", "10", "11"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the formula for the area of a circle?', '["πr", "πr²", "2πr", "πd"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is 45 degrees in radians?', '["π/2", "π/4", "π/3", "π/6"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'Solve for y: 3y - 4 = 11', '["3", "4", "5", "6"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the sum of the first 10 natural numbers?', '["45", "50", "55", "60"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the median of 2, 3, 5, 8, 9?', '["3", "5", "6", "8"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the value of cos 0°?', '["0", "0.5", "1", "-1"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the integral of 1/x dx?', '["ln|x| + C", "x + C", "1/x + C", "e^x + C"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the next number in the sequence 2, 4, 8, 16, ?', '["18", "20", "24", "32"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the solution to 4x = 20?', '["3", "4", "5", "6"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is 3 to the power of 3?', '["6", "9", "27", "81"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'How many sides does a hexagon have?', '["5", "6", "7", "8"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the volume formula for a cube?', '["s³", "6s²", "4πr²", "πr²h"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is 10% of 150?', '["10", "15", "20", "25"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the value of tan 45°?', '["0", "1", "√2", "√3"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'Simplify: (x²)(x³)', '["x⁵", "x⁶", "x⁹", "x⁸"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the square of 0?', '["0", "1", "-1", "Undefined"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'Find the GCD of 24 and 36.', '["6", "8", "12", "18"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the solution to the equation x² = 16?', '["2 and -2", "4 only", "-4 only", "0"]'),
((SELECT id FROM subjects WHERE name='Mathematics'), 'What is the next Fibonacci number after 13?', '["15", "18", "21", "22"]');

-- Insert English questions (29 questions)
INSERT INTO questions (subject_id, question, options) VALUES
((SELECT id FROM subjects WHERE name='English'), 'Which word is a noun?', '["Run", "Happiness", "Quickly", "Blue"]'),
((SELECT id FROM subjects WHERE name='English'), 'What is the past tense of “go”?', '["Goed", "Went", "Going", "Gone"]'),
((SELECT id FROM subjects WHERE name='English'), 'Choose the correct spelling:', '["Recieve", "Receive", "Recive", "Recieeve"]'),
((SELECT id FROM subjects WHERE name='English'), 'What is an antonym of “happy”?', '["Sad", "Glad", "Joyful", "Excited"]'),
((SELECT id FROM subjects WHERE name='English'), 'Which sentence is correct?', '["I is going", "She are coming", "They is here", "He is late"]'),
((SELECT id FROM subjects WHERE name='English'), 'What part of speech is “beautiful”?', '["Noun", "Verb", "Adjective", "Adverb"]'),
((SELECT id FROM subjects WHERE name='English'), 'Identify the pronoun: “She went to school.”', '["She", "Went", "School", "To"]'),
((SELECT id FROM subjects WHERE name='English'), 'Choose the correct article: ___ apple', '["A", "An", "The", "None"]'),
((SELECT id FROM subjects WHERE name='English'), 'What is a synonym of “fast”?', '["Slow", "Quick", "Heavy", "Tall"]'),
((SELECT id FROM subjects WHERE name='English'), 'Which sentence uses a comma correctly?', '["I like apples and oranges, but not bananas.", "I like apples, and oranges but not bananas.", "I like, apples and oranges but not bananas.", "I like apples and oranges but, not bananas."]'),
((SELECT id FROM subjects WHERE name='English'), 'What is a compound sentence?', '["Sentence with one clause", "Sentence with two independent clauses", "Sentence with no verbs", "Sentence with questions"]'),
((SELECT id FROM subjects WHERE name='English'), 'Identify the verb in “He is running fast.”', '["He", "Is", "Running", "Fast"]'),
((SELECT id FROM subjects WHERE name='English'), 'What is the plural of “child”?', '["Childs", "Childes", "Children", "Child"]'),
((SELECT id FROM subjects WHERE name='English'), 'Choose the correct preposition: “She is good ___ math.”', '["At", "In", "On", "Of"]'),
((SELECT id FROM subjects WHERE name='English'), 'Which sentence is in passive voice?', '["The cat chased the mouse.", "The mouse was chased by the cat.", "The cat is chasing the mouse.", "The mouse chases the cat."]'),
((SELECT id FROM subjects WHERE name='English'), 'What is an idiom?', '["Literal phrase", "Phrase with a figurative meaning", "Scientific term", "Grammar rule"]'),
((SELECT id FROM subjects WHERE name='English'), 'Which is a conjunction?', '["And", "But", "Or", "All of these"]'),
((SELECT id FROM subjects WHERE name='English'), 'What is the correct form of the verb? “She ___ to the store yesterday.”', '["Go", "Goes", "Went", "Going"]'),
((SELECT id FROM subjects WHERE name='English'), 'What is a homophone?', '["Word that sounds the same but different meaning/spelling", "Word spelled the same but different meaning", "Word with multiple meanings", "None"]'),
((SELECT id FROM subjects WHERE name='English'), 'Choose the correct comparative:', '["Gooder", "Better", "Best", "More good"]'),
((SELECT id FROM subjects WHERE name='English'), 'Identify the subject: “The dog barked loudly.”', '["Dog", "Barked", "Loudly", "The"]'),
((SELECT id FROM subjects WHERE name='English'), 'What is a metaphor?', '["Comparison using “like” or “as”", "Direct comparison without “like” or “as”", "Literal meaning", "None"]'),
((SELECT id FROM subjects WHERE name='English'), 'What is the superlative of “happy”?', '["Happier", "Happiest", "More happy", "Most happy"]'),
((SELECT id FROM subjects WHERE name='English'), 'Which word is an adverb?', '["Quickly", "Quiet", "Quick", "Quietly"]'),
((SELECT id FROM subjects WHERE name='English'), 'What is the tense of “I have eaten”?', '["Present perfect", "Past", "Future", "Present"]'),
((SELECT id FROM subjects WHERE name='English'), 'Choose the correct sentence:', '["Me and him went to the store.", "He and I went to the store.", "Him and I went to the store.", "I and him went to the store."]'),
((SELECT id FROM subjects WHERE name='English'), 'What is the meaning of the prefix “un-”?', '["Not", "Before", "After", "Again"]');

-- Insert Physics questions
INSERT INTO questions (subject_id, question, options) VALUES
((SELECT id FROM subjects WHERE name='Physics'), 'What is the unit of force?', '["Newton", "Joule", "Pascal", "Watt"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What is the speed of light?', '["3x10^8 m/s", "3x10^6 m/s", "3x10^5 m/s", "3x10^3 m/s"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'Who discovered gravity?', '["Newton", "Einstein", "Galileo", "Faraday"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What is the formula for work?', '["Force × Distance", "Mass × Acceleration", "Velocity × Time", "Power × Time"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What is the SI unit of power?', '["Watt", "Joule", "Newton", "Pascal"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What is the acceleration due to gravity on Earth?', '["9.8 m/s²", "8.9 m/s²", "10 m/s²", "9 m/s²"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'Which law states F = ma?', '["Newton’s Second Law", "Newton’s First Law", "Newton’s Third Law", "Law of Gravitation"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What is kinetic energy?', '["Energy of motion", "Stored energy", "Thermal energy", "Nuclear energy"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What is the frequency unit?', '["Hertz", "Newton", "Joule", "Watt"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'Which particle has a negative charge?', '["Electron", "Proton", "Neutron", "Photon"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What type of lens is used in a magnifying glass?', '["Convex", "Concave", "Plano-convex", "Biconcave"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'Which device measures current?', '["Ammeter", "Voltmeter", "Thermometer", "Galvanometer"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What is Ohm’s law?', '["V = IR", "P = IV", "F = ma", "W = Fd"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What is the unit of resistance?', '["Ohm", "Ampere", "Volt", "Coulomb"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'Which wave is a mechanical wave?', '["Sound", "Light", "X-ray", "Microwave"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What is the function of a fuse?', '["Protect circuits", "Generate power", "Measure resistance", "Transmit signals"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'Which is a scalar quantity?', '["Speed", "Velocity", "Force", "Displacement"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What is the escape velocity of Earth?', '["11.2 km/s", "9.8 km/s", "7.9 km/s", "3.2 km/s"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'Which instrument measures pressure?', '["Barometer", "Ammeter", "Manometer", "Galvanometer"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What causes tides?', '["Moon’s gravity", "Sun’s gravity", "Wind", "Rain"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'Who proposed the theory of relativity?', '["Einstein", "Newton", "Galileo", "Bohr"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'Which electromagnetic wave has the shortest wavelength?', '["Gamma rays", "X-rays", "Ultraviolet", "Radio waves"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What is the SI unit of temperature?', '["Kelvin", "Celsius", "Fahrenheit", "Joule"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What is inertia?', '["Resistance to motion change", "Speed", "Mass", "Energy"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'Which energy transformation occurs in a battery?', '["Chemical to Electrical", "Thermal to Mechanical", "Nuclear to Thermal", "Electrical to Chemical"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'Which law states energy is conserved?', '["Law of Conservation of Energy", "Ohm’s Law", "Hooke’s Law", "Newton’s Law"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What is reflection?', '["Bouncing of light", "Bending of light", "Scattering of light", "Absorption of light"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What is the unit of charge?', '["Coulomb", "Ohm", "Volt", "Ampere"]'),
((SELECT id FROM subjects WHERE name='Physics'), 'What is the center of mass?', '["Average position of mass", "Velocity point", "Momentum point", "Origin"]');


--- Insert Biology Questions

INSERT INTO questions (subject_id, question, options) VALUES
((SELECT id FROM subjects WHERE name='Biology'), 'What is the basic unit of life?', '["Cell", "Atom", "Organ", "Tissue"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which organelle is responsible for energy production?', '["Nucleus", "Mitochondria", "Ribosome", "Lysosome"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'What pigment gives plants their green color?', '["Chlorophyll", "Hemoglobin", "Melanin", "Keratin"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which part of the plant conducts photosynthesis?', '["Leaf", "Stem", "Root", "Flower"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'What is the process of cell division in somatic cells called?', '["Meiosis", "Binary Fission", "Mitosis", "Budding"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'DNA stands for?', '["Deoxyribonucleic Acid", "Dinucleotide Acid", "Ribonucleic Acid", "Double Helix Acid"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which blood cells help in clotting?', '["Platelets", "Red blood cells", "White blood cells", "Plasma"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'What is the largest organ in the human body?', '["Skin", "Liver", "Heart", "Brain"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which organ filters blood in the human body?', '["Kidney", "Heart", "Lungs", "Stomach"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which vitamin is produced when the skin is exposed to sunlight?', '["Vitamin D", "Vitamin C", "Vitamin A", "Vitamin K"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'How many chambers are in the human heart?', '["4", "2", "3", "5"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which blood group is a universal donor?', '["O-", "A", "AB", "B+"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'What is the powerhouse of the cell?', '["Mitochondria", "Nucleus", "Ribosome", "Golgi apparatus"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which system is responsible for transporting blood?', '["Circulatory system", "Respiratory system", "Nervous system", "Digestive system"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'What do red blood cells carry?', '["Oxygen", "Carbon dioxide", "Nutrients", "Hormones"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which part of the brain controls balance?', '["Cerebellum", "Cerebrum", "Medulla", "Thalamus"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which gas do humans exhale?', '["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which is not part of the female reproductive system?', '["Vas deferens", "Ovary", "Uterus", "Fallopian tube"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'What is the term for animals that eat both plants and animals?', '["Omnivores", "Herbivores", "Carnivores", "Insectivores"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which part of the eye controls the amount of light entering?', '["Iris", "Pupil", "Lens", "Retina"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'What is the function of white blood cells?', '["Fight infection", "Transport oxygen", "Clot blood", "Digest food"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which organ secretes insulin?', '["Pancreas", "Liver", "Kidney", "Spleen"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which kingdom do mushrooms belong to?', '["Fungi", "Plantae", "Animalia", "Protista"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'How many bones are in the adult human body?', '["206", "201", "212", "198"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which type of joint is found in the shoulder?', '["Ball and socket", "Hinge", "Pivot", "Gliding"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which part of a plant absorbs water?', '["Root", "Stem", "Leaf", "Flower"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'What is the function of the ribosome?', '["Protein synthesis", "Energy production", "Waste removal", "Cell division"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'What is the study of heredity called?', '["Genetics", "Biology", "Ecology", "Zoology"]'),
((SELECT id FROM subjects WHERE name='Biology'), 'Which component of blood fights infections?', '["White blood cells", "Red blood cells", "Platelets", "Plasma"]');

---Insert Chemistry questions
INSERT INTO questions (subject_id, question, options) VALUES
((SELECT id FROM subjects WHERE name='Chemistry'), 'What is the chemical symbol for gold?', '["Au", "Ag", "Gd", "Go"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Which gas is produced during photosynthesis?', '["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'What is the pH of a neutral solution?', '["7", "0", "14", "5"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Water is made up of which two elements?', '["Hydrogen and Oxygen", "Hydrogen and Nitrogen", "Oxygen and Carbon", "Carbon and Hydrogen"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Which element is found in all organic compounds?', '["Carbon", "Oxygen", "Hydrogen", "Nitrogen"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Which of the following is a noble gas?', '["Neon", "Nitrogen", "Oxygen", "Hydrogen"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'What is the chemical formula of table salt?', '["NaCl", "KCl", "HCl", "Na2CO3"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Who is considered the father of modern chemistry?', '["Antoine Lavoisier", "Isaac Newton", "Dmitri Mendeleev", "John Dalton"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'What is the atomic number of carbon?', '["6", "12", "8", "4"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Which acid is found in vinegar?', '["Acetic acid", "Citric acid", "Hydrochloric acid", "Sulfuric acid"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'What type of bond involves the sharing of electron pairs?', '["Covalent bond", "Ionic bond", "Metallic bond", "Hydrogen bond"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'What is the periodic table?', '["A table of chemical elements", "A multiplication chart", "A list of compounds", "A heat scale"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Which element is a liquid at room temperature?', '["Mercury", "Iron", "Aluminum", "Helium"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'What is the most abundant gas in Earth’s atmosphere?', '["Nitrogen", "Oxygen", "Carbon dioxide", "Hydrogen"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'What is formed when an acid reacts with a base?', '["Salt and water", "Gas", "Metal", "Alcohol"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Which metal is the best conductor of electricity?', '["Silver", "Copper", "Aluminum", "Gold"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Which particle has a negative charge?', '["Electron", "Proton", "Neutron", "Photon"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Which of these is an exothermic process?', '["Combustion", "Melting", "Boiling", "Evaporation"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'What is the molar mass of water (H₂O)?', '["18 g/mol", "20 g/mol", "16 g/mol", "22 g/mol"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'What is a catalyst?', '["A substance that speeds up a reaction", "A reactant", "A product", "A solvent"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Which of these is a chemical change?', '["Burning wood", "Melting ice", "Boiling water", "Freezing juice"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Which acid is used in car batteries?', '["Sulfuric acid", "Nitric acid", "Hydrochloric acid", "Acetic acid"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'What is an alloy?', '["A mixture of metals", "A pure metal", "A compound", "A non-metal"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'What is the valency of hydrogen?', '["1", "2", "3", "4"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Which gas is used in fire extinguishers?', '["Carbon dioxide", "Oxygen", "Nitrogen", "Helium"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Which is the lightest element?', '["Hydrogen", "Helium", "Oxygen", "Lithium"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Which type of bond is found in sodium chloride (NaCl)?', '["Ionic", "Covalent", "Metallic", "Hydrogen"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'Which element has the symbol “Fe”?', '["Iron", "Fluorine", "Francium", "Fermium"]'),
((SELECT id FROM subjects WHERE name='Chemistry'), 'What is the boiling point of water in Celsius?', '["100°C", "0°C", "212°C", "50°C"]');

--- Insert Computer questions

INSERT INTO questions (subject_id, question, options) VALUES
((SELECT id FROM subjects WHERE name='Computer'), 'What does CPU stand for?', '["Central Processing Unit", "Control Processing Unit", "Computer Processing Unit", "Central Power Unit"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'What is the brain of the computer?', '["CPU", "RAM", "Hard Drive", "Monitor"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'What does RAM stand for?', '["Random Access Memory", "Read Access Memory", "Rapid Access Module", "Run Active Memory"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'Which of these is an input device?', '["Mouse", "Monitor", "Speaker", "Printer"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'What does HTML stand for?', '["HyperText Markup Language", "HighText Machine Language", "Hyperlink Text Management Language", "HyperTransfer Markup Language"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'Which device stores data permanently?', '["Hard Drive", "RAM", "Cache", "ROM"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'What is used to browse the internet?', '["Web Browser", "Word Processor", "Spreadsheet", "Compiler"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'Which key is used to delete characters to the left?', '["Backspace", "Delete", "Shift", "Ctrl"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'What does OS stand for?', '["Operating System", "Open Software", "Online Service", "Operating Storage"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'Which of these is not an operating system?', '["Python", "Windows", "Linux", "macOS"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'What does USB stand for?', '["Universal Serial Bus", "United System Board", "Universal System Base", "United Serial Bus"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'Which one is a programming language?', '["Java", "Photoshop", "Excel", "PowerPoint"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'Which of these is a search engine?', '["Google", "Windows", "Facebook", "Excel"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'What does GUI stand for?', '["Graphical User Interface", "Graphical Unit Interface", "General User Input", "Global Utility Interface"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'Which company developed Windows OS?', '["Microsoft", "Apple", "IBM", "Google"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'What does HTTP stand for?', '["HyperText Transfer Protocol", "HighText Transfer Protocol", "HyperTerminal Transfer Path", "HyperText Transfer Pathway"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'Which of these is used to write code?', '["IDE", "PDF", "PPT", "JPEG"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'Which file extension is used for Microsoft Word?', '[".docx", ".exe", ".mp3", ".jpg"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'What is malware?', '["Malicious software", "Memory hardware", "Main software", "Manual ware"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'What is the full form of IP?', '["Internet Protocol", "Internal Process", "Input Port", "Internet Port"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'Which of these is not a hardware?', '["Operating System", "Monitor", "Keyboard", "Printer"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'Which company created the iPhone?', '["Apple", "Google", "Microsoft", "Samsung"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'What is the shortcut for Copy?', '["Ctrl + C", "Ctrl + X", "Ctrl + V", "Ctrl + P"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'What does URL stand for?', '["Uniform Resource Locator", "Universal Resource Link", "Unified Result Locator", "User Resource Line"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'Which device is used for printing?', '["Printer", "Scanner", "Monitor", "Mouse"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'What is an algorithm?', '["A step-by-step procedure to solve a problem", "A file extension", "A computer virus", "A programming error"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'Which of these is used to store a collection of data?', '["Database", "Web browser", "Compiler", "Monitor"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'Which one is not a storage device?', '["Router", "Hard Drive", "SSD", "Flash Drive"]'),
((SELECT id FROM subjects WHERE name='Computer'), 'Which language is primarily used for web development?', '["HTML", "Python", "Java", "C++"]');
