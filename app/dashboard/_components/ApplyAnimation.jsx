"use client";


const applyAnimation = (index, startTime, duration,animationType,frame,interpolate) => {
    switch (animationType) {
      case "fadeInZoom":
        return {
          opacity: interpolate(
            frame,
            [startTime, startTime + duration / 2],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ),
          transform: `scale(${interpolate(
            frame,
            [startTime, startTime + duration],
            [0.8, 1.2],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )})`,
        };
      case "spinAndFade":
        return {
          opacity: interpolate(
            frame,
            [startTime, startTime + duration / 2, startTime + duration],
            [0, 1, 0]
          ),
          transform: `rotate(${interpolate(
            frame,
            [startTime, startTime + duration],
            [0, 360],  // Full 360-degree rotation
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )}deg)`,
        };
        return {
          transform: `translateX(${parallaxOffset}px)`,
        };
      case "bounceIn":
        const bounce = interpolate(
          frame,
          [startTime, startTime + duration / 4, startTime + duration / 2, startTime + (duration * 3) / 4, startTime + duration],
          [0, -20, 10, -5, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return {
          transform: `translateY(${bounce}px) scale(${interpolate(
            frame,
            [startTime, startTime + duration / 2],
            [0.8, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )})`,
          opacity: interpolate(
            frame,
            [startTime, startTime + duration / 2],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ),
        };
      case "parallax":
        return {
          transform: `translateX(${interpolate(
            frame,
            [startTime, startTime + duration],
            [-50, 50],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )}px) scale(${interpolate(
            frame,
            [startTime, startTime + duration],
            [1, 1.1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )})`,
        };
      case "slideInUp":
        return {
          transform: `translateY(${interpolate(frame, [startTime, startTime + duration], [100, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "slideInDown":
        return {
          transform: `translateY(${interpolate(frame, [startTime, startTime + duration], [-100, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "slideOutLeft":
        return {
          transform: `translateX(${interpolate(frame, [startTime, startTime + duration], [0, -100], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "slideOutRight":
        return {
          transform: `translateX(${interpolate(frame, [startTime, startTime + duration], [0, 100], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "slideOutUp":
        return {
          transform: `translateY(${interpolate(frame, [startTime, startTime + duration], [0, -100], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "slideOutDown":
        return {
          transform: `translateY(${interpolate(frame, [startTime, startTime + duration], [0, 100], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "rotateIn":
        return {
          transform: `rotate(${interpolate(frame, [startTime, startTime + duration], [-180, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}deg)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "rotateOut":
        return {
          transform: `rotate(${interpolate(frame, [startTime, startTime + duration], [0, 180], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}deg)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "skewIn":
        return {
          transform: `skewX(${interpolate(frame, [startTime, startTime + duration], [-30, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}deg)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }
      case "skewOut":
        return {
          transform: `skewX(${interpolate(frame, [startTime, startTime + duration], [0, 30], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}deg)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "scaleIn":
        return {
          transform: `scale(${interpolate(frame, [startTime, startTime + duration], [0.5, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })})`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "scaleOut":
        return {
          transform: `scale(${interpolate(frame, [startTime, startTime + duration], [1, 0.5], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })})`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "flipInX":
        return {
          transform: `rotateX(${interpolate(frame, [startTime, startTime + duration], [-90, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}deg)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "flipOutX":
        return {
          transform: `rotateX(${interpolate(frame, [startTime, startTime + duration], [0, 90], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}deg)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "flipInY":
        return {
          transform: `rotateY(${interpolate(frame, [startTime, startTime + duration], [-90, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}deg)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "flipOutY":
        return {
          transform: `rotateY(${interpolate(frame, [startTime, startTime + duration], [0, 90], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}deg)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "expandIn":
        return {
          transform: `scale(${interpolate(frame, [startTime, startTime + duration], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })})`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "contractOut":
        return {
          transform: `scale(${interpolate(frame, [startTime, startTime + duration], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })})`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "fadeInLeft":
        return {
          transform: `translateX(${interpolate(frame, [startTime, startTime + duration], [-50, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "fadeInRight":
        return {
          transform: `translateX(${interpolate(frame, [startTime, startTime + duration], [50, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "fadeInUp":
        return {
          transform: `translateY(${interpolate(frame, [startTime, startTime + duration], [50, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "fadeInDown":
        return {
          transform: `translateY(${interpolate(frame, [startTime, startTime + duration], [-50, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "fadeOutLeft":
        return {
          transform: `translateX(${interpolate(frame, [startTime, startTime + duration], [0, -50], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "fadeOutRight":
        return {
          transform: `translateX(${interpolate(frame, [startTime, startTime + duration], [0, 50], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "fadeOutUp":
        return {
          transform: `translateY(${interpolate(frame, [startTime, startTime + duration], [0, -50], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "fadeOutDown":
        return {
          transform: `translateY(${interpolate(frame, [startTime, startTime + duration], [0, 50], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "zoomIn":
        return {
          transform: `scale(${interpolate(frame, [startTime, startTime + duration], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })})`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "zoomOut":
        return {
          transform: `scale(${interpolate(frame, [startTime, startTime + duration], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          })})`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "bounce":
        const bounceY = interpolate(frame, [startTime, startTime + duration / 4, startTime + duration / 2, startTime + duration * 3 / 4, startTime + duration], [0, -20, 10, -5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        return {
          transform: `translateY(${bounceY}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "jelly":
        const jiggleScale = interpolate(frame, [startTime, startTime + duration / 4, startTime + duration / 2, startTime + duration * 3 / 4, startTime + duration], [1, 1.1, 0.9, 1.05, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        return {
          transform: `scale(${jiggleScale})`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "swing":
        const swingRotation = interpolate(frame, [startTime, startTime + duration / 4, startTime + duration / 2, startTime + duration * 3 / 4, startTime + duration], [0, -15, 15, -5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        return {
          transform: `rotate(${swingRotation}deg)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "pulse":
        const pulseScale = interpolate(frame, [startTime, startTime + duration / 2, startTime + duration], [1, 1.2, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return {
          transform: `scale(${pulseScale})`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "shake":
        const shakeX = interpolate(frame, [startTime, startTime + duration / 6, startTime + duration / 3, startTime + duration / 2, startTime + duration * 2 / 3, startTime + duration * 5 / 6, startTime + duration], [0, -5, 5, -3, 3, -1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        return {
          transform: `translateX(${shakeX}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }
      case "blurIn":
        return {
          filter: `blur(${interpolate(frame, [startTime, startTime + duration], [10, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "blurOut":
        return {
          filter: `blur(${interpolate(frame, [startTime, startTime + duration], [0, 10], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        };
      case "slitIn":
        const slitScale = interpolate(frame, [startTime, startTime + duration / 2, startTime + duration], [0, 1.1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
        return {
          transform: `scaleX(${slitScale})`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }
      case "slitOut":
        const slitScaleOut = interpolate(frame, [startTime, startTime + duration / 2, startTime + duration], [1, 1.1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
        return {
          transform: `scaleX(${slitScaleOut})`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }
      case "waveIn":
        const waveX = interpolate(frame, [startTime, startTime + duration / 8, startTime + duration / 4, startTime + duration / 8 * 3, startTime + duration / 2, startTime + duration / 8 * 5, startTime + duration / 4 * 3, startTime + duration / 8 * 7, startTime + duration], [0, -10, 10, -5, 5, -3, 3, -1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        return {
          transform: `translateX(${waveX}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }
      case "waveOut":
        const waveXOut = interpolate(frame, [startTime, startTime + duration / 8, startTime + duration / 4, startTime + duration / 8 * 3, startTime + duration / 2, startTime + duration / 8 * 5, startTime + duration / 4 * 3, startTime + duration / 8 * 7, startTime + duration], [0, -10, 10, -5, 5, -3, 3, -1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        return {
          transform: `translateX(${waveXOut}px)`,
          opacity: interpolate(frame, [startTime, startTime + duration / 2], [1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }
      case "expandAndFadeIn":
        return {
          transform: `scale(${interpolate(frame, [startTime, startTime + duration / 2], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
          opacity: interpolate(frame, [startTime, startTime + duration], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
        }
      case "contractAndFadeOut":
        return {
          transform: `scale(${interpolate(frame, [startTime, startTime + duration / 2], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
          opacity: interpolate(frame, [startTime, startTime + duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
        }
      case "fade":
        return {
          opacity: interpolate(
            frame,
            [startTime, startTime + duration / 2, startTime + duration],
            [0, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ),
        };
      case "pan":
        return {
          transform: `scaleX(1.2) translateX(${interpolate(
            frame,
            [startTime, startTime + duration],
            [0, 100],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )}px)`,
        };
      case "zoom":
      default:
        return {
          transform: `scale(${interpolate(
            frame,
            [startTime, startTime + duration / 2, startTime + duration],
            index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )})`,
        };
    }
  };

export default applyAnimation;
