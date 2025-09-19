export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'I\'ve had the pleasure of joining an engineering team led by Prasath at the time. From day one, he welcomed me in the best possible way—guiding me through the codebase, features, and, most importantly, the people! Prasath played a key role in orchestrating our efforts in a fast-moving, agile startup. He pushed features quickly and helped bridge cultural differences and gaps, seamlessly connecting teams from Cairo to Tel Aviv via Chennai! Anyone who has the opportunity to work with Prasath will benefit greatly, and I truly hope to join forces with him again in the future!',
    author: 'Ran Horev',
    title: 'Software Engineer Team Leader',
    company: 'Deall Inc',
    image: '/api/placeholder/64/64'
  },
  {
    id: '2',
    quote: 'I have had the opportunity to know and work with Prasath in various capacities over the years. He has consistently demonstrated strong technical and functional expertise, along with a collaborative spirit that makes him a great team player. His ability to bring unique perspectives and lead toward effective outcomes has been instrumental in delivering key projects. Prasath is undoubtedly a valuable asset to any team, and I sincerely wish him all the best in his journey ahead!',
    author: 'Parthasarathi (Partha) Raghavan',
    title: 'CTO',
    company: 'Rootquotient',
    image: '/api/placeholder/64/64'
  }
];
