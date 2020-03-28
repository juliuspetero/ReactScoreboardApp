const x = new Set();
const f = { id: 3, name: 'Mike' };
x.add({ id: 1, name: 'John' });
x.add({ id: 2, name: 'Maria' });
x.add(f);
x.add(f);
// x.forEach(p => console.log(p));

const y = [];
y.push({ id: 1, name: 'John' });
y.push({ id: 2, name: 'Mike' });
y.push({ id: 3, name: 'Tommy' });

// Before pushing check if already exist

const p4 = {
  id: 6,
  name: 'Person 4'
};

let isPresent = false;
y.forEach(p => {
  if (p.id === p4.id) isPresent = true;
});

if (!isPresent) {
  y.push(p4);
}

console.log(y);
