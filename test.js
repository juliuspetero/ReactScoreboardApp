let titles = new Set();

const title1 = {
  title: 'title one',
  weight: 45
};

titles.add(title1);
titles.add(title1);
titles.add(title1);
titles.add(title1);

// console.log(titles);
// const set1 = new Set([1, 3, 3, 2]);
titles = [...titles];

const weights = titles.map(x => {
  return { weight: x.weight };
});

console.log(weights);
