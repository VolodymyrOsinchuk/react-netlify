export default {
  data: [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Lesson3",
      children: [
        {
          name: "Lesson3_1",
          url: "/test3",
        },
        {
          name: "Lesson3_2",
          url: "/lesson3_2",
        },
        {
          name: "Lesson3_3",
          url: "/lesson3_3",
        },
      ],
    },
  ],
};
