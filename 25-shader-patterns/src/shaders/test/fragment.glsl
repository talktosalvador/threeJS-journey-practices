varying vec2 vUv;

#define PI 3.1415926535897932384626433832795


float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main()
{
    // started
    //    gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);

    // Pattern 1
    //    gl_FragColor = vec4(vUv, 1.0, 1.0);

    // Pattern 2
    //    gl_FragColor = vec4(vUv, 0.0, 1.0);

    // Pattern 3
    //    gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);

    //    float strength = vUv.x;
    //    gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 4
    //    float strength = vUv.y;
    //    gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 5
    //    float strength = 1.0 - vUv.y;
    //    gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 6
    //    float strength = vUv.y * 10.0;
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 7
    //    float strength = mod(vUv.y * 10.0, 1.0);
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 8
    //    float strength = mod(vUv.y * 10.0, 1.0);
    //    strength = step(0.5, strength);
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 9
    //    float strength = mod(vUv.y * 10.0, 1.0);
    //    strength = step(0.5, strength);
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 10
    //    float strength = mod(vUv.x * 10.0, 1.0);
    //    strength = step(0.5, strength);
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 11
    //    float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    //    strength += step(0.8, mod(vUv.y * 10.0, 1.0));
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 12
    //    float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    //    strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 13
    //    float strength = step(0.5, mod(vUv.x * 10.0, 1.0));
    //    strength *= step(0.5, mod(vUv.y * 10.0, 1.0));
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 14
    //    float strength = step(0.7, mod(vUv.x * 10.0, 1.0));
    //    strength += step(0.7, mod(vUv.y * 10.0, 1.0));
    //    gl_FragColor = vec4(vec3(strength), 0.5);
    //    float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    //    float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
    //    float strength = barX + barY;

    // Pattern 15
    //    float barX = step(0.4, mod(vUv.x * 10.0-0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    //    float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0-0.2, 1.0));
    //    float strength = barX + barY;
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 16
    //    float strength = abs(vUv.x - 0.5);
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 17
    //    float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 18
    //    float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 19
    //    float strength = step(0.4, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 20
    //    float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    //    strength *= 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 21
    //    float strength = floor(vUv.x * 10.0) / 10.0;
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 22
    //    float strength = (floor(vUv.x * 32.0) / 32.0) * (floor(vUv.y * 32.0) / 32.0);
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 23
    //    float strength = random(vUv);
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 24


    // Pattern 25


    // Pattern 26
    float strength = length(vUv);
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);
    gl_FragColor = vec4(vec3(mixedColor), 0.5);

    // Pattern 27
//    float strength = distance(vUv, vec2(0.5));
//    vec3 blackColor = vec3(0.0);
//    vec3 uvColor = vec3(vUv, 1.0);
//    vec3 mixedColor = mix(blackColor, uvColor, strength);
//    gl_FragColor = vec4(vec3(mixedColor), 0.5);

    // Pattern 28


    // Pattern 29


    // Pattern 30


    // Pattern 31


    // Pattern 32


    // Pattern 33


    // Pattern 34
//    float strength = abs(distance(vUv, vec2(0.5)) - 0.25);
//    vec3 blackColor = vec3(0.0);
//    vec3 uvColor = vec3(vUv, 1.0);
//    vec3 mixedColor = mix(blackColor, uvColor, strength);
//    gl_FragColor = vec4(vec3(mixedColor), 0.5);

    // Pattern 35


    // Pattern 36


    // Pattern 37


    // Pattern 38


    // Pattern 39


    // Pattern 40
    //    float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    //    float strength = angle;
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 41
    //    float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    //    float strength = angle;
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 42
    //    float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    //    angle /= PI * 2.0;
    //    angle += 0.5;
    //    float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    //    float strength = angle;
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 43
    //    float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    //    float strength = mod(angle * 20.0, 1.0);
    //    vec3 blackColor = vec3(0.0);
    //    vec3 uvColor = vec3(vUv, 1.0);
    //    vec3 mixedColor = mix(blackColor, uvColor, strength);
    //    gl_FragColor = vec4(vec3(mixedColor), 0.5);

    // Pattern 44
    //    float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    //    float strength = sin(angle * 100.0);
    //    gl_FragColor = vec4(vec3(strength), 0.5);

    // Pattern 45


    // Pattern 46


    // Pattern 47


    // Pattern 48


    // Pattern 49


    // Pattern 50


}