// Shader by dmx, Source: https://www.shadertoy.com/view/Msf3D2
#version 150
in vec4 gl_FragCoord;

out vec4 outputColor;

uniform sampler2DRect tex0;
uniform float u_time;
uniform float percent;
uniform vec2 u_resolution;
 
void main()
{   
    // normalize gl_FragCoord
    vec2 uv = gl_FragCoord.xy / u_resolution;
    // invert uv because the texture gets rendered inverted
    // uv = vec2(1.0, 1.0) - uv;
    float uvy = 1.0 - uv.y;
    uv.y = uvy;

	float y = 
		(1.0 - percent) * (0.7*sin((uv.y + u_time) * 4.0) * 0.038 +
		0.3*sin((uv.y + u_time) * 8.0) * 0.010 +
		0.05*sin((uv.y + u_time) * 40.0) * 0.05);

	float x = 
		(1.0 - percent) * (0.5*sin((uv.y + u_time) * 5.0) * 0.1 +
		0.2*sin((uv.x + u_time) * 10.0) * 0.05 +
		0.2*sin((uv.x + u_time) * 30.0) * 0.02);

	
    // output coords has to be in terms of resolution
    outputColor = texture(tex0, u_resolution * 0.79*(uv + vec2(y+0.11, x+0.11)));
}