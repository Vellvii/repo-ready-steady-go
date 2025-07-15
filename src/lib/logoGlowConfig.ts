export interface LogoGlowConfig {
  intensity: number;
  speed: number;
}

const logoGlowConfig: LogoGlowConfig = {
  intensity: 1,
  // Reduce speed for a slower, more natural idle animation
  speed: 0.5,
};

export default logoGlowConfig;
