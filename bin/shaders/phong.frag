// classic Phong equation
#version 410

in vec4 vPosition;
in vec4 vNormal;

// K refers to the surface's material
uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;

uniform float specularPower;

// I refers to the light properties
uniform vec3 Ia;
uniform vec3 Id;
uniform vec3 Is;

uniform vec3 lightDirection; // = Lm

uniform vec3 cameraPosition;

out vec4 FragColour;

void main() 
{
	vec3 Ambient = Ka * Ia;

	float NdL = vNormal.x * lightDirection.x + vNormal.y * lightDirection.y + vNormal.z * lightDirection.z + vNormal.w;

	vec3 Diffuse = Kd * Id * NdL;

	FragColour = vec4(Ambient + Diffuse,1);
}