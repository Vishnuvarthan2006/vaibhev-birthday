export interface RecipientProfile {
  name: string;
  preferredName: string;
  birthYear?: number;
  favouriteF1Team: string;
  favouriteDriver: string;
  driverNumber: number;
  primaryColors: {
    black: string;
    gold: string;
    ferrariRed: string;
  };
  passions: string[];
  easterEggs: {
    tungSahurEnabled: boolean;
    minecraftSoundEnabled: boolean;
    spiderSenseEnabled: boolean;
    ferrariTelemetryEnabled: boolean;
  };
}

export interface NavigationSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge?: string;
  route?: string;
}
