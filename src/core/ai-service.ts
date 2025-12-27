import { z } from 'zod';

// Define the Tarot Card structure
export const TarotCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  position_name: z.string(),
  meaning: z.string(),
  is_reversed: z.boolean(),
});

export type TarotCard = z.infer<typeof TarotCardSchema>;

// Define the full Tarot Response structure
export const TarotResponseSchema = z.object({
  card_disposition: z.enum(['cross', 'star', 'three_card']),
  first_answer: z.string(),
  cards_pulled: z.array(TarotCardSchema),
  outcome: z.string(),
});

export type TarotResponse = z.infer<typeof TarotResponseSchema>;

// Mock Data for "Cross" Spread
const MOCK_CROSS_RESPONSE: TarotResponse = {
  card_disposition: 'cross',
  first_answer:
    'The cards have revealed a path of significant transformation. The energy surrounding your question suggests you are at a pivotal moment.',
  cards_pulled: [
    {
      id: 'the_fool',
      name: 'The Fool',
      position_name: 'The Present',
      meaning:
        'You are standing at the edge of a cliff, ready to take a leap of faith. This card represents new beginnings, spontaneity, and a free spirit.',
      is_reversed: false,
    },
    {
      id: 'the_magician',
      name: 'The Magician',
      position_name: 'The Challenge',
      meaning:
        'You have all the tools you need to succeed, but you may be struggling to focus your will. Manifestation requires clarity.',
      is_reversed: true,
    },
    {
      id: 'the_tower',
      name: 'The Tower',
      position_name: 'The Foundation',
      meaning:
        'Old structures are crumbling. While this may feel chaotic, it is necessary to clear the way for something stronger.',
      is_reversed: false,
    },
    {
      id: 'the_star',
      name: 'The Star',
      position_name: 'The Outcome',
      meaning:
        'Hope and healing are on the horizon. Trust in the universe and your own intuition.',
      is_reversed: false,
    },
    {
      id: 'death',
      name: 'Death',
      position_name: 'Guidance',
      meaning:
        'Do not fear endings; they are merely the precursors to rebirth. Let go of what no longer serves you.',
      is_reversed: false,
    },
  ],
  outcome:
    'The journey ahead will require courage, but the destination is one of profound renewal. Trust the process.',
};

// Mock function to simulate AI reading
export const fetchTarotReading = async (
  question: string
): Promise<TarotResponse> => {
  console.log(`[MockAI] Analyzing question: "${question}"`);

  // Simulate network delay (2-4 seconds for realism)
  const delay = Math.floor(Math.random() * 2000) + 2000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  return MOCK_CROSS_RESPONSE;
};
