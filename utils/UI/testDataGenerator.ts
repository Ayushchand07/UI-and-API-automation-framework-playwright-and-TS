export function randomString(length: number) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export function randomFirstName() {
  const names = ['John', 'Emma', 'Ava', 'Oliver', 'Sophia', 'Noah', 'Liam', 'Mia'];
  return names[Math.floor(Math.random() * names.length)];
}

export function randomLastName() {
  const names = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Wilson', 'Martinez', 'Anderson', 'Thomas'];
  return names[Math.floor(Math.random() * names.length)];
}

export function randomNumber() {
  return Number(Math.floor(100000 + Math.random() * 900000));
}