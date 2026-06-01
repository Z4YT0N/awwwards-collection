# earth-shaders

The earth shader combines different maps and calculates how light should be reflected from the earth's surface.
![image](https://user-images.githubusercontent.com/29680544/175618349-025fc859-d670-43a7-9892-7b38f07e88a8.png)

![image](https://user-images.githubusercontent.com/29680544/175618117-f2311bf2-33d4-4161-9685-d64988432832.png)


## Atmosphere
I added a small fresnel effect to simulate the atmosphere.

```glsl
// fresnel
float fresnel = pow((1.0 - dot(normal, viewDirection)), 2.0) * 0.5;
fresnel += (1.0 - dot(normal, viewDirection)) * 0.2 + 0.2;
vec3 atmosphereColor = vec3(0.459,0.647,1.);

vLambertLight = mix(vLambertLight, atmosphereColor, fresnel * sunLight);
```

![image](https://user-images.githubusercontent.com/29680544/175618436-c0d66c63-bf73-4375-b81f-b0eb43c13bb2.png)



## Sunset
To create the sunset effect on the clouds, I started with the lambert factor, remaped it and used a cosine function to create a "ring"

```glsl
// sun light
float rawSunLight = valueRemap(rawLambert, 0.0, 0.2, 0.0, 1.0);
float sunLight = clamp(rawSunLight, 0.0, 1.0);
vec3 vLambertLight = dayColor * lightColor * sunLight;
// sunsetColor
float sunsetFactor = clamp(valueRemap(rawSunLight, -0.1, 0.6, -1.0, 1.0), -1.0, 1.0);
sunsetFactor = cos(sunsetFactor * 3.14) * 0.5 + 0.5;
vec3 sunsetColor = vec3(0.325,0.173,0.149) * 2.3;
```

![image](https://user-images.githubusercontent.com/29680544/175619424-908814f1-e836-4534-9cb7-1c53ac17441e.png)

Then, combined that with the clouds factor and a color to add a suttle sunset effect.
```glsl
// clouds
float cloudFactor = texture2D(cloudMap, vUv).r;
//sunset on clouds
vec3 cloudColor = vec3(1.0) * valueRemap(sunLight, 0.0, 1.0, 0.1, 1.0);
cloudColor = mix(cloudColor, sunsetColor, sunsetFactor * pow(cloudFactor, 1.3));
```
