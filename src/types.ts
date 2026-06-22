export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "Owner" | "Can edit" | "Can view";
}

export interface PresetStyle {
  id: string;
  name: string;
  label: string;
  image: string;
  description: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: string;
  aspectRatio: string;
  timestamp: string;
  isFallback: boolean;
  md5Hash: string;
  likes: number;
  author: string;
}

export interface InspirePrompt {
  text: string;
  category: string;
}
