export class ToDo {
  id; // string
  createdDate; // number
  title; //number
  completed; // boolean
  notes; //string

  constructor(
    id, // string
    createdDate, // number
    title, //number
    completed, // boolean
    notes //string
  ) {
    this.id = id;
    this.createdDate = createdDate;
    this.title = title;
    this.completed = completed;
    this.notes = notes;
  }
}

export class Category {
  name; // string
  createdDate; // number

  constructor(
    name, // string
    createdDate // number
  ) {
    this.name = name;
    this.createdDate = createdDate;
  }
}

// Firestore data converter
export const todoConverter = {
  toFirestore(todo) {
    return {
      // id: todo.id,
      createdDate: todo.createdDate,
      title: todo.title,
      completed: todo.completed,
      notes: todo.notes,
    };
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return new ToDo(
      snapshot.id,
      data.createdDate,
      data.title,
      data.completed,
      data.notes
    );
  },
};

// Firestore data converter
export const categoryConverter = {
  toFirestore(category) {
    return {
      name: category.name,
      createdDate: category.createdDate,
    };
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return new Category(data.name, data.createdDate);
  },
};

export const completionMessages = [
  "Nice one! 😎",
  "Bravo! 👏",
  "You nailed it! 🎯",
  "Way to go! 🙌",
  "Incredible work! 🌟",
  "Boom! 💥",
  "Mission accomplished! ✅",
  "You're on fire! 🔥",
  "Impressive stuff! 👍",
  "That's how it's done! 💪",
  "Huzzah! 🎉",
  "You're crushing it! 🚀",
  "You're a superstar! ⭐",
  "A round of applause for you! 👏👏",
  "You're on a roll! 🤩",
  "Absolutely smashing! 💥",
  "You're unstoppable! 🌟",
  "Well done, champ! 🏆",
  "Top-notch job! 👌",
  "You aced it! 🙌",
  "Fantastic work! 🎉",
  "You're a wizard! 🧙‍♂️",
  "Bravo, maestro! 🎶",
  "You're a legend! 🌟",
  "You've got the magic touch! ✨",
  "You knocked it out of the park! ⚾",
  "You deserve a standing ovation! 👏👏👏",
  "Kudos to you! 🙌",
  "Outstanding performance! 🌟",
  "Mission success! 🚀",
  "You're a rockstar! 🎸",
  "You did it in style! 😎",
  "You're a superhero! 🦸‍♂️",
  "You're a genius! 🧠",
  "You're a pro! 💼",
  "You make it look easy! 😄",
  "Absolutely splendid! 👌",
  "You've got the Midas touch! 🌟",
  "You're a boss! 💼",
  "You're a force to be reckoned with! 💪",
  "You're a shining star! ✨",
  "You're a magician! 🎩",
  "You crushed it like a bug! 🐞",
  "You're a trailblazer! 🚀",
  "You're a mastermind! 🧠",
  "You hit the jackpot! 💰",
  "You're a top-tier performer! 🌟",
  "You're a dynamo! ⚡",
  "You deserve a gold medal! 🥇",
  "You're the cream of the crop! 🥛",
];
