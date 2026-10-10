// Sample content for the interactive preview. Everything here is illustrative:
// real notes, cards, quizzes and scores need the backend.

export const SUBJECTS = [
  { id: "stats", name: "AP Statistics", area: "Math" },
  { id: "anat", name: "Honors Anatomy", area: "Science" },
  { id: "eng", name: "English 10", area: "English" },
  { id: "cs", name: "Intro to Computer Science", area: "Tech" },
  { id: "apush", name: "AP US History", area: "History" },
  { id: "span", name: "Spanish 3", area: "World language" },
];

export const SAMPLE_FILE = { name: "Week 5 Sampling.pdf", meta: "24 pages, 3.2 MB" };
export const LOCKED_FILE = { name: "Lecture 6.pdf", meta: "Password protected" };

export const PREP_STEPS = [
  { label: "Reading pages", done: "24 of 24" },
  { label: "Finding key ideas", done: "18 found" },
  { label: "Writing notes", done: "12 sections" },
  { label: "Making flashcards", done: "64 cards" },
  { label: "Building a practice quiz", done: "10 questions" },
  { label: "Writing the study guide", done: "8 sections" },
];

export const TUTOR = {
  question: "Why does the standard error shrink when n goes up? I get the formula but not the reason.",
  hints: [
    {
      label: "Hint 1 of 3",
      text: "Picture one unusually high value. Does it move the average more in a sample of 5, or a sample of 100?",
      sources: ["Week 5 Sampling, p. 12", "Ch. 7 notes, p. 3"],
    },
    {
      label: "Hint 2 of 3",
      text: "Look at the formula on page 12: SE = σ / √n. What happens to the bottom of that fraction as n grows?",
      sources: ["Week 5 Sampling, p. 12"],
    },
    {
      label: "Full explanation",
      text: "Each sample mean is an average, and averages soften extreme values. With more observations, one unusual value has less pull, so sample means cluster more tightly around the true mean. That spread is the standard error, σ / √n. Example: with σ = 12, n = 9 gives 12 ÷ 3 = 4, and n = 36 gives 12 ÷ 6 = 2. Four times the data halves the spread.",
      sources: ["Week 5 Sampling, pp. 12–13"],
    },
  ],
};

export type Card = { q: string; a: string; src: string };
export const CARDS: Card[] = [
  {
    q: "What does the standard error measure?",
    a: "How much sample means vary from one sample to the next. It is the standard deviation of the sampling distribution.",
    src: "Week 5 Sampling, p. 12",
  },
  {
    q: "What is the formula for the standard error of the mean?",
    a: "σ / √n: the population standard deviation divided by the square root of the sample size.",
    src: "Week 5 Sampling, p. 12",
  },
  {
    q: "What does the Central Limit Theorem say?",
    a: "For a large enough n (often 30 or more), the sampling distribution of the mean is roughly normal, whatever the population's shape.",
    src: "Week 5 Sampling, p. 15",
  },
  {
    q: "Sampling error or bias: which one comes from how the sample was collected?",
    a: "Bias. Sampling error is natural sample-to-sample variation. Bias is a systematic error from the collection method.",
    src: "Ch. 7 notes, p. 4",
  },
];

export const QUIZ = [
  {
    q: "A sample of 36 observations comes from a population with a standard deviation of 12. What is the standard error of the mean?",
    options: ["12", "6", "2", "0.33"],
    answer: 2,
    hint: "The formula is on page 12. You divide by something related to n, not n itself.",
    right: "12 divided by the square root of 36, which is 6, gives 2.",
    wrong: "Divide by the square root of n, not by n. The square root of 36 is 6, so 12 divided by 6 gives 2. Added to your mistake review.",
    src: "Week 5 Sampling, p. 12",
  },
  {
    q: "If you make a sample four times larger, what happens to the standard error?",
    options: ["It doubles", "It halves", "It stays the same", "It falls to a quarter"],
    answer: 1,
    hint: "The sample size sits under a square root. What is the square root of 4?",
    right: "√4 is 2, so the denominator doubles and the standard error halves.",
    wrong: "n sits under a square root. Four times the data doubles √n, which halves the standard error. Added to your mistake review.",
    src: "Week 5 Sampling, p. 13",
  },
  {
    q: "Which change makes the sampling distribution of the mean closer to normal?",
    options: ["A larger sample size", "A smaller sample size", "A more skewed population", "Rounding the data"],
    answer: 0,
    hint: "Think about the Central Limit Theorem on page 15.",
    right: "The Central Limit Theorem says larger samples give a more normal sampling distribution.",
    wrong: "By the Central Limit Theorem, a larger n pulls the sampling distribution toward normal. Added to your mistake review.",
    src: "Week 5 Sampling, p. 15",
  },
];

export const PLAN_DAYS = [
  { d: "Fri", n: 9, task: "Sampling practice set", min: 40, today: true },
  { d: "Sat", n: 10, task: "Flashcards", min: 15 },
  { d: "Sun", n: 11, task: "Study guide, sections 3–5", min: 25 },
  { d: "Mon", n: 12, task: "Mistake review, 7 questions", min: 20 },
  { d: "Tue", n: 13, task: "Confidence intervals", min: 35 },
];

export const WEAK = [
  { topic: "Confidence intervals", pct: 42 },
  { topic: "Sampling error", pct: 51 },
  { topic: "Standard error", pct: 58 },
];
