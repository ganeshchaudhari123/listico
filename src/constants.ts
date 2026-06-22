import { Member, PresetStyle, GeneratedImage, InspirePrompt } from "./types";

export const INITIAL_MEMBERS: Member[] = [
  {
    id: "1",
    name: "Mike Tyson",
    email: "mike.tyson@universe.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    role: "Owner",
  },
  {
    id: "2",
    name: "Daniel Bryant",
    email: "daniel.b@alpha.io",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    role: "Can view",
  },
  {
    id: "3",
    name: "John Cena",
    email: "invisible.cena@wwe.org",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    role: "Can edit",
  },
  {
    id: "4",
    name: "Alexa Bliss",
    email: "alexa.b@wrestle.co",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    role: "Can edit",
  }
];

export const PRESET_STYLES: PresetStyle[] = [
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    label: "Vibrant Cyan-Pink neon tech matrix",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Highly detailed volumetric neon glow, holographic overlays",
  },
  {
    id: "3d_anime",
    name: "3D Anime",
    label: "Cute cartoon kawaii aesthetic",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Vibrant cell shader artwork, bubbly shapes, cute characters",
  },
  {
    id: "realistic",
    name: "Realistic",
    label: "Ultra cinematic hyperrealism",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Ray-traced reflections, sharp depth of field, 8K professional capture",
  },
  {
    id: "neon_retro",
    name: "Neon Retro",
    label: "80s outrun synthwave look",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Chrome metal elements, pixel grid backgrounds, laser rays",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    label: "Clean Scandinavian design",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Monochrome slate colors, gorgeous ambient soft shadows",
  }
];

export const INSPIRE_PROMPTS: InspirePrompt[] = [
  {
    text: "A friendly baby monster holding an retro neon CRT television screen, cartoon vibrant styling",
    category: "Monster"
  },
  {
    text: "A cute round mechanical toaster with golden wings, big glossy black eyes, high resolution render",
    category: "Gadget"
  },
  {
    text: "A gorgeous cybernetic orange cat with lime green laser eyes driving a futuristic sports racecar",
    category: "Cyberpunk"
  },
  {
    text: "A pristine minimalist ceramic vase on a smooth grey slate stone under a warm dynamic sunray",
    category: "Product"
  },
  {
    text: "A magical flying teacup spilling a galaxy of tiny glowing pastel stars, surreal anime watercolor",
    category: "Fantasy"
  }
];

export const SAMPLE_GALLERY_IMAGES: GeneratedImage[] = [
  {
    id: "plektion",
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80",
    prompt: "Charming neon cybernetic monster 'Plektion' with multiple googly eyes and pink fangs, high quality 3d toy model",
    style: "3D Anime",
    aspectRatio: "1:1",
    timestamp: "2026-06-04 12:44",
    isFallback: false,
    md5Hash: "b3527a29e41cc789a77ee2d7b14aebcc",
    likes: 342,
    author: "Mike"
  },
  {
    id: "toaster",
    url: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&auto=format&fit=crop&q=80",
    prompt: "Charming golden glowing cartoon 'Toaster' creature waving small mechanical arms under studio photography lights",
    style: "Realistic",
    aspectRatio: "1:1",
    timestamp: "2026-06-04 12:45",
    isFallback: false,
    md5Hash: "7b13aebccb352aa7dcc78912cf29ca44",
    likes: 198,
    author: "User_88"
  },
  {
    id: "cyber_rex",
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80",
    prompt: "A neon green cybernetic dinosaur running through a glowing purple digital metropolis grid, retro synthwave style",
    style: "Cyberpunk",
    aspectRatio: "16:9",
    timestamp: "2026-06-04 12:46",
    isFallback: false,
    md5Hash: "dc24c9447b1378912cf29caa44eebcc2",
    likes: 512,
    author: "ResellPro"
  },
  {
    id: "astro_bunny",
    url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&auto=format&fit=crop&q=80",
    prompt: "A adorable white fluffy astronaut bunny sitting happily on a small glowing rock of a cosmic crescent moon, pastel fantasy style",
    style: "3D Anime",
    aspectRatio: "3:4",
    timestamp: "2026-06-04 12:47",
    isFallback: false,
    md5Hash: "7ee2cfcc2d7b14aebcc3b3527a29e41cc",
    likes: 275,
    author: "Alexa"
  }
];
