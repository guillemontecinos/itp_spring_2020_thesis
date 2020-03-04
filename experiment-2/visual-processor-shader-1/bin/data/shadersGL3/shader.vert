#version 150

// these are for the programmable pipeline system
uniform mat4 modelViewProjectionMatrix;
in vec4 position;
in vec2 texcoord;

// the time value is passed into the shader by the OF app.
uniform float time;
uniform float percent;
out vec2 texCoordVarying;

void main()
{
    // the sine wave travels along the x-axis (across the screen),
    // so we use the x coordinate of each vertex for the calculation,
    // but we displace all the vertex along the y axis (up the screen)/
    float displacement = 50.0 * (1.0 - percent);
//    float displacementY = sin(time + (position.x / 100.0)) * displacementHeight;
    
    float displacementY = sin(time + (position.x / 100.0)) * displacement;
    float displacementX = sin(time + (position.y / 70.0)) * displacement;
	
    vec4 modifiedPosition = modelViewProjectionMatrix * position;
	modifiedPosition.y += displacementY;
    modifiedPosition.x += displacementX;
    
    texCoordVarying = vec2(texcoord.x, texcoord.y);
    
	gl_Position = modifiedPosition;
}
