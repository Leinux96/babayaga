const cards = {
  // Major Arcana
  the_fool: require('../../../assets/cards/00-TheFool.png'),
  the_magician: require('../../../assets/cards/01-TheMagician.png'),
  the_high_priestess: require('../../../assets/cards/02-TheHighPriestess.png'),
  the_empress: require('../../../assets/cards/03-TheEmpress.png'),
  the_emperor: require('../../../assets/cards/04-TheEmperor.png'),
  the_hierophant: require('../../../assets/cards/05-TheHierophant.png'),
  the_lovers: require('../../../assets/cards/06-TheLovers.png'),
  the_chariot: require('../../../assets/cards/07-TheChariot.png'),
  strength: require('../../../assets/cards/08-Strength.png'),
  the_hermit: require('../../../assets/cards/09-TheHermit.png'),
  wheel_of_fortune: require('../../../assets/cards/10-WheelOfFortune.png'),
  justice: require('../../../assets/cards/11-Justice.png'),
  the_hanged_man: require('../../../assets/cards/12-TheHangedMan.png'),
  death: require('../../../assets/cards/13-Death.png'),
  temperance: require('../../../assets/cards/14-Temperance.png'),
  the_devil: require('../../../assets/cards/15-TheDevil.png'),
  the_tower: require('../../../assets/cards/16-TheTower.png'),
  the_star: require('../../../assets/cards/17-TheStar.png'),
  the_moon: require('../../../assets/cards/18-TheMoon.png'),
  the_sun: require('../../../assets/cards/19-TheSun.png'),
  judgement: require('../../../assets/cards/20-Judgement.png'),
  the_world: require('../../../assets/cards/21-TheWorld.png'),

  // Cups
  ace_of_cups: require('../../../assets/cards/Cups01.png'),
  two_of_cups: require('../../../assets/cards/Cups02.png'),
  three_of_cups: require('../../../assets/cards/Cups03.png'),
  four_of_cups: require('../../../assets/cards/Cups04.png'),
  five_of_cups: require('../../../assets/cards/Cups05.png'),
  six_of_cups: require('../../../assets/cards/Cups06.png'),
  seven_of_cups: require('../../../assets/cards/Cups07.png'),
  eight_of_cups: require('../../../assets/cards/Cups08.png'),
  nine_of_cups: require('../../../assets/cards/Cups09.png'),
  ten_of_cups: require('../../../assets/cards/Cups10.png'),
  page_of_cups: require('../../../assets/cards/Cups11.png'),
  knight_of_cups: require('../../../assets/cards/Cups12.png'),
  queen_of_cups: require('../../../assets/cards/Cups13.png'),
  king_of_cups: require('../../../assets/cards/Cups14.png'),

  // Pentacles
  ace_of_pentacles: require('../../../assets/cards/Pentacles01.png'),
  two_of_pentacles: require('../../../assets/cards/Pentacles02.png'),
  three_of_pentacles: require('../../../assets/cards/Pentacles03.png'),
  four_of_pentacles: require('../../../assets/cards/Pentacles04.png'),
  five_of_pentacles: require('../../../assets/cards/Pentacles05.png'),
  six_of_pentacles: require('../../../assets/cards/Pentacles06.png'),
  seven_of_pentacles: require('../../../assets/cards/Pentacles07.png'),
  eight_of_pentacles: require('../../../assets/cards/Pentacles08.png'),
  nine_of_pentacles: require('../../../assets/cards/Pentacles09.png'),
  ten_of_pentacles: require('../../../assets/cards/Pentacles10.png'),
  page_of_pentacles: require('../../../assets/cards/Pentacles11.png'),
  knight_of_pentacles: require('../../../assets/cards/Pentacles12.png'),
  queen_of_pentacles: require('../../../assets/cards/Pentacles13.png'),
  king_of_pentacles: require('../../../assets/cards/Pentacles14.png'),

  // Swords
  ace_of_swords: require('../../../assets/cards/Swords01.png'),
  two_of_swords: require('../../../assets/cards/Swords02.png'),
  three_of_swords: require('../../../assets/cards/Swords03.png'),
  four_of_swords: require('../../../assets/cards/Swords04.png'),
  five_of_swords: require('../../../assets/cards/Swords05.png'),
  six_of_swords: require('../../../assets/cards/Swords06.png'),
  seven_of_swords: require('../../../assets/cards/Swords07.png'),
  eight_of_swords: require('../../../assets/cards/Swords08.png'),
  nine_of_swords: require('../../../assets/cards/Swords09.png'),
  ten_of_swords: require('../../../assets/cards/Swords10.png'),
  page_of_swords: require('../../../assets/cards/Swords11.png'),
  knight_of_swords: require('../../../assets/cards/Swords12.png'),
  queen_of_swords: require('../../../assets/cards/Swords13.png'),
  king_of_swords: require('../../../assets/cards/Swords14.png'),

  // Wands
  ace_of_wands: require('../../../assets/cards/Wands01.png'),
  two_of_wands: require('../../../assets/cards/Wands02.png'),
  three_of_wands: require('../../../assets/cards/Wands03.png'),
  four_of_wands: require('../../../assets/cards/Wands04.png'),
  five_of_wands: require('../../../assets/cards/Wands05.png'),
  six_of_wands: require('../../../assets/cards/Wands06.png'),
  seven_of_wands: require('../../../assets/cards/Wands07.png'),
  eight_of_wands: require('../../../assets/cards/Wands08.png'),
  nine_of_wands: require('../../../assets/cards/Wands09.png'),
  ten_of_wands: require('../../../assets/cards/Wands10.png'),
  page_of_wands: require('../../../assets/cards/Wands11.png'),
  knight_of_wands: require('../../../assets/cards/Wands12.png'),
  queen_of_wands: require('../../../assets/cards/Wands13.png'),
  king_of_wands: require('../../../assets/cards/Wands14.png'),

  // Card Back
  back: require('../../../assets/cards/CardBacks.png'),
};

export const getCardImage = (id: string) => {
  return cards[id as keyof typeof cards] || cards['back']; // Default to back if missing
};

export const CARD_BACK = cards['back'];
