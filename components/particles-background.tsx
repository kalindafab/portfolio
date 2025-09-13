"use client";

import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { getThemeByName } from "@/lib/config";

export function ParticlesBackground() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [particleConfig, setParticleConfig] = useState<any>(null);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    
    if (mounted && theme) {
      try {
        const currentTheme = getThemeByName(theme === "system" ? "light" : theme);
        
        if (currentTheme) {
          const config = currentTheme.particleConfig;
          console.log("Config check:", {
            hasParticleCount: !!config.particleCount,
            hasColor: !!config.color,
            hasShape: !!config.shape,
            hasOpacity: !!config.opacity,
            hasSize: !!config.size,
            hasLinked: typeof config.linked !== 'undefined',
            hasLinkColor: !!config.linkColor,
            hasSpeed: !!config.speed
          });
          

          const newConfig = {
            particles: {
              number: {
                value: config.particleCount,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              color: {
                value: config.color
              },
              shape: {
                type: config.shape
              },
              opacity: {
                value: config.opacity,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false
                }
              },
              size: {
                value: config.size,
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false
                }
              },
              line_linked: {
                enable: config.linked,
                distance: 150,
                color: config.linkColor,
                opacity: 0.4,
                width: 1
              },
              move: {
                enable: true,
                speed: config.speed,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200
                }
              }
            },
            interactivity: {
              detect_on: "window",
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse"
                },
                onclick: {
                  enable: true,
                  mode: "push"
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 140,
                  line_linked: {
                    opacity: 1
                  }
                },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3
                },
                repulse: {
                  distance: 200,
                  duration: 0.8
                },
                push: {
                  particles_nb: 4
                },
                remove: {
                  particles_nb: 2
                }
              }
            },
            retina_detect: true,
            fpsLimit: 120,
            fullScreen: {
              enable: true,
              zIndex: 0
            }
          };
          
          setParticleConfig(newConfig);
        } else {
          console.error("Theme not found:", theme);
        }
      } catch (error) {
        console.error("Error setting up particles:", error);
      }
    }
  }, [mounted, theme]);



  if (!mounted) {
    return null;
  }
  
  if (!particleConfig) {
    return null;
  }
  
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particleConfig}
    />
  );
}