#version 150

//uniform vec4 globalColor;
uniform sampler2DRect tex0;

in vec2 texCoordVarying;

out vec4 outputColor;
 
void main()
{
    outputColor = texture(tex0, texCoordVarying);
}
