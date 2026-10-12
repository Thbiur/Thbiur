/*
 * Cocktail-Datenbank
 * Rezepte orientieren sich an den offiziellen IBA-Spezifikationen
 * (International Bartenders Association) plus einige beliebte Extras.
 *
 * Kurzschlüssel:
 *   n = Name, c = Kategorie, b = Basis-Spirituose, g = Glas, t = Technik,
 *   z = Garnitur, i = Zutaten [Menge, Zutat], s = Zubereitung, f = Fun Fact
 *
 * Kategorien:
 *   u = Unvergessliche Klassiker, m = Moderne Klassiker,
 *   n = Neue Ära, p = Beliebte Extras
 */
const COCKTAILS = [
  /* ───────────── Unvergessliche Klassiker ───────────── */
  {
    n: "Alexander", c: "u", b: "Brandy", g: "Cocktailschale", t: "Geschüttelt",
    z: "Frisch geriebene Muskatnuss",
    i: [["3 cl", "Cognac"], ["3 cl", "Crème de Cacao (braun)"], ["3 cl", "Sahne"]],
    s: ["Alle Zutaten mit Eis kräftig shaken.", "In eine vorgekühlte Cocktailschale abseihen.", "Mit Muskatnuss bestreuen."],
    f: "Soll 1922 zur Hochzeit von Prinzessin Mary in London kreiert worden sein."
  },
  {
    n: "Americano", c: "u", b: "Likör", g: "Tumbler", t: "Gebaut",
    z: "Halbe Orangenscheibe, Zitronenzeste",
    i: [["3 cl", "Campari"], ["3 cl", "Roter Wermut"], ["", "Soda zum Auffüllen"]],
    s: ["Tumbler mit Eiswürfeln füllen.", "Campari und Wermut hineingeben.", "Mit Soda auffüllen und kurz umrühren."],
    f: "Der direkte Vorfahre des Negroni – Graf Negroni wollte ihn stärker und ließ Soda durch Gin ersetzen."
  },
  {
    n: "Angel Face", c: "u", b: "Gin", g: "Cocktailschale", t: "Geschüttelt",
    z: "—",
    i: [["3 cl", "Gin"], ["3 cl", "Apricot Brandy"], ["3 cl", "Calvados"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."]
  },
  {
    n: "Aviation", c: "u", b: "Gin", g: "Cocktailschale", t: "Geschüttelt",
    z: "Cocktailkirsche",
    i: [["4,5 cl", "Gin"], ["1,5 cl", "Maraschino"], ["1,5 cl", "Frischer Zitronensaft"], ["1 BL", "Crème de Violette"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen.", "Mit einer Kirsche garnieren."],
    f: "Die Crème de Violette gibt ihm die himmelblaue Farbe – daher der Name."
  },
  {
    n: "Between the Sheets", c: "u", b: "Rum", g: "Cocktailschale", t: "Geschüttelt",
    z: "—",
    i: [["3 cl", "Weißer Rum"], ["3 cl", "Cognac"], ["3 cl", "Triple Sec"], ["2 cl", "Frischer Zitronensaft"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."],
    f: "Im Grunde ein Sidecar mit zusätzlichem Rum."
  },
  {
    n: "Boulevardier", c: "u", b: "Whiskey", g: "Cocktailschale", t: "Gerührt",
    z: "Orangenzeste",
    i: [["4,5 cl", "Bourbon oder Rye"], ["3 cl", "Campari"], ["3 cl", "Roter Wermut"]],
    s: ["Alle Zutaten im Rührglas mit Eis kalt rühren.", "In eine gekühlte Cocktailschale abseihen.", "Orangenzeste darüber ausdrücken."],
    f: "Der Negroni mit Whiskey statt Gin – benannt nach einem Pariser Magazin der 1920er."
  },
  {
    n: "Brandy Crusta", c: "u", b: "Brandy", g: "Kleines Weinglas", t: "Geschüttelt",
    z: "Zuckerrand, lange Zitronenzeste",
    i: [["5,25 cl", "Brandy"], ["0,75 cl", "Maraschino"], ["1,5 cl", "Frischer Zitronensaft"], ["1 BL", "Zuckersirup"], ["2 Spritzer", "Aromatic Bitters"]],
    s: ["Glas mit Zuckerrand vorbereiten und eine lange Zitronenzeste innen einlegen.", "Alle Zutaten mit Eis shaken.", "Ins vorbereitete Glas abseihen."],
    f: "Entstand um 1850 in New Orleans und gilt als Urahn des Sidecar."
  },
  {
    n: "Casino", c: "u", b: "Gin", g: "Cocktailschale", t: "Geschüttelt",
    z: "Zitronenzeste, Cocktailkirsche",
    i: [["4 cl", "Old Tom Gin"], ["1 cl", "Maraschino"], ["1 cl", "Orange Bitters"], ["1 cl", "Frischer Zitronensaft"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen.", "Garnieren."]
  },
  {
    n: "Clover Club", c: "u", b: "Gin", g: "Cocktailschale", t: "Geschüttelt",
    z: "Frische Himbeeren",
    i: [["4,5 cl", "Gin"], ["1,5 cl", "Himbeersirup"], ["1,5 cl", "Frischer Zitronensaft"], ["einige Tropfen", "Eiweiß"]],
    s: ["Alle Zutaten ohne Eis kräftig shaken (Dry Shake).", "Eis hinzufügen und erneut shaken.", "In eine gekühlte Cocktailschale doppelt abseihen."],
    f: "Benannt nach einem Herrenclub in Philadelphia um 1900."
  },
  {
    n: "Daiquiri", c: "u", b: "Rum", g: "Cocktailschale", t: "Geschüttelt",
    z: "—",
    i: [["6 cl", "Weißer Rum"], ["2 cl", "Frischer Limettensaft"], ["1,5 cl", "Zuckersirup"]],
    s: ["Alle Zutaten mit Eis kräftig shaken.", "In eine gekühlte Cocktailschale doppelt abseihen."],
    f: "Benannt nach einem Strand nahe Santiago de Cuba. Der perfekte Test für jede Bar."
  },
  {
    n: "Dry Martini", c: "u", b: "Gin", g: "Martiniglas", t: "Gerührt",
    z: "Olive oder Zitronenzeste",
    i: [["6 cl", "Gin"], ["1 cl", "Trockener Wermut"]],
    s: ["Gin und Wermut im Rührglas mit Eis kalt rühren.", "In ein gekühltes Martiniglas abseihen.", "Mit Olive oder Zitronenzeste garnieren."],
    f: "„Shaken, not stirred“? Klassisch wird er gerührt – das hält ihn klar und seidig."
  },
  {
    n: "Gin Fizz", c: "u", b: "Gin", g: "Highball", t: "Geschüttelt",
    z: "Zitronenscheibe",
    i: [["4,5 cl", "Gin"], ["3 cl", "Frischer Zitronensaft"], ["1 cl", "Zuckersirup"], ["", "Soda zum Auffüllen"]],
    s: ["Gin, Zitronensaft und Sirup mit Eis shaken.", "In ein Highball-Glas (mit oder ohne Eis) abseihen.", "Mit Soda auffüllen."]
  },
  {
    n: "Hanky Panky", c: "u", b: "Gin", g: "Cocktailschale", t: "Gerührt",
    z: "Orangenzeste",
    i: [["4,5 cl", "Gin"], ["4,5 cl", "Roter Wermut"], ["0,75 cl", "Fernet-Branca"]],
    s: ["Alle Zutaten im Rührglas mit Eis kalt rühren.", "In eine gekühlte Cocktailschale abseihen.", "Orangenzeste darüber ausdrücken."],
    f: "Erfunden von Ada Coleman, der legendären Head Bartenderin der American Bar im Savoy."
  },
  {
    n: "John Collins", c: "u", b: "Gin", g: "Highball", t: "Gebaut",
    z: "Zitronenscheibe, Cocktailkirsche",
    i: [["4,5 cl", "Gin"], ["3 cl", "Frischer Zitronensaft"], ["1,5 cl", "Zuckersirup"], ["6 cl", "Soda"]],
    s: ["Glas mit Eis füllen.", "Gin, Zitronensaft und Sirup hineingeben.", "Mit Soda auffüllen und sanft umrühren."],
    f: "Mit Old Tom Gin wird daraus der Tom Collins."
  },
  {
    n: "Last Word", c: "u", b: "Gin", g: "Cocktailschale", t: "Geschüttelt",
    z: "—",
    i: [["2,25 cl", "Gin"], ["2,25 cl", "Grüne Chartreuse"], ["2,25 cl", "Maraschino"], ["2,25 cl", "Frischer Limettensaft"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."],
    f: "Vier Zutaten zu gleichen Teilen – Vorbild für unzählige moderne Twists."
  },
  {
    n: "Manhattan", c: "u", b: "Whiskey", g: "Cocktailschale", t: "Gerührt",
    z: "Cocktailkirsche",
    i: [["5 cl", "Rye Whiskey"], ["2 cl", "Roter Wermut"], ["1 Spritzer", "Angostura Bitters"]],
    s: ["Alle Zutaten im Rührglas mit Eis kalt rühren.", "In eine gekühlte Cocktailschale abseihen.", "Mit Kirsche garnieren."]
  },
  {
    n: "Martinez", c: "u", b: "Gin", g: "Cocktailschale", t: "Gerührt",
    z: "Zitronenzeste",
    i: [["4,5 cl", "Old Tom Gin"], ["4,5 cl", "Roter Wermut"], ["1 BL", "Maraschino"], ["2 Spritzer", "Orange Bitters"]],
    s: ["Alle Zutaten im Rührglas mit Eis kalt rühren.", "In eine gekühlte Cocktailschale abseihen.", "Zitronenzeste darüber ausdrücken."],
    f: "Gilt als Vorläufer des Dry Martini."
  },
  {
    n: "Mary Pickford", c: "u", b: "Rum", g: "Cocktailschale", t: "Geschüttelt",
    z: "—",
    i: [["6 cl", "Weißer Rum"], ["1 cl", "Maraschino"], ["6 cl", "Ananassaft"], ["1 BL", "Grenadine"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."],
    f: "Benannt nach dem Stummfilmstar, kreiert in Havanna während der Prohibition."
  },
  {
    n: "Monkey Gland", c: "u", b: "Gin", g: "Cocktailschale", t: "Geschüttelt",
    z: "—",
    i: [["5 cl", "Gin"], ["3 cl", "Orangensaft"], ["2 Spritzer", "Absinth"], ["2 Spritzer", "Grenadine"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."]
  },
  {
    n: "Negroni", c: "u", b: "Gin", g: "Tumbler", t: "Gerührt",
    z: "Halbe Orangenscheibe",
    i: [["3 cl", "Gin"], ["3 cl", "Campari"], ["3 cl", "Roter Wermut"]],
    s: ["Alle Zutaten direkt in einen Tumbler mit Eis geben.", "Kalt rühren.", "Mit Orangenscheibe garnieren."],
    f: "Florenz, 1919: Graf Camillo Negroni bestellte einen Americano mit Gin statt Soda."
  },
  {
    n: "Old Fashioned", c: "u", b: "Whiskey", g: "Tumbler", t: "Gerührt",
    z: "Orangenzeste, Cocktailkirsche",
    i: [["4,5 cl", "Bourbon oder Rye"], ["1", "Zuckerwürfel"], ["ein paar Spritzer", "Angostura Bitters"], ["ein paar Spritzer", "Wasser"]],
    s: ["Zuckerwürfel im Tumbler mit Bitters und Wasser tränken und auflösen.", "Eiswürfel und Whiskey hinzugeben.", "Rühren, bis alles kalt ist.", "Mit Orangenzeste und Kirsche garnieren."],
    f: "Die Urform des Cocktails: Spirituose, Zucker, Wasser, Bitters."
  },
  {
    n: "Paradise", c: "u", b: "Gin", g: "Cocktailschale", t: "Geschüttelt",
    z: "—",
    i: [["3,5 cl", "Gin"], ["2 cl", "Apricot Brandy"], ["1,5 cl", "Orangensaft"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."]
  },
  {
    n: "Planter's Punch", c: "u", b: "Rum", g: "Highball", t: "Geschüttelt",
    z: "Orangenzeste, Cocktailkirsche",
    i: [["4,5 cl", "Jamaica Rum"], ["1,5 cl", "Frischer Limettensaft"], ["1,5 cl", "Zuckersirup"], ["3 Spritzer", "Angostura Bitters"], ["", "Optional: Soda"]],
    s: ["Rum, Limettensaft und Sirup mit Eis shaken.", "In ein großes Glas mit Eis abseihen.", "Bitters obenauf geben, optional mit Soda verlängern."],
    f: "Merkspruch: One of sour, two of sweet, three of strong, four of weak."
  },
  {
    n: "Porto Flip", c: "u", b: "Andere", g: "Cocktailschale", t: "Geschüttelt",
    z: "Frisch geriebene Muskatnuss",
    i: [["1,5 cl", "Brandy"], ["4,5 cl", "Roter Portwein"], ["1 cl", "Eigelb"]],
    s: ["Alle Zutaten mit Eis kräftig shaken.", "In eine Cocktailschale abseihen.", "Mit Muskatnuss bestreuen."]
  },
  {
    n: "Ramos Fizz", c: "u", b: "Gin", g: "Highball", t: "Geschüttelt",
    z: "—",
    i: [["4,5 cl", "Gin"], ["1,5 cl", "Frischer Limettensaft"], ["1,5 cl", "Frischer Zitronensaft"], ["3 cl", "Zuckersirup"], ["6 cl", "Sahne"], ["1", "Eiweiß"], ["3 Spritzer", "Orangenblütenwasser"], ["2 Tropfen", "Vanilleextrakt"], ["", "Soda zum Auffüllen"]],
    s: ["Alles außer Soda ohne Eis lange shaken (Dry Shake).", "Mit Eis noch einmal sehr lange shaken.", "In ein Highball-Glas abseihen.", "Mit Soda auffüllen, sodass der Schaum über den Rand steigt."],
    f: "Im Henry C. Ramos' Imperial Cabinet Saloon wurden angeblich bis zu 12 Minuten pro Drink geshakt."
  },
  {
    n: "Rusty Nail", c: "u", b: "Whiskey", g: "Tumbler", t: "Gebaut",
    z: "Zitronenzeste",
    i: [["4,5 cl", "Scotch Whisky"], ["2,5 cl", "Drambuie"]],
    s: ["Tumbler mit Eis füllen.", "Scotch und Drambuie hineingeben.", "Kurz umrühren und garnieren."]
  },
  {
    n: "Sazerac", c: "u", b: "Brandy", g: "Tumbler", t: "Gerührt",
    z: "Zitronenzeste",
    i: [["5 cl", "Cognac"], ["1 cl", "Absinth"], ["1", "Zuckerwürfel"], ["2 Spritzer", "Peychaud's Bitters"]],
    s: ["Einen gekühlten Tumbler mit Absinth ausschwenken, überschüssigen Absinth entfernen.", "Zucker mit Bitters und etwas Wasser im Rührglas auflösen.", "Cognac und Eis hinzufügen und kalt rühren.", "Ins vorbereitete Glas (ohne Eis) abseihen, Zitronenzeste ausdrücken."],
    f: "Offizieller Cocktail von New Orleans. Heute oft auch mit Rye Whiskey."
  },
  {
    n: "Sidecar", c: "u", b: "Brandy", g: "Cocktailschale", t: "Geschüttelt",
    z: "Optional: Zuckerrand",
    i: [["5 cl", "Cognac"], ["2 cl", "Triple Sec"], ["2 cl", "Frischer Zitronensaft"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."],
    f: "Angeblich benannt nach einem Offizier, der im Motorrad-Beiwagen zur Bar gefahren wurde."
  },
  {
    n: "Stinger", c: "u", b: "Brandy", g: "Cocktailschale", t: "Gerührt",
    z: "—",
    i: [["5 cl", "Cognac"], ["2 cl", "Crème de Menthe (weiß)"]],
    s: ["Beide Zutaten im Rührglas mit Eis kalt rühren.", "In eine gekühlte Cocktailschale abseihen."]
  },
  {
    n: "Tuxedo", c: "u", b: "Gin", g: "Cocktailschale", t: "Gerührt",
    z: "Cocktailkirsche, Zitronenzeste",
    i: [["3 cl", "Old Tom Gin"], ["3 cl", "Trockener Wermut"], ["½ BL", "Maraschino"], ["¼ BL", "Absinth"], ["3 Spritzer", "Orange Bitters"]],
    s: ["Alle Zutaten im Rührglas mit Eis kalt rühren.", "In eine gekühlte Cocktailschale abseihen.", "Garnieren."]
  },
  {
    n: "Vieux Carré", c: "u", b: "Whiskey", g: "Tumbler", t: "Gerührt",
    z: "Orangenzeste, Cocktailkirsche",
    i: [["3 cl", "Rye Whiskey"], ["3 cl", "Cognac"], ["3 cl", "Roter Wermut"], ["1 BL", "Bénédictine"], ["2 Spritzer", "Peychaud's Bitters"]],
    s: ["Alle Zutaten im Rührglas mit Eis kalt rühren.", "In einen Tumbler auf frisches Eis abseihen.", "Garnieren."],
    f: "Französisch für „Altes Viertel“ – gemeint ist das French Quarter in New Orleans."
  },
  {
    n: "Whiskey Sour", c: "u", b: "Whiskey", g: "Tumbler", t: "Geschüttelt",
    z: "Orangenzeste, Cocktailkirsche",
    i: [["4,5 cl", "Bourbon"], ["2,5 cl", "Frischer Zitronensaft"], ["2 cl", "Zuckersirup"], ["2 cl", "Eiweiß (optional)"]],
    s: ["Mit Eiweiß: zuerst ohne Eis shaken (Dry Shake).", "Mit Eis kräftig shaken.", "In einen Tumbler auf Eis oder in eine Schale abseihen.", "Garnieren."]
  },
  {
    n: "White Lady", c: "u", b: "Gin", g: "Cocktailschale", t: "Geschüttelt",
    z: "—",
    i: [["4 cl", "Gin"], ["3 cl", "Triple Sec"], ["2 cl", "Frischer Zitronensaft"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."]
  },

  /* ───────────── Moderne Klassiker ───────────── */
  {
    n: "Bellini", c: "m", b: "Schaumwein", g: "Sektflöte", t: "Gebaut",
    z: "—",
    i: [["10 cl", "Prosecco"], ["5 cl", "Weißes Pfirsichpüree"]],
    s: ["Pfirsichpüree in eine gekühlte Sektflöte geben.", "Langsam mit Prosecco auffüllen und sanft umrühren."],
    f: "Erfunden in Harry's Bar in Venedig, benannt nach dem Renaissance-Maler Giovanni Bellini."
  },
  {
    n: "Black Russian", c: "m", b: "Wodka", g: "Tumbler", t: "Gebaut",
    z: "—",
    i: [["5 cl", "Wodka"], ["2 cl", "Kaffeelikör"]],
    s: ["Tumbler mit Eis füllen.", "Wodka und Kaffeelikör hineingeben und umrühren."],
    f: "Mit einem Schuss Sahne obendrauf wird daraus der White Russian."
  },
  {
    n: "Bloody Mary", c: "m", b: "Wodka", g: "Highball", t: "Gerührt",
    z: "Selleriestange, Zitronenspalte",
    i: [["4,5 cl", "Wodka"], ["9 cl", "Tomatensaft"], ["1,5 cl", "Frischer Zitronensaft"], ["2 Spritzer", "Worcestershiresauce"], ["", "Tabasco, Selleriesalz, Salz, Pfeffer"]],
    s: ["Alle Zutaten mit Eis sanft verrühren (oder zwischen zwei Shakern hin und her „rollen“).", "In ein Highball-Glas auf Eis gießen.", "Garnieren."],
    f: "Der Klassiker unter den Katerdrinks."
  },
  {
    n: "Caipirinha", c: "m", b: "Andere", g: "Tumbler", t: "Gemuddelt",
    z: "—",
    i: [["6 cl", "Cachaça"], ["½", "Limette, geviertelt"], ["4 BL", "Weißer Rohrzucker"]],
    s: ["Limettenstücke mit dem Zucker im Glas kräftig muddeln.", "Glas mit Crushed Ice füllen.", "Cachaça dazugeben und gut umrühren."],
    f: "Brasiliens Nationalcocktail. Cachaça wird aus frischem Zuckerrohrsaft destilliert."
  },
  {
    n: "Champagne Cocktail", c: "m", b: "Schaumwein", g: "Sektflöte", t: "Gebaut",
    z: "Orangenzeste, Cocktailkirsche",
    i: [["9 cl", "Champagner"], ["1 cl", "Cognac"], ["2 Spritzer", "Angostura Bitters"], ["1", "Zuckerwürfel"]],
    s: ["Zuckerwürfel mit Bitters tränken und in eine Sektflöte geben.", "Cognac dazugeben.", "Langsam mit Champagner auffüllen."]
  },
  {
    n: "Corpse Reviver #2", c: "m", b: "Gin", g: "Cocktailschale", t: "Geschüttelt",
    z: "Orangenzeste",
    i: [["3 cl", "Gin"], ["3 cl", "Cointreau"], ["3 cl", "Lillet Blanc"], ["3 cl", "Frischer Zitronensaft"], ["1 Spritzer", "Absinth"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."],
    f: "Der Name sagt's: Ursprünglich als „Wiederbeleber“ für den Morgen danach gedacht."
  },
  {
    n: "Cosmopolitan", c: "m", b: "Wodka", g: "Martiniglas", t: "Geschüttelt",
    z: "Limettenrad oder Zitronenzeste",
    i: [["4 cl", "Zitronenwodka"], ["1,5 cl", "Cointreau"], ["1,5 cl", "Frischer Limettensaft"], ["3 cl", "Cranberrysaft"]],
    s: ["Alle Zutaten mit Eis shaken.", "In ein gekühltes Martiniglas doppelt abseihen."],
    f: "Weltberühmt geworden durch „Sex and the City“."
  },
  {
    n: "Cuba Libre", c: "m", b: "Rum", g: "Highball", t: "Gebaut",
    z: "Limettenspalte",
    i: [["5 cl", "Weißer Rum"], ["12 cl", "Cola"], ["1 cl", "Frischer Limettensaft"]],
    s: ["Highball mit Eis füllen.", "Rum und Limettensaft hineingeben.", "Mit Cola auffüllen und garnieren."]
  },
  {
    n: "French 75", c: "m", b: "Gin", g: "Sektflöte", t: "Geschüttelt",
    z: "Zitronenzeste",
    i: [["3 cl", "Gin"], ["1,5 cl", "Frischer Zitronensaft"], ["1,5 cl", "Zuckersirup"], ["6 cl", "Champagner"]],
    s: ["Gin, Zitronensaft und Sirup mit Eis shaken.", "In eine gekühlte Sektflöte abseihen.", "Mit Champagner auffüllen."],
    f: "Benannt nach dem französischen 75-mm-Feldgeschütz – weil er so „einschlägt“."
  },
  {
    n: "French Connection", c: "m", b: "Brandy", g: "Tumbler", t: "Gebaut",
    z: "—",
    i: [["3,5 cl", "Cognac"], ["3,5 cl", "Amaretto"]],
    s: ["Tumbler mit Eis füllen.", "Cognac und Amaretto hineingeben und umrühren."]
  },
  {
    n: "Golden Dream", c: "m", b: "Likör", g: "Cocktailschale", t: "Geschüttelt",
    z: "—",
    i: [["2 cl", "Galliano"], ["2 cl", "Triple Sec"], ["2 cl", "Orangensaft"], ["1 cl", "Sahne"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."]
  },
  {
    n: "Grasshopper", c: "m", b: "Likör", g: "Cocktailschale", t: "Geschüttelt",
    z: "Minzblatt",
    i: [["3 cl", "Crème de Menthe (grün)"], ["3 cl", "Crème de Cacao (weiß)"], ["3 cl", "Sahne"]],
    s: ["Alle Zutaten mit Eis kräftig shaken.", "In eine gekühlte Cocktailschale abseihen."]
  },
  {
    n: "Hemingway Special", c: "m", b: "Rum", g: "Cocktailschale", t: "Geschüttelt",
    z: "—",
    i: [["6 cl", "Weißer Rum"], ["4 cl", "Grapefruitsaft"], ["1,5 cl", "Maraschino"], ["1,5 cl", "Frischer Limettensaft"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."],
    f: "Hemingway trank seinen Daiquiri ohne Zucker, dafür mit doppeltem Rum – im El Floridita in Havanna."
  },
  {
    n: "Horse's Neck", c: "m", b: "Brandy", g: "Highball", t: "Gebaut",
    z: "Lange Zitronenspirale",
    i: [["4 cl", "Brandy"], ["12 cl", "Ginger Ale"], ["", "Optional: Angostura Bitters"]],
    s: ["Lange Zitronenschalen-Spirale ins Glas hängen.", "Mit Eis füllen, Brandy dazugeben.", "Mit Ginger Ale auffüllen."],
    f: "Die lange Zitronenspirale erinnert an einen Pferdehals."
  },
  {
    n: "Irish Coffee", c: "m", b: "Whiskey", g: "Irish-Coffee-Glas", t: "Gebaut",
    z: "—",
    i: [["5 cl", "Irish Whiskey"], ["12 cl", "Heißer Kaffee"], ["1 BL", "Brauner Zucker"], ["5 cl", "Leicht geschlagene Sahne"]],
    s: ["Glas mit heißem Wasser vorwärmen.", "Kaffee, Zucker und Whiskey hineingeben und rühren, bis der Zucker gelöst ist.", "Sahne vorsichtig über einen Löffelrücken obenauf gleiten lassen."],
    f: "Erfunden 1943 am Flughafen Foynes in Irland für frierende Transatlantik-Passagiere."
  },
  {
    n: "Kir", c: "m", b: "Andere", g: "Weinglas", t: "Gebaut",
    z: "—",
    i: [["9 cl", "Trockener Weißwein (Aligoté)"], ["1 cl", "Crème de Cassis"]],
    s: ["Crème de Cassis ins gekühlte Weinglas geben.", "Mit Weißwein auffüllen."],
    f: "Mit Champagner statt Weißwein heißt er Kir Royal."
  },
  {
    n: "Long Island Iced Tea", c: "m", b: "Andere", g: "Highball", t: "Gebaut",
    z: "Zitronenscheibe",
    i: [["1,5 cl", "Wodka"], ["1,5 cl", "Tequila"], ["1,5 cl", "Weißer Rum"], ["1,5 cl", "Gin"], ["1,5 cl", "Cointreau"], ["2,5 cl", "Frischer Zitronensaft"], ["3 cl", "Zuckersirup"], ["", "Cola zum Auffüllen"]],
    s: ["Highball mit Eis füllen.", "Alle Spirituosen, Saft und Sirup hineingeben.", "Mit einem Schuss Cola toppen und umrühren."],
    f: "Enthält keinen Tee – die Cola sorgt nur für die Farbe."
  },
  {
    n: "Mai Tai", c: "m", b: "Rum", g: "Tumbler", t: "Geschüttelt",
    z: "Minzzweig, Limettenhälfte",
    i: [["3 cl", "Gereifter Jamaica Rum"], ["3 cl", "Martinique Rhum Agricole"], ["1,5 cl", "Orange Curaçao"], ["1,5 cl", "Orgeat (Mandelsirup)"], ["3 cl", "Frischer Limettensaft"], ["0,75 cl", "Zuckersirup"]],
    s: ["Alle Zutaten mit Eis shaken.", "In einen Tumbler auf Crushed Ice abseihen.", "Mit Minze und ausgepresster Limettenhälfte garnieren."],
    f: "„Maita'i“ bedeutet auf Tahitianisch „gut“. Erfunden von Trader Vic 1944."
  },
  {
    n: "Margarita", c: "m", b: "Tequila", g: "Margaritaglas", t: "Geschüttelt",
    z: "Salzrand, Limettenscheibe",
    i: [["5 cl", "Tequila"], ["2 cl", "Triple Sec"], ["1,5 cl", "Frischer Limettensaft"]],
    s: ["Glas zur Hälfte mit Salzrand versehen.", "Alle Zutaten mit Eis shaken.", "Ins vorbereitete Glas abseihen."]
  },
  {
    n: "Mimosa", c: "m", b: "Schaumwein", g: "Sektflöte", t: "Gebaut",
    z: "Orangenzeste (optional)",
    i: [["7,5 cl", "Champagner"], ["7,5 cl", "Frischer Orangensaft"]],
    s: ["Orangensaft in eine Sektflöte geben.", "Vorsichtig mit Champagner auffüllen."]
  },
  {
    n: "Mint Julep", c: "m", b: "Whiskey", g: "Julep-Becher", t: "Gemuddelt",
    z: "Minzzweig",
    i: [["6 cl", "Bourbon"], ["4", "Minzzweige"], ["1 BL", "Puderzucker"], ["2 BL", "Wasser"]],
    s: ["Minze mit Zucker und Wasser im Becher sanft andrücken.", "Mit Crushed Ice füllen, Bourbon dazugeben.", "Rühren, bis der Becher außen beschlägt.", "Mit einem Minzzweig garnieren."],
    f: "Offizieller Drink des Kentucky Derby."
  },
  {
    n: "Mojito", c: "m", b: "Rum", g: "Highball", t: "Gemuddelt",
    z: "Minzzweig, Limettenscheibe",
    i: [["4,5 cl", "Weißer Rum"], ["2 cl", "Frischer Limettensaft"], ["6", "Minzblätter"], ["2 BL", "Weißer Rohrzucker"], ["", "Soda zum Auffüllen"]],
    s: ["Minze mit Zucker und Limettensaft im Glas sanft andrücken.", "Rum dazugeben, mit Eis füllen.", "Mit Soda auffüllen und umrühren."],
    f: "Minze nur andrücken, nicht zerreißen – sonst wird's bitter."
  },
  {
    n: "Moscow Mule", c: "m", b: "Wodka", g: "Kupferbecher", t: "Gebaut",
    z: "Limettenscheibe",
    i: [["4,5 cl", "Wodka"], ["12 cl", "Ginger Beer"], ["1 cl", "Frischer Limettensaft"]],
    s: ["Kupferbecher mit Eis füllen.", "Wodka und Limettensaft hineingeben.", "Mit Ginger Beer auffüllen."],
    f: "Wurde in den 1940ern als Marketing-Coup erfunden, um Wodka in den USA zu verkaufen."
  },
  {
    n: "Piña Colada", c: "m", b: "Rum", g: "Hurricane-Glas", t: "Geblendet",
    z: "Ananasstück, Cocktailkirsche",
    i: [["5 cl", "Weißer Rum"], ["3 cl", "Kokoscreme"], ["5 cl", "Ananassaft"]],
    s: ["Alle Zutaten mit Crushed Ice im Blender mixen (oder kräftig shaken).", "In ein großes Glas gießen und garnieren."],
    f: "Seit 1978 der Nationaldrink von Puerto Rico."
  },
  {
    n: "Pisco Sour", c: "m", b: "Andere", g: "Sour-Glas", t: "Geschüttelt",
    z: "Ein paar Tropfen Angostura auf dem Schaum",
    i: [["6 cl", "Pisco"], ["3 cl", "Frischer Limettensaft"], ["2 cl", "Zuckersirup"], ["1", "Eiweiß"]],
    s: ["Alle Zutaten ohne Eis shaken (Dry Shake).", "Mit Eis erneut kräftig shaken.", "In ein Glas abseihen und Angostura auf den Schaum träufeln."],
    f: "Peru und Chile streiten seit Jahrzehnten, wem er gehört."
  },
  {
    n: "Sea Breeze", c: "m", b: "Wodka", g: "Highball", t: "Gebaut",
    z: "Limettenspalte",
    i: [["4 cl", "Wodka"], ["12 cl", "Cranberrysaft"], ["3 cl", "Grapefruitsaft"]],
    s: ["Highball mit Eis füllen.", "Alle Zutaten hineingeben und umrühren."]
  },
  {
    n: "Sex on the Beach", c: "m", b: "Wodka", g: "Highball", t: "Gebaut",
    z: "Orangenscheibe",
    i: [["4 cl", "Wodka"], ["2 cl", "Pfirsichlikör"], ["4 cl", "Orangensaft"], ["4 cl", "Cranberrysaft"]],
    s: ["Highball mit Eis füllen.", "Alle Zutaten hineingeben und umrühren."]
  },
  {
    n: "Singapore Sling", c: "m", b: "Gin", g: "Highball", t: "Geschüttelt",
    z: "Ananasstück, Cocktailkirsche",
    i: [["3 cl", "Gin"], ["1,5 cl", "Cherry Liqueur"], ["0,75 cl", "Cointreau"], ["0,75 cl", "Bénédictine"], ["12 cl", "Ananassaft"], ["1,5 cl", "Frischer Limettensaft"], ["1 cl", "Grenadine"], ["1 Spritzer", "Angostura Bitters"]],
    s: ["Alle Zutaten mit Eis shaken.", "In ein Highball-Glas auf Eis abseihen.", "Garnieren."],
    f: "Kreiert um 1915 im Raffles Hotel in Singapur."
  },
  {
    n: "Tequila Sunrise", c: "m", b: "Tequila", g: "Highball", t: "Gebaut",
    z: "Orangenscheibe",
    i: [["4,5 cl", "Tequila"], ["9 cl", "Orangensaft"], ["1,5 cl", "Grenadine"]],
    s: ["Highball mit Eis füllen.", "Tequila und Orangensaft hineingeben und umrühren.", "Grenadine langsam einfließen lassen – sie sinkt nach unten und erzeugt den Sonnenaufgang."]
  },
  {
    n: "Vesper", c: "m", b: "Gin", g: "Martiniglas", t: "Geschüttelt",
    z: "Lange Zitronenzeste",
    i: [["4,5 cl", "Gin"], ["1,5 cl", "Wodka"], ["0,75 cl", "Lillet Blanc"]],
    s: ["Alle Zutaten mit Eis shaken.", "In ein gekühltes Martiniglas abseihen.", "Zitronenzeste ausdrücken und hineingeben."],
    f: "Von Ian Fleming in „Casino Royale“ (1953) erfunden – James Bonds eigener Drink."
  },
  {
    n: "Zombie", c: "m", b: "Rum", g: "Tiki-Becher", t: "Geschüttelt",
    z: "Minzzweig",
    i: [["4,5 cl", "Jamaica Rum"], ["4,5 cl", "Goldener Rum"], ["3 cl", "Demerara Overproof Rum"], ["2 cl", "Frischer Limettensaft"], ["1,5 cl", "Falernum"], ["1 cl", "Don's Mix (Grapefruit + Zimtsirup)"], ["0,5 cl", "Grenadine"], ["1 Spritzer", "Angostura Bitters"], ["6 Tropfen", "Absinth"]],
    s: ["Alle Zutaten mit Eis shaken oder kurz blenden.", "In einen Tiki-Becher auf Crushed Ice gießen.", "Mit Minze garnieren."],
    f: "Don the Beachcomber limitierte ihn auf zwei pro Gast."
  },

  /* ───────────── Neue Ära ───────────── */
  {
    n: "Barracuda", c: "n", b: "Rum", g: "Margaritaglas", t: "Geschüttelt",
    z: "—",
    i: [["4,5 cl", "Goldener Rum"], ["1,5 cl", "Galliano"], ["6 cl", "Ananassaft"], ["1 Spritzer", "Frischer Limettensaft"], ["", "Prosecco zum Auffüllen"]],
    s: ["Alle Zutaten außer Prosecco mit Eis shaken.", "Ins Glas abseihen.", "Mit Prosecco auffüllen."]
  },
  {
    n: "Bee's Knees", c: "n", b: "Gin", g: "Cocktailschale", t: "Geschüttelt",
    z: "Zitronenzeste",
    i: [["5,25 cl", "Gin"], ["2 cl", "Honigsirup"], ["2 cl", "Frischer Zitronensaft"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."],
    f: "„The bee's knees“ war in den 1920ern Slang für „das Allerbeste“."
  },
  {
    n: "Bramble", c: "n", b: "Gin", g: "Tumbler", t: "Geschüttelt",
    z: "Brombeeren, Zitronenscheibe",
    i: [["5 cl", "Gin"], ["2,5 cl", "Frischer Zitronensaft"], ["1,25 cl", "Zuckersirup"], ["1,5 cl", "Crème de Mûre (Brombeerlikör)"]],
    s: ["Gin, Zitronensaft und Sirup mit Eis shaken.", "In einen Tumbler auf Crushed Ice abseihen.", "Crème de Mûre darüberträufeln, sodass sie durchs Eis sickert."],
    f: "Erfunden 1984 von Dick Bradsell in London."
  },
  {
    n: "Dark 'n' Stormy", c: "n", b: "Rum", g: "Highball", t: "Gebaut",
    z: "Limettenspalte",
    i: [["6 cl", "Dunkler Rum (Gosling's)"], ["10 cl", "Ginger Beer"]],
    s: ["Highball mit Eis füllen.", "Ginger Beer eingießen.", "Rum vorsichtig obenauf floaten – die „Gewitterwolke“."],
    f: "Gosling's hat sich den Namen sogar als Marke schützen lassen."
  },
  {
    n: "Espresso Martini", c: "n", b: "Wodka", g: "Cocktailschale", t: "Geschüttelt",
    z: "3 Kaffeebohnen",
    i: [["5 cl", "Wodka"], ["3 cl", "Kaffeelikör"], ["3 cl", "Frischer Espresso"], ["1 cl", "Zuckersirup (optional)"]],
    s: ["Alle Zutaten mit Eis sehr kräftig shaken, damit eine Crema entsteht.", "In eine gekühlte Cocktailschale doppelt abseihen.", "Mit drei Kaffeebohnen garnieren."],
    f: "Dick Bradsell erfand ihn, als ein Model einen Drink wollte, der sie „aufweckt und umhaut“."
  },
  {
    n: "Fernandito", c: "n", b: "Likör", g: "Highball", t: "Gebaut",
    z: "—",
    i: [["5 cl", "Fernet-Branca"], ["", "Cola zum Auffüllen"]],
    s: ["Highball mit Eis füllen.", "Fernet hineingeben.", "Mit Cola auffüllen und sanft umrühren."],
    f: "In Argentinien ein echtes Nationalgetränk („Fernet con Coca“)."
  },
  {
    n: "French Martini", c: "n", b: "Wodka", g: "Cocktailschale", t: "Geschüttelt",
    z: "Zitronenzeste",
    i: [["4,5 cl", "Wodka"], ["1,5 cl", "Himbeerlikör (Chambord)"], ["1,5 cl", "Ananassaft"]],
    s: ["Alle Zutaten mit Eis kräftig shaken.", "In eine gekühlte Cocktailschale abseihen."]
  },
  {
    n: "Illegal", c: "n", b: "Tequila", g: "Cocktailschale", t: "Geschüttelt",
    z: "—",
    i: [["3 cl", "Mezcal"], ["1,5 cl", "Jamaica Overproof Rum"], ["1,5 cl", "Falernum"], ["0,75 cl", "Maraschino"], ["2,25 cl", "Frischer Limettensaft"], ["1,5 cl", "Zuckersirup"], ["einige Tropfen", "Eiweiß (optional)"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."]
  },
  {
    n: "Lemon Drop Martini", c: "n", b: "Wodka", g: "Martiniglas", t: "Geschüttelt",
    z: "Zuckerrand, Zitronenscheibe",
    i: [["2,5 cl", "Zitronenwodka"], ["2 cl", "Triple Sec"], ["1,5 cl", "Frischer Zitronensaft"]],
    s: ["Glas mit Zuckerrand versehen.", "Alle Zutaten mit Eis shaken.", "Ins vorbereitete Glas abseihen."]
  },
  {
    n: "Naked and Famous", c: "n", b: "Tequila", g: "Cocktailschale", t: "Geschüttelt",
    z: "—",
    i: [["2,25 cl", "Mezcal"], ["2,25 cl", "Gelbe Chartreuse"], ["2,25 cl", "Aperol"], ["2,25 cl", "Frischer Limettensaft"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."],
    f: "Ein rauchiger Twist auf den Last Word – vier Zutaten zu gleichen Teilen."
  },
  {
    n: "New York Sour", c: "n", b: "Whiskey", g: "Tumbler", t: "Geschüttelt",
    z: "Zitronen- oder Orangenzeste",
    i: [["6 cl", "Rye oder Bourbon"], ["2,25 cl", "Zuckersirup"], ["3 cl", "Frischer Zitronensaft"], ["3 cl", "Rotwein"], ["einige Tropfen", "Eiweiß (optional)"]],
    s: ["Whiskey, Sirup, Zitronensaft (und Eiweiß) mit Eis shaken.", "In einen Tumbler auf Eis abseihen.", "Rotwein über einen Barlöffel vorsichtig obenauf floaten."]
  },
  {
    n: "Old Cuban", c: "n", b: "Rum", g: "Cocktailschale", t: "Geschüttelt",
    z: "Minzblatt",
    i: [["4,5 cl", "Gereifter Rum"], ["2,25 cl", "Frischer Limettensaft"], ["3 cl", "Zuckersirup"], ["2 Spritzer", "Angostura Bitters"], ["6–8", "Minzblätter"], ["6 cl", "Champagner"]],
    s: ["Alle Zutaten außer Champagner mit Eis shaken.", "In eine gekühlte Schale doppelt abseihen.", "Mit Champagner toppen."],
    f: "Kreiert 2001 von Audrey Saunders – eine Mischung aus Mojito und French 75."
  },
  {
    n: "Paloma", c: "n", b: "Tequila", g: "Highball", t: "Gebaut",
    z: "Limettenscheibe, optional Salzrand",
    i: [["5 cl", "Tequila"], ["0,5 cl", "Frischer Limettensaft"], ["1 Prise", "Salz"], ["10 cl", "Grapefruit-Limonade"]],
    s: ["Highball mit Eis füllen.", "Tequila, Limettensaft und Salz hineingeben.", "Mit Grapefruit-Limonade auffüllen."],
    f: "In Mexiko beliebter als die Margarita."
  },
  {
    n: "Paper Plane", c: "n", b: "Whiskey", g: "Cocktailschale", t: "Geschüttelt",
    z: "—",
    i: [["3 cl", "Bourbon"], ["3 cl", "Aperol"], ["3 cl", "Amaro Nonino"], ["3 cl", "Frischer Zitronensaft"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."],
    f: "Benannt nach dem Song „Paper Planes“ von M.I.A."
  },
  {
    n: "Penicillin", c: "n", b: "Whiskey", g: "Tumbler", t: "Geschüttelt",
    z: "Kandierter Ingwer",
    i: [["6 cl", "Blended Scotch"], ["2,25 cl", "Frischer Zitronensaft"], ["2,25 cl", "Honig-Ingwer-Sirup"], ["0,75 cl", "Islay Single Malt (rauchig)"]],
    s: ["Blended Scotch, Zitronensaft und Sirup mit Eis shaken.", "In einen Tumbler auf Eis abseihen.", "Islay Whisky vorsichtig obenauf floaten."],
    f: "Erfunden 2005 von Sam Ross im Milk & Honey, New York."
  },
  {
    n: "Russian Spring Punch", c: "n", b: "Wodka", g: "Highball", t: "Geschüttelt",
    z: "Zitronenscheibe, Brombeere",
    i: [["2,5 cl", "Wodka"], ["2,5 cl", "Frischer Zitronensaft"], ["1,5 cl", "Crème de Cassis"], ["1 cl", "Zuckersirup"], ["", "Champagner zum Auffüllen"]],
    s: ["Alle Zutaten außer Champagner mit Eis shaken.", "In ein Highball-Glas auf Eis abseihen.", "Mit Champagner auffüllen."]
  },
  {
    n: "Southside", c: "n", b: "Gin", g: "Cocktailschale", t: "Geschüttelt",
    z: "Minzzweig",
    i: [["6 cl", "Gin"], ["3 cl", "Frischer Limettensaft"], ["1,5 cl", "Zuckersirup"], ["5", "Minzblätter"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale doppelt abseihen.", "Mit Minze garnieren."]
  },
  {
    n: "Spicy Fifty", c: "n", b: "Wodka", g: "Cocktailschale", t: "Geschüttelt",
    z: "Rote Chilischote",
    i: [["5 cl", "Vanillewodka"], ["1,5 cl", "Holunderblütensirup"], ["1,5 cl", "Frischer Limettensaft"], ["1 cl", "Honigsirup"], ["2 dünne Scheiben", "Rote Chili"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale doppelt abseihen.", "Mit Chili garnieren."]
  },
  {
    n: "Spritz", c: "n", b: "Schaumwein", g: "Weinglas", t: "Gebaut",
    z: "Orangenscheibe",
    i: [["9 cl", "Prosecco"], ["6 cl", "Aperol"], ["1 Spritzer", "Soda"]],
    s: ["Weinglas mit Eis füllen.", "Prosecco, dann Aperol hineingeben.", "Mit einem Spritzer Soda toppen und garnieren."],
    f: "Merkformel: 3-2-1 – drei Teile Prosecco, zwei Teile Aperol, ein Teil Soda."
  },
  {
    n: "Suffering Bastard", c: "n", b: "Andere", g: "Highball", t: "Geschüttelt",
    z: "Minzzweig, Orangenscheibe",
    i: [["3 cl", "Cognac"], ["3 cl", "Gin"], ["1,5 cl", "Frischer Limettensaft"], ["2 Spritzer", "Angostura Bitters"], ["", "Ginger Beer zum Auffüllen"]],
    s: ["Alle Zutaten außer Ginger Beer mit Eis shaken.", "In ein Highball-Glas auf Eis abseihen.", "Mit Ginger Beer auffüllen."],
    f: "Erfunden 1942 in Kairo als Katerkur für britische Soldaten."
  },
  {
    n: "Tipperary", c: "n", b: "Whiskey", g: "Cocktailschale", t: "Gerührt",
    z: "Orangenzeste",
    i: [["5 cl", "Irish Whiskey"], ["2,5 cl", "Roter Wermut"], ["1,5 cl", "Grüne Chartreuse"], ["1 Spritzer", "Angostura Bitters"]],
    s: ["Alle Zutaten im Rührglas mit Eis kalt rühren.", "In eine gekühlte Cocktailschale abseihen."]
  },
  {
    n: "Tommy's Margarita", c: "n", b: "Tequila", g: "Tumbler", t: "Geschüttelt",
    z: "—",
    i: [["6 cl", "Tequila (100 % Agave)"], ["3 cl", "Frischer Limettensaft"], ["1,5 cl", "Agavensirup"]],
    s: ["Alle Zutaten mit Eis shaken.", "In einen Tumbler auf Eis abseihen."],
    f: "Benannt nach Tommy's Mexican Restaurant in San Francisco – Agavensirup statt Orangenlikör."
  },
  {
    n: "Trinidad Sour", c: "n", b: "Likör", g: "Cocktailschale", t: "Geschüttelt",
    z: "—",
    i: [["4,5 cl", "Angostura Bitters"], ["3 cl", "Orgeat (Mandelsirup)"], ["2,25 cl", "Frischer Zitronensaft"], ["1,5 cl", "Rye Whiskey"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."],
    f: "Ja, wirklich: 4,5 cl Angostura als Basis – ein Bitter wird zur Hauptzutat."
  },
  {
    n: "Yellow Bird", c: "n", b: "Rum", g: "Cocktailschale", t: "Geschüttelt",
    z: "—",
    i: [["3 cl", "Weißer Rum"], ["1,5 cl", "Galliano"], ["1,5 cl", "Triple Sec"], ["1,5 cl", "Frischer Limettensaft"]],
    s: ["Alle Zutaten mit Eis shaken.", "In eine gekühlte Cocktailschale abseihen."]
  },
  {
    n: "Death in the Afternoon", c: "n", b: "Schaumwein", g: "Sektflöte", t: "Gebaut",
    z: "—",
    i: [["1,5 cl", "Absinth"], ["12 cl", "Gekühlter Champagner"]],
    s: ["Absinth in eine Sektflöte geben.", "Langsam mit Champagner auffüllen, bis er milchig opalisiert."],
    f: "Ernest Hemingways eigene Kreation, benannt nach seinem Buch über den Stierkampf."
  },

  /* ───────────── Beliebte Extras ───────────── */
  {
    n: "Gin Tonic", c: "p", b: "Gin", g: "Weinglas", t: "Gebaut",
    z: "Limette oder Gurke, je nach Gin",
    i: [["5 cl", "Gin"], ["15 cl", "Tonic Water"]],
    s: ["Ballonglas großzügig mit Eis füllen.", "Gin hineingeben.", "Tonic am Barlöffel entlang eingießen, damit die Kohlensäure erhalten bleibt.", "Garnieren."]
  },
  {
    n: "Hugo", c: "p", b: "Schaumwein", g: "Weinglas", t: "Gebaut",
    z: "Minzzweig, Limettenscheibe",
    i: [["15 cl", "Prosecco"], ["2 cl", "Holunderblütensirup"], ["1 Spritzer", "Soda"], ["einige", "Minzblätter"], ["2 Scheiben", "Limette"]],
    s: ["Minze und Limette ins Weinglas geben, Minze leicht andrücken.", "Holunderblütensirup und Eis dazugeben.", "Mit Prosecco und einem Spritzer Soda auffüllen."],
    f: "Erfunden 2005 in Südtirol – seitdem der Sommerdrink im deutschsprachigen Raum."
  },
  {
    n: "Gin Basil Smash", c: "p", b: "Gin", g: "Tumbler", t: "Gemuddelt",
    z: "Basilikumzweig",
    i: [["6 cl", "Gin"], ["2,5 cl", "Frischer Zitronensaft"], ["2 cl", "Zuckersirup"], ["1 Handvoll", "Basilikumblätter"]],
    s: ["Basilikum mit Zitronensaft im Shaker kräftig muddeln.", "Gin, Sirup und Eis dazugeben und shaken.", "In einen Tumbler auf Eis doppelt abseihen."],
    f: "Erfunden 2008 von Jörg Meyer im Le Lion in Hamburg – ein moderner deutscher Klassiker."
  },
  {
    n: "Pornstar Martini", c: "p", b: "Wodka", g: "Cocktailschale", t: "Geschüttelt",
    z: "Halbe Maracuja, Prosecco-Shot daneben",
    i: [["4,5 cl", "Vanillewodka"], ["1,5 cl", "Passionsfruchtlikör (Passoã)"], ["3 cl", "Maracujapüree"], ["1,5 cl", "Frischer Limettensaft"], ["1 cl", "Vanillesirup"], ["6 cl", "Prosecco (separat)"]],
    s: ["Alle Zutaten außer Prosecco mit Eis shaken.", "In eine gekühlte Schale doppelt abseihen.", "Mit halber Maracuja garnieren, Prosecco im Shotglas dazu servieren."],
    f: "Erfunden 2002 von Douglas Ankrah in London – heute einer der meistbestellten Cocktails in UK."
  },
  {
    n: "White Russian", c: "p", b: "Wodka", g: "Tumbler", t: "Gebaut",
    z: "—",
    i: [["5 cl", "Wodka"], ["2 cl", "Kaffeelikör"], ["3 cl", "Sahne"]],
    s: ["Tumbler mit Eis füllen.", "Wodka und Kaffeelikör hineingeben.", "Sahne vorsichtig obenauf floaten."],
    f: "Kultstatus dank „The Big Lebowski“ – der Dude trinkt ihn ständig."
  },
  {
    n: "Caipiroska", c: "p", b: "Wodka", g: "Tumbler", t: "Gemuddelt",
    z: "—",
    i: [["6 cl", "Wodka"], ["½", "Limette, geviertelt"], ["4 BL", "Weißer Rohrzucker"]],
    s: ["Limettenstücke mit Zucker im Glas muddeln.", "Mit Crushed Ice füllen.", "Wodka dazugeben und gut umrühren."]
  },
  {
    n: "Swimming Pool", c: "p", b: "Wodka", g: "Hurricane-Glas", t: "Geschüttelt",
    z: "Ananasstück",
    i: [["4 cl", "Wodka"], ["2 cl", "Blue Curaçao"], ["2 cl", "Kokossirup"], ["2 cl", "Sahne"], ["6 cl", "Ananassaft"]],
    s: ["Wodka, Kokossirup, Sahne und Ananassaft mit Eis shaken.", "In ein großes Glas auf Crushed Ice gießen.", "Blue Curaçao zum Schluss darüberträufeln."]
  },
  {
    n: "Aperol Sour", c: "p", b: "Likör", g: "Tumbler", t: "Geschüttelt",
    z: "Orangenzeste",
    i: [["5 cl", "Aperol"], ["2,5 cl", "Frischer Zitronensaft"], ["1,5 cl", "Zuckersirup"], ["2 cl", "Eiweiß"]],
    s: ["Alle Zutaten ohne Eis shaken (Dry Shake).", "Mit Eis erneut shaken.", "In einen Tumbler auf Eis abseihen."]
  },
  {
    n: "Amaretto Sour", c: "p", b: "Likör", g: "Tumbler", t: "Geschüttelt",
    z: "Zitronenscheibe, Cocktailkirsche",
    i: [["4,5 cl", "Amaretto"], ["1,5 cl", "Bourbon"], ["3 cl", "Frischer Zitronensaft"], ["1 BL", "Zuckersirup"], ["1", "Eiweiß"]],
    s: ["Alle Zutaten ohne Eis shaken (Dry Shake).", "Mit Eis erneut shaken.", "In einen Tumbler auf Eis abseihen und garnieren."],
    f: "Der Schuss Bourbon stammt aus Jeffrey Morgenthalers berühmter Version."
  }
];

const CATEGORIES = {
  u: "Unvergessliche Klassiker",
  m: "Moderne Klassiker",
  n: "Neue Ära",
  p: "Beliebte Extras"
};
