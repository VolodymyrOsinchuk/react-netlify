export default [
  {
    name: "Accueil",
    url: "/",
  },
  {
    name: "À propos",
    url: "/about",
  },
  {
    name: "Tableau de bord",
    children: [
      {
        name: "Calendrier",
        url: "/calendar",
      },
      {
        name: "Grand calendrier",
        url: "/big-calendar",
      },
      {
        name: "Événements",
        url: "/event-calendar",
      },
      {
        name: "Créer produit",
        url: "/create-product",
      },
      {
        name: "Pays",
        url: "/countries",
      },
    ],
  },
];
