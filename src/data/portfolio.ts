export type Category = "Web" | "Apps" | "Worlds";
export interface Project {
  title: string;
  category: Category;
  description: string;
  href: string;
  tags: string[];
  art: string;
  action: string;
}
export const projects: Project[] = [
  {
    title: "Sanctum Network",
    category: "Web",
    description:
      "A digital home for products and community. A web shop connecting a product catalog, accounts, and checkout.",
    href: "https://sanctumnetwork.com/",
    tags: ["E-commerce", "MySQL", "Community"],
    art: "sanctum",
    action: "Explore the site",
  },
  {
    title: "Bubble Float",
    category: "Apps",
    description:
      "An Android music player where sound becomes a visual experience, with reactive lights, drifting waves, and seven themes.",
    href: "https://sanctumnetwork.com/products/31",
    tags: ["Android", "Music", "UI / UX"],
    art: "bubble",
    action: "Explore the app",
  },
  {
    title: "Ross Creek Cabinets",
    category: "Web",
    description:
      "A home on the web for a custom cabinetry business in Waycross, Georgia. Craft, services, and a clear path to connect.",
    href: "https://rosscreekcabinets.com/",
    tags: ["Web development", "Local business"],
    art: "ross",
    action: "Visit the website",
  },
  {
    title: "Sci-Fi Multiverse",
    category: "Worlds",
    description:
      "A Minecraft modpack built around advanced technology, space exploration, and the possibility of another world.",
    href: "https://www.curseforge.com/minecraft/modpacks/multiverse",
    tags: ["Minecraft", "Modding", "Exploration"],
    art: "multiverse",
    action: "Explore the modpack",
  },
  {
    title: "Atirica Astrology",
    category: "Web",
    description:
      "A personal exploration of astrology through interactive tools and an atmospheric digital space.",
    href: "https://atirica.blwaterwind.workers.dev/",
    tags: ["Web design", "Interactive"],
    art: "atirica",
    action: "Visit the website",
  },
  {
    title: "Music Filer",
    category: "Apps",
    description:
      "A utility for tidying an Android music library, from missing album covers to artist, album, and title information.",
    href: "https://sanctumnetwork.com/products/32",
    tags: ["Android", "Utility", "Music"],
    art: "music",
    action: "Explore the app",
  },
  {
    title: "Live Beach",
    category: "Worlds",
    description:
      "A peaceful Roblox beach environment with an ambient soundscape and a living beach ecosystem.",
    href: "https://www.roblox.com/games/117642909295251/Live-Beach",
    tags: ["Roblox", "Environment"],
    art: "beach",
    action: "Play on Roblox",
  },
  {
    title: "Psychic Training Grounds",
    category: "Worlds",
    description:
      "Telekinesis, energy blasts, and psychic soccer meet tournaments and persistent player stats.",
    href: "https://www.roblox.com/games/111842061283249/Psychic-Training-Grounds",
    tags: ["Roblox", "Multiplayer"],
    art: "psychic",
    action: "Play on Roblox",
  },
  {
    title: "RE: SOLVED",
    category: "Worlds",
    description:
      "A collaborative pipe puzzle game with procedural grids, upgrades, and global leaderboards.",
    href: "https://www.roblox.com/games/75185034704587/RE-SOLVED",
    tags: ["Roblox", "Puzzles"],
    art: "resolved",
    action: "Play on Roblox",
  },
  {
    title: "Air Hockey PRO",
    category: "Worlds",
    description:
      "Futuristic air hockey with neon arenas, online multiplayer, and competitive play.",
    href: "https://www.roblox.com/games/103095226456621/Air-Hockey-PRO",
    tags: ["Roblox", "Competitive"],
    art: "hockey",
    action: "Play on Roblox",
  },
  {
    title: "TV WARS",
    category: "Worlds",
    description:
      "A TV and pop culture quiz game with multiplayer competition and leaderboards.",
    href: "https://www.roblox.com/games/107697193967157/TV-WARS",
    tags: ["Roblox", "Trivia"],
    art: "tv",
    action: "Play on Roblox",
  },
  {
    title: "Sci-Nilla Buff",
    category: "Worlds",
    description:
      "Vanilla Minecraft enhanced with science fiction elements and balanced progression.",
    href: "https://www.curseforge.com/minecraft/modpacks/sci-nilla-buff",
    tags: ["Minecraft", "Modding"],
    art: "scinilla",
    action: "Explore the modpack",
  },
  {
    title: "Avatar Arena",
    category: "Worlds",
    description:
      "A Water Tribe defense map in Fortnite Creative, combining strategic combat and cooperative play.",
    href: "https://www.fortnite.com/@watertribe/6484-9681-8804?lang=en-US",
    tags: ["Fortnite", "World building"],
    art: "avatar",
    action: "Explore the island",
  },
];
export const socials = [
  {
    name: "Email",
    handle: "blwaterwind@gmail.com",
    description: "For opportunities, ideas, and a good hello.",
    href: "mailto:blwaterwind@gmail.com",
    symbol: "@",
  },
  {
    name: "GitHub",
    handle: "Water-Wind-Official",
    description: "Code, experiments, and things in progress.",
    href: "https://github.com/Water-Wind-Official",
    symbol: "</>",
  },
  {
    name: "LinkedIn",
    handle: "Brandon Walker",
    description: "Experience, work, and professional connections.",
    href: "https://www.linkedin.com/in/brandon-walker-4893b12b7",
    symbol: "in",
  },
  {
    name: "Discord",
    handle: "Sanctum Network",
    description: "Come talk projects, games, and what’s next.",
    href: "https://discord.gg/G9baugNyvD",
    symbol: "#",
  },
  {
    name: "YouTube",
    handle: "@sanctum-network",
    description: "A window into my creative universe.",
    href: "https://www.youtube.com/@sanctum-network",
    symbol: "▷",
  },
  {
    name: "CurseForge",
    handle: "water_wind_",
    description: "Minecraft modpacks and new worlds to explore.",
    href: "https://www.curseforge.com/members/water_wind_/projects",
    symbol: "✦",
  },
  {
    name: "Fortnite",
    handle: "@watertribe",
    description: "Worlds and experiences in Fortnite Creative.",
    href: "https://www.fortnite.com/@watertribe",
    symbol: "⌁",
  },
  {
    name: "Sanctum Network",
    handle: "The web shop",
    description: "Discover the things I’m putting into the world.",
    href: "https://sanctumnetwork.com/",
    symbol: "S",
  },
];
