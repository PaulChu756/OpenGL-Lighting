// classic Phong equation
#version 410

in vec4 vPosition;
in vec4 vNormal;

// K refers to the surface's material
uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;

// I refers to the light properties
uniform vec3 Ia;
uniform vec3 Id;
uniform vec3 Is;

uniform float specularPower;
uniform vec3 lightDirection; // = Lm
uniform vec3 lightPosition; // the new LM
uniform vec3 cameraPosition; // V surface to viewer/camera position

out vec4 FragColour;

void main() 
{
	//Normalize vec4 to vec3 to get world space
	vec3 normal = normalize(vNormal).xyz;
	vec3 pos = normalize(vPosition).xyz;
	vec3 color = new vec3 (1,0,0);

	//Ambient Light, Ka = what kind of color, Ia = how bright the color is.
	vec3 lightPos = lightPosition - vec3(vPosition);
	lightPos = normalize(lightPos);
	vec3 Ambient = normalize(Ka) * normalize(Ia);

	//Diffuse, Lights the sphere using it's normal and the light by dot product and returns one number (Always between 0 and 1)
	float NdL = max(0.0f, dot(normal, lightPos));
	vec3 Diffuse = normalize(Kd) * normalize(Id) * NdL;

	//Specular, Light reflects from light normal upon sphere
	vec3 E = (cameraPosition - vec3(vPosition)); //surface to eye
	vec3 halfwayVector = normalize(lightPos + E);
	float specTerm = pow(max(0.0f, dot(halfwayVector, normal)), specularPower);
	vec3 Specular = Ks * Is * specTerm * NdL;

	FragColour = vec4(Ambient + Diffuse + Specular,1);
}